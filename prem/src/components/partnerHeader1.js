import React from "react";
import {
  Button, Col, Container, Nav, Navbar, Row
} from "react-bootstrap";
import Logo from "./../images/logo.png";

class partnerHeader extends React.Component {
  render() {
    return (
      <div>
        <header id="header">
          <Container>
            <Row
            >
              <Col>
                <a href="/">
                  <img src={Logo} alt="CtrlSwift" width="33%" />
                </a>
              </Col>
              <Col>
                <Navbar bg="transparent" expand="lg">
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav
                    // className="ml-auto"
                    >
                      <Nav.Item>
                        <Nav.Link href="/partners">Home</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link href="/contactus">Contact</Nav.Link>
                      </Nav.Item>


                      <Nav.Item>
                        <Nav.Link href="/partnerFaq">FAQ</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Button
                          className=" medium radius text-uppercase"
                          href="/partnerLogin"
                          id="cs-h-Login"
                          // style={{marginRight:"20em"}}
                        >
                           logout{" "}
                        </Button>
                      </Nav.Item>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    );
  }
}

export default partnerHeader;
