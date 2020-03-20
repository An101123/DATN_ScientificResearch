import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
} from "../actions/user.action";
import {
  URL_ENPOINTS
} from "../constant"
import request from "../helpers/request.helper";

const getUsers = params => {
  let url = URL_ENPOINTS.USER
  return request.get(url, params).then(result => {
    return {
      users: result.sources,
      totalPages: result.totalPages,
      pageIndex: result.pageIndex,
      hasPreviousPage: result.hasPreviousPage,
      hasNextPage: result.hasNextPage
    }
  })
}

function* getUserSaga(params) {
  try {
    const payload = yield call(() => getUsers(params.payload.params));
    yield put({ type: GET_USERS_SUCCESS, payload })
  } catch (error) {
    yield put({ type: GET_USERS_FAIL, error })
  }
}

export function* watchUserSagasAsync() {
  yield takeLatest(GET_USERS, getUserSaga);
}