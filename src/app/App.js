import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import FormComponent from './components/FormComponent';
import handlerContactsObj from './shared/utils/hlrCntcsObj.js';
import HeaderHome from './components/HeaderHome';
import { saveTable, sendSMSserver } from './redux/redux.js';
import store from './redux/store.js';
import TableOfContacts from './components/TableOfContacts';

import './style/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      tableOfContacts:'',
      variables:''
    };
    this.onFileLoad = this.onFileLoad.bind(this);
    this.putState = this.putState.bind(this);
  }

  
  onFileLoad(e){
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer) {
      var handlerContacts = new handlerContactsObj(e.dataTransfer.files[0])
      handlerContacts.readCsvFile().then((response) => {
        this.props.saveTable(response);
        this.props.history.push('/tableOfContacts');
        window.localStorage.setItem('saveTable', response);
      }).catch((response) => {
        console.error(response)
      })
    }
    else{
      var handlerContactsOth = new handlerContactsObj(e.target.files[0])
      handlerContactsOth.readCsvFile().then((response) => {
        this.props.saveTable(response)
        this.props.history.push('/tableOfContacts');
        window.localStorage.setItem('saveTable', response);
      }).catch((response) => {
        console.error(response)
      })
    }
  }
  putState(par) {
    this.setState({
      tableOfContacts:par,
      variables: par[0]
    })
  }
  render() {
    let {
      path
    } = this.props.match;
    return (
      <div className="App row">
      {
        path==='/tableOfContacts' ?
        <TableOfContacts saveTableReducer={this.props.saveTableReducer}/>
        :
        <HeaderHome saveTableReducer={this.props.saveTableReducer}  onFileLoad={this.onFileLoad} />
      }
        <FormComponent></FormComponent>
        
      </div>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
