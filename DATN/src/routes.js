import React from "react";
import DefaultLayout from "./pages/admin/Admin";

const Dashboard = React.lazy(() => import("./pages/admin/Dashboard/Dashboard"));

const LevelListPage = React.lazy(() =>
  import("./pages/admin/level/level.list.page")
);

const LecturerListPage = React.lazy(() =>
  import("./pages/admin/lecturer/lecturer.list.page")
);

const ScientificWorkListPage = React.lazy(() =>
  import("./pages/admin/scientificWork/scientificWork.list.page")
);

const ScientificReportListPage = React.lazy(() =>
  import("./pages/admin/scientificReport/scientificReport.list.page")
);

const ScientificReportTypeListPage = React.lazy(() =>
  import("./pages/admin/scientificReportType/scientificReportType.list.page")
);

const NewsListPage = React.lazy(() =>
  import("./pages/admin/news/news.list.page")
);
const routes = [
  {
    path: "/",
    exact: true,
    name: "Admin",
    component: DefaultLayout
  },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/levels", name: "Cấp", component: LevelListPage },
  { path: "/lecturers", name: "Giảng viên", component: LecturerListPage },
  {
    path: "/scientificWorks",
    name: "Công trình khoa học",
    component: ScientificWorkListPage
  },
  {
    path: "/scientificReportTypes",
    name: "Loại Bài báo - Báo cáo",
    component: ScientificReportTypeListPage
  },
  {
    path: "/scientificReports",
    name: "Bài báo - Báo cáo",
    component: ScientificReportListPage
  },
  {
    path: "/news",
    name: "Tin tức",
    component: NewsListPage
  }
];

export default routes;
