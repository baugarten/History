import React from 'react';
import { connect } from 'react-redux'
import { sendInvitation } from '../actions/nux';
import Messages from './Messages';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = { account: { }, teams: [], users: [], isAdmin: false, email: '', team_name: '' };
  }

  componentDidMount() {
    fetch(`/api/v1/account/${this.props.params.id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          this.setState({
            account: json.account,
            teams: json.account.teams,
            users: json.account.users,
            isAdmin: json.account._pivot_is_admin
          });
        });
      } else {
        alert('Failed to load account information');
      }
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleInviteUser(event) {
    event.preventDefault();
    this.props.dispatch(sendInvitation(this.state.email, this.state.account));
  }


  render() {
    return (
      <div className="column row">
        <Messages messages={this.props.messages}/>
        <h3>
          Users ({this.state.users.length}):
        </h3>
        <Table data={this.state.users} component={UserComponent} />
        <form className="row collapse" onSubmit={this.handleInviteUser.bind(this)}>
          <div className="medium-4 columns">
            <input type="email" name="email" id="email" value={this.state.email} placeholder="invite@example.com" onChange={this.handleChange.bind(this)}/>
          </div>
          <div className="medium-2 columns end">
            <button type="submit" className="postfix success button">
              <i className="fa fa-plus"></i>&nbsp;
              Invite User
            </button>
          </div>
        </form>

        <h3>Teams ({this.state.teams.length}):</h3>
        <Table data={this.state.teams} component={TeamComponent} />
        <form className="row collapse">
          <div className="medium-4 columns">
            <input type="text" name="team_name" id="team_name" value={this.state.team_name} placeholder="Backend Team" onChange={this.handleChange.bind(this)}/>
          </div>
          <div className="medium-2 columns end">
            <button type="submit" className="postfix success button">
              <i className="fa fa-plus"></i>&nbsp;
              Create Team
            </button>
          </div>
        </form>
      </div>
    );
  }
}

class Table extends React.Component {
  render() {
    return (<table>
      <thead>
        <this.props.component key="header-row" />
      </thead>
      <tbody>
        {this.props.data.map((model) => {
          return <this.props.component key={model.id} model={model} />
        })}
      </tbody>
    </table>);
  }
}

class TableRowComponent extends React.Component {
  rows() {
    return [];
  }

  attribute(attrName, f) {
    return (model) => { 
      return (f && f(model[attrName])) || model[attrName];
    }
  }

  runGenerator(gen, model) {
    if (typeof gen === "function") {
      return gen(model);
    } else {
      return gen;
    }
  }

  render() {
    return (
      <tr>
        {this.rows().map(([header, generator], idx) => {
          return this.props.model ? 
            <td key={`${this.props.model.id}-${header}`}>{this.runGenerator(generator, this.props.model)}</td> : 
            <th key={header}>{header}</th>
        })}
      </tr>
    );
  }
}

class UserComponent extends TableRowComponent {
  rows() {
    return [
      ['', this.attribute('gravatar', (url) => { return <img className="thumbnail" src={url} /> })], 
      ['Name', this.attribute('name')], 
      ['Email', this.attribute('email')],
      ['Created',this.attribute('created_at')],
      ['Last Active', this.attribute('updated_at')],
      ['Status', 'Active']
    ]
  }
}

class TeamComponent extends TableRowComponent {
  rows() {
    return [
      ['Name', this.attribute('display_name')], 
      ['Short Name', this.attribute('short_name')],
      ['Created',this.attribute('created_at')],
      ['Last Active', this.attribute('updated_at')],
      ['Status', 'Active']
    ]
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Account);
