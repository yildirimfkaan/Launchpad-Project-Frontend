import * as types from './loadingActionTypes';

export const setLoadingAction = (payload) => {
  return {
    type: types.SET_LOADING,
    payload,
  };
};
