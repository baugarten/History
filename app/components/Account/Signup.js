import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { signup } from '../../actions/auth';
import { facebookLogin, twitterLogin, googleLogin, vkLogin, githubLogin } from '../../actions/oauth';
import Messages from '../Messages';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { account_name: '', name: '', email: '', password: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSignup(event) {
    event.preventDefault();
    this.props.dispatch(signup(this.state.account_name, this.state.name, this.state.email, this.state.password));
  }

  handleFacebook() {
    this.props.dispatch(facebookLogin())
  }

  handleTwitter() {
    this.props.dispatch(twitterLogin())
  }

  handleGoogle() {
    this.props.dispatch(googleLogin())
  }

  handleVk() {
    this.props.dispatch(vkLogin())
  }

  handleGithub() {
    this.props.dispatch(githubLogin())
  }

  render() {
    let selectedPlan = this.props.plan;
    return (
      <div className="column row">
        <div className="row">
          <div className="medium-8 medium-offset-2 columns">
            <Messages messages={this.props.messages}/>
            <form onSubmit={this.handleSignup.bind(this)}>
              <h4>Create an account</h4>
              <div className="row">
                <div className="medium-4 columns">
                  <i className="fa fa-check"></i>  
                {this.props && this.props.plan && this.props.plan.name} Plan
                </div>
              </div>
              <label htmlFor="account_name">Company Name</label>
              <input type="text" name="account_name" id="account_name" placeholder="My Company" value={this.state.account_name} onChange={this.handleChange.bind(this)} autoFocus/>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.handleChange.bind(this)} />
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.handleChange.bind(this)}/>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange.bind(this)}/>
              <p className="help-text">By signing up, you agree to the <Link to="/">Terms of Service</Link>.</p>
              <button type="submit" className="button">Create an account</button>
            </form>
            <div className="hr-title"><span>or</span></div>
            <div className="button-group">
              <button onClick={this.handleGoogle.bind(this)} className="button google">Sign in with Google</button>
              <button onClick={this.handleGithub.bind(this)} className="button github">Sign in with Github</button>
            </div>
            <p>Already have an account? <Link to="/login">Log in</Link></p>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  plan: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
  }),
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    plan: state.nux && state.nux.planOption
  };
};

export default connect(mapStateToProps)(Signup);
