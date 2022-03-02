import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Redirect } from "react-router";
import Footer from "../components/footer/Footer.js";
import Header from "../components/header/Header";
import HeaderLogin from "../components/header_login/HeaderLogin";
import * as Constants from "../constants";
import backgroundImage29 from "../images/b1desk-lite04.jpg";

class ctrlSwiftUltimate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    if (this.state.isReadyToRedirect) return <Redirect to="/user" />;
    const {
      firstName,
      date,
      time,
      preferredtimeslot,
      additionalpeople,
      email,
      emails,
      lastName,
      workMail,
      department,
      address,
      code,
      code1,
      country,
      city,
      pincode,
      mobile,
      landline,
      companyName,
      submitted,
    } = this.state;
    return (
      <div>
        {!window.sessionStorage.getItem(Constants.ACCESS_EMAIL) ? (
          <Header />
        ) : (
          <HeaderLogin />
        )}{" "}
        <div className="view">
          <section className="generic-banner relative banner-area-inner9">
            <div className="overlay overlay-bg overlay-bg-blk"></div>
            <div className="container">
              <div className="row height align-items-center justify-content-center">
                <div className="col-lg-10">
                  <div className="generic-banner-content">
                    <h2 className="head2-inner"> CtrlSwift Ultimate</h2>
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

          <Form style={{ justifyContent: "center", alignItems: "center" }}>
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="">
                <div>
                  <img
                    src={backgroundImage29}
                    className="img-fluid"
                    alt="smaple image"
                  />
                </div>
              </Form.Group>
              <Form.Group as={Col} md="2" controlId=""></Form.Group>
              <br></br>
              <br></br>
              <br></br>
              <br></br>

              <Form.Group as={Col} md="6" controlId="">
                <div>
                  <h3>This is an exclusive Plan!</h3>
                  <br></br>

                  {/* <h5 >Please Contact Us to Avail this</h5> */}
                  <h5>
                    Please <a href="/ContactUs">Contact Us</a> to Avail this
                  </h5>
                </div>
              </Form.Group>
            </Form.Row>
          </Form>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default ctrlSwiftUltimate;
