import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_LECTURER_LIST,
  getLecturerListSuccess,
  getLecturerListFailed
} from "../actions/lecturer.list.action";
import ApiLecturer from "../api/api.lecturer";

function* getLecturerList(action) {
  try {
    const payload = yield call(ApiLecturer.getLecturers, action.payload.params);
    console.log(payload);
    yield put(getLecturerListSuccess(payload));
  } catch (error) {
    yield put(getLecturerListFailed());
  }
}

export function* watchLecturerListSagasAsync() {
  yield takeLatest(GET_LECTURER_LIST, getLecturerList);
}
