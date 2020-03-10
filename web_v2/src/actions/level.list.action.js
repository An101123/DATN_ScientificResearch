export const GET_LEVEL_LIST = "[LEVEL_LIST] GET_LEVEL_LIST";
export const GET_LEVEL_LIST_SUCCESS =
  "[LEVEL_LIST] GET_LEVEL_LIST_SUCCESS";
export const GET_LEVEL_LIST_FAILED =
  "[LEVEL_LIST] GET_LEVEL_LIST_FAILED";

export const getLevelList = (params) =>{
    return {
        type : GET_LEVEL_LIST,
        payload : {
            params
        }
    }
}

export const getLevelListSuccess = params =>{
    return {
        type : GET_LEVEL_LIST_SUCCESS,
        payload : params
    }
}

export const getLevelListFailed = () =>{
    return {
        type : GET_LEVEL_LIST_FAILED
    }
}