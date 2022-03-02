import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Logo from "./../images/logo.png";

class partnerHeader extends React.Component {
  render() {
    return (
      <div>
        <header id="header">
          <Container>
            <Row
            // className="row align-items-center justify-content-between d-flex"
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
                        <NavDropdown
                          title="partner signup"
                          id="nav-dropdown-partnersignup"
                        >
                          <NavDropdown.Item
                            eventKey="4.1"
                            href="/partnerRegister"
                          >
                            Company Partnership
                          </NavDropdown.Item>
                          <NavDropdown.Item eventKey="4.2"
                           href="/selfEmployedReg"
                          >
                            Self Employed
                          </NavDropdown.Item>
                        </NavDropdown>
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
                           login{" "}
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
