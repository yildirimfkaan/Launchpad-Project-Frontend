import * as types from './projectActionTypes';

const initialState = {
  projects: null,
  activeProjects: null,
  completedProjects: null,
  project: null,
  swapTokenModal: false,
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
    default:
      return state;
  }
};
