import React from 'react';
import { connect } from 'react-redux'
import { submitContactForm } from '../actions/contact';

class EmailSubscribe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(submitContactForm(this.state.name, this.state.email, this.state.message));
  }

  render() {
    return (
      <form className="row collapse" onSubmit={this.handleSubmit.bind(this)}>
        <div className="medium-8 columns">
          <input type="email" name="email" id="email" value={this.state.email} placeholder="signup@example.com" onChange={this.handleChange.bind(this)}/>
        </div>
        <div className="medium-4 columns">
          <button type="submit" className="postfix success button subscribe-button">Subscribe now</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(EmailSubscribe);
