import {
    GET_LECTURER_LIST,
    GET_LECTURER_LIST_SUCCESS,
    GET_LECTURER_LIST_FAILED
  } from "../actions/lecturer.list.action";
  
  const initialState = {
    lecturerPagedList: {},
    loading: false,
    failed: false
  };
  
  export function lecturerListReducer(state = initialState, action) {
    switch (action.type) {
      case GET_LECTURER_LIST:
        return Object.assign({}, state, {
          loading: true,
          failed: false
        });
      case GET_LECTURER_LIST_SUCCESS:
        return Object.assign({}, state, {
          lecturerPagedList: action.payload,
          loading: false,
          failed: false
        });
      case GET_LECTURER_LIST_FAILED:
        return Object.assign({}, state, {
          loading: false,
          failed: true
        });
      default:
        return state;
    }
  }