/**
 *
 * BuyCoin
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import QRCode from 'qrcode';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Button, Link } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectBuyCoin from './selectors';
import reducer from './reducer';
import saga from './saga';

import Form from '../../components/uiStyle/Form';

import './style.scss';
import CloudDownloadIcon from '../../images/icon/upload-to-cloud.png';
import {
  isAmount,
  isValueText,
  valueIsNumber,
} from '../../utils/commonFunctions';
import TransactionsByBitCoin from '../../components/TransactionsByBitCoin';
import Image from '../../components/uiStyle/Images';
import BuyCoinByQr from '../../components/BuyCoinByQr';
import { toast } from 'react-toastify';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
  },
});

/* eslint-disable react/prefer-stateless-function */
export class BuyCoin extends React.Component {
  state = {
    coin_amount: '',
    payment_type: 'deposit',
    files: null,
    fileName: '',
    fileType: '',
    fileSize: '',
    holder_name: '',
    card_number: '',
    cvv_number: '',
    expaire_date: new Date(),
    qrOpen: false,
    address: '',
  };

  handleDateChange = date => {
    this.setState({ expaire_date: date });
  };

  changeHandler = e => {
    if (isAmount(e.target.value)) {
      this.setState({
        [e.target.name]: e.target.value,
        Image,
      });
    }
  };

  paymentChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value,
      files: null,
      fileName: '',
      fileType: '',
      fileSize: '',
      holder_name: '',
      card_number: '',
      cvv_number: '',
      qrOpen: '',
      expaire_date: new Date(),
      qrCode: null,
      address: '',
    });
  };

  submitHandler = e => {
    e.preventDefault();

    const paymenttype = this.state.payment_type;
    if (paymenttype === 'bitcoin') {
      QRCode.toDataURL('Hi, I am Rashed!')
        .then(url => {
          this.setState({
            qrCode: url,
            qrOpen: true,
            address: '2NCzoqbY7CXitVwwiNDq9MqvjDJV4DcBj3Q2NCzoqbY7CXi',
          });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            qrOpen: false,
          });
        });
    }

    const {coin_amount, payment_type, files, fileName, fileType, fileSize, holder_name, card_number, cvv_number, expaire_date, qrOpen, address} = this.state;
    
    if (payment_type === 'deposit'){
      if (coin_amount === '') {
        toast.warn("Coin Amount can't be emtpy!");
      } else if (files === null){
        toast.warn("Upload bank Receipt!");
      }
      else {
        this.setState({
          coin_amount: '',
          files: null,
          fileName: '',
          fileType: '',
          fileSize: '',
          holder_name: '',
          card_number: '',
          expaire_date: new Date(),
          cvv_number: '',
        });
        toast.success("Succeddfull");
      }
    }

    if (payment_type === 'card'){
      if (coin_amount === '') {
        toast.warn("Coin Amount can't be emtpy!");
      } else if (holder_name === ''){
        toast.warn("holder_name can't be emtpy!");
      } else if (card_number === ''){
        toast.warn("card_number can't be emtpy!");
      } else if (cvv_number === ''){
        toast.warn("cvv_number can't be emtpy!");
      }
      else {
        this.setState({
          coin_amount: '',
          files: null,
          fileName: '',
          fileType: '',
          fileSize: '',
          holder_name: '',
          card_number: '',
          expaire_date: new Date(),
          cvv_number: '',
        });
        toast.success("Succeddfull");
      }
    }
    if (payment_type === 'bitcoin'){
      if (coin_amount === '') {
        toast.warn("Coin Amount can't be emtpy!");
      } else {
        this.setState({
          coin_amount: '',
          files: null,
          fileName: '',
          fileType: '',
          fileSize: '',
          holder_name: '',
          card_number: '',
          expaire_date: new Date(),
          cvv_number: '',
        });
        toast.success("Succeddfull");
      }
    }

  };

  handleImageChange = e => {
    e.preventDefault();

    // FileList to Array
    const files = Array.from(e.target.files);

    files.forEach((file, i) => {
      const reader = new FileReader();

      const fileFullName = e.target.files[0].name;
      const fileName = fileFullName.split('.')[0];
      const fileType = fileFullName.split('.')[1];

      let fileOriginalSize = (e.target.files[0].size / 1024).toFixed(2);
      let fileSize = `${fileOriginalSize} Kb`;
      if (fileOriginalSize > 1024) {
        fileOriginalSize = (fileOriginalSize / 1024).toFixed(2);
        fileSize = `${fileOriginalSize} Mb`;
      }

      reader.onloadend = () => {
        this.setState({
          files: file,
          fileSize,
          fileName,
          fileType,
        });
      };

      reader.readAsDataURL(file);
    });
  };

  cardChangeHandler = e => {
    if (e.target.name === 'holder_name') {
      if (isValueText(e.target.value)) {
        this.setState({
          [e.target.name]: e.target.value,
        });
      }
    }
    if (valueIsNumber(e.target.value)) {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  copyHandler = e => {
    e.preventDefault();
    navigator.clipboard.writeText(this.state.address);
    toast.info("copied to clipboard")
  };

  render() {
    const { classes } = this.props;

    const {
      coin_amount,
      payment_type,
      fileName,
      fileSize,
      fileType,
      holder_name,
      card_number,
      expaire_date,
      cvv_number,
      qrOpen,
      address,
      qrCode,
    } = this.state;

    const bankReciept = (
      <Grid style={{ marginTop: '20px' }}>
        <Typography className="subTitle" component="h5">
          Upload Your Bank Reciept
        </Typography>
        <Button className="uploadReciept">
          {fileName ? (
            <Typography component="h5">
              {`${
                fileName.length >= 15 ? `${fileName.slice(0, 15)}...` : fileName
              }.${fileType}`}{' '}
              | {fileSize}
            </Typography>
          ) : (
            <Image src={CloudDownloadIcon} />
          )}
          <input
            accept=".pdf,.doc"
            type="file"
            id="choose-profile"
            name="choose-profile"
            onChange={this.handleImageChange}
          />
        </Button>
      </Grid>
    );

    const creditCardForm = (
      <Grid className="creditCardForm">
        <Typography className="subTitle" component="h5">
          Please Upload Your Card Informations
        </Typography>
        <TextField
          label="Card Holder Name"
          InputLabelProps={{
            shrink: true,
          }}
          id="holder_name"
          className="inputStyleBasic"
          name="holder_name"
          value={holder_name}
          placeholder="Card Holder Name"
          onChange={this.cardChangeHandler}
        />
        <TextField
          label="Card Number"
          InputLabelProps={{
            shrink: true,
          }}
          id="card_number"
          className="inputStyleBasic"
          name="card_number"
          value={card_number}
          placeholder="Card Number"
          onChange={this.cardChangeHandler}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            disablePast
            className="inputStyleBasic"
            openTo="year"
            format="MM/yyyy"
            label="Expaire Date"
            views={['year', 'month']}
            value={expaire_date}
            onChange={this.handleDateChange}
          />
        </MuiPickersUtilsProvider>
        <TextField
          label="CVV Number"
          InputLabelProps={{
            shrink: true,
          }}
          id="cvv_number"
          className="inputStyleBasic"
          name="cvv_number"
          value={cvv_number}
          placeholder="CVV Number"
          onChange={this.cardChangeHandler}
        />
      </Grid>
    );

    const bitCoinForm = (
      <Fragment>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="For Bit Coin Amount"
          className="inputStyleBasic"
          value="0.007"
          placeholder="BTC Amount"
        />
        <Typography component="p" className="note">
          Note: We use real time rates for BTC conversion, which means when you
          click the purchase button we apply the most recent conversion rate,
          that can cause the YPTO quantity to be slightly different then the
          value we show here We get our conversion rates from{' '}
          <Link href="https://cryptocompare.com">
            https://cryptocompare.com
          </Link>
        </Typography>
      </Fragment>
    );

    const bankInfo = (
      <Grid className="bankInfo">
        <Typography component="h5">Bank Info</Typography>

        <List>
          <ListItem>
            Bank Name
            <Typography component="p">
              <span>:</span> Sample Bank
            </Typography>
          </ListItem>
          <ListItem>
            Branch
            <Typography component="p">
              <span>:</span> Newyork
            </Typography>
          </ListItem>
          <ListItem>
            Account Name
            <Typography component="p">
              <span>:</span> John Doe
            </Typography>
          </ListItem>
          <ListItem>
            Account Number
            <Typography component="p">
              <span>:</span> 9876531457087655
            </Typography>
          </ListItem>
          <ListItem>
            Routing Number
            <Typography component="p">
              <span>:</span> 098765566
            </Typography>
          </ListItem>
        </List>
      </Grid>
    );

    return (
      <Grid className="buyCoinWrapper">
        <Grid className="container">
          <Grid className={`${classes.root} buyCoinSection`}>
            <Grid container spacing={32}>
              <Grid item xs={12} md={6}>
                <Grid className="buyCoinHead">
                  <Typography className="section-title" component="h4">
                    Buy Our Coin From Here
                  </Typography>
                  <Typography component="p">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form.
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography className="section-title" component="h4">
                  Today’s Crypt Coin Rate
                </Typography>
                <Grid className="todayCoinRate">
                  <Typography component="p">
                    <span>1</span> Crypto Coin
                  </Typography>
                  <Typography component="p">=</Typography>
                  <Typography component="p">
                    <span>00.098642</span> USD
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              className={`buyCoinBody ${
                payment_type === 'deposit' ? '' : 'twoColumnInput'
              }`}
            >
              <Grid className="paymentType">
                <Typography className="subTitle" component="h5">
                  Payment Type
                </Typography>

                <Form onSubmit={this.submitHandler}>
                  <Grid container spacing={32}>
                    <Grid item xs={12} md={payment_type === 'deposit' ? 6 : 12}>
                      <FormControl component="fieldset" fullWidth>
                        <RadioGroup
                          aria-label="position"
                          name="payment_type"
                          value={payment_type}
                          onChange={this.paymentChangeHandler}
                          row
                        >
                          <FormControlLabel
                            value="deposit"
                            control={<Radio color="primary" />}
                            label="Bank deposit"
                            labelPlacement="end"
                          />
                          <FormControlLabel
                            value="card"
                            control={<Radio color="primary" />}
                            label="Credit Card"
                            labelPlacement="end"
                          />
                          <FormControlLabel
                            value="bitcoin"
                            control={<Radio color="primary" />}
                            label="Bitcoin"
                            labelPlacement="end"
                          />
                        </RadioGroup>
                      </FormControl>

                      <Grid className="coinAmount">
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          label="Coin Amount"
                          id="coin-amount"
                          className="inputStyleBasic"
                          name="coin_amount"
                          value={coin_amount}
                          placeholder="Your Amount..."
                          onChange={this.changeHandler}
                        />
                      </Grid>

                      {payment_type === 'deposit' ? bankReciept : ''}
                      {payment_type === 'card' ? creditCardForm : ''}
                      {payment_type === 'bitcoin' ? bitCoinForm : ''}
                      <Grid className="divider" />
                      <Button type="submit" className="formSubmitBtn">
                        Buy Now
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {payment_type === 'deposit' ? bankInfo : ''}
                    </Grid>
                  </Grid>
                </Form>
                {qrOpen ? (
                  <BuyCoinByQr
                    copyHandler={this.copyHandler}
                    address={address}
                    qrcode={qrCode}
                  />
                ) : (
                  ''
                )}
                {payment_type === 'bitcoin' ? <TransactionsByBitCoin /> : ''}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

BuyCoin.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  buyCoin: makeSelectBuyCoin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'buyCoin', reducer });
const withSaga = injectSaga({ key: 'buyCoin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(styles)(BuyCoin));
