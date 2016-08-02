import React from 'react';
import { connect } from 'react-redux'
import { selectPricingPlan, PlansEnum } from '../actions/nux';
import Messages from './Messages';
import PriceOption from './PriceOption';

class Pricing extends React.Component {
  render() {
    return (
      <div>
        <div className="expanded row">
          <div className="row">
            <Messages messages={this.props.messages}/>
            <div className="row">
              {Object.keys(PlansEnum).map((planKey) => {
                let plan = PlansEnum[planKey];
                return <PriceOption key={plan.name} plan={plan} />
              })}
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

export default connect(mapStateToProps)(Pricing);
