import * as types from './tokenActionTypes';

export const getTokens = (payload) => {
  return {
    type: types.GET_TOKENS_REQUEST,
    payload,
  };
};

export const getTokensData = (payload) => {
  return {
    type: types.GET_TOKENS_DATA,
    payload,
  };
};

export const getTokensError = (payload) => {
  return {
    type: types.GET_TOKENS_ERROR,
    payload,
  };
};

export const getTokenByID = (payload) => {
  return {
    type: types.GET_TOKEN_REQUEST,
    payload,
  };
};

export const getTokenByIDData = (payload) => {
  return {
    type: types.GET_TOKEN_DATA,
    payload,
  };
};

export const getTokenByIDError = (payload) => {
  return {
    type: types.GET_TOKEN_ERROR,
    payload,
  };
};

export const addTokenAction = (data) => {
  return {
    type: types.ADD_TOKEN,
    data,
  };
};

export const tokenAddedAction = (token) => {
  return {
    type: types.TOKEN_ADDED,
    token,
  };
};
