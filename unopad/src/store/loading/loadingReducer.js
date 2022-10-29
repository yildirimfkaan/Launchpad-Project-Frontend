import * as types from './loadingActionTypes';

const initialState = {
  isLoading: null,

  error: {
    type: null,
    data: null,
  },
};

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      const loading = state.isLoading ? state.isLoading : {};
      loading[action.payload.key] = action.payload.isLoading;

      return {
        ...state,
        isLoading: loading ? Object.assign({}, loading) : null,
      };

    default:
      return state;
  }
};
