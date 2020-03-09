import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiScientificReportType {
  static getAllScientificReportType() {
    return RequestHelper.get(appConfig.apiUrl + "scientificReportTypes/all");
  }

  static getScientificReportTypeList(params) {
    return RequestHelper.get(
      appConfig.apiUrl + "scientificReportTypes",
      params
    );
  }

  static postScientificReportType(scientificReportType) {
    return RequestHelper.post(
      appConfig.apiUrl + "scientificReportTypes",
      scientificReportType
    );
  }

  static updateScientificReportType(scientificReportType) {
    return RequestHelper.put(
      appConfig.apiUrl + `scientificReportTypes/${scientificReportType.id}`,
      scientificReportType
    );
  }

  static deleteScientificReportType(scientificReportTypeId) {
    return RequestHelper.delete(
      appConfig.apiUrl + `scientificReportTypes/${scientificReportTypeId}`
    );
  }
}
