import React from "react";

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

const LevelNhaNuocListPage = React.lazy(() =>
  import("./pages/admin/scientificWork/levelNhaNuoc.list.page")
);

const LevelBoListPage = React.lazy(() =>
  import("./pages/admin/scientificWork/levelBo.list.page")
);

const LevelDHDNListPage = React.lazy(() =>
  import("./pages/admin/scientificWork/levelDHDN.list.page")
);

const LevelTruongListPage = React.lazy(() =>
  import("./pages/admin/scientificWork/levelTruong.list.page")
);

const TrongNuocListPage = React.lazy(() =>
  import("./pages/admin/scientificReport/trongNuoc.list.page")
);

const QuocTeListPage = React.lazy(() =>
  import("./pages/admin/scientificReport/quocTe.list.page")
);
const routes = [
  // {
  //   path: "/",
  //   exact: true,
  //   name: "Admin",
  //   component: DefaultLayout
  // },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/levels", name: "Cấp", component: LevelListPage },
  { path: "/lecturers", name: "Giảng viên", component: LecturerListPage },
  {
    path: "/scientificWorks",
    name: "Công trình khoa học",
    component: ScientificWorkListPage
  },
  {
    path: "/scientificWorksNhaNuoc",
    name: "NCKH cấp Nhà Nước",
    component: LevelNhaNuocListPage
  },
  {
    path: "/scientificWorksBo",
    name: "NCKH cấp Bộ",
    component: LevelBoListPage
  },
  {
    path: "/scientificWorksDHDN",
    name: "NCKH cấp ĐHĐN",
    component: LevelDHDNListPage
  },
  {
    path: "/scientificWorksTruong",
    name: "NCKH cấp Trường",
    component: LevelTruongListPage
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
    path: "/scientificReportsTrongNuoc",
    name: "Trong nước",
    component: TrongNuocListPage
  },
  {
    path: "/scientificReportsQuocTe",
    name: "Quốc tế",
    component: QuocTeListPage
  },

  {
    path: "/news",
    name: "Tin tức",
    component: NewsListPage
  }
];

export default routes;
