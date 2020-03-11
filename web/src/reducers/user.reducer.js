import { 
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL
 } from "../actions/user.action";

const initState = {
  users: [],
  user: null,
  totalPages: 0,
  pageIndex: 1,
  hasPreviousPage: false,
  hasNextPage: true,
  message: 'No request',
  fetching: false,
  fetched: false,
  error: '',
};

export default function userReducer(state = initState, action) {
  switch (action.type) {
    case GET_USERS:
      return Object.assign({}, state, {
        fetching: true,
        message: 'Loading...'
      });
    case GET_USERS_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        message: 'Done',
        pageIndex: action.payload.pageIndex,
        totalPages: action.payload.totalPages,
        hasPreviousPage: action.payload.hasPreviousPage ? action.payload.hasPreviousPage : false,
        hasNextPage: action.payload.hasNextPage ? action.payload.hasNextPage : false,
        users: action.payload.users,
      });
    case GET_USERS_FAIL:
      return Object.assign({}, state, {
        fetching: false,
        message: 'Failed',
        error: action.payload.error,
      });
    default:
      return state;
  }
}