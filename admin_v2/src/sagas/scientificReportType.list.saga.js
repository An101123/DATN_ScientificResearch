import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_SCIENTIFICREPORTTYPE_LIST,
  getScientificReportTypeListSuccess,
  getScientificReportTypeListFailed
} from "../actions/scientificReportType.list.action";
import ApiScientificReportType from "../api/api.scientificReportType";

function* getScientificReportTypeList(action) {
  try {
    const payload = yield call(ApiScientificReportType.getScientificReportTypeList, action.payload.params);
    console.log(payload);
    yield put(getScientificReportTypeListSuccess(payload));
  } catch (error) {
    yield put(getScientificReportTypeListFailed());
  }
}

export function* watchScientificReportTypeListSagasAsync() {
  yield takeLatest(GET_SCIENTIFICREPORTTYPE_LIST, getScientificReportTypeList);
}
