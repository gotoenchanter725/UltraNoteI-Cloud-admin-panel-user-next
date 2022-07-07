import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import './style.scss';

export class PublicRoute extends Component {

  render() {
    return (
      <Fragment>
        <Route
          {...this.props}
          render={props => <Component {...props} />}
        />
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

const mapStateToProps = createStructuredSelector({

});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PublicRoute);
