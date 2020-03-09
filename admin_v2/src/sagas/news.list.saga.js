import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_NEWS_LIST,
  getNewsListSuccess,
  getNewsListFailed
} from "../actions/news.list.action";
import ApiNews from "../api/api.news";

function* getNewsList(action) {
  try {
    const payload = yield call(ApiNews.getNewsList, action.payload.params);
    console.log(payload);
    yield put(getNewsListSuccess(payload));
  } catch (error) {
    yield put(getNewsListFailed());
  }
}

export function* watchNewsListSagasAsync() {
  yield takeLatest(GET_NEWS_LIST, getNewsList);
}
