import moment from 'moment';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

export let PlansEnum = {
  PERSONAL: {
    name: 'personal',
    price: 'Free',
    users: '1 User',
    devices: '2 Devices',
    teams: '0 Teams'
  },
  GROWTH: {
    name: 'growth',
    price: '$20/month',
    users: '10 User',
    devices: 'Unlimited Devices',
    teams: '1 Team'
  },
  POWER: {
    name: 'power',
    price: '$2/user/month',
    users: 'Unlimited Users',
    devices: 'Unlimited Devices',
    teams: 'Unlimited Teams'
  }
};

export function selectPricingPlan(plan) {
  return (dispatch) => {
    dispatch({
      type: 'SELECT_PLAN',
      plan: plan
    });
    return browserHistory.push('/signup');
  };
}

