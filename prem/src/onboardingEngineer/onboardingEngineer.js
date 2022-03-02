import React from "react";
import { Form, Col, Row, Container, Button, InputGroup, FormControl } from "react-bootstrap";
// import onboard from "../images/onboard.jpg";
import Sidemenu from "../components/partnersidemenu/partnerSidemenu";
import Header1 from "../components/header1";
import Footer from "../components/footer";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import PartnerHeader1 from "../components/partnerHeader1";

import { addUser } from "./action";

class onboardingEngineer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeId: "",
      partnerId: "",
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      mobileCountryCode: "",
      mobileNumber: "",
      qualification: "",
      specialization: "",
      experience: "",
      country: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      idProof: "",
      addressProof: "",
      panCard: "",
      aadharCard: "",
      emailError: "",
      phoneError: "",
      address2: "",
      city2: "",
      country2: "",
      state2: "",
      pincode2: "",
      aadharNumber: "",
      submitted: false,
      submittedVerify: false,
      submitNext: false,
      checkBox: true,
      showNextBtn: true,
      showSubmitBtn: false,
      showBackBtn: false,
      aadharModel: false,
      personalModel: true,
      fileModel: false,
      items: [],
      value: "",
      error: null,
      experience: "",
      qualification: "",
      specialization: "",
      value: "",
      panCardNumber: "",
      aadharCard: "",
      experienceCertificate: "",
      addressProof: "",
      pincodeError: "",
      disNext: false,
      aadharError: "",

    };

  }

  handleAlphaChange = (event) => {
    var letters = /^[A-Za-z]+$/;
    const { name, value } = event.target;
    if (value.match(letters)) {
      this.setState({
        [name]: value,
      });
    }

  };
  handleChangenum = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleExperience = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });

    if (value.length > 2) {
      this.setState({
        experienceError: "Invalid experience",
      });
      console.log("changing experience" + this.state.experienceError);
    } else {
      this.setState({
        experienceError: "",
      });
      console.log("changing experience" + this.state.experienceError);
    }
  };



  convertBase64 = (aadharCard) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(aadharCard);
      fileReader.onload = () => {
        resolve(fileReader.result);
        console.log(fileReader.result);
        localStorage.setItem("file", fileReader.result);
        console.log(localStorage.getItem("file"));
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  aadharCard = (e) => {
    if (e.target.files[0] !== undefined && e.target.files[0] !== null) {
      let aadharCard = e.target.files[0];
      console.log("file" + e.target.files[0]);

      console.log("fsize" + JSON.stringify(e.target.files[0]));
      console.log("file" + aadharCard);
      const base64 = this.convertBase64(aadharCard);

      console.log(aadharCard.type);
      if (aadharCard.type === "image/png" || aadharCard.type === "image/jpeg") {
        this.setState({ aadharCard: aadharCard });
      } else if (
        aadharCard.type !== "image/png" &&
        aadharCard.type !== "image/jpeg"
      ) {
        // document.getElementById("exampleFormControlaadharCard").value = "";
        // this.setState({ aadharCard: "" });
        Swal.fire({
          title: "",
          text: "Only .jpeg or .png is Accepted",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    } else {
      this.setState({
        aadharCard: "",
      });
    }
  };

  convertBase641 = (experienceCertificate) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(experienceCertificate);
      fileReader.onload = () => {
        resolve(fileReader.result);
        console.log(fileReader.result);
        localStorage.setItem("file", fileReader.result);
        console.log(localStorage.getItem("file"));
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  experienceCertificate = (e) => {
    if (e.target.files[0] !== undefined && e.target.files[0] !== null) {
      let experienceCertificate = e.target.files[0];
      console.log("experienceCertificate" + e.target.files[0]);
      console.log(this.statebase64);
      console.log("experienceCertificate" + experienceCertificate);
      console.log("fsize" + JSON.stringify(e.target.files[0]));
      console.log(experienceCertificate.type);
      console.log(experienceCertificate);

      const base64 = this.convertBase641(experienceCertificate);

      if (
        experienceCertificate.type === "image/png" ||
        experienceCertificate.type === "image/jpeg"
      ) {
        this.setState({ experienceCertificate: experienceCertificate });
        // console.log(
        //   "experienceCertificate inside" + JSON.stringify(this.state.experienceCertificate)
        // );
      } else if (
        experienceCertificate.type !== "image/png" &&
        experienceCertificate.type !== "image/jpeg"
      ) {
        // document.getElementById("exampleFormControlFile").value = "";
        // this.setState({ experienceCertificate: "" });
        Swal.fire({
          title: "",
          text: "Only .jpeg or .png is Accepted",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    } else {
      this.setState({
        experienceCertificate: "",
      });
    }
  };
  convertBase642 = (addressProof) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(addressProof);
      fileReader.onload = () => {
        resolve(fileReader.result);
        console.log(fileReader.result);
        localStorage.setItem("file", fileReader.result);
        console.log(localStorage.getItem("file"));
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  addressProof = (e) => {
    if (e.target.files[0] !== undefined && e.target.files[0] !== null) {
      let addressProof = e.target.files[0];
      console.log("file" + e.target.files[0]);
      console.log(this.statebase64);
      console.log("fsize" + JSON.stringify(e.target.files[0]));
      console.log("file" + addressProof);
      const base64 = this.convertBase642(addressProof);

      console.log(addressProof.type);
      if (
        addressProof.type === "image/png" ||
        addressProof.type === "image/jpeg"
      ) {
        this.setState({ addressProof: addressProof });
      } else if (
        addressProof.type !== "image/png" &&
        addressProof.type !== "image/jpeg"
      ) {
        // document.getElementById("exampleFormControlFile2").value = "";
        // this.setState({ addressProof: "" });
        Swal.fire({
          title: "",
          text: "Only .jpeg or .png is Accepted",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    } else {
      this.setState({
        addressProof: "",
      });
    }
  };
  cancelledChequeLeaf = (e) => {
    if (e.target.files[0] !== undefined && e.target.files[0] !== null) {
      let cancelledChequeLeaf = e.target.files[0];
      console.log("cancelledChequeLeaf" + e.target.files[0]);
      console.log(this.statebase64);
      console.log("cancelledChequeLeaf" + cancelledChequeLeaf);
      console.log("fsize" + JSON.stringify(e.target.files[0]));
      console.log(cancelledChequeLeaf.type);
      console.log(cancelledChequeLeaf);

      // const base64 = this.convertBase641(cancelledChequeLeaf);

      if (
        cancelledChequeLeaf.type === "image/png" ||
        cancelledChequeLeaf.type === "image/jpeg"
      ) {
        this.setState({ cancelledChequeLeaf: cancelledChequeLeaf });
        // console.log(
        //   "cancelledChequeLeaf inside" + JSON.stringify(this.state.cancelledChequeLeaf)
        // );
      } else if (
        cancelledChequeLeaf.type !== "image/png" &&
        cancelledChequeLeaf.type !== "image/jpeg"
      ) {
        // document.getElementById("exampleFormControlFile").value = "";
        // this.setState({ cancelledChequeLeaf: "" });
        Swal.fire({
          title: "",
          text: "Only .jpeg or .png is Accepted",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    } else {
      this.setState({
        cancelledChequeLeaf: "",
      });
    }
  };

  handleKeyDown = evt => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      var value = this.state.value.trim();

      if (value) {
        this.setState({
          items: [...this.state.items, this.state.value],
          value: ""
        });
      }
    }
  };

  handleChange1 = evt => {
    this.setState({
      value: evt.target.value,
      error: null
    });
  };

  handleDelete = item => {
    this.setState({
      items: this.state.items.filter(i => i !== item)
    });
  };

  handlePanChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    const re = /([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}$/;
    if (!re.test(value)) {
      this.setState({
        panError: "Please enter the valid pan number",
      });
    } else {
      this.setState({
        panError: "",
      });
    }
  };


  navigate = (url) => {
    this.props.history.push(url);
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
        emailError: "Invalid email",
      });
    } else {
      this.setState({
        emailError: "",
      });
    }
  };
  handlePhoneChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    const number = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[789]\d{9}$/;
    if (value.length > 10) {
      this.setState({ phoneError: "Invalid Phone number" });
    } else if (value.length < 10) {
      this.setState({
        phoneError: "Invalid mobile number",
      });
      console.log("changing mobile" + this.state.phoneError);
    }
    else {
      this.setState({
        phoneError: "",
      });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  ChangePincodeno = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /^[A-Za-z_]+$/;

    if (value.length < 6) {
      this.setState({
        pincodeError: "Please enter the valid Pincode",
      });
    } else if (value.length > 6) {
      this.setState({
        pincodeError: "Please enter the valid Pincode",
      });
    } else {
      this.setState({
        pincodeError: "",
      });
    }
  };


  handleResdential = () => {
    const { country, address, city, state, pincode } = this.state
    this.setState({ checkBox: !this.state.checkBox });
    console.log("check bow tick========>" + this.state.checkBox)
    if (this.state.checkBox === true) {
      this.setState({ address2: address, state2: state, city2: city, country2: country, pincode2: pincode });
    }
    else if (this.state.checkBox === false) {
      this.setState({
        address2: " ", state2: " ", city2: " ", country2: " ", pincode2: " "
      });
    }
    else {
      this.setState({ address2: " " });

    }
  }
  handleAadharChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    if (value.length > 12) {
      this.setState({ aadharError: "Invalid aadhar number number" });
    } else if (value.length < 12) {
      this.setState({ aadharError: "Invalid aadhar number number" });
    } else {
      this.setState({
        aadharError: "",
      });
    }
  };

  handleSubmit1 = () => {
    this.setState({ submittedVerify: true });
    const { aadharNumber, aadharError } = this.state;
    if (aadharNumber != "" && aadharError == "") {
      this.setState({ disNext: false });
    }
    console.log("======>disable next=========>" + this.state.disNext);
    console.log("======>disable next=========>" + this.state.aadharNumber);
    console.log("======>disable next=========>" + this.state.aadharError);
  }

  handleNext = (e) => {
    e.preventDefault();
    this.setState({ submitNext: true });
    console.log("next btn check=======>" + this.state.submitNext);
    const {
      personalModel,
      aadharModel,
      firstName,
      lastName,
      gender,
      email,
      mobileNumber,
      mobileCountryCode,
      qualification,
      specialization,
      experience,
      country,
      address,
      city,
      state,
      pincode,
      country2,
      address2,
      city2,
      state2,
      pincode2,
      idProof,
      addressProof,
      panCard,
      aadharCard,
      emailError,
      phoneError,
      submitNext,
    } = this.state;
    if (
      personalModel === true
      &&

      firstName &&
      lastName &&
      gender &&
      email &&
      mobileNumber &&
      mobileCountryCode &&
      country &&
      address &&
      city &&
      state &&
      pincode &&
      country2 &&
      address2 &&
      city2 &&
      state2 &&
      pincode2 &&
      emailError == "" &&
      phoneError == ""
    ) {
      console.log("=====in if ============")
      this.setState({
        aadharModel: true,
        personalModel: false,
        showNextBtn: true,
        disNext: true,
        showBackBtn:true,
      });

    } else if (aadharModel == true) {
      this.setState({
        aadharModel: false,
        fileModel: true,
        showSubmitBtn: true,
        showNextBtn: false,
        showBackBtn:true,

      })
    }
  }
  handleBack = () => {
    const {
      personalModel,
      aadharModel,
      fileModel
    } = this.state;
    if (fileModel == true) {
      this.setState({
        fileModel: false,
        aadharModel: true,
        personalModel: false,
        showNextBtn: true,
        showSubmitBtn:false,
      })
    } else if (aadharModel === true) {
      this.setState({
        personalModel: true,
        aadharModel: false,
        fileModel: false,
        showNextBtn: true,
        disNext: false,
        showSubmitBtn:false,
      })
    }
    // }else if (personalModel===true){
    //  window.location=("/employeeList")

    // }

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    console.log("next btn check=======>" + this.state.submitNext);
  }



  navigate = (url) => {
    this.props.history.push(url);
  };

  pageBack =  () =>{
    window.location=("/employeeList")

  }

  render() {
    const {
      partnerId,
      submitted,
      employeeId,
      firstName,
      lastName,
      gender,
      email,
      mobileNumber,
      mobileCountryCode,
      qualification,
      specialization,
      experience,
      country,
      address,
      city,
      state,
      pincode,
      address2,
      country2,
      city2,
      state2,
      pincode2,
      landLineCode,
      landLineNumber,
      idProof,
      addressProof,
      panCard,
      emailError,
      checkBox,
      aadharNumber,
      submitNext,
      personalModel,
      aadharModel,
      value,
      panCardNumber,
      aadharCard,
      experienceCertificate,


    } = this.state;
    return (
      <div className="page-container" style={{ paddingLeft: "0px" }}>
        <header>
          <PartnerHeader1 />
        </header>
        {/* <Header1 navigate={(url) => this.navigate("/partnerLogin")} /> */}
        <main className="main-content bgc-grey-100 ">
          <section className="onboard mt-50">
            {" "}
            <div id="mainContent">
              <div className="row">
                <Sidemenu
                  navigate={(url) => this.navigate(url)}
                  selected="onBoardingEngineer"
                  className="sidemenu2"
                />
                <div className="col ">
                  <Container>
                    <Row>
                      <Col md="8">

                        <p style={{ fontSize: 26, color: "black" }}>
                          Add/Edit Employee
                        </p>
                      </Col>
                      <Col md="4">
                      <Button
                      onClick={this.pageBack}>
                        Back
                      </Button>
                      </Col>
                    </Row>
                    {this.state.personalModel == true ?
                      <Container>
                        <Form>
                          <Form.Row>
                            <Form.Group as={Col} md="4" controlId="firstName">
                              <Form.Label>First Name</Form.Label>
                              <input
                                type="text"
                                autoComplete="off"
                                className="form-control"
                                name="firstName"
                                value={firstName}
                                onChange={this.handleAlphaChange}
                                id="seFirstname"
                              />
                              {submitNext && !firstName && (
                                <div className="validationError">
                                  First name is required
                                </div>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="lastName">
                              <Form.Label>Last Name</Form.Label>
                              <input
                                type="text"
                                autoComplete="off"
                                className="form-control"
                                name="lastName"
                                value={lastName}
                                onChange={this.handleAlphaChange}
                                id="seLastname"
                              />
                              {submitNext && !lastName && (
                                <div className="validationError">
                                  Last name is required
                                </div>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="gender">
                              <Form.Label>Gender</Form.Label>
                              <select
                                type="dropdown"
                                autoComplete="off"
                                className="form-control"
                                name="gender"
                                value={gender}
                                onChange={this.handleChange}
                                id="seGender"
                              >
                                <option value=""></option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="male">Transgender</option>
                                <option value="male">others</option>
                              </select>
                              {submitNext && !gender && (
                                <div className="validationError">
                                  Gender is required
                                </div>
                              )}
                            </Form.Group>
                          </Form.Row>
                          <Form.Row>
                            <Form.Group as={Col} md="4" controlId="email">
                              <Form.Label>Email</Form.Label>
                              <input
                                type="text"
                                autoComplete="off"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={this.handleChanges}
                                id="seEmail"
                              />
                              {submitNext && !email && (
                                <div className="validationError">Email is required</div>
                              )}

                              {this.state.emailError !== "" && submitNext && email && (
                                <div className="validationError">
                                  {this.state.emailError}
                                </div>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="mobileCountryCode">
                              <Form.Label>Mobile Country Code </Form.Label>
                              <select
                                type="dropdown"
                                className="form-control"
                                name="mobileCountryCode"
                                value={mobileCountryCode}
                                placeholder="select"
                                onChange={this.handleChange}
                                id="seMobCountrycode"
                              >
                                <option value=""></option>

                                <option value="+91">+91</option>
                                <option value="+1">+1</option>
                                <option value="+86">+86</option>
                                <option value="+44">+44</option>
                                <option value="+81">+81</option>
                                <option value="+49">+49</option>
                                <option value="+33">+33</option>
                                <option value="+55">+55</option>
                                <option value="+39">+39</option>
                                <option value="+1">+1</option>
                                <option value="+7">+7</option>
                                <option value="+65">+65</option>
                                <option value="+64">+64</option>
                                <option value="+61">+61</option>
                                <option value="+964">+964</option>
                              </select>
                              {submitNext && !mobileCountryCode && (
                                <div className="validationError">
                                  Country Code is required
                                </div>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="mobileNumber">
                              <Form.Label>mobileNumber</Form.Label>
                              <input
                                type="number"
                                autoComplete="off"
                                className="form-control"
                                name="mobileNumber"
                                value={mobileNumber}
                                onChange={this.handlePhoneChange}
                                id="semobileNumber"

                              />
                              {submitNext && !mobileNumber && (
                                <div className="validationError">
                                  Mobile number is required
                                </div>
                              )}
                              {submitNext &&
                                this.state.phoneError != "" &&
                                mobileNumber && (
                                  <div className="validationError">
                                    {this.state.phoneError}
                                  </div>
                                )}
                            </Form.Group>
                          </Form.Row>
                          <Form.Row>
                            <Form.Group as={Col} md="4" controlId="landLineCode">
                              <Form.Label>landLineCode</Form.Label>
                              <input
                                type="number"
                                autoComplete="off"
                                className="form-control"
                                name="landLineCode"
                                value={landLineCode}
                                onChange={this.handleChange}
                                id="selandLineCode"
                              />
                              {/* {submitNext && !landLineCode && (
                        <div className="validationError">
                          landLineCode is required
                        </div>
                      )} */}
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="landLineNumber">
                              <Form.Label>landLineNumber</Form.Label>
                              <input
                                type="number"
                                autoComplete="off"
                                className="form-control"
                                name="landLineNumber"
                                value={landLineNumber}
                                onChange={this.handleChange}
                                id="selandLineNumber"
                              />
                              {/* {submitNext && !landLineNumber && (
                        <div className="validationError">
                          landLineNumber is required
                        </div>
                      )} */}
                            </Form.Group>

                          </Form.Row>


                          <hr />
                          <Row>
                            <Col>
                              <p><h4>Current Address</h4></p>
                              <Form.Row>
                                <Form.Group as={Col} md="6">
                                  <Form.Label>Country</Form.Label>
                                  {/* <Form.Control type="text" placeholder="India" value="India"  disabled /> */}
                                  <input
                                    type="text"
                                    autoComplete="off"
                                    className="form-control"
                                    name="country"
                                    value={country}
                                    onChange={this.handleAlphaChange}
                                    id="secountry"
                                  />
                                  {submitNext && !country && (
                                    <div className="validationError">
                                      country is required
                                    </div>
                                  )}

                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="state">
                                  <Form.Label>state</Form.Label>
                                  <input
                                    type="text"
                                    autoComplete="off"
                                    className="form-control"
                                    name="state"
                                    value={state}
                                    onChange={this.handleAlphaChange}
                                    id="seState"
                                  />
                                  {submitNext && !state && (
                                    <div className="validationError">State is required</div>
                                  )}
                                </Form.Group>
                              </Form.Row>
                              <Form.Row>

                                <Form.Group as={Col} md="6" controlId="city">
                                  <Form.Label>City</Form.Label>
                                  <input
                                    type="text"
                                    autoComplete="off"
                                    className="form-control"
                                    name="city"
                                    value={city}
                                    onChange={this.handleAlphaChange}
                                    id="seCity"
                                  />
                                  {submitNext && !city && (
                                    <div className="validationError">City is required</div>
                                  )}
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="address">
                                  <Form.Label>Address </Form.Label>
                                  <textarea
                                    className="form-control"
                                    name="address"
                                    value={address}
                                    onChange={this.handleChange}
                                    id="seAddress"
                                  />
                                  {submitNext && !address && (
                                    <div className="validationError">
                                      Address is required
                                    </div>
                                  )}
                                </Form.Group>
                              </Form.Row>

                              <Form.Row>
                                <Form.Group as={Col} md="6" controlId="pincode">
                                  <Form.Label>Pincode</Form.Label>
                                  <input
                                    type="number"
                                    autoComplete="off"
                                    className="form-control"
                                    name="pincode"
                                    value={pincode}
                                    onChange={this.ChangePincodeno}
                                    id="sePincode"
                                  />

                                  {submitNext && !pincode && (
                                    <div className="validationError">
                                      Pincode is required
                                    </div>
                                  )}

                                  {submitNext && pincode2 && this.state.pincodeError !== "" && (
                                    <div className="validationError">
                                      {this.state.pincodeError}
                                    </div>
                                  )}
                                </Form.Group>

                              </Form.Row>
                            </Col>
                            <Col>
                              <p><h4>Residential Address</h4></p>
                              <Form.Row>
                                <Form.Group as={Col} md="6">
                                  <Form.Label>Country</Form.Label>
                                  {/* <Form.Control type="text" placeholder="India" value="India"  disabled /> */}
                                  <input
                                    type="text"
                                    autoComplete="off"
                                    className="form-control"
                                    name="country2"
                                    value={country2}
                                    onChange={this.handleAlphaChange}
                                    id="secountry2"
                                  />
                                  {submitNext && !country2 && (
                                    <div className="validationError">
                                      country is required
                                    </div>
                                  )}

                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="state">
                                  <Form.Label>state</Form.Label>
                                  <input
                                    type="text"
                                    autoComplete="off"
                                    className="form-control"
                                    name="state2"
                                    value={state2}
                                    onChange={this.handleAlphaChange}
                                    id="seState"
                                  />
                                  {submitNext && !state2 && (
                                    <div className="validationError">State is required</div>
                                  )}
                                </Form.Group>
                              </Form.Row>
                              <Form.Row>

                                <Form.Group as={Col} md="6" controlId="city">
                                  <Form.Label>City</Form.Label>
                                  <input
                                    type="text"
                                    autoComplete="off"
                                    className="form-control"
                                    name="city2"
                                    value={city2}
                                    onChange={this.handleAlphaChange}
                                    id="seCity"
                                  />
                                  {submitNext && !city2 && (
                                    <div className="validationError">City is required</div>
                                  )}
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="address">
                                  <Form.Label>Address </Form.Label>
                                  <textarea
                                    className="form-control"
                                    name="address2"
                                    value={address2}
                                    onChange={this.handleChange}
                                    id="seAddress"
                                  />
                                  {submitNext && !address2 && (
                                    <div className="validationError">
                                      Address is required
                                    </div>
                                  )}
                                </Form.Group>
                              </Form.Row>

                              <Form.Row>
                                <Form.Group as={Col} md="6" controlId="pincode">
                                  <Form.Label>Pincode</Form.Label>
                                  <input
                                    type="number"
                                    autoComplete="off"
                                    className="form-control"
                                    name="pincode2"
                                    value={pincode2}
                                    onChange={this.ChangePincodeno}
                                    id="sePincode"
                                  />

                                  {submitNext && !pincode2 && (
                                    <div className="validationError">
                                      Pincode is required
                                    </div>
                                  )}
                                  {submitNext && pincode2 && this.state.pincodeError !== "" && (
                                    <div className="validationError">
                                      {this.state.pincodeError}
                                    </div>
                                  )}
                                </Form.Group>
                                <Form.Group as={Col} md="6"></Form.Group>
                                <Form.Group as={Col} md="6">

                                  {/* <ToggleButton
                            type="checkbox"
                            onChange={this.handleToggle}
                            className="bg-white text-dark"
                            value={'same as current address'}
                          >
                            same as current address</ToggleButton> */}
                             <Form.Label>
                                  <input type="checkbox"
                                    name="checkBox"
                                    value={checkBox}
                                    onClick={this.handleResdential}

                                  />{" "}
                                 same as current address</Form.Label>


                                </Form.Group>
                              </Form.Row>
                            </Col>
                          </Row>
                        </Form>
                      </Container>

                      : null}

                    {this.state.aadharModel == true ?
                      <Container>
                        <Form onSubmit={this.handleSubmit1}>
                          <h4>
                            <Form.Label className="heading1-self">
                              Aadhar Card Verification
                            </Form.Label>
                          </h4>
                          <Form.Row>
                            <Form.Group as={Col} md="4" controlId="pincode">
                              <Form.Label>Aadhar Number</Form.Label>
                              <Row>
                                <Col md="7">
                                  <input
                                    type="number"
                                    autoComplete="off"
                                    className="form-control"
                                    name="aadharNumber"
                                    value={aadharNumber}
                                    onChange={this.handleAadharChange}
                                    id="seAdharNumber"
                                  />
                                  {this.state.submittedVerify && !aadharNumber && (
                                    <div className="validationError">
                                      Aadhar Number is required
                                    </div>
                                  )}
                                  {this.state.submittedVerify &&
                                    this.state.aadharError !== "" &&
                                    aadharNumber && (
                                      <div className="validationError">
                                        {this.state.aadharError}
                                      </div>
                                    )}
                                </Col>
                                <Col>
                                  <Button
                                    size="sm"
                                    onClick={this.handleSubmit1}
                                    style={{ marginTop: "7px" }}
                                  >
                                    Verify
                                  </Button>
                                </Col>
                              </Row>
                            </Form.Group>
                          </Form.Row>
                        </Form>
                      </Container>
                      : null}
                    {this.state.fileModel == true ?
                      <Container>
                        <Form>
                          <h4>
                            <Form.Label className="heading1-self">Education Details</Form.Label>
                          </h4>
                          <Form.Row>


                            <Form.Group as={Col} md="4" controlId="experience">
                              <Form.Label>Experience</Form.Label>
                              <input
                                type="number"
                                autoComplete="off"
                                className="form-control"
                                name="experience"
                                value={experience}
                                onChange={this.handleExperience}
                                id="seExperience"
                              />
                              {submitted && !experience && (
                                <div className="validationError">
                                  Experience is required
                                </div>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="qualification">
                              <Form.Label>Qualification</Form.Label>
                              <input
                                type="text"
                                autoComplete="off"
                                className="form-control"
                                name="qualification"
                                value={qualification}
                                onChange={this.handleAlphaChange}
                                id="seQualification"
                              />
                              {submitted && !qualification && (
                                <div className="validationError">
                                  Qualification is required
                                </div>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="specialization">
                              <Form.Label>Specialization</Form.Label>
                              <input
                                type="text"
                                autoComplete="off"
                                className="form-control"
                                name="specialization"
                                value={specialization}
                                onChange={this.handleChange}
                                id="seSpecialization"
                              />
                              {submitted && !specialization && (
                                <div className="validationError">
                                  Specialization is required
                                </div>
                              )}
                            </Form.Group>

                          </Form.Row>
                          <Form.Row>
                            <Form.Group as={Col} md="4" >
                              <Form.Label>Skills</Form.Label>
                              <div>


                                {this.state.items.map(item => (
                                  <div className="tag-item" key={item}>
                                    {item}
                                    <button
                                      type="button"
                                      className="button"
                                      onClick={() => this.handleDelete(item)}
                                    >

                                      &times;
                                    </button>
                                  </div>
                                ))}
                                <input
                                  className="form-control"
                                  value={this.state.value}
                                  // placeholder="Type or paste email addresses and press `Enter`..."
                                  onKeyDown={this.handleKeyDown}
                                  onChange={this.handleChange1}
                                  onPaste={this.handlePaste}
                                  name="value"

                                />

                                {this.state.error && <p className="error">{this.state.error}</p>}


                                {submitted && !this.state.value && (
                                  <div className="validationError">
                                    skills is required
                                  </div>
                                )}
                              </div>
                            </Form.Group>
                          </Form.Row>
                          <h4>
                            <Form.Label className="heading1-self">File Upload</Form.Label>
                          </h4>
                          <Form.Row>
                            <Form.Group as={Col} md="4" controlId="experience">
                              <Form.Label>Pan Card Number</Form.Label>

                              <input
                                type="text"
                                autoComplete="off"
                                className="form-control"
                                name="panCardNumber"
                                value={panCardNumber}
                                onChange={this.handlePanChange}
                                id="sepanCardNumber"
                              />
                              {submitted && !panCardNumber && (
                                <div className="validationError">
                                  Pan Card is required
                                </div>
                              )}

                              {submitted &&
                                this.state.panError !== "" &&
                                panCardNumber && (
                                  <div className="validationError">
                                    {this.state.panError}
                                  </div>
                                )}
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="country">
                              <Form.Label>Aadhar Card</Form.Label>

                              <InputGroup>
                                <Button className="btn btn-primary btn-color-admin">
                                  Upload
                                  <input
                                    type="file"
                                    autoComplete="off"
                                    style={{
                                      position: "absolute",
                                      fontSize: "50px",
                                      opacity: "0",
                                      right: "0",
                                      top: "0",
                                    }}
                                    name="aadharCard"
                                    accept="image/png, image/jpeg"
                                    onChange={(e) => this.aadharCard(e)}
                                  />
                                </Button>
                                <FormControl
                                  placeholder={this.state.aadharCard.name}
                                  disabled
                                />
                              </InputGroup>

                              {submitted && !aadharCard && (
                                <div className="validationError">
                                  Aadhar Card is required
                                </div>
                              )}
                            </Form.Group>
                          </Form.Row>



                          <Form.Row>
                            <Form.Group as={Col} md="4">
                              <Form.Label>Experience certificate </Form.Label>

                              <InputGroup>
                                <Button className="btn btn-primary btn-color-admin">
                                  Upload
                                  <input
                                    type="file"
                                    autoComplete="off"
                                    style={{
                                      position: "absolute",
                                      fontSize: "50px",
                                      opacity: "0",
                                      right: "0",
                                      top: "0",
                                    }}
                                    name="experienceCertificate"
                                    accept="image/png, image/jpeg"
                                    onChange={(e) => this.experienceCertificate(e)}
                                  />
                                </Button>
                                <FormControl
                                  placeholder={this.state.experienceCertificate.name}
                                  disabled
                                />
                              </InputGroup>

                              {submitted && !experienceCertificate && (
                                <div className="validationError">
                                  Certificate is required
                                </div>
                              )}
                            </Form.Group>


                            <Form.Group as={Col} md="4">
                              <Form.Label>Address Proof</Form.Label>


                              <InputGroup>
                                <Button className="btn btn-primary btn-color-admin ">
                                  Upload
                                  <input
                                    type="file"
                                    autoComplete="off"
                                    style={{
                                      position: "absolute",
                                      fontSize: "50px",
                                      opacity: "0",
                                      right: "0",
                                      top: "0",
                                    }}
                                    name="addressProof"
                                    accept="image/png, image/jpeg"
                                    onChange={(e) => this.addressProof(e)}
                                  />
                                </Button>
                                <FormControl
                                  placeholder={this.state.addressProof.name}
                                  disabled
                                />
                              </InputGroup>
                              {submitted && !addressProof && (
                                <div className="validationError">
                                  Address Proof is required
                                </div>
                              )}
                            </Form.Group>
                          </Form.Row>
                        </Form>
                      </Container>
                      : null}

                    <Form>
                      <Form.Row>
                        <Form.Group as={Col}>
                          {this.state.showBackBtn ?
                            <Button
                              className="btn bn-primary"
                              onClick={this.handleBack}>
                              Back
                            </Button>
                            : null}
                        </Form.Group>
                        <Form.Group as={Col}>
                          {this.state.showNextBtn ?
                            <Button
                              className="btn bn-primary"
                              onClick={this.handleNext}
                              disabled={this.state.disNext}>

                              Next
                            </Button> : null}
                        </Form.Group>
                        <Form.Group as={Col}>
                          {this.state.showSubmitBtn ?
                            <Button
                              type="submit"
                              className="btn btn-primary"
                              onClick={this.handleSubmit}
                            >
                              Submit
                            </Button>
                            : null}

                        </Form.Group>
                      </Form.Row>
                    </Form>
                  </Container>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}
onboardingEngineer.propTypes = {
  addUser: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    // isDetailSuccess: state.addUserreducer.isDetailSuccess,
  };
};
const mapDispatchToProps = (dispatch) => ({
  addUser: (

  ) =>
    dispatch(
      addUser(

      )
    ),
});

export default connect(mapDispatchToProps, mapStateToProps)(onboardingEngineer);
