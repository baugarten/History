import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import Terminal from './Terminal';

class UserGuide extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', message: '' };
  }

  componentDidMount() {
    console.log('Component did mount');
    //var elem = new Foundation.Magellan($(''), options);

  }

  render() {
    return (
      <div className="row columns">

        <h2>Getting Started</h2>
        <p className="last-updated">
          <i className="fa fa-clock-o"></i>&nbsp;
          Last updated 26 August 2016
        </p>
        <div className="row" id="documentation">
          <div className="large-3 columns sticky-container" data-sticky-container data-magellan>
            <nav className="columns sticky docs-nav" data-sticky data-anchor="documentation" data-sticky-on="large">
              <ul className="vertical menu" data-magellan>
                <li className="docs-nav-title">On this page:</li>
                <li><a href="#installation">Installation</a></li>
                <li><a href="#authenticating">Authenticating</a></li>
                <li><a href="#saving-commands">Saving Commands</a></li>
                <li><a href="#retrieving-commands">Retrieving Commands</a></li>
                <li><a href="#managing-teams">Managing Teams</a></li>
                <li><a href="#get-help">Getting Help</a></li>
              </ul>
            </nav>
          </div>
          <div className="large-9 columns docs">
            <div className="row columns">
              <h3 id="installation" data-magellan-target="installation">Installation</h3>
              <p>Hist is distributed through <code>npm</code>, node package manager. To ensure that <code>npm</code> is installed, run</p>
              <Terminal>
                <li className="command">npm -v</li>
                <li>3.10.7</li>
              </Terminal>
              <p>If <code>npm</code> is not installed, you can install it using Homebrew</p>
              <Terminal>
                <li className="command">brew install node</li>
              </Terminal>
              <p>In order to install <code>hist</code> once the installation has finished, simply install the <code>hist-cli</code> package globally on your system.</p>
              <Terminal>
                <li className="command">npm install -g hist-cli</li>
              </Terminal>
              <p>This command installs <code>hist</code> to your machine, making <code>hist</code> available globally. To verify the installation, you can check the version of <code>hist</code> running</p>
              <Terminal>
                <li className="command">hist -V</li>
                <li>0.0.1</li>
              </Terminal>
            </div>
            <div className="row columns">
              <h3 id="authenticating" data-magellan-target="authenticating">Authenticating</h3>
              <p>You will be asked to enter your Hist credentials the first time you run a command; after the first time, an API token will be saved to <code>~/.histrc</code> for future use.</p>
              <Terminal>
                <li className="command">hist login</li>
                <li>email: gethist@gmail.com</li>
                <li>password: **********</li>
                <li>Authentication successful.</li>
              </Terminal>
              <p>To make sure that you are up to date, you can update <code>hist</code> by using <code>npm</code></p>
              <Terminal>
                <li className="command">npm update -g hist-cli</li>
              </Terminal>
            </div>
            <div className="row columns">
              <h3 id="saving-commands" data-magellan-target="saving-commands">Saving Commands</h3>
              <p>Saving commands is easy and non-intrusive. Commands have two components: the actual command run and any description you might want to add for it (a human readable description). Both of these elements are indexed and searchable.</p>
              <p><code>hist</code> will also retrieve relevant information about the command to provide your team members additional context.</p>
              <Terminal>
                <li className="command">NODE_ENV=development nodemon server.js --ignore app</li>
                <li className="command">hist save !!</li>
              </Terminal>
              <p>In this example, we use the <code>!!</code> shortcut to save our previously entered command</p>
              <Terminal>
                <li className="command">hist list -a</li>
                <li>11834 vim public/css/main.scss</li>
                <li>11835 vim app/components/Home.js</li>
                <li>11836 vim public/css/main.scss</li>
                <li>11837 NODE_ENV=development nodemon server.js --ignore app</li>
                <li>11838 hist save NODE_ENV=development nodemon server.js --ignore app</li>
                <li className="command">hist save -m "save a command using hist" !11838</li>
              </Terminal>
              <p>Here we leverage the local bash history to save a command using its index in the history file. This is particularly useful when combined with <code>grep</code></p>
              <Terminal>
                <li className="command">hist list -a | grep -i curl</li>
                <li>680  curl -H "Authorization: token 25tkmlhhj5rrco15wys9p3g71fp8m0l8x0raqid4" https://api.github.com/repos/baugarten/node-restful/collaborators</li>
                <li>7217  curl -v -X POST -d '{'{'}"team_name": "Foobar"{'}'}'http://ec2-54-69-153-15.us-west-2.compute.amazonaws.com/api/v1/team</li>
                <li>7539  curl -H "Content-Type:application/json" -X POST localhost:8080/users --data '{'{'}"username": "beignet", "password": "west" {'}'}'</li>
                <li className="command">hist save -m "login as beignet using curl" !7539</li>
              </Terminal>
            </div>
            <div className="row columns">
              <h3 id="retrieving-commands" data-magellan-target="retrieving-commands">Retrieving Commands</h3>
              <p><code>hist</code> lets you easily retrieve commands that have been saved by you and others on your team.</p>
              <Terminal>
                <li className="command">hist list --mine</li>
                <li>* <span className="command-hash">701132a</span> - hist save NODE_ENV=development nodemon server.js --ignore app <span className="command-author">{'<'}baugarten{'>'}</span></li>
                <li>* <span className="command-hash">983be13</span> - curl -H "Content-Type:application/json" -X POST localhost:8080/users --data '{'{'}"username": "beignet", "password": "west" {'}'}' <span className="command-author">{'<'}baugarten{'>'}</span></li>
              </Terminal>
              <p>Or, you can retrieve the commands saved by your team by omitting the <code>--mine</code> flag.</p>
              <Terminal>
                <li className="command">hist list</li>
                <li>* <span className="command-hash">a8c6d49</span> - Sign in as billy the kid <span className="command-author">{'<'}kjohnson{'>'}</span></li>
                <li>* <span className="command-hash">0136ffc</span> - retrieve saved commands via cURL <span className="command-author">{'<'}mjones{'>'}</span></li>
                <li>* <span className="command-hash">aa2d5be</span> - save a new command via cURL <span className="command-author">{'<'}tsmith{'>'}</span></li>
              </Terminal>
              <p>In order to get more information about any one of these commands and learn how to use it, you can get more detailed information using <code>hist show</code></p>
              <Terminal>
                <li className="command">hist show a8c6d49</li>
                <li><span className="command-hash">command: a8c6d491fc7529bc42d0301990bf1e361e32de49</span></li>
                <li>Team: hist-backend</li>
                <li>Author: <span className="command-author">@kjohnson {'<'}kjohnson@gmail.com{'>'}</span></li>
                <li>Date:   Fri Aug 5 11:20:50 2016 -0600</li>
                <li>Command:</li>
                <li className="tabbed">curl -X POST -d '{'{'}"username": "billy", "password": "thekid"{'}'}' localhost:8080/users/sign_in</li>
                <li>&nbsp;</li>
                <li>Working Directory:</li>
                <li className="tabbed">/Users/kjohnson/workspace/hist</li>
                <li>&nbsp;</li>
                <li>Relevant Processes:{'\n'}</li>
                <li className="tabbed">NODE_ENV=development node server.js</li>
              </Terminal>
            </div>
            <div className="row columns">
              <h3 id="managing-teams" data-magellan-target="managing-teams">Managing Teams</h3>
              <p>In order for <code>hist</code> to scale with your employees, you can separate saved commands by logical teams. Each command is associated with a particular team. Engineers can switch between teams and save and list commands for all of the teams that belong to their account.</p>
              <Terminal>
                <li className="command">hist team</li>
                <li>&nbsp;&nbsp;web</li>
                <li>* api</li>
                <li>&nbsp;&nbsp;ios</li>
                <li>&nbsp;&nbsp;android</li>
              </Terminal>
              <p>To change teams, just enter the name of the team you want to change to.</p>
              <Terminal>
                <li className="command">hist team android</li>
                <li>Switching to team android</li>
                <li className="command">hist team</li>
                <li>&nbsp;&nbsp;web</li>
                <li>&nbsp;&nbsp;api</li>
                <li>&nbsp;&nbsp;ios</li>
                <li>* android</li>
              </Terminal>
            </div>
            <div className="row columns">
              <h3 id="getting-help" data-magellan-target="getting-help">Getting Help</h3>
              <p>You're now a certified <code>hist</code> pro. If you have questions or need technical support, please contact us <a href="mailto:help@gethist.com">via email</a> or reach out <a href="https://twitter.com/home?status=.%40gethist">on twitter</a>.</p>
            </div>
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

export default connect(mapStateToProps)(UserGuide);
