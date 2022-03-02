import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "react-multi-email/style.css";
import { Redirect } from "react-router";
import Swal from "sweetalert2";
import Footer from "../components/footer/Footer.js";
import Header from "../components/header/Header";
import HeaderLogin from "../components/header_login/HeaderLogin";
import * as Constants from "../constants";
import {
  emailValidator, firstNameValidator,
  lastNameValidator, mobileValidator
} from "../Core/utils";
import backgroundImage23 from "../images/BSM.jpg";

class WhyctrlSwift extends React.Component {
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
    // this.state.d1 = date.getFullYear() + "," + monthparam + "," + dayparams;
    console.log(new Date(this.state.d1));
    this.setState({
      date: dateparam,
      d1:date.getFullYear() + "," + monthparam + "," + dayparams,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    console.log(this.state.emails);
    if (this.state.emails.length > 3) {
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
        )}

        <div className="view">
        <div className="banner-space"></div>

          <section className="generic-banner relative banner-area-inner14">
            <div className="overlay overlay-bg overlay-bg-blk"></div>
            <div className="container">
              <div className="row height align-items-center justify-content-center">
                <div className="col-lg-10">
                  <div className="generic-banner-content">
                    <h2 className="head2-inner">Why is CtrlSwift?</h2>
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
              </p>
              <br></br>
              <p style={{ fontSize: 15, textAlign: "justify" }}>
                <p>
                IT is evolving at the speed of light. Innovations are happening across various Matrices and directions like Applications, Processes, Tools, Compliances, and so on. Software as a Services, Infrastructure as a Service, and Platform as a service are increasing the speed of deployment & ease the capex investment and fulfil the Business Need on the go.  {" "}
                </p>

                <p>
                Technologies are evolving in one direction and the investments on Technologies is getting obsolete in on other direction. Businesses are forced to invest on latest technologies to retain their business & to manage their competition pressure and indirectly it is increasing its operational cost as they have to recruit resources to manage the latest technologies.  {" "}
                </p>
              </p>

              <p>
              Specialization approach and productization of technologies, processes, tools brought out lot of products to manage Business Services. Integration of various products in a common platform or passing inputs from one product to other by creating connectors complicating the technology services management and various hidden cost in terms of subscription charges and customization and roll out and immediately moving to various other technologies as business delivery model is volatile and demands Man power to data fetching, movement and management.  {" "}
              </p>

              <p>
              Every growing and grown businesses are struggling to retain their employees and they unable to give commitment and career growth as technologies are volatile and getting changed frequently. So, Businesses are making huge investment on IT Strategist alignment to ensure they are always getting the better and to retain their growth. 
              </p>
<p>
270 Degree out of 360 Degrees in ITSM is getting lot of innovations and moving towards solutions improvement and enablement of various Business challenges but remaining 90 Degree of IT Service Management (People-Service Delivery Model) is not changed much and its almost standstill for a decade. We understood the need of the hour and Business One Desk Framework Got Defined.  
</p>
<div className="">
<img alt="" className="rounded mx-auto d-block" src={backgroundImage23}/>

</div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default WhyctrlSwift;
