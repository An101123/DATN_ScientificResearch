import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_ROLES,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAIL,
} from "../actions/role.action";
import {
  URL_ENPOINTS
} from "../constant"
import request from "../helpers/request.helper";

const getRoles = params => {
  let url = URL_ENPOINTS.ROLE
  return request.get(url, params).then(result => {
    let roles = [];
    result.sources.map(item => {
      roles.push({ value: item.id, label: item.name })
    })
    return {
      roles: roles,
      totalPages: result.totalPages,
      pageIndex: result.pageIndex,
      hasPreviousPage: result.hasPreviousPage,
      hasNextPage: result.hasNextPage
    }
  })
}

function* getRoleSaga(params) {
  try {
    const payload = yield call(() => getRoles(params.payload.params));
    yield put({ type: GET_ROLES_SUCCESS, payload })
  } catch (error) {
    yield put({ type: GET_ROLES_FAIL, error })
  }
}

export function* watchRoleSagasAsync() {
  yield takeLatest(GET_ROLES, getRoleSaga);
}