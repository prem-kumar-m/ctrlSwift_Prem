import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Logo from "../../images/logo.png";
import "./Header.scss";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "", 
      password: "",
    };
  }

  render() {
    return (
      <header id="header">
        <Container className="container">
          <Row className="row align-items-center justify-content-between d-flex">
            <Col>
              <a href="/">
              <img src={Logo} alt="CtrlSwift"  style={{width:"190px"}} />
              </a>
            </Col>
          </Row>
        </Container>
      </header>
    );
  }
}

export default Header;
