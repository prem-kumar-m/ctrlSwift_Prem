import { PropTypes } from "prop-types";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isEmail, ReactMultiEmail } from "react-multi-email";
import "react-multi-email/style.css";
import { connect } from "react-redux";
import Select from "react-select";
import Swal from "sweetalert2";
import Footer from "../components/footer/Footer.js";
import Header from "../components/header/Header";
import HeaderLogin from "../components/header_login/HeaderLogin";
import Loader from "../components/loading";
import * as Constants from "../constants";
import {
  requestDemo, requestloadtimeslot, requestloadtimezone
} from "./action";

class RequestDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      time: "",
      email: "",
      emails: [],
      country: "",
      submitted: false,
      isSuccess: false,
      timezone: "",
      timezoneOption: "",
      timeslotOption: "",
      timedisable: true,
      loop: false,
      startTime: "",
      endTime: "",
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

  timeZone = (opt) => {
    this.setState({
      time: "",
      loop: true,
    });
    this.setState({
      country: opt.value,
    });
  };

  timeslot = (opt) => {
    this.setState({
      time: "",
      loop: true,
    });
    var time = opt.value.split(" -- ");
    console.log("time" + time);
    this.setState({
      time: opt.value,
      startTime: time[0],
      endTime: time[1],
    });
  };

  handleChangeStartDate = (date) => {
    this.setState({
      time: "",
      loop: true,
    });
    let dayparam = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let dayparams = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let monthparam =
      date.getMonth() <= 8 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let dateparam = date.getFullYear() + "-" + monthparam + "-" + dayparam;
    this.state.d1 = date.getFullYear() + "," + monthparam + "," + dayparams;
    console.log(new Date(this.state.d1));
    this.setState({
      date: dateparam,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    console.log(this.state.emails);
    if (!!window.sessionStorage.getItem(Constants.ACCESS_EMAIL)) {
      if (this.state.emails.length <= 3) {
        const { startTime, endTime, date, emails, country } = this.state;

        if (date && endTime && startTime && country) {
          this.props.requestDemo({
            date: date,
            startTime: startTime,
            endTime: endTime,
            emails: emails,
            country: country,
          });
          this.setState({
            isLoading: true,
          });
        }
      } else {
        Swal.fire({
          title: "",
          text: "You can add only 3 mail id's",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    } else {
      Swal.fire({
        title: "",
        text: "Please login before proceeding",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  }
  navigate = (url) => {
    this.props.history.push(url);
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
    if (!window.sessionStorage.getItem(Constants.ACCESS_EMAIL)) {
      return Swal.fire({
        title: "",
        text: "Please login before proceeding",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      }).then((res) => {
        if (res.value) {
          window.sessionStorage.setItem(Constants.REGISTERED, true);
          this.props.history.push("/");
        }
      });
    }

    this.props.requestloadtimezone();
    console.log(
      "componentDidMount----window.sessionStorage.getItem(Constants.ACCESS_EMAIL)------>" +
        window.sessionStorage.getItem(Constants.ACCESS_EMAIL)
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!window.sessionStorage.getItem(Constants.ACCESS_EMAIL)) {
      return Swal.fire({
        title: "",
        text: "Please login before proceeding",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      }).then((res) => {
        if (res.value) {
          window.sessionStorage.setItem(Constants.REGISTERED, true);
          this.props.history.push("/");
        }
      });
    }

    console.log(
      "componentDidUpdate----window.sessionStorage.getItem(Constants.ACCESS_EMAIL)------>" +
        window.sessionStorage.getItem(Constants.ACCESS_EMAIL) !==
        null
    );

    console.log(
      "timeslotOption === [{label: All, value:/All/}]" +
        JSON.stringify(this.state.startTime)
    );
    console.log(
      "timeslotOption === [{label: All, value:/All/}]" +
        JSON.stringify(this.state.endTime)
    );
    console.log("date" + this.state.timeslotOption);
    console.log("date" + this.state.date);
    /*     console.log("email"+this.state.email)
     console.log("emails"+this.state.emails[0])
     console.log("emails"+this.state.emails[1])
     console.log("emails"+this.state.emails[2])
     console.log("country"+this.state.country)*/
    console.log(
      "submitted" + this.props.demoStatus + "-==========" + prevProps.demoStatus
    );

    if (this.props.demoStatus !== prevProps.demoStatus) {
      this.setState({
        isLoading: false,
      });
      if (
        this.props.demoStatus !== undefined &&
        this.props.demoStatus !== null
      ) {
        console.log(this.props.demoStatus);
        if (this.props.demoStatus.success == true) {
          Swal.fire({
            title: "",
            text: "Your demo request is successfully submitted",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });

          this.props.history.push("/");
        } else {
          Swal.fire({
            title: "",
            text: this.props.demoStatus.message,
            icon: "warning",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          });
        }
      }
    }

    if (this.state.loop === true) {
      if (this.state.country !== "" && this.state.date !== "") {
        this.props.requestloadtimeslot({
          timeZone: this.state.country,
          date: this.state.date,
        });
        this.setState({
          timedisable: false,
        });
      }
      this.setState({
        loop: false,
      });
    }
  }

  render() {
    const {
      timezoneOption,
      timeslotOption,
      timedisable,
      date,
      time,
      emails,
      country,
      submitted,
    } = this.state;

    if (!timezoneOption) {
      let timezoneOpt = [{ label: "All", value: "All" }];
      if (
        this.props.timezonelist !== undefined &&
        this.props.timezonelist !== null
      ) {
        for (var i = 1; i <= this.props.timezonelist.timeZones.length; i++) {
          timezoneOpt[i] = {
            label: this.props.timezonelist.timeZones[i - 1],
            value: this.props.timezonelist.timeZones[i - 1],
          };
        }
        this.setState({
          timezoneOption: timezoneOpt,
          startDate: this.props.timezonelist.demoRequestDate,
        });
      }
    }

    if (!timeslotOption) {
      console.log("all");
      let timeslotOpt = [{ label: "All", value: "All" }];
      if (
        this.props.timeslotlist !== undefined &&
        this.props.timeslotlist !== null
      ) {
        console.log(
          "this.props.timeslotlist.slots.length" + this.props.timeslotlist.slots
        );
        for (var j = 1; j <= this.props.timeslotlist.slots.length; j++) {
          timeslotOpt[j] = {
            label: this.props.timeslotlist.slots[j - 1],
            value: this.props.timeslotlist.slots[j - 1],
          };
        }
        this.setState({
          timeslotOption: timeslotOpt,
        });
        console.log("====timeslotOpt==========" + JSON.stringify(timeslotOpt));
      }
    }

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
              <section className="generic-banner relative banner-area-inner2">
                <div
                  className="overlay overlay-bg overlay-bg-blk"
                  style={{ backgroundColor: "black", opacity: 0.5 }}
                ></div>
                <div className="container">
                  <div className="row height align-items-center justify-content-center">
                    <div className="col-lg-10">
                      <div className="generic-banner-content">
                        <h2 className="head2-inner">
                          Higher First Call Resolution capabilitiesl
                        </h2>
                        <p className="text-white" style={{ opacity: 0.5 }}>
                          {" "}
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
                    To request demo, please take the time to fill out the
                    information below.
                  </p>
                  <br></br>
                </Col>
              </Row>
              <Form>
                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="">
                    <Form.Label>Preferred Date </Form.Label>

                    <div className="dateclass">
                      <DatePicker
                        name="date"
                        value={date}
                        ref={(c) => (this._calendar = c)}
                        autoComplete="off"
                        onChange={this.handleChangeStartDate}
                        id="date"
                         minDate={new Date(this.state.startDate)}
                    
                      />
                      <span
                        className="icon-holder"
                        onClick={this.openDatepicker}
                      >
                        <i className="c-blue-500 ti-calendar"></i>{" "}
                      </span>
                    </div>
                    {submitted && !date && (
                      <div
                        className="help-block"
                        style={{ fontSize: 12, color: "red" }}
                      >
                        Date is required
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="">
                    <Form.Label>Select Your TimeZone </Form.Label>
                    <Select
                      //onChange={this.getMetal}
                      onChange={(evt) => this.timeZone(evt)}
                      isSearchable={true}
                      role={country}
                      options={timezoneOption}
                      name="country"
                    />

                    {submitted && !country && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        TimeZone is required
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="">
                    <Form.Label>Preferred Time </Form.Label>
                    <Select
                      //onChange={this.getMetal}
                      onChange={(evt) => this.timeslot(evt)}
                      isSearchable={true}
                      role={time}
                      options={timeslotOption}
                      name="country"
                      isDisabled={timedisable}
                    />
                    {submitted && !time && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        {" "}
                        Time required
                      </div>
                    )}
                  </Form.Group>
                </Form.Row>
                <br />
                <Form.Row>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="email"
                    style={{ justifyContent: "center" }}
                  >
                    <Form.Label style={{ justifyContent: "center" }}>
                      Additional People mail Id's
                    </Form.Label>
                    <ReactMultiEmail
                      placeholder="Enter Your Email Id"
                      emails={emails}
                      onChange={(_emails) => {
                        this.setState({ emails: _emails });
                      }}
                      validateEmail={(email) => {
                        return isEmail(email); // return boolean
                      }}
                      getLabel={(email, index, removeEmail) => {
                        return (
                          <div data-tag key={index}>
                            {email}

                            <span
                              data-tag-handle
                              onClick={() => removeEmail(index)}
                            >
                              ×
                            </span>
                          </div>
                        );
                      }}
                    />
                    {submitted && emails && emails.length > 3 && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        Only 3 email id can enter
                      </div>
                    )}
                    {submitted && !emails && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        Email Id required
                      </div>
                    )}
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group
                    as={Col}
                    md="6"
                    controlId="submit"
                    style={{ alignItems: "left", marginTop: 30 }}
                  >
                    <Button
                      className="genric-btn primary radius text-uppercase"
                      variant=" "
                      onClick={this.handleSubmit}
                    >
                      SUBMIT{" "}
                    </Button>
                    <br /> <br />
                  </Form.Group>
                </Form.Row>
              </Form>
              <br /> <br /> <br />
            </Container>
            <Footer />
          </div>
        )}
      </div>
    );
  }
}

RequestDemo.propTypes = {
  requestloadtimezone: PropTypes.func,
  requestloadtimeslot: PropTypes.func,
  requestDemo: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    timezonelist: state.requestDemoReducer.timezonelist,
    timeslotlist: state.requestDemoReducer.timeslotlist,
    demoStatus: state.requestDemoReducer.demoStatus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestloadtimezone: (timezone) => dispatch(requestloadtimezone(timezone)),
  requestloadtimeslot: (timeslot) => dispatch(requestloadtimeslot(timeslot)),
  requestDemo: (demo) => dispatch(requestDemo(demo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestDemo);
