import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import { getNewsList } from "../../../../actions/news.list.action";
import Pagination from "../../../../components/pagination/Pagination";
import lodash from "lodash";
import ApiNews from "../../../../api/api.news";
import { Zoom } from "react-slideshow-image";
import "../../Dashboard/dashboard.css";
import {
  Badge,
  Row,
  Col,
  Progress,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Button,
  ButtonToolbar,
  ButtonGroup,
  ButtonDropdown,
  Label,
  Input,
  Table
} from "reactstrap";

const images = [
  "https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-9/78038434_1760512070749488_9128787880515207168_o.jpg?_nc_cat=100&_nc_sid=8024bb&_nc_ohc=nL_mZDKG_XEAX9BO-nF&_nc_ht=scontent-hkg3-1.xx&oh=766f4fe9030518a996e576e80c49545a&oe=5E9AF405",
  "https://due.udn.vn/Portals/0/Editor/TruyenThong_DUE/Nam%202019%202/Quy%204/Giai%203%20NCKH%20TP/Giai3NCKHcapTP2019.jpg"
];
const zoomOutProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  scale: 0.4,
  arrows: true
};

class TrangChu extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  getNewsList = () => {
    ApiNews.getAllNews().then(values => {
      this.setState({ news: values });
    });
  };

  componentDidMount() {
    this.getNewsList();
  }
  render() {
    return (
      <div className="slide-container">
        <Zoom {...zoomOutProperties}>
          {images.map((each, index) => (
            <img key={index} style={{ width: "100%" }} src={each} />
          ))}
        </Zoom>
      </div>
    );
  }
}
export default TrangChu;
