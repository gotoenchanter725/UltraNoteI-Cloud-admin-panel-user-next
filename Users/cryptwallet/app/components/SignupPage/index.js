import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';

import { injectIntl } from 'react-intl';

import { Link, Redirect, withRouter } from 'react-router-dom';

import {connect} from 'react-redux';

import ReCAPTCHA from "react-google-recaptcha";
import { toast } from 'react-toastify';



import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from '@material-ui/core';

// uistyle
import Title from 'components/uiStyle/Title';
import Image from 'components/uiStyle/Images';
import Form from 'components/uiStyle/Form';

import Joi from 'joi-browser';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// images
import logo from 'images/logo_512x512.png';
import messages from './messages';
import showPass from '../../images/icon/eye.svg';
import pass from '../../images/icon/eye2.svg';

import './account.scss';
import cookie from 'js-cookie';
import { signupStart } from '../../store/auth/auth.actions';

/* eslint-disable react/prefer-stateless-function */
class SignupPage extends Component {
  
  state = {
    firstName: '',
    lastName: '',
    email: '',
    // phone: '',
    password: '',
    confirmPassword: '',
    passwordShow: false,
    confirmPasswordShow: false,
    error: {},
    verifiedCaptcha: null
  };

  

  t(msg, values) {
    return this.props.intl.formatMessage(msg, values);
  }

  handleClickShowPassword = current => {
    this.setState({
      [current]: !this.state[current],
    });
  };

  schema = {
    firstName: Joi.string()
      .required()
      .error(errors => ({
        message: 'First Name is Required',
      })),
    lastName: Joi.string(),
    email: Joi.string()
      .required()
      .email({ minDomainAtoms: 2 })
      .error(errors => {
        errors.forEach(err => {
          switch (err.type) {
            case 'string.email':
              err.message = 'Email Must be Email Format';
              break;
            case 'any.required':
              err.message = 'Email is Requared';
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    password: Joi.string()
      .required()
      .min(8)
      .regex(/^[a-zA-Z0-9!@#$&()\\-`~.+,_]{3,30}$/)
      .error(errors => ({
        message: console.log(errors) + 'Please Provide a strong password',
      })),
    confirmPassword: Joi.string()
      .required()
      .min(8)
      .regex(/^[a-zA-Z0-9!@#$&()\\-`~.+,_]{3,30}$/)
      .error(errors => ({
        message: console.log(errors) + 'Please Provide a strong password',
      })),
  };

  changeHandler = event => {
    const error = { ...this.state.error };
    const errorMassage = this.validationProperty(event);
    if (errorMassage) {
      error[event.target.name] = errorMassage;
    } else {
      delete error[event.target.name];
    }
    this.setState({
      [event.target.name]: event.target.value,
      error,
    });
  };

  validationProperty = event => {
    const Obj = { [event.target.name]: event.target.value };
    const schema = { [event.target.name]: this.schema[event.target.name] };
    const { error } = Joi.validate(Obj, schema);
    return error ? error.details[0].message : null;
  };

  validate = () => {
    const options = { abortEarly: false };
    const form = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      confirmPassword: this.state.confirmPassword,
      password: this.state.password,
    };
    const { error } = Joi.validate(form, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (const item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  // handleOnChange = value => {
  //   this.setState({
  //     phone: value,
  //   });
  // };

  submitHandler = event => {
    event.preventDefault();
    const error = this.validate();
    const {signup} = this.props;
    this.setState({
      error: error || {},
    });

    if (!error) {
      this.state.history = this.props.history;
      signup(this.state);
    }
  };

  onChangeCap = value => {
    this.setState({
      verifiedCaptcha: value
    });
  }

  render() {
    const auth = cookie.get('Auth');
    if (auth) {
      toast.info('You are Loged in');
      return <Redirect to="/dashboard" />;
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
    } = this.state;
    return (
      <Fragment>
        <Helmet>
          <Title>{this.t({ ...messages.pageTitle })}</Title>
        </Helmet>
        <Grid className="accountArea">
          <Grid className="container" container>
            <Grid item lg={6} xs={12}>
              <Grid className="accountImage">
              <div className="logo-left" >
                <img src={logo} alt="logo" style={{width:"100px"}, {height:"100px"}}/>
                <span>UltraNote Cloud</span>
                </div>
                <p>
                Store, Access and manange your UltraNote Infinity coins with ease securely on your cloud wallet.
                </p>
              </Grid>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Grid className="accountContent">
                <Typography variant="h3">Sign Up</Typography>
                <Typography className="text" paragraph>
                  Create a new account.
                </Typography>
                <Form onSubmit={this.submitHandler}>
                  <TextField
                    label="First Name"
                    className="inputStyle"
                    name="firstName"
                    variant="outlined"
                    onChange={this.changeHandler}
                    value={firstName}
                    helperText={
                      this.state.error.firstName
                        ? this.state.error.firstName
                        : ''
                    }
                  />
                  <TextField
                    label="Last Name"
                    className="inputStyle"
                    name="lastName"
                    variant="outlined"
                    onChange={this.changeHandler}
                    value={lastName}
                  />
                  <TextField
                    label="Email"
                    className="inputStyle"
                    name="email"
                    variant="outlined"
                    onChange={this.changeHandler}
                    value={email}
                    helperText={
                      this.state.error.email ? this.state.error.email : ''
                    }
                  />
                  {/* <Grid className="phoneNumber">
                    <ReactPhoneInput
                      inputExtraProps={{
                        name: 'phone',
                        required: false,
                        autoFocus: false,
                      }}
                      searchPlaceholder="Search Country Code"
                      enableSearchField
                      defaultCountry="us"
                      value={phone}
                      onChange={this.handleOnChange}
                    />
                  </Grid> */}
                  <TextField
                    label="Password"
                    className="inputStyle"
                    name="password"
                    variant="outlined"
                    type={this.state.passwordShow ? 'text' : 'password'}
                    onChange={this.changeHandler}
                    value={password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment className="showPassword" position="end">
                          <IconButton
                            onClick={() =>
                              this.handleClickShowPassword('passwordShow')
                            }
                          >
                            <Image
                              src={this.state.passwordShow ? pass : showPass}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    helperText={
                      this.state.error.password ? this.state.error.password : ''
                    }
                  />
                  <TextField
                    label="Confirm Password"
                    className="inputStyle"
                    name="confirmPassword"
                    variant="outlined"
                    type={this.state.confirmPasswordShow ? 'text' : 'password'}
                    onChange={this.changeHandler}
                    value={confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment className="showPassword" position="end">
                          <IconButton
                            onClick={() =>
                              this.handleClickShowPassword(
                                'confirmPasswordShow',
                              )
                            }
                          >
                            <Image
                              src={
                                this.state.confirmPasswordShow ? pass : showPass
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    helperText={
                      this.state.error.confirmPassword
                        ? this.state.error.confirmPassword
                        : ''
                    }
                  />
                    <ReCAPTCHA className="recaptcha"
                      sitekey="6LdqlfoZAAAAAMLxltM3BSoqaFQInUh_lxtZ88cC"
                      onChange={this.onChangeCap}
                    />
                  <Button type="submit" className="submitButton" disabled={!this.state.verifiedCaptcha}>
                    Sign Up
                  </Button>
                  <Typography variant="h6">
                    Already have an accoun ? <Link to="/login">Sign In</Link>
                  </Typography>
                </Form>
                
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signup: (payload) => dispatch(signupStart(payload))
});


export default injectIntl(withRouter(connect(null, mapDispatchToProps)(SignupPage)));
