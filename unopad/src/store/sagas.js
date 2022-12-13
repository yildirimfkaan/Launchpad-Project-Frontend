import { all, fork } from 'redux-saga/effects';

import PostSaga from './posts/postSaga';
import { userSaga } from './account/userSaga';
import { projectSaga } from './project/projectSaga';
import { tokenSaga } from './token/tokenSaga';
import { walletSaga } from './wallet/walletSaga';
import { abiSaga } from './abi/abiSaga';
import { transactionsSaga } from './transaction/transactionSaga';

export default function* rootSaga() {
  yield all([
    fork(PostSaga),
    userSaga(),
    projectSaga(),
    walletSaga(),
    tokenSaga(),
    abiSaga(),
    transactionsSaga(),
  ]);
}
