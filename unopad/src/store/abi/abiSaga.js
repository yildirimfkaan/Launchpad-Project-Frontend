/* eslint-disable max-len */
import { put, all, call, takeEvery } from 'redux-saga/effects';
import * as types from './abiActionTypes';
import * as actions from './abiActions';
// import * as alert from '../alert/alertActions';

import * as endpoints from '../../services/endpoints';

function* abiHistory() {
  try {
    const res = yield call(endpoints.GetAbiList);
    yield put(actions.abiDataAction(res.data));
  } catch (e) {
    console.error(e);
    yield put(actions.abiErrorAction(e));
  }
}

function* watchAbiHistory() {
  yield takeEvery(types.ABI_REQUEST, abiHistory);
}

export function* abiSaga() {
  yield all([watchAbiHistory()]);
}
