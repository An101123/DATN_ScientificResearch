import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiScientificReport {
  static getScientificReports(params) {
    return RequestHelper.get(appConfig.apiUrl + "scientificReports", params);
  }

  static postScientificReport(scientificReport) {
    return RequestHelper.post(
      appConfig.apiUrl + "scientificReports",
      scientificReport
    );
  }

  static updateScientificReport(scientificReport) {
    return RequestHelper.put(
      appConfig.apiUrl + `scientificReports/${scientificReport.id}`,
      scientificReport
    );
  }

  static deleteScientificReport(scientificReportId) {
    return RequestHelper.delete(
      appConfig.apiUrl + `scientificReports/${scientificReportId}`
    );
  }
}
