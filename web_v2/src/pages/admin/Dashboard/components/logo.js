// import React, { Component } from "react";
// import { Row } from "reactstrap";

// class Dashboard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     return <div className="animated fadeIn"></div>;
//   }
// }

// export default Dashboard;
import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
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

class Logo extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      //   dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <CardBody>
            <img
              className="logokinhte"
              src="https://due.udn.vn/portals/_default/skins/dhkt/img/front/logo.png"
              alt="logochichido"
            />
          </CardBody>
        </Row>
      </div>
    );
  }
}

export default Logo;
