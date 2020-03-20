import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Pagination from "../../../components/pagination/Pagination";
import lodash from "lodash";
import { getScientificReportList } from "../../../actions/scientificReport.list.action";
import { pagination } from "../../../constant/app.constant";
import ApiScientificReportType from "../../../api/api.scientificReportType";
import ApiLecturer from "../../../api/api.lecturer";
import "../../../pages/admin/select-custom.css";
import "../Dashboard/dashboard.css";
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

class ScientificReportListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDeleteModal: false,
      isShowInfoModal: false,
      item: {},
      itemId: null,
      scientificReportTypes: [],
      lecturers: [],
      params: {
        skip: pagination.initialPage,
        take: pagination.defaultTake
      },
      query: ""
    };
    this.delayedCallback = lodash.debounce(this.search, 300);
  }

  search = e => {
    this.setState(
      {
        params: {
          ...this.state.params,
          skip: 1
        },
        query: e.target.value
      },
      () => {
        this.getScientificReportList();
      }
    );
  };

  onSearchChange = e => {
    e.persist();
    this.delayedCallback(e);
  };

  handlePageClick = e => {
    this.setState(
      {
        params: {
          ...this.state.params,
          skip: e.selected + 1
        }
      },
      () => this.getScientificReportList()
    );
  };

  getScientificReportList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getScientificReportList(params);
  };

  getScientificReportTypeList = () => {
    ApiScientificReportType.getAllScientificReportType().then(values => {
      this.setState({ scientificReportTypes: values });
    });
  };

  getLecturerList = () => {
    ApiLecturer.getAllLecturer().then(values => {
      this.setState({ lecturers: values });
    });
  };

  componentDidMount() {
    this.getScientificReportList();
    this.getScientificReportTypeList();
    this.getLecturerList();
  }

  render() {
    const {
      scientificReportPagedList
    } = this.props.scientificReportPagedListReducer;
    const { sources, pageIndex, totalPages } = scientificReportPagedList;
    const hasResults =
      scientificReportPagedList.sources &&
      scientificReportPagedList.sources.length > 0;
    return (
      <div className="animated fadeIn">
        <Row>
          <CardBody>
            <img
              src="https://due.udn.vn/portals/_default/skins/dhkt/img/front/logo.png"
              alt="logochichido"
            />
          </CardBody>
        </Row>
        <Row className="nckh">
          <Col xs="12">
            <div className="flex-container header-table">
              <Label className="label label-default">
                BÀI BÁO, BÁO CÁO KHOA HỌC{" "}
              </Label>
              <input
                onChange={this.onSearchChange}
                className="form-control form-control-sm"
                placeholder="Tìm kiếm..."
              />
            </div>
            <Table className="admin-table" responsive bordered>
              <thead>
                <tr>
                  <th>Bài báo - Báo cáo khoa học</th>
                  <th>Thời gian</th>
                  <td>Nội dung</td>
                  <td>Loại</td>
                  <td>Giảng viên</td>
                </tr>
              </thead>
              <tbody>
                {hasResults &&
                  sources.map(item => {
                    return (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>
                          {moment(item.time)
                            .add(7, "h")
                            .format("DD-MM-YYYY")}
                        </td>
                        <td>{item.content}</td>
                        <td>{item.scientificReportType.name}</td>
                        <td>{item.lecturer.name}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            {hasResults && totalPages > 1 && (
              <Pagination
                initialPage={0}
                totalPages={totalPages}
                forcePage={pageIndex - 1}
                pageRangeDisplayed={2}
                onPageChange={this.handlePageClick}
              />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  state => ({
    scientificReportPagedListReducer: state.scientificReportPagedListReducer
  }),
  {
    getScientificReportList
  }
)(ScientificReportListPage);
