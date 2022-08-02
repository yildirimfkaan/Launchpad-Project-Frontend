import { takeEvery, call, put, all } from 'redux-saga/effects';

import * as types from './projectActionTypes';
import * as actions from './projectActions';
import * as alert from '../alert/alertActions';
import * as endpoints from '../../services/endpoints';

//Worker Sagas

function* getProjectsSaga(action) {
  try {
    const { data } = yield call(endpoints.getProjects);
    yield put(actions.getProjectsData(data));
  } catch (e) {
    yield put(
      alert.setAlertAction({
        text: 'Project Not Added.',
        color: 'danger',
      }),
    );
    yield put(actions.getProjectsError(e));
  }
}

function* getProjectByIDSaga(action) {
  try {
    const { id } = action.payload;
    const { data } = yield call(endpoints.getProjectByID, id);
    yield put(actions.getProjectByIDData(data));
  } catch (e) {
    yield put(
      alert.setAlertAction({
        text: 'Project Not Added.',
        color: 'danger',
      }),
    );
    yield put(actions.getProjectByIDError(e));
  }
}

function* addProject(action) {
  try {
    const { data } = yield call(endpoints.addProject, action.data);

    yield put(actions.projectAddedAction(data));
    yield put(
      alert.setAlertAction({
        text: 'Project Added!',
        color: 'success',
      }),
    );
  } catch (e) {
    yield put(
      alert.setAlertAction({
        text: 'Project Not Added.',
        color: 'danger',
      }),
    );
  }
}

//Watcher Sagas
function* watchGetProjects() {
  yield takeEvery(types.GET_PROJECTS_REQUEST, getProjectsSaga);
}

function* watchGetProjectByID() {
  yield takeEvery(types.GET_PROJECT_REQUEST, getProjectByIDSaga);
}

function* watchAddProject() {
  yield takeEvery(types.ADD_PROJECT, addProject);
}

export function* projectSaga() {
  yield all([watchAddProject(), watchGetProjectByID(), watchGetProjects()]);
}
