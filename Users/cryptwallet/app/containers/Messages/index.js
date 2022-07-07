/**
 *
 * Messages
 *
 */

 import React from 'react';
 import PropTypes from 'prop-types';
 import { connect } from 'react-redux';
 import { Helmet } from 'react-helmet';
 import { FormattedMessage } from 'react-intl';
 import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
 
 import injectSaga from 'utils/injectSaga';
 import injectReducer from 'utils/injectReducer';
 import FormControlLabel from '@material-ui/core/FormControlLabel';
 import { Button, Checkbox, List, ListItem, TextField } from '@material-ui/core';
 import AppBar from '@material-ui/core/AppBar';
 import Tabs from '@material-ui/core/Tabs';
 import Tab from '@material-ui/core/Tab';
 import Grid from '@material-ui/core/Grid';
 import Tooltip from '@material-ui/core/Tooltip';
 import Typography from '@material-ui/core/Typography';
 import Table from '@material-ui/core/Table';
 import TableHead from '@material-ui/core/TableHead';
 import TableRow from '@material-ui/core/TableRow';
 import TableCell from '@material-ui/core/TableCell';
 import TableBody from '@material-ui/core/TableBody';
 import Image from '../../components/uiStyle/Images';
 import { LinearProgress } from '@material-ui/core';
 import messages from './messages';
 import saga from './saga';
 import reducer from './reducer';
 import MessageDetail from '../../components/MessageDetail';
 import SelectAddress from "../../components/SelectAddress";
 
 import Images from '../../components/uiStyle/Images';
 
 // icons
 import messageIcon from '../../images/icon/message.png';
 import addressIcon from '../../images/icon/address_book_icon.svg';
 import editCopyIcon from '../../images/icon/editcopy.png';
 import removeItemIcon from '../../images/icon/remove_item_icon.svg';
 
 
 import './style.scss';
 import { toast } from 'react-toastify';
 import { selectUser, selectAllUsers } from '../../store/auth/auth.selectors';
 import {getMessageStart, downloadAttachmentStart, sendMsgStart, getWalletStart } from '../../store/wallet/wallet.actions';
 import {getUser} from '../../store/auth/auth.actions';
 import { selectMessages } from '../../store/wallet/wallet.selectors';
 
 import { isAmount, skipSpace, valueIsNumber } from '../../utils/commonFunctions';

import { Editor } from '@tinymce/tinymce-react';

const MESSAGE_AMOUNT = 1000;
const MESSAGE_CHAR_PRICE = 100;
const ATTACHMENT_HEADER_LENGTH = 59;
const ATTACHMENT_ENCRYPTION_KEY_HEADER_LENGTH = 92;
const MAX_ATTACHMENT_SIZE = 100 * 1024 * 1024;
const ATTACHMENT_PRICE = 10000;
const ANONYMITY_PRICE = 10000;
const MINIMAL_MESSAGE_FEE = MESSAGE_CHAR_PRICE;
const DEFAULT_MESSAGE_MIXIN = 2;

const MINUTE_SECONDS = 60;
const HOUR_SECONDS = 60 * MINUTE_SECONDS;
const MIN_TTL = 5 * MINUTE_SECONDS;
const MAX_TTL = 14 * HOUR_SECONDS;
const TTL_STEP = 5 * MINUTE_SECONDS;

function TabContainer(props) {
  return (
    <Typography component="div">
      {props.children}
    </Typography>
  );
}

const percent = (a, b) => (a / b * 100).toFixed(2);

/* eslint-disable react/prefer-stateless-function */
export class Messages extends React.Component {
  state = {
    adModalOpen: false,
    saModalOpen: false,
    currentPage: 1,
    rowsPerPage: 5,
    pageNumberOfPage: 1,
    row: [],
    message: [],
    tab: 0,
    addr_list: [],
    addr_index: 0,
    addresses: [''],
    files: [],
    totalSize: 0,
    tinyMCEEditor: null,
    replyTo: false,
    selfDestructTime: false,
    amount: 0,
    minimumAmount: 0,
    formattedAmount: '',
    destructTime: 0,
    anonymity: 2,
    errors: {
      amount: '',
      minimumAmount: '',
      destructTime: '',
      anonymity: '',
      recipients: '',
      message: '',
    },
    is_prev: false,
    is_next: false,
    message_index: -1,
  };

  constructor(props) {
    super(props);
    const {getMessages, connectedUser } = this.props;
    if (connectedUser){
      getMessages(connectedUser.id);
    }
  }

  tabChangeHandler = (event, value) => {
    this.setState({ tab: value });
  };

