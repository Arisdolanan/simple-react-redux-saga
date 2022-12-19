import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import * as sagaStudents from "./students/students-sagas";
import studentsReducers from "./students/students-reducer";

// ----------------------
// 1. reducers
// ----------------------
export const rootReducer = combineReducers({
  students: studentsReducers,
});

// ----------------------
// 2. saga
// ----------------------
export function* rootSaga() {
  yield all([sagaStudents.saga()]);
}
