import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Pagination from "../../../components/pagination/Pagination";
import lodash from "lodash";
import { getLecturerList } from "../../../actions/lecturer.list.action";
import { pagination } from "../../../constant/app.constant";
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

class LecturerListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDeleteModal: false,
      isShowInfoModal: false,
      item: {},
      itemId: null,
      params: {
        skip: pagination.initialPage,
        take: pagination.defaultTake
      },
      query: ""
    };
    this.delayedCallback = lodash.debounce(this.search, 1);
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
        this.getLecturerList();
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
      () => this.getLecturerList()
    );
  };

  getLecturerList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    console.log(params);
    this.props.getLecturerList(params);
  };

  componentDidMount() {
    this.getLecturerList();
  }

  render() {
    const { lecturerPagedList } = this.props.lecturerPagedListReducer;
    const { sources, pageIndex, totalPages } = lecturerPagedList;
    console.log(sources);
    const hasResults =
      lecturerPagedList.sources && lecturerPagedList.sources.length > 0;
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
              <Label className="label label-default">GIẢNG VIÊN </Label>
              <input
                onChange={this.onSearchChange}
                className="form-control form-control-sm"
                placeholder="Tìm kiếm..."
              />
            </div>
            <Table className="admin-table" responsive bordered>
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Ngày sinh</th>
                  <th>Khoa</th>
                  <th>Tổng điểm</th>
                </tr>
              </thead>
              <tbody>
                {hasResults &&
                  sources.map(item => {
                    return (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>
                          {moment(item.dateOfBirth)
                            .add(7, "h")
                            .format("DD-MM-YYYY")}
                        </td>
                        <td>{item.faculty}</td>
                        <td>{item.total}</td>
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
    lecturerPagedListReducer: state.lecturerPagedListReducer
  }),
  {
    getLecturerList
  }
)(LecturerListPage);
