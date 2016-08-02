const initialState = {
  planOption: null,
};

export default function nux(state = initialState, action) {
  if (!state.hydrated) {
    state = Object.assign({}, initialState, state, { hydrated: true });
  }
  switch (action.type) {
    case 'SELECT_PLAN':
      return Object.assign({}, state, {
        planOption: action.plan,
      });
    default:
      return state;
  }
}
