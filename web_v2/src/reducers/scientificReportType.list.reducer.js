
import {
    GET_SCIENTIFICREPORTTYPE_LIST,
    GET_SCIENTIFICREPORTTYPE_LIST_SUCCESS,
    GET_SCIENTIFICREPORTTYPE_LIST_FAILED
  } from "../actions/scientificReportType.list.action";
  
  const initialState = {
    scientificReportTypePagedList: {},
    loading: false,
    failed: false
  };
  
  export function scientificReportTypeListReducer(state = initialState, action) {
    switch (action.type) {
      case GET_SCIENTIFICREPORTTYPE_LIST:
        return Object.assign({}, state, {
          loading: true,
          failed: false
        });
      case GET_SCIENTIFICREPORTTYPE_LIST_SUCCESS:
        return Object.assign({}, state, {
          scientificReportTypePagedList: action.payload,
          loading: false,
          failed: false
        });
      case GET_SCIENTIFICREPORTTYPE_LIST_FAILED:
        return Object.assign({}, state, {
          loading: false,
          failed: true
        });
      default:
        return state;
    }
  }