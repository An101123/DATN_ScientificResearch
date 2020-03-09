import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_LEVEL_LIST,
  getLevelListSuccess,
  getLevelListFailed
} from "../actions/level.list.action";
import ApiLevel from "../api/api.level";

function* getLevelList(action) {
  try {
    const payload = yield call(ApiLevel.getLevelList, action.payload.params);
    console.log(payload);
    yield put(getLevelListSuccess(payload));
  } catch (error) {
    yield put(getLevelListFailed());
  }
}

export function* watchLevelListSagasAsync() {
  yield takeLatest(GET_LEVEL_LIST, getLevelList);
}
