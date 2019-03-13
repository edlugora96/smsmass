/* jshint unused:false */
import React from 'react';
import './styles/tableJson.styl';

const TableJson = (props) =>pug`
  .table
    .gridTablle
      each elemt, index in props.headers
        .th(key=index+"th"+elemt)= elemt

      if (props.body)
        each elemt, index in props.body
          each head, indx in props.headers
            .td(key=(index*indx+(Math.random()*9999)+1)+'td'+elemt[head])= elemt[head]
`;

export default TableJson;