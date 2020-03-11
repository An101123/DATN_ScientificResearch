import { 
  GET_FLOORS,
  GET_FLOORS_SUCCESS,
  GET_FLOORS_FAIL
 } from "../actions/floor.action";

const initState = {
  floors: [],
  floor: null,
  fetching: false,
  fetched: false,
  error: '',
};

export default function floorReducer(state = initState, action) {
  switch (action.type) {
    case GET_FLOORS:
      return Object.assign({}, state, {
        fetching: true,
        message: 'Loading...'
      });
    case GET_FLOORS_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        message: 'Done',
        floors: action.payload.floors,
      });
    case GET_FLOORS_FAIL:
      return Object.assign({}, state, {
        fetching: false,
        message: 'Failed',
        error: action.payload.error,
      });
    default:
      return state;
  }
}