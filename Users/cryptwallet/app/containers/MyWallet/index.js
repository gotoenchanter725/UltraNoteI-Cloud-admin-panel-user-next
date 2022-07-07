/**
 *
 * MyWallet
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
import { Button, List, ListItem } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectMyWallet from './selectors';

import Images from '../../components/uiStyle/Images';

// icons
import WalletAction from '../../images/icon/action/wallet-action.png';
import GroupAction from '../../images/icon/action/group-action.png';
import ShareAction from '../../images/icon/action/share-action.png';
import KeyAction from '../../images/icon/action/key-action.png';

import './style.scss';
import AddWallet from '../../components/AddWallet';
import MoveCoin from '../../components/MoveCoin';
import { isAmount } from '../../utils/commonFunctions';
import SingleWallet from '../SingleWallet';
import { toast } from 'react-toastify';
import {selectUser} from '../../store/auth/auth.selectors';
import {addWalletStart, updateWalletStart, getTransactionsByWalletAddressStart, getWalletStart, optimizeWalletStart} from '../../store/wallet/wallet.actions';
import {getUser} from '../../store/auth/auth.actions';
import { selectWallets } from '../../store/wallet/wallet.selectors';

const Row = [
  // {
  //   id: 1,
  //   name: 'Btc Wallet 1',
  //   balance: '0.000000',
  //   updated_at: '2019-01-24 12:50:17',
  // },
  // {
  //   id: 2,
  //   name: 'Personal Wallete',
  //   balance: '0.000000',
  //   updated_at: '2019-01-24 12:50:17',
  // },
  // {
  //   id: 3,
  //   name: 'Business Wallet',
  //   balance: '0.000000',
  //   updated_at: '2019-01-24 12:50:17',
  // },
  // {
  //   id: 4,
  //   name: 'Business Wallet',
  //   balance: '0.45245',
  //   updated_at: '2019-01-24 12:50:17',
  // },
  // {
  //   id: 5,
  //   name: 'Business Wallet',
  //   balance: '0.111',
  //   updated_at: '2019-01-24 12:50:17',
  // },
  // {
  //   id: 6,
  //   name: 'Business Wallet',
  //   balance: '0.2785',
  //   updated_at: '2019-01-24 12:50:17',
  // },
  // {
  //   id: 7,
  //   name: 'Business Wallet',
  //   balance: '0.547',
  //   updated_at: '2019-01-24 12:50:17',
  // },
  // {
  //   id: 8,
  //   name: 'Business Wallet',
  //   balance: '0.045',
  //   updated_at: '2019-01-24 12:50:17',
  // },
  // {
  //   id: 9,
  //   name: 'Business Wallet',
  //   balance: '0.2570',
  //   updated_at: '2019-01-24 12:50:17',
  // },
  // {
  //   id: 10,
  //   name: 'Business Wallet',
  //   balance: '0.2222',
  //   updated_at: '2019-01-24 12:50:17',
  // },
  // {
  //   id: 11,
  //   name: 'Business Wallet',
  //   balance: '0.450',
  //   updated_at: '2019-01-24 12:50:17',
  // },
  // {
  //   id: 12,
  //   name: 'Business Wallet',
  //   balance: '0.74850',
  //   updated_at: '2019-01-24 12:50:17',
  // },
];

/* eslint-disable react/prefer-stateless-function */
export class MyWallet extends React.Component {
  state = {
    awModalOpen: false,
    wallet_name: '',
    mcModalOpen: false,
    sender_account: '',
    reciver_account: '',
    amount: '',
    row: Row,
    currentPage: 1,
    rowsPerPage: 4,
    pageNumberOfPage: 1,
    walletView: 'all-wallet',
    selectedWallet: {},
    tab: 0,
  };

