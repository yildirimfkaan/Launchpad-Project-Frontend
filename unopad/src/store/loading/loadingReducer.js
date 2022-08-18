import * as types from './loadingActionTypes';

const initialState = {
  //  isLoading:{"GET_MY_BALANCE_LOADING": {
  //     "isLoading": true
  //   },
  //   "BUY_UNOTOKEN_LOADING": {
  //     "isLoading": true
  //   }}
  isLoading: null,

  error: {
    type: null,
    data: null,
  },
};

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      
      console.log("loading reducer action payload : ",action.payload)
      const loading = state.isLoading ? state.isLoading: {};
      loading[action.payload.key] = action.payload.isLoading;
      console.log("type'a göre loading true false datası",loading)
      return {
        ...state,
        isLoading: loading ? Object.assign({}, loading) : null,
      };

    default:
      return state;
  }
};
