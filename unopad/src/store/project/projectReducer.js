import * as types from './projectActionTypes';

const initialState = {
  projects: null,
  activeProjects: null,
  completedProjects: null,
  project: null,
  swapTokenModal: false,
  unopadProject: null,
  error: {
    type: null,
    data: null,
  },
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROJECTS_DATA:
      const projects = action.payload;
      const activeProjects = action.payload.filter((p) => p.is_active === 'active');
      const completedProjects = action.payload.filter((p) => p.is_active === 'completed');

      return {
        ...state,
        activeProjects: activeProjects,
        completedProjects: completedProjects,
        projects: projects,
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
        project: action.payload ? Object.assign({}, action.payload) : null,
      };
    case types.GET_PROJECT_ERROR:
      return {
        ...state,
        error: {
          type: types.GET_PROJECT_ERROR,
          data: action.payload,
        },
      };
    case types.SWAP_TOKEN_ERROR:
      return {
        ...state,

        error: { type: types.SWAP_TOKEN_ERROR, data: action.payload },
      };
    case types.SWAP_TOKEN_MODAL:
      return {
        ...state,

        swapTokenModal: action?.payload,
      };
    case types.SET_PROJECT_DATA:
      return {
        ...state,
      };
    case types.GET_UNOPAD_PROJECT_DATA:
      return {
        ...state,
        unopadProject: action.payload ? Object.assign({}, action.payload) : null,
      };
    case types.GET_UNOPAD_PROJECT_ERROR:
      return {
        ...state,
        error: {
          type: types.GET_UNOPAD_PROJECT_ERROR,
          data: action.payload,
        },
      };
    default:
      return state;
  }
};
