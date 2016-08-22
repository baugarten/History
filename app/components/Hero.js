import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import Home from './Home2'
import EmailSubscribe from './EmailSubscribe'

class Hero extends React.Component {
  render() {
    return (
      <div className="main-content-wrapper">
        <div className="header-hero">
          <div className="header-image">
            <div className="hero-unit">
              <div className="row">
                <div className="column large-8 end">
                  <h1 className="header-text">Bash History that works for your Team</h1>
                  <br />
                  <h3 className="header-text subheader-text">Increase your team's efficiency by saving and sharing critical commands and workflows</h3>

                  <EmailSubscribe />
                  <Messages messages={this.props.messages}/>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Home />
        <EmailSubscribe />
        <Messages messages={this.props.messages}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Hero);
