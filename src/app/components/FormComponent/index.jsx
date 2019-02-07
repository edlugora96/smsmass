import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Textarea from './ExpandingTextarea'
import { saveTable, sendSMSserver, massSendSMSserver } from '../../redux/redux.js';
import store from '../../redux/store.js';

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state={
      toggleDropdown:false,
      variables:'',
      isertOnTextArea:'',
      classNAmeButtonItem:'',
      textLong: true
    };
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.appendTextarea = this.appendTextarea.bind(this)
    this.prepareAllForSend = this.prepareAllForSend.bind(this)
  }
  toggleDropdown(){
    this.setState({
      toggleDropdown: !this.state.toggleDropdown
    })
  }
  appendTextarea(e){
    let targ = e.currentTarget,
        value = "<" +targ.textContent+ ">" || "<" +targ.innerText+ ">";
    value = value.replace(/\n/g, '')
    if (targ.id=='dropdown-trigger') {
      this.setState({
        isertOnTextArea:''
      })
    } 
    else
    {
      this.setState({
        isertOnTextArea:value
      })
    }
    this.toggleDropdown()
  }
  prepareAllForSend(){
    let contacts = this.props.saveTableReducer[1],
        headTableContacts = this.props.saveTableReducer[0],
        message = document.getElementById('app-header-textarea').value
    this.props.massSendSMSserver({contacts, message, headTableContacts})
  }
  render() {
    let { toggleDropdown, isertOnTextArea, textLong }= this.state,
        { path }= this.props.match,
        { saveTableReducer }= this.props;
    return (
      <form className="App-header-form col-4">
            <h1>Type Your <br/>Massive Message</h1><br/>    
        {
          path==='/tableOfContacts' ?
          <React.Fragment>
            <div className="App-header-form-group form-group">
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <a onClick={(e)=>{e.preventDefault();e.stopPropagation(); this.setState({textLong:!textLong}) }} className={`nav-link App-header-longSms ${textLong?'active':''}`} href="#">Long SMS</a>
                </li>
                <li className="nav-item dropdown">
                  <a onClick={(e)=>{e.preventDefault();e.stopPropagation(); this.appendTextarea(e) }} id='dropdown-trigger' className="nav-link dropdown-toggle bg-light App-header-varibles" href="#">Variables</a>
                  <div className={toggleDropdown?"dropdown-menu block":"dropdown-menu"}>
                    {
                      saveTableReducer[0].map((res, key)=>{
                        return <a onClick={(e)=>{e.preventDefault();e.stopPropagation(); this.appendTextarea(e) }} key={key} className="dropdown-item" href="#">{res.Header}</a>
                      })
                    }
                  </div>
                </li>
              </ul>
              <div id="dvCSV"></div>
              <Textarea
                  maxLength={textLong?480:160}
                  id="app-header-textarea"
                  className="form-control App-header-textarea"
                  name="post[notes]"
                  placeholder="Write your message" 
                  insert={isertOnTextArea}
              />
              <p id="charterCounter">Max {textLong?480:160} charter</p>
            </div>
            <button 
              onClick={(e)=>
                {
                  e.preventDefault();
                  e.stopPropagation(); 
                  this.prepareAllForSend()
                }} 
              className="btn btn-primary">Start to Send</button>     
          </React.Fragment>
          :
          <h5><i>"First drop your file"</i></h5> 
        }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
    ...store.getState()
})
const mapDispatchToProps = {
  sendSMSserver,
  massSendSMSserver
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormComponent));
