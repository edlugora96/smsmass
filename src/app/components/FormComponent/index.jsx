import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Textarea from './ExpandingTextarea.jsx'
import fetchServer from '../../shared/utils/fetchServer.js';
import { saveTable, massSendSMSserver } from '../../redux/redux.js';
import store from '../../redux/store.js';
import pacman from '../../shared/img/pacman.svg';

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state={
      toggleDropdown:false,
      variables:'',
      isertOnTextArea:'',
      classNAmeButtonItem:'',
      textLong: true,
      textareaLong: 0
    };
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.appendTextarea = this.appendTextarea.bind(this)
    this.prepareAllForSend = this.prepareAllForSend.bind(this)
    this.textareaLongChange = this.textareaLongChange.bind(this)
  }
  textareaLongChange(val){
    this.setState({
      textareaLong: val
    })
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
    let serverRes = this.props.massSendSMSserver({contacts, message, headTableContacts})
  }
  componetWillReciveProps(nextProps){console.log(nextProps)}
  render() {
    let { toggleDropdown, isertOnTextArea, textLong, textareaLong }= this.state,
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
                  <a onClick={(e)=>{e.preventDefault();e.stopPropagation();let tear = document.getElementById('app-header-textarea').value.length; this.textareaLongChange(tear>160?160:tear); this.setState({textLong:!textLong}) }} className={`nav-link App-header-longSms ${textLong?'active':''}`} href="#">Long SMS</a>
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
                  maxLength={textLong?1000:160}
                  id="app-header-textarea"
                  className="form-control App-header-textarea"
                  name="post[notes]"
                  placeholder="Write your message" 
                  insert={isertOnTextArea}
                  onChange={e=>{this.textareaLongChange(e.currentTarget.value.length)}}
              />
              <p id="charterCounter">You have written {textareaLong} of {textLong?1000:160} charter</p>
            </div>
            {
              localStorage.getItem("END")?
              <button 
                onClick={(e)=>
                  {
                    e.preventDefault();
                    e.stopPropagation(); 
                    this.prepareAllForSend()
                  }} 
                className="btn btn-primary">Start to Send
              </button>  
              : pacman
            }  
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
  massSendSMSserver
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormComponent));
