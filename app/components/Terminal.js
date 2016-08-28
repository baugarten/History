import React from 'react';
import { connect } from 'react-redux'

class Terminal extends React.Component {
  render() {
    return (
      <div className="shell-wrap">
        <ul className="shell-body">
          {this.props.children}
        </ul>
      </div>);
  }
}

export default Terminal;
