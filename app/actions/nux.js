import moment from 'moment';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

export let PlansEnum = {
  PERSONAL: {
    name: 'personal',
    displayName: 'Personal Plan',
    price: 'Free',
    users: '1 User',
    devices: '2 Devices',
    teams: '0 Teams'
  },
  GROWTH: {
    name: 'growth',
    displayName: 'Growth Plan',
    price: '$20/month',
    users: '10 User',
    devices: 'Unlimited Devices',
    teams: '1 Team'
  },
  POWER: {
    name: 'power',
    displayName: 'Power Plan',
    price: '$2/user/month',
    users: 'Unlimited Users',
    devices: 'Unlimited Devices',
    teams: 'Unlimited Teams'
  }
};

export function planFromQueryString(planIndex) {
  switch (parseInt(planIndex, 10)) {
    case 0: 
      return PlansEnum.PERSONAL
    case 1: 
      return PlansEnum.GROWTH
    case 2: 
      return PlansEnum.POWER
    default:
      return undefined
  }
}

export function selectPricingPlan(plan) {
  return (dispatch) => {
    dispatch({
      type: 'SELECT_PLAN',
      plan: plan
    });
    return browserHistory.push(`/signup?plan=${plan.name}`);
  };
}

export function sendInvitation(token, emailAddress, account, team) {
  return (dispatch) => {
    dispatch({
      type: 'SEND_INVITATION',
      email: emailAddress,
      account: account,
      team: team
    }); 
    return fetch('/api/v1/invitation', {
      method: 'post',
      credentials: 'include',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        email: emailAddress,
        account_id: account.id,
        team_id: team && team.id
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'SEND_INVITATION_SUCCESS',
            messages: [json]
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'SEND_INVITATION_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}

