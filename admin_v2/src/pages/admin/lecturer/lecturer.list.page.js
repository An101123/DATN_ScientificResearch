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

  showConfirmDelete = itemId => {
    this.setState(
      {
        itemId: itemId
      },
      () => this.toggleDeleteModal()
    );
  };

  showAddNew = () => {
    let title = "Tạo mới giảng viên";
    let lecturer = {
      name: "",
      faculty: "",
      dateOfBirth: null
    };
    this.toggleModalInfo(lecturer, title);
  };

  showUpdateModal = item => {
    let title = "Chỉnh sửa giảng viên";
    this.toggleModalInfo(item, title);
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

  addLecturer = async () => {
    console.log("state ==================");
    console.log(this.state);
    const { name, faculty, dateOfBirth } = this.state.item;
    const lecturer = { name, faculty, dateOfBirth };
    try {
      await ApiLecturer.postLecturer(lecturer);
      this.toggleModalInfo();
      this.getLecturerList();
      toastSuccess("Tạo mới thành công");
    } catch (err) {
      toastError(err);
    }
  };

  updateLecturer = async () => {
    const { id, name, faculty, dateOfBirth } = this.state.item;
    const lecturer = { id, name, faculty, dateOfBirth };
    try {
      await ApiLecturer.updateLecturer(lecturer);
      this.toggleModalInfo();
      this.getLecturerList();
      toastSuccess("Chỉnh sửa thành công");
    } catch (err) {
      toastError(err);
    }
  };

  deleteLecturer = async () => {
    try {
      await ApiLecturer.deleteLecturer(this.state.itemId);
      this.toggleDeleteModal();
      this.getLecturerList();
      toastSuccess("Xóa thành công");
    } catch (err) {
      toastError(err);
    }
  };

  saveLecturer = () => {
    let { id } = this.state.item;
    if (id) {
      this.updateLecturer();
    } else {
      this.addLecturer();
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.saveLecturer();
  }

  onDateOfBirthChange = el => {
    let inputValue = el._d;
    let item = Object.assign({}, this.state.item);
    item["dateOfBirth"] = inputValue;
    this.setState({ item });
  };

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

        <ModalInfo
          title={this.state.formTitle}
          isShowModal={isShowInfoModal}
          hiddenFooter
        >
          <div className="modal-wrapper">
            <div className="form-wrapper">
              <Form
                onSubmit={e => this.onSubmit(e)}
                ref={c => {
                  this.form = c;
                }}
              >
                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="name"
                        title="Tên"
                        type="text"
                        required={true}
                        value={item.name}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="examplePassword"> Ngày sinh </Label>
                      <Datetime
                        defaultValue={
                          item.dateOfBirth
                            ? moment(item.dateOfBirth)
                                .add(7, "h")
                                .format("DD-MM-YYYY")
                            : ""
                        }
                        dateFormat="DD-MM-YYYY"
                        timeFormat=""
                        onChange={this.onDateOfBirthChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Label>Khoa</Label>{" "}
                    <FormGroup>
                      <div>
                        <select
                          className="select-custom"
                          name="faculty"
                          required={true}
                          onChange={this.onModelChange}
                          value={this.state.faculty}
                        >
                          {faculty.FACULTY.map(item => {
                            return (
                              <option value={item.name}>{item.name}</option>
                            );
                          })}
                        </select>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>

                <div className="text-center">
                  <Button color="danger" type="submit">
                    Xác nhận
                  </Button>{" "}
                  <Button color="secondary" onClick={this.toggleModalInfo}>
                    Hủy bỏ
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </ModalInfo>

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
