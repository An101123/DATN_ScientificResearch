import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_TABLES,
  GET_TABLES_SUCCESS,
  GET_TABLES_FAIL,
} from "../actions/table.action";
import {
  URL_ENPOINTS
} from "../constant"
import request from "../helpers/request.helper";

const getTables = params => {
  let url = URL_ENPOINTS.TABLE
  return request.get(url, params).then(result => {
    return {
      tables: result.sources,
    }
  })
}

function* getTableSaga(params) {
  try {
    const payload = yield call(() => getTables(params.payload.params));
    yield put({ type: GET_TABLES_SUCCESS, payload })
  } catch (error) {
    yield put({ type: GET_TABLES_FAIL, error })
  }
}

export function* watchTableSagasAsync() {
  yield takeLatest(GET_TABLES, getTableSaga);
}