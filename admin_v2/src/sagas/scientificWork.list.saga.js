import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_SCIENTIFICWORK_LIST,
  getScientificWorkListSuccess,
  getScientificWorkListFailed
} from "../actions/scientificWork.list.action";
import ApiScientificWork from "../api/api.scientificWork";

function* getScientificWorkList(action) {
  try {
    const payload = yield call(ApiScientificWork.getScientificWorks, action.payload.params);
    console.log(payload);
    yield put(getScientificWorkListSuccess(payload));
  } catch (error) {
    yield put(getScientificWorkListFailed());
  }
}

export function* watchScientificWorkListSagasAsync() {
  yield takeLatest(GET_SCIENTIFICWORK_LIST, getScientificWorkList);
}
