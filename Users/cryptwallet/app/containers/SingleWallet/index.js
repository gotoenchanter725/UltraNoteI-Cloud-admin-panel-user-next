/**
 *
 * SingleWallet
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
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Button } from '@material-ui/core';

import makeSelectSingleWallet from './selectors';
import reducer from './reducer';
import saga from './saga';
import Image from '../../components/uiStyle/Images';
import FontAwesome from '../../components/uiStyle/FontAwesome';

// icons
import WalletAction from '../../images/icon/action/wallet-action.png';
import GroupAction from '../../images/icon/action/group-action.png';
import ShareAction from '../../images/icon/action/share-action.png';

import messages from './messages';

import './style.scss';
import SingleWalletDeposite from '../SingleWalletDeposite';
import SingleWalletWithdraw from '../SingleWalletWithdraw';
import SingleWalletActivity from '../SingleWalletActivity';

function TabContainer(props) {
  return (
    <Typography component="div">
      {props.children}
    </Typography>
  );
}

/* eslint-disable react/prefer-stateless-function */
export class SingleWallet extends React.Component {


  render() {
    const { row, tab, tabChangeHandler, viewAllWalletOpenHandle, awNewWalletAddress, optimizeWallet } = this.props;
    return (
      <Grid className="container">
        <AppBar className="walletTabsBar" position="static" color="default">
          <Typography className="sWalletTitle" component="p">
          </Typography>
          <Tabs
            value={tab}
            onChange={tabChangeHandler}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            className="tabsWrapper"
          >
            <Tab
              disableRipple
              label="Deposite"
              icon={<Image src={WalletAction} />}
            />
            <Tab
              disableRipple
              label="Withdraw"
              icon={<Image src={ShareAction} />}
            />
            <Tab
              disableRipple
              label="Activity"
              icon={<Image src={GroupAction} />}
            />
          </Tabs>
          <Button className="btn btnBlue" onClick={viewAllWalletOpenHandle}>
            <FontAwesome name="reply" />
            Wallet
          </Button>
        </AppBar>
        {tab === 0 && (
          <TabContainer>
            <SingleWalletDeposite row={row} awNewWalletAddress={awNewWalletAddress} optimizeWallet={optimizeWallet}/>
          </TabContainer>
        )}
        {tab === 1 && (
          <TabContainer>
            <SingleWalletWithdraw row={row} />
          </TabContainer>
        )}
        {tab === 2 && (
          <TabContainer>
            <SingleWalletActivity row={row} />
          </TabContainer>
        )}
      </Grid>
    );
  }
}

SingleWallet.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  singleWallet: makeSelectSingleWallet(),
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

const withReducer = injectReducer({ key: 'singleWallet', reducer });
const withSaga = injectSaga({ key: 'singleWallet', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SingleWallet);
