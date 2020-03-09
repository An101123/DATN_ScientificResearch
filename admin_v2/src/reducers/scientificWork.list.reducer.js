import {
    GET_SCIENTIFICWORK_LIST,
    GET_SCIENTIFICWORK_LIST_SUCCESS,
    GET_SCIENTIFICWORK_LIST_FAILED
  } from "../actions/scientificWork.list.action";
  
  const initialState = {
    scientificWorkPagedList: {},
    loading: false,
    failed: false
  };
  
  export function scientificWorkListReducer(state = initialState, action) {
    switch (action.type) {
      case GET_SCIENTIFICWORK_LIST:
        return Object.assign({}, state, {
          loading: true,
          failed: false
        });
      case GET_SCIENTIFICWORK_LIST_SUCCESS:
        return Object.assign({}, state, {
          scientificWorkPagedList: action.payload,
          loading: false,
          failed: false
        });
      case GET_SCIENTIFICWORK_LIST_FAILED:
        return Object.assign({}, state, {
          loading: false,
          failed: true
        });
      default:
        return state;
    }
  }