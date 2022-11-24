import * as types from './abiActionTypes';

const initialState = {

  abiHistory: null,
  error: {
    type: null,
    data: null,
  },
};

export const abiReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case types.ABI_DATA:
      return {
        ...state,

        abiHistory: action?.payload ? Object.assign([], action.payload) : null,
      };
    case types.ABI_ERROR:
      return {
        ...state,

        error: { type: types.ABI_ERROR, data: action.payload },
      };
    default:
      return state;
  }
};
