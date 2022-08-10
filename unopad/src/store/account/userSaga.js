import { takeEvery, put, all, call } from 'redux-saga/effects';
import createBrowserHistory from '../../helpers/History';
import * as types from './userActionTypes';
import * as actions from './userActions';
import * as alert from '../alert/alertActions';
import * as endpoints from '../../services/endpoints';

function* loginSaga({ creds }) {
  try {
    var formData = new FormData();
    formData.append('username', creds['username']);
    formData.append('password', creds['password']);

    const { data } = yield call(endpoints.login, formData);

    yield put(actions.loginData(data));
    yield put(actions.verifyEmailRequestAction())
    yield put(
      alert.setAlertAction({
        text: 'User Logged In! Redirecting to Home Page',
        color: 'success',
      }),
    );
    const user = {
      username: data['username'],
      token: data['access_token'],
    };
    localStorage.setItem('user', JSON.stringify(user));
    setTimeout(() => {
      window.location.href = '/home';
    }, 1000);
  } catch (e) {
    yield put(
      alert.setAlertAction({
        text: e?.response?.data?.detail,
        color: 'danger',
      }),
    );
    yield put(actions.loginError(e));
  }
}
function* forgotPasswordSaga({ creds }) {
  try {
    var formData = new FormData();
    formData.append('email', creds['email']);

    const { data } = yield call(endpoints.forgotPassword, formData);

    yield put(actions.forgotPasswordData(data));

    yield put(
      alert.setAlertAction({
        text: 'Valid Mail Adress! Check your mail for password reset adress...',
        color: 'success',
      }),
    );
  } catch (e) {
    yield put(
      alert.setAlertAction({
        text: e.msg,
        color: 'danger',
      }),
    );
    yield put(actions.forgotPasswordError(e));
  }
}
function* resetPasswordSaga({ creds }) {
  try {
    var formData3 = new FormData();

    formData3.append('password', creds['password']);
    formData3.append('confirmPassword', creds['confirmPassword']);
    formData3.append('resetToken', creds['resetToken']);
    const body = { token: creds['resetToken'], new_password: creds['password'] };

    const { data } = yield call(endpoints.resetPassword, body);
    yield put(actions.resetPasswordData(data));

    yield put(
      alert.setAlertAction({
        text: 'Your password has been reset successfully! Redirecting to Login Page',
        color: 'success',
      }),
    );
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  } catch (e) {
    yield put(
      alert.setAlertAction({
        text: e.msg,
        color: 'danger',
      }),
    );
    yield put(actions.resetPasswordError(e));
  }
}
function* activationSaga({ creds }) {
  try {
    var formData3 = new FormData();

    formData3.append('activationCode', creds['activationCode']);
    formData3.append('activationToken', creds['activationToken']);
    const body = { token: creds['activationToken'], activation_code: creds['activationCode'] };

    const { data } = yield call(endpoints.activation, body);
    yield put(actions.activationData(data));
    console.log("saga",data)
    yield put(
      alert.setAlertAction({
        text: 'Your account has been activated successfully! Redirecting to Home Page',
        color: 'success',
      }),
    );
    yield put(actions.accountVerifiedAction(true))
    setTimeout(() => {
      window.location.href = '/home';
    }, 3000);
  } catch (e) {
    yield put(
      alert.setAlertAction({
        text: e.msg,
        color: 'danger',
      }),
    );
    yield put(actions.activationError(e));
  }
}

function* logoutSaga() {
  localStorage.removeItem('user');
  localStorage.removeItem('EMAIL_VERIFICATION_DATA')
  yield put(actions.logoutData());
  createBrowserHistory.push('/');
}

function* signUpSaga({ creds }) {
  try {
    var formData = new FormData();
    formData.append('username', creds['username']);
    formData.append('password', creds['password']);
    formData.append('email', creds['email']);

    const { data } = yield call(endpoints.signUp, formData);
    yield put(actions.signUpData(data));

    yield put(
      alert.setAlertAction({
        text: 'User Signed In!',
        color: 'success',
      }),
    );
    window.location.href = '/login';

  } catch (e) {
    yield put(
      alert.setAlertAction({
        text: e.msg,
        color: 'danger',
      }),
    );
    yield put(actions.signUpError(e));
  }
}

function* verifyEmailSaga({ creds }) {
  try {
    // var formData3 = new FormData();

    // formData3.append('activationCode', creds['activationCode']);
    // formData3.append('activationToken', creds['activationToken']);
    // const body = { token: creds['activationToken'], activation_code: creds['activationCode'] };

    const { data } = yield call(endpoints.verifyEmail);
    
    console.log("verify",data)
    console.log("kontrol etmem gereken data",data['is_active'])
    
    localStorage.setItem('EMAIL_VERIFICATION_DATA', JSON.stringify(data['is_active']));
    if(data['is_active']){
      console.log("active")
      yield put(actions.verifyEmailData(data),);
      yield put(actions.accountVerifiedAction(data['is_active']))
      yield put(
        alert.setAlertAction({
          text: 'Your account has been activated successfully!',
          color: 'success',
        }),
      );
    }
   else{
    yield put(
      alert.setAlertAction({
        text: 'Redirecting to Activation Page',
        color: 'success',
      }),
    );
    setTimeout(() => {
      window.location.href = '/activate_user';
    }, 5000);
   }
  } catch (e) {
    yield put(
      alert.setAlertAction({
        text: e.msg,
        color: 'danger',
      }),
    );
    yield put(actions.verifyEmailError(e));
  }
}

function* watchLoginUser() {
  yield takeEvery(types.LOGIN_REQUEST, loginSaga);
}

function* watchLogoutUser() {
  yield takeEvery(types.LOGOUT_REQUEST, logoutSaga);
}

function* watchSignUpUser() {
  yield takeEvery(types.SIGN_UP_REQUEST, signUpSaga);
}
function* watchForgotPassword() {
  yield takeEvery(types.FORGOT_PASSWORD_REQUEST, forgotPasswordSaga);
}
function* watchResetPassword() {
  yield takeEvery(types.RESET_PASSWORD_REQUEST, resetPasswordSaga);
}
function* watchActivation() {
  yield takeEvery(types.ACTIVATION_REQUEST, activationSaga);
}
function* watchVerifyEmail() {
  yield takeEvery(types.VERIFY_EMAIL_REQUEST, verifyEmailSaga);
}



export function* userSaga() {
  yield all([
    watchLoginUser(),
    watchLogoutUser(),
    watchSignUpUser(),
    watchForgotPassword(),
    watchResetPassword(),
    watchActivation(),
    watchVerifyEmail(),
  ]);
}
