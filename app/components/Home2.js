import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import CommandItem from './CommandItem';

class Home extends React.Component {
  render() {
    return (
      <div className="main-content expanded row">
        <Messages messages={this.props.messages}/>
        <CommandItem action="Save" icon="fa-save">
          <li className="command">curl -X POST -d '{'{'}"username": "billy", "password": "thekid"{'}'}' localhost:8080/users/sign_in</li>
          <li className="command">hist save -m "Sign in as billy the kid" !!</li>
          <li><span className="command-confirmation">[saved]</span> <span className="command-hash">a8c6d49</span> - Sign in as billy the kid <span className="command-author">{'<'}baugarten{'>'}</span></li>
        </CommandItem>
        <div className="row-grey">
          <CommandItem rightAction="true" action="List" icon="fa-list-ul">
            <li className="command">hist</li>
            <li>* <span className="command-hash">a8c6d49</span> - Sign in as billy the kid <span className="command-author">{'<'}baugarten{'>'}</span></li>
            <li>* <span className="command-hash">0136ffc</span> - retrieve saved commands via cURL <span className="command-author">{'<'}mjpowell{'>'}</span></li>
            <li>* <span className="command-hash">aa2d5be</span> - save a new command via cURL <span className="command-author">{'<'}tsmith{'>'}</span></li>
          </CommandItem>
        </div>
        {/*
        <CommandItem action="Share" icon="fa-share">
          <li className="command">hist share a8c6d49</li>
          <li>Shared <span className="command-hash">a8c6d49</span> with team <span className="command-author">hist-backend</span></li>
        </CommandItem>
        */}
        <CommandItem action="Learn" icon="fa-book">
          <li className="command">hist show a8c6d49</li>
          <li><span className="command-hash">command: a8c6d491fc7529bc42d0301990bf1e361e32de49</span></li>
          <li>Team: hist-backend</li>
          <li>Author: <span className="command-author">@baugarten {'<'}baugarten@gmail.com{'>'}</span></li>
          <li>Date:   Fri Aug 5 11:20:50 2016 -0600</li>
          <li>Command:</li>
          <li className="tabbed">curl -X POST -d '{'{'}"username": "billy", "password": "thekid"{'}'}' localhost:8080/users/sign_in</li>
          <li>&nbsp;</li>
          <li>Working Directory:</li>
          <li className="tabbed">/Users/baugarten/workspace/hist</li>
          <li>&nbsp;</li>
          <li>Relevant Processes:{'\n'}</li>
          <li className="tabbed">NODE_ENV=development node server.js</li>
        </CommandItem>
      </div>
    )
    //    <CommandItem action="List" icon="fa-list-ul">
    //      $> hist{'\n'}
    //      Current team hist-backend{'\n'}
    //      {'\n'}
    //      abcd @baugarten retrieve saved clips via cURL{'\n'}
    //      1234 @tsmith save a new clip via cURL{'\n'}
    //      f1ne @mpowell echo ascii art of cowboy with stern warning
    //    </CommandItem>
    //    <div className="row-grey">
    //      <CommandItem rightAction='true' action="Save" icon="fa-save">
    //        $> curl -X POST --data '{'{'}"username": "billy", "password": "thekid"{'}'}' localhost:8080/users/sign_in{'\n'}
    //        $> hist save !!{'\n'}
    //        Hist saved f4he6i to team hist-backend
    //      </CommandItem>
    //    </div>
    //    <CommandItem action="Share" icon="fa-share">
    //      $> hist share f4he6i{'\n'}
    //      Shared f4he6i with hist-backend
    //    </CommandItem>
    //    <div className="row-grey">
    //    <CommandItem rightAction='true' action="Learn" icon="fa-book">
    //      $> hist show f4he6i{'\n'}
    //      @baugarten 8/11/2016{'\n'}
    //      curl -X POST -d '{'{'}"username": "b", "password": ";)"{'}'}' localhost:8080/users/sign_in{'\n'}
    //      
    //      working directory: /Users/baugarten/workspace/hist{'\n'}
    //      {'\n'}
    //      Active Processes:{'\n'}
    //      NODE_ENV=development node server.js
    //    </CommandItem>
    //    </div>
    //  </div>
    //);
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Home);
