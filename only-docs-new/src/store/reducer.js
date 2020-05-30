import { combineReducers } from 'redux';
import homeReducer from '../screens/home/modules/reducer';
import adminReducer from '../screens/admin/modules/reducer';

export default combineReducers({
  homeReducer,
  adminReducer,
});