  constructor(props) {
    super(props);
    const {getWallets, connectedUser} = this.props;
    if (connectedUser){
      getWallets(connectedUser.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {wallets} = nextProps;
    if(wallets) {
      if (this.state.selectedWallet) {
        let newSelectedWallet;
        wallets.forEach(wallet => {
          if(this.state.selectedWallet.id == wallet._id || this.state.selectedWallet.id == wallet.id) {
            newSelectedWallet = wallet;
          }
        });

        if (newSelectedWallet) {
          this.setState({
            row: wallets,
            selectedWallet: newSelectedWallet
          });
          return;
        }
      }

      this.setState({
        row: wallets
      });
    }
  }

  awHandleClickOpen = () => {
    this.setState({ awModalOpen: true });
  };

  awModalCloseHandler = () => {
    this.setState({
      awModalOpen: false,
    });
  };

  awChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  awSubmitHandler = e => {
    e.preventDefault();

    const {connectedUser} = this.props;
    const {addNewWallet} = this.props;
    const {getUser} = this.props;
    const newWallet = {
      id: connectedUser.id,
      name: this.state.wallet_name,
    };

    Row.unshift(newWallet);

    if (this.state.wallet_name === ''){
      toast.error("Please give a valid info!")
    } else {
      this.setState({
        wallet_name: '',
        awModalOpen: false,
      });
      addNewWallet(newWallet);
      getUser();
    }

  };
  optimizeWallet = (row) => {
    const {optimizeWallet} = this.props;
    optimizeWallet({id: row.id, name: row.name});
  }
  awNewWalletAddress = (row) => {

    const {connectedUser} = this.props;
    const {updateWallet} = this.props;

    const Wallet = {
      user_id: connectedUser.id,
      name: row.name,
      id: row._id,
    };

    updateWallet(Wallet);
  };

  mcHandleClickOpen = () => {
    this.setState({ mcModalOpen: true });
  };

  mcModalCloseHandler = () => {
    this.setState({
      mcModalOpen: false,
    });
  };

  mcChangeHandler = e => {
    if (e.target.name === 'amount') {
      if (isAmount(e.target.value)) {
        this.setState({ [e.target.name]: e.target.value });
      }
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  mcSubmitHandler = e => {
    e.preventDefault();

    const {wallet_name, sender_account, reciver_account} = this.state;

    if (amount === '' || sender_account === '' || reciver_account === ''){
      toast.error("Please give a valid info!")
    } else {
      this.setState({
        mcModalOpen: false,
        sender_account: '',
        reciver_account: '',
        amount: '',
      });
      toast.success("Coin Moved Successfully!");
    }


  };

  paginateHandler = prop => event => {
    this.setState({
      currentPage: Number(event.target.id),
      pageNumberOfPage: prop,
    });
  };

  walletViewHandler = (row, tab) => e => {

    const {getTransactionsByWallet} = this.props;
    getTransactionsByWallet(row.address);
    this.setState({
      walletView: 'single-wallet',
      selectedWallet: row,
      tab,
    });
  };

  viewAllWalletOpenHandle = () => {
    this.setState({
      walletView: 'all-wallet',
    });
  };

  tabChangeHandler = (event, value) => {
    this.setState({ tab: value });
  };

  render() {
    const { classes } = this.props;

    const {
      row,
      currentPage,
      rowsPerPage,
      pageNumberOfPage,
      awModalOpen,
      mcModalOpen,
      wallet_name,
      sender_account,
      reciver_account,
      amount,
      walletView,
      selectedWallet,
      tab,
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
    return (
      <Grid className="myWalletWrapper">
        {walletView === 'all-wallet' ? (
          <Grid className="container">
            <Grid className="myWalletBody">
              <Grid container alignItems="center" className="walletHeader">
                <Grid item xs={12} sm={6}>
                  <Typography className="section-title" component="h4">
                    Wallet Transaction Activity
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid className="walletMenus">
                    {!this.props.connectedUser?.isWalletCreated && <Button
                      onClick={this.awHandleClickOpen}
                      className="btn btnBlue"
                    >
                      Create Wallet
                    </Button>}
                    {/* <Button
                      onClick={this.mcHandleClickOpen}
                      className="btn btnSky"
                    >
                      Move Coin
                    </Button> */}
                  </Grid>
                </Grid>
              </Grid>
              <Grid className="tableWrapper">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Balance</TableCell>
                      <TableCell>Updated At</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentRows.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.balance}</TableCell>
                        <TableCell className="dateTd">{new Date(row.updatedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <List className="actionBtns">
                            <ListItem onClick={this.walletViewHandler(row, 0)}>
                              <Images src={WalletAction} />
                            </ListItem>
                            <ListItem onClick={this.walletViewHandler(row, 2)}>
                              <Images src={GroupAction} />
                            </ListItem>
                            <ListItem onClick={this.walletViewHandler(row, 1)}>
                              <Images src={ShareAction} />
                            </ListItem>
                            {row.id === 2 ? (
                              <ListItem>
                                <Images src={KeyAction} />
                              </ListItem>
                            ) : (
                              ''
                            )}
                          </List>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
            <Grid className="PaginationWrapper">
              <List>{renderPageNumbers}</List>
            </Grid>
          </Grid>
        ) : (
          ''
        )}
        {walletView === 'single-wallet' ? (
          <SingleWallet
            tab={tab}
            tabChangeHandler={this.tabChangeHandler}
            row={selectedWallet}
            viewAllWalletOpenHandle={this.viewAllWalletOpenHandle}
            awNewWalletAddress = {this.awNewWalletAddress}
            optimizeWallet = {this.optimizeWallet}
          />
        ) : (
          ''
        )}
        <AddWallet
          wallet_name={wallet_name}
          awModalOpen={awModalOpen}
          awModalCloseHandler={this.awModalCloseHandler}
          awChangeHandler={this.awChangeHandler}
          awSubmitHandler={this.awSubmitHandler}
        />
        <MoveCoin
          mcModalOpen={mcModalOpen}
          sender_account={sender_account}
          reciver_account={reciver_account}
          amount={amount}
          mcChangeHandler={this.mcChangeHandler}
          mcSubmitHandler={this.mcSubmitHandler}
          mcModalCloseHandler={this.mcModalCloseHandler}
        />
      </Grid>
    );
  }
}

MyWallet.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  connectedUser: selectUser(state),
  wallets: selectWallets(state)
});

const mapDispatchToProps = (dispatch) => ({
  addNewWallet: (payload) => dispatch(addWalletStart(payload)),
  getWallets: (payload) => dispatch(getWalletStart(payload)),
  getTransactionsByWallet: (address) => dispatch(getTransactionsByWalletAddressStart(address)),
  updateWallet: (payload) => dispatch(updateWalletStart(payload)),
  getUser: () => dispatch(getUser()),
  optimizeWallet: (payload) => dispatch(optimizeWalletStart(payload))
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'myWallet', reducer });
const withSaga = injectSaga({ key: 'myWallet', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MyWallet);