  changeHandler = e => {
    const Name = e.target.name;
    let Value = e.target.value;
    if (Name === 'amount' && isAmount(Value)) {
      this.setState({
        [Name]: Value,
      });
    }
    if (Name === 'destructTime' && valueIsNumber(Value)) {
      this.setState({
        ...this.state,
        errors: {
          ...this.state.errors,
          destructTime: (Value < MIN_TTL || Value > MAX_TTL) ? 'Self destruct time must be between 5 minutes and 14 hours' : '',
        },
        [Name]: Value,
      });
    }
    if (Name === 'anonymity' && valueIsNumber(Value)) {
      if (Value < 0 || Value > 10) return;
      this.setState({
        [Name]: Value,
      });
    }
  };

  onInitTinyMCE = (evt, editor) => {
    const tinyMCEEditor = editor;
    this.setState({
      ...this.state,
      tinyMCEEditor
    });
    this.calcAmount();
  }

  handleEditorChange = (e) => {
    this.calcAmount();
  }

  calcAmount = () => {
    const {
      addresses,
      files,
      anonymity,
      totalSize,
      tinyMCEEditor,
      selfDestructTime,
    } = this.state;

    const message = tinyMCEEditor.getContent();
    const messageSize = message.length;
    let fee = 0;
    // fee for permanent message
    if ( selfDestructTime == false) fee += MINIMAL_MESSAGE_FEE;
    // fee for attachment
    if (files.length > 0) fee += (totalSize.toFixed(2) / (1024 * 1024)) * ATTACHMENT_PRICE;
    // fee for anonymity
    if (anonymity > 2) fee += anonymity * ANONYMITY_PRICE;
    // fee for recipients
    fee += MESSAGE_AMOUNT * addresses.length;
    fee += MESSAGE_CHAR_PRICE * messageSize;
    this.setState({
      ...this.state,
      minimumAmount: fee,
      amount: fee,
      formattedAmount: this.formatAmount(fee),
    });
  }

  formatAmount = amount => {
    // 1 XUNI = 1000000
    return `${(amount / 1000000).toFixed(6)} XUNI (${amount} bits)`;
  };

  adModalCloseHandler = () => {
    this.setState({
      adModalOpen: false,
      saModalOpen: false,
    });
  };

  adModalReplyHandler = () => {
    const {
      message
    } = this.state;
    let addresses = [];
    addresses.push(message.walletAddress);
    this.setState({
      adModalOpen: false,
      tab: 1,
      addresses,
    });
  };

  adModalPrevHandler = () => {
    const {
      row,
      message_index
    } = this.state;
    if ( message_index > 0 ) {
      let index = message_index - 1;
      const item = row[index];
      
      const is_prev = index > 0 ? false : true;
      const is_next = index < row.length - 1 ? false : true;
      this.setState({ ...this.state, adModalOpen: true, message: item, is_prev, is_next, message_index: index });
    }
  }

  adModalNextHandler = () => {
    const {
      row,
      message_index
    } = this.state;
    if ( message_index < row.length - 1 ) {
      let index = message_index + 1;
      const item = row[index];
      
      const is_prev = index > 0 ? false : true;
      const is_next = index < row.length - 1 ? false : true;
      this.setState({ ...this.state, adModalOpen: true, message: item, is_prev, is_next, message_index: index });
    }
  }

  adModalDownloadHandler = () => {
    const {
      message
    } = this.state;

    const {downloadAttachment} = this.props;

    let attachment = '';
    let encryptionKey = '';

    let headers = message.headers;
    for ( let header of headers ) {
      if ( header['name'] == 'Attachment' ) {
        attachment = header['value'];
      }
      if ( header['name'] == 'Attachment-Encryption-Key' ) {
        encryptionKey = header['value'];
      }
    }
    let transactionHash = message.hash;
    const download = {
      transactionId: transactionHash,
      attachment: attachment,
      encryptionKey: encryptionKey
    };
    downloadAttachment(download);
  }

