import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../redux/store.js';
import BootstrapTable from 'react-bootstrap-table-next';

class headerHome extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }
  render() {
    const data = this.props.saveTableReducer[1];
    const columns = this.props.saveTableReducer[0];
    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      bgColor: '#d4edda',
      hideSelectColumn: true
    }
    console.log(data)
    return (
      <header className="App-header col-8">
        <BootstrapTable
          classes='uniqueTableHead'
          keyField='id'
          data={[]}
          bordered={ false }
          columns={columns}
          noDataIndication=""/>
        <BootstrapTable
          selectRow={selectRow}
          classes='uniqueTableBody'
          bordered={ false }
          hover
          height='400px'
          scrollTop={ 'top' }
          keyField='id'
          data={data}
          columns={columns}
        />
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
    ...store.getState()
})
export default connect(mapStateToProps)(headerHome);
