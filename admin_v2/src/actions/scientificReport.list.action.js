export const GET_SCIENTIFICREPORT_LIST =
  "[SCIENTIFICREPORT_LIST] GET_SCIENTIFICREPORT_LIST";
export const GET_SCIENTIFICREPORT_LIST_SUCCESS =
  "[SCIENTIFICREPORT_LIST] GET_SCIENTIFICREPORT_LIST_SUCCESS";
export const GET_SCIENTIFICREPORT_LIST_FAILED =
  "[SCIENTIFICREPORT_LIST] GET_SCIENTIFICREPORT_LIST_FAILED";

export const getScientificReportList = params => {
  return {
    type: GET_SCIENTIFICREPORT_LIST,
    payload: {
      params
    }
  };
};

export const getScientificReportListSuccess = params => {
  return {
    type: GET_SCIENTIFICREPORT_LIST_SUCCESS,
    payload: params
  };
};

export const getScientificReportListFailed = () => {
  return {
    type: GET_SCIENTIFICREPORT_LIST_FAILED
  };
};
