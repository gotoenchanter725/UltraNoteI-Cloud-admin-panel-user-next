/**
 *
 * ActivityLog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectActivityLog from './selectors';
import reducer from './reducer';
import saga from './saga';
import moment from 'moment';

import messages from './messages';

import './style.scss';
import { IdVarification } from '../IdVarification';
import Typography from '@material-ui/core/Typography';
import { List, ListItem } from '@material-ui/core';
import { userActivity } from '../../store/auth/auth.actions';
import { selectUser, selectUserActivity } from '../../store/auth/auth.selectors';

const Row = [
  {
    action: 'Log In 1',
    source: 'Web',
    ip_address: '202.5.50.101',
    location: 'Bangladesh',
    updated_at: '2019-1-31 08:38:11',
  },
  {
    action: 'Profile Image Upload 2',
    source: 'Web',
    ip_address: '202.5.50.101',
    location: 'Bangladesh',
    updated_at: '2019-1-31 08:38:11',
  },
  {
    action: 'Log In 3',
    source: 'Web',
    ip_address: '202.5.50.101',
    location: 'Bangladesh',
    updated_at: '2019-1-31 08:38:11',
  },
  {
    action: 'Create Address 4',
    source: 'Web',
    ip_address: '202.5.50.101',
    location: 'Bangladesh',
    updated_at: '2019-1-31 08:38:11',
  },
  {
    action: 'Create Address 5',
    source: 'Web',
    ip_address: '202.5.50.101',
    location: 'Bangladesh',
    updated_at: '2019-1-31 08:38:11',
  },
  {
    action: 'Create Address 6',
    source: 'Web',
    ip_address: '202.5.50.101',
    location: 'Bangladesh',
    updated_at: '2019-1-31 08:38:11',
  },
  {
    action: 'Create Address 7',
    source: 'Web',
    ip_address: '202.5.50.101',
    location: 'Bangladesh',
    updated_at: '2019-1-31 08:38:11',
  },
  {
    action: 'Create Address 8',
    source: 'Web',
    ip_address: '202.5.50.101',
    location: 'Bangladesh',
    updated_at: '2019-1-31 08:38:11',
  },
];

const styles = theme => ({});

/* eslint-disable react/prefer-stateless-function */
export class ActivityLog extends React.Component {

  constructor(props){
    super(props);
    const {connectedUser, getUserActivity} = this.props;
    const id = connectedUser.id; 

    getUserActivity(id);    
  
  this.state = {
    row: [],
    currentPage: 1,
    rowsPerPage: 20,
    pageNumberOfPage: 1,
  };
}

componentWillReceiveProps(nextProps){
  const {userActivity} = nextProps;
  this.setState({
    row: userActivity,
  });
}

  paginateHandler = prop => event => {
    this.setState({
      currentPage: Number(event.target.id),
      pageNumberOfPage: prop,
    });
  };

  render() {
    const { classes } = this.props;

    const { row, currentPage, rowsPerPage, pageNumberOfPage } = this.state;

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
      <Grid className="activityLogWrapper">
        <Grid className="activityLogBody">
          <Typography className="section-title" component="h4">
            All Activity List
          </Typography>
          <Grid className="tableWrapper">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>action</TableCell>
                  <TableCell>source</TableCell>
                  <TableCell>ip_address</TableCell>
                  <TableCell>location</TableCell>
                  <TableCell>updated_at</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.action}</TableCell>
                    <TableCell>{row.source}</TableCell>
                    <TableCell>{row.ip}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{moment(row.date).format('L LT')}</TableCell>
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
    );
  }
}

ActivityLog.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  activityLog: makeSelectActivityLog(),
  connectedUser: selectUser(state),
  userActivity: selectUserActivity(state),
});

const mapDispatchToProps = (dispatch) => ({
  getUserActivity: (payload) => dispatch(userActivity(payload)),
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'activityLog', reducer });
const withSaga = injectSaga({ key: 'activityLog', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(styles)(ActivityLog));
