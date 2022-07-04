import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./sagas";
import { checkUser } from '../services/UserService'
import { userLoggedIn } from '../store/account/actions/userActions'

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
const user = checkUser()
if (user) {
    store.dispatch(userLoggedIn(user))
}

sagaMiddleware.run(rootSaga);

export default store;
