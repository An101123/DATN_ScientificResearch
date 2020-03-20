import { 
  GET_ROLES,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAIL
 } from "../actions/role.action";

const initState = {
  roles: [],
  role: null,
  totalPages: 0,
  pageIndex: 1,
  hasPreviousPage: false,
  hasNextPage: true,
  message: 'No request',
  fetching: false,
  fetched: false,
  error: '',
};

export default function roleReducer(state = initState, action) {
  switch (action.type) {
    case GET_ROLES:
      return Object.assign({}, state, {
        fetching: true,
        message: 'Loading...'
      });
    case GET_ROLES_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        message: 'Done',
        pageIndex: action.payload.pageIndex,
        totalPages: action.payload.totalPages,
        hasPreviousPage: action.payload.hasPreviousPage ? action.payload.hasPreviousPage : false,
        hasNextPage: action.payload.hasNextPage ? action.payload.hasNextPage : false,
        roles: action.payload.roles,
      });
    case GET_ROLES_FAIL:
      return Object.assign({}, state, {
        fetching: false,
        message: 'Failed',
        error: action.payload.error,
      });
    default:
      return state;
  }
}