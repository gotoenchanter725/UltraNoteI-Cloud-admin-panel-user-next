/**
 *
 * SingleWalletDeposite
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import CopyAction from '../../images/icon/action/copy-action.png';

import { toast } from 'react-toastify';

import QRCode from 'qrcode';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import Form from '../../components/uiStyle/Form';
import makeSelectSingleWalletDeposite from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { List, ListItem } from '@material-ui/core';

import Images from '../../components/uiStyle/Images';
import './style.scss';
import { address } from 'ip';

/* eslint-disable react/prefer-stateless-function */
export class SingleWalletDeposite extends React.Component {
  state = {
    qr_code: '',
    address: '',
    showAddress: false,
    spendKey: '',
    viewKey: '',
  };

  componentDidMount() {
    const {row} = this.props;
    const data = row.address;
    QRCode.toDataURL(data)
      .then(url => {
        this.setState({
          qr_code: url,
          address: row.address || 'No address for this wallet ! ',
          spendKey: row.spendKey || '',
          viewKey: row.viewKey || ''
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentWillReceiveProps(nextProps) {
    const {row} = nextProps;
    const data = row.address;
    QRCode.toDataURL(data || 'No address for this wallet ! ')
      .then(url => {
        this.setState({
          qr_code: url,
          address: row.address || 'No address for this wallet ! ',
          spendKey: row.spendKey || '',
          viewKey: row.viewKey || ''
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  copyHandler = e => {
    e.preventDefault();
    navigator.clipboard.writeText(this.state.address);

    toast.info("Copied to clipboard");
  };

  copySpendKeyHandler = e => {
    e.preventDefault();
    navigator.clipboard.writeText(this.state.spendKey);

    toast.info("Copied to clipboard");
  };

  copyViewKeyHandler = e => {
    e.preventDefault();
    navigator.clipboard.writeText(this.state.viewKey);

    toast.info("Copied to clipboard");
  };

  generateAddressHandler = async () => {
    const {awNewWalletAddress} = this.props;
    const { row } = this.props;
    awNewWalletAddress(row);
  };
  optimizeWalletHandler = async () => {
    if(window.confirm('Please allow 10 min for wallet optimization.')) {
      const {optimizeWallet} = this.props;
      optimizeWallet(this.props.row);
    }
  };

  showAddressHandler = () => {
    this.setState({
      showAddress: true,
    });
  };

  render() {
    const { address, qr_code, showAddress } = this.state;

    const AddressTable = (
      <Grid className="addressTable">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Key</TableCell>
              <TableCell>Key Type</TableCell>
              <TableCell> Copy</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{this.state.spendKey}</TableCell>
              <TableCell className="dateTd">Spend Key</TableCell>
              <TableCell>
                <List className="actionBtns">
                  <ListItem onClick={this.copySpendKeyHandler}>
                    <Images src={CopyAction} />
                  </ListItem>
                </List>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{this.state.viewKey}</TableCell>
              <TableCell className="dateTd">View Key</TableCell>
              <TableCell>
                <List className="actionBtns">
                  <ListItem onClick={this.copyViewKeyHandler}>
                    <Images src={CopyAction} />
                  </ListItem>
                </List>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    );

    return (
      <Grid className="qrResults">
        <Grid container>
          <Grid item xs={12} md={3}>
            <Images className="qrImage" src={qr_code} />
          </Grid>
          <Grid item xs={12} md={9}>
            <Form onSubmit={this.copyHandler}>
              <TextField
                InputProps={{
                  disabled: true,
                }}
                className="addressInput"
                value={address}
              />
              <Button type="submit">Copy</Button>
            </Form>
            {/*<Typography
              onClick={this.generateAddressHandler}
              className="generateNewAdress"
              component="p"
            >
              Generate a new address
              </Typography>*/}
            <p>
            <Typography
              onClick={this.optimizeWalletHandler}
              className="generateNewAdress"
              component="p"
            >
              Optimize Wallet
            </Typography>
            </p>
            <Grid className="addressList">
              <Button
                onClick={this.showAddressHandler}
                disabled={showAddress}
                className={`formSubmitBtn ${showAddress && 'disableBtn'}`}
              >
                Show Keys
              </Button>
              {showAddress ? AddressTable : ''}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

SingleWalletDeposite.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  singleWalletDeposite: makeSelectSingleWalletDeposite(),
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

const withReducer = injectReducer({ key: 'singleWalletDeposite', reducer });
const withSaga = injectSaga({ key: 'singleWalletDeposite', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SingleWalletDeposite);
