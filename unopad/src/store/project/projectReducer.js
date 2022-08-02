import * as types from './projectActionTypes';

const initialState = {
  projects: null,
  project: null,
  error: {
    type: null,
    data: null,
  },
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROJECTS_DATA:
      return {
        ...state,
        projects: action.payload,
      };
    case types.GET_PROJECTS_ERROR:
      return {
        ...state,
        error: {
          type: types.GET_PROJECTS_ERROR,
          data: action.payload,
        },
      };
    case types.GET_PROJECT_DATA:
      return {
        ...state,
        project: action.payload,
      };
    case types.GET_PROJECT_ERROR:
      return {
        ...state,
        error: {
          type: types.GET_PROJECT_ERROR,
          data: action.payload,
        },
      };
    default:
      return state;
  }
};
