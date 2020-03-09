import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiScientificWork {
  static getScientificWorks(params) {
    return RequestHelper.get(appConfig.apiUrl + "scientificWorks", params);
  }

  static postScientificWork(scientificWork) {
    return RequestHelper.post(
      appConfig.apiUrl + "scientificWorks",
      scientificWork
    );
  }

  static updateScientificWork(scientificWork) {
    return RequestHelper.put(
      appConfig.apiUrl + `scientificWorks/${scientificWork.id}`,
      scientificWork
    );
  }

  static deleteScientificWork(scientificWorkId) {
    return RequestHelper.delete(
      appConfig.apiUrl + `scientificWorks/${scientificWorkId}`
    );
  }
}
