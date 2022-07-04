import { takeEvery, call, put, all } from 'redux-saga/effects'

import * as types from '../actionTypes'
import * as service from '../../../services/ProjectService'
import * as actions from '../actions/projectActions'
import * as alert from '../actions/alertActions'

//Worker Sagas


function* addProject({ data }) {
    try {
        
        const project = yield call(service.addProject, data)
        
        
        yield put(actions.projectAddedAction(project))
        yield put(alert.setAlertAction({
            text: 'Project Added!',
            color: 'success'
        }))
    } catch (e) {
        yield put(alert.setAlertAction({
            text: 'Project Not Added.',
            color: 'danger'
        }))
    }
}

//Watcher Sagas

function* watchAddProject() {
    yield takeEvery(types.ADD_PROJECT, addProject)
}


export function* projectSaga() {
    yield all([
        
        watchAddProject()
        
    ])
}
