import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';

class CommandItem extends React.Component {
  render() {
    var actionClass = "";
    var codeClass = "";
    if (this.props.rightAction) {
      actionClass = "large-2 large-push-10 columns";
      codeClass = "large-10 large-pull-2 columns";
    } else {
      actionClass = "large-2 columns";
      codeClass = "large-10 columns";
    }
    const iconClass = `fa ${this.props.icon}`;

    return (<div className="row code-row">
      <div className={actionClass}>
        <h3 className="content-header">
          {this.props.action}
          <br />
          <i className={iconClass}></i>
        </h3>
      </div>
      <div className={codeClass}>
        <pre>
        <code>
          {this.props.children}
        </code>
        </pre>
      </div>
    </div>);
  }
}

CommandItem.propTypes = {
  action: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired,
  command: React.PropTypes.string.isRequired
}

export default CommandItem;