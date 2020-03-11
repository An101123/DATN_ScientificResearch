import { CATEGORIES, BILL_STATUS } from "../constant";
import moment from "moment";
import AppConfig from "../config";

export default class FunctionsHelper {
    static convertCategoryByCode (code) {
        switch (code) {
            case CATEGORIES.VEGETABLES: return "Rau";
            case CATEGORIES.TUBER: return "Củ";
            case CATEGORIES.FRUIT: return "Quả";
            default: return "";
        }
    }
    static convertBillStatusByCode (code) {
        switch (code) {
            case BILL_STATUS.CONFIRMED: return "Đã xác nhận";
            case BILL_STATUS.PREPARING: return "Đang chuẩn bị";
            case BILL_STATUS.SHIPPING: return "Đang vận chuyển";
            case BILL_STATUS.COMPLETED: return "Hoàn thành";
            case BILL_STATUS.REJECTED: return "Đã hủy";
            default: return "";
        }
    }
    static dateTimeToString (date, format) {
        if (!date) {
            return "";
        }
        if (!format) {
            return moment(date).format(AppConfig.dateTimeDisplayFormat);
        }
        return moment(date).format(format);
    }
}