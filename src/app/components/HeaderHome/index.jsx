import React, { Component } from 'react';
import logo from '../../shared/img/sms-min.png';

class headerHome extends Component {
  constructor(props) {
    super(props);
    this.state={
      dragOver:false
    };
  }
  render() {
    let {
      dragOver
    } = this.state;
    return (
      <header onDragOver={(e)=>{e.preventDefault();e.stopPropagation();this.setState({dragOver:true})}} onDragEnd={(e)=>{e.preventDefault();e.stopPropagation();this.setState({dragOver:false})}} onDragLeave={(e)=>{e.preventDefault();e.stopPropagation();this.setState({dragOver:false})}} onDrop={this.props.onFileLoad.bind(this)} className="App-header col-8">
        <div className={dragOver?"App-header-drop-box-drag-over App-header-drop-box":"App-header-drop-box"}>
          <label htmlFor="excel"  >
            <h1> Welcome to SMS Bult </h1>
            <h6>Send a massive SMS for your marketing campaign.</h6>
            <img src={logo} className="App-logo" alt="logo" />
            <i className="App-link" >Drop CSV file with contact list.</i>
          </label>
          <input onDrop={this.props.onFileLoad.bind(this)} onChange={this.props.onFileLoad.bind(this)} style={{"display":"none"}} id="excel" type="file" />
        </div>
        <small className="App-header-add">
          <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from 
            <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.com</a> is licensed by 
            <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" >CC 3.0 BY</a>
          </div>
        </small>
      </header>
    );
  }
}

export default headerHome;
