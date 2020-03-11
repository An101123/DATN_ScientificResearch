import { 
  GET_TABLES,
  GET_TABLES_SUCCESS,
  GET_TABLES_FAIL
 } from "../actions/table.action";

const initState = {
  tables: [],
  table: null,
  message: 'No request',
  fetching: false,
  fetched: false,
  error: '',
};

export default function tableReducer(state = initState, action) {
  switch (action.type) {
    case GET_TABLES:
      return Object.assign({}, state, {
        fetching: true,
        message: 'Loading...'
      });
    case GET_TABLES_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        message: 'Done',
        tables: action.payload.tables,
      });
    case GET_TABLES_FAIL:
      return Object.assign({}, state, {
        fetching: false,
        message: 'Failed',
        error: action.payload.error,
      });
    default:
      return state;
  }
}