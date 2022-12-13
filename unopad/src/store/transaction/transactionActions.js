
import * as types from './transactionActionTypes';

/**
 *
 
 */
export const transactionRequest = (creds) => {
  
  return {
    
    type: types.TRANSACTION_REQUEST,
    creds,
  };
};
/**
 *
 
 */
export const transactionData = (payload) => {
  return {
    type: types.TRANSACTION_DATA,
    payload,
  };
};
export const transactionError = (payload) => {
  return {
    type: types.TRANSACTION_ERROR,
    payload,
  };
};
