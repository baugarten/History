import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import Home from './Home'

class Hero extends React.Component {
  render() {
    return (
      <div className="main-content-wrapper">
        <div className="header-hero">
          <div className="header-image">
            <div className="hero-unit">
              <div className="row">
                <div className="column small-6 end">
                  <h1 className="header-text">Bash History that works for your Team</h1>
                  <br />
                  <h3 className="header-text">Help developers and teams learn and communicate together effortlessly</h3>
                  <a className="large success button" href="#">Learn More</a>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Home />
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
