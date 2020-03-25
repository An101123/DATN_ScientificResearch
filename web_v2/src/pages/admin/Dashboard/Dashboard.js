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
        <ListNews imageUrl="https://icdn8.digitaltrends.com/image/razor-e200s-electric-scooter-1-640x640.jpg">
          <p>Hihi</p>
        </ListNews>
      </div>
    );
  }
}

export default Dashboard;
