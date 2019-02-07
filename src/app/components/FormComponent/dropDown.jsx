import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchServer from '../../shared/utils/fetchServer.js';
import { saveTable, sendSMSserver } from '../../redux/redux.js';
import store from '../../redux/store.js';

class DropDown extends Component {
  
  render() {
    return (   
            
      
    );
  }
}

const mapStateToProps = (state) => ({
    ...store.getState()
})
const mapDispatchToProps = {
  saveTable,
  sendSMSserver
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDown);
