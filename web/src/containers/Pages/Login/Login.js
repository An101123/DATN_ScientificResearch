import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Row,
} from 'reactstrap';

import {
  Form,
  Field
} from "react-final-form"

import RequestHelper, { handleError } from "../../../helpers/request.helper"
import SessionHelper from "../../../helpers/session.helper"
import {
  composeValidators,
  email,
  required,
} from "../../../helpers/validate.helper"
import { URL_ENPOINTS } from "../../../constant"

import {
  toastError
} from "../../../helpers/toast.helper"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: []
    }
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

  login = () => {
    const { email, password } = this.state
    const data = {
      email,
      password
    }
    RequestHelper
      .post(URL_ENPOINTS.SSO + URL_ENPOINTS.LOGIN, data)
      .then(result => {
        SessionHelper.setToken(result)
        this.redirect()
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

  redirect = (url) => {
    window.location.replace(url)
  }

  onSubmit = (values) => {
    this.setState({
      ...values
    },
      () => this.login())
  }
  render() {
    const { error } = this.state
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onSubmit}
                      render={({ handleSubmit, submitting, pristine }) => (
                        <form onSubmit={handleSubmit}>
                          <h1>Login</h1>
                          <p className="text-muted">Sign In to your account</p>
                          <Field name="email" validate={composeValidators(required, email)}>
                            {
                              ({ input, meta }) => (
                                <div className="mb-3 input-group">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="icon-user"></i>
                                    </span>
                                  </div>
                                  <input {...input} placeholder="Email" autoComplete="email" type="email" className={`form-control ${meta.error && meta.touched && "border border-danger"}`} />
                                  <div className="w-100">
                                    {meta.error && meta.touched && <small className="help-block form-text danger">{meta.error}</small>}
                                    {error.email && <small className="help-block form-text danger">{error.email}</small>}
                                  </div>
                                </div>
                              )
                            }
                          </Field>
                          <Field name="password" validate={composeValidators(required)}>
                            {
                              ({ input, meta }) => (
                                <div className="mb-4 input-group">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="icon-lock"></i>
                                    </span>
                                  </div>
                                  <input {...input} placeholder="Password" autoComplete="current-password" type="password" className={`form-control ${meta.error && meta.touched && "border border-danger"}`} />
                                  <div className="w-100">
                                    {meta.error && meta.touched && <small className="help-block form-text danger">{meta.error}</small>}
                                    {error.password && <small className="help-block form-text danger">{error.password}</small>}
                                  </div>
                                </div>
                              )
                            }
                          </Field>
                          <div className="row">
                            <div className="col-6">
                              <button className="px-4 btn btn-primary" disabled={submitting || pristine}>Login</button>
                            </div>
                            <div className="text-right col-6">
                              <button className="px-0 btn btn-link">Forgot password?</button>
                            </div>
                          </div>
                        </form>
                      )} />
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
