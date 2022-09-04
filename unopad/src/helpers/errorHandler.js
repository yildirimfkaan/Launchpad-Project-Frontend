import store from '../store';
import * as userActionTypes from '../store/account/userActionTypes';
import * as alertActionTypes from '../store/alert/alertActionTypes';

export function errorHandler(error, history, href) {
  if (error?.response?.status === 403) {
    store.dispatch({ type: userActionTypes.LOGOUT_REQUEST });

    if (history && href) {
      history.push(href);
    } else if (!history && href) {
      window.location.href = href;
    }

    store.dispatch({
      type: alertActionTypes.SET_ALERT,
      msg: {
        title: 'Session Expired!',
        text: 'User session expired, Please login again.',
        variant: 'warning',
        outTimeMS: 6000,
      },
    });
  } else {
    store.dispatch({
      type: alertActionTypes.SET_ALERT,
      msg: {
        title: 'Error!',
        text: error.msg,
        variant: 'danger',
        outTimeMS: 6000,
      },
    });
  }
}
