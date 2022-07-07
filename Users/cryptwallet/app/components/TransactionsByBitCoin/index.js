/**
 *
 * TransactionsByBitCoin
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import Grid from '@material-ui/core/Grid';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import './style.scss';

function TransactionsByBitCoin(props) {
  return (
    <Grid className="transactionsByBitCoin">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Deposit Address</TableCell>
            <TableCell>Transaction ID</TableCell>
            <TableCell>Cypto Amount</TableCell>
            <TableCell>Ypto Amount</TableCell>
            <TableCell>Confirmations</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <p>2NCzoqbY7CXitVwwiNDq9MqvjDJV4DcBj3Q2NCzoqbY7CXi</p>
            </TableCell>
            <TableCell>
              <p>sd6501sd1365d136d84d6</p>
            </TableCell>
            <TableCell>0.16546</TableCell>
            <TableCell>0.06326345</TableCell>
            <TableCell>2/2</TableCell>
            <TableCell className="dateTd">22 March 2019</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <p>2NCzoqbY7CXitVwwiNDq9MqvjDJV4DcBj3Q2NCzoqbY7CXi</p>
            </TableCell>
            <TableCell>
              <p>sd6501sd1365d136d84d6</p>
            </TableCell>
            <TableCell>0.16546</TableCell>
            <TableCell>0.06326345</TableCell>
            <TableCell>2/2</TableCell>
            <TableCell className="dateTd">22 March 2019</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <p>2NCzoqbY7CXitVwwiNDq9MqvjDJV4DcBj3Q2NCzoqbY7CXi</p>
            </TableCell>
            <TableCell>
              <p>sd6501sd1365d136d84d6</p>
            </TableCell>
            <TableCell>0.16546</TableCell>
            <TableCell>0.06326345</TableCell>
            <TableCell>2/2</TableCell>
            <TableCell className="dateTd">22 March 2019</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <p>2NCzoqbY7CXitVwwiNDq9MqvjDJV4DcBj3Q2NCzoqbY7CXi</p>
            </TableCell>
            <TableCell>
              <p>sd6501sd1365d136d84d6</p>
            </TableCell>
            <TableCell>0.16546</TableCell>
            <TableCell>0.06326345</TableCell>
            <TableCell>2/2</TableCell>
            <TableCell className="dateTd">22 March 2019</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <p>2NCzoqbY7CXitVwwiNDq9MqvjDJV4DcBj3Q2NCzoqbY7CXi</p>
            </TableCell>
            <TableCell>
              <p>sd6501sd1365d136d84d6</p>
            </TableCell>
            <TableCell>0.16546</TableCell>
            <TableCell>0.06326345</TableCell>
            <TableCell>2/2</TableCell>
            <TableCell className="dateTd">22 March 2019</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Grid>
  );
}

// TransactionsByBitCoin.propTypes = {};

export default TransactionsByBitCoin;
