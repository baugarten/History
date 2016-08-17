import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import CommandItem from './CommandItem';

class Home extends React.Component {
  render() {
    return (
      <div className="main-content expanded row">
        <Messages messages={this.props.messages}/>
        <CommandItem action="List" icon="fa-list-ul">
          $> hist{'\n'}
          Current team hist-backend{'\n'}
          {'\n'}
          abcd @baugarten retrieve saved clips via cURL{'\n'}
          1234 @tsmith save a new clip via cURL{'\n'}
          f1ne @mpowell echo ascii art of cowboy with stern warning
        </CommandItem>
        <div className="row-grey">
          <CommandItem rightAction='true' action="Save" icon="fa-save">
            $> curl -X POST --data '{'{'}"username": "billy", "password": "thekid"{'}'}' localhost:8080/users/sign_in{'\n'}
            $> hist save !!{'\n'}
            Hist saved f4he6i to team hist-backend
          </CommandItem>
        </div>
        <CommandItem action="Share" icon="fa-share">
          $> hist share f4he6i{'\n'}
          Shared f4he6i with hist-backend
        </CommandItem>
        <div className="row-grey">
        <CommandItem rightAction='true' action="Learn" icon="fa-book">
          $> hist show f4he6i{'\n'}
          @baugarten 8/11/2016{'\n'}
          curl -X POST -d '{'{'}"username": "b", "password": ";)"{'}'}' localhost:8080/users/sign_in{'\n'}
          
          working directory: /Users/baugarten/workspace/hist{'\n'}
          {'\n'}
          Active Processes:{'\n'}
          NODE_ENV=development node server.js
        </CommandItem>
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
