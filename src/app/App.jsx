import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import utf8 from 'utf8';

import FormComponent from './components/FormComponent';
import handlerContactsObj from './shared/utils/hlrCntcsObj.js';
import HeaderHome from './components/HeaderHome';
import { saveTable  } from './redux/redux.js';
import store from './redux/store.js';
import TableOfContacts from './components/TableOfContacts';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './style/App.css';
import './style/bootstrap-table.css';

function eliminarDiacriticosEs(texto) {
    return texto
           .normalize('NFD')
           .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
           .normalize();
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      tableOfContacts:'',
      variables:'',
      statusError:true
    };
    this.onFileLoad = this.onFileLoad.bind(this);
    this.putState = this.putState.bind(this);
    this.parseFromCsvToArrayJson = this.parseFromCsvToArrayJson.bind(this);
  }

  parseFromCsvToArrayJson(csv) {
    let contacts = csv.split('\n'),
        headerMatriz = contacts[0].split(','),
        dateContacts = [],
        handlerDataHead = [{
          dataField: 'id',
          text: 'ID'
        }],
        finalDataTable = [];
    for (let i = 0; i < contacts.length-1; i++) {
      let rowContacts = contacts[i].split(',');
      if (i!=0) {
        dateContacts[i] = {}
      }

      for (let j = 0; j < rowContacts.length; j++) {
        if (i===0) {
          handlerDataHead[j+1]=
          {
            dataField :  utf8.encode(String(rowContacts[j]).replace(/(\"|\'|\r|\n)/gmi, '')),
            text :  utf8.encode(String(rowContacts[j]).replace(/(\"|\'|\r|\n)/gmi, ''))
          }
        }
        else
        {
          let head = String(headerMatriz[j]);
          dateContacts[i]['id'] = String(i-1).replace(/(\"|\'|\r|\n)/gmi, '');
          dateContacts[i][utf8.encode(String(head.replace(/(\"|\'|\r|\n)/gmi, '')))]= rowContacts[j].charAt(0)==4
            ?
              utf8.encode(String('0'+rowContacts[j].replace(/(\"|\'|\r|\n)/gmi, '')))
            :
              utf8.encode(String(rowContacts[j].replace(/(\"|\'|\r|\n)/gmi, '')))
        }
      }
    }
    finalDataTable[0] = handlerDataHead;
    finalDataTable[1] = dateContacts;
    finalDataTable[1].shift()
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
        this.setState({statusError:false})
        this.parseFromCsvToArrayJson(response);
      }).catch((response) => { this.setState({statusError:'Porfavro ingrese un archivo CSV (delimitado por comas) valido'})})
    }
    else{
      let handlerContactsOth = new handlerContactsObj(e.target.files[0])
      handlerContactsOth.readCsvFile().then((response) => {
        this.setState({statusError:false})
        this.parseFromCsvToArrayJson(response);
      }).catch((response) => { this.setState({statusError:'Porfavro ingrese un archivo CSV (delimitado por comas) valido'}) })
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