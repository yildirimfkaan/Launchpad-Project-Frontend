/* eslint-disable max-len */
import { put, all, call, takeEvery } from 'redux-saga/effects';
import * as types from './walletActionTypes';
import * as actions from './walletActions';
// import * as alert from '../alert/alertActions';

import store from '..';
import axios from 'axios';

function* walletAccountHistory() {
  try {
    const { accounts } = store.getState().walletReducer;
    const req =
      'https://api-testnet.bscscan.com/api?module=account&action=txlist&address=' +
      accounts?.[0] +
      '&startblock=0&endblock=99999999&sort=desc&apikey=VP9XUHIC4QQ5Y74VX4NICRGPSFQXTYSWET';
    const res = yield call(axios.get, req);
    yield put(actions.walletAccountHistoryDataAction(res.data.result));
    yield put(actions.walletAccountHistoryModalAction(true));
    console.log('response', res);
  } catch (e) {
    // yield put(
    //   alert.setAlertAction({
    //     text: e?.response?.data?.detail,
    //     color: 'danger',
    //   }),
    // );
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
