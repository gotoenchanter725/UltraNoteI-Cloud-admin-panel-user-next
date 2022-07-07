/**
 *
 * SelectAddress
 *
 */

 import React from 'react';
 // import PropTypes from 'prop-types';
 // import styled from 'styled-components';
 
 import { FormattedMessage } from 'react-intl';
 import { Button, List, ListItem, Typography } from '@material-ui/core';
 import DialogContent from '@material-ui/core/DialogContent';
 import DialogTitle from '@material-ui/core/DialogTitle';
 import Dialog from '@material-ui/core/Dialog';
 import Grid from '@material-ui/core/Grid';
 import Table from '@material-ui/core/Table';
 import TableHead from '@material-ui/core/TableHead';
 import TableRow from '@material-ui/core/TableRow';
 import TableCell from '@material-ui/core/TableCell';
 import TableBody from '@material-ui/core/TableBody';
 import FontAwesome from '../uiStyle/FontAwesome';
 import Images from '../../components/uiStyle/Images';
 
 import messages from './messages';
 
 import './style.scss';
 import ShareAction from '../../images/icon/action/share-action.png';
 
 function SelectAddress({
   addresses,
   adModalOpen,
   adModalCloseHandler,
   adModalSelectHandler,
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
           Select Address
           <Typography onClick={adModalCloseHandler} component="span">
             <FontAwesome name="times" />
           </Typography>
         </DialogTitle>
         <DialogContent className="modalCardBody">
          <Grid className="tableWrapper">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Label</TableCell>
                  <TableCell>Addres</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {addresses.map((row, index) => (
                  <TableRow key={index} onDoubleClick={adModalSelectHandler(row[1])}>
                    <TableCell>{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>
                    <TableCell>
                      <List className="actionBtns">
                        <ListItem onClick={adModalSelectHandler(row[1])} style={{ marginRight: '5px !important' }}>
                          <Images src={ShareAction} />
                        </ListItem>
                      </List>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid> 
         </DialogContent>
       </Grid>
     </Dialog>
   );
 }
 
 SelectAddress.propTypes = {};
 
 export default SelectAddress;
 