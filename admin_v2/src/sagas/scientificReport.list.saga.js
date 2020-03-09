import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_SCIENTIFICREPORT_LIST,
  getScientificReportListSuccess,
  getScientificReportListFailed
} from "../actions/scientificReport.list.action";
import ApiScientificReport from "../api/api.scientificReport";

function* getScientificReportList(action) {
  try {
    const payload = yield call(
      ApiScientificReport.getScientificReports,
      action.payload.params
    );
    console.log(payload);
    yield put(getScientificReportListSuccess(payload));
  } catch (error) {
    yield put(getScientificReportListFailed());
  }
}

export function* watchScientificReportListSagasAsync() {
  yield takeLatest(GET_SCIENTIFICREPORT_LIST, getScientificReportList);
}
