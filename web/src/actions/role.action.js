export const GET_ROLES = "[ROLE] GET_ROLES";
export const GET_ROLES_SUCCESS = "[ROLE] GET_ROLES_SUCCESS";
export const GET_ROLES_FAIL = "[ROLE] GET_ROLES_FAIL";

export const getRoles = params => {
    return {
      type: GET_ROLES,
      payload: {
        params
      }
    }
}