import BeautyStars from "beauty-stars";
import { PropTypes } from "prop-types";
import queryString from "query-string";
import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "react-multi-email/style.css";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Swal from "sweetalert2";
import Footer from "../components/footer/Footer.js";
import Header from "../components/header/Header";
import HeaderLogin from "../components/header_login/HeaderLogin";
import * as Constants from "../constants";
import { addFeedback } from "./action";
class Feedback extends React.Component {
  constructor(props) {
    super();

    this.state = {
      ticket: "",
      Q1: 0,
      Q2: 0,
      Q3: 0,
      Q4: 0,
      Q5: 0,
      submitted: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    // this.state.d1 = date.getFullYear() + "," + monthparam + "," + dayparams;
    console.log(new Date(this.state.d1));
    this.setState({
      date: dateparam,
      d1: date.getFullYear() + "," + monthparam + "," + dayparams,
    });
  };


  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  componentDidMount() {
    let url = this.props.location.search;
    let params = queryString.parse(url);
    console.log(params);
    this.setState({ ticket: params.ticket });
    console.log("ticket number set to " + this.state.ticket);
    console.log(
      "Add feedback Component Did Mount........" + this.state.submitted
    );
  }

  handleClick = () => {
  };

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { ticket, Q1, Q2, Q3 } = this.state;
    console.log("---------------------------STATE-------------------\n");

    console.log(
      "\n ticket----" +
        ticket +
        "\n Q1----" +
        Q1 +
        "\n Q2----" +
        Q2 +
        "\n Q3----" +
        Q3
    );
    if ((ticket, Q1 && Q2)) {
      this.props.submitAddFeedback(ticket, Q1, Q2);
    } else {
      Swal.fire({
        title: "Success",
        text: "Please provide star rating for all the question.",
        icon: "info",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("component Did update");
    if (this.props.isSuccess !== prevProps.isSuccess) {
      console.log(
        "there is a change in props........" +
          prevProps.isSuccess +
          " and " +
          this.props.isSuccess
      );
      if (this.state.submitted && this.props.isSuccess.success) {
        Swal.fire({
          title: "Success",
          text: "Thank You For Your Feedback",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((result1) => {
          if (result1.value) {
            window.location.href = "/";
          }
        });
      } else if (this.state.submitted && !this.props.isSuccess.success) {
        Swal.fire({
          title: "Oops...",
          text: this.props.isSuccess.message,
          icon: "error",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
          showCloseButton: "true",
        }).then((result) => {
          if (result.value) {
            window.location.href = "/";
          }
        });
      }

      this.setState({ submitted: false });
    }
  }

  render() {
    const {Q1, Q2, submitted } = this.state;
    if (this.state.isReadyToRedirect) return <Redirect to="/user" />;

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
                        Fill Your Feedback! Customer Satisfaction is our
                        priority,We value your Feedback.
                      </p>
                    </Row>
                  </Col>
                </Row>

              </div>
            </div>
          </div>
          <div>
            <Form>
              <div className="md-12">
                <Form.Row>
                  <Form.Group as={Col} md="12">
                    <Form.Label style={{fontSize:15,fontWeight:'bold'}}>1. How satisfied are you with our Sales team coordination?</Form.Label>
                    <br />
              <br />
                    <div
                      className={
                        " col-md-2" + (submitted && !Q1 ? " has-error" : "")
                      }
                    >
                      <BeautyStars
                        value={this.state.Q1}
                        size={20}
                        onChange={(Q1) => this.setState({ Q1 })}
                      />
                    </div>
                  </Form.Group>
                  <br />
              <br />  <br />
              <br />  <br />
                  <Form.Group as={Col} md="6">
                    <Form.Label style={{fontSize:15,fontWeight:'bold'}}>2. Rating about your Overall experience?</Form.Label>
                    <br />
              <br />
                    <div
                      className={
                        " col-md-2" + (submitted && !Q2 ? " has-error" : "")
                      }
                    >
                      <BeautyStars
                        value={this.state.Q2}
                        size={20}
                        onChange={(Q2) => this.setState({ Q2 })}
                      />
                    </div>
                  </Form.Group>
                </Form.Row>
              </div>
              <br />
              <br />
              <Form.Row>
                <Form.Group as={Col} md="5"></Form.Group>
                <Form.Group as={Col} md="3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </button>
                </Form.Group>
                <Form.Group as={Col} md="5"></Form.Group>
              </Form.Row>
            </Form>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }
}
Feedback.propTypes = {
  submitAddFeedback: PropTypes.func,
};

const mapStateToProps = (state) => {
  console.log(state, "feedback list");
  return {
    isSuccess: state.feedbackReducer.isSuccess,
  };
};
const mapDispatchToProps = (dispatch) => ({
  submitAddFeedback: (ticket, Q1, Q2, Q3, Q4, Q5) => dispatch(addFeedback(ticket, Q1, Q2, Q3, Q4, Q5)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
