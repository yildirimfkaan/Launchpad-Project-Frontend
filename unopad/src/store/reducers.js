import { combineReducers } from "redux";

import PostReducer from "./posts/reducer";
import { alertReducer } from '../store/account/reducers/alertReducer'
import { userReducer } from '../store/account/reducers/userReducer'
const rootReducer = combineReducers({
  PostReducer,
  alert: alertReducer,
  user: userReducer
});

export default rootReducer;
