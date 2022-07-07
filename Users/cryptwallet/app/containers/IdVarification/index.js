/**
 *
 * IdVarification
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Typography } from '@material-ui/core';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import makeSelectIdVarification from './selectors';
import reducer from './reducer';
import saga from './saga';

import Image from '../../components/uiStyle/Images';

import NationalCardIcon from '../../images/icon/card/national-card.png';
import PassportCardIcon from '../../images/icon/card/passport-card.png';
import DrivingCardIcon from '../../images/icon/card/driving-card.png';

import SubmitIdCard from '../../components/SubmitIdCard';

import './style.scss';
import { EditProfile } from '../EditProfile';
import { toast } from 'react-toastify';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
  },
});

/* eslint-disable react/prefer-stateless-function */
export class IdVarification extends React.Component {
  state = {
    open: false,
    id_type: '',
    frontFile: null,
    backFile: null,
    frontPreviewUrl: null,
    backPreviewUrl: null,
  };

  handleClickOpen = prop => () => {
    this.setState({ open: true, id_type: prop });
  };

  handleClose = () => {
    this.setState({
      open: false,
      frontFile: null,
      backFile: null,
      frontPreviewUrl: null,
      backPreviewUrl: null,
    });
  };

  handleImageChange = (prop1, prop2) => e => {
    e.preventDefault();

    // FileList to Array
    const files = Array.from(e.target.files);

    files.forEach((file, i) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.setState({
          [prop1]: file,
          [prop2]: reader.result,
        });
      };

      reader.readAsDataURL(file);
    });
  };

  cardSubmitHandler = e => {
    e.preventDefault();

    const idImages = {
      frontImage: this.state.frontFile,
      backImage: this.state.backFile,
    };

    const { frontFile, backFile } = this.state;

    if (frontFile === null) {
      toast.error('Please upload front side image');
    }
    if (backFile === null) {
      toast.error('Please upload back side image');
    }

    if (frontFile !== null && backFile !== null) {
      toast.success('Request Successfully Send');
      this.setState({
        open: false,
      });
    }
  };

  render() {
    const { frontPreviewUrl, backPreviewUrl } = this.state;
    const { classes } = this.props;
    return (
      <Grid className="IdVarificationForm">
        <Grid className={classes.root} container spacing={32}>
          <Grid item xs={12}>
            <Typography className="section-title" component="h4">
              Step - 1 : Select ID type
            </Typography>
            <Grid container spacing={32}>
              <Grid item sm={4} xs={12}>
                <Grid className="idCard" onClick={this.handleClickOpen('NID')}>
                  <Grid className="icon">
                    <Image src={NationalCardIcon} />
                  </Grid>
                  <Typography className="submitInfo" component="h5">
                    Not Submitted
                  </Typography>
                </Grid>
                <Typography className="cardBtmTitle" component="h4">
                  National Card
                </Typography>
              </Grid>
              <Grid item sm={4} xs={12}>
                <Grid
                  className="idCard"
                  onClick={this.handleClickOpen('PASSPORT ID')}
                >
                  <Typography className="submitted" component="span">
                    Submitted
                  </Typography>
                  <Grid className="icon">
                    <Image src={PassportCardIcon} />
                  </Grid>
                </Grid>
                <Typography className="cardBtmTitle" component="h4">
                  Passport
                </Typography>
              </Grid>
              <Grid item sm={4} xs={12}>
                <Grid
                  className="idCard"
                  onClick={this.handleClickOpen('DRIVING ID')}
                >
                  <Grid className="icon">
                    <Image src={DrivingCardIcon} />
                  </Grid>
                  <Typography className="submitInfo" component="h5">
                    Not Submitted
                  </Typography>
                </Grid>
                <Typography className="cardBtmTitle" component="h4">
                  Driving License
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <SubmitIdCard
            id_type={this.state.id_type}
            handleClose={this.handleClose}
            open={this.state.open}
            handleImageChange={this.handleImageChange}
            frontPreviewUrl={this.state.frontPreviewUrl}
            backPreviewUrl={this.state.backPreviewUrl}
            cardSubmitHandler={this.cardSubmitHandler}
          />
        </Grid>
      </Grid>
    );
  }
}

IdVarification.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  idVarification: makeSelectIdVarification(),
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

const withReducer = injectReducer({ key: 'idVarification', reducer });
const withSaga = injectSaga({ key: 'idVarification', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(styles)(IdVarification));
