// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from 'redux';
// slices

import userCPanel from './slices/userCPanel';
import businessReport from './slices/businessReport';

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
  userCPanel,
  businessReport
});

export default rootReducer;
