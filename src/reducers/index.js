import { combineReducers } from 'redux';
import runtime from './runtime';
import intl from './intl';
import filter from './filter';

export default combineReducers({
  runtime,
  intl,
  filter,
});
