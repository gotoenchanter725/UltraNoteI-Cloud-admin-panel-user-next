/**
 *
 * MoveCoin
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Button, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import messages from './messages';
import Form from '../uiStyle/Form';
import FontAwesome from '../uiStyle/FontAwesome';

function MoveCoin({
  mcModalOpen,
  sender_account,
  reciver_account,
  amount,
  mcChangeHandler,
  mcModalCloseHandler,
  mcSubmitHandler,
}) {
  return (
    <Dialog
      open={mcModalOpen}
      onClose={mcModalCloseHandler}
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
          Move Coin
          <Typography onClick={mcModalCloseHandler} component="span">
            <FontAwesome name="times" />
          </Typography>
        </DialogTitle>
        <DialogContent className="modalCardBody">
          <Form onSubmit={mcSubmitHandler}>
            <FormControl fullWidth className="mcsInput">
              <InputLabel shrink htmlFor="sender_account">
                From
              </InputLabel>
              <Select
                className="inputSelectStyle"
                value={sender_account}
                onChange={mcChangeHandler}
                input={<Input name="sender_account" id="sender_account" />}
                displayEmpty
                name="sender_account"
              >
                <MenuItem value="">
                  <em>Select sender Account</em>
                </MenuItem>
                <MenuItem value="rashed">Rashed</MenuItem>
                <MenuItem value="rashed01">Rashed01</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth className="mcsInput">
              <InputLabel shrink htmlFor="reciver_account">
                To
              </InputLabel>
              <Select
                className="inputSelectStyle"
                value={reciver_account}
                onChange={mcChangeHandler}
                input={<Input name="reciver_account" id="reciver_account" />}
                displayEmpty
                name="reciver_account"
              >
                <MenuItem value="">
                  <em>Select reciver Account</em>
                </MenuItem>
                <MenuItem value="rashed">Rashed</MenuItem>
                <MenuItem value="rashed01">Rashed01</MenuItem>
              </Select>
            </FormControl>

            <label htmlFor="amount">Amount</label>
            <TextField
              id="amount"
              fullWidth
              variant="outlined"
              className="input"
              name="amount"
              value={amount}
              onChange={mcChangeHandler}
              placeholder="Write wallet name"
            />
            <Button type="submit" className="formSubmitBtn">
              Move
            </Button>
          </Form>
        </DialogContent>
      </Grid>
    </Dialog>
  );
}

MoveCoin.propTypes = {};

export default MoveCoin;
