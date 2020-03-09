import { all, fork } from "redux-saga/effects";
import { watchUserListSagaAsync } from "./user.list.saga";
import { watchProfileSagasAsync } from "./profile.saga";
import { watchLevelListSagasAsync } from "./level.list.saga";
import { watchScientificReportTypeListSagasAsync } from "./scientificReportType.list.saga";
import { watchLecturerListSagasAsync } from "./lecturer.list.saga";
import { watchScientificWorkListSagasAsync } from "./scientificWork.list.saga";
import { watchScientificReportListSagasAsync } from "./scientificReport.list.saga";
import { watchNewsListSagasAsync } from "./news.list.saga";

export default function* sagas() {
  yield all([
    fork(watchUserListSagaAsync),
    fork(watchLevelListSagasAsync),
    fork(watchScientificReportTypeListSagasAsync),
    fork(watchLecturerListSagasAsync),
    fork(watchScientificWorkListSagasAsync),
    fork(watchScientificReportListSagasAsync),
    fork(watchNewsListSagasAsync),
    fork(watchProfileSagasAsync)
  ]);
}
