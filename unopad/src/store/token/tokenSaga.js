import { takeEvery, call, put, all } from 'redux-saga/effects';

import * as types from './tokenActionTypes';
import * as actions from './tokenActions';
import * as alert from '../alert/alertActions';
import * as endpoints from '../../services/endpoints';

//Worker Sagas

function* getTokenSaga(action) {
  try {
    const { data } = yield call(endpoints.getTokens);
    yield put(actions.getTokensData(data));
  } catch (e) {
    yield put(
      alert.setAlertAction({
        text: 'Token Not Added.',
        color: 'danger',
      }),
    );
    yield put(actions.getTokensError(e));
  }
}

function* getTokenByIDSaga(action) {
  try {
    const { id } = action.payload;
    const { data } = yield call(endpoints.getTokenByID, id);
    yield put(actions.getTokenByIDData(data));
  } catch (e) {
    yield put(
      alert.setAlertAction({
        text: 'Token Not Added.',
        color: 'danger',
      }),
    );
    yield put(actions.getTokenByIDError(e));
  }
}

function* addToken(action) {
  try {
    const { data } = yield call(endpoints.addToken, action.data);

    yield put(actions.tokenAddedAction(data));
    yield put(
      alert.setAlertAction({
        text: 'Token Added!',
        color: 'success',
      }),
    );
  } catch (e) {
    yield put(
      alert.setAlertAction({
        text: 'Token Not Added.',
        color: 'danger',
      }),
    );
  }
}

//Watcher Sagas
function* watchGetTokens() {
  yield takeEvery(types.GET_TOKENS_REQUEST, getTokenSaga);
}

function* watchGetTokenByID() {
  yield takeEvery(types.GET_TOKEN_REQUEST, getTokenByIDSaga);
}

function* watchAddToken() {
  yield takeEvery(types.ADD_TOKEN, addToken);
}

export function* tokenSaga() {
  yield all([watchAddToken(), watchGetTokenByID(), watchGetTokens()]);
}
