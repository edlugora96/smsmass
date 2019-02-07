import React, { Component } from 'react'
import { getHeight, omit } from './helpers'

export default class ExpandingTextarea extends Component {
  constructor(...params) {
    super(...params)
    this.state = {
      insert: this.props.insert,
      click:false
    }
    this._handleChange = this._handleChange.bind(this)
  }

  componentDidMount() {
    this._adjustTextarea(this.el)
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.maxLength !== this.props.maxLength) {
      let contentTextArea = document.getElementById(this.props.id||"motepiedra").value;
          contentTextArea = contentTextArea.substring(0, prevProps.maxLength)
      document.getElementById(this.props.id||"motepiedra").value = contentTextArea;
      this._adjustTextarea(this.el)
    }
    if (prevProps.insert !== this.props.insert && prevProps.insert!=='') {
      document.getElementById(this.props.id||"motepiedra").value += prevProps.insert
      this._adjustTextarea(this.el, prevProps.insert)
      this.setState({click:false})
    }
    if (prevProps.value !== this.props.value) {
      this._adjustTextarea(this.el)
    }
  }

  render() {
    const { props, _handleChange } = this
    const rest = omit([ 'onChange' ], props)

    return (
      <textarea
        id={props.id||"motepiedra"}
        {...rest}
        ref={x => this.el = x}
        onChange={_handleChange}
      />
    )
  }

  _handleChange(e) {
    this.props.onChange(e)
    this._adjustTextarea(e.target)
  }

  _adjustTextarea(node, val) {
    let valueTextarea = node.value.replace(/\n>/, '>');
    node.value = valueTextarea;
    node.focus()
    if (node) {
      node.style.height = 0
      node.style.height = `${getHeight(node, this.props.rows)}px`
    }
  }
}

ExpandingTextarea.defaultProps = {
  onChange: Function.prototype
}
