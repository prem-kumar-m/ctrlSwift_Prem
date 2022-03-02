import { PropTypes } from "prop-types";
import React from "react";
import {
  Alert, Button, Col, Container, Form, FormGroup, Modal, Row
} from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Swal from "sweetalert2";
import Footer from "../components/footer/Footer.js";
import Loader from "../components/loading";
import PartnerHeader from "../components/partnerHeader";
import { submitpartner } from "./action";


class partnerRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      companyError: "",
      companyUrl: "",
      companyUrlError: "",
      email: "",
      emailError: "",
      countryCode: "",
      countryCodeError: "",
      mobile: "",
      mobileError: "",
      landLineCode: "",
      landLineCodeError: "",
      landlineNumber: "",
      landlineNumberError: "",
      address: "",
      addressError: "",
      city: "",
      cityError: "",
      pincode: "",
      pincodeError: "",
      state: "",
      stateError: "",
      country: "",
      countryError: "",
      gstNumber: "",
      gstNumberError: "",
      submitted: false,
      isSuccess: false,
      // isLoginSuccess: false,
      isReadyToRedirect: false,
      isRegisterForm: true,
      AccountNumber: "",

      AccountNumber2: "",

      ifscCode: "",

      termsCondition: false,
      checkBox: false,
      BankName: "",
      branchName: "",
      swiftCode: "",
      alertbox: false,
      submittedNext: false,
      submittedRegiter: false,
      cancelledChequeLeaf: [],
      bankPassbook: "",
      submitAccept: false,
      pincodeError: "",
      // files:[],
      empCount: "",
      en1: false,
      en2: false,
      ProgressBarnum: "",
      panCardNumber: "",
      panError: "",
      firstLevel: "",
      secondLevel: "",
      thirdLevel: "",
      swiftCode:"",
      isError: {

        company: "",
        email: "",
        panCardNumber: "",
        mobile: "",
        // state: "",
        city: "",
        address: "",
        pincode: "",
        gstNumber: "",


      },
      bankError:"",
      branchError:"",
      IFSCError: "",
      AccountNumber2Error: "",
      AccountNumberError: "",
      firstError:"",
      secondError:"",
      thirdError:"",

      erroralert1: false,
      erroralert2: false,

    };
    this.handleChange = this.handleChange.bind(this);
    this.ChangeRegisterFormBack = this.ChangeRegisterFormBack.bind(this);
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    let isError = { ...this.state.isError };
    const alpha = /^[A-Za-z_ ]+$/;
    const re = /\S+@[A-Za-z]+\.com/;
    const ks = /\S+@[A-Za-z]+\.co.in/;
    const pan = /([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}$/;
    const phone = /^[0-9_]+$/;
    const ifsc = /^[A-Za-z]{4}\d{7}$/;
    const pin=/^([1-9_]){1}([0-9]){5}$/;

    switch (name) {
      case "company":
        isError.company =
          value.length < 4 ? "please enter valid company name" : "";
        break;
      case "email":
        isError.email = re.test(value) || ks.test(value) ? "" : "please enter valid email";
        break;
      case "panCardNumber":
        isError.panCardNumber = pan.test(value) ? "" : "please enter valid panCardNumber";
        break;
      case "mobile":
        isError.mobile = value.length == 10 && phone.test(value) ? "" : "please enter valid mobile";
        break;
      // case "state":
      //   isError.state = alpha.test(value) ? "" : "please enter valid state name";
      //   break;
      case "city":
        isError.city = alpha.test(value) ? "" : "please enter valid city name";
        break;
      case "address":
        isError.address = value.length < 4 ? " address is too short" : "";
        break;

      case "pincode":
        isError.pincode =  pin.test(value) ? "" : "please enter valid pincode";
        break;

      case "gstNumber":
        isError.gstNumber = value.length == 15 ? "" : "please enter valid gstNumber";
        break;

    }
    this.setState({ isError, [name]: value });
  }

  handleFirstChanges = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /\S+@[A-Za-z]+\.com/;
    const ks = /\S+@[A-Za-z]+\.co.in/;
    if (!re.test(value) && !ks.test(value)) {
      this.setState({
        firstError: "Invalid email",
      });
    } else {
      this.setState({
        firstError: "",
      });
    }
  };
  handleSecondChanges = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /\S+@[A-Za-z]+\.com/;
    const ks = /\S+@[A-Za-z]+\.co.in/;
    if (!re.test(value) && !ks.test(value)) {
      this.setState({
        secondError: "Invalid email",
      });
    } else {
      this.setState({
        secondError: "",
      });
    }
  };
  handleThirdChanges = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /\S+@[A-Za-z]+\.com/;
    const ks = /\S+@[A-Za-z]+\.co.in/;
    if (!re.test(value) && !ks.test(value)) {
      this.setState({
        thirdError: "Invalid email",
      });
    } else {
      this.setState({
        thirdError: "",
      });
    }
  };
  handleCountryChange = (event) => {
    const { country, value } = event.target;

    this.setState({
      country: value,
    });
    console.log(value);
  };
  handleSwiftChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleBankChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /^[A-Za-z_ ]+$/;
    if (!re.test(value)) {
      this.setState({
        bankError: "Please enter the valid Bank name",
      });
    } else {
      this.setState({
        bankError: "",
      });
    }
  };
  handleBranchChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /^[A-Za-z_ ]+$/;
    if (!re.test(value)) {
      this.setState({
        branchError: "Please enter the valid Branch name",
      });
    } else {
      this.setState({
        branchError: "",
      });
    }
  };
  ChangeAccountno = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /^[A-Za-z_]+$/;

    if (value.length < 9) {
      this.setState({
        AccountNumberError: "Please enter the valid Account number",
      });
    } else if (value.length > 19) {
      this.setState({
        AccountNumberError: "Please enter the valid Account number",
      });
    }
    // else if (value !== this.state.AccountNumber2) {
    //   this.setState({
    //     AccountNumberError: "Entered Account number Mismatch",
    //   });
    // }
    else {
      this.setState({
        AccountNumberError: "",
      });
    }
  };
  ChangeAccountnoMatch = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    console.log(value);
    if (value !== this.state.AccountNumber) {
      this.setState({
        reEnterAccError: "Entered Account number Mismatch",
      });
    } else if (value == this.state.AccountNumber) {
      this.setState({
        reEnterAccError: "",
      });
    }
  };
  ChangeIFSC = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /^[A-Za-z]{4}\d{7}$/;

    if (value.length < 11) {
      this.setState({
        IFSCError: "Please enter the valid IFSC",
      });
    } else {
      this.setState({
        IFSCError: "",
      });
    }
  };
  ChangeCompanyUrl = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const yu = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;

    if (!yu.test(value)) {
      this.setState({
        companyUrlError: "Please enter the valid company url",
      });
    } else {
      this.setState({
        companyUrlError: "",
      });
    }
  };
  handleChangenum = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };



  handleChangeFile = (event) => {
    console.log(event.target.files);
    let cancelledChequeLeaf = '';
    if (event.target.files[0] !== undefined && event.target.files[0] !== null) {
      const currentFiles = event.target.files;
      var type = "";
      for (var i = 0; i < currentFiles.length; i++) {
        var name = currentFiles[i].name;
        type = currentFiles[i].type;
        console.log("Filename: " + name + " , Type: " + type);
      }
      this.setState({
        cancelledChequeLeaf: currentFiles,
      }, () => console.log("multi files" + JSON.stringify(this.state.cancelledChequeLeaf)));
      if (
        type === "image/png" || type === "image/jpeg"
      ) {
        this.setState({ cancelledChequeLeaf: currentFiles });
      } else if (
        type !== "image/png" && type !== "image/jpeg"
      ) {
        document.getElementById("exampleFormControlFile1").value = "";
        this.setState({ cancelledChequeLeaf: "" });
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
  }





  ChangeRegisterForm = () => {
    this.setState({ submittedNext: true });
    const {
      company,
      companyUrl,
      email,
      city,
      countryCode,
      mobile,

      address,
      pincode,
      state,
      country,
      gstNumber,
      panCardNumber,
      submittedNext,
      mobileError,
      pincodeError,
      isError
    } = this.state;

    if (
      // submittedNext===true &&
      company
      &&
      email &&
      panCardNumber&&
      countryCode &&
      mobile &&
      country &&
      // state &&
      city &&
      address &&
      pincode &&
      gstNumber &&
      isError.company == "" &&
      isError.email == ""&&
      isError.panCardNumber == ""&&
      isError.mobile == "" &&
      // isError.state == ""&&
      isError.city == "" &&
      isError.address == ""&&
      isError.pincode == "" &&
      isError.gstNumber == ""

    ) {
      this.setState({
        isRegisterForm: false,
      });
      document.documentElement.scrollTop = 0;
      console.log("in next if case---------",this.state.submittedNext);
    } else {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.setState({ erroralert1: true }, () => {
        window.setTimeout(() => {
          this.setState({ erroralert1: false });
        },3000);
      });
      console.log("alert check in first--------"+this.state.erroralert1);

    }
  };
  ChangeRegisterFormBack = () => {
    console.log("---------------working back-------");
    this.setState({
      isRegisterForm: true,
    });
    document.documentElement.scrollTop = 0;
  };
  openTc = () => {
    this.setState({ submittedRegiter: true });
    console.log("==============in register button============");
    const {
      AccountNumber,
      AccountNumber2,
      ifscCode,
      BankName,
      branchName,
      cancelledChequeLeaf,
      empCount,
      firstLevel,
      secondLevel,
      thirdLevel,
      // isError,
      submittedRegiter,
      swiftCode,
      bankError,
      branchError,
      AccountNumber2Error,
      AccountNumberError,
      IFSCError ,emailError


    } = this.state;
    if (
      // submittedRegiter===true
      firstLevel&&
      secondLevel&&
      thirdLevel&&
      // empCount &&
      AccountNumber &&
      AccountNumber2 &&
      ifscCode &&
      BankName
      &&
      branchName &&
      cancelledChequeLeaf.length !== 0 &&
      cancelledChequeLeaf.length === 2 &&
      swiftCode&&
      bankError===""&&
      branchError===""&&
      AccountNumber2Error===""&&
      AccountNumberError === ""&&
      IFSCError === ""&&
      emailError ===""

    ) {
      console.log("checkin--------- inside if 2");

      this.setState({
        termsCondition: true,
      });

      console.log("checking second if-----------",this.state.termsCondition);
      console.log("firstLevel------",firstLevel,
     "secondLevel------",secondLevel,
     "thirdLevel------",thirdLevel,
     "empcount-------",empCount,
     "AccountNumber--------",AccountNumber,
     "AccountNumber2-------",AccountNumber2,
     "ifscCode------",ifscCode,
     "BankName-----",BankName,
     "branchName----",branchName,
     "cancelledChequeLeaf--------",cancelledChequeLeaf.length,


     );
     }

     else {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.setState({ erroralert2: true }, () => {
        window.setTimeout(() => {
          this.setState({ erroralert2: false });
        },3000);
      });
       console.log("alert check in second--------else");
      console.log("\nfirstLevel------",firstLevel,
      "\nsecondLevel------",secondLevel,
      "\nthirdLevel------",thirdLevel,
      "\nempcount-------",empCount,
      "\nAccountNumber--------",AccountNumber,
      "\nAccountNumber2-------",AccountNumber2,
      "\nifscCode------",ifscCode,
      "\nBankName-----",BankName,
      "\nbranchName----",branchName,
      "\ncancelledChequeLeaf--------",cancelledChequeLeaf.length,
      "\n AccountNumber2Error-------",AccountNumber2Error,
      "\n AccountNumberError-------",AccountNumberError,
      "\n branchError--------", branchError,
      "\n bankError ---------",bankError ,
      "\n IFSCError --------",IFSCError ,
      "\n swiftCode-------",swiftCode,
      "\n cancelledChequeLeaf.length-------", cancelledChequeLeaf.length,


      );

    }

  };

  handleClose = () => {
    this.setState({
      termsCondition: false,
    });
  };
  handleCheckbox = () => {
    if (this.state.checkBox == false) {
      this.setState({
        checkBox: true,
      });
    } else {
      this.setState({
        checkBox: false,
      });
    }

    console.log(this.state.checkBox);
  };

  handleSubmit1 = (event) => {
    event.preventDefault();
    this.setState({ submitAccept: true });
    const {
      company,
      companyUrl,
      email,
      city,
      countryCode,
      mobile,
      address,
      pincode,
      state,
      country,
      gstNumber,
      AccountNumber,
      AccountNumber2,
      ifscCode,
      BankName,
      branchName,
      swiftCode,
      cancelledChequeLeaf,
      landlineNumber,
      landLineCode,
      bankPassbook,
    } = this.state;
    if (this.state.checkBox == true) {
      console.log(
        company,
        companyUrl,
        email,
        city,
        countryCode,
        mobile,
        address,
        pincode,
        state,
        country,
        gstNumber,
        AccountNumber,
        AccountNumber2,
        ifscCode,
        BankName,
        branchName,
        swiftCode,
        cancelledChequeLeaf,
        landlineNumber,
        landLineCode,
        bankPassbook
      );
      const formData = new FormData();
      formData.append("company", company);
      formData.append("email", email);
      formData.append("countryCode", countryCode);
      formData.append("mobile", mobile);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("pincode", pincode);
      formData.append("state", state);
      formData.append("country", country);
      // formData.append("companyUrl", companyUrl);
      formData.append("gstNumber", gstNumber);
      formData.append("BankName", BankName);
      formData.append("AccountNumber", AccountNumber);
      formData.append("ifscCode", ifscCode);
      formData.append("swiftCode", swiftCode);
      formData.append("branchName", branchName);
      formData.append("cancelledChequeLeaf", cancelledChequeLeaf);
      formData.append("bankPassbook", bankPassbook);
      formData.append("landlineNumber", landlineNumber);
      formData.append("landLineCode", landLineCode);

      this.props.submitpartner(formData);
      console.log("=======formData========" + JSON.stringify(formData));

      // Swal.fire({
      //   text: "Your Application in process",
      //   confirmButtonColor: "#3085d6",
      //   confirmButtonText: "ok ",
      // });
      // .then(function(){
      //   window.location="/"
      // });
      // this.props.history.push("/HomePage");
    } else if (this.state.checkBox == false) {
      this.setState({
        checkBoxError: "Accept Terms & Condition",
      });
      this.setState({ alertbox: true }, () => {
        window.setTimeout(() => {
          this.setState({ alertbox: false });
        }, 3000);
      });
    }
  };
  handleAlertclose = () => {
    this.setState({
      erroralert: false,
    })
  }


  componentDidMount() {

    var x = { a: 2 };
    var y = x;
    console.log("before \n x \n" + x.a + "\n y\n" + y.a);
    x.a += x.a;
    console.log("after \n x \n" + x.a + "\n y\n" + y.a);
    // this.props.requestloadcitybycountry();
    console.log("Calling load cities list....................");
    console.log("country in index  ...................." + this.state.country);

    // this.props.requestloadcompany();
    console.log("company  ...................." + this.state.company);

    console.log("----companylist---" + this.props.companylist);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log("===========>", this.state.cancelledChequeLeaf[1])

    // console.log("data value  alert", this.state.erroralert);

    if (this.props.isSuccess !== prevProps.isSuccess) {
      if (
        this.state.submitAccept &&
        this.props.isSuccess &&
        this.props.isSuccess.success
      ) {
        console.log(this.props.isSuccess.message);
        Swal.fire({
          title: "Thank You !",
          text: this.props.isSuccess.message,
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        this.setState({ isLoading: false, isReadyToRedirect: true });
      } else if (this.state.submitAccept && !this.props.isSuccess.success) {
        Swal.fire({
          title: "",
          text: this.props.isSuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        this.setState({ isReadyToRedirect: false, isLoading: false });
      }
    }
  }

  render() {
    if (this.state.isReadyToRedirect) return <Redirect to="/partners" />;
    const {
      company,
      companyUrl,
      email,
      countryCode,
      mobile,
      landLineCode,
      landlineNumber,
      address,
      city,
      pincode,
      state,
      country,
      gstNumber,
      submitted,
      swiftCode,
      AccountNumber,
      AccountNumber2,
      ifscCode,
      checkBox,
      BankName,
      branchName,
      submittedNext,
      submittedRegiter,
      cancelledChequeLeaf,
      bankPassbook,
      empCount,
      panCardNumber,
      firstLevel,
      secondLevel,
      thirdLevel,
      // swiftCode,
    } = this.state;

    return (
      <div>
        {/* <HeaderSign /> */}
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div>
            <PartnerHeader />
            <div className="view">
              <section class="generic-banner relative banner-area-inner1">
                <div
                  class="overlay overlay-bg overlay-bg-blk"
                  style={{ backgroundColor: "black", opacity: 0.5 }}
                ></div>
                <div class="container">
                  <div class="row height align-items-center justify-content-center">
                    <div class="col-lg-10">
                      <div class="generic-banner-content inner-banner-txt"></div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <br />
            <Container>
              <Row>
                <Col>
                  <p style={{ fontSize: 26, color: "black" }}>
                    To register, Please take the time to fill out the
                    information below.
                  </p>
                </Col>
              </Row>



            </Container>


            {this.state.isRegisterForm == true ? (
              <Container className="pt-10">
                {this.state.erroralert1 == true ? (
                  <Row>
                    <Col>
                      <Alert variant="danger" onClick={() => this.handleAlertclose()} dismissible show={this.state.erroralert}>
                        <p> Please enter <strong>mandatory!</strong> field</p>
                      </Alert>
                    </Col>
                  </Row>
                )
                  : null}
                <h3>Company Details</h3>
                <Form>
                  <Form.Row>
                    <Form.Group as={Col} md="6" controlId="company">
                      <Form.Label>
                        Company Name<i className="validationError">*</i>
                      </Form.Label>

                      <input
                        type="text"
                        autocomplete="off"
                        className="form-control"
                        required
                        pattern="[0-9a-zA-Z_.-]*"
                        onChange={this.handleChange}
                        name="company"
                        value={company}
                        id="p"
                      />
                      {submittedNext && !company && (
                        <div className="validationError nav-left nav-left">
                          Company is required
                        </div>
                      )}
                      {submittedNext &&
                        this.state.isError.company !== "" &&
                        company && (
                          <div className="validationError">
                            {this.state.isError.company}
                          </div>
                        )}
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="companyUrl">
                      <Form.Label>Company Website</Form.Label>
                      <input
                        type="text"
                        autocomplete="off"
                        className="form-control"
                        required
                        pattern="[0-9a-zA-Z_.-]*"
                        onChange={this.ChangeCompanyUrl}
                        name="companyUrl"
                        value={companyUrl}
                      />
                      {/* {submittedNext && !companyUrl && (
                        <div className="validationError nav-left">
                          {" "}
                          Company Url is required
                        </div>
                      )} */}
                      {submittedNext &&
                        this.state.companyUrlError !== "" &&
                        companyUrl && (
                          <div className="validationError">
                            {this.state.companyUrlError}
                          </div>
                        )}
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="6" controlId="email">
                      <Form.Label>
                        Email<i className="validationError">*</i>
                      </Form.Label>
                      <input
                        type="text"
                        autocomplete="off"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                      />
                      {submittedNext && !email && (
                        <div className="validationError nav-left">
                          Work Mail is required
                        </div>
                      )}
                      {submittedNext &&
                        this.state.isError.email !== "" &&
                        email && (
                          <div className="validationError">
                            {this.state.isError.email}
                          </div>
                        )}
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="gstNumber">
                      <Form.Label>
                        Pan Number<i className="validationError">*</i>
                      </Form.Label>
                      <input
                        type="text"
                        className="form-control"
                        name="panCardNumber"
                        value={panCardNumber}
                        onChange={this.handleChange}
                      />
                      {submittedNext && !panCardNumber && (
                        <div className="validationError nav-left">
                          Pan number is required
                        </div>
                      )}
                      {submittedNext && panCardNumber && this.state.isError.panCardNumber !== "" && (
                        <div className="validationError nav-left">
                          {this.state.isError.panCardNumber}
                        </div>
                      )}
                    </Form.Group>

                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} sm="2" controlId="countryCode">
                      <Form.Label>
                        Country Code <i className="validationError">*</i>
                      </Form.Label>
                      <select
                        type="dropdown"
                        className="form-control"
                        name="countryCode"
                        value={countryCode}
                        placeholder="select"
                        onChange={this.handleChange}
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
                      {submittedNext && !countryCode && (
                        <div className="validationError nav-left">
                          Country code is required
                        </div>
                      )}
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="mobile">
                      <Form.Label>
                        Mobile <i className="validationError">*</i>
                      </Form.Label>
                      <input
                        type="number"
                        className="form-control"
                        name="mobile"
                        value={mobile}
                        minLength="15"
                        maxLength="15"
                        onChange={this.handleChange}
                        format="##########"
                      />
                      {submittedNext && !mobile && (
                        <div className="validationError nav-left">
                          Mobile is required
                        </div>
                      )}
                      {submittedNext &&
                        this.state.isError.mobile !== "" &&
                        mobile && (
                          <div className="validationError">
                            {this.state.isError.mobile}
                          </div>
                        )}
                    </Form.Group>
                    <Form.Group as={Col} sm="2" controlId="landLineCode">
                      <Form.Label>Land Line Code</Form.Label>
                      <input
                        type="number"
                        className="form-control"
                        name="landLineCode"
                        value={landLineCode}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="landlineNumber">
                      <Form.Label>Landline</Form.Label>
                      <input
                        type="number"
                        autocomplete="off"
                        className="form-control"
                        name="landlineNumber"
                        value={landlineNumber}
                        onChange={this.handleChangenum}
                        maxLength={8}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="6" controlId="country">
                      <Form.Label>
                        Country <i className="validationError">*</i>
                      </Form.Label>

                      <select
                        type="dropdown"
                        className="form-control"
                        name="country"
                        value={country}
                        placeholder="select"
                        onChange={this.handleCountryChange}
                      >
                        <option value=""></option>
                        <option value="India">India</option>
                        <option value="US">US</option>
                        <option value="China">China</option>
                        <option value="UK">Uk</option>
                        <option value="Japan">Japan</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Italy">Italy</option>
                        <option value="Canada">Canada</option>
                        <option value="Russia">Russia</option>
                        <option value="Singapore">Singapore</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Australia">Australia</option>
                        <option value="Iraq">Iraq</option>
                      </select>

                      {submittedNext && !country && (
                        <div className="validationError nav-left">
                          Country is required
                        </div>
                      )}
                    </Form.Group>
                    {/* <Form.Group as={Col} md="6" controlId="state">
                      <Form.Label>
                        State <i className="validationError">*</i>
                      </Form.Label>

                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={state}
                        onChange={this.handleChange}
                      ></input>

                      {submittedNext && !state && (
                        <div className="validationError nav-left">
                          State is required
                        </div>
                      )}
                      {submittedNext &&
                        this.state.isError.state !== "" &&
                        state && (
                          <div className="validationError">
                            {this.state.isError.state}
                          </div>
                        )}
                    </Form.Group> */}
                  {/* </Form.Row>
                  <Form.Row> */}
                    <Form.Group as={Col} md="6" controlId="city">
                      <Form.Label>
                        City<i className="validationError">*</i>
                      </Form.Label>

                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={city}
                        onChange={this.handleChange}
                      />
                      {submittedNext && !city && (
                        <div className="validationError nav-left">
                          City is required
                        </div>
                      )}
                      {submittedNext &&
                        this.state.isError.city !== "" &&
                        email && (
                          <div className="validationError">
                            {this.state.isError.city}
                          </div>
                        )}
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} md="6" controlId="address">
                      <Form.Label>
                        Address <i className="validationError">*</i>
                      </Form.Label>
                      <textarea
                        className="form-control"
                        name="address"
                        value={address}
                        onChange={this.handleChange}
                      />
                      {submittedNext && !address && (
                        <div className="validationError nav-left">
                          Address is required
                        </div>
                      )}
                      {submittedNext && this.state.isError.address && (
                        <div className="validationError nav-left">
                          {this.state.isError.address}
                        </div>
                      )}
                    </Form.Group>

                    <Form.Group as={Col} md="6" controlId="pincode">
                      <Form.Label>
                        Pincode<i className="validationError">*</i>
                      </Form.Label>
                      <input
                        type="number"
                        className="form-control"
                        name="pincode"
                        value={pincode}
                        onChange={this.handleChange}
                      />
                      {submittedNext && !pincode && (
                        <div className="validationError nav-left">
                          Pincode is required
                        </div>
                      )}

                      {submittedNext &&
                        this.state.isError.pincode !== "" &&
                        pincode && (
                          <div className="validationError">
                            {this.state.isError.pincode}
                          </div>
                        )}
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} md="6" controlId="gstNumber">
                      <Form.Label>
                        Gst Number<i className="validationError">*</i>
                      </Form.Label>
                      <input
                        type="text"
                        className="form-control"
                        name="gstNumber"
                        value={gstNumber}
                        onChange={this.handleChange}
                      />
                      {submittedNext && !gstNumber && (
                        <div className="validationError nav-left">
                          GST number is required
                        </div>
                      )}
                      {submittedNext &&
                        this.state.isError.gstNumber !== "" &&
                        gstNumber && (
                          <div className="validationError">
                            {this.state.isError.gstNumber}
                          </div>
                        )}
                    </Form.Group>

                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} sm="11" />
                    <Form.Group as={Col} sm="1" controlId="register">
                      <Button
                        className=" primary medium radius text-uppercase"
                        onClick={this.ChangeRegisterForm}
                      >
                        Next
                      </Button>
                    </Form.Group>
                  </Form.Row>
                </Form>
              </Container>
            ) : (
              <Container className="mt-10">
                {this.state.erroralert2 == true ? (
              <Row>
                <Col>
                  <Alert variant="danger" onClick={() => this.handleAlertclose()} dismissible show={this.state.erroralert}>
                    <p> Please enter <strong>mandatory!</strong> field</p>
                  </Alert>
                </Col>
              </Row>
            )
              : null}
                <Form>
                  <Form.Row>
                    <Form.Group as={Col} md="6" controlId="contactmatrix">
                      <Form.Label>
                        contact matrix<i className="validationError">*</i>
                      </Form.Label>

                      <input
                        type="text"
                        autocomplete="off"
                        className="form-control"
                        placeholder={this.state.email}
                        disabled

                      />

                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Label>
                      Escalation matrix<i className="validationError">*</i>
                    </Form.Label>
                  </Form.Row>


                  <Form.Row>
                    <Form.Group as={Col}  >
                      <Form.Label>First level</Form.Label>

                      <input as={Col}
                        type="text"
                        autocomplete="off"
                        className="form-control "
                        name="firstLevel"
                        value={firstLevel}
                        onChange={this.handleFirstChanges}


                      />
                      {submittedRegiter && !firstLevel && (
                        <div className="validationError nav-left">
                          {" "}
                          First Level is required
                        </div>
                      )}
                      {submittedRegiter &&
                        this.state.firstError !== "" &&
                        firstLevel && (
                          <div className="validationError">
                            {this.state.firstError}
                          </div>
                        )}
                    </Form.Group>
                    <Form.Group as={Col} className="mt-2" >
                      <Form.Label as={Col}  >Second level</Form.Label>

                      <input as={Col}
                        type="text"
                        autocomplete="off"
                        className="form-control ml-10 mr-10"
                        name="secondLevel"
                        value={secondLevel}
                        onChange={this.handleSecondChanges}


                      />
                      {submittedRegiter && !secondLevel && (
                        <div className="validationError nav-left">
                          {" "}
                          Second Level is required
                        </div>
                      )}
                      {submittedRegiter &&
                        this.state.secondError !== "" &&
                        secondLevel && (
                          <div className="validationError">
                            {this.state.secondError}
                          </div>
                        )}
                    </Form.Group>
                    <Form.Group as={Col} className="mt-2" >
                      <Form.Label as={Col} >Third level</Form.Label>
                      <input as={Col}
                        type="text"
                        autocomplete="off"
                        className="form-control ml-10 mr-10"
                        name="thirdLevel"
                        value={thirdLevel}
                        onChange={this.handleThirdChanges}


                      />
                      {submittedRegiter && !thirdLevel && (
                        <div className="validationError nav-left">
                          {" "}
                          Third Level is required
                        </div>
                      )}
                      {submittedRegiter &&
                        this.state.thirdError !== "" &&
                        thirdLevel && (
                          <div className="validationError">
                            {this.state.thirdError}
                          </div>
                        )}
                    </Form.Group>
                  </Form.Row>
                  <br />

                  <Form.Row>
                    <Form.Group as={Col} md="6" >

                      <Form.Label>
                        Count of Employees<i className="validationError">*</i>
                      </Form.Label>

                      <select
                        type="dropdown"
                        className="form-control"
                        name="empCount"
                        value={empCount}
                        // placeholder="select"
                        onChange={this.handleChange}
                      >
                        <option value=""></option>

                        <option value="1 to 50">0 to 50</option>
                        <option value="50 to 100">50 to 100</option>
                        <option value="100 to 250">100 to 250</option>
                        <option value=" above 250">above 250</option>
                      </select>
                      {submittedRegiter && !empCount && (
                        <div className="validationError nav-left">
                          {" "}
                          Field is required
                        </div>
                      )}
                    </Form.Group>
                  </Form.Row>
                  <br />
                  <br />

                  <h3>Bank information</h3>
                  <br />

                  <Form.Row>
                    <Form.Group as={Col} md="6" controlId="AccountNumber">
                      <Form.Label>
                        Account Number<i className="validationError">*</i>
                      </Form.Label>

                      <input
                        type="text"
                        autocomplete="off"
                        className="form-control"
                        required
                        pattern="[0-9a-zA-Z_.-]*"
                        onChange={this.ChangeAccountno}
                        name="AccountNumber"
                        value={AccountNumber}
                      />
                      {submittedRegiter && !AccountNumber && (
                        <div className="validationError nav-left">
                          Account number is required
                        </div>
                      )}
                      {submittedRegiter &&
                        this.state.AccountNumberError !== "" &&
                        AccountNumber && (
                          <div className="validationError">
                            {this.state.AccountNumberError}
                          </div>
                        )}
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="AccountNumber2">
                      <Form.Label>
                        Re-Enter Account Number<i className="validationError">*</i>
                      </Form.Label>
                      <input
                        type="text"
                        autocomplete="off"
                        className="form-control"
                        required
                        pattern="[0-9a-zA-Z_.-]*"
                        onChange={this.ChangeAccountnoMatch}
                        name="AccountNumber2"
                        value={AccountNumber2}
                      />
                      {submittedRegiter && !AccountNumber2 && (
                        <div className="validationError nav-left">
                          {" "}
                          Account number Mismatching
                        </div>
                      )}
                      {submittedRegiter &&
                        this.state.AccountNumber2Error !== "" &&
                        AccountNumber2 && (
                          <div className="validationError">
                            {this.state.AccountNumber2Error}
                          </div>
                        )}
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="6" controlId="ifscCode">
                      <Form.Label>
                        IFSC Code<i className="validationError">*</i>
                      </Form.Label>

                      <input
                        type="text"
                        autocomplete="off"
                        className="form-control"
                        required
                        pattern="[0-9a-zA-Z_.-]*"
                        onChange={this.ChangeIFSC}
                        name="ifscCode"
                        value={ifscCode}
                      />
                      {submittedRegiter && !ifscCode && (
                        <div className="validationError nav-left">
                          IFsc Code is required*
                        </div>
                      )}
                      {submittedRegiter &&
                        this.state.IFSCError !== "" &&
                        ifscCode && (
                          <div className="validationError">
                            {this.state.IFSCError}
                          </div>
                        )}
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="company">
                      <Form.Label>
                        Bank Name<i className="validationError">*</i>
                      </Form.Label>

                      <input
                        type="text"
                        className="form-control"
                        name="BankName"
                        value={this.state.BankName}
                        onChange={this.handleBankChange}
                        autocomplete="off"
                      />

                      {submittedRegiter &&
                        BankName &&
                        this.state.bankError !== "" && (
                          <div className="validationError nav-left">
                            {this.state.bankError}{" "}
                          </div>
                        )}

                      {submittedRegiter && !BankName && (
                        <div className="validationError nav-left">
                          Bank Name is required
                        </div>
                      )}
                    </Form.Group>

                  </Form.Row>
                  <Form.Row>


                    <Form.Group
                      as={Col}
                      md="6"
                      controlId="companyUrl"
                      autoComplete="off"
                    >
                      <Form.Label>
                        Branch <i className="validationError">*</i>
                      </Form.Label>
                      <input
                        type="text"
                        className="form-control"
                        name="branchName"
                        value={this.state.branchName}
                        onChange={this.handleBranchChange}
                        autocomplete="off"
                      />

                      {submittedRegiter && !branchName && (
                        <div className="validationError nav-left">
                          Branch is required
                        </div>
                      )}

                      {submittedRegiter &&
                        branchName &&
                        this.state.branchError !== "" && (
                          <div className="validationError nav-left">
                            {this.state.branchError}{" "}
                          </div>
                        )}
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="country">
                    <Form.Label>Swift Code<i className="validationError">*</i></Form.Label>
                    <input
                      type="text"
                      autoComplete="off"
                      className="form-control"
                      name="swiftCode"
                      value={swiftCode}
                      onChange={this.handleSwiftChange}
                      id="seSwift"
                    />
                    {submittedRegiter && !swiftCode && (
                      <div className="validationError">
                        Swift Code is required
                      </div>
                    )}
                  </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} md="6" controlId="taxId">
                      <Form.Label>
                        {" "}
                        Files Upload<i className="validationError">*</i><span>{" "}(Bank Passbook,Cancelled Cheque Leaf)</span>
                      </Form.Label>
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        class="form-control-file"
                        id="exampleFormControlFile1"
                        name="cancelledChequeLeaf"
                        style={{ borderBlockStyle: "outset" }}
                        // onChange={(e) => this.file(e)}
                        onChange={this.handleChangeFile}
                        multiple
                      />
                      {submittedRegiter && cancelledChequeLeaf.length === 0 && (
                        <div className="validationError nav-left">
                          file is required
                        </div>
                      )}
                      {submittedRegiter && cancelledChequeLeaf.length > 2 ?(
                      <div className="validationError">
                        files exceed the limit
                      </div>
                    ):submittedRegiter && cancelledChequeLeaf.length===1?(
                      <div className="validationError">
                        Upload two respective files
                      </div>
                    ):null}
                    </Form.Group>
                                    </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="6">
                      <Button
                        className=" primary radius text-uppercase"
                        onClick={this.ChangeRegisterFormBack}
                      >
                        <i class="glyphicon glyphicon-chevron-left" />
                        Back
                      </Button>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      <Button
                        className=" primary radius text-uppercase"
                        onClick={this.openTc}
                      >
                        Register
                      </Button>
                    </Form.Group>
                  </Form.Row>
                </Form>
              </Container>
            )}
            <br />


            <Modal
              show={this.state.termsCondition}
              onHide={this.handleClose}
              backdrop={"static"}
            >
              <Modal.Header closeButton>TERMS AND CONDITION</Modal.Header>
              <Modal.Body>
                A Terms and Conditions agreement outlines the terms that
                visitors must agree to if they want to interact with your
                website. Essentially, if the visitor continues to use the
                website after accepting the Terms, they enter into a contract
                with you.
              </Modal.Body>
              <Modal.Footer>

                <label>
                <input
                  type="checkbox"
                  label="Click here to accept the terms and conditions"
                  name="checkBox"
                  onClick={this.handleCheckbox}
                  value={checkBox}
                />
                 Click here to accept the terms and conditions</label>

                {this.state.alertbox == true ? (
                  <div>
                    {this.state.checkBoxError !== "" && (
                      <div>
                        <Alert variant="danger">
                          {this.state.checkBoxError}
                        </Alert>
                      </div>
                    )}
                  </div>

                ) : null}

                <Button
                  className=" primary radius text-uppercase"
                  onClick={this.handleSubmit1}
                >
                  Accept
                </Button>
              </Modal.Footer>
            </Modal>

            <Footer />
          </div>
        )}
      </div>
    );
  }
}

partnerRegister.propTypes = {
  submitpartner: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    isSuccess: state.partnerRegisterReducer.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  submitpartner: (data) => dispatch(submitpartner(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(partnerRegister);
