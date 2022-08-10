import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';
import { accountVerifiedAction, loginData } from '../store/account/userActions';
import { checkUser } from '../helpers/userHelper';
import {
  checkAllConditionForStake,
  checkUserVerified,
  checkUserWalletAccount,
} from '../helpers/verificationHelper';
import { setWalletAccountData, stakeNowButtonActivationAction } from './wallet/walletActions';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
const user = checkUser();
const emailVerify = checkUserVerified();
const walletVerify = checkUserWalletAccount();
const stakeNowActiveVerify = checkAllConditionForStake();

if (user) {
  store.dispatch(loginData(user));
}
if (emailVerify) {
  store.dispatch(accountVerifiedAction(emailVerify));
}
if (walletVerify) {
  store.dispatch(setWalletAccountData(walletVerify));
}
if (stakeNowActiveVerify) {
  store.dispatch(stakeNowButtonActivationAction(stakeNowActiveVerify));
}

sagaMiddleware.run(rootSaga);

export default store;
