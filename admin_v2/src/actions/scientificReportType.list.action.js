export const GET_SCIENTIFICREPORTTYPE_LIST = "[SCIENTIFICREPORTTYPE_LIST] GET_SCIENTIFICREPORTTYPE_LIST";
export const GET_SCIENTIFICREPORTTYPE_LIST_SUCCESS =
  "[SCIENTIFICREPORTTYPE_LIST] GET_SCIENTIFICREPORTTYPE_LIST_SUCCESS";
export const GET_SCIENTIFICREPORTTYPE_LIST_FAILED =
  "[SCIENTIFICREPORTTYPE_LIST] GET_SCIENTIFICREPORTTYPE_LIST_FAILED";

export const getScientificReportTypeList = (params) =>{
    return {
        type : GET_SCIENTIFICREPORTTYPE_LIST,
        payload : {
            params
        }
    }
}

export const getScientificReportTypeListSuccess = params =>{
    return {
        type : GET_SCIENTIFICREPORTTYPE_LIST_SUCCESS,
        payload : params
    }
}

export const getScientificReportTypeListFailed = () =>{
    return {
        type : GET_SCIENTIFICREPORTTYPE_LIST_FAILED
    }
}