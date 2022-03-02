import React from "react";
import { Component } from "react";
import Loadeing from "../images/loader.gif";

class Loader extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="loader-Container">
        <div className="loader">
          <img src={Loadeing} />
        </div>
      </div>
    );
  }
}

export default Loader;
