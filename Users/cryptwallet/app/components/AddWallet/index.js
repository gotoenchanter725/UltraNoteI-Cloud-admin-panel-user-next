/**
 *
 * AddWallet
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

function AddWallet({
  wallet_name,
  awModalOpen,
  awModalCloseHandler,
  awChangeHandler,
  awSubmitHandler,
}) {
  return (
    <Dialog
      open={awModalOpen}
      onClose={awModalCloseHandler}
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
          Add Wallet
          <Typography onClick={awModalCloseHandler} component="span">
            <FontAwesome name="times" />
          </Typography>
        </DialogTitle>
        <DialogContent className="modalCardBody">
          <Form onSubmit={awSubmitHandler}>
            <label htmlFor="name">Name</label>
            <TextField
              id="name"
              fullWidth
              variant="outlined"
              className="input"
              name="wallet_name"
              value={wallet_name}
              onChange={awChangeHandler}
              placeholder="Write wallet name"
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

AddWallet.propTypes = {};

export default AddWallet;
