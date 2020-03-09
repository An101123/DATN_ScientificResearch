export const GET_LECTURER_LIST = "[LECTURER_LIST] GET_LECTURER_LIST";
export const GET_LECTURER_LIST_SUCCESS =
  "[LECTURER_LIST] GET_LECTURER_LIST_SUCCESS";
export const GET_LECTURER_LIST_FAILED =
  "[LECTURER_LIST] GET_LECTURER_LIST_FAILED";

export const getLecturerList = params => {
  return {
    type: GET_LECTURER_LIST,
    payload: {
      params
    }
  };
};

export const getLecturerListSuccess = params => {
  return {
    type: GET_LECTURER_LIST_SUCCESS,
    payload: params
  };
};

export const getLecturerListFailed = () => {
  return {
    type: GET_LECTURER_LIST_FAILED
  };
};
