import * as types from './userActionTypes';

/**
 *
 * @param {username, password} creds
 */
export const loginRequest = (creds) => {
  return {
    type: types.LOGIN_REQUEST,
    creds,
  };
};
/**
 *
 * @param {username, token} user
 */
export const loginData = (user) => {
  return {
    type: types.LOGIN_DATA,
    user,
  };
};
export const loginError = (payload) => {
  return {
    type: types.LOGIN_ERROR,
    payload,
  };
};
/**
 *
 * @param {email} creds
 */
export const forgotPasswordRequest = (creds) => {
  return {
    type: types.FORGOT_PASSWORD_REQUEST,
    creds,
  };
};
export const forgotPasswordData = (payload) => {
  return {
    type: types.FORGOT_PASSWORD_DATA,
    payload,
  };
};
export const forgotPasswordError = (payload) => {
  return {
    type: types.FORGOT_PASSWORD_ERROR,
    payload,
  };
};
/**
 *
 * @param {password,confirmPassword,resetToken} creds
 */
export const resetPasswordRequest = (creds) => {
  return {
    type: types.RESET_PASSWORD_REQUEST,
    creds,
  };
};
export const resetPasswordData = (payload) => {
  return {
    type: types.RESET_PASSWORD_DATA,
    payload,
  };
};
export const resetPasswordError = (payload) => {
  return {
    type: types.RESET_PASSWORD_ERROR,
    payload,
  };
};
/**
 *
 * @param {activationToken,activationCode} creds
 */
 export const activationRequest = (creds) => {
  return {
    type: types.ACTIVATION_REQUEST,
    creds,
  };
};
export const activationData = (payload) => {
  return {
    type: types.ACTIVATION_DATA,
    payload,
  };
};
export const activationError = (payload) => {
  return {
    type: types.ACTIVATION_ERROR,
    payload,
  };
};


export const logoutRequest = (payload) => {
  return {
    type: types.LOGOUT_REQUEST,
    payload
  };
};
export const logoutData = (payload) => {
  return {
    type: types.LOGIN_DATA,
    payload
  };
};
export const logoutError = (payload) => {
  return {
    type: types.LOGIN_ERROR,
    payload
  };
};

/**
 *
 * @param {username, password, email} creds
 */
export const signUpRequest = (creds) => {
  return {
    type: types.SIGN_UP_REQUEST,
    creds,
  };
};
export const signUpData = (payload) => {
  return {
    type: types.SIGN_UP_DATA,
    payload,
  };
};
export const signUpError = (payload) => {
  return {
    type: types.SIGN_UP_ERROR,
    payload,
  };
};





