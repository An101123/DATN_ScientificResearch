export default {
  items: [
    {
      name: "Trang chủ",
      url: "/dashboard",
      icon: "fa fa-fw fa-home",
      badge: {
        variant: "info",
        text: "NEW"
      }
    },

    {
      name: "Công trình khoa học",
      url: "/scientificWorks",
      icon: "fa fa-balance-scale",
      children: [
        {
          name: "NCKH các cấp",
          url: "/scientificWorks"
        },
        {
          name: "NCKH cấp Nhà Nước",
          url: "/scientificWorksNhaNuoc"
        },
        {
          name: "NCKH cấp Bộ",
          url: "/scientificWorksBo"
        },
        {
          name: "NCKH cấp ĐHĐN",
          url: "/scientificWorksDHDN"
        },
        {
          name: "NCKH cấp Trường",
          url: "/scientificWorksTruong"
        }
      ]
    },
    {
      name: "Bài báo - Báo cáo",
      url: "/scientificReports",
      icon: "fa fa-file-text",
      children: [
        {
          name: "Bài báo-Báo cáo",
          url: "/scientificReports"
        },
        {
          name: "Trong nước",
          url: "/scientificReportsTrongNuoc"
        },
        {
          name: "Quốc tế",
          url: "/scientificReportsQuocTe"
        }
      ]
    },
    {
      name: "Giảng viên",
      url: "/lecturers",
      icon: "fa fa-address-book"
    },
    {
      name: "Tin tức",
      url: "/news",
      icon: "fa fa-globe"
    }
  ]
};
