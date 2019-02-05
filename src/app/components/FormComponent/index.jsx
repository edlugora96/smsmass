import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchServer from '../../shared/utils/fetchServer.js';
import { saveTable, sendSMSserver } from '../../redux/redux.js';
import store from '../../redux/store.js';

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state={
      toggleDropdown:false,
      variables:''
    };
    this.toggleDropdown = this.toggleDropdown.bind(this)
  }
  toggleDropdown(){
    this.setState({
      toggleDropdown: !this.state.toggleDropdown
    })
  }
  render() {
    let {
      toggleDropdown
    }= this.state,
    {
      saveTableReducer
    }= this.props;
    return (
      <form className="App-header-form col-4">
          <h1>Type Your <br/>Massive Message</h1><br/>    
          <h5><i>"First drop your file"</i></h5>      
      </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(FormComponent);
