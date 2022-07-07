import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';

import { injectIntl } from 'react-intl';
import messages from './messages';

import { Grid, Typography, TextField, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

// uistyle
import Title from 'components/uiStyle/Title';
import Image from 'components/uiStyle/Images';
import Form from 'components/uiStyle/Form'

import Joi from 'joi-browser'

// images
import Logo from '../../images/logo_512x512.png';

import '../SignupPage/account.scss'
import { toast } from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha";
import { RessetPassword } from '../../containers/RessetPassword';
import { requestEmailResetStart, resetPasswordStart } from '../../store/auth/auth.actions';
import { connect } from 'react-redux';
class ForgotPasswordPage extends Component {

  constructor(props) {
    super(props);
    const token = this.props.match.params.token;

    if (token === 'reset') {
      this.state = {
        mode: 'reset',
        email: '',
        error: {},
        token
      };
    }
    else {
      this.state = {
        mode: 'change_password',
        password: '',
        confirmPassword: '',
        error: {},
        token
      };
    }

    
  }

  
  t(msg, values) {
    return this.props.intl.formatMessage(msg, values);
  }
  

  schema = {
    email: Joi.string().required().email({ minDomainAtoms: 2 }).error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.email":
            err.message = "Email Must be Email Format";
            break;
          case "any.required":
            err.message = "Email is Requared";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  }

  schemaChangePassword = {
    password: Joi.string().required().min(8)
    .regex(/^[a-zA-Z0-9!@#$&()\\-`~.+,_]{3,30}$/)
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.required":
            err.message = "This field is Required";
            break;
          case "string.empty": 
            err.message = "This field is Required";
            break;
          case "string.min":
            err.message = "Must contains at least 8 caracters"
          default:
            break;
        }
      });
      
      return errors;
    }),
    confirmPassword: Joi.string().required().min(8)
    .regex(/^[a-zA-Z0-9!@#$&()\\-`~.+,_]{3,30}$/).error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.required":
            err.message = "This field is Required";
            break;
          case "string.empty": 
            err.message = "This field is Required";
            break;
          case "string.min":
            err.message = "Must contains at least 8 caracters"
          default:
            break;
        }});
        return errors;
      })
  }


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
      error
    })
  };

  changeHandlerChangePassword = event => {
    const error = { ...this.state.error };
    const errorMassage = this.validationPropertyChangePassword(event);
    if (errorMassage) {
      error[event.target.name] = errorMassage;
    } else {
      delete error[event.target.name];
    }
    this.setState({
      [event.target.name]: event.target.value,
      error
    })
  };

  validationProperty = event => {
    console.log(event.target.value)
    const Obj = { [event.target.name]: event.target.value };
    const schema = { [event.target.name]: this.schema[event.target.name] }
    const { error } = Joi.validate(Obj, schema);
    return error ? error.details[0].message : null
  };

  validationPropertyChangePassword = event => {
    console.log(event.target.value)
    const Obj = { [event.target.name]: event.target.value };
    const schema = { [event.target.name]: this.schemaChangePassword[event.target.name] }
    const { error } = Joi.validate(Obj, schema);
    return error ? error.details[0].message : null
  };

  validate = () => {
    const options = { abortEarly: false }
    const form = {
      password: this.state.password,
      cardNumber: this.state.cardNumber,
      pin: this.state.pin
    }
    const { error } = Joi.validate(form, this.schema, options)
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message
    return errors;
  };

  validateChangePassword = () => {
    const options = { abortEarly: false }
    const form = {
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    }
    const { error } = Joi.validate(form, this.schemaChangePassword, options)
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message
    return errors;
  };

  submitHandler = event => {
    event.preventDefault();     
    const error = this.validate();
    if (this.state.email === "") {
      this.setState({
        error: error || {}
      })
      toast.error("Enter your email first")
    } else {
      const {requestEmailReset} = this.props;
      const requestData = {
        email: this.state.email,
        history: this.props.history
      };
      requestEmailReset(requestData);
    }

  }

  submitHandlerChangePassword = event => {
    event.preventDefault();  
    const error = this.validateChangePassword();
    if (this.state.password === "" || this.state.confirmPassword === "") {
      this.setState({
        error: error || {}
      })
    }
    else if (this.state.password !== this.state.confirmPassword) {
      toast.error("Passwords not match");
    } 
    else {
      const {resetPassword} = this.props;
      const requestData = {
        password: this.state.password,
        token: this.state.token,
        history: this.props.history
      }
      resetPassword(requestData);
    }

  }

  onChangeCap = value => {
    this.setState({
      verifiedCaptcha: value
    });
  }

  render() {
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
              <img src={Logo} alt="logo" style={{width:"100px"}, {height:"100px"}}/>
              <span>UltraNote Cloud</span>
              </div>
                <p>Store, Access and manange your UltraNote Infinity coins with ease securely on your cloud wallet.</p>
              </Grid>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Grid className="accountContent">
                <Typography variant="h3">Forgot Password ?</Typography>
                <Typography className="text" paragraph>Please enter the email address to request a password reset.</Typography>
                {
                  this.state.mode === 'reset' ?
                  (
                    <Form onSubmit={this.submitHandler}>
                  <TextField
                    label="Email"
                    className="inputStyle"
                    name="email"
                    variant="outlined"
                    onChange={this.changeHandler}
                    value={this.state.email}
                    helperText={this.state.error.email ? this.state.error.email : ""}
                  />
                   <ReCAPTCHA className="recaptcha"
                      sitekey="6LdqlfoZAAAAAMLxltM3BSoqaFQInUh_lxtZ88cC"
                      onChange={this.onChangeCap}
                    />
                  <Button
                    type="submit"
                    className="submitButton"
                    disabled={!this.state.verifiedCaptcha}
                  >Send</Button>
                </Form>
                  )
                  :
                  (<Form onSubmit={this.submitHandlerChangePassword}>
                    <TextField
                    type="password"
                      label="Password"
                      className="inputStyle"
                      name="password"
                      variant="outlined"
                      onChange={this.changeHandlerChangePassword}
                      value={this.state.password}
                      helperText={this.state.error.password ? this.state.error.password : ""}
                    />
                    <TextField
                    type="password"
                      label="Confirm Password"
                      className="inputStyle"
                      name="confirmPassword"
                      variant="outlined"
                      onChange={this.changeHandlerChangePassword}
                      value={this.state.confirmPassword}
                      helperText={this.state.error.confirmPassword ? this.state.error.confirmPassword : ""}
                    />
                     <ReCAPTCHA className="recaptcha"
                      sitekey="6LdqlfoZAAAAAMLxltM3BSoqaFQInUh_lxtZ88cC"
                      onChange={this.onChangeCap}
                    />
                    <Button
                      type="submit"
                      className="submitButton"
                      disabled={!this.state.verifiedCaptcha}
                    >Send</Button>
                  </Form>)
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}


 const mapDispatchToProps = (dispatch) => ({
  resetPassword: (payload) => dispatch(resetPasswordStart(payload)),
  requestEmailReset: (payload) => dispatch(requestEmailResetStart(payload))
});

export default injectIntl(withRouter(connect(null, mapDispatchToProps)(ForgotPasswordPage)));
