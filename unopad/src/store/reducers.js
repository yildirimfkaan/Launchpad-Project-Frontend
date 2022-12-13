import { combineReducers } from 'redux';

import PostReducer from './posts/postReducer';
import { alertReducer } from './alert/alertReducer';
import { userReducer } from './account/userReducer';
import { projectReducer } from './project/projectReducer';
import { walletReducer } from './wallet/walletReducer';
import { loadingReducer } from './loading/loadingReducer';
import { tokenReducer } from './token/tokenReducer';
import { abiReducer } from './abi/abiReducer';
import { transactionReducer } from './transaction/transactionReducer';

const rootReducer = combineReducers({
  PostReducer,
  alertReducer,
  userReducer,
  projectReducer,
  walletReducer,
  loadingReducer,
  tokenReducer,
  abiReducer,
  transactionReducer,
  
});

export default rootReducer;
