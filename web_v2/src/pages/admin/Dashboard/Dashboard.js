import React, { Component } from "react";
import Logo from "../Dashboard/components/logo";
import Home from "./components/Home";
import ListNews from "./components/ListNews";

class Dashboard extends Component {
  render() {
    return (
      <div className="app">
        <Logo />
        <Home />
        <ListNews />
      </div>
    );
  }
}

export default Dashboard;
