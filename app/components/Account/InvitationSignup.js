import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { signupWithInvitation } from '../../actions/auth';
import { planFromQueryString } from '../../actions/nux';
import { facebookLogin, twitterLogin, googleLogin, vkLogin, githubLogin } from '../../actions/oauth';
import Messages from '../Messages';

class InvitationSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { account_name: '', name: '', email: '', password: ''};
  }

  componentDidMount() {
    this.serverRequest = $.get(`/api/v1/invitation/${this.props.params.code}`, (result) => {
      this.setState({
        account_id: result.invitation.account.id,
        account_name: result.invitation.account.name,
        email: result.invitation.to_email
      });
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSignup(event) {
    event.preventDefault();
    this.props.dispatch(signupWithInvitation(this.props.params.code, this.state.name, this.state.email, this.state.password));
  }

  render() {
    return (
      <div className="column row">
        <div className="row">
          <div className="medium-8 medium-offset-2 columns">
            <Messages messages={this.props.messages}/>
            <form onSubmit={this.handleSignup.bind(this)}>
              <h4>Create an account</h4>
              <label htmlFor="account_name">Company Name</label>
              <input type="text" name="account_name" id="account_name" placeholder="My Company" value={this.state.account_name} onChange={this.handleChange.bind(this)} disabled />
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.handleChange.bind(this)}/>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.handleChange.bind(this)} autoFocus />
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange.bind(this)}/>
              <p className="help-text">By signing up, you agree to the <Link to="/">Terms of Service</Link>.</p>
              <button type="submit" className="button">Create an account</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('MapStateToProps', state);
  return {
    messages: state.messages,
  };
};

export default connect(mapStateToProps)(InvitationSignup);
