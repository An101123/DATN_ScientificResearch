import { combineReducers } from "redux";
import { userListReducer } from "./user.list.reducer";
import { profileReducer } from "./profile.reducer";
import { levelListReducer } from "./level.list.reducer";
import { scientificReportTypeListReducer } from "./scientificReportType.list.reducer";
import { lecturerListReducer } from "./lecturer.list.reducer";
import { scientificWorkListReducer } from "./scientificWork.list.reducer";
import { scientificReportListReducer } from "./scientificReport.list.reducer";
import { newsListReducer } from "./news.list.reducer";

export default combineReducers({
  userPagedListReducer: userListReducer,
  profileReducer: profileReducer,
  levelPagedListReducer: levelListReducer,
  scientificReportTypePagedListReducer: scientificReportTypeListReducer,
  lecturerPagedListReducer: lecturerListReducer,
  scientificWorkPagedListReducer: scientificWorkListReducer,
  scientificReportPagedListReducer: scientificReportListReducer,
  newsPagedListReducer: newsListReducer
});
