import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Redirect } from "react-router";
import Footer from "../components/footer/Footer.js";
import Header from "../components/header/Header";
import HeaderLogin from "../components/header_login/HeaderLogin";
import * as Constants from "../constants";
import backgroundImage28 from "../images/b1desk-lite03.jpg";

class ctrlSwiftPremium extends React.Component {
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
          <section className="generic-banner relative banner-area-inner6">
            <div className="overlay overlay-bg overlay-bg-blk"></div>
            <div className="container">
              <div className="row height align-items-center justify-content-center">
                <div className="col-lg-10">
                  <div className="generic-banner-content">
                    <h2 className="head2-inner"> CtrlSwift Premium</h2>
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
                    src={backgroundImage28}
                    className="img-fluid"
                    alt="smaple image"
                  />
                </div>
              </Form.Group>
              <br></br>
              <br></br>

              <Form.Group as={Col} md="6" controlId="">
                <h2>Cloud Migration</h2>
                <ul>
                  <li>Migrating from on-prem to cloud </li>
                  <li>Cloud DR </li>
                  <br></br>

                  <li>
                    <h4>Cloud Monitoring </h4>
                  </li>
                  <li>Cloud Best Practices Parameters Monitoring</li>
                  <li>Cloud Cost parameters Monitoring</li>
                  <li>Cloud Utilization Monitoring</li>
                  <br></br>

                  <li>
                    <h4>Cloud Management</h4>
                  </li>
                  <li>Cloud Compliance</li>
                  <li>Cloud Cost Optimization</li>
                  <li>Cloud Availability Management</li>
                  <li>Cloud Provisioning</li>
                  <li>Cloud Automation</li>
                  <br></br>

                  <li>
                    <h4>Active Directory</h4>
                  </li>
                  <li>Cloud AD Integration</li>
                  <li>Group Policy & User level policy defintiion</li>
                  <li>Defined Access</li>
                  <li>Restricted Access</li>
                  <li>SSO </li>
                  <br></br>

                  <li>
                    <h4>Cloud Security Management</h4>
                  </li>
                  <li>Cloud Firewall</li>
                  <li>Cloud VPN and Restricted Access</li>
                  <li>Private Access</li>
                  <br></br>

                  <li>
                    <h4>CtrlSwift Premium - Datacentre</h4>
                  </li>
                  <li>VMWare Support</li>
                  <li>Nutanix Support</li>
                  <li>Citrix Support</li>
                  <li>Exchange Server Support</li>
                  <li>Microsoft Dynamics Support</li>
                  <li>Cisco Support</li>
                  <li>Juniper Support</li>
                  <li>DB Support</li>
                  <br></br>

                  <li>
                    <h4>Projects Support</h4>
                  </li>
                  <li>Mail Migration</li>
                  <li>Cloud Deployment</li>
                  <li>Dynamics Deployment</li>
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

export default ctrlSwiftPremium;
