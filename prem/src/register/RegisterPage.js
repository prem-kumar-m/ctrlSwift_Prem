import { PropTypes } from "prop-types";
import React from "react";
import {
  Button, Col, Container, Form, Modal, Row
} from "react-bootstrap";
import { connect } from "react-redux";
import Select from "react-select";
//import DropdownInput from 'react-dropdown-input'
//import Select from "react-dropdown-select";
import CreatableSelect from "react-select/creatable";
import Swal from "sweetalert2";
import Footer from "../components/footer/Footer.js";
import HeaderSign from "../components/header_sign/HeaderSign";
import Loader from "../components/loading";
import * as Constants from "../constants";
import {
  addressValidator, cityValidator, companyValidator, countryValidator, departmentValidator, emailValidator, firstNameValidator,
  lastNameValidator, mobileCountryCodeValidator, mobileValidator, pincodeValidator
} from "../Core/utils";
import {
  guestLogin, newPassword, requestcompanyid, requestloadcitybycountry,
  requestloadcompany, resendOtp, verifyValidateOtp
} from "./action";


class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      firstNameError: "",
      lastName: "",
      lastNameError: "",
      email: "",
      emailError: "",
      departmentError: "",
      mobileError: "",
      companyError: "",
      department: "",
      mobile: "",
      landLine: "",
      company: "",
      address: "",
      addressError: "",
      countryError: "",
      cityError: "",
      pincodeError: "",
      mobileCountryCode: "",
      landlineCountryCode: "",
      selectedCompany: "",
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
      cities: [],
      isCityLoaded: false,
      drop: "",
      companylistArray:[],
      cityOption: "",
      selectedCity: "",
      isCompanyLoaded: false,
      hideshow: true,
      anotherAddress: "",
      anotherCountry: "",
      anotherCity: "",
      anotherPincode: "",
      register: "",
      selectedCompany: "",
      visible: "false",
      checkbox: "",
      wantUpdate: 0,
      taxId: "",
      otp: "",
      submitted: false,
      resendOtpSuccess: false,
      isValidatdOtpSuccess: false,
      showotpModal: false,
      taxidsame:false,
      companyidnew:false,
      companyid:"",
      file: "",
      isEqual:true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCitySelectChange = this.handleCitySelectChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleCompanySelectChange = this.handleCompanySelectChange.bind(this);
    this.handleSubmitOtp = this.handleSubmitOtp.bind(this);
    this.handleChangeNew = this.handleChangeNew.bind(this);
    this.handleChangeConfirm = this.handleChangeConfirm.bind(this);
    this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
    this.multiselectRef = React.createRef();
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
          "Password should be atleast (8-12) digits with  alphabets, numbers and one special character",
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

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });

    if (name == "mobileCountryCode") {
      this.setState({
        country: "",
        mobile: "",
      });
    }
  };

  handleSelectChange = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({
      role: selectedOption.label,
      selectedRole: selectedOption.label,
    });
  };
  handleCitySelectChange = (selectedOption) => {
    this.setState({
      city: selectedOption.label,
      selectedCity: selectedOption.label,
    });
  };

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

  handleSubmit(e) {
    console.log(this.state.address.length);

    e.preventDefault();

    const {
      firstName,
      landLine,
      lastName,
      city,
      country,
      landlineCountryCode,
      address,
      pincode,
      department,
      company,
      email,
      mobile,
      mobileCountryCode,
      wantUpdate,
      taxId,
      file,
    } = this.state;

    const emailError = emailValidator(this.state.email);
    const mobileError = mobileValidator(this.state.mobile);

    const firstNameError = firstNameValidator(this.state.firstName);
    const lastNameError = lastNameValidator(this.state.lastName);
    const departmentError = departmentValidator(this.state.department);
    const countryError = countryValidator(this.state.country);
    const cityError = cityValidator(this.state.city);
    const addressError = addressValidator(this.state.address);
    const pincodeError = pincodeValidator(this.state.pincode);
    const companyError = companyValidator(this.state.company);
    const mobileCountryCodeError = mobileCountryCodeValidator(
      this.state.mobileCountryCode
    );

    if (
      emailError ||
      firstNameError ||
      lastNameError ||
      mobileError ||
      departmentError ||
      countryError ||
      cityError ||
      addressError ||
      pincodeError ||
      companyError ||
      mobileCountryCodeError
    )
      this.setState({
        emailError: emailError,
        firstNameError: firstNameError,
        lastNameError: lastNameError,
        mobileError: mobileError,
        departmentError: departmentError,
        addressError: addressError,
        countryError: countryError,
        cityError: cityError,
        pincodeError: pincodeError,
        companyError: companyError,
      });

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
        "\n file---------" +
        file +
        "\n taxId----" +
        taxId +
        +"\n emailError----" +
        emailError +
        "\n departmentError----" +
        departmentError +
        "\n countryError----" +
        countryError +
        "\n cityError----" +
        cityError +
        "\n addressError----" +
        addressError +
        "\n pincodeError----" +
        pincodeError +
        "\n companyError----" +
        companyError +
        "\n mobileCountryCodeError----" +
        mobileCountryCodeError +
        "\n firstNameError----" +
        firstNameError +
        "\n lastNameError----" +
        lastNameError +
        "\n mobileError---------" +
        mobileError
    );

    console.log(
      taxId &&
        department &&
        emailError === "" &&
        departmentError === "" &&
        countryError === "" &&
        cityError === "" &&
        addressError === "" &&
        pincodeError === "" &&
        companyError === "" &&
        mobileCountryCodeError === "" &&
        firstNameError === "" &&
        lastNameError === "" &&
        mobileError === ""
    );

    console.log(
      this.state.landLine !== undefined &&
        this.state.landLine !== null &&
        this.state.wantUpdate !== undefined &&
        this.state.wantUpdate !== null &&
        this.state.landlineCountryCode !== undefined &&
        this.state.landlineCountryCode !== null
    );

    if (
      firstName &&
      lastName &&
      mobile &&
      address &&
      email &&
      country &&
      taxId &&
      city &&
      department &&
      company &&
      pincode &&
      emailError === "" &&
      departmentError === "" &&
      countryError === "" &&
      cityError === "" &&
      addressError === "" &&
      pincodeError === "" &&
      companyError === "" &&
      mobileCountryCodeError === "" &&
      firstNameError === "" &&
      lastNameError === "" &&
      mobileError === ""
    ) {
      if (
        this.state.landLine !== undefined &&
        this.state.landLine !== null &&
        this.state.wantUpdate !== undefined &&
        this.state.wantUpdate !== null &&
        this.state.landlineCountryCode !== undefined &&
        this.state.landlineCountryCode !== null
      ) {
        console.log("testing 2");

        this.props.submitguestLogin(
          firstName,
          lastName,
          mobile,
          email,
          department,
          mobileCountryCode,
          landlineCountryCode,
          landLine,
          country,
          company,
          address,
          city,
          pincode,
          wantUpdate,
          taxId,
          file
        );
        this.setState({
          isLoading: true,
        });
      } else {
        console.log("testing 1");
        this.setState({
          isLoading: true,
        });
        this.props.submitguestLogin(
          firstName,
          lastName,
          mobile,
          email,
          department,
          mobileCountryCode,
          landlineCountryCode,
          landLine,
          country,
          company,
          address,
          city,
          pincode,
          wantUpdate,
          taxId,
          file
        );
      }
    }


  }

  handleSubmitOtp(e) {
    e.preventDefault();
    this.setState({ submitt: true });
    const {
      firstName,
      lastName,
      mobile,
      email,
      department,
      mobileCountryCode,
      landlineCountryCode,
      landLine,
      country,
      company,
      address,
      city,
      pincode,
      wantUpdate,
      taxId,
      otp,
    } = this.state;

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
        "\n taxId----" +
        taxId
    );
    if (
      firstName &&
      lastName &&
      mobile &&
      email &&
      department &&
      mobileCountryCode &&
      country &&
      company &&
      address &&
      city &&
      pincode &&
      taxId &&
      otp &&
      otp.length === 6
    ) {
      if (
        this.state.landLine !== undefined &&
        this.state.landLine !== null &&
        this.state.landlineCountryCode !== undefined &&
        this.state.landlineCountryCode !== null &&
        this.state.wantUpdate !== undefined &&
        this.state.wantUpdate !== null
      ) {
        this.props.submitverifyValidateOtp(
          firstName,
          lastName,
          mobile,
          email,
          department,
          mobileCountryCode,
          landlineCountryCode,
          landLine,
          country,
          company,
          address,
          city,
          pincode,
          wantUpdate,
          taxId,
          otp
        );
      } else {
        this.props.submitverifyValidateOtp(
          firstName,
          lastName,
          mobile,
          email,
          department,
          mobileCountryCode,
          "",
          "",
          country,
          company,
          address,
          city,
          pincode,
          "",
          taxId,
          otp
        );
      }
    }
  }

  resendChange = () => {
    this.setState({ submitted: true });
    console.log("resendchecking" + this.state.otp);
    console.log("firstName" + this.state.firstName);
    console.log("lastName" + this.state.lastName);
    console.log("department" + this.state.department);
    console.log("landline" + this.state.landLine);
    console.log("landline code" + this.state.landlineCountryCode);
    console.log("mobile" + this.state.mobile);
    console.log("mobilecode" + this.state.mobileCountryCode);

    const {
      firstName,
      lastName,
      mobile,
      email,
      department,
      mobileCountryCode,
      landlineCountryCode,
      landLine,
      country,
      city,
      address,
      company,
      pincode,
      wantUpdate,
      taxId,
    } = this.state;
    if (
      firstName &&
      lastName &&
      mobile &&
      email &&
      department &&
      mobileCountryCode &&
      country &&
      company &&
      address &&
      city &&
      pincode &&
      wantUpdate &&
      taxId
    ) {
      if (
        this.state.landLine !== undefined &&
        this.state.landLine !== null &&
        this.state.landlineCountryCode !== undefined &&
        this.state.landlineCountryCode !== null
      )
        this.props.clickResendOtp(
          firstName,
          lastName,
          mobile,
          email,
          department,
          mobileCountryCode,
          landlineCountryCode,
          landLine,
          country,
          company,
          address,
          city,
          pincode,
          wantUpdate,
          taxId
        );
    } else {
      this.props.clickResendOtp(
        firstName,
        lastName,
        mobile,
        email,
        department,
        mobileCountryCode,
        "",
        "",
        country,
        company,
        address,
        city,
        pincode,
        wantUpdate,
        taxId
      );
    }
  };

  clickbox = (event) => {
    const { checked } = event.target;
    console.log("event value:   " + checked);

    this.setState({
      checkbox: !this.state.checkbox,

      wantUpdate: !this.state.checkbox ? 1 : 0,
    });
    console.log("num value :" + this.state.wantUpdate);
  };

  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };
  handleCountryChange = (event) => {
    const { country, value } = event.target;

    this.setState({
      country: value,
    });
    console.log(value);
    this.props.requestloadcitybycountry(value);

    this.setState({
      selectedCity: "",
      address: "",
      pincode: "",
    });
  };

  handleCompanyChange = (event) => {
    const { company, value } = event.target;

    this.setState({
      company: value,
    });

    this.props.requestloadcompany(value);

  };

  update = () => {
    if (this.state.wantUpdate === false)
      this.setState({
        wantUpdate: true,
      });

    //console.log('wantUpdate++++++'+this.state.wantUpdate)
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

  companyList = () => {
    let companyOpt = [{ label: "All", value: "All" }];

    if (this.props.companylist && this.props.companylist.companyList) {
      console.log("-------" + this.props.companylist.companyList);

      this.state.isCompanyLoaded = true;

      return this.props.companylist.companyList.map((x, i) => {
        return { label: x, key: i, value: x };
      });
    } else {
      return { label: "", key: 1, value: "" };
    }
  };
  splitter = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    var companylist = value;
    var availableTime = companylist.split("--");
  };

  handleCompanySelectChange = (selectedOption) => {
    if(selectedOption.label !=="All"){
    this.setState({
      company: selectedOption.label,
      selectedCompany: selectedOption.label,
    });
    this.setState({
      company: selectedOption.label,
    });
    this.props.requestloadcompany(selectedOption.label);
    this.props.requestcompanyid(selectedOption.label);
  }
  if(this.state.companylistArray){
    for(let i=0;i< this.state.companylistArray.length;i++){
              if(this.state.companylistArray[i] == selectedOption.label ){
                this.setState({
                  isEqual:false,
                });
                console.log("Match 100%");
              }
    }
}
  };


  componentDidMount() {
    var x = { a: 2 };
    var y = x;
    console.log("before \n x \n" + x.a + "\n y\n" + y.a);
    x.a += x.a;
    console.log("after \n x \n" + x.a + "\n y\n" + y.a);
    this.props.requestloadcitybycountry();
    console.log("Calling load cities list....................");
    console.log("country in index  ...................." + this.state.country);

    this.props.requestloadcompany();

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(typeof this.state.file);
    //==============================password screen=============
    console.log("testing");
    if (this.props.isnewPasswordSuccess !== prevProps.isnewPasswordSuccess) {
      console.log("testing1");
      if (this.props.isnewPasswordSuccess.success) {
        console.log("testing2");

        window.sessionStorage.setItem(Constants.REGISTERED, true);
        Swal.fire({
          title: "Success",
          text: "Registered Successfully",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        this.props.history.push("/");
      } else if (!this.props.isnewPasswordSuccess.success) {
        Swal.fire({
          title: "",
          text: "Unable to Register, please check your internet connection!",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }

      this.setState({ submitted: false });
    }

    //-----------------------otp screen ------------------------
    if (this.props.isValidatdOtpSuccess !== prevProps.isValidatdOtpSuccess) {
      if (this.state.submitt && this.props.isValidatdOtpSuccess.success) {
        console.log("done");

        this.setState({
          showpasswordModal: true,
          showotpModal: false,
        });

      } else if (
        this.state.submitt &&
        !this.props.isValidatdOtpSuccess.success
      ) {
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
      this.setState({ submitt: false });
    }

    if (this.props.resendOtpSuccess !== prevProps.resendOtpSuccess) {
      if (this.props.resendOtpSuccess.success) {
        console.log(
          "this.props.resendOtpSuccess.success \n" +
            this.props.resendOtpSuccess.success
        );
        if (this.props.resendOtpSuccess.success) {
          console.log("checking 0");
          Swal.fire({
            title: "",
            text: "OTP has been sent to given Email ID",
            icon: "info",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          });
        } else if (this.props.resendOtpSuccess.success === false) {
          console.log("checking 1");
          Swal.fire({
            title: "",
            text: this.props.resendOtpSuccess.message + "\n false",
            icon: "warning",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          });
        }
      } else {
        console.log("checking 2");
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
      this.setState({ submitt: false });
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
    if (this.props.companylist !== prevProps.companylist) {
      if ((this.state.isCityLoaded = true)) {
        this.setState({
          drop: this.props.companylist.companyList,
          companylistArray:this.props.companylist,
        });
        console.log( "drop1 companylist  ...................." + this.state.companylistArray );
        console.log("\n register2----" + this.state.company);
      }

    }
    if (this.props.citylist !== prevProps.citylist) {
      console.log(
        "drop  ...................." + JSON.stringify(this.props.citylist)
      );
      if ((this.state.citylist = true)) {
        this.cityList();
        console.log(
          "drop  ...................." + JSON.stringify(this.props.citylist)
        );
      }
    }

    console.log(
      "drop  ...................." + JSON.stringify(this.props.citylist)
    );

    console.log("city ---" + this.state.selectedCity);

    console.log("city2 ---" + this.state.city);

    console.log("pinocdetseting" + this.state.pincode);
    console.log(
      "mobilecodetesting----------------" + this.state.mobileCountryCode
    );
    console.log("country in index  ...................." + this.state.country);

    console.log("company in index  ...................." + this.state.company);
    console.log("----companylist---"+ this.props.companylist)


    console.log("\n register2----" + this.state.company);
    console.log("wantupdateemail+++" + this.state.wantUpdate);

    if (this.props.isSuccess !== prevProps.isSuccess) {
      this.setState({
        isLoading: false,
      });
      if (this.state.submitted && this.props.isSuccess.success) {
        this.setState({
          showotpModal: true,
        });
      } else if (this.state.submitted && !this.props.isSuccess.success) {
        Swal.fire({
          title: "",
          text: this.props.isSuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        this.setState({ isReadyToRedirect: false });
      }
      this.setState({ submitted: false });

    }
    console.log("Company list length------> "+this.state.companylistArray);

    if (this.props.companyid !== prevProps.companyid) {
      if (this.props.companyid.success) {
        this.setState({
          taxId: this.props.companyid.taxId,
        });

      }

    }

    console.log("drop  ...................." + this.state.taxId);
  }

  convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
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

  file = (e) => {
    if (e.target.files[0] !== undefined && e.target.files[0] !== null) {
      let file = e.target.files[0];
      console.log("file" + e.target.files[0]);
      const base64 = this.convertBase64(file);
      console.log(this.statebase64);
      console.log("fsize" + JSON.stringify(e.target.files[0]));
      console.log("file" + file);

      console.log(file.type);
      if (file.type === "image/png" || file.type === "image/jpeg") {
        this.setState({ file: file });
      } else if (file.type !== "image/png" && file.type !== "image/jpeg") {
        document.getElementById("exampleFormControlFile1").value = "";
        this.setState({ file: "" });
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
        file: "",
      });
    }
  };

  handleClose = () => {
    this.setState({
      submitt: false,
      showotpModal: false,
      showpasswordModal: false,
      passwaordsubmitted: false,
    });
  };

  handleSubmitPassword(e) {
    e.preventDefault();
    this.setState({ passwaordsubmitted: true });
    const {
      file,
      firstName,
      lastName,
      mobile,
      email,
      department,
      mobileCountryCode,
      landlineCountryCode,
      landLine,
      country,
      company,
      address,
      city,
      pincode,
      wantUpdate,
      taxId,
      otp,
      newpassword,
      confirmpassword,
      newpasswordError,
      confirmpasswordError,
    } = this.state;
    if (
      firstName &&
      lastName &&
      mobile &&
      email &&
      department &&
      mobileCountryCode &&
      country &&
      company &&
      address &&
      city &&
      pincode &&
      otp &&
      newpassword &&
      confirmpassword &&
      taxId &&
      newpassword !== "" &&
      confirmpassword !== "" &&
      newpassword === confirmpassword &&
      newpasswordError === "" &&
      confirmpasswordError === ""
    ) {
      if (
        this.state.landLine !== undefined &&
        this.state.landLine !== null &&
        this.state.landlineCountryCode !== undefined &&
        this.state.landlineCountryCode !== null &&
        this.state.wantUpdate !== undefined &&
        this.state.wantUpdate !== null
      ) {
        console.log(this.state.file);
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("mobile", mobile);
        formData.append("email", email);
        formData.append("department", department);
        formData.append("mobileCountryCode", mobileCountryCode);
        formData.append("landlineCountryCode", landlineCountryCode);
        formData.append("landline", landLine);
        formData.append("country", country);
        formData.append("company", company);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("pincode", pincode);
        formData.append("wantUpdate", wantUpdate);
        formData.append("taxId", taxId);
        formData.append("file", file);
        formData.append("otp", otp);
        formData.append("password", newpassword);

        this.props.submitnewPassword(formData);

      } else {
        console.log(this.state.file);
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("mobile", mobile);
        formData.append("email", email);
        formData.append("department", department);
        formData.append("mobileCountryCode", mobileCountryCode);
        formData.append("landlineCountryCode", landlineCountryCode);
        formData.append("landline", landLine);
        formData.append("country", country);
        formData.append("company", company);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("pincode", pincode);
        formData.append("wantUpdate", wantUpdate);
        formData.append("taxId", taxId);
        formData.append("file", localStorage.getItem("file"));
        formData.append("otp", otp);
        formData.append("password", newpassword);

        this.props.submitnewPassword(formData);
      }
    } else if (newpassword !== "" && confirmpassword !== "") {
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
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      department,
      address,
      newpassword,
      passwaordsubmitted,
      country,
      city,
      otp,
      submitt,
      pincode,
      mobile,
      mobileCountryCode,
      landlineCountryCode,
      landLine,
      company,
      submitted,
      confirmpassword,
      register,
      selectedCity,
      companyOption,
      selectedCompany,
      anotherAddress,
      anotherCity,
      anotherCountry,
      anotherPincode,
      wantUpdate,
      taxId,
    } = this.state;

    let cityOptions = [{ label: "Loading city...", value: 1 }];
    let companyOptions = [{ label: "Loading  salesperson Names...", value: 1 }];
    console.log("Country ---" + this.state.country);

    if (
      this.props.companylist !== undefined &&
      this.props.companylist !== null
    ) {
      companyOptions = this.props.companylist.map((row) => {
        console.log("inside the loop ---->" + row.companies);
        return { label: row.companies, value: row.companies };
      });
    }
    if (!companyOption) {
      let companyOpt = [{ label: "All", value: "All" }];
      if (
        this.props.companylist !== undefined &&
        this.props.companylist !== null
      ) {
        for (var i = 1; i <= this.props.companylist.length; i++) {
          companyOpt[i] = {
            label: this.props.companylist[i - 1],
            value: this.props.companylist[i - 1],
          };
        }
        this.setState({
          companyOption: companyOpt,
        });
      }
    }

    const countrys = [
      "us",
      "in",
      "cn",
      "jp",
      "ru",
      "br",
      "fr",
      "it",
      "ca",
      "sg",
      "nz",
      "de",
      "iq",
      "au",
      "gb",
    ];

    const roleMaster = [
      { label: "BRANCH MANAGER" },
      { label: "PRIMARY SALESPERSON", value: "PRIMARY SALESPERSON" },
      { label: "SECONDARY SALESPERSON", value: "SECONDARY SALESPERSON" },
      { label: "SALESPERSON", value: "SALESPERSON" },
      { label: "IT ASSIGNEE", value: "IT ASSIGNEE" },
      { label: "CALLCENTER MEMBER", value: "CALLCENTER MEMBER" },
    ];

    return (
      <div>
        <HeaderSign />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div>
            <div className="view">
              <section className="generic-banner relative banner-area-inner1">
                <div
                  className="overlay overlay-bg overlay-bg-blk"
                ></div>
                <div className="container">
                  <div className="row height align-items-center justify-content-center">
                    <div className="col-lg-10">
                      <div className="generic-banner-content inner-banner-txt"></div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <Container>
              <Row>
                <Col>
                  <p style={{ fontSize: 26, color: "black" }}>
                    To register, please take the time to fill out the
                    information below.
                  </p>
                </Col>
              </Row>

              <Form>
                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="firstName">
                    <Form.Label>First Name <i className="validationError">*</i></Form.Label>

                    <input
                      type="text"
                      autocomplete="off"
                      className="form-control"
                      required
                      id="cs-rs-firstName"
                      pattern="[0-9a-zA-Z_.-]*"
                      onChange={this.Change}
                      name="firstName"
                      value={firstName}

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
                  <Form.Group as={Col} md="6" controlId="lastName">
                    <Form.Label>Last Name <i className="validationError">*</i></Form.Label>
                    <input
                      type="text"
                      autocomplete="off"
                      className="form-control"
                      required
                      id="cs-rs-lastName"
                      pattern="[0-9a-zA-Z_.-]*"
                      onChange={this.ChangeLastName}
                      name="lastName"
                      value={lastName}
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
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="email">
                    <Form.Label>Work Email <i className="validationError">*</i></Form.Label>
                    <input
                      type="text"
                      autocomplete="off"
                      className="form-control"
                      name="email"
                      id="cs-rs-email"

                      value={email}
                      onChange={this.handleChanges}
                    />
                    {submitted && !email && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        Work Mail is required
                      </div>
                    )}
                    {submitted && this.state.emailError !== "" && email && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.emailError}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="department">
                    <Form.Label>Department <i className="validationError">*</i></Form.Label>
                    <select
                      type="dropdown"
                      className="form-control"
                      name="department"
                      value={department}
                      id="cs-rs-department"
                      placeholder="select"
                      onChange={this.handleChange}
                    >
                      <option value=""></option>
                      <option value="IT">IT</option>
                      <option value="Procurement">Procurement</option>
                      <option value="Finance">Finance</option>
                    </select>
                    {submitted && !department && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        Department is required
                      </div>
                    )}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="3" controlId="mobileCountryCode">
                    <Form.Label>Mobile Country Code <i className="validationError">*</i></Form.Label>
                    <select
                      type="dropdown"
                      className="form-control"
                      name="mobileCountryCode"
                      value={mobileCountryCode}
                      placeholder="select"
                      id="cs-rs-mobileCountryCode"

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
                    {submitted && !mobileCountryCode && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        Mobile code is required
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="mobile">
                    <Form.Label>Mobile <i className="validationError">*</i></Form.Label>
                    <input
                      type="text"
                      className="form-control"
                      name="mobile"
                      value={mobile}
                      minLength="15"
                      maxLength="15"
                      id="cs-rs-mobile"
                      onChange={this.changeMobile}
                    />
                    {submitted && !mobile && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        Mobile is required
                      </div>
                    )}
                    {submitted && this.state.mobileError !== "" && mobile && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.mobileError}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="landlineCountryCode">
                    <Form.Label>Land Line Code</Form.Label>
                    <input
                      type="number"
                      className="form-control"
                      name="landlineCountryCode"
                      value={landlineCountryCode}
                      onChange={this.handleChange}
                      id="cs-rs-landlineCountryCode"

                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="landLine">
                    <Form.Label>Landline</Form.Label>
                    <input
                      type="number"
                      autocomplete="off"
                      className="form-control"
                      name="landLine"
                      value={landLine}
                      onChange={this.handleChange}
                      maxLength={8}
                      id="cs-rs-landLine"

                    />
                  </Form.Group>


                  <Form.Group as={Col} md="6" controlId="company">
                    <Form.Label>Company <i className="validationError">*</i></Form.Label>
                    <CreatableSelect
                      type="text"
                      escapeClearsValue={true}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                      onChange={this.handleCompanySelectChange}
                      isSearchable={true}
                      role={company}
                      allowCreateWhileLoading={true}
                      autoFocus={true}
                      id="cs-rs-company"

                      createOptionPosition={"first"}
                      closeMenuOnScroll={true}
                      options={companyOption}

                      value={{ label: selectedCompany, value: selectedCompany }}
                      name="company"
                    />



                    {submitted && !company && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        Company is required
                      </div>
                    )}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="country">
                    <Form.Label>Country <i className="validationError">*</i></Form.Label>
                    {mobileCountryCode == "+1" ? (
                      <select
                        type="dropdown"
                        className="form-control"
                        name="country"
                        value={country}
                        id="cs-rs-country"

                        placeholder="select"
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
                        id="cs-rs-country"

                        value={country}
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
                  <Form.Group as={Col} md="6" controlId="city">
                    <Form.Label>City <i className="validationError">*</i></Form.Label>
                    <Select
                      onChange={this.handleCitySelectChange}
                      isSearchable={true}
                      maxMenuHeight={250}
                      role={city}
                      options={this.cityList()}
                      value={{ label: selectedCity, value: selectedCity }}
                      name="city"
                      id="cs-rs-city"

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
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="address">
                    <Form.Label>Address <i className="validationError">*</i></Form.Label>
                    <textarea
                      className="form-control"
                      name="address"
                      id="cs-rs-address"

                      value={address}
                      onChange={this.handleChange}
                    />
                    {submitted && !address && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        Address is required
                      </div>
                    )}
                    {submitted && address && address.length < 4 && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        Address is too short, Please provide detailed address
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="pincode">
                    <Form.Label>Pincode <i className="validationError">*</i></Form.Label>
                    <input
                      type="number"
                      id="cs-rs-pincode"

                      className="form-control"
                      name="pincode"
                      value={pincode}
                      onChange={this.handleChange}
                    />
                    {submitted && !pincode && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        Pincode is required
                      </div>
                    )}
                  </Form.Group>

                </Form.Row>
                {this.state.isEqual === true ?
                <Form.Row>

                <Form.Group as={Col} md="6" controlId="taxId">
                    <Form.Label>Tax ID <i className="validationError">*</i></Form.Label>
                    <input
                      type="text"
                      className="form-control"
                      name="taxId"
                      id="cs-rs-taxId"

                      value={taxId}
                      onChange={this.handleChange}
                    />
                    {submitted && !taxId && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        Tax Id is required
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="taxId">
                    <Form.Label>Company Logo(.png or .jpeg)</Form.Label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      className="form-control-file"
                      id="exampleFormControlFile1"
                      name="file"
                      style={{ borderBlockStyle: "outset" }}
                      onChange={(e) => this.file(e)}
                    />
                  </Form.Group>
                </Form.Row>
                :null}


                {!this.state.hideshow ? (
                  <Form.Row>
                    <Form.Group as={Col} md="6" controlId="email">
                      <Form.Label>Another Address</Form.Label>
                      <textarea
                        type="text"
                        autocomplete="off"
                        className="form-control"
                        name="anotherAddress"
                        id="cs-rs-anotherAddress"

                        value={anotherAddress}
                        onChange={this.handleChanges}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="6" controlId="email">
                      <Form.Label>Another Country</Form.Label>
                      <input
                        type="text"
                        autocomplete="off"
                        className="form-control"
                        name="anotherCountry"
                        value={anotherCountry}
                        id="cs-rs-anotherCountry"

                        onChange={this.handleChanges}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="6" controlId="email">
                      <Form.Label>Another City</Form.Label>
                      <input
                        type="text"
                        autocomplete="off"
                        className="form-control"
                        name="anotherCity"
                        value={anotherCity}
                        onChange={this.handleChanges}
                        id="cs-rs-anotherCity"

                      />
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="email">
                      <Form.Label>Another Pincode</Form.Label>
                      <input
                        type="text"
                        autocomplete="off"
                        className="form-control"
                        name="anotherPincode"
                        value={anotherPincode}
                        onChange={this.handleChanges}
                        id="cs-rs-anotherPincode"

                      />
                    </Form.Group>
                  </Form.Row>
                ) : null}
                <Form.Row>
                  <Form.Group controlId="wantUpdate">
                    <Form.Check
                      type="checkbox"
                      label="I agree to receive emails on CtrlSwift Update"
                      required
                      name="wantUpdate"
                      onChange={this.clickbox}
                      value={wantUpdate}
                      id="wantUpdate"
                      checked={this.state.checkbox}
                      //onClick={this.update()}
                    />
                  </Form.Group>
                </Form.Row>
                {/*} <Form.Row>
                <Form.Group controlId="register">
                <Button className="genric-btn primary radius text-uppercase" variant=" "  onClick={() => {
						this.setState({hideshow: !this.state.hideshow,
						})}} >
                      Add Another Address</Button>
                </Form.Group>
              </Form.Row>*/}
                <Form.Row>
                  <Form.Group as={Col} sm="11" />
                  <Form.Group as={Col} sm="1" controlId="register">
                    <Button
                      className="genric-btn primary radius text-uppercase"
                      variant=" "
                      id="cs-rs-Register"
                      onClick={this.handleSubmit}
                    >
                      Register
                    </Button>
                  </Form.Group>
                </Form.Row>
              </Form>

              <Modal
                show={this.state.showotpModal}
                onHide={this.handleClose}
                style={{ marginTop: 200 }}
                backdrop={"static"}
              >
                <Modal.Header closeButton>
                  <Modal.Title style={{ textAlign: "center", marginTop: 10 }}>
                    Enter OTP{" "}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="md-form mb-2" onSubmit={this.handleSubmitOtp}>
                    <input
                      type="email"
                      id="defaultForm-email"
                      className="form-control validate"
                      name="otp"
                      value={otp}
                      maxLength={6}
                      minLength={6}
                      onInput={this.maxLengthCheck}
                      onChange={this.handleChange}
                    />

                    {this.state.submitt && !otp && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left "
                      >
                        OTP is required
                      </div>
                    )}
                    {this.state.submitt && otp.length !== 6 && otp && (
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
                      id="cs-rs-verify"

                      onClick={this.handleSubmitOtp}
                      style={{ marginTop: 10 }}
                    >
                      VERIFY
                    </Button>

                    <Button
                      className="genric-btn primary radius text-uppercase"
                      variant=" "
                      id="cs-rs-resend"

                      onClick={this.resendChange}
                      style={{ marginTop: 10, marginLeft: 40 }}
                    >
                      RESEND
                    </Button>
                  </Row>
                </Modal.Body>
              </Modal>

              <Modal
                show={this.state.showpasswordModal}
                onHide={this.handleClose}
                style={{ marginTop: 200 }}
                backdrop={"static"}
              >
                <Modal.Header closeButton>
                  <Modal.Title style={{ textAlign: "center", marginTop: 10 }}>
                    Enter Password{" "}
                  </Modal.Title>
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

                    {passwaordsubmitted && !newpassword && (
                      <div
                        className="help-block"
                        style={{ fontSize: 12, color: "red" }}
                      >
                        New Password Is Required
                      </div>
                    )}
                    {this.state.newpasswordError !== "" &&
                      newpassword &&
                      passwaordsubmitted && (
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

                    {passwaordsubmitted && !confirmpassword && (
                      <div
                        className="help-block"
                        style={{ fontSize: 12, color: "red" }}
                      >
                        Confirm Password Is Required
                      </div>
                    )}
                    {this.state.confirmpasswordError !== "" &&
                      confirmpassword &&
                      passwaordsubmitted && (
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
                      id="cs-rs-Create"

                      onClick={this.handleSubmitPassword}
                      style={{ marginTop: 10 }}
                    >
                      Create
                    </Button>
                  </Row>
                </Modal.Body>
              </Modal>
            </Container>

            <Footer />
          </div>
        )}
      </div>
    );
  }
}

Registration.propTypes = {
  guestLogin: PropTypes.func,
  requestloadcitybycountry: PropTypes.func,
  //requestloadcitylist: PropTypes.func,
  citylist: PropTypes.object,
  companylist: PropTypes.object,
  requestloadcompany: PropTypes.func,
  requestcompanyid:PropTypes.func,
  verifyValidateOtp: PropTypes.func,
  resendOtp: PropTypes.func,
  newPassword: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    isSuccess: state.registrationReducer.isSuccess,
    citylist: state.registrationReducer.citylist,
    companylist: state.registrationReducer.companylist,
    isValidatdOtpSuccess: state.registrationReducer.isValidatdOtpSuccess,
    resendOtpSuccess: state.registrationReducer.resendOtpSuccess,
    companyid:state.registrationReducer.companyid,
    isnewPasswordSuccess: state.registrationReducer.isnewPasswordSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  submitguestLogin: (
    firstName,
    lastName,
    mobile,
    email,
    mobileCountryCode,
    landlineCountryCode,
    landLine,
    department,
    company,
    address,
    country,
    city,
    pincode,
    wantUpdate,
    taxId,
    file
  ) =>
    dispatch(
      guestLogin(
        firstName,
        lastName,
        mobile,
        email,
        mobileCountryCode,
        landlineCountryCode,
        landLine,
        department,
        company,
        address,
        country,
        city,
        pincode,
        wantUpdate,
        taxId,
        file
      )
    ),
  requestloadcitybycountry: (country) =>
    dispatch(requestloadcitybycountry(country)),
  // requestloadcitylist: country => dispatch(requestloadcitylist(country)),
  requestloadcompany: (company) => dispatch(requestloadcompany(company)),
  requestcompanyid:(company)=> dispatch(requestcompanyid(company)),

  submitverifyValidateOtp: (
    firstName,
    lastName,
    mobile,
    email,
    department,
    mobileCountryCode,
    landlineCountryCode,
    landLine,
    country,
    company,
    address,
    city,
    pincode,
    wantUpdate,
    taxId,
    otp
  ) =>
    dispatch(
      verifyValidateOtp(
        firstName,
        lastName,
        mobile,
        email,
        department,
        mobileCountryCode,
        landlineCountryCode,
        landLine,
        country,
        company,
        address,
        city,
        pincode,
        wantUpdate,
        taxId,
        otp
      )
    ),
  clickResendOtp: (
    firstName,
    lastName,
    mobile,
    email,
    department,
    mobileCountryCode,
    landlineCountryCode,
    landLine,
    country,
    company,
    address,
    city,
    pincode,
    wantUpdate,
    taxId
  ) =>
    dispatch(
      resendOtp(
        firstName,
        lastName,
        mobile,
        email,
        department,
        mobileCountryCode,
        landlineCountryCode,
        landLine,
        country,
        company,
        address,
        city,
        pincode,
        wantUpdate,
        taxId
      )
    ),

  submitnewPassword: (data) => dispatch(newPassword(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
