export const GET_FLOORS = "[FLOOR] GET_FLOORS";
export const GET_TABLES_BY_FLOOR_ID = "[FLOOR] GET_TABLES_BY_FLOOR_ID";
export const GET_FLOORS_SUCCESS = "[FLOOR] GET_FLOORS_SUCCESS";
export const GET_FLOORS_FAIL = "[FLOOR] GET_FLOORS_FAIL";

export const getFloors = params => {
    return {
      type: GET_FLOORS,
      payload: {
        params
      }
    }
}

export const getTablesByFloorId = id => {
  return {
    type: GET_TABLES_BY_FLOOR_ID,
    id
  }
}