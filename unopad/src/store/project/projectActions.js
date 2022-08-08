import * as types from './projectActionTypes';

export const getProjects = (payload) => {
  return {
    type: types.GET_PROJECTS_REQUEST,
    payload,
  };
};

export const getProjectsData = (payload) => {
  return {
    type: types.GET_PROJECTS_DATA,
    payload,
  };
};

export const getProjectsError = (payload) => {
  return {
    type: types.GET_PROJECTS_ERROR,
    payload,
  };
};

export const getProjectByID = (payload) => {
  return {
    type: types.GET_PROJECT_REQUEST,
    payload,
  };
};

export const getProjectByIDData = (payload) => {
  return {
    type: types.GET_PROJECT_DATA,
    payload,
  };
};

export const getProjectByIDError = (payload) => {
  return {
    type: types.GET_PROJECT_ERROR,
    payload,
  };
};

export const addProjectAction = (data) => {
  return {
    type: types.ADD_PROJECT,
    data,
  };
};

export const projectAddedAction = (project) => {
  return {
    type: types.PROJECT_ADDED,
    project,
  };
};