import { SET_LOADING, GET_STUDENTS, GET_STUDENTS_LOADED, CREATE_STUDENTS, UPDATE_STUDENTS, DELETE_STUDENTS } from "./students-actions";

// State
const initialState = {
  loading: false,
  students: [],
};

// Reducers
export default function studentsReducers(state = initialState, { type, payload }) {
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_STUDENTS_LOADED:
      return {
        ...state,
        students: payload,
        loading: false,
      };
    case CREATE_STUDENTS:
      return {
        ...state,
        students: [payload, ...state.students],
        loading: false,
      };
    case UPDATE_STUDENTS:
      return {
        ...state,
        students: [payload, ...state.students],
        loading: false,
      };
    case DELETE_STUDENTS:
      return {
        ...state,
        students: payload,
        loading: false,
      };
    default:
      return state;
  }
}
