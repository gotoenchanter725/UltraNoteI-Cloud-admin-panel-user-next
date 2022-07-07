/**
 *
 * PhoneVarification
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import makeSelectPhoneVarification from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Form from '../../components/uiStyle/Form';

import './style.scss';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { EditProfile } from '../EditProfile';
import { toast } from 'react-toastify';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
  },
});

/* eslint-disable react/prefer-stateless-function */
export class PhoneVarification extends React.Component {
  state = {
    phone: '',
    id1: '',
    id2: '',
    id3: '',
    id4: '',
    mvalidation: false,
  };

  handleOnChange = value => {
    this.setState({
      phone: value,
    });
  };

  submitHandler = e => {
    e.preventDefault();
    if (this.state.phone !== ''){
      this.setState({
        phone: '',
        mvalidation: true
      });
      toast.success("Validation code Sended");
    } else {
      toast.error("give a valid phone number!");
    }

  };

  changeHandler = e => {
    const number = e.target.value
      .replace(/[^0-9\-]+/g, '')
      .replace(/(\..*)\./g, '$1');

    const { id1, id2, id3, id4 } = this.state;

    if (this.state[e.target.name].length < 1) {
      if (e.target.name === 'id1') {
        this.setState({
          [e.target.name]: number,
        });
        this.nameInput2.focus();
      }
      if (e.target.name === 'id2' && id1 !== '') {
        this.setState({
          [e.target.name]: number,
        });
        this.nameInput3.focus();
      }
      if (e.target.name === 'id3' && id2 !== '') {
        this.setState({
          [e.target.name]: number,
        });
        this.nameInput4.focus();
      }
      if (e.target.name === 'id4' && id3 !== '') {
        this.setState({
          [e.target.name]: number,
        });
      }
    }
  };

  onKeyDown = e => {
    const { id2, id3, id4 } = this.state;

    if (e.key === 'Backspace') {
      if (e.target.name === 'id3' && id4 === '') {
        this.setState({
          [e.target.name]: '',
        });
        this.nameInput2.focus();
      }
      if (e.target.name === 'id2' && id3 === '') {
        this.setState({
          [e.target.name]: '',
        });
        this.nameInput1.focus();
      }
      if (e.target.name === 'id1' && id2 === '') {
        this.setState({
          [e.target.name]: '',
        });
      }
      if (e.target.name === 'id4') {
        this.setState({
          [e.target.name]: '',
        });
        this.nameInput3.focus();
      }
    }
  };

  submitVarifyHandler = e => {
    e.preventDefault();

    const { id1, id2, id3, id4 } = this.state;

    const newId1 = id1.toString();
    const newId2 = id2.toString();
    const newId3 = id3.toString();
    const newId4 = id4.toString();
    const NewId = newId1 + newId2 + newId3 + newId4;
    console.log(NewId);

    if (id1, id2, id3, id4 === ''){
      toast.error("Fill validation code");
    } else {
      this.setState({
        id1: '',
        id2: '',
        id3: '',
        id4: '',
        mvalidation: false
      });
      toast.success("Successfully validated");
    }

  };

  render() {
    const { phone, id1, id2, id3, id4, mvalidation } = this.state;

    const { classes } = this.props;
    return (
      <Grid className="phoneVarificationForm">
        <Grid className={classes.root} container spacing={32}>
          <Grid item xs={12} md={2} className="p-xs-0" />
          <Grid item xs={12} md={8} className="p-xs-0">
            <Form onSubmit={this.submitHandler}>
              <Grid className="phoneNumber">
                <InputLabel htmlFor="component-helper">Phone Number</InputLabel>
                <ReactPhoneInput
                  inputExtraProps={{
                    name: 'phone',
                    required: true,
                    autoFocus: false,
                  }}
                  searchPlaceholder="Search Country Code"
                  enableSearchField
                  defaultCountry="us"
                  value={phone}
                  onChange={this.handleOnChange}
                />
              </Grid>
              <Button type="submit" className="formSubmitBtn">
                Save
              </Button>
            </Form>
            <br />
            <br />
            <br />
            {mvalidation ? <Form onSubmit={this.submitVarifyHandler}>
              <Grid className="IdNumber">
                <TextField
                  inputRef={input => (this.nameInput1 = input)}
                  className="inputStyle"
                  name="id1"
                  variant="outlined"
                  value={id1}
                  onChange={this.changeHandler}
                  onKeyDown={this.onKeyDown}
                />
                <TextField
                  inputRef={input => (this.nameInput2 = input)}
                  className="inputStyle"
                  name="id2"
                  variant="outlined"
                  value={id2}
                  onChange={this.changeHandler}
                  onKeyDown={this.onKeyDown}
                />
                <TextField
                  inputRef={input => (this.nameInput3 = input)}
                  className="inputStyle"
                  name="id3"
                  variant="outlined"
                  value={id3}
                  onChange={this.changeHandler}
                  onKeyDown={this.onKeyDown}
                />
                <TextField
                  inputRef={input => (this.nameInput4 = input)}
                  className="inputStyle"
                  name="id4"
                  variant="outlined"
                  value={id4}
                  onChange={this.changeHandler}
                  onKeyDown={this.onKeyDown}
                />
              </Grid>
              <Button type="submit" className="formSubmitBtn">
                Varify
              </Button>
            </Form>
            : ''}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

PhoneVarification.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  phoneVarification: makeSelectPhoneVarification(),
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

const withReducer = injectReducer({ key: 'phoneVarification', reducer });
const withSaga = injectSaga({ key: 'phoneVarification', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(styles)(PhoneVarification));
