export const GET_SCIENTIFICWORK_LIST = "[SCIENTIFICWORK_LIST] GET_SCIENTIFICWORK_LIST";
export const GET_SCIENTIFICWORK_LIST_SUCCESS =
  "[SCIENTIFICWORK_LIST] GET_SCIENTIFICWORK_LIST_SUCCESS";
export const GET_SCIENTIFICWORK_LIST_FAILED =
  "[SCIENTIFICWORK_LIST] GET_SCIENTIFICWORK_LIST_FAILED";

export const getScientificWorkList = (params) =>{
    return {
        type : GET_SCIENTIFICWORK_LIST,
        payload : {
            params
        }
    }
}

export const getScientificWorkListSuccess = params =>{
    return {
        type : GET_SCIENTIFICWORK_LIST_SUCCESS,
        payload : params
    }
}

export const getScientificWorkListFailed = () =>{
    return {
        type : GET_SCIENTIFICWORK_LIST_FAILED
    }
}