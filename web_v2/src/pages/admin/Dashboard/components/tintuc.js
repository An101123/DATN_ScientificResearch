import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import { getNewsList } from "../../../../actions/news.list.action";
import Pagination from "../../../../components/pagination/Pagination";
import lodash from "lodash";
import ApiNews from "../../../../api/api.news";

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

class TinTuc extends Component {
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
      <Row className="gioithieu">
        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-info">
            <CardBody className="pb-0">
              <ButtonGroup className="float-right">
                <Dropdown
                  id="card2"
                  // isOpen={this.state.card2}
                  toggle={() => {
                    this.setState({ card2: !this.state.card2 });
                  }}
                >
                  <DropdownToggle
                    className="p-0"
                    color="transparent"
                  ></DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ButtonGroup>
              <h4 className="mb-0">9.823</h4>
              <p>Members online</p>
            </CardBody>
            <div
              className="chart-wrapper px-3"
              style={{ height: "70px" }}
            ></div>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-info">
            <CardBody className="pb-0">
              <ButtonGroup className="float-right">
                <Dropdown
                  id="card2"
                  // isOpen={this.state.card2}
                  toggle={() => {
                    this.setState({ card2: !this.state.card2 });
                  }}
                >
                  <DropdownToggle
                    className="p-0"
                    color="transparent"
                  ></DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ButtonGroup>
              <h4 className="mb-0">9.823</h4>
              <p>Members online</p>
            </CardBody>
            <div
              className="chart-wrapper px-3"
              style={{ height: "70px" }}
            ></div>
          </Card>
        </Col>
        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-info">
            <CardBody className="pb-0">
              <ButtonGroup className="float-right">
                <Dropdown
                  id="card2"
                  // isOpen={this.state.card2}
                  toggle={() => {
                    this.setState({ card2: !this.state.card2 });
                  }}
                >
                  <DropdownToggle
                    className="p-0"
                    color="transparent"
                  ></DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ButtonGroup>
              <h4 className="mb-0">9.823</h4>
              <p>Members online</p>
            </CardBody>
            <div
              className="chart-wrapper px-3"
              style={{ height: "70px" }}
            ></div>
          </Card>
        </Col>
        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-info">
            <CardBody className="pb-0">
              <ButtonGroup className="float-right">
                <Dropdown
                  id="card2"
                  // isOpen={this.state.card2}
                  toggle={() => {
                    this.setState({ card2: !this.state.card2 });
                  }}
                >
                  <DropdownToggle
                    className="p-0"
                    color="transparent"
                  ></DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ButtonGroup>
              <h4 className="mb-0">9.823</h4>
              <p>Members online</p>
            </CardBody>
            <div
              className="chart-wrapper px-3"
              style={{ height: "70px" }}
            ></div>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default TinTuc;
