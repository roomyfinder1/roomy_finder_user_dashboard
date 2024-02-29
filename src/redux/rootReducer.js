// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from 'redux';
// slices

import userCPanel from './slices/userCPanel';

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
  userCPanel,
});

export default rootReducer;
