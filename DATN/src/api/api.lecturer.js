import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiLecturer {
  static getAllLecturer() {
    return RequestHelper.get(appConfig.apiUrl + "lecturers/all");
  }

  static getLecturers(params) {
    return RequestHelper.get(appConfig.apiUrl + "lecturers", params);
  }

  static postLecturer(lecturer) {
    return RequestHelper.post(appConfig.apiUrl + "lecturers", lecturer);
  }

  static updateLecturer(lecturer) {
    return RequestHelper.put(
      appConfig.apiUrl + `lecturers/${lecturer.id}`,
      lecturer
    );
  }

  static deleteLecturer(lecturerId) {
    return RequestHelper.delete(appConfig.apiUrl + `lecturers/${lecturerId}`);
  }
}
