import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, FormGroup, Label, Input, Table } from "reactstrap";
import Form from "react-validation/build/form";
import Datetime from "react-datetime";
import moment from "moment";
import ModalConfirm from "../../../components/modal/modal-confirm";
import Pagination from "../../../components/pagination/Pagination";
import ModalInfo from "../../../components/modal/modal-info";
import ValidationInput from "../../../components/common/validation-input";
import { toastSuccess, toastError } from "../../../helpers/toast.helper";
import lodash from "lodash";
import { getLecturerList } from "../../../actions/lecturer.list.action";
import ApiLecturer from "../../../api/api.lecturer";
import { pagination } from "../../../constant/app.constant";
import faculty from "../../../constant/faculty";
import "../../../pages/admin/select-custom.css";

class LecturerDetailPage extends Component {
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

  

  onModelChange = el => {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let item = Object.assign({}, this.state.item);
    item[inputName] = inputValue;
    this.setState({ item });
    console.log(item);
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

  

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.saveLecturer();
  }

  

  componentDidMount() {
    this.getLecturerList();
  }

  render() {
    const { isShowDeleteModal, isShowInfoModal, item } = this.state;
    const { lecturerPagedList } = this.props.lecturerPagedListReducer;
    const { sources, pageIndex, totalPages } = lecturerPagedList;
    console.log(sources);
    const hasResults =
      lecturerPagedList.sources && lecturerPagedList.sources.length > 0;
    return (
      <div className="animated fadeIn">
        <ModalConfirm
          clickOk={this.deleteLecturer}
          isShowModal={isShowDeleteModal}
          toggleModal={this.toggleDeleteModal}
        />

      

        <Row>
          <Col xs="12">
            <div className="flex-container header-table">
              <Button
                onClick={this.showAddNew}
                className="btn btn-pill btn-success btn-sm"
              >
                Tạo mới
              </Button>
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
                  <th>Thao tác</th>
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
                        <td>
                          <Button
                            className="btn-sm"
                            color="secondary"
                            onClick={() => this.showUpdateModal(item)}
                          >
                            Sửa
                          </Button>
                          <Button
                            className="btn-sm"
                            color="danger"
                            onClick={() => this.showConfirmDelete(item.id)}
                          >
                            Xóa
                          </Button>
                        </td>
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
