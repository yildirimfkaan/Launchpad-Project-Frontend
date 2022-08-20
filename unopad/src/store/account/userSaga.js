import { takeEvery, put, all, call } from 'redux-saga/effects';
import createBrowserHistory from '../../helpers/History';
import * as types from './userActionTypes';
import * as actions from './userActions';
import * as alert from '../alert/alertActions';
import * as endpoints from '../../services/endpoints';
import Swal from 'sweetalert2';

function* loginSaga({ creds }) {
  try {
    var formData = new FormData();
    formData.append('username', creds['username']);
    formData.append('password', creds['password']);

    const { data } = yield call(endpoints.login, formData);

    yield put(actions.loginData(data));
    yield put(
      alert.setAlertAction({
        title: 'Success!',
        text: 'User Logged In! Redirecting to Home Page',
        variant: 'success',
      }),
    );
    const user = {
      user: data['username'],
      token: data['access_token'],
    };
    localStorage.setItem('user', JSON.stringify(user));

    yield put(actions.accountDetailsRequestAction());

    setTimeout(() => {
      window.location.href = '/home';
    }, 1000);
  } catch (e) {
    yield put(
      alert.setAlertAction({
        title: 'Error!',
        text: e?.response?.data?.detail,
        variant: 'danger',
        outTimeMS: 6000,
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
        title: 'Success!',
        text: 'Valid Mail Adress! Check your mail for password reset adress...',
        variant: 'success',
      }),
    );
  } catch (e) {
    yield put(
      alert.setAlertAction({
        title: 'Error!',
        text: e.msg,
        variant: 'danger',
        outTimeMS: 6000,
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
        title: 'Success!',
        text: 'Your password has been reset successfully! Redirecting to Login Page',
        variant: 'success',
      }),
    );
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  } catch (e) {
    yield put(
      alert.setAlertAction({
        title: 'Error!',
        text: e.msg,
        variant: 'danger',
        outTimeMS: 6000,
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
    console.log('saga', data);
    yield put(
      alert.setAlertAction({
        title: 'Success!',
        text: 'Your account has been activated successfully! Redirecting to Home Page',
        variant: 'success',
      }),
    );
    yield put(actions.accountVerifiedAction(true));
    setTimeout(() => {
      window.location.href = '/home';
    }, 3000);
  } catch (e) {
    yield put(
      alert.setAlertAction({
        title: 'Error!',
        text: e.msg,
        variant: 'danger',
        outTimeMS: 6000,
      }),
    );
    yield put(actions.activationError(e));
  }
}

function* logoutSaga() {
  localStorage.removeItem('user');
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
        title: 'Success!',
        text: 'User Signed In!',
        variant: 'success',
      }),
    );
    window.location.href = '/login';
  } catch (e) {
    yield put(
      alert.setAlertAction({
        title: 'Error!',
        text: e.msg,
        variant: 'danger',
        outTimeMS: 6000,
      }),
    );
    yield put(actions.signUpError(e));
  }
}

function* getAccountDetailsSaga({ creds }) {
  try {
    const { data } = yield call(endpoints.getAccountDetails);
    yield put(actions.accountDetailsDataAction(data));
  } catch (e) {
    yield put(
      alert.setAlertAction({
        title: 'Error!',
        text: e.msg,
        variant: 'danger',
        outTimeMS: 6000,
      }),
    );
    yield put(actions.accountDetailsErrorAction(e));
  }
}

function* resendVerificationEmail({ payload }) {
  try {
    const { data } = yield call(endpoints.resendVerificationEmail);
    yield put(actions.resendVerificationEmailDataAction(data));

    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: "Verification Email Sent! Don't forget to check your spam/junk folder.",
    });
  } catch (e) {
    yield put(
      alert.setAlertAction({
        title: 'Error!',
        text: e?.response?.data?.error,
        variant: 'danger',
        outTimeMS: 6000,
      }),
    );
    yield put(actions.resendVerificationEmailErrorAction(e));
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
function* watchAccountDetails() {
  yield takeEvery(types.ACCOUNT_DETAILS_REQUEST, getAccountDetailsSaga);
}
function* watchResendVerificationEmail() {
  yield takeEvery(types.RESEND_VERIFICATION_EMAIL_REQUEST, resendVerificationEmail);
}

export function* userSaga() {
  yield all([
    watchLoginUser(),
    watchLogoutUser(),
    watchSignUpUser(),
    watchForgotPassword(),
    watchResetPassword(),
    watchActivation(),
    watchAccountDetails(),
    watchResendVerificationEmail(),
  ]);
}
