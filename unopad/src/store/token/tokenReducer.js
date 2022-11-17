import { sortKeys, TOKENS_SORT_KEYS, TOKENS_SORT_TYPES } from '../../pages/Sales/salesConstants';
import * as types from './tokenActionTypes';

const initialState = {
  tokens: null,
  token: null,
  filteredTokens: null,
  buyTokenModal: false,
  tokenSortData: {
    sortType: TOKENS_SORT_TYPES.ASCENDING,
    sortKey: TOKENS_SORT_KEYS.TOKEN_NAME,
  },
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
    case types.FILTER_TOKENS:
      function filterTokens(filterInput) {
        const filteredTokens = [];

        for (const token of state.tokens) {
          if (
            token.token_name.toString().toLowerCase().includes(filterInput) ||
            token.token_symbol.toString().toLowerCase().includes(filterInput) ||
            token.token_address.toString().toLowerCase().includes(filterInput)
          ) {
            filteredTokens.push(token);
          }
        }

        return filteredTokens;
      }

      let filteredTokens = null;
      if (action.payload) {
        filteredTokens = filterTokens(action.payload);
      }

      return {
        ...state,
        filteredTokens: filteredTokens ? [...filteredTokens] : null,
      };
    case types.SET_TOKEN_SORT_DATA:
      return {
        ...state,
        tokenSortData: { ...action.payload },
      };
    case types.SORTING_TOKENS:
      const selectedKey = sortKeys[state.tokenSortData.sortKey].key;
      const tokens = state.filteredTokens?.length ? state.filteredTokens : state.tokens;

      const sortedTokens = tokens?.sort((a, b) => {
        if (state.tokenSortData.sortType === TOKENS_SORT_TYPES.ASCENDING) {
          if (a[selectedKey]?.toString().toLowerCase() > b[selectedKey]?.toString().toLowerCase()) {
            return 1;
          }
          return -1;
        }
        return -1;
      });

      if (state.filteredTokens?.length) {
        return {
          ...state,
          filteredTokens: sortedTokens ? [...sortedTokens] : null,
        };
      }
      return {
        ...state,
        tokens: sortedTokens ? [...sortedTokens] : null,
      };

    case types.BUY_TOKEN_ERROR:
      return {
        ...state,

        error: { type: types.BUY_TOKEN_ERROR, data: action.payload },
      };
    case types.BUY_TOKEN_MODAL:
      return {
        ...state,

        buyTokenModal: action?.payload,
      };
    default:
      return state;
  }
};
