import * as types from '../actionTypes'



/**
 * 
 * @param {project_name, project_number_of_participants, project_number_of_registrations} data 
 */
export const addProjectAction = (data) => {
    return {
        type: types.ADD_PROJECT,
        data
    }
}

export const projectAddedAction = (project) => {
    return {
        type: types.PROJECT_ADDED,
        project
    }
}

