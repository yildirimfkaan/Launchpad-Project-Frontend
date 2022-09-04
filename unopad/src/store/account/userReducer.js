import * as types from './userActionTypes';

const initialState = {
  signUpData: null,
  forgotPasswordData: null,
  resetPasswordData: null,
  walletAccount: null,
  accountVerifiedData: null,
  resendVerificationEmailData: null,
  user: null,
  checkUserToken: null,
  error: {
    type: null,
    data: null,
  },
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_DATA:
      return {
        ...state,
        user: action.user ? Object.assign({}, action.user) : null,
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        error: {
          type: types.LOGIN_ERROR,
          data: action.payload,
        },
      };
    case types.SIGN_UP_DATA:
      return {
        ...state,
        signUpData: action.payload ? Object.assign({}, action.payload) : null,
      };
    case types.SIGN_UP_ERROR:
      return {
        ...state,
        error: {
          type: types.SIGN_UP_ERROR,
          data: action.payload,
        },
      };
    case types.FORGOT_PASSWORD_DATA:
      return {
        ...state,
        forgotPasswordData: action.payload ? Object.assign({}, action.payload) : null,
      };
    case types.FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        error: {
          type: types.FORGOT_PASSWORD_ERROR,
          data: action.payload,
        },
      };
    case types.RESET_PASSWORD_DATA:
      return {
        ...state,
        resetPasswordData: action.payload ? Object.assign({}, action.payload) : null,
      };
    case types.RESET_PASSWORD_ERROR:
      return {
        ...state,
        error: {
          type: types.RESET_PASSWORD_ERROR,
          data: action.payload,
        },
      };
    case types.ACTIVATION_DATA:
      return {
        ...state,
        activationData: action.payload ? Object.assign({}, action.payload) : null,
      };
    case types.ACTIVATION_ERROR:
      return {
        ...state,
        error: {
          type: types.ACTIVATION_ERROR,
          data: action.payload,
        },
      };
    case types.LOGOUT_DATA:
      return {
        ...state,
        user: null,
      };
    case types.LOGOUT_ERROR:
      return {
        ...state,
        error: {
          type: types.LOGOUT_ERROR,
          data: action.payload,
        },
      };
    case types.ACCOUNT_DETAILS_DATA:
      const payload = {
        user: action.payload,
        token: JSON.parse(localStorage.getItem('user')).token,
      };
      localStorage.setItem('user', JSON.stringify(payload));
      return {
        ...state,
        user: action.payload ? Object.assign({}, action.payload) : null,
      };
    case types.ACCOUNT_DETAILS_ERROR:
      return {
        ...state,
        error: {
          type: types.ACCOUNT_DETAILS_ERROR,
          data: action.payload,
        },
      };
    case types.ACCOUNT_VERIFIED:
      return {
        ...state,
        accountVerifiedData: action?.payload,
      };
    case types.RESEND_VERIFICATION_EMAIL_DATA:
      return {
        ...state,
        resendVerificationEmailData: action.payload ? Object.assign({}, action.payload) : null,
      };
    case types.RESEND_VERIFICATION_EMAIL_ERROR:
      return {
        ...state,
        error: {
          type: types.RESEND_VERIFICATION_EMAIL_ERROR,
          data: action.payload,
        },
      };
    case types.CHECK_USER_TOKEN_DATA:
      return {
        ...state,
        checkUserToken: action.payload,
      };
    case types.CHECK_USER_TOKEN_ERROR:
      return {
        ...state,
        error: {
          type: types.CHECK_USER_TOKEN_ERROR,
          data: action.payload,
        },
      };
    default:
      return state;
  }
};
