/**
 *
 * MessageDetail
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
 
 function MessageDetail({
   message,
   is_next,
   is_prev,
   adModalOpen,
   adModalCloseHandler,
   adModalReplyHandler,
   adModalPrevHandler,
   adModalNextHandler,
   adModalDownloadHandler,
 }) {

  let headers = [];
  let msg_len = 0;
  let is_reply = true;
  let is_download = true;
  if ( message.message ) {
    let msg = message.message;
    headers = message.headers;
    for ( let header of headers ) {
      if ( header['name'] == 'Reply-To' ) {
        is_reply = false;
      }
      if ( header['name'] == 'Attachment' ) {
        is_download = false;
      }
    }
    msg_len = msg.length;
  }
 
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
           Message details
           <Typography onClick={adModalCloseHandler} component="span">
             <FontAwesome name="times" />
           </Typography>
         </DialogTitle>
          { message.message && 
            <DialogContent className="modalCardBody">
              <Grid className="message">
                  <Grid className="message-label">Block height:</Grid>
                  <Grid className="message-body">{message.blockHeight}</Grid>
              </Grid>
              <Grid className="message">
                  <Grid className="message-label">Transaction hash:</Grid>
                  <Grid className="message-body">{message.hash.toUpperCase()}</Grid>
              </Grid>
              <Grid className="message">
                  <Grid className="message-label">Amount:</Grid>
                  <Grid className="message-body">{message.amount/1000000}</Grid>
              </Grid>
              <Grid className="message">
                  <Grid className="message-label">Message size:</Grid>
                  <Grid className="message-body">{msg_len} (bytes)</Grid>
              </Grid>
              {headers.map((row, index) => (
                <Grid className="message" key={index}>
                  <Grid className="message-label bold">{row.name}</Grid>
                  <Grid className="message-body">{row.value}</Grid>
                </Grid>
              ))}
              <Grid className="message">
                  <Grid className="message-label bold">Message body:</Grid>
                  <div className="message-body" dangerouslySetInnerHTML={{__html: message.full_message}} />
              </Grid>
              <Button type="button" className="btnMsg" disabled={is_reply} onClick={adModalReplyHandler}>
                  REPLY
                </Button>
              <Button type="button" className="btnMsg" disabled={is_download} onClick={adModalDownloadHandler}>
                  DOWNLOAD ATTACHMENT
                </Button>
              <Button type="button" className="btnMsg pull-right" disabled={is_next} onClick={adModalNextHandler}>
                ＞＞
                </Button>
              <Button type="button" className="btnMsg pull-right" disabled={is_prev} onClick={adModalPrevHandler}>
                ＜＜
                </Button>
            </DialogContent>
          }
       </Grid>
     </Dialog>
   );
 }
 
 MessageDetail.propTypes = {};
 
 export default MessageDetail;
 