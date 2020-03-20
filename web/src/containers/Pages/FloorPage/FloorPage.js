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
  CardFooter,
  ListGroup,
  ListGroupItem,
  Badge
} from 'reactstrap'

import {
  Form,
  Field
} from "react-final-form"

import { ToastContainer } from 'react-toastify'
import _ from 'lodash'

import {
  toastSuccess,
  toastError
} from "../../../helpers/toast.helper"

import RequestHelper, { handleError } from "../../../helpers/request.helper"
import AppConfig from "../../../config"

import {
  URL_ENPOINTS,
  TABLE_STATUS,
  TABLE_TYPE
} from "../../../constant"

import { getFloors, getTablesByFloorId } from "../../../actions/floor.action"

import { connect } from 'react-redux'
import Loading from "../../Common/Loading/Loading"
import Pagination from "../../Common/CustomPagination/CustomPagination"
import ModalConfirm from "../../Modal/ModalConfirm"
import './FloorPage.css';
import 'react-confirm-alert/src/react-confirm-alert.css'
import "react-toastify/dist/ReactToastify.css"

class FloorPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowModal: false,
      isShowModalInfo: false,
      tableId: null,
      table: {},
      error: {},
      formTitle: '',
      params: {
        offset: 1,
        limit: AppConfig.pageSize
      },
      query: '',
      sortName: '',
      isDesc: false,
    }
    this.delayedCallback = _.debounce(this.search, 1000)
  }

  toggleModal = () => {
    this.setState(prevState => ({
      isShowModal: !prevState.isShowModal
    }))
  }

  toggleModalInfo = (item, title) => {
    this.setState(prevState => ({
      isShowModalInfo: !prevState.isShowModalInfo,
      table: item || {},
      tableId: item ? item.id : null,
      formTitle: title,
    }))
  }

  showConfirmDelete = itemId => {
    this.setState(
      {
        tableId: itemId
      },
      () => this.toggleModal()
    )
  }

  showUpdateModal = async (item) => {
    let title = 'Update'
    this.toggleModalInfo(Object.assign({}, item, { tableId: item.tables }), title)
  }

  handlePageClick = index => {
    this.setState(
      {
        params: {
          ...this.state.params,
          offset: index
        }
      },
      () => this.getFloors()
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

  updateTable = (id) => {
    const { name, avatar, dateOfBirth, gender, tableIds } = this.state.table
    const data = Object.assign({}, {
      name,
      avatarUrl: avatar,
      dateOfBirth,
      gender,
      tableIds
    })
    RequestHelper
      .put(URL_ENPOINTS.USER + '/' + id, data, this.state.token)
      .then(result => {
        this.toggleModalInfo()
        this.getFloors()
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

  saveUser = async () => {
    let id = this.state.tableId
    if (id) {

      this.setState({
      },
        () => this.updateTable(id))
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
      this.getFloors()
    })
  }

  onClick = (id) => {
    this.props.getTablesByFloorId(id)
  }

  onSubmit = async (values) => {
    await this.setState({})
    this.saveUser()
  }

  componentDidMount() {
    this.props.getFloors(this.state.params)
  }

  render() {
    const { isShowModal, isShowModalInfo, formTitle, table, tableId, error } = this.state
    const { fetching, fetched, floors } = this.props.floor
    const { tables } = this.props.table

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="1">
            <div className="wap">
              {
                fetched && floors && floors.map((item) => {
                  return (
                    <span className="item" key={item.id} onClick={() => this.onClick(item.id)}>
                      {item.name}
                    </span>
                  )
                })
              }
            </div>
          </Col>
          <Col md="11">
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
                  <Row className="mr-5 ml-5 pt-2">
                    <ToastContainer />
                    <div className="list-item w-100">
                      {
                        fetched && tables && tables.map((item) => {
                          return (
                            <div key={item.id} className="table-item" onClick={() => this.showUpdateModal(item)}>
                              <span>{item.name}</span>
                              <span className={`badge ${item.status === 1 && 'badge-success'}
                              ${item.status === 2 && 'badge-danger'}
                              ${item.status === 3 && 'badge-info'}`
                              }>{Object.values(TABLE_STATUS).map((value, index) => index + 1 === item.status ? value : "")}</span>
                            </div>
                          );
                        })
                      }
                    </div>
                    <ModalConfirm
                      clickOk={this.delete}
                      isShowModal={isShowModal}
                      toggleModal={this.toggleModal}
                    />
                    <Modal isOpen={isShowModalInfo} toggle={this.toggleModalInfo} className="modal-lg">
                      <ModalHeader>{formTitle} User</ModalHeader>
                      <ModalBody>
                        <Form onSubmit={this.onSubmit}
                          initialValues={table}
                          render={({ handleSubmit, submitting, pristine }) => (
                            <form onSubmit={handleSubmit}>
                              <div className="list-row">
                                <div className="chevron-button pr-0">
                                  <i class="icons font-2xl d-block mt-6 cui-chevron-left"></i>
                                </div>
                                  <div className="w-25 p-1">
                                    <Card className="card-accent-primary">
                                      <CardBody className="card-body-category">
                                        <img width="100%" height="120px" src="http://localhost:3000/assets/img/avatars/8.jpg" alt="category" />
                                      </CardBody>
                                      <CardFooter className="card-footer-category">
                                        Card with accent
                                    </CardFooter>
                                    </Card>
                                  </div>
                                  <div className="w-25 p-1">
                                    <Card className="card-accent-primary">
                                      <CardBody className="card-body-category">
                                        <img width="100%" height="120px" src="http://localhost:3000/assets/img/avatars/8.jpg" alt="category" />
                                      </CardBody>
                                      <CardFooter className="card-footer-category">
                                        Card with accent
                                    </CardFooter>
                                    </Card>
                                  </div>
                                  <div className="w-25 p-1">
                                    <Card className="card-accent-primary">
                                      <CardBody className="card-body-category">
                                        <img width="100%" height="120px" src="http://localhost:3000/assets/img/avatars/8.jpg" alt="category" />
                                      </CardBody>
                                      <CardFooter className="card-footer-category">
                                        Card with accent
                                    </CardFooter>
                                    </Card>
                                  </div>
                                  <div className="w-25 p-1">
                                    <Card className="card-accent-primary">
                                      <CardBody className="card-body-category">
                                        <img width="100%" height="120px" src="http://localhost:3000/assets/img/avatars/8.jpg" alt="category" />
                                      </CardBody>
                                      <CardFooter className="card-footer-category">
                                        Card with accent
                                    </CardFooter>
                                    </Card>
                                  </div>
                                <div className="chevron-button">
                                  <i class="icons font-2xl d-block cui-chevron-right"></i>
                                </div>
                              </div>
                              <div className="">
                                <label>Foods</label>

                              </div>
                            </form>
                          )} />
                      </ModalBody>
                      <ModalFooter>
                      </ModalFooter>
                    </Modal>
                  </Row>
                )
            }
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  state => ({ floor: state.floor, table: state.table }),
  {
    getFloors,
    getTablesByFloorId
  }
)(FloorPage);