import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Pagination from "../../../components/pagination/Pagination";
import lodash from "lodash";
import { getScientificWorkList } from "../../../actions/scientificWork.list.action";
import { pagination } from "../../../constant/app.constant";
import ApiLevel from "../../../api/api.level";
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

class ScientificWorkListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDeleteModal: false,
      isShowInfoModal: false,
      item: {},
      itemId: null,
      levels: [],
      lecturers: [],
      scientificWorks: [],
      params: {
        skip: pagination.initialPage,
        take: pagination.defaultTake
      },
      query: ""
    };
    this.delayedCallback = lodash.debounce(this.search, 300);
  }

  toggleDeleteModal = () => {
    this.setState(prevState => ({
      isShowDeleteModal: !prevState.isShowDeleteModal
    }));
  };

  toggleModalInfo = (item, title) => {
    this.setState(prevState => ({
      isShowInfoModal: !prevState.isShowInfoModal,
      item: item || {},
      formTitle: title
    }));
  };

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
        this.getScientificWorkList();
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
      () => this.getScientificWorkList()
    );
  };

  getScientificWorkList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getScientificWorkList(params);
  };

  getLevelList = () => {
    ApiLevel.getAllLevel().then(values => {
      this.setState({ levels: values });
    });
  };

  getLecturerList = () => {
    ApiLecturer.getAllLecturer().then(values => {
      this.setState({ lecturers: values });
    });
  };

  getScientificWorksListById = async levelId => {
    var list = await ApiLevel.getScientificWorksByLevel(levelId);
    this.setState({ scientificWorks: list });
  };

  componentDidMount() {
    this.getScientificWorkList();
    this.getLevelList();
    this.getLecturerList();
  }

  render() {
    const {
      isShowDeleteModal,
      isShowInfoModal,
      item,
      itemId,
      levels,
      lecturers,
      scientificWorks
    } = this.state;
    const {
      scientificWorkPagedList
    } = this.props.scientificWorkPagedListReducer;
    const { sources, pageIndex, totalPages } = scientificWorkPagedList;
    const hasResults =
      scientificWorkPagedList.sources &&
      scientificWorkPagedList.sources.length > 0;
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
        {/* <Row className="gioithieu">
          {levels.length > 0 &&
            levels.map(level => {
              return (
                <Col xs="12" sm="6" lg="3">
                  <Card className="text-white bg-primary">
                    <CardBody className="pb-0">
                      <h4 className="mb-0">.823</h4>
                      <p> NCKH Cấp {level.name}</p>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
        </Row> */}
        <Row className="nckh">
          <Col xs="12">
            <div className="flex-container header-table">
              <Label className="label label-default">
                NGHIÊN CỨU KHOA HỌC CÁC CẤP
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
                  <th>Công trình khoa học</th>
                  <th>Thời gian</th>
                  <th>Nội dung</th>
                  <th>Cấp</th>
                  <th>Giảng viên</th>
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
                        <td>{item.level.name}</td>
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
    scientificWorkPagedListReducer: state.scientificWorkPagedListReducer
  }),
  {
    getScientificWorkList
  }
)(ScientificWorkListPage);
