import React from 'react';
import { connect } from 'react-redux'
import { selectPricingPlan, PlansEnum } from '../actions/nux';

class PriceOption extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(selectPricingPlan(this.props.plan));
  }

  render() {
    let plan = this.props.plan;
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="medium-4 columns">
          <ul className="pricing-table">
            <li className="title">{plan.name}</li>
            <li className="price">{plan.price}</li>
            <li className="description">Perfect for an individual interested in how Clips can improve their workflow</li>
            <li className="bullet-item">{plan.users}</li>
            <li className="bullet-item">{plan.devices}</li>
            <li className="bullet-item">{plan.teams}</li>
            <li className="cta-button"><button className="button" href="#">Sign Up</button></li>
          </ul>
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

export default connect(mapStateToProps)(PriceOption);
