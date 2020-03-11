import { all, fork } from "redux-saga/effects";
import { watchUserSagasAsync } from "./user.saga";
import { watchRoleSagasAsync } from "./role.saga";
import { watchFloorSagasAsync } from "./floor.saga";
import { watchTableSagasAsync } from "./table.saga";

export default function* sagas() {
  yield all([
    fork(watchUserSagasAsync),
    fork(watchRoleSagasAsync),
    fork(watchFloorSagasAsync),
    fork(watchTableSagasAsync)
  ]);
}
