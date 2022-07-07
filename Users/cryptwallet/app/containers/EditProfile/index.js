/**
 *
 * EditProfile
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Joi from 'joi-browser';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Grid from '@material-ui/core/Grid';
import { Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import makeSelectEditProfile from './selectors';
import reducer from './reducer';
import saga from './saga';

import messages from './messages';
import UserImage from '../../images/author/user-image-big.jpg';
import Image from '../../components/uiStyle/Images';
import { updateProfileStart } from '../../store/auth/auth.actions';
import { selectUser } from '../../store/auth/auth.selectors';

import './style.scss';
import Form from '../../components/uiStyle/Form';
import { Profile } from '../Profile';
import { toast } from 'react-toastify';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
  },
});

/* eslint-disable react/prefer-stateless-function */
export class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    const { connectedUser } = this.props;

    this.state = {
      files: null,
      imagesPreviewUrl: connectedUser.image,
      first_name: connectedUser.firstName,
      last_name: connectedUser.lastName,
      email: connectedUser.mail,
      error: {},
    };
  }

  handleImageChange = e => {
    e.preventDefault();

    // FileList to Array
    const files = Array.from(e.target.files);

    files.forEach((file, i) => {
      const reader = new FileReader();
      if(file.size > 2050000) {
        toast.warn("Image size should be less than 2mb");
      }
      else{
        reader.onloadend = () => {
          this.setState({
            files: file,
            imagesPreviewUrl: reader.result,
          });
        };
        reader.readAsDataURL(file);
      }
    });
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
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
    first_name: Joi.string()
      .required()
      .error(errors => ({
        message: 'Please Provide First Name',
      })),
    last_name: Joi.string(),
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
      first_name: this.state.first_name,
      email: this.state.email,
    };
    const { error } = Joi.validate(form, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (const item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  submitHandler = event => {
    event.preventDefault();
    const { updateProfile } = this.props;
    const token = localStorage.getItem('token');
    const error = this.validate();
    this.setState({
      error: error || {},
    });

    let image = this.state.imagesPreviewUrl;
    if ( image != undefined && image.length > 0 ) {
      image = image.substr(22);
    }

    const requestData = {
      image: image,
      firstName: this.state.first_name,
      lastName: this.state.last_name,
      email: this.state.email,
      token: token,
    }

    updateProfile(requestData);
  };

  render() {
    const {
      imagesPreviewUrl,
      first_name,
      last_name,
      email,
      error,
    } = this.state;
    const { classes } = this.props;
    return (
      <Grid>
        <Form onSubmit={this.submitHandler}>
          <Grid className={classes.root} container spacing={32}>
            <Grid item sm={4} xs={12} className="userProfile">
              <Grid className="userThumb">
                <label htmlFor="choose-profile">
                  <Image
                    src={
                      imagesPreviewUrl ? imagesPreviewUrl : UserImage
                    }
                  />
                </label>
              </Grid>
              <Button className="uploadImage">
                Upload Image
                <input
                  accept=".jpeg,.jpg,.png,.svg"
                  type="file"
                  id="choose-profile"
                  name="choose-profile"
                  onChange={this.handleImageChange}
                />
              </Button>
            </Grid>
            <Grid item sm={8} xs={12} className="editProfile">
              <TextField
                label="First Name"
                className="inputStyle"
                name="first_name"
                variant="outlined"
                onChange={this.changeHandler}
                value={first_name}
                helperText={error.first_name ? error.first_name : ''}
              />
              <TextField
                label="Last Name"
                className="inputStyle"
                name="last_name"
                variant="outlined"
                onChange={this.changeHandler}
                value={last_name}
              />
              <TextField
                label="Email"
                className="inputStyle"
                name="email"
                variant="outlined"
                onChange={this.changeHandler}
                value={email}
                helperText={error.email ? error.email : ''}
              />
              <Button type="submit" className="formSubmitBtn">
                Save
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Grid>
    );
  }
}

EditProfile.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  editProfile: makeSelectEditProfile(),
  connectedUser: selectUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (payload) => dispatch(updateProfileStart(payload)),
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'editProfile', reducer });
const withSaga = injectSaga({ key: 'editProfile', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(styles)(EditProfile));
