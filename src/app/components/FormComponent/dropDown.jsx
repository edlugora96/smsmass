import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchServer from '../../shared/utils/fetchServer.js';
import { saveTable, sendSMSserver } from '../../redux/redux.js';
import store from '../../redux/store.js';

class DropDown extends Component {
  
  render() {
    return (   
            
      <div className="App-header-form-group form-group">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a className="nav-link active App-header-longSms" href="#">Long SMS</a>
          </li>
          <li className="nav-item dropdown">
            <a onClick={(e)=>{e.preventDefault();e.stopPropagation(); this.toggleDropdown() }} className="nav-link dropdown-toggle bg-light App-header-varibles" href="#">Variables</a>
            <div className={toggleDropdown?"dropdown-menu block":"dropdown-menu"}>
              {
                saveTableReducer.split('\n')[0].split(',').map((res, key)=>{
                  return <a onClick={(e)=>{e.preventDefault();e.stopPropagation(); this.toggleDropdown() }} key={key} className="dropdown-item" href="#">{res}</a>
                })
              }
            </div>
          </li>
        </ul>
        <div id="dvCSV"></div>
        <textarea className="form-control App-header-textarea" rows="10"></textarea>
        <p id="charterCounter">Max 480 charter</p>
      </div>
      <button 
        onClick={(e)=>
          {
            e.preventDefault();
            e.stopPropagation(); 
            this.props.sendSMSserver(fetchServer.sendSms({"phone":"04267961962","message": "Lorem ipsum dolor sit"}))
          }} 
        className="btn btn-primary">Start to Send</button>
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
