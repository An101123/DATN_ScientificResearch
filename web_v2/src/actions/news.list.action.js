export const GET_NEWS_LIST = "[NEWS_LIST] GET_NEWS_LIST";
export const GET_NEWS_LIST_SUCCESS =
  "[NEWS_LIST] GET_NEWS_LIST_SUCCESS";
export const GET_NEWS_LIST_FAILED =
  "[NEWS_LIST] GET_NEWS_LIST_FAILED";

export const getNewsList = (params) =>{
    return {
        type : GET_NEWS_LIST,
        payload : {
            params
        }
    }
}

export const getNewsListSuccess = params =>{
    return {
        type : GET_NEWS_LIST_SUCCESS,
        payload : params
    }
}

export const getNewsListFailed = () =>{
    return {
        type : GET_NEWS_LIST_FAILED
    }
}