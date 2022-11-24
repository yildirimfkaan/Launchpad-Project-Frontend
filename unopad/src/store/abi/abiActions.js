import * as types from './abiActionTypes';

export const abiRequestAction = (payload) => {
  return {
    type: types.ABI_REQUEST,
    payload,
  };
};
export const abiDataAction = (payload) => {
  return {
    type: types.ABI_DATA,
    payload,
  };
};
export const abiErrorAction = (payload) => {
  return {
    type: types.ABI_ERROR,
    payload,
  };
};