import React, { Component } from "react";
import "../../Dashboard/dashboard.css";

class ListNews extends Component {
  render() {
    const { imageUrl, children } = this.props;
    return (
      <div className="news">
        <div
          className="card-cover"
          style={{
            backgroundImage: `url(${imageUrl})`
          }}
        />
        <div className="card-bpdy">{children}</div>
      </div>
    );
  }
}

export default ListNews;
