/**
 *
 * Referral
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
import {
  Button,
  List,
  ListItem,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import TableBody from '@material-ui/core/TableBody';

import makeSelectReferral from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import './style.scss';
import Image from '../../components/uiStyle/Images';
import Form from '../../components/uiStyle/Form';

import RefShareIcon from '../../images/icon/ref-share.png';
import RefSendIcon from '../../images/icon/ref-send.png';
import FontAwesome from '../../components/uiStyle/FontAwesome';
import { validateEmail } from '../../utils/commonFunctions';
import { toast } from 'react-toastify';

const Earnings = [
  {
    period: '2019-01-31',
    commission1: '15.00000',
    commission2: '0.00000',
    p_o_commission: '0.00000',
    total: '15.00000',
  },
  {
    period: '2019-02-5',
    commission1: '15.00000',
    commission2: '0.00000',
    p_o_commission: '0.00000',
    total: '15.00087',
  },
  {
    period: '2019-02-10',
    commission1: '08.00000',
    commission2: '0.00000',
    p_o_commission: '0.00000',
    total: '56.00000',
  },
];

/* eslint-disable react/prefer-stateless-function */
export class Referral extends React.Component {
  state = {
    email: '',
    all_email: [],
    contact_link:
      'https://cryptwallet.itech-theme.com/refferal567859djdfhyf/854hgfju',
    earnings: Earnings,
  };

  copyHandler = e => {
    e.preventDefault();
    navigator.clipboard.writeText(this.state.contact_link);

    toast.info('Copied to clipboard');
  };

  addEmailHandle = e => {
    if (e.target.value === ',' || e.target.value === ' ') {
      return;
    }

    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  keyDownHandleAddEmail = e => {
    if (e.key === ',' || e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      const { email } = this.state;
      const newEmails = [...this.state.all_email];

      if (!validateEmail(email)) {
        return;
      }

      if (this.state.all_email.includes(email)) {
        return;
      }

      this.setState({
        all_email: newEmails.concat(email),
        email: '',
      });
    }
  };

  focusOnEmailInput = () => {
    this.emailInput.focus();
  };

  deletHandler = prop => e => {
    const emails = [...this.state.all_email];
    const all_email = this.state.all_email.filter(
      email => email !== emails[prop],
    );

    this.setState({
      all_email,
    });
  };

  submitHandler = e => {
    e.preventDefault();

    this.setState({
      all_email: [],
    });

    if (this.state.all_email.length >= 1) {
      toast.success('Successfully invitation emial send');
    } else {
      toast.error('Add an email first');
    }
  };

  render() {
    const { contact_link, email, all_email, earnings } = this.state;
    return (
      <Grid className="mainBody">
        <Grid className="container">
          <Grid className="referralBody">
            <Typography component="h4" className="section-title">
              Invite Your Contact
            </Typography>
            <Grid className="singleReferral">
              <Typography component="h5" className="subTitle">
                <Image src={RefShareIcon} /> Share this link to your contact
              </Typography>
              <Typography component="p">
                Clicking this button will copy the URL to the user’s clipboard.
              </Typography>
              <Form className="copyInputText" onSubmit={this.copyHandler}>
                <Button type="submit" className="formSubmitBtn">
                  Copy URL
                </Button>
                <TextField
                  className="copyInputField"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={contact_link}
                />
              </Form>
            </Grid>
            <Grid className="singleReferral">
              <Typography component="h5" className="subTitle">
                Or
              </Typography>
              <Typography component="h5" className="subTitle">
                <Image src={RefShareIcon} /> Share your code on
              </Typography>
              <Button className="btn btnFB mr5">
                <FontAwesome name="facebook" /> Facebook
              </Button>
              <Button className="btn btnTWT">
                <FontAwesome name="twitter" /> Twitter
              </Button>
            </Grid>
            <Grid className="singleReferral">
              <Typography component="h5" className="subTitle">
                Or
              </Typography>
              <Typography component="h5" className="subTitle">
                <Image src={RefSendIcon} /> Invite your friends by your mail
              </Typography>
              <Typography component="p">
                Enter one email by line and click send.{' '}
              </Typography>
              <Form onSubmit={this.submitHandler}>
                <Grid className="emailFields" onClick={this.focusOnEmailInput}>
                  <List>
                    {all_email.map((emailid, index) => (
                      <ListItem key={index} onClick={this.deletHandler(index)}>
                        {emailid}
                        <FontAwesome name="times" />
                      </ListItem>
                    ))}
                    <TextField
                      inputRef={input => (this.emailInput = input)}
                      name="email"
                      value={email}
                      placeholder="Type Here...."
                      onChange={this.addEmailHandle}
                      onKeyDown={this.keyDownHandleAddEmail}
                    />
                  </List>
                </Grid>
                <Button className="formSubmitBtn mt3" type="submit">
                  Send
                </Button>
              </Form>
            </Grid>
          </Grid>
          <Grid className="referralBody mt8 pl0 pr0">
            <Typography component="h4" className="section-title">
              My Refferal
            </Typography>
            <Grid className="myReferral">
              <List className="mReferralListTitle">
                <ListItem>Level 1</ListItem>
                <ListItem>Level 2</ListItem>
                <ListItem>Level 3</ListItem>
              </List>
              <List className="mReferralListbody">
                <ListItem>1</ListItem>
                <ListItem>1</ListItem>
                <ListItem>0</ListItem>
              </List>
            </Grid>
          </Grid>
          <Grid className="referralBody mt8">
            <Typography component="h4" className="section-title">
              My Earnings
            </Typography>
            <Grid className="myEarnings mt4">
              <Grid className="tableWrapper">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Period</TableCell>
                      <TableCell>Commission 1</TableCell>
                      <TableCell>Commission 2</TableCell>
                      <TableCell>Card pre-order commission</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {earnings.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.period}</TableCell>
                        <TableCell>{row.commission1}</TableCell>
                        <TableCell>{row.commission2}</TableCell>
                        <TableCell>{row.p_o_commission}</TableCell>
                        <TableCell>{row.total}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={4} align="right">
                        Total earnings :
                      </TableCell>
                      <TableCell>86.00087</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Referral.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  referral: makeSelectReferral(),
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

const withReducer = injectReducer({ key: 'referral', reducer });
const withSaga = injectSaga({ key: 'referral', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Referral);
