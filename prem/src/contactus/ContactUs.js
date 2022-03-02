import { PropTypes } from "prop-types";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "react-multi-email/style.css";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Swal from "sweetalert2";
import Footer from "../components/footer/Footer.js";
import Header from "../components/header/Header";
import HeaderLogin from "../components/header_login/HeaderLogin";
import Loader from "../components/loading";
import * as Constants from "../constants";
import { requestContactUs } from "./action";



class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yourName: "",
      yourSubject: "",
      workMail: "",
      address: "",
      submitted: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  changeMobile = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });

    if (value.length < 10) {
      this.setState({
        mobileError: "Invalid mobile number",
      });
      console.log("changeing mobile" + this.state.mobileError);
    } else {
      this.setState({
        mobileError: "",
      });
      console.log("changeing mobile" + this.state.mobileError);
    }
  };

  Change = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /^[A-Za-z_ ]+$/;

    if (!re.test(value)) {
      this.setState({
        firstNameError: "Please enter the valid name",
      });
    } else {
      this.setState({
        firstNameError: "",
      });
    }
  };
  Change = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /^[A-Za-z_ ]+$/;

    if (!re.test(value)) {
      this.setState({
        yourSubjectError: "Please enter the valid name",
      });
    } else {
      this.setState({
        yourSubjectError: "",
      });
    }
  };
  Change = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /^[A-Za-z_ ]+$/;

    if (!re.test(value)) {
      this.setState({
        yourNameError: "Please enter the valid name",
      });
    } else {
      this.setState({
        yourNameError: "",
      });
    }
  };

  ChangeLastName = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const yu = /^[A-Za-z_ ]+$/;

    if (!yu.test(value)) {
      this.setState({
        lastNameError: "Please enter the valid name",
      });
    } else {
      this.setState({
        lastNameError: "",
      });
    }
  };

  handleChanges = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /\S+@[A-Za-z]+\.com/;
    const ks = /\S+@[A-Za-z]+\.co.in/;
    if (!re.test(value) && !ks.test(value)) {
      this.setState({
        emailError: "Please enter the valid email",
      });
    } else {
      this.setState({
        emailError: "",
      });
    }
  };

  handleChangeStartDate = (date) => {
    let dayparam = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let dayparams = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let monthparam = date.getMonth() < 9 ? date.getMonth() : date.getMonth();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "Jun",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let dateparam =
      dayparam + "-" + monthNames[date.getMonth()] + "-" + date.getFullYear();
    this.state.d1 = date.getFullYear() + "," + monthparam + "," + dayparams;
    console.log(new Date(this.state.d1));
    this.setState({
      date: dateparam,
    });
  };

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });

    if (
      this.state.yourName &&
      this.state.workMail &&
      this.state.yourSubject &&
      this.state.address &&
      !this.state.emailError &&
      !this.state.subjectError
    ) {
      console.log("testing");
      this.props.requestContactUs({
        contactFlag: "false",
        name: this.state.yourName,
        email: this.state.workMail,
        subject: this.state.yourSubject,
        message: this.state.address,
      });
      this.setState({
        isLoading: true,
      });
    }
  }

  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("new Date()" + new Date());
    if (this.props.isSuccess !== prevProps.isSuccess) {
      if (this.props.isSuccess.success === true) {
        Swal.fire({
          title: "",
          text: "Your request has been submitted, We will get back to you soon!",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        this.props.history.push("/");
      } else if (this.props.isSuccess.success === false) {
        Swal.fire({
          title: "",
          text: "Technical issues, Please try again",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    if (this.state.isReadyToRedirect) return <Redirect to="/user" />;
    const { yourName, yourSubject, workMail, address, submitted } = this.state;
    return (
      <div>
        {!window.sessionStorage.getItem(Constants.ACCESS_EMAIL) ? (
          <Header />
        ) : (
          <HeaderLogin />
        )}


        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div>
            <div className="view">
            <div className="banner-space"></div>

              <section className="generic-banner relative banner-area-inner2">
                <div className="overlay overlay-bg overlay-bg-blk"></div>
                <div className="container">
                  <div className="row height align-items-center justify-content-center">
                    <div className="col-lg-10">
                      <div className="generic-banner-content">
                        <h2 className="head2-inner">Contact Us</h2>

                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <br></br>
            <br></br>
            <Container>
              <Row>
                <Col>
                  <h2>Contact Us</h2>
                  <p>Send us a message, we will get back to you soon</p>
                  <br></br>

                  <section>
                    <div>
                      <Form>
                        <Form.Row>
                          <Form.Group as={Col} md="5" controlId="">
                            <input
                              type="text"
                              className="form-control"
                              name="yourName"
                              value={yourName}
                              onChange={this.Change}
                              placeholder="Your Name*"
                            />
                            {submitted && !yourName && (
                              <div
                                style={{ fontSize: 12, color: "red" }}
                                className="nav-left"
                              >
                                Your Name is required
                              </div>
                            )}
                            {submitted &&
                              this.state.yourNameError !== "" &&
                              yourName && (
                                <div style={{ fontSize: 12, color: "red" }}>
                                  {this.state.subjectError}
                                </div>
                              )}
                          </Form.Group>
                          <Form.Group as={Col} md="5" controlId="">
                            <input
                              type="text"
                              className="form-control"
                              name="workMail"
                              value={workMail}
                              onChange={this.handleChanges}
                              placeholder="Your Email*"
                            />
                            {submitted && !workMail && (
                              <div
                                style={{ fontSize: 12, color: "red" }}
                                className="nav-left"
                              >
                                Email is required
                              </div>
                            )}
                            {submitted &&
                              this.state.emailError !== "" &&
                              workMail && (
                                <div style={{ fontSize: 12, color: "red" }}>
                                  {this.state.emailError}
                                </div>
                              )}
                          </Form.Group>
                        </Form.Row>


                        <Form.Row>
                          <Form.Group as={Col} md="5" controlId="">
                            <input
                              type="text"
                              className="form-control"
                              name="yourSubject"
                              value={yourSubject}
                              onChange={this.Change}
                              placeholder="Your Subject*"
                            />
                            {submitted && !yourSubject && (
                              <div
                                style={{ fontSize: 12, color: "red" }}
                                className="nav-left"
                              >
                                Your Subject is required
                              </div>
                            )}
                            {submitted &&
                              this.state.yourSubjectError !== "" &&
                              yourSubject && (
                                <div style={{ fontSize: 12, color: "red" }}>
                                  {this.state.subjectError}
                                </div>
                              )}
                          </Form.Group>
                          <Form.Group as={Col} md="5" controlId="">
                            <textarea
                              className="form-control"
                              name="address"
                              value={address}
                              onChange={this.Change}
                              placeholder="Your Message*"
                            />
                            {submitted && !address && (
                              <div
                                style={{ fontSize: 12, color: "red" }}
                                className="nav-left"
                              >
                                Message is required
                              </div>
                            )}
                          </Form.Group>
                        </Form.Row>

                        <Form.Row>

                        </Form.Row>

                        <Form.Row>
                          <Form.Group controlId="">
                            <Button
                              className="genric-btn primary radius text-uppercase"
                              variant=" "
                              onClick={this.handleSubmit}
                            >
                              Submit
                            </Button>
                          </Form.Group>
                        </Form.Row>
                      </Form>
                      Balbhas Business Sysnomics LLC
                      <br></br>
                      Marietta,
                      GA 30068 <br/>USA
                    </div>

                    <div></div>
                  </section>
                </Col>

              </Row>
            </Container>
            <br></br>

            <Footer />
          </div>
        )}
      </div>
    );
  }
}

ContactUs.propTypes = {
  requestAllDetails: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isSuccess: state.contactUsReducer.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestContactUs: (ticket) => dispatch(requestContactUs(ticket)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
