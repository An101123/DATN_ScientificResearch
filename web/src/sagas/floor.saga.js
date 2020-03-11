import { call, put, takeLatest } from "redux-saga/effects"
import {
  GET_TABLES_BY_FLOOR_ID,
  GET_FLOORS,
  GET_FLOORS_SUCCESS,
  GET_FLOORS_FAIL,
} from "../actions/floor.action"
import {
  GET_TABLES,
  GET_TABLES_SUCCESS,
  GET_TABLES_FAIL,
} from "../actions/table.action"
import {
  URL_ENPOINTS
} from "../constant"
import request from "../helpers/request.helper"

const getFloors = params => {
  let url = URL_ENPOINTS.FLOOR
  return request.get(url, params).then(result => {
    return {
      floors: result.sources,
    }
  })
}

const getTablesByFloorId = id => {
  let url = `${URL_ENPOINTS.FLOOR}/${id}${URL_ENPOINTS.TABLE}`
  return request.get(url).then(result => {
    return {
      tables: result.data,
    }
  })
}

function* getFloorSaga(params) {
  try {
    const payload = yield call(() => getFloors(params.payload.params))
    yield put({ type: GET_FLOORS_SUCCESS, payload })
  } catch (error) {
    yield put({ type: GET_FLOORS_FAIL, error })
  }
}

function* getFloorByFloorIdSaga(id) {
  try {
    const payload = yield call(() => getTablesByFloorId(id.id))
    yield put({ type: GET_TABLES_SUCCESS, payload })
  } catch (error) {
    yield put({ type: GET_TABLES_FAIL, error })
  }
}

export function* watchFloorSagasAsync() {
  yield takeLatest(GET_FLOORS, getFloorSaga)
  yield takeLatest(GET_TABLES_BY_FLOOR_ID, getFloorByFloorIdSaga)
}