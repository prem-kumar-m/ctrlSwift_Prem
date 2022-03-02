import React from "react";
import Logo from "../images/logo.png";
import * as Constants from "../constants";

function Header1(props) {
  return (
    <div className="header navbar" style={{ width: "100%" }}>
      <div className="header-container  col-md-12">
        <ul className="nav-left">
          <li>
            <img src={Logo} alt="CrtlSwift" width="75%" />
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Header1;
