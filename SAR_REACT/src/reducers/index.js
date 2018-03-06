import {combineReducers} from 'redux';

import login from './sarReducer/login-reducer';
import sar from './sarReducer/sar-reducer';
import projectReducer from './dpiaReducer/project-reducer';
import questionReducer from './dpiaReducer/question-reducer';

const rootReducer = combineReducers({
  login,
  sar,
  projectReducer,
  questionReducer
});

export default rootReducer;