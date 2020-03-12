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
          url: "/scientificWorks"
        },
        {
          name: "NCKH cấp Nhà Nước",
          url: "/NCKHCapNhaNuoc"
        },
        {
          name: "NCKH cấp Bộ",
          url: "/NCKHCapBo"
        },
        {
          name: "NCKH cấp ĐHĐN",
          url: "/NCKHCapDHDN"
        },
        {
          name: "NCKH cấp Trường",
          url: "/NCKHCapTruong"
        }
      ]
    },
    {
      name: "Bài báo - Báo cáo",
      icon: "fa fa-file-text",
      children: [
        {
          name: "Bài báo-Báo cáo",
          url: "/scientificReports"
        },
        {
          name: "Trong nước",
          url: "/BaoCaoKHTrongNuoc"
        },
        {
          name: "Quốc tế",
          url: "/BaoCaoKHQuocTe"
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
