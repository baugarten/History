import React from 'react';
import { connect } from 'react-redux'
import Terminal from './Terminal';

class CommandItem extends React.Component {
  render() {
    const iconClass = `fa ${this.props.icon}`;

    return (<div className="row code-row">
      <div className="large-2 columns">
        <h3 className="content-header">
          <i className={iconClass}></i>&nbsp;
          {this.props.action}
        </h3>
      </div>
      <div className="large-10 columns">
        <Terminal>
          {this.props.children}
        </Terminal>
      </div>
    </div>);
  }
}

CommandItem.propTypes = {
  action: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired
}

export default CommandItem;
