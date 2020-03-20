import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiLevel {
  static getAllLevel() {
    return RequestHelper.get(appConfig.apiUrl + "levels/all");
  }

  static getLevelList(params) {
    return RequestHelper.get(appConfig.apiUrl + "levels", params);
  }

  static postLevel(level) {
    return RequestHelper.post(appConfig.apiUrl + "levels", level);
  }

  static updateLevel(level) {
    return RequestHelper.put(appConfig.apiUrl + `levels/${level.id}`, level);
  }

  static deleteLevel(levelId) {
    return RequestHelper.delete(appConfig.apiUrl + `levels/${levelId}`);
  }

  static getScientificWorksByLevel(levelId) {
    return RequestHelper.get(
      appConfig.apiUrl + `levels/${levelId}/scientificWorks`
    );
  }
}
