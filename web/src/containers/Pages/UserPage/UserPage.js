import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  InputGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'

import {
  Form,
  Field
} from "react-final-form"

import { ToastContainer } from 'react-toastify'
import _ from 'lodash'

import {
  required,
  passwordConfirmation,
  composeValidators
} from "../../../helpers/validate.helper"

import {
  toastSuccess,
  toastError
} from "../../../helpers/toast.helper"

import RequestHelper, { handleError } from "../../../helpers/request.helper"
import SessionHelper from "../../../helpers/session.helper"
import AppConfig from "../../../config"

import {
  URL_ENPOINTS,
  GENDER
} from "../../../constant"

import { getUsers } from "../../../actions/user.action"

import {
  getRoles
} from "../../../actions/role.action"

import { connect } from 'react-redux'
import Loading from "../../Common/Loading/Loading"
import Pagination from "../../Common/CustomPagination/CustomPagination"
import MultipleSelect from "../../Common/MultipleSelect/MultipleSelect"
import DataTime from "../../Common/DateTime/DateTime"
import ModalConfirm from "../../Modal/ModalConfirm"
import './UserPage.css';
import 'react-confirm-alert/src/react-confirm-alert.css'
import "react-toastify/dist/ReactToastify.css"

class UserPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowModal: false,
      isShowModalInfo: false,
      userId: null,
      user: {},
      error: {},
      token: '',
      formTitle: '',
      params: {
        offset: 1,
        limit: AppConfig.pageSize
      },
      query: '',
      sortName: '',
      isDesc: false,
      file: ''
    }
    this.delayedCallback = _.debounce(this.search, 1000)
  }

  toggleModal = () => {
    this.setState(prevState => ({
      isShowModal: !prevState.isShowModal
    }))
  }

  toggleModalInfo = (item, title) => {
    const token = SessionHelper.getToken()
    item && this.redirectLogin(token)
    this.setState(prevState => ({
      isShowModalInfo: !prevState.isShowModalInfo,
      user: item || {},
      userId: item ? item.id : null,
      formTitle: title,
      token
    }))
  }

  showConfirmDelete = itemId => {
    const token = SessionHelper.getToken()
    this.redirectLogin(token)
    this.setState(
      {
        userId: itemId
      },
      () => this.toggleModal()
    )
  }

  showUpdateModal = async (item) => {
    let title = 'Update'
    this.toggleModalInfo(Object.assign({}, item, { roleId: item.roles }), title)
  }

  showAddNew = async () => {
    let title = 'Add new'
    this.toggleModalInfo(null, title)
  }

  redirectLogin = (token) => {
    if (token === '') {
      window.location.replace(URL_ENPOINTS.LOGIN)
    } else {
      this.setState({ token })
    }
  }

  handlePageClick = index => {
    this.setState(
      {
        params: {
          ...this.state.params,
          offset: index
        }
      },
      () => this.getUsers()
    )
  }

  handleChangeFile = e => {
    const file = e.target.files[0]
    this.setState({ file })
  }

  handleError = err => {
    let error = {}
    err.map(e => {
      const name = e.propertyName.toLowerCase()
      const message = e.errorMessage
      error = { ...error, [name]: message }
      return true;
    })
    this.setState({
      error: error
    })
  }

  getUsers = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query,
      sortName: this.state.sortName,
      isDesc: this.state.isDesc
    })
    this.props.getUsers(params)
  }

  addImage = () => {
    const { avatar, id } = this.state.user
    const folder = id
    const formData = new FormData();
    formData.append('file', avatar);
    formData.append('filename', avatar.name);
    formData.append('folder', folder);

    const contentType = false;

    return new Promise((resolve, reject) => {
      RequestHelper
        .post(URL_ENPOINTS.MEDIA_UPLOAD, formData, contentType)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          const e = handleError(err)
          if (Array.isArray(e)) {
            this.handleError(e)
          } else {
            toastError(e)
          }
          reject(err)
        })
    })
  }

  addUser = () => {
    const { name, email, password, roleIds } = this.state.user
    const data = {
      name,
      email,
      password,
      roleIds,
    }
    RequestHelper
      .post(URL_ENPOINTS.SSO, data)
      .then(result => {
        this.toggleModalInfo()
        this.getUsers()
        toastSuccess('Add new User success!')
      })
      .catch(err => {
        const e = handleError(err)
        if (Array.isArray(e)) {
          this.handleError(e)
        } else {
          toastError(e)
        }
      })
  }

  updateUser = (id) => {
    const { name, avatar, dateOfBirth, gender, roleIds } = this.state.user
    const data = Object.assign({}, {
      name,
      avatarUrl: avatar,
      dateOfBirth,
      gender,
      roleIds
    })
    RequestHelper
      .put(URL_ENPOINTS.USER + '/' + id, data, this.state.token)
      .then(result => {
        this.toggleModalInfo()
        this.getUsers()
        toastSuccess('Update User success!')
      })
      .catch(err => {
        const e = handleError(err)
        if (Array.isArray(e)) {
          this.handleError(e)
        } else {
          toastError(e)
        }
      })
  }

  delete = () => {
    RequestHelper
      .delete(URL_ENPOINTS.USER + '/' + this.state.userId, null, this.state.token)
      .then(result => {
        this.getUsers()
        this.toggleModal()
        toastSuccess('Delete User success!')
      })
      .catch(err => {
        const e = handleError(err)
        e && toastError(e)
      })
  }

  saveUser = async () => {
    let id = this.state.userId
    if (id) {
      let link = ''
      if (this.state.file !== '') {
        link = await this.addImage()
      }

      this.setState({
        user: { ...this.state.user, avatar: link }
      },
        () => this.updateUser(id))
    } else {
      this.addUser()
    }
  }

  search = (e) => {
    this.setState({
      params: {
        ...this.state.params,
        offset: 1
      },
      query: e.target.value
    }, () => {
      this.getUsers()
    })
  }

  sort = (sortName) => {
    this.setState({
      params: {
        ...this.state.params,
      },
      query: {
        ...this.state.query
      },
      sortName: sortName,
      isDesc: !this.state.isDesc
    }, () => {
      this.getUsers()
    })
  }

  onChange = (e) => {
    e.persist()
    this.delayedCallback(e);
  }

  onClick = (sortName) => {
    this.sort(sortName)
  }

  onSubmit = async (values) => {
    let user = Object.assign({}, this.state.user,
      { ...values },
      { avatar: this.state.file ? this.state.file : this.state.user.avatar })
    await this.setState({ user })
    this.saveUser()
  }

  componentDidMount() {
    this.props.getUsers(this.state.params)
    this.props.getRoles()
  }

  render() {
    const { isShowModal, isShowModalInfo, formTitle, user, userId, error, file } = this.state
    const { fetching, fetched, users, hasNextPage, hasPreviousPage, totalPages, pageIndex } = this.props.user
    const { roles } = this.props.role
    return (
      <div className="animated fadeIn">
        {
          !fetched ? (
            <Row>
              <Col xs="12">
                {
                  fetching && <Loading />
                }
              </Col>
            </Row>
          ) :
            (
              <Row className="mr-5 ml-5 justify-content-center">
                <ToastContainer />
                <Col xs="12">
                  <Card>
                    <CardHeader>
                      <i className="fa fa-align-justify"></i> Striped User
                    </CardHeader>
                    <CardBody>
                      <div className="mb-2">
                        <Button color="primary" className="mb-1" onClick={this.showAddNew}>Add New</Button>
                        <div className="float-right w-25">
                          <input type="text" className="form-control" onChange={this.onChange} placeholder="Search..." />
                        </div>
                      </div>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th onClick={() => this.onClick('name')}>
                              Name
                              <div className="float-right">
                                <i className="fa fa-sort fa-lg mt-1"></i>
                              </div>
                            </th>
                            <th>Avatar</th>
                            <th>Email</th>
                            <th onClick={() => this.onClick('dateOfBirth')}>
                              Date Of Birth
                            <div className="float-right">
                                <i className="fa fa-sort fa-lg mt-1"></i>
                              </div>
                            </th>
                            <th>Gender</th>
                            <th>Roles</th>
                            <th>Activity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            fetched && users && users.map((item) => {
                              return (
                                <tr key={item.id}>
                                  <td>{item.name}</td>
                                  <td>
                                    <div className="row img-avatar">
                                      {
                                        item.avatar &&
                                        <img src={item.avatar} alt="" width="100px" height="100px" className="rounded" />
                                      }
                                    </div>
                                  </td>
                                  <td>{item.email}</td>
                                  <td>{item.dateOfBirth}</td>
                                  <td>{
                                    Object.values(GENDER).map((value, key) =>
                                      item.gender === key ? value : ''
                                    )
                                  }</td>
                                  <td>
                                    {item && item.roles && item.roles.map(role =>
                                      <h6 key={role.id}>{role.name}</h6>
                                    )}
                                  </td>
                                  <td>
                                    <InputGroup className="mb-3">
                                      <Button className="btn-info mr-1" onClick={() => this.showUpdateModal(item)}><i className="text-white fa fa-edit fa-lg"></i></Button>
                                      <Button className="btn-danger" onClick={() => this.showConfirmDelete(item.id)}><i className="text-white fa fa-trash-o fa-lg"></i></Button>
                                    </InputGroup>
                                  </td>
                                </tr>
                              );
                            })
                          }
                        </tbody>
                      </table>
                      <Pagination
                        totalPages={totalPages}
                        pageIndex={pageIndex}
                        hasPreviousPage={hasPreviousPage}
                        hasNextPage={hasNextPage}
                        onPageChange={this.handlePageClick} />
                    </CardBody>
                  </Card>
                </Col>
                <ModalConfirm
                  clickOk={this.delete}
                  isShowModal={isShowModal}
                  toggleModal={this.toggleModal}
                />
                <Form onSubmit={this.onSubmit}
                  initialValues={user}
                  render={({ handleSubmit, submitting, pristine, values }) => (
                    <Modal isOpen={isShowModalInfo} toggle={this.toggleModalInfo}>
                      <ModalHeader>{formTitle} User</ModalHeader>
                      <form onSubmit={handleSubmit}>
                        <ModalBody>
                          <Field name="name" validate={required}>
                            {({ input, meta }) => (
                              <div className="form-group row">
                                <label htmlFor="name" className="col-sm-3">Name</label>
                                <div className="col-sm-9">
                                  <input type="text" {...input} className={`form-control ${meta.error && meta.touched && "border border-danger"}`} placeholder="User name" />
                                  {meta.error && meta.touched && <small className="help-block form-text danger">{meta.error}</small>}
                                  {error.name && <small className="help-block form-text danger">{error.name}</small>}
                                </div>
                              </div>
                            )}
                          </Field>
                          <Field name="email" validate={required}>
                            {({ input, meta }) => (
                              <div className="form-group row">
                                <label htmlFor="email" className="col-sm-3">Email</label>
                                <div className="col-sm-9">
                                  <input type="text" {...input} className={`form-control ${meta.error && meta.touched && "border border-danger"}`} placeholder="Email" />
                                  {meta.error && meta.touched && <small className="help-block form-text danger">{meta.error}</small>}
                                  {error.email && <small className="help-block form-text danger">{error.email}</small>}
                                </div>
                              </div>
                            )}
                          </Field>
                          {
                            !userId &&
                            <div>
                              <Field name="password" validate={required}>
                                {({ input, meta }) => (
                                  <div className="form-group row">
                                    <label htmlFor="password" className="col-sm-3">Password</label>
                                    <div className="col-sm-9">
                                      <input type="password" {...input} className={`form-control ${meta.error && meta.touched && "border border-danger"}`} placeholder="Password" />
                                      {meta.error && meta.touched && <small className="help-block form-text danger">{meta.error}</small>}
                                      {error.password && <small className="help-block form-text danger">{error.password}</small>}
                                    </div>
                                  </div>
                                )}
                              </Field>
                              <Field name="password_confirmation" validate={composeValidators(required, (value) => passwordConfirmation(values, value))}>
                                {({ input, meta }) => (
                                  <div className="form-group row">
                                    <label htmlFor="password_confirmation" className="col-sm-3">Confirm Password</label>
                                    <div className="col-sm-9">
                                      <input type="password" {...input} className={`form-control ${meta.error && meta.touched && "border border-danger"}`} placeholder="Confirm Password" />
                                      {meta.error && meta.touched && <small className="help-block form-text danger">{meta.error}</small>}
                                      {error.password_confirmation && <small className="help-block form-text danger">{error.password_confirmation}</small>}
                                    </div>
                                  </div>
                                )}
                              </Field>
                            </div>
                          }
                          <Field
                            name="roleIds"
                            validate={required}
                            component={MultipleSelect}
                            placeholder="Add roles"
                            options={roles}
                            initValue={user.roles}
                            labelName="Roles"
                            error={error ? error.roleIds : ''}
                            multiple />
                          {
                            userId &&
                            <div>
                              <Field
                                name="dateOfBirth"
                                validate={required}
                                component={DataTime}
                                selected={user.dateOfBirth}
                                placeholder="Date Of Birth"
                                error={error ? error.dateOfBirth : ''}
                              />
                              <Field name="gender" validate={required}>
                                {({ input, meta }) => (
                                  <div className="form-group row">
                                    <label htmlFor="gender" className="col-sm-3">Gender</label>
                                    <div className="col-sm-9">
                                      <select {...input} className={`form-control ${meta.error && meta.touched && "border border-danger"}`}>
                                        <option value="">Choose gender</option>
                                        {
                                          Object.values(GENDER).map((value, key) =>
                                            <option value={key} key={key}>{value}</option>
                                          )
                                        }
                                      </select>
                                      {meta.error && meta.touched && <small className="help-block form-text danger">{meta.error}</small>}
                                      {error.gender && <small className="help-block form-text danger">{error.gender}</small>}
                                    </div>
                                  </div>
                                )}
                              </Field>
                              <div className="form-group row">
                                <label htmlFor="avatar" className="col-sm-3">Avatar</label>
                                <div className="col-sm-9">
                                  <label htmlFor="file-upload" className="custom-file-upload btn btn-primary">
                                    <i className="fa fa-cloud-upload"></i> Upload Image
                                </label>
                                  <input id="file-upload" accept="image/*" type="file" onChange={(e) => this.handleChangeFile(e)} />
                                  {error.avatar && <small className="help-block form-text danger">{error.avatar}</small>}
                                </div>
                              </div>
                              <div className="row">
                                {
                                  user.avatar || file ?
                                    <div className="col-md-4 pb-4">
                                      <i className="fa fa-remove remove-button"></i>
                                      <img src={file !== '' ? URL.createObjectURL(file) : user.avatar} alt="" width="100%" height="100%" className="rounded" />
                                    </div>
                                    : ''
                                }
                              </div>
                            </div>
                          }

                        </ModalBody>
                        <ModalFooter>
                          <button className="btn btn-secondary" type="button" onClick={this.toggleModalInfo}>Cancel</button>{' '}
                          {
                            userId ?
                              <button className="btn btn-primary" type="submit" disabled={submitting || pristine}>Update</button>
                              :
                              <button className="btn btn-primary" type="submit" disabled={submitting || pristine}>Save</button>
                          }
                        </ModalFooter>
                      </form>
                    </Modal>
                  )} />
              </Row>
            )
        }
      </div>
    );
  }
}

export default connect(
  state => ({ user: state.user, role: state.role }),
  {
    getUsers,
    getRoles
  }
)(UserPage);