import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "react-multi-email/style.css";
import { Redirect } from "react-router";
import Footer from "../components/footer/Footer.js";
import Header from "../components/header/Header";
import HeaderLogin from "../components/header_login/HeaderLogin";
import * as Constants from "../constants";




class WhatisctrlSwift extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
        )}
        <div className="view">
          <section className="generic-banner relative banner-area-inner4">
            <div className="overlay overlay-bg overlay-bg-blk"></div>
            <div className="container">
              <div className="row height align-items-center justify-content-center">
                <div className="col-lg-10">
                  <div className="generic-banner-content">
                    <h2 className="head2-inner">What is CtrlSwift?</h2>
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
            <Col>
              <p style={{ fontSize: 20, color: "black" }}>
                {/* <h3>What is CtrlSwift?</h3> */}
              </p>
              <br></br>
              <p style={{ fontSize: 15, textAlign: "justify" }}>
                <p>
                CtrlSwift is NextGen IT OPS Independent Platform to Provide Freedom from Operations & IT Services Management of any Business vertical across the Globe. Industry 4.0 demands next level of Business Services Management platform which includes Business Service Level & Business Availability Improvement Also Business Operation Cost Optimization                 </p>

                <p>
                CtrlSwift has defined the CtrlSwift Super Intelligent Framework (CrtlSwiftSIF) purely to upgrade the existing Business Services Management Best Practices. CtrlSwiftSIF is unique and it is designed to share its Business Intelligence to across all Businesses on NextGen Service Delivery & Commercial model which is vital and bring lot of values to various growing organizations on increasing their sustainability, service availability, productivity improvement without investing for Tool, Infrastructure and its support related cost  
                </p>

                <p>
                CtrlSwift Super Intelligent Framework is a real time framework and its combination of Human Intelligence, Tools, Artificial Intelligence to manage any IT Setup which can be customized as per customer need and ready to be deployed within matter of time. CtrlSwiftSIF will perform combination of People, Tools to Manage ITSM, Monitoring Infrastructure and Business & IT process Management.
                </p>

                <p>
                Simple platform solves the problems of managing team of IT Operations Management, standardizing challenges of Tools, Business & IT Process Improvement/Automation on simple “CONTROLLED EASY TO CHANGE” Commercial model.
                </p>
              </p>
            </Col>
          </Row>
          <Form>
            <br />
            <br />
            <br />
          </Form>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default WhatisctrlSwift;
