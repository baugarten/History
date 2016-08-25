import moment from 'moment';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

export function createTeam(token, accountId, teamName) {
  return (dispatch) => {
    dispatch({
      type: 'CREATE_TEAM',
      accountId: accountId,
      teamName: teamName
    }); 
    return fetch('/api/v1/team', {
      method: 'post',
      credentials: 'include',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        account_id: accountId,
        team_name: teamName
      })
    }).then((response) => {
      console.log('Created team', response.ok);
      if (response.ok) {
        return response.json().then((json) => {
          console.log('Dispatch CREATE_TEAM_SUCCESS', json);
          dispatch({
            type: 'CREATE_TEAM_SUCCESS',
            team: json.team,
            messages: [json]
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'CREATE_TEAM_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}

