import RequestHelper from "../helpers/request.helper";
import { appConfig } from "../config/app.config";

export default class UserApi {
  static getAllUser() {
    return RequestHelper.get(appConfig.apiUrl + "users/all-users");
  }
  static getUserList(params) {
    return RequestHelper.get(appConfig.apiUrl + "users", params);
  }

  static postUser(user) {
    return RequestHelper.post(appConfig.apiUrl + "users", user);
  }

  static updateUser(user) {
    return RequestHelper.put(appConfig.apiUrl + `users/${user.id}`, user);
  }

  static deleteUser(userId) {
    return RequestHelper.delete(appConfig.apiUrl + `users/${userId}`);
  }
}