  handleChange = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked }, () => {
      this.calcAmount();
    });
  };

  adModalSelectHandler = (row) => e => {
    const { addr_index, addresses } = this.state;
    addresses[addr_index] = row;
    this.setState({
      ...this.state,
      addresses: addresses,
      saModalOpen: false,
    });
  }

  paginateHandler = prop => event => {
    this.setState({
      currentPage: Number(event.target.id),
      pageNumberOfPage: prop,
    });
  };

  detailHandler = (item, index) => e => {
    const {
      row,
    } = this.state;
    const is_prev = index > 0 ? false : true;
    const is_next = index < row.length - 1 ? false : true;
    this.setState({ ...this.state, adModalOpen: true, message: item, is_prev, is_next, message_index: index });
  };

  changeAddressHandler = (index) => e => {
    const { addresses } = this.state;
    addresses[index] = e.target.value;
    this.setState({
      addresses: addresses
    });
  };

  changeFileHandler = (index) => e => {
    const { files } = this.state;
    files[index] = e.target.value;
    this.setState({
      files: files
    });
  };

  fromClipboard = (index) => e => {
    const { addresses } = this.state;
    let self = this;
    navigator.clipboard.readText().then(
      clipText => {
        addresses[index] = clipText;
        self.setState({
          addresses: addresses
        });
      }
    );
  }

  removeRecipient = (index) => e => {
    const { addresses } = this.state;
    addresses.splice(index,1);
    this.setState({
      addresses: addresses
    }, () => {
      this.calcAmount();
    });
  }

  removeFile = (index) => e => {
    const { files } = this.state;
    this.setState({
      ...this.state,
      totalSize: this.state.totalSize - files[index].size,
    }, () => {
      this.calcAmount();
    });
    files.splice(index,1);
    this.setState({
      files: files
    }, () => {
      this.calcAmount();
    });
  }

  selectAddress = (index) => e => {
    this.setState({
      ...this.state,
      addr_index: index,
      saModalOpen: true,
    });
  }

  onAddRecipient = e => {
    const { addresses } = this.state;
    addresses.push('');
    this.setState({
      addresses
    }, () => {
      this.calcAmount()
    });
  }

  onFileChange = e => {
    if (e.target.files[0]) {
      if (e.target.files[0].size > MAX_ATTACHMENT_SIZE) return toast.error('Attachment size is too large');

      if ((this.state.totalSize + e.target.files[0].size) > MAX_ATTACHMENT_SIZE) return toast.error('Attachments size cannot exceed 100MB');
      const {
        files
      } = this.state;
      this.setState({
        ...this.state,
        totalSize: this.state.totalSize + e.target.files[0].size,
      });
      files.push(e.target.files[0]);
      this.setState({
        files
      }, () => {
        this.calcAmount();
      });
    }
  }

  onAddAttachment = e => {
    this.fileElement.click();
  }

  validateForm = () => {
    let isValid = true;
    const {
      addresses,
      tinyMCEEditor
    } = this.state;
    this.setState({
      ...this.state,
      errors: {}
    });
    let errors = {
      recipients: '',
      message: '',
    };
    if (addresses[0].length == 0) {
      isValid = false;
      errors.recipients = 'Please select recipient';
    }
    if (tinyMCEEditor.getContent().length === 0) {
      isValid = false;
      errors.message = 'Please enter a message';
    }
    this.setState({
      ...this.state,
      errors: {
        ...this.state.errors,
        ...errors
      }
    });

    return isValid;
  }

  onSend = e => {
    const formData = new FormData();
    const {
      files,
      addresses,
      replyTo,
      selfDestructTime,
      destructTime,
      amount,
      anonymity,
      tinyMCEEditor
    } = this.state;
    
    if (!this.validateForm()) return;

    const { connectedUser } = this.props;

    const { sendMsg, getWallets, getMessages } = this.props;
    for ( var i = 0; i < files.length; i ++ ) {
      formData.append("files", files[i]);
    }
    formData.append("id",connectedUser.id);
    formData.append("addresses", JSON.stringify(addresses));
    formData.append("replyTo", replyTo);
    formData.append("selfDestructTime", selfDestructTime);
    formData.append("destructTime", destructTime);
    formData.append("message", tinyMCEEditor.getContent());
    formData.append("amount", amount);
    formData.append("anonymity", anonymity);

    sendMsg(formData);
    tinyMCEEditor.resetContent();
    this.setState({
      ...this.state,
      addresses: [''],
      files: [],
      totalSize: 0,
      replyTo: false,
      selfDestructTime: false,
      amount: 0,
      minimumAmount: 0,
      formattedAmount: '',
      destructTime: 0,
      anonymity: 2,
      errors: {
        ...this.state.errors,
        amount: '',
        minimumAmount: '',
        destructTime: '',
        anonymity: '',
        recipients: '',
        message: '',
      },
    });

    setTimeout(() => {
      getWallets(connectedUser.id);
      getMessages(connectedUser.id);
    }, 1000);
  }

  componentDidMount() {
    const { connectedUser } = this.props;
    this.setState({
      ...this.state,
      addr_list: connectedUser.contacts,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { messages, connectedUser } = nextProps;
    if(messages) {
      this.setState({
        row: messages,
        addr_list: connectedUser.contacts
      });
    }
  }

  render() {
    const {
      adModalOpen,
      saModalOpen,
      currentPage,
      rowsPerPage,
      pageNumberOfPage,
      row,
      message,
      tab,
      addresses,
      files,
      totalSize,
      addr_list,
      replyTo,
      selfDestructTime,
      destructTime,
      amount,
      formattedAmount,
      anonymity,
      errors,
      is_prev,
      is_next,
      minimumAmount
    } = this.state;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = row.slice(indexOfFirstRow, indexOfLastRow);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(row.length / rowsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => (
      <ListItem
        key={number}
        id={number}
        className={pageNumberOfPage === number ? 'active' : ''}
        onClick={this.paginateHandler(number)}
      >
        {number}
      </ListItem>
    ));

    const renderAddresses = addresses.map((row,index) => (
      <Grid container spacing={16} key={index}>
        <Grid item xs={10}>
          <TextField
            label="Send To"
            className="inputStyle"
            helperText={errors.recipients}
            name="address"
            variant="outlined"
            value={row}
            onChange={this.changeAddressHandler(index)}
          />
        </Grid>
        <Grid item xs={2} style={{textAlign: 'right'}}>
          <List className="sendToBtns">
            <Tooltip title="Address Book" placement="bottom">
              <ListItem style={{ marginRight: '5px !important' }} onClick={this.selectAddress(index)} varient="contained">
                <Images src={addressIcon}/>
              </ListItem>
            </Tooltip>
            <Tooltip title="Paste from Clipboard" placement="bottom">
              <ListItem style={{ marginRight: '5px !important' }} onClick={this.fromClipboard(index)} varient="contained">
                <Images src={editCopyIcon}/>
              </ListItem>
            </Tooltip>
            <Tooltip title="Remove Recipient" placement="bottom">
              <ListItem style={{ marginRight: '5px !important', display: index==0?'none':'display' }} onClick={this.removeRecipient(index)} varient="contained">
                <Images src={removeItemIcon}/>
              </ListItem>
            </Tooltip>
          </List>
        </Grid>
      </Grid>
    ));

    const renderFiles = files.map((row,index) => (
      <Grid container spacing={16} key={index}>
        <Grid item xs={11}>
          <TextField
            label="Files"
            className="inputStyle"
            name="file"
            variant="outlined"
            value={row.name}
            onChange={this.changeFileHandler(index)}
          />
        </Grid>
        <Grid item xs={1} style={{textAlign: 'right'}}>
          <List className="sendToBtns">
            <Tooltip title="Remove Attachment" placement="bottom">
              <ListItem onClick={this.removeFile(index)} varient="contained">
                <Images src={removeItemIcon}/>
              </ListItem>
            </Tooltip>
          </List>
        </Grid>
      </Grid>
    ));

    return (
      <Grid className="messageWrapper">
        <Grid className="container">
          <AppBar className="messageTabsBar" position="static" color="default">
            <Typography className="messageTitle" component="p">
            </Typography>
            <Tabs
              value={tab}
              onChange={this.tabChangeHandler}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              className="tabsWrapper"
            >
              <Tab
                disableRipple
                label="Messages"
                icon={<Image src={messageIcon} />}
              />
              <Tab
                disableRipple
                label="Send Message"
                icon={<Image src={messageIcon} />}
              />
              </Tabs>
          </AppBar>
          {tab === 0 && (
            <Grid className="messageBody">
              <Grid container alignItems="center" className="messageHeader">
                <Grid item xs={12} sm={6}>
                  <Typography className="section-title" component="h4">
                    Messages
                  </Typography>
                </Grid>
              </Grid>
              <Grid className="tableWrapper">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Height</TableCell>
                      <TableCell>Message</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentRows.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.datetime}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.blockHeight}</TableCell>
                        <TableCell>{row.message}</TableCell>
                        <TableCell>
                          <List className="actionBtns">
                            <ListItem onClick={this.detailHandler(row, index)} style={{ marginRight: '5px !important' }}>
                              <Images src={messageIcon} className="message-detail-btn" />
                            </ListItem>
                          </List>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
              <Grid className="PaginationWrapper">
                <List>{renderPageNumbers}</List>
              </Grid>
            </Grid>
          )}
          {tab === 1 && (
            <Grid className="messageBody">
              <Grid container alignItems="center" className="messageHeader">
                <Grid item xs={12} sm={6} style={{marginBottom: '20px'}}>
                  <Typography className="section-title" component="h4">
                    Send Message
                  </Typography>
                </Grid>
                {renderAddresses}
                <Grid item xs={12} sm={12} style={{marginBottom: '20px'}}>
                  <Typography className="section-title">
                    Encrypted Message
                  </Typography>
                  <Editor
                    onInit={this.onInitTinyMCE}
                    apiKey='wrr9w9f7h354nq4bwxc39gmqcsfbk8a6t8g6qz51h27lnya5'
                    init = {{
                      height: 400,
                      menubar: false,
                      plugins: [
                        'advlist lists image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                      ],
                      toolbar: 'copy cut paste | ' +
                      'bold italic underline fontselect forecolor | alignleft aligncenter ' +
                      'alignright alignjustify',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onChange={this.handleEditorChange}
                    onKeyUp={this.calcAmount}
                    onExecCommand={this.calcAmount}
                  />
                  <Typography>{errors.message}</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  {renderFiles}
                </Grid>
                <Grid item xs={12} sm={12}>
                  {totalSize > 0 && 
                    <Grid sx={{ display: 'inline-flex', alignItems: 'center' }}>
                      <Grid item xs={12}>
                        <LinearProgress variant="determinate" style={{ height: "20px" }} value={ percent(totalSize, MAX_ATTACHMENT_SIZE) } />
                      </Grid>
                      <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          Used {(totalSize / 1024 / 1024).toFixed(2)} MB of {(MAX_ATTACHMENT_SIZE / 1024 / 1024).toFixed(2)} MB {percent(totalSize, MAX_ATTACHMENT_SIZE)}%
                        </Typography>
                      </Grid>
                    </Grid>
                  }
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControlLabel
                    control={<Checkbox checked={replyTo} onChange={this.handleChange} name="replyTo" color="default" />}
                    label='Add "Reply to"'
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControlLabel
                    control={<Checkbox checked={selfDestructTime} onChange={this.handleChange} name="selfDestructTime" color="default" />}
                    label='Set self destruct time'
                  />
                  { selfDestructTime && 
                    <TextField
                      label="Destruct time"
                      className="inputStyle"
                      name="destructTime"
                      helperText={errors.destructTime}
                      variant="outlined"
                      type="number"
                      min={ MIN_TTL }
                      max={MAX_TTL/MIN_TTL}
                      placeholder="Destruct time"
                      value={destructTime}
                      onChange={this.changeHandler}
                      style={{width: '80%'}}
                    />
                  }
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    label="Anonymity level"
                    helperText={errors.anonymity}
                    id="anonymity"
                    className="inputStyleBasic"
                    name="anonymity"
                    type="number"
                    min="0"
                    max="10"
                    value={anonymity}
                    placeholder="Anonymity Level"
                    onChange={this.changeHandler}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    label="Fee"
                    helperText={errors.amount}
                    id="amount"
                    disabled={true}
                    className="inputStyleBasic"
                    name="amount"
                    value={formattedAmount}
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} className="sendActions">
                  <Button type="button" className="btnMsg" onClick={this.onAddRecipient}>
                    ADD RECIPIENT
                  </Button>
                  <input type="file" id="fileSelect" onChange={this.onFileChange} style={{display: 'none'}} ref={input => this.fileElement = input} />
                  <Button type="button" className="btnMsg" onClick={this.onAddAttachment}>
                    ADD ATTACHMENT
                  </Button>
                  <Button type="button" className="btnMsg" onClick={this.onSend}>
                    SEND
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}

          <MessageDetail
            message={message}
            is_prev={is_prev}
            is_next={is_next}
            adModalOpen={adModalOpen}
            adModalCloseHandler={this.adModalCloseHandler}
            adModalReplyHandler={this.adModalReplyHandler}
            adModalPrevHandler={this.adModalPrevHandler}
            adModalNextHandler={this.adModalNextHandler}
            adModalDownloadHandler={this.adModalDownloadHandler}
          />
          <SelectAddress
            addresses={addr_list}
            adModalOpen={saModalOpen}
            adModalCloseHandler={this.adModalCloseHandler}
            adModalSelectHandler={this.adModalSelectHandler}
          />
        </Grid>

      </Grid>
    );
  }
}

Messages.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  connectedUser: selectUser(state),
  messages: selectMessages(state),
});

const mapDispatchToProps = (dispatch) => ({
  getMessages: (payload) => dispatch(getMessageStart(payload)),
  getUser: () => dispatch(getUser()),
  downloadAttachment: (payload) => dispatch(downloadAttachmentStart(payload)),
  sendMsg: (payload) => dispatch(sendMsgStart(payload)),
  getWallets: (payload) => dispatch(getWalletStart(payload))
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'messages', reducer });
const withSaga = injectSaga({ key: 'messages', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Messages);
