import { takeEvery, put, all, call } from 'redux-saga/effects';
import * as types from './transactionActionTypes';
import * as actions from './transactionActions';
import * as endpoints from '../../services/endpoints';

function* transactionSaga({ creds }) {
  try {
    console.log("ssssss",creds)
    // var formData = new FormData();
    // formData.append('username', creds.data['project_id']);
    // formData.append('password', creds.data['tokenCount']);
    // formData.append('password', creds.data['signerAddress']);
    // formData.append('password', creds.data['token_address']);
    // formData.append('password', creds.data['project_cdate']);
    // formData.append('password', creds.data['project_is_active']);

    const { data } = yield call(endpoints.transaction, creds);

    console.log(data)
    yield put(actions.transactionData(data));
   
    // const user = {
    //   user: data,
    //   token: data['access_token'],
    // };
   
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
