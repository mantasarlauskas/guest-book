import { combineReducers } from 'redux';
import reviews from './review';
import pagination from './pagination';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  reviews,
  pagination,
  form: formReducer
});