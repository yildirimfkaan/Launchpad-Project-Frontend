import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';
import { loginData } from '../store/account/userActions';
import { checkUser } from '../helpers/userHelper';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
const user = checkUser();

if (user) {
  store.dispatch(loginData(user));
}

sagaMiddleware.run(rootSaga);

export default store;
