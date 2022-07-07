/**
 *
 * AddressBook
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
import makeSelectAddressBook from './selectors';
import Images from '../../components/uiStyle/Images';

// icons
import copyIcon from '../../images/icon/action/copy.png';
import deleteIcon from '../../images/icon/action/delete.png';


import './style.scss';
import AddAddress from '../../components/AddAddress';
import { toast } from 'react-toastify';
import { selectUser, selectContactList } from '../../store/auth/auth.selectors';
import { addContact, deleteContact } from '../../store/auth/auth.actions';


/* eslint-disable react/prefer-stateless-function */
export class AddressBook extends React.Component {
  state = {
    adModalOpen: false,
    currentPage: 1,
    rowsPerPage: 4,
    pageNumberOfPage: 1,
    label: '',
    address: '',
    row: []
  };

  componentDidMount() {
    const { connectedUser } = this.props;
    this.setState({
      ...this.state,
      row: connectedUser.contacts
    });
  }

  componentWillReceiveProps(nextProps) {
    const { connectedUser } = nextProps;
    if (connectedUser) {
      this.setState({
        ...this.state,
        row: connectedUser.contacts
      });
    }
  }

  paginateHandler = prop => event => {
    this.setState({
      currentPage: Number(event.target.id),
      pageNumberOfPage: prop,
    });
  };

  adHandleClickOpen = () => {
    this.setState({ ...this.state, adModalOpen: true });
  };

  adModalCloseHandler = () => {
    this.setState({
      adModalOpen: false,
    });
  };

  adChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  adSubmitHandler = e => {
    e.preventDefault();

    const { connectedUser, addContact } = this.props;
    const newContact = {
      id: connectedUser.id,
      label: this.state.label,
      address: this.state.address,
    };

    if (this.state.label === '' || this.state.address === '') {
      toast.error("Please give a valid info!")
    } else {
      this.setState({
        label: '',
        address: '',
        adModalOpen: false,
      });
      addContact(newContact);
    }
  };

  copyHandler = (address) => e => {
    e.preventDefault();
    navigator.clipboard.writeText(address);

    toast.info("Copied to clipboard");
  };

  deleteHandler = (row, index) => e => {
    e.preventDefault();
    const { connectedUser, deleteContact } = this.props;
    const deletedContact = {
      id: connectedUser.id,
      deleteRow: index
    }
    deleteContact(deletedContact);
  }

  render() {
    const {
      adModalOpen,
      currentPage,
      rowsPerPage,
      pageNumberOfPage,
      label,
      address,
      row
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
      <Grid className="addressBookWrapper" id="address_book">
        <Grid className="container">
          <Grid className="addressBookBody">
            <Grid container alignItems="center" className="addressBookHeader">
              <Grid item xs={12} sm={6}>
                <Typography className="section-title" component="h4">
                  My Address Book
            </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid className="addressBookMenus">
                  <Button
                    onClick={this.adHandleClickOpen}
                    className="btn btnBlue"
                  >
                    Add Address
              </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid className="tableWrapper">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Label</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentRows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row[0]}</TableCell>
                      <TableCell>{row[1]}</TableCell>
                      <TableCell>
                        <List className="actionBtns">
                          <ListItem onClick={this.copyHandler(row[1])} style={{ marginRight: '5px !important' }}>
                            <Images src={copyIcon} />
                          </ListItem>
                          <ListItem onClick={this.deleteHandler(row, index)} style={{ marginRight: '5px !important' }}>
                            <Images src={deleteIcon} />
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
        </Grid>

        <AddAddress
          label={label}
          address={address}
          adModalOpen={adModalOpen}
          adModalCloseHandler={this.adModalCloseHandler}
          adChangeHandler={this.adChangeHandler}
          adSubmitHandler={this.adSubmitHandler}
        />
      </Grid>
    );
  }
}

AddressBook.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  connectedUser: selectUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  addContact: (payload) => dispatch(addContact(payload)),
  deleteContact: (payload) => dispatch(deleteContact(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'addressBook', reducer });
const withSaga = injectSaga({ key: 'addressBook', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddressBook);
