/* eslint-disable max-len */
import { put, all, call, takeEvery } from 'redux-saga/effects';
import * as types from './walletActionTypes';
import * as actions from './walletActions';
// import * as alert from '../alert/alertActions';

import store from '..';
import * as endpoints from '../../services/endpoints';

function* walletAccountHistory() {
  try {
    const { accounts } = store.getState().walletReducer;

    const TxInfo = {
      module: 'account',
      action: 'txlist',
      address: accounts[0],
      params: { sort: 'desc' },
    };
    const res = yield call(endpoints.GetTxlist, TxInfo);

    yield put(actions.walletAccountHistoryDataAction(res.data.result));
    yield put(actions.walletAccountHistoryModalAction(true));
  } catch (e) {
    console.error(e);
    yield put(actions.connectWalletError(e));
  }
}

function* watchWalletAccountHistory() {
  yield takeEvery(types.WALLET_ACCOUNT_HISTORY_REQUEST, walletAccountHistory);
}

export function* walletSaga() {
  yield all([watchWalletAccountHistory()]);
}
