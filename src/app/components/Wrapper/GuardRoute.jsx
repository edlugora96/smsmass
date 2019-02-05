import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../redux/store.js';

class GuardRoute extends Component {
  render() {
    const {
      type,
      saveTableReducer
    }= this.props;
    if (type==="tableUrl" && saveTableReducer.length<=0) {
      return <Redirect to='/'/>
    } else {
      return <Route {...this.props} />
    }
  }
}
const mapStateToProps = (state) => ({
    ...store.getState()
})
export default connect(mapStateToProps)(GuardRoute);
