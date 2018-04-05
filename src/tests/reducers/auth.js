import authReducer from '../../reducers/auth';


test('should set user uid as state when user logins', () => {
  const action = {
    type: 'LOGIN',
    uid: 'abc123'
  };
  const state = authReducer({}, action);
  expect(state).toEqual({ action.uid });
});


test('should remove user uid from state when user logs off', () => {
  const action = {
    type: 'LOGOUT'
  };
  const state = authReducer({ uid: 'anything' }, action);
  expect(state).toEqual({});
});