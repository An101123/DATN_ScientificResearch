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
import { getUserList } from "../../../actions/user.list.action";
import ApiUser from "../../../api/api.user";
import { pagination } from "../../../constant/app.constant";
import gender from "../../../constant/gender";
import "../../../pages/admin/select-custom.css";

class UserListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDeleteModal: false,
      isShowInfoModal: false,
      isConfirm: true,
      isChangePassword: false,
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
    let updatingItem = Object.assign({}, item);
    updatingItem.passwordConfirm = updatingItem.password;
    this.setState(prevState => ({
      isShowInfoModal: !prevState.isShowInfoModal,
      item: updatingItem || {},
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
    let title = "Tạo mới tài khoản";
    let user = {
      username: "",
      password: "",
      passwordConfirm: "",
      fullName: "",
      email: "",
      gender: "",
      dateOfBirth: null
    };
    this.setState({ isConfirm: true, isChangePassword: false });
    this.toggleModalInfo(user, title);
  };

  showUpdateModal = item => {
    let title = "Chỉnh sửa tài khoản";
    this.setState({ isChangePassword: false });
    this.toggleModalInfo(item, title);
  };

  showChangePassword = item => {
    let title = "Đổi mật khẩu";
    this.setState({ isChangePassword: true });
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
        this.getUserList();
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
      () => this.getUserList()
    );
  };

  getUserList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    console.log(params);
    this.props.getUserList(params);
  };

  addUser = async () => {
    const {
      username,
      password,
      passwordConfirm,
      fullName,
      email,
      gender,
      dateOfBirth
    } = this.state.item;
    if (password !== passwordConfirm) {
      this.setState({ isConfirm: false });
    } else {
      this.setState({ isConfirm: true });
      const user = {
        username,
        password,
        fullName,
        email,
        gender,
        dateOfBirth
      };
      try {
        await ApiUser.postUser(user);
        this.toggleModalInfo();
        this.getUserList();
        toastSuccess("Tạo mới thành công");
      } catch (err) {
        toastError(err);
      }
    }
  };

  updateUser = async () => {
    const {
      id,
      username,
      password,
      passwordConfirm,
      fullName,
      email,
      gender,
      dateOfBirth
    } = this.state.item;
    if (password !== passwordConfirm) {
      this.setState({ isConfirm: false });
    } else {
      this.setState({ isConfirm: true });
      const user = {
        id,
        username,
        password,
        fullName,
        email,
        gender,
        dateOfBirth
      };
      try {
        await ApiUser.updateUser(user);
        this.toggleModalInfo();
        this.getUserList();
        toastSuccess("Chỉnh sửa thành công");
      } catch (err) {
        toastError(err);
      }
    }
  };

  deleteUser = async () => {
    try {
      await ApiUser.deleteUser(this.state.itemId);
      this.toggleDeleteModal();
      this.getUserList();
      toastSuccess("Xóa thành công");
    } catch (err) {
      toastError(err);
    }
  };

  saveUser = () => {
    let { id } = this.state.item;
    if (id) {
      this.updateUser();
    } else {
      this.addUser();
    }
  };

  onDateOfBirthChange = el => {
    let inputValue = el._d;
    let item = Object.assign({}, this.state.item);
    item["dateOfBirth"] = inputValue;
    this.setState({ item });
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.saveUser();
  }

  componentDidMount() {
    this.getUserList();
  }

  render() {
    const {
      isShowDeleteModal,
      isShowInfoModal,
      isChangePassword,
      isConfirm,
      item
    } = this.state;
    const { userPagedList } = this.props.userPagedListReducer;
    const { sources, pageIndex, totalPages } = userPagedList;
    console.log(sources);
    const hasResults =
      userPagedList.sources && userPagedList.sources.length > 0;
    return (
      <div className="animated fadeIn">
        <ModalConfirm
          clickOk={this.deleteUser}
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
                {!isChangePassword && (
                  <div>
                    <Row>
                      <Col>
                        <FormGroup>
                          <ValidationInput
                            name="username"
                            title="Tên đăng nhập"
                            type="text"
                            required={true}
                            value={item.username}
                            onChange={this.onModelChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <ValidationInput
                            name="email"
                            title="Email"
                            type="text"
                            required={true}
                            value={item.email}
                            onChange={this.onModelChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <ValidationInput
                            name="password"
                            title="Mật khẩu"
                            type="password"
                            required={true}
                            value=""
                            onChange={this.onModelChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormGroup>
                          <ValidationInput
                            name="passwordConfirm"
                            title="Nhập lại mật khẩu"
                            type="password"
                            required={true}
                            value=""
                            onChange={this.onModelChange}
                          />
                          {!isConfirm && (
                            <Label className="form-text text-danger">
                              Mật khẩu không khớp *
                            </Label>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormGroup>
                          <ValidationInput
                            name="fullName"
                            title="Họ và tên"
                            type="text"
                            required={true}
                            value={item.fullName}
                            onChange={this.onModelChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for="example"> Ngày sinh </Label>
                          <Datetime
                            required={true}
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
                        <Label>Giới tính</Label> {console.log(this.state.item)}
                        <FormGroup>
                          <div>
                            <select
                              className="select-custom"
                              name="gender"
                              required={false}
                              onChange={this.onModelChange}
                            >
                              {gender.GENDER.map((item, i) => {
                                return (
                                  <option
                                    selected={
                                      this.state.item.gender === item.name
                                    }
                                    value={item.id}
                                    key={i}
                                  >
                                    {item.name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                )}
                {isChangePassword && (
                  <div>
                    <Row>
                      <Col>
                        <FormGroup>
                          <ValidationInput
                            name="passwordOld"
                            title="Mật khẩu cũ"
                            type="password"
                            required={true}
                            value=""
                            onChange={this.onModelChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <ValidationInput
                            name="password"
                            title="Mật khẩu mới"
                            type="password"
                            required={true}
                            value=""
                            onChange={this.onModelChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormGroup>
                          <ValidationInput
                            name="passwordConfirm"
                            title="Nhập lại mật khẩu"
                            type="password"
                            required={true}
                            value=""
                            onChange={this.onModelChange}
                          />
                          {!isConfirm && (
                            <Label className="form-text text-danger">
                              Mật khẩu không khớp *
                            </Label>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                )}

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
                  <th>Username</th>
                  <th>Email</th>
                  <th>Họ và tên</th>
                  <th>Giới tính</th>
                  <th>Ngày sinh</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {hasResults &&
                  sources.map(item => {
                    return (
                      <tr key={item.id}>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.fullName}</td>
                        <td>{item.gender}</td>
                        <td>
                          {moment(item.dateOfBirth)
                            .add(7, "h")
                            .format("DD-MM-YYYY")}
                        </td>
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
                            style={{ marginLeft: 15, marginRight: 15 }}
                            color="success"
                            onClick={() => this.showChangePassword(item)}
                          >
                            Đổi mật khẩu
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
    userPagedListReducer: state.userPagedListReducer
  }),
  {
    getUserList
  }
)(UserListPage);
