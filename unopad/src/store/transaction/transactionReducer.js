import * as types from './transactionActionTypes';

const initialState = {
 
  success: null,
  percent_data:null,
  error: {
    type: null,
    data: null,
  },
};

export const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TRANSACTION_DATA:
      return {
        ...state,
        success: action.success ? Object.assign({}, action.success) : null,
      };
      
    case types.TRANSACTION_ERROR:
      return {
        ...state,
        error: {
          type: types.TRANSACTION_ERROR,
          data: action.payload,
        },
      };
    case types.TRANSACTION_PERCENT:
      return{
        ...state,
        percent_data: action?.payload ? Object.assign( action?.payload) : null,

      }
    default:
      return state;
  }
};
