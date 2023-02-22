import { quickFilterConstants } from '../../helpers/constants';
import { sortKeys, TOKENS_SORT_KEYS, TOKENS_SORT_TYPES } from '../../pages/Sales/salesConstants';
import * as types from './tokenActionTypes';

const initialState = {
  activeTokens: null,
  completedTokens: null,
  tokens: null,
  token: null,
  filteredTokens: null,
  filterInput: '',
  buyTokenModal: false,
  tokenSortData: {
    sortType: TOKENS_SORT_TYPES.ASCENDING,
    sortKey: TOKENS_SORT_KEYS.TOKEN_NAME,
  },
  quickFilter: 1,
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
        tokens: action?.payload,
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
    case types.SET_FILTER_INPUT:
      return {
        ...state,
        filterInput: action?.payload ? action.payload : '',
      };

    case types.FILTER_TOKENS:
      function filterTokens(filterInput) {
        const filteredTokens = [];

        let tokens = state.tokens;
        if (state.quickFilter === quickFilterConstants.ACTIVE) {
          tokens = tokens?.filter((t) => t.is_active === 'active');
        } else if (state.quickFilter === quickFilterConstants.COMPLETED) {
          tokens = tokens?.filter((t) => t.is_active === 'completed');
        }

        if (tokens) {
          for (const token of tokens) {
            if (
              token?.token?.name?.toString().toLowerCase().includes(filterInput) ||
              token?.token?.symbol?.toString().toLowerCase().includes(filterInput) ||
              token?.token?.address?.toString().toLowerCase().includes(filterInput)
            ) {
              filteredTokens.push(token);
            }
          }

          return filteredTokens;
        }
      }

      let filteredTokens = null;

      filteredTokens = filterTokens(state.filterInput?.toString().toLowerCase());

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
          return (
            a.is_active.localeCompare(b.is_active) ||
            a.token[selectedKey]
              ?.toString()
              .toLowerCase()
              .localeCompare(b.token[selectedKey]?.toString().toLowerCase())
          );
        } else {
          return (
            a.is_active.localeCompare(b.is_active) ||
            b.token[selectedKey]
              ?.toString()
              .toLowerCase()
              .localeCompare(a.token[selectedKey]?.toString().toLowerCase())
          );
        }
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
    case types.UPDATE_QUICK_FILTER:
      return {
        ...state,
        quickFilter: action?.payload,
      };
    default:
      return state;
  }
};
