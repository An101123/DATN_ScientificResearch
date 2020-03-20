import axios from "axios";
import qs from "qs";
import AppConfig from "../config";

const instance = axios.create({
  timeout: 10000
});

export const handleError = error => {
  //eslint-disable-next-line
  if (error.response) {
    const message = error.response && error.response.data && error.response.data.message
    const arrayMessage = error.response && error.response.data
    if (message) {
      // eslint-disable-next-line
      return message
    }

    if (arrayMessage) {
      return arrayMessage
    }
  } else if (error.request) {
    //eslint-disable-next-line
    console.log('error.request', 'Network error!');
    return 'Network error!';
  } else {
    //eslint-disable-next-line
    console.log('An unknown error has occurred!')
    return 'An unknown error has occurred!';
  }
}


const baseUrl = AppConfig.baseUrlDev;

export default class RequestHelper {
  static async getHeader(contentType, xAccessToken) {
    if (contentType) {
        return {
          accept: "application/json",
          contentType: contentType,
        };
    }
    return {
      accept: "application/json",
      contentType: "application/json",
      "x-access-token": xAccessToken
    };
  }
  static async get(apiUrl, params) {
    const header = await this.getHeader();
    return instance
      .get(baseUrl + apiUrl, {
        headers: header,
        params,
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        }
      })
      .then((data) => {
        return data.data;
      })
      .catch(e => {
        handleError(e);
        throw e;
      });
  }
  static async post(apiUrl, data, contentType) {
    return instance({
        method: "post",
        url: baseUrl + apiUrl,
        headers: await this.getHeader(contentType),
        data: data
      })
      .then(data => {
        return data.data;
      })
      .catch(e => {
        handleError(e);
        throw e;
      });
  }
  static async put(apiUrl, data, xAccessToken) {
    console.log(xAccessToken)
    return instance({
      method: "put",
      url: baseUrl + apiUrl,
      headers: await this.getHeader(null, xAccessToken),
      data: data
    })
      .then(data => {
        return data.data;
      })
      .catch(e => {
        handleError(e);
        throw e;
      });
  }

  static async delete(apiUrl, params, xAccessToken) {
    return instance({
      method: "delete",
      url: baseUrl + apiUrl,
      headers: await this.getHeader(null, xAccessToken),
      params
    })
      .then(data => {
        return data.data;
      })
      .catch(e => {
        handleError(e);
        throw e;
      });
  }
}
