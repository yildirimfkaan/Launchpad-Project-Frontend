import {
    takeEvery,
    call,
    put,
    all
} from 'redux-saga/effects'
import createBrowserHistory from '../../../History'
import * as types from '../actionTypes'
import * as service from '../../../services/UserService'
import * as actions from '../actions/userActions'
import * as alert from '../actions/alertActions'

function* login({
    creds
}) {
    try {
        var formData = new FormData();
        formData.append('username', creds['username']);
        formData.append('password', creds['password']);
        const response = yield fetch(process.env.REACT_APP_API_URL+'/api/login', {
            method: 'POST',
            body: formData
        })
        var jsonresponse = yield response.json()
        if (response['status'] == 200) {
            yield put(actions.userLoggedIn(response))
            yield put(alert.setAlertAction({
                text: 'User Logged In! Redirecting to Home Page',
                color: 'success'
            }))
            const user = {
                username: jsonresponse['username'],
                token: jsonresponse['access_token']
            }
            localStorage.setItem('user', JSON.stringify(user))
            setInterval(() => {
                window.location.href='/Home'
          }, 1000);
            
        }
        else{
            yield put(alert.setAlertAction({
                text: jsonresponse['detail'],
                color: 'error'
            }))
        }
    } catch (e) {
        
        yield put(alert.setAlertAction({
            text: e.msg,
            color: 'danger'

        }))
    }
}
function* forgotpassword({
    creds
}) {
    try {
        var formData2 = new FormData();
        formData2.append('email', creds['email']);
        const response = yield fetch(process.env.REACT_APP_API_URL+'/api/password-recovery', {
            method: 'POST',
            body: formData2
        })
        if(response['status']==200){
            yield put(alert.setAlertAction({
                text: 'Valid Mail Adress! Check your mail for password reset adress...',
                color: 'success'
            }))         
        }        
    } catch (e) {
        
        yield put(alert.setAlertAction({
            text: e.msg,
            color: 'danger'

        }))
    }
}
function* resetpassword({
    creds
}) {
    try {
        var formData3 = new FormData();

        formData3.append('password', creds['password']);
        formData3.append('confirmPassword', creds['confirmPassword']);
        formData3.append('resetToken', creds['resetToken']);
        const response = yield fetch(process.env.REACT_APP_API_URL+'/api/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({token:creds['resetToken'],new_password:creds['password']})
        })
        
        if(response['status']==200){
            yield put(alert.setAlertAction({
                text: 'Your password has been reset successfully! Redirecting to Login Page',
                color: 'success'
            }))
            setInterval(() => {
                window.location.href='/login'
          }, 2000);
        }

    } catch (e) {
        yield put(alert.setAlertAction({
            text: e.msg,
            color: 'danger'

        }))
    }
}
function* logout() {
    yield call(service.logout)
    yield put(actions.userLoggedOutAction())
    createBrowserHistory.push('/')
    
}

function* signup({
    creds
}) {
    try {
        var formData1 = new FormData();
        formData1.append('username', creds['username']);
        formData1.append('password', creds['password']);
        formData1.append('email', creds['email']);
        const response = yield fetch(process.env.REACT_APP_API_URL+'/api/signup', {
            method: 'POST',
            body: formData1
        })

        if (response['status'] == 200) {
            yield put(actions.userSigned(response))
            yield put(alert.setAlertAction({
                text: 'User Signed In!',
                color: 'success'
            }))
            window.location.href='/login'
        }

    } catch (e) {
        yield put(alert.setAlertAction({
            text: e.msg,
            color: 'danger'

        }))
    }

}
function* watchLoginUser() {
    yield takeEvery(types.LOGIN_USER, login)
}

function* watchLogoutUser() {
    yield takeEvery(types.LOGOUT_USER, logout)
}

function* watchSignUpUser() {
    yield takeEvery(types.SIGNUP_SUCCESS, signup)
}
function* watchForgotPassword() {
    yield takeEvery(types.FORGOT_PASSWORD, forgotpassword)
}
function* watchResetPassword() {
    yield takeEvery(types.PASSWORD_RESET, resetpassword)
}

export function* userSaga() {
    yield all([
        watchLoginUser(),
        watchLogoutUser(),
        watchSignUpUser(),
        watchForgotPassword(),
        watchResetPassword(),
    ])
}
