/**
 *
 * BuyCoinByQr
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import Form from '../uiStyle/Form';

import messages from './messages';

import Images from '../uiStyle/Images';

import './style.scss';

function BuyCoinByQr({ qrcode, address, copyHandler }) {
  return (
    <Grid className="qrResults">
      <Typography className="subTitle" component="h5">
        Please Scan Your QR code.
      </Typography>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Images src={qrcode} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Form onSubmit={copyHandler}>
            <TextField
              InputProps={{
                readOnly: true,
              }}
              className="addressInput"
              value={address}
            />
            <Button type="submit">Copy</Button>
          </Form>
        </Grid>
      </Grid>
    </Grid>
  );
}

BuyCoinByQr.propTypes = {};

export default BuyCoinByQr;
