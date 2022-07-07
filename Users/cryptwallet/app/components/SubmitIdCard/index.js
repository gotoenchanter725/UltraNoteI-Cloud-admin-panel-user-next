/**
 *
 * SubmitIdCard
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Button, Typography } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';

import FontAwesome from '../uiStyle/FontAwesome';
import Image from '../uiStyle/Images';
import FrontSideCard from '../../images/icon/card/front-side.png';
import BackSideCard from '../../images/icon/card/back-side.png';

import messages from './messages';

import './style.scss';
import Form from '../uiStyle/Form';

function SubmitIdCard({
  id_type,
  open,
  handleClose,
  handleImageChange,
  frontPreviewUrl,
  backPreviewUrl,
  cardSubmitHandler,
}) {
  return (
    <Grid>
      <Dialog
        open={open}
        onClose={handleClose}
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
            Step - 2 : Upload {id_type}
            <Typography onClick={handleClose} component="span">
              <FontAwesome name="times" />
            </Typography>
          </DialogTitle>
          <DialogContent className="submitIdCardBody">
            <Form onSubmit={cardSubmitHandler}>
              <Grid className="multipleImgUpload">
                <Grid className="imageUpload">
                  <Grid className="imagePreview">
                    <label htmlFor="choose-front-profile">
                      <Image
                        src={
                          frontPreviewUrl !== null ? frontPreviewUrl : FrontSideCard
                        }
                      />
                    </label>
                  </Grid>
                  <Button className="uploadBtn">
                    Select Image
                    <input
                      accept=".jpeg,.jpg,.png,.svg"
                      type="file"
                      id="choose-front-profile"
                      name="choose-front-profile"
                      onChange={handleImageChange(
                        'frontFile',
                        'frontPreviewUrl',
                      )}
                    />
                  </Button>
                  Front
                </Grid>

                <Grid className="imageUpload">
                  <Grid className="imagePreview">
                    <label htmlFor="choose-back-profile">
                      <Image
                        src={
                          backPreviewUrl !== null ? backPreviewUrl : BackSideCard
                        }
                      />
                    </label>
                  </Grid>
                  <Button className="uploadBtn">
                    Select Image
                    <input
                      accept=".jpeg,.jpg,.png,.svg"
                      type="file"
                      id="choose-back-profile"
                      name="choose-back-profile"
                      onChange={handleImageChange('backFile', 'backPreviewUrl')}
                    />
                  </Button>
                  Back
                </Grid>
              </Grid>
              <Button type="submit" className="formSubmitBtn">
                Upload
              </Button>
            </Form>
          </DialogContent>
        </Grid>
      </Dialog>
    </Grid>
  );
}

SubmitIdCard.propTypes = {};

export default SubmitIdCard;
