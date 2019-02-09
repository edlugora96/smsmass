import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../redux/store.js';
import EnhancedTable from './materialTable.jsx';

class headerHome extends Component {
  constructor(props) {
    super(props);
    this.state={};
  } 
  /*componentDidMount(){
    let body = window.localStorage.getItem('saveTable').split("\n"),
        arrayBody = [], htmlBody=[];
    for (var i = 1; i < body.length; i++) {
      arrayBody[i] = [];
      body[i].split(",").map((res, key)=>{
          arrayBody[i][key] = res;
      })
    }
    for (var i = 1; i < arrayBody.length-1; i++) {
      htmlBody[i] = "<tr key="+i+">";
      for (var j = 0; j < arrayBody[i].length; j++) {
        if (j==0) {
          htmlBody[i] +="<th key="+i*j+" scope='row'>"+i+"</th>";
        }
        htmlBody[i] += "<td key="+i*j+">"+arrayBody[i][j]+"</td>";
      }
     htmlBody[i] += "</tr>";
    }
    let tbodyContact = document.getElementById("bodyTable")
    console.log(tbodyContact)
    htmlBody.map((res, key)=>{
      tbodyContact.innerHTML += res
    })
  }*/
  render() {
    //let body = window.localStorage.getItem('saveTable').split("\n");

    return (
      <header className="App-header col-8">
        <EnhancedTable/>
        {/*<table className=" table table-responsive table-hover table-sm table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              {
                body[0].split(',').map((res, key)=> {
                  return <th key={key} scope="col">{res}</th>
                })
              }
            </tr>
          </thead>    
          <tbody id="bodyTable">
          </tbody>
        </table>*/}
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
    ...store.getState()
})
export default connect(mapStateToProps)(headerHome);
