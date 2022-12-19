import { takeLatest, put, takeEvery } from "redux-saga/effects";
import {
  SET_LOADING,
  GET_STUDENTS,
  GET_STUDENTS_LOADED,
  GET_STUDENTS_ERROR,
  CREATE_STUDENTS,
  CREATE_STUDENTS_ERROR,
  UPDATE_STUDENTS,
  UPDATE_STUDENTS_ERROR,
  DELETE_STUDENTS,
  DELETE_STUDENTS_ERROR,
} from "./students-actions";
import StudentService from "../../../services/StudentService";

export function* saga() {
  yield takeEvery(GET_STUDENTS, function* () {
    try {
      yield put({ type: SET_LOADING });
      const response = yield StudentService.getStudent();
      yield put({ type: GET_STUDENTS_LOADED, payload: response });
    } catch (e) {
      yield put({ type: GET_STUDENTS_ERROR, error: e.response });
      console.log(e);
    }
  });
  yield takeLatest(CREATE_STUDENTS, function* (action) {
    try {
      yield put({ type: SET_LOADING });
      const response = yield StudentService.addStudent(action.payload);
      console.log(response);
      yield put({ type: GET_STUDENTS });
    } catch (e) {
      yield put({ type: CREATE_STUDENTS_ERROR, error: e.response });
      console.log(e);
    }
  });
  yield takeLatest(UPDATE_STUDENTS, function* (action) {
    try {
      yield put({ type: SET_LOADING });
      const response = yield StudentService.updateStudent(action.payload);
      console.log(response);
      yield put({ type: GET_STUDENTS });
    } catch (e) {
      yield put({ type: UPDATE_STUDENTS_ERROR, error: e.response });
      console.log(e);
    }
  });
  yield takeLatest(DELETE_STUDENTS, function* (action) {
    const id = action.payload;
    try {
      yield put({ type: SET_LOADING });
      const response = yield StudentService.deleteStudent(id);
      console.log(response);
      yield put({ type: GET_STUDENTS });
    } catch (e) {
      yield put({ type: DELETE_STUDENTS_ERROR, error: e.response });
      console.log(e);
    }
  });
}
