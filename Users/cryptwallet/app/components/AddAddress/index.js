/**
 *
 * AddAddress
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Button, Typography } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Form from '../uiStyle/Form';
import FontAwesome from '../uiStyle/FontAwesome';

import messages from './messages';

import './style.scss';

function AddAddress({
  label,
  address,
  adModalOpen,
  adModalCloseHandler,
  adChangeHandler,
  adSubmitHandler,
}) {

  return (
    <Dialog
      open={adModalOpen}
      onClose={adModalCloseHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{
        paper: 'modalPaper',
        container: 'scrollAble',
        root: 'rootDialog',
      }}
      BackdropProps={{
        className: 'backdropWrap',
      }}
    >
      <Grid className="modalInner">
        <DialogTitle className="modalHeader" id="alert-dialog-title">
          Add Address
          <Typography onClick={adModalCloseHandler} component="span">
            <FontAwesome name="times" />
          </Typography>
        </DialogTitle>
        <DialogContent className="modalCardBody">
          <Form onSubmit={adSubmitHandler}>
            <label htmlFor="label">Label</label>
            <TextField
              id="label"
              fullWidth
              variant="outlined"
              className="input"
              name="label"
              value={label}
              onChange={adChangeHandler}
              placeholder="Give Label"
            />
            <label htmlFor="address">Address</label>
            <TextField
              id="address"
              fullWidth
              variant="outlined"
              className="input"
              name="address"
              value={address}
              onChange={adChangeHandler}
              placeholder="Write wallet address"
            />
            <Button type="submit" className="formSubmitBtn">
              Add
            </Button>
          </Form>
        </DialogContent>
      </Grid>
    </Dialog>
  );
}

AddAddress.propTypes = {};

export default AddAddress;
