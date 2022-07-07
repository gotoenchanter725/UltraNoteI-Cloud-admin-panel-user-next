/**
 *
 * SingleWalletActivity
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Button, List, ListItem } from '@material-ui/core';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectSingleWalletActivity from './selectors';

import WalletActivityTable from '../../components/WalletActivityTable';

import './style.scss';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { selectTransactions } from '../../store/wallet/wallet.selectors';

const DepositeRow = [
  {
    id: 1,
    address: '2NCzoqbY7CXitVwwiNDq9MqvjDJV4DcBj3Q',
    amount: '12.654',
    hash: '2NCzoqbY7CXitVwwiNDq9MqvjDJV4DcBj3Q',
    updated_at: '2019-01-24  12:50:17',
  },
  {
    id: 2,
    address: '2NCzoqbY7CXitVww77g7g7g7g7g77g7g',
    amount: '12.1111',
    hash: '2NCzoqbY7CXitVwwiNDq9MqvjDJV4DcBj3Q',
    updated_at: '2019-01-24  12:50:17',
  },
  {
    id: 3,
    address: '2NCzoqbY7CXitVwwiND65r4g36d8rg',
    amount: '12.224545',
    hash: '2NCzoqbY7CXitVwwiNDq9MqvjDJV4DcBj3Q',
    updated_at: '2019-01-24  12:50:17',
  },
];

const WithdrawRow = [
  {
    id: 1,
    address: '2NCzoqbY7CXitVwwiNDq9MqvjDJV4DcBj3Q',
    amount: '455.93939999',
    hash: '2NCzoqbY7CXitVwwiNDq9MqvjDJV4DcBj3Q',
    updated_at: '2019-01-24  12:50:17',
  },
  {
    id: 2,
    address: '2NCzoqbY7CXitVww77g7g7g7g7g77g7g',
    amount: '4524.8',
    hash: '2NCzoqbY7CXitVwwiNDq9MqvjDJV4DcBj3Q',
    updated_at: '2019-01-24  12:50:17',
  },
  {
    id: 3,
    address: '2NCzoqbY7CXitVwwiND65r4g36d8rg',
    amount: '45.4058',
    hash: '2NCzoqbY7CXitVwwiNDq9MqvjDJV4DcBj3Q',
    updated_at: '2019-01-24  12:50:17',
  },
];

/* eslint-disable react/prefer-stateless-function */
export class SingleWalletActivity extends React.Component {
  state = {
    deposite_row: DepositeRow,
    currentPage: 1,
    pageNumberOfPage: 1,
    withdraw_row: WithdrawRow,
    currentPageW: 1,
    pageNumberOfPageW: 1,
    rowsPerPage: 20,
    tab: 0,
  };


  paginateDepositeHandler = prop => event => {
    this.setState({
      currentPage: Number(event.target.id),
      pageNumberOfPage: prop,
    });
  };

  paginateWithdrawHandler = prop => event => {
    this.setState({
      currentPageW: Number(event.target.id),
      pageNumberOfPageW: prop,
    });
  };

  tabHandleChange = (e, tab) => {
    this.setState({ tab });
  };

  render() {
    const {
      deposite_row,
      currentPage,
      pageNumberOfPage,
      withdraw_row,
      currentPageW,
      pageNumberOfPageW,
      rowsPerPage,
      tab,
    } = this.state;

    const {
      transactions
    } = this.props;
    
    return (
      <Grid className="walletActivity">
        <Grid container alignItems="center" className="walletActivityHeader">
          <Grid item xs={12} sm={6}>
            <Typography className="section-title" component="h4">
              Wallet Transaction Activity
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tabs
              className="wActivityMenus"
              value={tab}
              onChange={this.tabHandleChange}
              classes={{
                indicator: 'indicatorHide',
              }}
            >
              <Tab
                disableRipple
                label="Deposit"
                classes={{
                  root: 'tabItem',
                  selected: 'tabSelected',
                }}
              />
              <Tab
                disableRipple
                label="Withdraw"
                classes={{
                  root: 'tabItem',
                  selected: 'tabSelected',
                }}
              />
            </Tabs>
          </Grid>
        </Grid>
        {tab === 0 && (
          <WalletActivityTable
            rowsPerPage={rowsPerPage}
            row={transactions.deposit}
            type='deposit'
            currentPage={currentPage}
            pageNumberOfPage={pageNumberOfPage}
            paginateHandler={this.paginateDepositeHandler}
          />
        )}
        {tab === 1 && (
          <WalletActivityTable
            rowsPerPage={rowsPerPage}
            row={transactions.withdraw}
            type='withdraw'
            currentPage={currentPageW}
            pageNumberOfPage={pageNumberOfPageW}
            paginateHandler={this.paginateWithdrawHandler}
          />
        )}
      </Grid>
    );
  }
}

SingleWalletActivity.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state =>  ({
  singleWalletActivity: makeSelectSingleWalletActivity(state),
  transactions: selectTransactions(state)

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

const withReducer = injectReducer({ key: 'singleWalletActivity', reducer });
const withSaga = injectSaga({ key: 'singleWalletActivity', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SingleWalletActivity);
