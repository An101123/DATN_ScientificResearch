import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiNews {
  static getAllNews() {
    return RequestHelper.get(appConfig.apiUrl + "news/all");
  }

  static getNewsList(params) {
    return RequestHelper.get(appConfig.apiUrl + "news", params);
  }

  static postNews(news) {
    return RequestHelper.post(appConfig.apiUrl + "news", news);
  }

  static updateNews(news) {
    return RequestHelper.put(appConfig.apiUrl + `news/${news.id}`, news);
  }

  static deleteNews(newsId) {
    return RequestHelper.delete(appConfig.apiUrl + `news/${newsId}`);
  }
}
