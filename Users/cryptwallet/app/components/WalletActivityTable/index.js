/**
 *
 * WalletActivityTable
 *
 */

import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { List, ListItem } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import moment from 'moment';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function WalletActivityTable({
  currentPage,
  rowsPerPage,
  row,
  pageNumberOfPage,
  paginateHandler,
  type
}) {
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = row.slice(indexOfFirstRow, indexOfLastRow);

  
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(row.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => (
    <ListItem
      key={number}
      id={number}
      className={pageNumberOfPage === number ? 'active' : ''}
      onClick={paginateHandler(number)}
    >
      {number}
    </ListItem>
  ));
  return (
    <Fragment>
      <Grid className="walletActivityBody">
        <Grid className="tableWrapper">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Transaction Hash</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Note</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="dateTd">
                    <p>{row.recipientAdress}</p>
                  </TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>
                    <a href={'https://explorer.ultranote.org/index.html?hash=' + row.hash} target="_blank"><p>{row.hash}</p></a>
                  </TableCell>
                  <TableCell className="dateTd">{moment(row.updatedAt).format('L LT')}</TableCell>
                  <TableCell>{row.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      <Grid className="PaginationWrapper">
        <List>{renderPageNumbers}</List>
      </Grid>
    </Fragment>
  );
}

WalletActivityTable.propTypes = {};

export default WalletActivityTable;
