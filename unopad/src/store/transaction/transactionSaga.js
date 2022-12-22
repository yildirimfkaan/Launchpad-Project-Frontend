import { takeEvery, put, all, call } from 'redux-saga/effects';
import * as types from './transactionActionTypes';
import * as actions from './transactionActions';
import * as endpoints from '../../services/endpoints';
import * as projectActions from '../project/projectActions'

function* transactionSaga({ creds }) {
  try {
    
    const { data } = yield call(endpoints.transaction, creds);
    console.log(data)
    yield put(actions.transactionData(data));
    yield put (projectActions.getProjectByIDData(data))
  } catch (e) {
    yield put(actions.transactionError(e));
  }
}
function* watchTransaction() {
  yield takeEvery(types.TRANSACTION_REQUEST, transactionSaga);
}


export function* transactionsSaga() {
  yield all([
    watchTransaction(),
   
  ]);
}
