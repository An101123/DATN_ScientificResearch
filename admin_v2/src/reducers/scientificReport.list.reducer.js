import {
    GET_SCIENTIFICREPORT_LIST,
    GET_SCIENTIFICREPORT_LIST_SUCCESS,
    GET_SCIENTIFICREPORT_LIST_FAILED
  } from "../actions/scientificReport.list.action";
  
  const initialState = {
    scientificReportPagedList: {},
    loading: false,
    failed: false
  };
  
  export function scientificReportListReducer(state = initialState, action) {
    switch (action.type) {
      case GET_SCIENTIFICREPORT_LIST:
        return Object.assign({}, state, {
          loading: true,
          failed: false
        });
      case GET_SCIENTIFICREPORT_LIST_SUCCESS:
        return Object.assign({}, state, {
          scientificReportPagedList: action.payload,
          loading: false,
          failed: false
        });
      case GET_SCIENTIFICREPORT_LIST_FAILED:
        return Object.assign({}, state, {
          loading: false,
          failed: true
        });
      default:
        return state;
    }
  }