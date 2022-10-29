import { SET_ALERT, RESET_ALERT } from './alertActionTypes';

const initialState = {
  alert: {
    text: '',
    color: '',
  },
};

export const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        alert: action.msg ? Object.assign({}, action.msg) : null,
      };

    case RESET_ALERT:
      return {
        ...state,
        alert: {
          title: '',
          text: '',
          time: '',
          variant: '',
          outTimeMS: 0,
        },
      };

    default:
      return state;
  }
};
