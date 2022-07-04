import * as types from '../actionTypes'

/**
 * 
 * @param {username, password} creds 
 */
export const loginUserAction = (creds) => {
    
    return {
        type: types.LOGIN_USER,
        creds
    }
}

/**
 * 
 * @param {username, token} user 
 */
export const userLoggedIn = (user) => {
    return {
        type: types.USER_LOGGEDIN,
        user
    }
}
/**
 * 
 * @param {email} creds 
 */
 export const forgotPw = (creds) => {
    return {
        type: types.FORGOT_PASSWORD,
        creds
    }
}
/**
 * 
 * @param {password,confirmPassword,resetToken} creds 
 */
 export const resetPw = (creds) => {
    return {
        type: types.PASSWORD_RESET,
        creds
    }
}

export const logoutUserAction = () => {
    return {
        type: types.LOGOUT_USER
    }
}

export const userLoggedOutAction = () => {
    return {
        type: types.USER_LOGGEDOUT
    }
}


/**
 * 
 * @param {username, password, email} creds 
 */
export const userSigned = (creds) => {

    return {
        type:types.SIGNUP_SUCCESS,
        creds
    }
}
export const userSignFailed = () => {

    return {
        type:types.SIGNUP_FAIL
    }
}
