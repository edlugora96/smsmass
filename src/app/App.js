import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import HeaderHome from './components/HeaderHome';
import { saveTable } from './redux/redux.js';
import handlerContactsObj from './shared/utils/hlrCntcsObj.js';
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

        <form className="App-header-form col-4">
          <h3>The Massive <br/>Message</h3><br/>
          <div className="App-header-form-group form-group">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <a className="nav-link active App-header-longSms" href="#">Long SMS</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle bg-light App-header-varibles" href="#">Variables</a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a>
                  <a className="dropdown-item" href="#">Separated link</a>
                </div>
              </li>
            </ul>
            <div id="dvCSV"></div>
            <textarea className="form-control App-header-textarea" rows="5"></textarea>
            <p id="charterCounter">Max 480 charter</p>
          </div>
          <button className="btn btn-primary">Start to Send</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    ...store.getState()
})
const mapDispatchToProps = {
  saveTable
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
