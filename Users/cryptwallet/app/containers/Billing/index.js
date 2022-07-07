/**
 *
 * Billing
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
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Image from '../../components/uiStyle/Images';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectMyWallet from './selectors';

import Images from '../../components/uiStyle/Images';

// icons
import billing from '../../images/icon/invoice.png';

import './style.scss';
import AddWallet from '../../components/AddWallet';
import MoveCoin from '../../components/MoveCoin';
import { isAmount } from '../../utils/commonFunctions';
import SingleWallet from '../SingleWallet';
import { toast } from 'react-toastify';
import { selectUser, selectAllUsers } from '../../store/auth/auth.selectors';
import { addContact, getContactList, getUsers } from '../../store/auth/auth.actions';


function TabContainer(props) {
  return (
    <Typography component="div">
      {props.children}
    </Typography>
  );
}

/* eslint-disable react/prefer-stateless-function */
export class Billing extends React.Component {
  state = {
    tab: 0
  };

  tabChangeHandler = (event, value) => {
    this.setState({ tab: value });
  };

  render() {
    const { tab } = this.state;

    return (
      <Grid className="billingWrapper">
        <Grid className="container">
          <AppBar className="billingTabsBar" position="static" color="default">
            <Typography className="billingTitle" component="p">
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
                label="Billing"
                icon={<Image src={billing} />}
              />
              <Tab
                disableRipple
                label="Billing"
                icon={<Image src={billing} />}
              />
            </Tabs>
          </AppBar>
          {tab === 0 && (
            <TabContainer>

            </TabContainer>
          )}
          {tab === 1 && (
            <TabContainer>

            </TabContainer>
          )}
          <Grid className="billingBody">
            <Grid container alignItems="center" className="billingHeader">
              <Grid item xs={12} sm={6}>
                <Typography className="section-title" component="h4">
                  Billing
            </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    );
  }
}

Billing.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  connectedUser: selectUser(state),
});

const mapDispatchToProps = (dispatch) => ({
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'billing', reducer });
const withSaga = injectSaga({ key: 'billing', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Billing);
