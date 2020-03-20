import {
    GET_NEWS_LIST,
    GET_NEWS_LIST_SUCCESS,
    GET_NEWS_LIST_FAILED
  } from "../actions/news.list.action";
  
  const initialState = {
    newsPagedList: {},
    loading: false,
    failed: false
  };
  
  export function newsListReducer(state = initialState, action) {
    switch (action.type) {
      case GET_NEWS_LIST:
        return Object.assign({}, state, {
          loading: true,
          failed: false
        });
      case GET_NEWS_LIST_SUCCESS:
        return Object.assign({}, state, {
          newsPagedList: action.payload,
          loading: false,
          failed: false
        });
      case GET_NEWS_LIST_FAILED:
        return Object.assign({}, state, {
          loading: false,
          failed: true
        });
      default:
        return state;
    }
  }