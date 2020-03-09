import {
    GET_LEVEL_LIST,
    GET_LEVEL_LIST_SUCCESS,
    GET_LEVEL_LIST_FAILED
  } from "../actions/level.list.action";
  
  const initialState = {
    levelPagedList: {},
    loading: false,
    failed: false
  };
  
  export function levelListReducer(state = initialState, action) {
    switch (action.type) {
      case GET_LEVEL_LIST:
        return Object.assign({}, state, {
          loading: true,
          failed: false
        });
      case GET_LEVEL_LIST_SUCCESS:
        return Object.assign({}, state, {
          levelPagedList: action.payload,
          loading: false,
          failed: false
        });
      case GET_LEVEL_LIST_FAILED:
        return Object.assign({}, state, {
          loading: false,
          failed: true
        });
      default:
        return state;
    }
  }