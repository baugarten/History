import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';

class Home extends React.Component {
  render() {
    return (
      <div className="main-content expanded row">
        <Messages messages={this.props.messages}/>
        <div className="row">
          <div className="medium-4 columns">
            <h3 className="content-header">
              <i className="fa fa-save"></i>
            </h3>
            <p>
              Save critical commands for future use. Never fear forgetting or losing a command from your bash history. Hist stores all of your most frequent and important commands in one central location.
            </p>
            <a href="#" role="button" className="button">View details</a>
          </div>
          <div className="medium-4 columns">
            <h3 className="content-header">
              <i className="fa fa-share"></i>
            </h3>
            <p>
              Teams need to perform the same tasks, but have no good way of sharing commands. Hist lets you store commands and give team members access to critical commands they need to be a more effective engineer
            </p>
            <a href="#" role="button" className="button">View details</a>
          </div>
          <div className="medium-4 columns">
            <h3 className="content-header">
              <i className="fa fa-search"></i>
            </h3>
            <p>Seach and execute commands that you and your teammates have saved quickly and painlessly. Hist lets your junior engineers harness the power of your senior engineers' knowledge without unnecessary interference</p>
            <a href="#" role="button" className="button">View details</a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Home);
