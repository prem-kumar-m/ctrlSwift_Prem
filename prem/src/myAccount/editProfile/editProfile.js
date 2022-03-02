import { PropTypes } from "prop-types";
import React from "react";
import {
  Button, ButtonGroup, ButtonToolbar, Col, Container, Form, Modal, Row
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import ShowMoreText from "react-show-more-text";
import Swal from "sweetalert2";
import Footer from "../../components/footer/Footer.js";
import { forgotOtpCustomer, newPasswordCustomer, resendOtpCustomer, verifyEmailCustomer } from "../../components/header/action";
import HeaderLogin from "../../components/header_login/HeaderLogin";
import Loader from "../../components/loading";
import * as Constants from "../../constants";
import {
  profileUpdate,
  requestloadcitybycountry, requestloadprofileUpdate, resendOtp,
  updateUser
} from "./action";

class editProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: "",
      checkBox: "",
      firstName: "",
      firstNameError: "",
      lastName: "",
      lastNameError: "",
      email: "",
      transferemail: "",
      emailError: "",
      transferemailError: "",
      departmentError: "",
      mobileError: "",
      landLineError: "",
      companyError: "",
      mobileCountryCodeError: "",
      department: "",
      mobile: "",
      landLine: "",
      company: "",
      address: "",
      city: "",
      addressError: "",
      countryError: "",
      cityError: "",
      pincodeError: "",
      mobileCountryCode: "",
      landlineCountryCode: "",
      mobileCode: "",

      isReadyToRedirect: false,
      isVerifySuccess: false,

      country: "",
      code: "",
      code1: "",
      pincode: "",
      submitted: false,
      isLoginSuccess: false,
      isSuccess: false,
      users: [],
      isCityLoaded: false,
      drop: "",
      cityOption: "",
      selectedCity: "",
      isUserLoaded: false,
      hideshow: true,
      anotherAddress: "",
      anotherCountry: "",
      anotherCity: "",
      anotherPincode: "",
      password: "",
      passwordError: "",
      showotpModal: false,
      otp: "",
      isPlanOrdered: 1,
      isAdmin: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCitySelectChange = this.handleCitySelectChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleCompanySelectChange = this.handleCompanySelectChange.bind(this);
    this.handleSubmitOtp = this.handleSubmitOtp.bind(this);
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };


  handleCitySelectChange = (selectedOption) => {
    this.setState({
      city: selectedOption.label,
      selectedCity: selectedOption.label,
    });
  };
  handleCompanySelectChange = (selectedOption) => {
    this.setState({
      company: selectedOption.label,
      selectedCompany: selectedOption.label,
    });
  };

  executeOnClick(isExpanded) {
    console.log(isExpanded);
  }

  changeMobile = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    var mobileno;
    if(isNaN(value)){
        mobileno = true;
    }else{
      mobileno=false;
    }

    if (value.length < 10) {
      this.setState({
        mobileError: "Invalid mobile number",
      });
      console.log("changeing mobile" + this.state.mobileError);
    }else if(mobileno === true){
      this.setState({
        mobileError: "Mobile numbers is not a number",
      });
    }
     else {
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
  Changepassword = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /^[A-Za-z_ ]+$/;

    if (!re.test(value)) {
      this.setState({
        passwordError: "Please enter the password",
      });
    } else {
      this.setState({
        passwordError: "",
      });
    }
  };
  ChangelandLine = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });

    if (value.length > 10) {
      this.setState({
        landLineError: "Invalid landLine number",
      });
      console.log("changing landLine" + this.state.landLineError);
    } else {
      this.setState({
        landLineError: "",
      });
      console.log("changing landLine" + this.state.landLineError);
    }
  };
  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  handleChangeOTP = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
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
  handleChangestransfer = (event) => {
    const { name, value } = event.target;
    console.log("name" + value);
    this.setState({
      [name]: value,
    });
    const re = /\S+@[A-Za-z]+\.com/;
    const ks = /\S+@[A-Za-z]+\.co.in/;
    if (!re.test(value) && !ks.test(value)) {
      this.setState({
        transferemailError: "Please enter the valid email",
      });
    } else {
      this.setState({
        transferemailError: "",
      });
    }
  };

  handleClose = () => {
    // this.setState({ showloginModal: false })
    // this.setState({ showgetmailModal: false })
  //  this.setState({ showotpModal: false });
    // this.setState({ showpasswordModal: false })
    this.setState({ showloginModal: false });
    this.setState({ showgetmailModal: false });
    this.setState({ showotpModal: false });
    this.setState({ showpasswordModal: false });
    this.setState({showupdateotpModal:false});
  };
  handleSubmit(e) {
    e.preventDefault();
    const {
      firstName,
      lastName,
      city,
      country,
      address,
      pincode,
      department,
      company,
      email,
      mobile,
      mobileError,
      mobileCountryCode,
    } = this.state;
    this.setState({ submitted: true });
    if (
      email &&
      firstName &&
      lastName &&
      mobile &&
      company &&
      department &&
      country &&
      city &&
      address &&
      pincode &&
      mobileCountryCode&&
      mobileError==""
    ) {
      this.props.submitprofileUpdate(email);
      this.setState({
        isLoading: true,
      });
    }
  }


  handleCountryChange = (event) => {
    const { value } = event.target;

    this.setState({
      country: value,
      city: "",
      address: "",
      pincode: "",
    });

    this.props.requestloadcitybycountry(value);
  };
  handleCityChange = (event) => {
    const { value } = event.target;

    this.setState({
      city: value,
    });

    this.props.requestloadcitybycountry(value);
  };

  handleSelectChange = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({
      mobileCountryCode: selectedOption.label,
      selectedCode: selectedOption.label,
      mobile:"",
      country:'',
      city:'',
      pincode:'',
      address:'',
    });
    if (selectedOption.label == "+91") {
      this.setState({
        country: "India",
      });
      this.props.requestloadcitybycountry("India");
    } else if (selectedOption.label == "+86") {
      this.setState({
        country: "China",
      });
      this.props.requestloadcitybycountry("China");
    } else if (selectedOption.label == "+44") {
      this.setState({
        country: "Uk",
      });
      this.props.requestloadcitybycountry("Uk");
    } else if (selectedOption.label == "+81") {
      this.setState({
        country: "Japan",
      });
      this.props.requestloadcitybycountry("Japan");
    } else if (selectedOption.label == "+49") {
      this.setState({
        country: "Germany",
      });
      this.props.requestloadcitybycountry("Germany");
    } else if (selectedOption.label == "+33") {
      this.setState({
        country: "France",
      });
      this.props.requestloadcitybycountry("France");
    } else if (selectedOption.label == "+55") {
      this.setState({
        country: "Brazil",
      });
      this.props.requestloadcitybycountry("Brazil");
    } else if (selectedOption.label == "+39") {
      this.setState({
        country: "Italy",
      });
      this.props.requestloadcitybycountry("Italy");
    } else if (selectedOption.label == "+7") {
      this.setState({
        country: "Russia",
      });
      this.props.requestloadcitybycountry("Russia");
    } else if (selectedOption.label == "+65") {
      this.setState({
        country: "Singapore",
      });
      this.props.requestloadcitybycountry("Singapore");
    } else if (selectedOption.label == "+64") {
      this.setState({
        country: "New Zealand",
      });
      this.props.requestloadcitybycountry("New Zealand");
    } else if (selectedOption.label == "+61") {
      this.setState({
        country: "Australia",
      });
      this.props.requestloadcitybycountry("Australia");
    } else if (selectedOption.label == "+964") {
      this.setState({
        country: "Iraq",
      });
      this.props.requestloadcitybycountry("Iraq");
    } else if (selectedOption.label == "+1") {
      this.setState({
        country: "US",
      });
      this.props.requestloadcitybycountry("US");
    }
  };
  navigate = (url) => {
    this.props.history.push(url);
  };

  cityList = () => {
    if (this.props.citylist && this.props.citylist.cities) {
      console.log("-------" + this.props.citylist.cities);

      this.state.isCityLoaded = true;
      return this.props.citylist.cities.map((x, i) => {
        return { label: x, key: i, value: x };
      });
    } else {
      return { label: "Select city", key: 1, value: "Select" };
    }
  };
  splitter = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    var userlist = value;
    //var availableTime = userlist.split("--");
  };

  handleCompanyChange = (event) => {
    const { value } = event.target;

    this.setState({
      company: value,
    });

    //this.props.requestloadcompany(value)
  };

  clickbox = (event) => {
    const { checked } = event.target;
    console.log("event value:   " + checked);

    this.setState({
      num: !this.state.num,
      num: this.state.num ? 0 : 1,
    });
  };

  componentDidMount() {
    console.log(window.sessionStorage.getItem(Constants.ACCESS_EMAIL));

    if (!window.sessionStorage.getItem(Constants.ACCESS_EMAIL)   ) {
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

    // this.props.requestloadtimezone();
    this.props.requestloadcitybycountry();
    console.log("Calling load cities list....................");
    console.log("country in index  ...................." + this.state.country);
    console.log(
      "componentDidMount----window.sessionStorage.getItem(Constants.ACCESS_EMAIL)------>" +
        window.sessionStorage.getItem(Constants.ACCESS_EMAIL)
    );
    this.props.requestloadprofileUpdate();
    console.log("email  ...................." + this.state.email);

    console.log(window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID));
    const admin = window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID);
    if (admin !== undefined && admin !== "") {
      this.setState({
        isAdmin: admin,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    console.log( "data: login " + JSON.stringify(this.props.userlist));



    if (this.props.isnewPasswordSuccess !== prevProps.isnewPasswordSuccess) {
      if (this.state.submitted4 && this.props.isnewPasswordSuccess.success) {
        this.handleClose();
        Swal.fire({
          title: "",
          text: "Password reset is completed",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            window.location.reload();
          }
        });
      } else if (
        this.state.submitted4 &&
        !this.props.isnewPasswordSuccess.success
      ) {
        Swal.fire({
          title: "",
          text: "Unable to Reset, Please Check your Internet Connection!",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
      this.setState({ submitted4: false });
    }


    if (this.props.resendOtpSuccess !== prevProps.resendOtpSuccess) {
      console.log(this.state.submitted3);

      if (this.state.submitted3 && this.props.resendOtpSuccess.success) {
        console.log(this.props.resendOtpSuccess.success);
        /*   Swal.fire({
        title: "",
        text:"",
        icon: 'info',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      })*/
      } else {
        Swal.fire({
          title: "",
          text: this.props.resendOtpSuccess.message,
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
      this.setState({ submitted3: false });
    }

    if (this.props.isValidatdOtpSuccess !== prevProps.isValidatdOtpSuccess) {
      if (this.props.isValidatdOtpSuccess.success) {
        console.log(this.props.isValidatdOtpSuccess.success);
        // this.props.history.push('/resetPasswordCustomer?getmail='+ this.state.getmail+ '&page='+ this.state.page);
        this.handleClose();
        this.setState({
          //showotpModal:false,
          showpasswordModal: true,
        });
      } else if (!this.props.isValidatdOtpSuccess.success) {
        Swal.fire({
          title: "",
          text: this.props.isValidatdOtpSuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
      this.setState({ submitted3: false });
    }

  console.log(this.props.isEmailVerifySuccess !== prevProps.isEmailVerifySuccess)
    if (this.props.isEmailVerifySuccess !== prevProps.isEmailVerifySuccess) {
      if ( this.props.isEmailVerifySuccess.success) {
        console.log(
          this.props.isEmailVerifySuccess.success
        );

        this.handleClose();
        Swal.fire({
          title: "Note",
          text: "OTP has been sent to your registered Email ID",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            this.setState({
              showotpModal: true,
            });
          }
        });


      } else if (
        this.state.submitted2 &&
        !this.props.isEmailVerifySuccess.success
      ) {
        Swal.fire({
          title: "Note",
          text: this.props.isEmailVerifySuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
      this.setState({ submitted2: false });
    }


    if (this.state.mobileCountryCode && !this.state.country) {
      const countryCode = [
        { label: "+91", value: "India" },
        { label: "+1", value: "US" },
        { label: "+86", value: "China" },
        { label: "+44", value: "Uk" },
        { label: "+81", value: "Japan" },
        { label: "+49", value: "Germany" },
        { label: "+33", value: "France" },
        { label: "+55", value: "Brazil" },
        { label: "+39", value: "Italy" },
        { label: "+1", value: "Canada" },
        { label: "+7", value: "Russia" },
        { label: "+65", value: "Singapore" },
        { label: "+64", value: "New Zealand" },
        { label: "+61", value: "Australia" },
        { label: "+964", value: "Iraq" },
      ];
      if (this.state.mobileCountryCode == "+91") {
        this.setState({
          country: "India",
        });
        this.props.requestloadcitybycountry("India");
      } else if (this.state.mobileCountryCode == "+86") {
        this.setState({
          country: "China",
        });
        this.props.requestloadcitybycountry("China");
      } else if (this.state.mobileCountryCode == "+44") {
        this.setState({
          country: "Uk",
        });
        this.props.requestloadcitybycountry("Uk");
      } else if (this.state.mobileCountryCode == "+81") {
        this.setState({
          country: "Japan",
        });
        this.props.requestloadcitybycountry("Japan");
      } else if (this.state.mobileCountryCode == "+49") {
        this.setState({
          country: "Germany",
        });
        this.props.requestloadcitybycountry("Germany");
      } else if (this.state.mobileCountryCode == "+33") {
        this.setState({
          country: "France",
        });
        this.props.requestloadcitybycountry("France");
      } else if (this.state.mobileCountryCode == "+55") {
        this.setState({
          country: "Brazil",
        });
        this.props.requestloadcitybycountry("Brazil");
      } else if (this.state.mobileCountryCode == "+39") {
        this.setState({
          country: "Italy",
        });
        this.props.requestloadcitybycountry("Italy");
      } else if (this.state.mobileCountryCode == "+7") {
        this.setState({
          country: "Russia",
        });
        this.props.requestloadcitybycountry("Russia");
      } else if (this.state.mobileCountryCode == "+65") {
        this.setState({
          country: "Singapore",
        });
        this.props.requestloadcitybycountry("Singapore");
      } else if (this.state.mobileCountryCode == "+64") {
        this.setState({
          country: "New Zealand",
        });
        this.props.requestloadcitybycountry("New Zealand");
      } else if (this.state.mobileCountryCode == "+61") {
        this.setState({
          country: "Australia",
        });
        this.props.requestloadcitybycountry("Australia");
      } else if (this.state.mobileCountryCode == "+964") {
        this.setState({
          country: "Iraq",
        });
        this.props.requestloadcitybycountry("Iraq");
      } else if (this.state.mobileCountryCode == "+1") {
        this.setState({
          country: "US",
        });
        this.props.requestloadcitybycountry("US");
      }
    }

    console.log(window.sessionStorage.getItem(Constants.ACCESS_EMAIL));
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

    //console.log(this.state.checkBox);
    if (this.props.citylist !== prevProps.citylist) {
      console.log(
        "drop  ...................." + JSON.stringify(this.props.citylist)
      );
      if (this.state.citylist === true) {
        this.cityList();
        console.log(
          "drop  ...................." + JSON.stringify(this.props.citylist)
        );
      }
    }
    console.log("num value :" + this.state.num);
    console.log("component Did update");
    if (this.props.userlist !== prevProps.userlist) {
      console.log("updated detials ......................");
      if (
        this.props.userlist !== undefined &&
        this.props.userlist !== null &&
        this.props.userlist.firstName !== undefined
      ) {
        console.log(
          "updated firstname ......................" +
            this.props.userlist.firstName
        );
        // console.log('updated firstName ......................' + this.state.firstName);
        this.setState({
          firstName: this.props.userlist.firstName,
        });
      }

      if (
        this.props.userlist !== undefined &&
        this.props.userlist !== null &&
        this.props.userlist.lastName !== undefined
      ) {
        console.log(
          "updated lastname ......................" +
            this.props.userlist.lasttName
        );
        //console.log('updated lastName ......................' + this.state.lastName);
        this.setState({
          lastName: this.props.userlist.lastName,
        });
      }
      if (
        this.props.userlist !== undefined &&
        this.props.userlist !== null &&
        this.props.userlist.company !== undefined
      ) {
        console.log(
          "updated company ......................" + this.props.userlist.company
        );
        // console.log('updated company ......................' + this.state.company);
        this.setState({
          company: this.props.userlist.company,
        });
      }
      if (
        this.props.userlist !== undefined &&
        this.props.userlist !== null &&
        this.props.userlist.department !== undefined
      ) {
        console.log(
          "updated department ......................" +
            this.props.userlist.department
        );
        // console.log('updated department ......................' + this.state.department);
        this.setState({
          department: this.props.userlist.department,
        });
      }
      if (
        this.props.userlist !== undefined &&
        this.props.userlist !== null &&
        this.props.userlist.landline !== undefined
      ) {
        console.log(
          "updated landline ......................" +
            this.props.userlist.landline
        );
        // console.log('updated landline ......................' + this.state.landline);
        this.setState({
          landLine: this.props.userlist.landline,
        });
      }
      if (
        this.props.userlist !== undefined &&
        this.props.userlist !== null &&
        this.props.userlist.mobile !== undefined
      ) {
        console.log(
          "updated mobile ......................" + this.props.userlist.mobile
        );
        //console.log('updated mobile ......................' + this.state.mobile);
        this.setState({
          mobile: this.props.userlist.mobile,
        });
      }
      if (
        this.props.userlist !== undefined &&
        this.props.userlist !== null &&
        this.props.userlist.address !== undefined
      ) {
        console.log(
          "updated address ......................" + this.props.userlist.address
        );
        //console.log('updated address ......................' + this.state.address);
        this.setState({
          address: this.props.userlist.address,
        });
      }
      if (
        this.props.userlist !== undefined &&
        this.props.userlist !== null &&
        this.props.userlist.country !== undefined
      ) {
        console.log(
          "updated country ......................" + this.props.userlist.country
        );
        // console.log('updated country ......................' + this.state.country);
        this.setState({
          country: this.props.userlist.country,
        });
      }
      if (
        this.props.userlist !== undefined &&
        this.props.userlist !== null &&
        this.props.userlist.city !== undefined
      ) {
        console.log(
          "updated city ......................" + this.props.userlist.city
        );
        this.setState({
          city: this.props.userlist.city,
        });
        console.log("updated city ......................" + this.state.city);
        if (!this.state.city) {
          console.log("testing");
          this.props.requestloadcitybycountry(this.props.userlist.country);
        }
      }
      if (
        this.props.userlist !== undefined &&
        this.props.userlist !== null &&
        this.props.userlist.pincode !== undefined
      ) {
        console.log(
          "updated pincode ......................" + this.props.userlist.pincode
        );
        this.setState({
          pincode: this.props.userlist.pincode,
        });
      }
      console.log(
        "updated mobilecode ......................" + this.state.mobileCode
      );

      if (
        this.props.userlist !== undefined &&
        this.props.userlist !== null &&
        this.props.userlist.mobileCode !== undefined
      ) {
        console.log(
          "updated mobilecode ......................" +
            this.props.userlist.mobileCode
        );
        this.setState({
          mobileCountryCode: this.props.userlist.mobileCode,
        });
      }
      console.log(
        "updated mobileCode ......................" + this.state.mobileCode
      );

      if (
        this.props.userlist !== undefined &&
        this.props.userlist !== null &&
        this.props.userlist.email !== undefined
      ) {
        console.log(
          "updated email ......................" + this.props.userlist.email
        );
        //console.log('updated email ......................' + this.state.email);
        this.setState({
          email: this.props.userlist.email,
        });
      }

      if (
        this.props.userlist !== undefined &&
        this.props.userlist !== null &&
        this.props.userlist.isPlanOrdered !== undefined
      ) {
        console.log(
          "updated email ......................" +
            this.props.userlist.isPlanOrdered
        );
        this.setState({
          isPlanOrdered: this.props.userlist.isPlanOrdered,
        });
      }

      if (
        this.props.userlist !== undefined &&
        this.props.userlist !== null &&
        this.props.userlist.wantUpdate !== undefined
      ) {
        console.log(
          "want to update ......................" +
            this.props.userlist.wantUpdate
        );
        //console.log('updated email ......................' + this.state.email);
        this.setState({
          num: this.props.userlist.wantUpdate,
        });
      }

      // console.log('city  ....................'+ this.state.city);
      //  console.log('firstName  ....................'+ this.state.firstName);
    }

    if (this.props.isSuccess !== prevProps.isSuccess) {
      if (this.state.submitted && this.props.isSuccess.success) {
        console.log("testing");

        this.setState({
          showupdateotpModal: true,
        });
      }



      this.setState({ submitted: false, isLoading: false });
    }

    //----------------------------------------
    if (this.props.isUpdateSuccess !== prevProps.isUpdateSuccess) {
      if (this.state.submitted && this.props.isUpdateSuccess.success) {
        Swal.fire({
          title: "Success",
          text: "updated Successfully",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        this.handleClose();
        // this.props.history.push('./editProfile');
        this.setState({
          otp: "",
        });
      } else if (this.state.submitted && !this.props.isUpdateSuccess.success) {
        Swal.fire({
          title: "",
          text: this.props.isUpdateSuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
      this.setState({ submitted: false });
    }
    console.log(JSON.stringify(this.props.resendOtpSuccess));

    if (this.props.resendOtpSuccess !== prevProps.resendOtpSuccess) {
      if (this.props.resendOtpSuccess.success) {
        console.log(this.props.resendOtpSuccess.message);
        if (this.props.resendOtpSuccess.message === "") {
          Swal.fire({
            title: "",
            text: "OTP has been sent to your email ID",
            icon: "info",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          });
        }
      } else {
        Swal.fire({
          title: "",
          text: this.props.resendOtpSuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
      this.setState({ submitted: false });
    }
  }

  handleChangeNew = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,11}$/;

    if (!re.test(value)) {
      this.setState({
        newpasswordError:
          "Password should be atleast (8-12) digits with atleast one alphabet, one number and one symbol",
      });
    } else {
      this.setState({
        newpasswordError: "",
      });
    }
    console.log(this.state.newpasswordError);
  };

  handleChangeConfirm = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,11}$/;

    if (!re.test(value)) {
      this.setState({
        confirmpasswordError:
          "Password should be atleast (8-12) digits with  alphabets,  numbers and one special character",
      });
    } else {
      this.setState({
        confirmpasswordError: "",
      });
    }
    console.log(this.state.confirmpasswordError);
  };

  final = (e) => {
    e.preventDefault();
    this.setState({ submitted4: true });
    const {
      getmail,
      newpassword,
      confirmpassword,
      newpasswordError,
      confirmpasswordError,
    } = this.state;
    if (
      newpassword &&
      confirmpassword &&
      newpassword === confirmpassword &&
      newpasswordError === "" &&
      confirmpasswordError === ""
    ) {
      this.props.submitnewPasswordCustomer(window.sessionStorage.getItem(Constants.ACCESS_EMAIL), newpassword);
    } else if (
      newpassword &&
      confirmpassword &&
      newpassword !== confirmpassword
    ) {
      Swal.fire({
        title: "",
        text: "New password and Confirm Password Is Mismatching",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
    if (newpassword.length < 8 && confirmpassword.length < 8) {
      Swal.fire({
        title: "",
        text: "Please Check your password length!",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    } else if (newpassword.length > 12 && confirmpassword.length > 12) {
      Swal.fire({
        title: "",
        text: "Your Password length Exceeds. Please Check",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };

  handleSubmitOtp(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const {
      firstName,
      lastName,
      email,
      department,
      mobileCountryCode,
      mobile,
      landlineCountryCode,
      landLine,
      company,
      address,
      country,
      city,
      pincode,
      transferemail,
      num,
      otp,
      submitted3,
    } = this.state;

    this.setState({ submitted: true });
    console.log(
      "\n pincode----" +
        pincode +
        "\n first----" +
        firstName +
        "\n last----" +
        lastName +
        "\n mobile----" +
        mobile +
        "\n email----" +
        email +
        "\n department----" +
        department +
        "\n country----" +
        country +
        "\n city.label----" +
        city +
        "\n address----" +
        address +
        "\n company----" +
        company +
        "\n landline----" +
        landLine +
        "\n landlinecode----" +
        landlineCountryCode +
        "\n transferr----" +
        transferemail +
        "\n otp" +
        otp
    );
    if (otp.length === 6) {
      if (
        this.state.landLine !== undefined &&
        this.state.landLine !== null &&
        this.state.landlineCountryCode !== undefined &&
        this.state.landlineCountryCode !== null &&
        this.state.num !== undefined &&
        this.state.num !== null &&
        this.state.transferemail !== undefined &&
        this.state.transferemail !== null
      ) {
        this.props.updateUserProfile(
          firstName,
          lastName,
          email,
          department,
          mobileCountryCode,
          mobile,
          landlineCountryCode,
          landLine,
          company,
          address,
          country,
          city,
          pincode,
          transferemail,
          num,
          otp
        );
      } else {
        this.props.updateUserProfile(
          firstName,
          lastName,
          email,
          department,
          mobileCountryCode,
          mobile,
          landlineCountryCode,
          landLine,
          company,
          address,
          country,
          city,
          pincode,
          transferemail,
          num,
          otp
        );
      }
    }
  }

  alert = (e) => {
    console.log(
      e.name + "\n" + this.state.isAdmin + "\n" + this.state.isPlanOrdered
    );
    if (
      this.state.isPlanOrdered &&
      this.state.isAdmin !== undefined &&
      this.state.isAdmin !== ""
    ) {
      this.props.history.push("/" + e.name);
    } else if (this.state.isPlanOrdered === 0 && this.state.isAdmin) {
      Swal.fire({
        title: "",
        text: "Please customize a plan before use this option",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "YES",
        cancelButtonText: "NO",
      }).then((result) => {
        if (result.value) {
          this.props.history.push("/customizePage");
        } else if (result.dismiss == "cancel") {
          // window.location.reload();
        }
      });
    } else if (this.state.isPlanOrdered === 0 && !this.state.isAdmin) {
      Swal.fire({
        title: "",
        text: "This Feature Only Can Accessed By Administrator",
        icon: "warning",
        // showCancelButton: true,
        confirmButtonColor: "#3085d6",
        // cancelButtonColor: '#d33',
        confirmButtonText: "OK",
        //cancelButtonText: 'NO'
      });
    }
  };

  handleSubmit3 = () => {
    const { email } = this.state;
    this.setState({ submitted: true });
    if (email) {
      {
        this.props.clickResendOtp(email);
      }
    }
  };


  handleSubmit4 = (type) => {
    this.setState({ submitted3: true });
    const { getmail, otp } = this.state;
    if (otp && otp.length === 6) {
      this.props.submitverifyValidateOtpCustomer(window.sessionStorage.getItem(Constants.ACCESS_EMAIL), otp);
    }
  };

  resendChange = () => {
    this.setState({ submitted3: true });
    if (window.sessionStorage.getItem(Constants.ACCESS_EMAIL)) {
      this.props.clickResendOtpCustomer(window.sessionStorage.getItem(Constants.ACCESS_EMAIL));
    }
  };

  restPassword = () =>{
    // this.setState({
    //   showgetmailModal: true,
    //   showloginModal: false,
    // });
    this.props.verifyEmailCustomer(window.sessionStorage.getItem(Constants.ACCESS_EMAIL));
  }

  render() {
    const mobileCode = [
      { label: "+91", value: "+91" },
      { label: "+1", value: "+1" },
      { label: "+44", value: "+44" },
      { label: "+49", value: "+49" },
      { label: "+65", value: "+65" },
      { label: "+39", value: "+39" },
      { label: "+81", value: "+81" },
      { label: "+55", value: "+55" },
      { label: "+33", value: "+33" },
      { label: "+7", value: "+7" },
      { label: "+964", value: "+964" },
      { label: "+86", value: "+86" },
    ];

    const {
      firstName,
      landLine,
      lastName,
      city,
      country,
      otp,
      address,
      pincode,
      department,
      company,
      email,
      mobile,
      mobileCountryCode,
      submitted,
      transferemail,
      getmail,
      submitted2,
      submitted3,
      submitted4,
      newpassword,
      confirmpassword,
    } = this.state;
    return (
      <div>
        <HeaderLogin />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div>
            <div className="view">
              <section
                className="relative banner-area-inner19"
                style={{ paddingTop: "200px", textAlign: "center" }}
              >
                <div className="overlay overlay-bg overlay-bg-blk"></div>
                <div className="container">
                  <div className="row height align-items-center justify-content-center">
                    <div className="col-lg-10">
                      <div className="generic-banner-content">
                        <h2 className="head2-inner">One Process - One Tool</h2>
                        <p className="text-white" style={{ opacity: 0.5 }}>
                        CtrlSwiftTM comprises of a robust maturity assessment
                          methodology and transformation cookbooks to
                          progressively drive the Service Desk transformation to
                          the desired end-state.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <br></br>
            <Container>
            <Row className="col-md-12">
            <div className="col-md-12 " >
              <div className="d-flex justify-content-center">

              {window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID) !==
              "undefined" ?  (  <ButtonToolbar
                aria-label="Toolbar with button groups"
                style={{ marginBottom: 20, marginLeft: 70 }}
              ><ButtonGroup className="mr-2">
                  <button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    onClick={(e) => this.alert({ name: "userDashboard" })}
                    id="cs-ud-userDashboard"
                  >
                    Dashboard
                  </button>{" "}
              </ButtonGroup>
                <ButtonGroup className="mr-2">

                  <button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    onClick={(e) => this.alert({ name: "editProfile" })}
                    id="cs-us-editProfile"
                  >
                    Edit Profile
                  </button>{" "}
                </ButtonGroup>
                <ButtonGroup className="mr-2">
                  <button
                    onClick={(e) => this.alert({ name: "viewInvoice" })}
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    id="cs-us-viewInvoice"
                  >
                    View Invoice
                  </button>
                </ButtonGroup>
                <ButtonGroup className="mr-2">
                  <button
                    onClick={(e) => this.alert({ name: "planDetailsList" })}
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    id="cs-us-planDetailsList"
                  >
                    Plan Details
                  </button>{" "}
                </ButtonGroup>
                <ButtonGroup className="mr-2">
                  <button
                    onClick={(e) => this.alert({ name: "viewDMSA" })}
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    id="cs-us-viewDMSA"
                  >
                    View DMSA
                  </button>{" "}
                </ButtonGroup>
              </ButtonToolbar>):<ButtonToolbar
                aria-label="Toolbar with button groups"
                style={{ marginBottom: 20, marginLeft: "40%",marginRight:"40%" }}>
              <ButtonGroup className="mr-2">
              <button
                className="genric-btn primary radius text-uppercase"
                variant=" "
                href="./editProfile"
              >
                Edit Profile
              </button>{" "}
            </ButtonGroup>
              </ButtonToolbar>} </div></div>
            </Row>
              <Form>
                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="firstName">
                    <Form.Label>First Name</Form.Label>

                    <input
                      type="text"
                      autocomplete="off"
                      className="form-control"
                      required
                      pattern="[0-9a-zA-Z_.-]*"
                      onChange={this.Change}
                      name="firstName"
                      value={firstName}
                      id="cs-ep-firstName"
                    />
                    {submitted && !firstName && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        First Name is required
                      </div>
                    )}
                    {submitted &&
                      this.state.firstNameError !== "" &&
                      firstName && (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.firstNameError}
                        </div>
                      )}
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>

                    <input
                      type="text"
                      autocomplete="off"
                      className="form-control"
                      required
                      pattern="[0-9a-zA-Z_.-]*"
                      onChange={this.ChangeLastName}
                      name="lastName"
                      value={lastName}
                      id="cs-ep-lastName"

                    />
                    {submitted && !lastName && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        {" "}
                        Last Name is required
                      </div>
                    )}
                    {submitted &&
                      this.state.lastNameError !== "" &&
                      lastName && (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.lastNameError}
                        </div>
                      )}
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="company">
                    <Form.Label>company</Form.Label>

                    <input
                      type="text"
                      autocomplete="off"
                      className="form-control"
                      required
                      pattern="[0-9a-zA-Z_.-]*"
                      onChange={this.Changecompany}
                      name="company"
                      value={company}
                      disabled={true}
                      id="cs-ep-company"

                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="department">
                    <Form.Label>Department</Form.Label>

                    <input
                      type="text"
                      autocomplete="off"
                      className="form-control"
                      required
                      pattern="[0-9a-zA-Z_.-]*"
                      onChange={this.Change}
                      name="department"
                      value={department}
                      id="cs-ep-department"

                    />
                    {submitted && !department && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        Department is required
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="landLine">
                    <Form.Label>LandLine</Form.Label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputMobile"
                      name="landLine"
                      minLength="8"
                      maxlength="15"
                      value={landLine}
                      onChange={this.ChangelandLine}
                      onInput={this.maxLengthCheck}
                    />
                  </Form.Group>


                  <Form.Group as={Col} md="4" controlId="email">
                    <Form.Label> Email</Form.Label>
                    <input
                      type="text"
                      autocomplete="off"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={this.handleChanges}
                      disabled={true}
                      id="cs-ep-email"

                    />

                    {submitted && this.state.emailError !== "" && email && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.emailError}
                      </div>
                    )}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                <Form.Group as={Col} md="2" controlId="mobileCountryCode">
                    <Form.Label>Mobile Country Code</Form.Label>
                    <Select
                      onChange={this.handleSelectChange}
                      isSearchable={true}
                      options={mobileCode}
                      value={{
                        label: mobileCountryCode,
                        value: mobileCountryCode,
                      }}
                      id="cs-ep-mobileCountryCode"

                      name={"mobileCountryCode"}
                    />
                    {submitted && !mobileCountryCode && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        {" "}
                        Mobile Country code is required
                      </div>
                    )}
                  </Form.Group>
                <Form.Group as={Col} md="4" controlId="mobile">
                    <Form.Label>Mobile</Form.Label>

                    <input
                      type="number"
                      autocomplete="off"
                      className="form-control"
                      required
                      pattern="[0-9a-zA-Z_.-]*"
                      onChange={this.changeMobile}
                      name="mobile"
                      value={mobile}
                      id="cs-ep-mobile"

                    />
                    {submitted && !mobile && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        Mobile Field is required
                      </div>
                    )}
                    {submitted && this.state.mobileError !== "" && mobile && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.mobileError}
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="adderss">
                    <Form.Label>Address</Form.Label>

                    <textarea
                      autocomplete="off"
                      className="form-control"
                      required
                      pattern="[0-9a-zA-Z_.-]*"
                      onChange={this.Change}
                      name="address"
                      value={address}
                      id="cs-ep-address"

                    />

                    {submitted && !address && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        Address is required
                      </div>
                    )}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="country">
                    <Form.Label>Country</Form.Label>

                    {mobileCountryCode == "+1" ? (
                      <select
                        type="dropdown"
                        className="form-control"
                        name="country"
                        value={country}
                        placeholder="select"
                        id="cs-ep-country"

                        onChange={this.handleCountryChange}
                      >
                        <option value=""></option>
                        <option value="US">US</option>
                        <option value="Canada">Canada</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        disabled="true"
                        style={{ backgroundColor: "#fff" }}
                        className="form-control"
                        name="country"
                        value={country}
                        id="cs-ep-country"
                        placeholder="select"
                      />
                    )}
                    {submitted && !country && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        Country is required
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="city">
                    <Form.Label>City</Form.Label>
                    <Select
                      onChange={this.handleCitySelectChange}
                      isSearchable={true}
                      maxMenuHeight={250}
                      role={city}
                      options={this.cityList()}
                      value={{ label: city, value: city }}
                      name="city"
                      id="cs-ep-city"

                    />
                    {submitted && !city && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        City is required
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="pincode">
                    <Form.Label>Pincode</Form.Label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputMobile"
                      name="pincode"
                      minLength="6"
                      maxlength="10"
                      value={pincode}
                      onChange={this.handleChange}
                      onInput={this.maxLengthCheck}
                    />
                    {submitted && !pincode && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        pincode is required
                      </div>
                    )}
                  </Form.Group>
                </Form.Row>
                <Form.Row>

                </Form.Row>

                {window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID) !==
                "undefined" ? (
                  <Form.Row>
                    <Form.Group as={Col} md="6" controlId="transferemail">
                      <ShowMoreText
                        /* Default options */
                        lines={1}
                        more="Transfer CtrlSwift admin access to another account"
                        //less='Show less'
                        className='"form-control'
                        // anchorClass='my-anchor-css-class'
                        onClick={this.executeOnClick}
                        id="cs-ep-transferemail"
                        expanded={false}
                        width={300}
                      >
                        <Form.Label>
                          <p style={{ color: "black", fontWeight: 600 }}>
                            Transfer CtrlSwift admin access to another account
                            <p style={{ color: "black" }}>
                              Note: Only Admin can Transfer access to another
                              account
                            </p>{" "}
                          </p>{" "}
                        </Form.Label>
                        <br></br>{" "}
                        <Form.Label> Enter new admin Email id</Form.Label>
                        <input
                          type="text"
                          autocomplete="off"
                          id="cs-ep-transferemail"
                          className="form-control"
                          name="transferemail"
                          value={transferemail}
                          onChange={this.handleChangestransfer}
                        />
                        {submitted &&
                          this.state.emailError !== "" &&
                          transferemail && (
                            <div style={{ fontSize: 12, color: "red" }}>
                              {this.state.emailError}
                            </div>
                          )}
                      </ShowMoreText>
                    </Form.Group>
                  </Form.Row>
                ) : null}

                <Form.Group controlId="receiveEmails">
                  <Form.Check
                    type="checkbox"
                    label="I agree to receive emails on CtrlSwift updates"
                    name="receiveEmails"
                    id="receiveEmails"
                    onChange={this.clickbox}
                    checked={this.state.num}
                  />
                  {/* <input  type="checkbox"  onClick={this.clickbox} />
                  <label> I agree to receive emails on B1DESK updates</label> */}
                </Form.Group>
                <br></br>
                <Form.Row>
                  <Form.Group controlId="" as={Col} md="7">
                    <Button
                      className="genric-btn primary radius text-uppercase"
                      variant=" "
                      id="cs-ep-updareChanges"
                      onClick={this.handleSubmit}
                    >
                      Update Changes
                    </Button>
                  </Form.Group>
                  <br></br>
                  <br></br>
                  <Form.Group controlId="" as={Col} md="7">
                    <Link onClick={()=>{this.restPassword()}} id="cs-ep-reset">Reset Password</Link>
                  </Form.Group>
                </Form.Row>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
              </Form>
              <Modal
                show={this.state.showupdateotpModal}
                onHide={this.handleClose}
                backdrop={"static"}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Enter OTP </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="md-form mb-2">
                    <input
                      type="email"
                      id="defaultForm-email"
                      className="form-control validate"
                      name="otp"
                      value={otp}
                      maxLength={6}
                      minLength={6}
                      onInput={this.maxLengthCheck}
                      onChange={this.handleChangeOTP}
                    />
                    <label
                      data-error="wrong"
                      data-success="right"
                      for="defaultForm-email"
                    >
                      Enter your OTP
                    </label>
                  </div>

                  <Row className="justify-content-md-center">
                    <Button
                      className="genric-btn primary radius text-uppercase"
                      variant=" "
                      id="cs-ep-otp-verify"
                      onClick={this.handleSubmitOtp}
                      style={{ marginTop: 10 }}
                    >
                      VErify
                    </Button>

                    <Button
                      className="genric-btn primary radius text-uppercase"
                      variant=" "
                      id="cs-ep-otp-resend"
                      onClick={this.handleSubmit3}
                      style={{ marginTop: 10, marginLeft: 40 }}
                    >
                      Resend
                    </Button>
                  </Row>
                </Modal.Body>
              </Modal>

{/* ----------------------Enter OTP ----------------- */}
            <Modal
              show={this.state.showotpModal}
              onHide={this.handleClose}
              backdrop={"static"}
            >
              <Modal.Header closeButton>
                <Modal.Title>Enter OTP </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="md-form mb-2">
                  <input
                    type="email"
                    id="defaultForm-email"
                    className="form-control validate"
                    name="otp"
                    value={otp}
                    maxLength={6}
                    minLength={6}
                    onInput={this.maxLengthCheck}
                    onChange={this.handleChangeOTP}
                  />

                  {submitted3 && !otp && (
                    <div
                      style={{ fontSize: 12, color: "red" }}
                      className="nav-left "
                    >
                      OTP is required
                    </div>
                  )}
                  {submitted3 && otp.length !== 6 && otp && (
                    <div
                      style={{ fontSize: 12, color: "red" }}
                      className="nav-left"
                    >
                      OTP is must be 6-digits
                    </div>
                  )}
                  <label
                    data-error="wrong"
                    data-success="right"
                    for="defaultForm-email"
                  >
                    Enter your OTP
                  </label>
                </div>

                <Row className="justify-content-md-center">
                  <Button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    onClick={this.handleSubmit4}
                    style={{ marginTop: 10 }}
                  >
                    VErify
                  </Button>

                  <Button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    onClick={this.resendChange}
                    style={{ marginTop: 10, marginLeft: 40 }}
                  >
                    Resend
                  </Button>
                </Row>
              </Modal.Body>
            </Modal>

            <Modal
              show={this.state.showpasswordModal}
              onHide={this.handleClose}
              backdrop={"static"}
              id="cs-ep-otp-close"
            >
              <Modal.Header closeButton>
                <Modal.Title>Enter Password </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="md-form mb-2">
                  <i className="fas fa fa-lock prefix grey-text"></i>

                  <input
                    type="password"
                    id="defaultForm-email"
                    className="form-control validate"
                    name="newpassword"
                    value={newpassword}
                    onChange={this.handleChangeNew}
                  />

                  {submitted4 && !newpassword && (
                    <div
                      className="help-block"
                      style={{ fontSize: 12, color: "red" }}
                    >
                      New Password Is Required
                    </div>
                  )}
                  {this.state.newpasswordError !== "" &&
                    newpassword &&
                    submitted4 && (
                      <div
                        className="help-block "
                        style={{ fontSize: 12, color: "red" }}
                      >
                        {this.state.newpasswordError}
                      </div>
                    )}

                  <label
                    data-error="wrong"
                    data-success="right"
                    for="defaultForm-email"
                  >
                    New Password
                  </label>
                </div>
                <div className="md-form mb-2">
                  <i className="fas fa fa-lock prefix grey-text"></i>

                  <input
                    type="password"
                    id="defaultForm-email"
                    className="form-control validate"
                    name="confirmpassword"
                    value={confirmpassword}
                    onChange={this.handleChangeConfirm}
                  />

                  {submitted4 && !confirmpassword && (
                    <div
                      className="help-block"
                      style={{ fontSize: 12, color: "red" }}
                    >
                      Confirm Password Is Required
                    </div>
                  )}
                  {this.state.confirmpasswordError !== "" &&
                    confirmpassword &&
                    submitted4 && (
                      <div
                        className="help-block "
                        style={{ fontSize: 12, color: "red" }}
                      >
                        {this.state.confirmpasswordError}
                      </div>
                    )}

                  <label
                    data-error="wrong"
                    data-success="right"
                    for="defaultForm-email"
                  >
                    Confirm Password
                  </label>
                </div>

                <Row className="justify-content-md-center">
                  <Button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    id="cs-ep-bt-reset"
                    onClick={this.final}
                    style={{ marginTop: 10 }}
                  >
                    Reset Password
                  </Button>
                </Row>
              </Modal.Body>
            </Modal>


            </Container>{" "}
            <Footer />
          </div>
        )}
      </div>
    );
  }
}
editProfile.propTypes = {
  userlist: PropTypes.func,
  requestloadcitybycountry: PropTypes.func,
  requestloadcitylist: PropTypes.func,
  citylist: PropTypes.object,
  //requestloadprofileUpdate: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    isSuccess: state.editprofileReducer.isSuccess,
    citylist: state.editprofileReducer.citylist,
    userlist: state.editprofileReducer.userlist,
    // isVerifySuccess: state.getmailcustomerReducer.isVerifySuccess
    resendOtpSuccess: state.editprofileReducer.resendOtpSuccess,
    isUpdateSuccess: state.editprofileReducer.isUpdateSuccess,
    isEmailVerifySuccess: state.loginReducer.isEmailVerifySuccess,
    isValidatdOtpSuccess: state.loginReducer.isValidatdOtpSuccess,
    resendOtpSuccess: state.loginReducer.resendOtpSuccess,
    isnewPasswordSuccess: state.loginReducer.isnewPasswordSuccess,

  };
};

const mapDispatchToProps = (dispatch) => ({
  requestloadcitybycountry: (country) =>
    dispatch(requestloadcitybycountry(country)),
  requestloadprofileUpdate: (email) =>
    dispatch(requestloadprofileUpdate(email)),
  submitprofileUpdate: (email) => dispatch(profileUpdate(email)),
  verifyEmailCustomer: (getmail) => dispatch(verifyEmailCustomer(getmail)),
  submitverifyValidateOtpCustomer: (getmail, value) =>
    dispatch(forgotOtpCustomer(getmail, value)),
  clickResendOtpCustomer: (getmail) => dispatch(resendOtpCustomer(getmail)),
  submitnewPasswordCustomer: (getmail, newpassword) =>
    dispatch(newPasswordCustomer(getmail, newpassword)),

  clickResendOtp: (email) => dispatch(resendOtp(email)),
  updateUserProfile: (
    firstName,
    lastName,
    email,
    department,
    mobileCountryCode,
    mobile,
    landlineCountryCode,
    landLine,
    company,
    address,
    country,
    city,
    pincode,
    transferemail,
    num,
    otp
  ) =>
    dispatch(
      updateUser(
        firstName,
        lastName,
        email,
        department,
        mobileCountryCode,
        mobile,
        landlineCountryCode,
        landLine,
        company,
        address,
        country,
        city,
        pincode,
        transferemail,
        num,
        otp
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(editProfile);
