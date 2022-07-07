/**
 *
 * DwLineChart
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory';

import Grid from '@material-ui/core/Grid';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import './style.scss';

/* eslint-disable react/prefer-stateless-function */
class DwLineChart extends React.PureComponent {
  render() {
    const { withdrawByDay, depositByDay } = this.props;
    return (
      <Grid className="dwLineChart">
        <VictoryChart
          height={220}
          domainPadding={{ y: 10 }}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension="x"
              labels={d => `Amount: ${d.y}`}
              labelComponent={
                <VictoryTooltip
                  cornerRadius={1}
                  flyoutStyle={{
                    fill: 'white',
                    strokeWidth: 1,
                    stroke: '#ddd',
                  }}
                />
              }
            />
          }
        >
          <VictoryLine
            animate={{ duration: 250 }}
            interpolation="natural"
            style={{
              data: {
                stroke: '#1CA8EE',
                strokeWidth: 3,
                strokeLinecap: 'round',
              },
              labels: {
                fontSize: 5,
                fill: '#666666',
              },
            }}
            data={depositByDay}
            x="x"
            y={d => d.y}
          />
          <VictoryLine
            animate={{ duration: 250 }}
            interpolation="natural"
            style={{
              data: {
                stroke: '#F8A2C1',
                strokeWidth: 3,
                strokeLinecap: 'round',
              },
              labels: {
                fontSize: 5,
                fill: '#666666',
              },
            }}
            data={withdrawByDay}
            x="x"
            y={d => d.y}
          />
          <VictoryAxis
            style={{
              axis: { stroke: '#dddddd' },
              axisLabel: { fontSize: 7 },
              tickLabels: { fontSize: 7 },
            }}
          />
          <VictoryAxis
            tickFormat={t => `$ ${Math.round(t)}`}
            style={{
              axis: { stroke: '#ffffff' },
              axisLabel: { fontSize: 7 },
              grid: { stroke: 'rgba(93, 85, 230, 0.05)' },
              tickLabels: { fontSize: 7 },
            }}
            dependentAxis
          />
        </VictoryChart>
      </Grid>
    );
  }
}

DwLineChart.propTypes = {};

export default DwLineChart;
