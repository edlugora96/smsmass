
import React from 'react';
import ReactTable from "react-table";
import { connect } from 'react-redux';
import store from '../../redux/store.js';

class MuiVirtualizedTable extends React.PureComponent {
  render() {
    const data = this.props.saveTableReducer[1]
   
    const columns = this.props.saveTableReducer[0]
    return <ReactTable
      data={data}
      columns={columns}
    />
  }
}
const mapStateToProps = (state) => ({
    ...store.getState()
})
export default connect(mapStateToProps)(MuiVirtualizedTable);