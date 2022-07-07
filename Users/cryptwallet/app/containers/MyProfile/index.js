/**
 *
 * MyProfile
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { injectIntl } from 'react-intl';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import makeSelectMyProfile from './selectors';
import reducer from './reducer';
import saga from './saga';

import Image from '../../components/uiStyle/Images';
import ProfileIcon from '../../images/icon/my-profile/profile.svg';
import EditProfileIcon from '../../images/icon/my-profile/edit-profile.svg';
import PhoneVarificationIcon from '../../images/icon/my-profile/phone-varification.svg';
import IdVarificationIcon from '../../images/icon/my-profile/id-varification.svg';
import ResetPasswordIcon from '../../images/icon/my-profile/reset-password.svg';
import ActivityLogIcon from '../../images/icon/my-profile/activity-log.svg';

import './style.scss';
import Profile from '../Profile';
import EditProfile from '../EditProfile';
import PhoneVarification from '../PhoneVarification';
import IdVarification from '../IdVarification';
import RessetPassword from '../RessetPassword';
import ActivityLog from '../ActivityLog';

function TabContainer(props) {
  return (
    <Typography component="div" className="tabsContent">
      {props.children}
    </Typography>
  );
}

/* eslint-disable react/prefer-stateless-function */
export class MyProfile extends React.Component {
  state = {
    tab: 0,
  };

  tabChangeHandler = (event, value) => {
    this.setState({ tab: value });
  };

  render() {
    const { tab } = this.state;

    return (
      <Grid className="myProfileWrapper">
        <Grid className="container">
          <AppBar className="tabsBar" position="static" color="default">
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
                label="Profile"
                icon={<Image src={ProfileIcon} />}
              />
              <Tab
                disableRipple
                label="Edit Profile"
                icon={<Image src={EditProfileIcon} />}
              />
              <Tab
                disableRipple
                label="Reset Password"
                icon={<Image src={ResetPasswordIcon} />}
              />
              <Tab
                disableRipple
                label="Activity Log"
                icon={<Image src={ActivityLogIcon} />}
              />
            </Tabs>
          </AppBar>
          {tab === 0 && (
            <TabContainer>
              <Profile />
            </TabContainer>
          )}
          {tab === 1 && (
            <TabContainer>
              <EditProfile />
            </TabContainer>
          )}
          {tab === 2 && (
            <TabContainer>
              <RessetPassword />
            </TabContainer>
          )}
          {tab === 3 && (
            <TabContainer>
              <ActivityLog />
            </TabContainer>
          )}
        </Grid>
      </Grid>
    );
  }
}

MyProfile.propTypes = {};

const mapStateToProps = createStructuredSelector({
  myProfile: makeSelectMyProfile(),
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

const withReducer = injectReducer({ key: 'myProfile', reducer });
const withSaga = injectSaga({ key: 'myProfile', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MyProfile);
