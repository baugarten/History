
export function fetchAccount(token, accountId) {
  return (dispatch) => {
    return fetch(`/api/v1/account/${accountId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          console.log('Account loaded!', json);
          dispatch({
            type: 'ACCOUNT_LOADED',
            account: json.account
          });
        });
      } else {
        alert('Failed to load account information');
      }
    });
  };
}
