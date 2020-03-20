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
      icon: "fa fa-balance-scale",
      children: [
        {
          name: "NCKH các cấp",
          url: "/scientificWorks",
          icon: "fa fa-angle-right"
        },
        {
          name: "NCKH cấp Nhà Nước",
          url: "/NCKHCapNhaNuoc",
          icon: "fa fa-angle-right"
        },
        {
          name: "NCKH cấp Bộ",
          url: "/NCKHCapBo",
          icon: "fa fa-angle-right"
        },
        {
          name: "NCKH cấp ĐHĐN",
          url: "/NCKHCapDHDN",
          icon: "fa fa-angle-right"
        },
        {
          name: "NCKH cấp Trường",
          url: "/NCKHCapTruong",
          icon: "fa fa-angle-right"
        }
      ]
    },
    {
      name: "Bài báo - Báo cáo",
      icon: "fa fa-file-text",
      children: [
        {
          name: "Bài báo-Báo cáo",
          url: "/scientificReports",
          icon: "fa fa-angle-right"
        },
        {
          name: "Trong nước",
          url: "/BaoCaoKHTrongNuoc",
          icon: "fa fa-angle-right"
        },
        {
          name: "Quốc tế",
          url: "/BaoCaoKHQuocTe",
          icon: "fa fa-angle-right"
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
    },
    {
      name: "Admin",
      url: "http://localhost:4000/login",
      icon: "icon-star"
    }
  ]
};
