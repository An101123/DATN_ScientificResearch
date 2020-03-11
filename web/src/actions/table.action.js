export const GET_TABLES = "[TABLE] GET_TABLES";
export const GET_TABLES_SUCCESS = "[TABLE] GET_TABLES_SUCCESS";
export const GET_TABLES_FAIL = "[TABLE] GET_TABLES_FAIL";

export const getTables = params => {
    return {
      type: GET_TABLES,
      payload: {
        params
      }
    }
}