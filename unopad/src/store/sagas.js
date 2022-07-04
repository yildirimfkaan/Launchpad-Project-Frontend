import { all, fork } from "redux-saga/effects";

import PostSaga from "./posts/saga";
import { userSaga } from "./account/sagas/userSaga";
import { projectSaga } from "./account/sagas/projectSaga";
export default function* rootSaga() {
  yield all([
    fork(PostSaga)
    ,userSaga(),
    projectSaga()
  ]);
}
