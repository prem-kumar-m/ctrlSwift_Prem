import React from "react";
import Logo from "../images/logo.png";
import * as Constants from "../constants";
import "../css/main.css";
function Header1(props) {
  return (
    <div className="admin-logout-header shadow mb-5"  >
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <img src={Logo} alt="CrtlSwift" />
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarText">
    <ul className="navbar-nav mr-auto">
      <li>

      </li>
    </ul>
    <span className="navbar-text">
    <button
              type="button"
              onClick={props.navigate}
              className="btn btn-primary btn-color-admin"
            >
              Logout
            </button>
    </span>
  </div>
</nav>
    </div>
  );
}
export default Header1;
