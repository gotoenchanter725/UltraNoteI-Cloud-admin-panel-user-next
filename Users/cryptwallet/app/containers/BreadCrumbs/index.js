/**
 *
 * BreadCrumbs
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Grid from '@material-ui/core/Grid';
import { ListItem, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import Image from 'components/uiStyle/Images';
import BitCoinIcon from 'images/icon/wallet/bitcoin.svg';
import makeSelectBreadCrumbs from './selectors';
import reducer from './reducer';
import saga from './saga';
import Redirect from 'react-router-dom/es/Redirect';

import './style.scss';
import FontAwesome from 'components/uiStyle/FontAwesome';
import {getWalletStart} from '../../store/wallet/wallet.actions';
import { selectAvailableBalance, selectWallets, selectUnconfirmedBalance, selectUSDAvailableBalance, selectUSDUnconfirmedBalance } from '../../store/wallet/wallet.selectors';
import { selectUser } from '../../store/auth/auth.selectors';

/* eslint-disable react/prefer-stateless-function */
class BreadCrumbs extends React.Component {

  constructor(props) {
    super(props);
    
  }

  componentDidMount(){
    const {getWallets, connectedUser} = this.props;
    if (connectedUser){
      getWallets(connectedUser.id);

    }
  }

  componentWillReceiveProps(nextProps){
    const {getWallets, connectedUser} = nextProps;
    if (connectedUser && (!this.props.connectedUser || connectedUser.id != this.props.connectedUser.id)) {
      getWallets(connectedUser.id);
    }
  }

  render() {  
    if (!this.props.connectedUser) {
      return <Redirect to='/login' />;
    };  
    const {availableBalance, unconfirmedBalance, usdAvailableBalance, usdUnconfirmedBalance} = this.props;
    return (
      <Grid className="breadCrumbs">
        <Grid container alignItems="center" className="container">
          <Grid item xs={12} sm={4} className="breadCrumbInfo">
            <Typography component="div">
              <Image src={this.props.icon} />
              <span>{this.props.title}</span>
            </Typography>
            <List disablePadding className="breadList">
              <ListItem>
                UltraNote Cloud
                <FontAwesome name="caret-right" />
              </ListItem>
              <ListItem className="active">{this.props.title}</ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={8} className="walletInfo">
            <Grid className="walletSingle">
              <Grid className="icon">
                <Image src={BitCoinIcon} />
              </Grid>
              <Grid className="content">
                <Typography component="p">Available Balance</Typography>
                <List>
                  <ListItem>
                    <Typography component="span">{availableBalance}</Typography>
                    XUNI
                  </ListItem>
                  <ListItem>
                    <Typography component="span">{usdAvailableBalance}</Typography>
                    {this.props.connectedUser.currency == 'btc' ?  "BTC" : "USD"}
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            <Grid className="walletSingle pending">
              <Grid className="icon">
                <Image src={BitCoinIcon} />
              </Grid>
              <Grid className="content">
                <Typography component="p">Unconfirmed Balance</Typography>
                <List>
                  <ListItem>
                    <Typography component="span">{unconfirmedBalance}</Typography>
                    XUNI
                  </ListItem>
                  <ListItem>
                    <Typography component="span">{usdUnconfirmedBalance}</Typography>
                    {this.props.connectedUser.currency == 'btc' ?  "BTC" : "USD"}
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

BreadCrumbs.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  breadCrumbs: makeSelectBreadCrumbs(state),
  availableBalance: selectAvailableBalance(state),
  unconfirmedBalance: selectUnconfirmedBalance(state),
  usdAvailableBalance: selectUSDAvailableBalance(state),
  usdUnconfirmedBalance: selectUSDUnconfirmedBalance(state),
  connectedUser: selectUser(state)
});


const mapDispatchToProps = (dispatch) => ({
  getWallets: (id) => dispatch(getWalletStart(id))
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'breadCrumbs', reducer });
const withSaga = injectSaga({ key: 'breadCrumbs', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BreadCrumbs);
