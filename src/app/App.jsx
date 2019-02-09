import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import FormComponent from './components/FormComponent';
import handlerContactsObj from './shared/utils/hlrCntcsObj.js';
import HeaderHome from './components/HeaderHome';
import { saveTable  } from './redux/redux.js';
import store from './redux/store.js';
import TableOfContacts from './components/TableOfContacts';

import './style/App.css';
import './style/reactTable.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      tableOfContacts:'',
      variables:''
    };
    this.onFileLoad = this.onFileLoad.bind(this);
    this.putState = this.putState.bind(this);
    this.parseFromCsvToArrayJson = this.parseFromCsvToArrayJson.bind(this);
  }

  parseFromCsvToArrayJson(csv) {
    let contacts = csv.split('\n'),
        headerMatriz = contacts[0].split(','),
        dateContacts = [],
        handlerDataHead = [],
        finalDataTable = [];
    for (let i = 0; i < contacts.length; i++) {
      let rowContacts = contacts[i].split(',');
      if (i!=0) {
        dateContacts[i-1] = {}
      }

      for (let j = 0; j < rowContacts.length; j++) {
        if (i===0) {
          handlerDataHead[j]= 
          {
            Header : String(rowContacts[j]).replace(/(\"|\'|\r)/gmi, ''),
            accessor : String(rowContacts[j]).replace(/(\"|\'|\r)/gmi, '')
          }
        } 
        else 
        {
          let head = String(headerMatriz[j]);
          dateContacts[i-1][head.replace(/(\"|\'|\r)/gmi, '')] =rowContacts[j].charAt(0)==4?'0'+rowContacts[j]:rowContacts[j]
        }
      }
    }
    finalDataTable[0] = handlerDataHead;
    finalDataTable[1] = dateContacts;
    this.props.saveTable(finalDataTable);
    this.props.history.push('/tableOfContacts');
    return finalDataTable;
  }
  
  onFileLoad(e){
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer) {
      let handlerContacts = new handlerContactsObj(e.dataTransfer.files[0])
      handlerContacts.readCsvFile().then((response) => {
        this.parseFromCsvToArrayJson(response);
      }).catch((response) => {
      })
    }
    else{
      let handlerContactsOth = new handlerContactsObj(e.target.files[0])
      handlerContactsOth.readCsvFile().then((response) => {
        this.parseFromCsvToArrayJson(response);
      }).catch((response) => {
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
      <div className="App row actualizate">
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
  saveTable
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));