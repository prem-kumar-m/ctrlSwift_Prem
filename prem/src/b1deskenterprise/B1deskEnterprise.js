import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer.js";
import HeaderLogin from "../components/header_login/HeaderLogin";
import * as Constants from "../constants";
import backgroundImage27 from "../images/b1desk-lite02.jpg";
import { Redirect } from "react-router";

class B1deskEnterprise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    if (this.state.isReadyToRedirect) return <Redirect to="/user" />;
    return (
      <div>
        {!window.sessionStorage.getItem(Constants.ACCESS_EMAIL) ? (
          <Header />
        ) : (
          <HeaderLogin />
        )}{" "}
        <div className="view">
          <section className="generic-banner relative banner-area-inner7">
            <div className="overlay overlay-bg overlay-bg-blk"></div>
            <div className="container">
              <div className="row height align-items-center justify-content-center">
                <div className="col-lg-10">
                  <div className="generic-banner-content">
                    <h2 className="head2-inner"> B1DESK Enterprise</h2>
                    <p className="text-white" style={{ opacity: 0.5 }}>
                      centralized instances of SOPs and KEDBs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <br></br>
        <br></br>
        <Container style={{ alignItems: "center" }}>
          <Row>
            <Col></Col>
          </Row>

          <Form>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="">
                <div>
                  <img
                    src={backgroundImage27}
                    className="img-fluid"
                    alt="smaple image"
                  />
                </div>
              </Form.Group>
              <br></br>
              <br></br>

              <Form.Group as={Col} md="6" controlId="">
                <h2>End User Application Management</h2>

                <ul>
                  <li>Patch Management </li>
                  <li>Application Installation </li>
                  <br></br>

                  <li>
                    <h4>Cloud VDI </h4>
                  </li>
                  <li>VDI Creation </li>
                  <li>Application Installation </li>
                  <li>Cloud VDI Support </li>
                  <br></br>

                  <li>
                    <h4>EPS (End point Security)</h4>
                  </li>
                  <li>End Point License Management </li>
                  <li>End Point Security Installation </li>
                  <li>End Point Security Management</li>
                  <br></br>

                  <li>
                    <h4>Mail Solution</h4>
                  </li>
                  <li>O365, Dominos, Gsuite, Linux Mail Server Management </li>
                  <li>User Creation, Addition, Deletion</li>
                  <li>Mail Security Policy Definition</li>
                  <li>Mail DLP</li>
                  <li>MDM</li>
                  <br></br>

                  <li>
                    <h4>End User OS Management</h4>
                  </li>
                  <li>Linux</li>
                  <li>Unix</li>
                  <li>Windows</li>
                  <li>Mac</li>
                  <br></br>

                  <li>
                    <h4>Spare Management</h4>
                  </li>
                  <li>Annual Maintenance Contract</li>
                  <li>Faulty Spare replacement</li>
                  <br></br>

                  <li>
                    <h4>End Point Ancillary Devices Management </h4>
                  </li>
                  <li>Printer Support</li>
                  <li>Scanner Support</li>
                  <li>WIFI Implementation Support</li>
                  <li>Total Tickets expected</li>
                </ul>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group
                as={Col}
                md="10"
                style={{ fontSize: 15 }}
              ></Form.Group>
            </Form.Row>
          </Form>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default B1deskEnterprise;
