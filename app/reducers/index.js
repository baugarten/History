import { combineReducers } from 'redux';
import messages from './messages';
import auth from './auth';
import nux from './nux';

export default combineReducers({
  messages,
  auth,
  nux
});
