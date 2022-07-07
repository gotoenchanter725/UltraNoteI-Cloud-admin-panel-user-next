import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';

import { withRouter } from 'react-router-dom';

import { Grid, Typography, Button } from '@material-ui/core';

// uistyle
import Title from 'components/uiStyle/Title';
import Image from 'components/uiStyle/Images';
import Form from 'components/uiStyle/Form';

// images
import Logo from '../../images/logo_512x512.png';

import ReactCodeInput from 'react-code-input';
import '../SignupPage/account.scss';
import { toast } from 'react-toastify';
import messages from './messages';
import { sendTwoCodeStart } from '../../store/auth/auth.actions';
import { connect } from 'react-redux';

class ConfirmCodePage extends Component {
  state = {
    code: '',
    token: this.props.match.params.token
  };

  submitHandler = event => {
    event.preventDefault();
    const {sendCodeTwoAuth} = this.props;
    const payload = {
      code: this.state.code,
      token: this.state.token,
      history: this.props.history
    };
    sendCodeTwoAuth(payload);
  };

  t(msg, values) {
    return this.props.intl.formatMessage(msg, values);
  }

  changeHandler = event => {
    this.setState({
      ...this.state,
      code: +event
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

                <p>
                  Store, Access and manange your UltraNote Infinity coins with ease securely on your cloud wallet.
                </p>
              </Grid>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Grid className="accountContent">
                <Typography variant="h3">Code Verification</Typography>
                <Typography className="text" paragraph>
                  Enter the verification code which was{' '}
                  <Typography component="span">sent to your email.</Typography>
                </Typography>
                <Form onSubmit={this.submitHandler}>
                  <ReactCodeInput
                    className="codeVarificationInput"
                    value={this.state.code}
                    type="text"
                    autoFocus={false}
                    name="code"
                    isValid
                    fields={4}
                    onChange={this.changeHandler}
                  />
                  <Button type="submit" className="submitButton">
                    Send
                  </Button>
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
  sendCodeTwoAuth: payload => dispatch(sendTwoCodeStart(payload))
});

export default injectIntl(withRouter(connect(null, mapDispatchToProps)(ConfirmCodePage)));