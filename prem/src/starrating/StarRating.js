//import faq from "./faq/AboutPlatform"
import BeautyStars from "beauty-stars";
import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "react-multi-email/style.css";
import { Redirect } from "react-router";
import Footer from "../components/footer/Footer.js";
import Header from "../components/header/Header";
import HeaderLogin from "../components/header_login/HeaderLogin";
import * as Constants from "../constants";
import {
  emailValidator, firstNameValidator,
  lastNameValidator, mobileValidator
} from "../Core/utils";




class StarRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      time: "",
      preferredtimeslot: "",
      additionalpeople: "",
      email: "",
      emails: [],
      firstName: "",
      firstNameError: "",
      lastName: "",
      lastNameError: "",
      workMail: "",
      department: "",
      mobile: "",
      landline: "",
      companyName: "",
      address: "",
      country: "",
      city: "",
      code: "",
      code1: "",
      pincode: "",
      submitted: false,
      isLoginSuccess: false,
      isReadyToRedirect: false,
      emailError: "",
      isSuccess: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    console.log("name===>" + name + "----------------value=>" + value);

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
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
    const {
      firstName,
      landline,
      lastName,
      city,
      country,
      address,
      pincode,
      department,
      companyName,
      workMail,
      mobile,
    } = this.state;

    const emailError = emailValidator(this.state.workMail);
    const mobileError = mobileValidator(this.state.mobile);

    const firstNameError = firstNameValidator(this.state.firstName);
    const lastNameError = lastNameValidator(this.state.lastName);

    if (emailError || firstNameError || lastNameError || mobileError)
      this.setState({
        emailError: emailError,
        firstNameError: firstNameError,
        lastNameError: lastNameError,
        mobileError: mobileError,
        value: 0,
        value1: 0,
        value2: 0,
      });

    this.setState({ submitted: true });

    if (
      firstName &&
      lastName &&
      mobile &&
      address &&
      workMail &&
      country &&
      city &&
      department &&
      companyName &&
      pincode &&
      emailError == "" &&
      firstNameError === "" &&
      lastNameError === "" &&
      mobileError === ""
    ) {
      this.props.history.push("/RegisterOtp");
    }

    // this.props.history.push('/RegOTP');
    /*  const {username, password} = this.state;
      if (username && password) {
          this.props.verifyLogin(username, password);
      }*/
    /*const {firstName, lastName, mobile,landline, department,city,country,address,pincode,workMail,companyName} = this.state;
      if ((firstName && lastName && landline && mobile && city&&companyName&&country&&pincode&&workMail&&department&&address === 6)){

    }*/
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
    console.log("value" + this.state.value);
    console.log("value1" + this.state.value1);
    console.log("value2" + this.state.value2);
  }
  accordion1() {
    var acc = document.getElementsByClassName("accordion1");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  }
  myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  render() {
    if (this.state.isReadyToRedirect) return <Redirect to="/user" />;
    const {
      value,
      value1,
      value2,
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
        )}
        <div className="view">
          <section className="generic-banner relative banner-area-inner5">
            <div className="overlay overlay-bg overlay-bg-blk"></div>
            <div className="container">
              <div className="row height align-items-center justify-content-center">
                <div className="col-lg-10">
                  <div className="generic-banner-content">
                    <h2 className="head2-inner">
                      Higher First Call Resolution Capabilities!
                    </h2>
                    <p className="text-white" style={{ opacity: 0.5 }}>
                      {" "}
                      Centralized instances of SOPs and KEDBS
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
          <div className="container">
            <div className="row">
              <div
                className="col-12"
                style={{ marginBottom: 30, color: "white", fontWeight: 400 }}
              >
                <Row>
                  <Col>
                    <Row
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: 400,
                      }}
                    >
                      <p style={{ fontSize: 20, color: "black" }}>
                        Please Fill Your Feedback! Customer Satisfaction is our
                        priority,We value your Feedback.
                      </p>
                    </Row>
                  </Col>
                </Row>
                <br></br>
                <div className="topnav" id="myTopnav">
                  <span></span>

                  <a
                    href="javascript:void(0);"
                    className="icon"
                    onclick="myFunction()"
                  >
                    <i className="fa fa-bars"></i>
                  </a>
                </div>
                <br></br>
              </div>
            </div>
          </div>
          <div>
            <Form>
              <Form.Row>
                <Form.Group as={Col} md="4">
                  <Form.Label>Design and collections</Form.Label>
                  <BeautyStars
                    value={this.state.value}
                    onChange={(value) => this.setState({ value })}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Team Coordination and Support</Form.Label>
                  <BeautyStars
                    value={this.state.value1}
                    onChange={(value1) => this.setState({ value1 })}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Overall Experience</Form.Label>
                  <BeautyStars
                    value={this.state.value2}
                    onChange={(value2) => this.setState({ value2 })}
                  />
                </Form.Group>
              </Form.Row>
            </Form>
          </div>


          <section>
            <div className="row">
              <div className="col-md-6">
                <div className="col-md-5" />
                <div className="col-md-2">
                  <div className="peer">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>

                <div className="col-md-5" />
              </div>
            </div>
          </section>

          <br></br>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default StarRating;
