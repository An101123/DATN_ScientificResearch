export const GET_USERS = "[USER] GET_USERS";
export const GET_USERS_SUCCESS = "[USER] GET_USERS_SUCCESS";
export const GET_USERS_FAIL = "[USER] GET_USERS_FAIL";

export const getUsers = params => {
    return {
      type: GET_USERS,
      payload: {
        params
      }
    }
}