export default function accountReduce(state = {}, action) {
  switch (action.type) {
    case 'CREATE_TEAM_SUCCESS':
      if (state.id === action.team.account_id) {
        state.teams.push(action.team);
      }
      return state;
    case 'ACCOUNT_LOADED':
      return action.account;
    default:
      return state;
  }
}

