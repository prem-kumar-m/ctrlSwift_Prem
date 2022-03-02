import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import "./Footer.scss";
import { addNewsLetter } from "./action";
import { Button, InputGroup, FormControl } from 'react-bootstrap';

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      CSFemail: "",
      submitted: false,
      emailError: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /\S+@[A-Za-z]+\.com/;
    const ks = /\S+@[A-Za-z]+\.co.in/;
    if (!re.test(value) && !ks.test(value)) {
      this.setState({
        emailError: "Invalid email",
      });
    } else {
      this.setState({
        emailError: "",
      });
    }
  };

  componentDidMount() { }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.props.isSuccess);
    if (this.props.isSuccess !== prevProps.isSuccess) {
      if (this.props.isSuccess.success === true) {
        console.log("email is added");
        this.setState({
          submitted: false,
          CSFemail: "",
        });
        Swal.fire({
          title: "",
          text: "Your request was successfully submitted",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
      if (this.props.isSuccess.success === false) {
        console.log("email is added");
        this.setState({
          submitted: false,
        });
        Swal.fire({
          title: "",
          text: "Due to some technical problems we are unable to process your request currently. Please try later",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    }
  }

  insertEmail = () => {
    console.log("log");
    this.setState({
      submitted: true,
    });
    if (this.state.emailError === "" && this.state.CSFemail !== "") {
      const CSFemail = { CSFemail: this.state.CSFemail };
      this.props.addNewsLetter(CSFemail);
    }
  };

  render() {
    const { submitted, CSFemail } = this.state;

    return (
      <div>
        <footer className="footer-area section-gap">
          <div className="container">
            <div className="row">
              <div className="col-lg-5  col-md-6 col-sm-6">
                <div className="single-footer-widget">

                  <div className="" id="mc_embed_signup">
                    <div className="row">
                      <h6 className="text-white ">Newsletter</h6>
                     
                      <InputGroup className="mb-3">
                        <FormControl
                          placeholder="Enter Email"
                          aria-label="Enter Email"
                          aria-describedby="basic-addon2"
                          type="email"
                          value={CSFemail}
                          name="CSFemail"
                          id="CSFemail"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <Button variant="outline-secondary" id="button-addon2"
                        aria-label="go"
                          className="click-btn btn btn-default"
                          onClick={() => this.insertEmail()}
                        >
                          <i style={{ fontSize: "0.9em" }}
                            className="fa fa-long-arrow-right btn-footer"
                            aria-hidden="true"
                          ></i>
                        </Button>
                      </InputGroup>
                      {submitted && !CSFemail && (
                        <div style={{ fontSize: 12, color: "red" }}>
                          Email is required
                        </div>
                      )}
                      {this.state.emailError !== "" && submitted && CSFemail && (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.emailError}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 social-widget">
              </div>
              <div className="col-lg-2 col-md-6 col-sm-6 social-widget">
                <div className="single-footer-widget text-white ">
                  <h6>Connect with us</h6>
                  <div className="footer-social d-flex align-items-center facebook">
                    <a href="https://www.facebook.com/ctrlswift" aria-label="facebook" className="facebook" rel="noopener noreferrer" target="_blank">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="https://twitter.com/ctrlswift_" aria-label="twitter" className="twitter" rel="noopener noreferrer" target="_blank">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="https://www.linkedin.com/company/ctrl-swift"aria-label="linkedin"  className="linkedin" rel="noopener noreferrer" target="_blank">
                      <i className="fa fa-linkedin"></i>
                    </a>
                    <a href="https://www.instagram.com/cltrlswift_/" aria-label="instagram" className="instagram" rel="noopener noreferrer" target="_blank">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>

        </footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-4">
              <div className="single-footer-widget ">
                <p className="font-weight-normal text-secondary">
                  Copyright ©2020 CtrlSwift All rights reserved
                </p>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-8">
              <div className="footer-Terms">
                <ul className="flex font-weight-bold">
                  <li>
                    <a href="/terms"> Terms and conditions</a>
                  </li>
                  <li>
                    <a href="/privacy">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/pricing">Pricing policy </a>
                  </li>
                  <li>
                    <a href="/cancellation">Cancellation/Refund policy </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
Footer.propTypes = {
  isSuccess: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    isSuccess: state.newsLetterReducer.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addNewsLetter: (country) => dispatch(addNewsLetter(country)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
