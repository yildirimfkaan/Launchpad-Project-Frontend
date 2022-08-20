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
        title: 'Error!',
        text: 'Project Not Added.',
        variant: 'danger',
        outTimeMS: 6000,
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
        title: 'Error!',
        text: 'Project Not Added.',
        variant: 'danger',
        outTimeMS: 6000,
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
        title: 'Success!',
        text: 'Project Added!',
        variant: 'success',
      }),
    );
  } catch (e) {
    yield put(
      alert.setAlertAction({
        title: 'Error!',
        text: 'Project Not Added.',
        variant: 'danger',
        outTimeMS: 6000,
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
