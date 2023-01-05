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

export const filterTokensAction = (payload) => {
  return {
    type: types.FILTER_TOKENS,
    payload,
  };
};
export const setFilterInputAction = (payload) => {
  return {
    type: types.SET_FILTER_INPUT,
    payload,
  };
};
export const sortTokenSortData = (payload) => {
  return {
    type: types.SET_TOKEN_SORT_DATA,
    payload,
  };
};
export const sortingTokensAction = (payload) => {
  return {
    type: types.SORTING_TOKENS,
    payload,
  };
};

export const buyTokenDataAction = (payload) => {
  return {
    type: types.BUY_TOKEN_DATA,
    payload,
  };
};
export const buyTokenErrorAction = (payload) => {
  return {
    type: types.BUY_TOKEN_ERROR,
    payload,
  };
};
export const buyTokenModalAction = (payload) => {
  return {
    type: types.BUY_TOKEN_MODAL,
    payload,
  };
};
export const updateQuickFilterAction = (payload) => {
  return {
    type: types.UPDATE_QUICK_FILTER,
    payload,
  };
};
export const swapTokenDataAction = (payload) => {
  return {
    type: types.SWAP_TOKEN_DATA,
    payload,
  };
};
export const swapTokenErrorAction = (payload) => {
  return {
    type: types.SWAP_TOKEN_ERROR,
    payload,
  };
};
export const swapTokenModalAction = (payload) => {
  return {
    type: types.SWAP_TOKEN_MODAL,
    payload,
  };
};