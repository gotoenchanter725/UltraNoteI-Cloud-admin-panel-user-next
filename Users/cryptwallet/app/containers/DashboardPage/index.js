/**
 *
 * DashboardPage
 *
 */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  VictoryPie,
  VictoryAxis,
  VictoryChart,
  VictoryBar,
  VictoryTheme,
} from 'victory';

import Grid from '@material-ui/core/Grid';
import { Button, Typography } from '@material-ui/core';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDashboardPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import './style.scss';
import DwLineChart from '../../components/DwLineChart';
import {depositAndWithdrawStart} from '../../store/auth/auth.actions';
import { selectUser, selectWithdrawByMonth, selectDepositByMonth, selectWithdrawByDay, selectDepositByDay } from '../../store/auth/auth.selectors';


/* eslint-disable react/prefer-stateless-function */
export class DashboardPage extends React.Component {
  state = {
    metric: 0,
    withDraw: [],
    deposite: [],
  };

  componentDidMount() {
    const {connectedUser, depositAndWithdrawData} = this.props;
    const user_id = connectedUser.id
    depositAndWithdrawData(user_id);

  }

  componentWillReceiveProps(nextProps){
    const {withdrawByMonth} = nextProps;
    const {depositByMonth} = nextProps;

    let withdrawTotal = 0;
    for (let i = 0; i < withdrawByMonth.length; i++){
      const withdrawAmount = withdrawByMonth[i]['actual'];
      withdrawTotal += withdrawAmount;
    }

    let depositTotal = 0;
    for (let i = 0; i < depositByMonth.length; i++){
      const depositAmount = depositByMonth[i]['actual'];
      depositTotal += depositAmount;
    }

    let metric;
    if (depositTotal != 0 || withdrawTotal != 0) {
      metric = Math.round(withdrawTotal / (depositTotal + withdrawTotal) * 100);
    } else {
      metric = 0;
    }

    this.setState({

      metric: metric,
      withDraw: withdrawByMonth,
      deposite: depositByMonth,      
      withdrawData: withdrawByMonth,
      depositeData: depositByMonth,
    });
  }

  toggleHistory = prop => () => {
    if (prop === 'deposite') {
      if (this.state[prop].length >= 0) {
        this.setState({
          [prop]: [],
        });
      }
      if (this.state[prop].length === 0) {
        this.setState({
          [prop]: this.state.depositeData,
        });
      }
    }
    if (prop === 'withDraw') {
      console.log(prop);
      if (this.state[prop].length >= 0) {
        this.setState({
          [prop]: [],
        });
      }
      if (this.state[prop].length === 0) {
        this.setState({
          [prop]: this.state.withdrawData,
        });
      }
    }
  };

  render() {

    /*const auth = cookie.get('Auth');
    if (!auth) {
      return <Redirect to="/login" />;
    }*/

    return (
      <Grid className="mainBody">
        <Grid container spacing={16} className="container">
          <Grid item xs={12} md={4}>
            <Grid className="card">
              <Typography className="section-title" component="h4">
                Withdraw Status
              </Typography>
              <Grid className="victoryPieArea">
                <VictoryPie
                  padAngle={0}
                  // used to hide labels
                  labelComponent={<Fragment />}
                  innerRadius={80}
                  width={200}
                  height={200}
                  data={[
                    { key: '', y: this.state.metric },
                    { key: '', y: 100 - this.state.metric },
                  ]}
                  colorScale={['#1CA9EE', '#DFF3FF']}
                  animate={{
                    duration: 2000,
                  }}
                />
                <Typography className="victoryPieCenterLabel" component="p">
                  {this.state.metric}%
                </Typography>
              </Grid>
              <Typography className="victoryPieTitle" component="p">
                Withdraw : <span>{this.state.metric}%</span>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid className="card">
              <Grid container>
                <Grid item xs={12} sm={7}>
                  <Typography className="section-title" component="h4">
                    Last 6 month history
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Grid className="barController">
                    <Button
                      disableRipple
                      onClick={this.toggleHistory('deposite')}
                    >
                      <p />
                      Deposit
                    </Button>
                    <Button
                      disableRipple
                      className="withDraw"
                      onClick={this.toggleHistory('withDraw')}
                    >
                      <p />
                      Withdraw
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <VictoryChart height={220} minDomain={{ x: 0 }}>
                <VictoryBar
                  animate={{ duration: 250 }}
                  barWidth={20}
                  style={{
                    data: { fill: '#DFF3FF', stroke: '#DFF3FF' },
                  }}
                  data={this.state.deposite}
                  x="month"
                  y={d => d.actual}
                />
                <VictoryBar
                  animate={{ duration: 250 }}
                  barWidth={20}
                  style={{
                    data: { fill: '#5E55E6', stroke: '#5E55E6' },
                  }}
                  data={this.state.withDraw}
                  x="month"
                  y={d => d.actual}
                />
                <VictoryAxis
                  style={{
                    axis: { stroke: '#dddddd' },
                    axisLabel: { fontSize: 10 },
                    ticks: { stroke: 'grey', size: 0 },
                    tickLabels: { fontSize: 10 },
                  }}
                />
                <VictoryAxis
                  tickFormat={t => `$ ${Math.round(t)}`}
                  theme={VictoryTheme.material}
                  style={{
                    axis: { stroke: '#ffffff' },
                    axisLabel: { fontSize: 10 },
                    grid: { stroke: 'rgba(93, 85, 230, 0.05)' },
                    ticks: { stroke: 'grey', size: 0 },
                    tickLabels: { fontSize: 10 },
                  }}
                  dependentAxis
                />
              </VictoryChart>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid className="card">
              <Grid container>
                <Grid item xs={12} sm={8}>
                  <Typography className="section-title" component="h4">
                      Withdrawal & Deposit
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Grid className="barController lineChart">
                    <Button disableRipple>
                      <p />
                      Deposit
                    </Button>
                    <Button disableRipple className="withDraw">
                      <p />
                      Withdraw
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <DwLineChart 
                withdrawByDay = {this.props.withdrawByDay}
                depositByDay = {this.props.depositByDay} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

DashboardPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

// const mapStateToProps = createStructuredSelector({
const mapStateToProps = state => ({
  connectedUser: selectUser(state),
  dashboardPage: makeSelectDashboardPage(),
  withdrawByMonth: selectWithdrawByMonth(state),
  depositByMonth: selectDepositByMonth(state),
  withdrawByDay: selectWithdrawByDay(state),
  depositByDay: selectDepositByDay(state),
  
});

const mapDispatchToProps = (dispatch) => ({
  depositAndWithdrawData: (payload) => dispatch(depositAndWithdrawStart(payload))
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dashboardPage', reducer });
const withSaga = injectSaga({ key: 'dashboardPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DashboardPage);
