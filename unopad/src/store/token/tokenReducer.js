import * as types from './tokenActionTypes';

const initialState = {
  tokens: null,
  token: null,
  error: {
    type: null,
    data: null,
  },
};

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TOKENS_DATA:
      return {
        ...state,
        tokens: action.payload,
      };
    case types.GET_TOKENS_ERROR:
      return {
        ...state,
        error: {
          type: types.GET_TOKENS_ERROR,
          data: action.payload,
        },
      };
    case types.GET_TOKEN_DATA:
      return {
        ...state,
        token: action.payload,
      };
    case types.GET_TOKEN_ERROR:
      return {
        ...state,
        error: {
          type: types.GET_TOKEN_ERROR,
          data: action.payload,
        },
      };
    default:
      return state;
  }
};
