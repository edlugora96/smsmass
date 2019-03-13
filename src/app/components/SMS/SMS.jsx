/* jshint unused:false */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '$redux/actions.js';
import store from '$redux/store.js';
import ReadCsvFile from '$utils/loadMessage.js';
import FormikJson from '$utils/FormikJson';
import TableJson from '$utils/TableJson';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import formTemplate from './formTemplate';
import './styles/sms.styl';

const FileReader = new ReadCsvFile();


class SMS extends Component {
  constructor(props){
    super(props);
    this.state =  {
      headers: [],
      contacts: [],
      loading: false,
      error:false,
      success:false,
      next:false
    };
    this.loadRowTable = this.loadRowTable.bind(this);
    this.startloadContacts = this.startloadContacts.bind(this);
    this.changerState = this.changerState.bind(this);
    this.loadSuccess = this.loadSuccess.bind(this);
    this.successNext = this.successNext.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  changerState(val,arg,suc,next){
    this.setState({
      loading: val,
      error:arg?arg:false,
      success:suc?suc:false,
      next: next ?next:false
    });
  }
  startloadContacts (event){
    this.dataLoaded=[];
    this.root.style.setProperty('--tableColsContact', 1);
    this.root.style.setProperty('--tableRowsContact', 1);
    this.setState({
      contacts:[],
      headers:[]
    });
    if (event.target.files[0]) {
      const read = FileReader.digestData(event.target.files[0]);
      return read;
    }
  }
  cancel(){
    this.changerState(false, false, false, false  );
    this.dataLoaded = [];
    this.root.style.setProperty('--tableColsContact', 1);
    this.root.style.setProperty('--tableRowsContact', 1);
    this.setState({
      contacts: [],
      headers: []
    });
  }
  loadRowTable (data, h=false){
    if (!h) {
      this.dataLoaded.push(data);
    }
    this.setState({
      contacts: this.dataLoaded,
      headers: h ? data : this.state.headers
    });
  }
  loadSuccess(data){
    this.changerState(false,false,true);
    this.loadRowTable(data.headers, true);
    this.root.style.setProperty('--tableColsContact', data.headers.length);
    this.root.style.setProperty('--tableRowsContact', data.total);
    this.props.saveTable(data);
  }
  successNext(){
    this.changerState(false, false, false, true);
  }
  componentDidMount(){
    this.root = document.documentElement;
    this.dataLoaded = [];
    FileReader.on('startLoad', this.changerState.bind(this,true));
    FileReader.on('loadError', this.changerState.bind(this,false));
    FileReader.on('loading', this.loadRowTable);
    FileReader.on('loadSuccess', this.loadSuccess);
  }
  render() {
    const { headers, loading, error, success, next } = this.state;
    const { successNext, startloadContacts, changerState, cancel } = this;
    const { dataTable } = this.props;
    if(loading){
      return pug`
        h1 Cargando

        ThreeSixtyIcon
      `;
    }
    else if (next){
      return pug`
        h1 2do. Redactar el Mensaje

        FormikJson(template=formTemplate["bodySMS"], data=dataTable,vars=headers, btnCancel=changerState.bind(this,false,false,true,false))
      `;
    }
    else{
      return pug`
        React.Fragment
          h1 1ero. Carga tus contactos

          if error
            h5 Error:

            p= error

          input(type="file" onChange=startloadContacts)#sms

          if success
            a(href="# " onClick=successNext) Redactar el mensaje

            br

            a(href="# " onClick=cancel) Cancelar

        TableJson(headers=headers, body=dataTable.contacts)
        //- .table
        //-   div.gridTableContatcs
        //-     each val, ind in headers
        //-       div(key=ind+val)= val

        //-     each value, i in contacts
        //-       div(key=i+value)= value
      `;
    }
  }
}

const mapStateToProps = () => ({
  ...store.getState()
});
const mapDispatchToProps = {
  ...actions
};
export default connect(mapStateToProps, mapDispatchToProps)(SMS);