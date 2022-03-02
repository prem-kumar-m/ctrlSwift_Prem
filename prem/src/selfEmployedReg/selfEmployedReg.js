import { PropTypes } from "prop-types";
import React, { Component } from "react";
import {
  Alert, Button, Col, Container, Form, ProgressBar, Row
} from "react-bootstrap";
import Page from "react-page-loading";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Footer from "../components/footer/Footer.js";
import PartnerHeader from "../components/partnerHeader";
import { submitselfemp, verifyAadharNumber } from "./action";


class selfEmployedReg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      mobileCountryCode: "",
      mobileNumber: "",
      landLineCode: "",
      landLineNumber: "",
      qualification: "",
      specialization: "",
      experience: "",
      address: "",
      country: "",
      city: "",
      state: "",
      pincode: "",
      address2: "",
      country2: "",
      city2: "",
      state2: "",
      pincode2: "",
      aadharNumber: "",
      panCardNumber: "",
      aadharCard: "",
      experienceCertificate: "",
      addressProof: "",
      panError: "",
      IFSCError: "",
      BankName: "",
      branchName: "",
      AccountNumber: "",
      reEnterAcc: "",
      ifscCode: "",
      swiftCode: "",
      cancelledChequeLeaf: "",
      bankPassbook: "",
      ProgressBarnum: "",
      ProgressBarnum1: "",
      ProgressBarnum2: "",
      en1: false,
      en2: false,
      en3: false,
      en4: false,
      en6: false,
      showPersonalModal: true,
      showAdharModal: false,
      showFilesModal: false,
      showBankModal: false,
      showButton: false,
      showNextButton: true,
      showNextButton1: false,
      submitted: false,
      submitted1: false,
      submitted12: false,
      aadharNumberError: "",
      aadharNumber: "",
      submittedVerify: false,
      aadharError: "",
      isSelfSuccess: false,
      isAadharSuccess: false,
      submitResidential: false,
      checkBox: true,
      items: [],
      value: "",
      erroralert: false,
      fileUpload: [],
      personalFile:[],

      isErrorPersonal: {
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        mobileNumber: "",
        country: "",
        state: "",
        city: "",
        address: "",
        pincode: "",
        country2: "",
        state2: "",
        city2: "",
        address2: "",
        pincode2: "",
        experience: "",
        qualification: "",
        specialization: "",
        panCardNumber: "",
      },
      isErrorEdu: {
        experience: "",
        qualification: "",
        specialization: "",
        panCardNumber: "",
      },
      isErrorBank: {
        BankName: "",
        branchName: "",
        AccountNumber: "",
        reEnterAcc: "",
        ifscCode: "",

      },
      expError:"",
      qualificationError:"",
      specialError:"",
      bankError:"",
branchError:"",
AccountNumberError:"",
reEnterAccError:"",
    };
    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handlePersonalChange = (event) => {
    event.preventDefault();
    console.log("in switch personal check");
    const { name, value } = event.target;
    let isErrorPersonal = { ...this.state.isErrorPersonal };
    let isErrorEdu = { ...this.state.isErrorEdu };
    let isErrorBank = { ...this.state.isErrorBank };
    const alpha = /^[A-Za-z_ ]+$/;
    const re = /\S+@[A-Za-z]+\.com/;
    const ks = /\S+@[A-Za-z]+\.co.in/;

    const phone = /^[0-9_]+$/;
    const num = /^[0-9_ ]+$/;
    const ifsc = /^[A-Za-z]{4}\d{7}$/;
    const pan = /([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}$/;

    switch (name) {
      case "firstName":
        isErrorPersonal.firstName =
          value.length < 4 ? "please enter valid company name" : alpha.test(value) ? "" : "please enter valid company name";
        break;
      case "lastName":
        isErrorPersonal.lastName =
          value.length < 4 ? "please enter valid company name" : alpha.test(value) ? "" : "please enter valid company name";
        break;
      case "email":
        isErrorPersonal.email = re.test(value) || ks.test(value) ? "" : "please enter valid email";
        break;

      case "mobileNumber":
        isErrorPersonal.mobileNumber = value.length == 10 && phone.test(value) ? "" : "please enter valid mobileNumber";
        break;
      case "state":
        isErrorPersonal.state = alpha.test(value) ? "" : "please enter valid state name";
        break;
      case "city":
        isErrorPersonal.city = alpha.test(value) ? "" : "please enter valid city name";
        break;
      case "address":
        isErrorPersonal.address = value.length < 4 ? "address is too short" : "";
        break;

      case "pincode":
        isErrorPersonal.pincode = value.length == 6 ? "" : "please enter valid pincode";
        break;
      case "state2":
        isErrorPersonal.state = alpha.test(value) ? "" : "please enter valid state name";
        break;
      case "city2":
        isErrorPersonal.city = alpha.test(value) ? "" : "please enter valid city name";
        break;
      case "address2":
        isErrorPersonal.address = value.length < 4 ? " address is too short" : "";
        break;

      case "pincode2":
        isErrorPersonal.pincode = value.length == 6 ? "" : "please enter valid pincode";
        break;
        case "qualification":
          isErrorEdu.qualification = alpha.test(value) ? " " : "please enter valid qualification";
          break;
        case "experience":
          isErrorEdu.experience = value.length < 2 && num.test(value) ? "" : "please enter valid experience";
          break;
        case "specialization":
          isErrorEdu.specialization = alpha.test(value) ? " " : "please enter valid specialization";
          break;
        case "panCardNumber":
          isErrorEdu.panCardNumber = pan.test(value) ? "" : "please enter valid panCardNumber";
          break;
          case "AccountNumber":
            isErrorBank.AccountNumber =
              value.length < 9 ? "please enter valid Account number" : value.length > 19 ? "please enter valid Account number" : "";
            break;
          case "reEnterAcc":
            isErrorBank.reEnterAcc =
              value === this.state.AccountNumber ? " " : "Account number mismatch";
            break;
          case "ifscCode":
            isErrorBank.ifscCode =
              value.length == 11 && ifsc.test(value) ? " " : "please enter valid IFSC code";
            break;
          case "BankName":
            isErrorBank.BankName = alpha.test(value) && value.length > 2 ? "" : "please enter valid BankName name";
            break;

          case "branchName":
            isErrorBank.branchName = alpha.test(value) && value.length > 3 ? "" : "please enter valid branchName name";
            break;


    }
    this.setState({ isErrorPersonal,isErrorEdu,isErrorBank, [name]: value });
  }
  // handleEduChange = (event) => {
  //   console.log("in switch education check");
  //   event.preventDefault();
  //   const { name, value } = event.target;
  //   let isErrorEdu = { ...this.state.isErrorEdu };
  //   const alpha = /^[A-Za-z_ ]+$/;
  //   const num = /^[0-9_ ]+$/;
  //   const pan = /([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}$/;


  //   switch (name) {
  //     case "qualification":
  //       isErrorEdu.qualification = alpha.test(value) ? " " : "please enter valid qualification";
  //       break;
  //     case "experience":
  //       isErrorEdu.experience = value.length < 2 && num.test(value) ? "" : "please enter valid experience";
  //       break;
  //     case "specialization":
  //       isErrorEdu.specialization = alpha.test(value) ? " " : "please enter valid specialization";
  //       break;
  //     case "panCardNumber":
  //       isErrorEdu.panCardNumber = pan.test(value) ? "" : "please enter valid panCardNumber";
  //       break;
  //       default:
  //         break;

  //   }
  //   this.setState({ isErrorEdu, [name]: value });


  // }

  // handlePersonalChange = (e) => {
  //   e.preventDefault();
  //   console.log("in switch bank check");


  //   const { name, value } = e.target;
  //   let isErrorBank = { ...this.state.isErrorBank };
  //   const ifsc = /^[A-Za-z]{4}\d{7}$/;
  //   const alpha = /^[A-Za-z_ ]+$/;
  //   const re = /\S+@[A-Za-z]+\.com/;
  //   const ks = /\S+@[A-Za-z]+\.co.in/;
  //   switch (name) {
  //     case "AccountNumber":
  //       isErrorBank.AccountNumber =
  //         value.length < 9 ? "please enter valid Account number" : value.length > 19 ? "please enter valid Account number" : "";
  //       break;
  //     case "reEnterAcc":
  //       isErrorBank.reEnterAcc =
  //         value === this.state.AccountNumber ? " " : "Account number mismatch";
  //       break;
  //     case "ifscCode":
  //       isErrorBank.ifscCode =
  //         value.length == 11 && ifsc.test(value) ? " " : "please enter valid IFSC code";
  //       break;
  //     case "BankName":
  //       isErrorBank.BankName = alpha.test(value) && value.length > 2 ? "" : "please enter valid BankName name";
  //       break;

  //     case "branchName":
  //       isErrorBank.branchName = alpha.test(value) && value.length > 3 ? "" : "please enter valid branchName name";
  //       break;


  //     default:
  //       break;
  //   }
  //   this.setState({ isErrorBank, [name]: value });



  // }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleChangenum = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit1(e) {
    e.preventDefault();
    this.setState({ submittedVerify: true });
    console.log(
      "----testing verify======" + JSON.stringify(this.state.submittedVerify)
    );
    const { aadharNumber, aadharError } = this.state;
    if (aadharNumber != "" && aadharError == "") {
      this.props.verifyAadharNumber(aadharNumber);
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
  //--------------education details------------
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
  handleExpChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    const re =  /^[0-9_ ]+$/;
    const dec=/^\d\d(\.\d\d)?$/
    // {value!==""&&value!==re&&value.length>2?
    // this.setState({expError: "Please enter the valid decimal"})
    // :!dec.test(value)? this.setState({expError: "Please enter the valid decimal" })
    //       :null}


    if(!dec.test(value)){
      this.setState({
        expError: "Please enter the valid decimal",
      });
      console.log ("in dec regex------------->")
    }

    // else if (!re.test(value) && value.length>2) {
    //   this.setState({
    //     expError: "Please enter the valid Experience",
    //   });
    //   console.log ("in whole regex------------->")
    // }
    // else if(value.length>2) {
    //   this.setState({
    //     expError: "Please enter the valid Experience",
    //   });
    // }
    else {
      this.setState({
        expError: "",
      });

    }
  };
  handleQualificationChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /^[A-Za-z_ ]+$/;
    if (!re.test(value)) {
      this.setState({
        qualificationError: "Please enter the valid Qualification ",
      });
    } else {
      this.setState({
        qualificationError: "",
      });
    }
  };
  handleSpecialChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /^[A-Za-z_ ]+$/;
    if (!re.test(value)) {
      this.setState({
        specialError: "Please enter the valid Specialization",
      });
    } else {
      this.setState({
        specialError: "",
      });
    }
  };
  //----------------
  //----------bank validation--------------
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
  //-------------------

  handleResdential = () => {
    const { country, address, city, state, pincode } = this.state
    this.setState({ checkBox: !this.state.checkBox });
    console.log("========>" + this.state.checkBox)
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

  next = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    console.log("----testing1----");
    const {
      showAdharModal,
      showPersonalModal,
      showFilesModal,
      showButton,
      showBankModal,
      firstName,
      lastName,
      gender,
      email,
      mobileCountryCode,
      mobileNumber,
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
      phoneError,
      emailError,
      isErrorPersonal,
      // landLineCode,
      // landLineNumber,
    } = this.state;
    if (
      showPersonalModal == true
      &&
      firstName &&
      lastName &&
      gender &&
      email &&
      mobileCountryCode &&
      mobileNumber &&
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

      isErrorPersonal.firstName === "" &&
      isErrorPersonal.lastName === "" &&
      isErrorPersonal.email === "" &&
      isErrorPersonal.mobileNumber === "" &&
      isErrorPersonal.state === "" &&
      isErrorPersonal.city === "" &&
      isErrorPersonal.address === "" &&
      isErrorPersonal.pincode === "" &&
      isErrorPersonal.state2 === "" &&
      isErrorPersonal.address2 === "" &&
      isErrorPersonal.city2 === "" &&
      isErrorPersonal.pincode2 === ""



      // emailError == "" &&
      // phoneError == ""

    ) {
      this.setState({
        ProgressBarnum: 100,
        showPersonalModal: false,
        showAdharModal: true,
        en6: true,
        showButton: false,
        showNextButton: true,
        en1: true,

      });
      console.log("\n firstName------", firstName,
        "\n lastName------", lastName,
        "\n email------", email,
        "\n mobileCountryCode-------", mobileCountryCode,
        "\n mobileNumber------", mobileNumber,
        "\n country-----", country,
        "\n address ------", address ,
        "\n city ------", city ,
        "\n state ------", state ,
        "\n pincode -------", pincode ,
        "\n country2 ------", country2 ,
        "\n address2 -----", address2  ,
        "\n city2 ------", city2 ,
        "\n state2 ------", state2 ,
        "\n pincode2 ------", pincode2 ,

        "\n isErrorPersonal.firstName--------",isErrorPersonal.firstName,
        "\n isErrorPersonal.lastName-------",isErrorPersonal.lastName,
        "\n isErrorPersonal.email-------", isErrorPersonal.email,
        "\n isErrorPersonal.mobileCountryCode-------",isErrorPersonal.mobileCountryCode,
        "\n isErrorPersonal.mobileNumber ---------",isErrorPersonal.mobileNumber ,
        "\n isErrorPersonal.country--------", isErrorPersonal.country,
        "\n isErrorPersonal.address --------",isErrorPersonal.address ,
        "\n isErrorPersonal.city -------",isErrorPersonal.city ,
        "\n isErrorPersonal.state -------", isErrorPersonal.state ,
        "\n isErrorPersonal.pincode -------",isErrorPersonal.pincode ,
        "\n isErrorPersonal.country2  ---------",isErrorPersonal.country2  ,
        "\n isErrorPersonal.address2 --------", isErrorPersonal.address2 ,
        "\n isErrorPersonal.city2 --------",isErrorPersonal.city2 ,
        "\n isErrorPersonal.state2 -------",isErrorPersonal.state2 ,
        "\n isErrorPersonal.pincode2 -------", isErrorPersonal.pincode2 ,
      );
    } else if (showAdharModal == true) {
      this.setState({
        ProgressBarnum1: 100,
        showPersonalModal: false,
        showAdharModal: false,
        showFilesModal: true,
        showButton: false,
        showNextButton: false,
        showNextButton1: true,
        en2: true,
        erroralert: false
      });
    }
    else {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.setState({ erroralert: true }, () => {
        window.setTimeout(() => {
          this.setState({ erroralert: false });
        }, 3000);
      });
    }
  }

  next1 = (e) => {
    e.preventDefault();
    // console.log("submitted1" + this.state.submitted1);
    this.setState({ submitted1: true });
    const {
      panCardNumber,
      aadharCard,
      file,
      experienceCertificate,
      addressProof,
      showFilesModal,
      showBankModal,
      panError,
      submitted1,
      specialization,
      experience,
      qualification,
      items,
      fileUpload,
      isErrorEdu,
      expError,
      qualificationError,
      specialError,
      personalFile,
    } = this.state;
    if (
      showFilesModal == true
       &&
      panCardNumber &&
      panError == "" &&
      specialization &&
      experience &&
      qualification &&
      items.length !== 0 &&
      expError===""&&
      qualificationError===""&&
      specialError===""&&

      personalFile.length!==0&&
      personalFile.length===4

      // isErrorEdu.experience===""&&
      // isErrorEdu.qualification===""&&
      // isErrorEdu.specialization===""&&
      // isErrorEdu.panCardNumber===""
    ) {
      this.setState({
        ProgressBarnum2: 100,
        showPersonalModal: false,
        showAdharModal: false,
        showFilesModal: false,
        showBankModal: true,
        showButton: true,
        showNextButton: false,
        showNextButton1: false,
        en3: true,
        erroralert: false,
      });
      console.log("\n panCardNumber------", panCardNumber,
      "\n specialization------", specialization,
      "\n experience------", experience,
      "\n qualification-------", qualification,

      "\n isErrorEdu.panCardNumber--------",isErrorEdu.panCardNumber,
      "\n isErrorEdu.specialization-------",isErrorEdu.specialization,
      "\n isErrorEdu.experience-------", isErrorEdu.experience,
      "\n isErrorEdu.qualification-------",isErrorEdu.qualification,

    );

    } else if (showBankModal == true) {
      this.setState({ showButton: true, en6: false });
    }
    else {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.setState({ erroralert: true }, () => {
        window.setTimeout(() => {
          this.setState({ erroralert: false });
        }, 3000);
      });
    }
  };

  handleChangeFile = (event) => {
    console.log(event.target.files);
    let fileUpload = '';
    if (event.target.files[0] !== undefined && event.target.files[0] !== null) {
      const currentFiles = event.target.files;
      var type = "";
      for (var i = 0; i < currentFiles.length; i++) {
        var name = currentFiles[i].name;
        type = currentFiles[i].type;
        console.log("Filename: " + name + " , Type: " + type);
      }
      this.setState({
        fileUpload: currentFiles,
      }, () => console.log("multi files" + JSON.stringify(this.state.fileUpload)));
      if (
        type === "image/png" || type === "image/jpeg"
      ) {
        this.setState({ fileUpload: currentFiles });
      } else if (
        type !== "image/png" && type !== "image/jpeg"
      ) {
        document.getElementById("exampleFormControlFile1").value = "";
        this.setState({ fileUpload: "" });
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
        fileUpload: "",
      });
    }
  }
  handlePersonalFile = (event) => {
    console.log(event.target.files);
    let personalFile = '';
    if (event.target.files[0] !== undefined && event.target.files[0] !== null) {
      const currentFiles = event.target.files;
      var type = "";
      for (var i = 0; i < currentFiles.length; i++) {
        var name = currentFiles[i].name;
        type = currentFiles[i].type;
        console.log("Filename: " + name + " , Type: " + type);
      }
      this.setState({
        personalFile: currentFiles,
      }, () => console.log("multi files" + JSON.stringify(this.state.personalFile)));
      if (
        type === "image/png" || type === "image/jpeg"
      ) {
        this.setState({ personalFile: currentFiles });
      } else if (
        type !== "image/png" && type !== "image/jpeg"
      ) {
        document.getElementById("exampleFormControlFile1").value = "";
        this.setState({ personalFile: "" });
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
        personalFile: "",
      });
    }
  }


  handleSubmit(e) {

    e.preventDefault();
    this.setState({ submitted12: true });
    const {
      firstName,
      lastName,
      gender,
      email,
      mobileCountryCode,
      mobileNumber,
      qualification,
      specialization,
      experience,
      address,
      city,
      state,
      pincode,
      aadharNumber,
      panCardNumber,
      aadharCard,
      experienceCertificate,
      addressProof,
      BankName,
      branchName,
      AccountNumber,
      ifscCode,
      swiftCode,
      cancelledChequeLeaf,
      panError,
      IFSCError,
      phoneError,
      emailError,
      country,
      bankPassbook,
      country2,
      state2,
      city2,
      address2,
      pincode2,
      fileUpload,
      items,
      landLineCode,
      landLineNumber,
      isErrorBank,
      AccountNumberError,
      bankError,
      branchError,
      reEnterAccError,
    } = this.state;

    if (
      this.state.submitted12 === true
      &&
      firstName &&
      lastName &&
      gender &&
      email &&
      mobileCountryCode &&
      mobileNumber &&
      country &&
      state &&
      city &&
      address &&
      pincode &&
      country2 &&
      state2 &&
      city2 &&
      address2 &&
      pincode2 &&

      aadharNumber &&

      qualification &&
      specialization &&
      experience &&
      items.length !== 0 &&
      panCardNumber &&
      BankName &&
      branchName &&
      AccountNumber &&
      ifscCode &&
      swiftCode &&
      fileUpload.length !== 0 &&
      // &&
      // isErrorBank.BankName===""&&
      // isErrorBank.branchName===""&&
      // isErrorBank.AccountNumber===""&&
      // isErrorBank.reEnterAcc===""&&
      // isErrorBank.ifscCode===""&&
      IFSCError === "" &&
      AccountNumberError===""&&
      bankError===""&&
      branchError===""&&
      reEnterAccError===""

    ) {
      console.log(this.state.cancelledChequeLeaf);
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("gender", gender);
      formData.append("email", email);
      formData.append("mobileCountryCode", mobileCountryCode);
      formData.append("mobileNumber", mobileNumber);
      formData.append("qualification", qualification);
      formData.append("specialization", specialization);
      formData.append("experience", experience);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("country", country);
      formData.append("state", state);
      formData.append("pincode", pincode);
      formData.append("aadharNumber", aadharNumber);
      formData.append("panCardNumber", panCardNumber);
      formData.append("aadharCard", aadharCard);
      formData.append("experienceCertificate", experienceCertificate);
      formData.append("addressProof", addressProof);
      formData.append("BankName", BankName);
      formData.append("branchName", branchName);
      formData.append("AccountNumber", AccountNumber);
      formData.append("ifscCode", ifscCode);
      formData.append("swiftCode", swiftCode);
      // formData.append("cancelledChequeLeaf", cancelledChequeLeaf);
      // formData.append("bankPassbook", bankPassbook);

      this.props.submitselfemp(formData);
      console.log("=======formData========" + JSON.stringify(formData));
      console.log("\n BankName------", BankName,
        "\n branchName------", branchName,
        "\n AccountNumber-------", AccountNumber,
        // "\n reEnterAcc------", reEnterAcc,
        "\n ifscCode-----", ifscCode,

        "\n isErrorBank.BankName--------",isErrorBank.BankName,
        "\n isErrorBank.branchName-------",isErrorBank.branchName,
        "\n isErrorBank.AccountNumber-------",isErrorBank.AccountNumber,
        // "\n isErrorBank.reEnterAcc ---------",isErrorBank.reEnterAcc ,
        "\n isErrorBank.ifscCode--------", isErrorBank.ifscCode,


      );

      Swal.fire({
        text: "Your Application in process",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "ok ",
      });
    }
  }
  back(e) {
    e.preventDefault();
    const { showAdharModal, showPersonalModal, showFilesModal, showBankModal } =
      this.state;
    if (showBankModal == true) {
      this.setState({
        ProgressBarnum2: 0,
        showPersonalModal: false,
        showAdharModal: false,
        showFilesModal: true,
        showBankModal: false,
        en6: false,
        showButton: false,
        showNextButton1: true,
        showNextButton: false,
        erroralert: false
      });
    } else if (showFilesModal == true) {
      this.setState({
        ProgressBarnum1: 0,
        showPersonalModal: false,
        showAdharModal: true,
        showFilesModal: false,
        en6: false,
        showButton: false,
        showNextButton: true,
        showNextButton1: false,
        erroralert: false
      });
    } else if (showAdharModal == true) {
      this.setState({
        ProgressBarnum: 0,
        showPersonalModal: true,
        showAdharModal: false,
        showFilesModal: false,
        en6: false,
        showButton: false,
        showNextButton: true,
        erroralert: false
      });
    }
  }

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

  componentDidMount() { }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("data value  alert", this.state.erroralert);
    if (this.props.isSelfSuccess !== prevProps.isSelfSuccess) {
      if (
        this.state.submitted12 &&
        this.props.isSelfSuccess &&
        this.props.isSelfSuccess.success
      ) {
        this.setState({ showOtpModal: true });
      } else if (this.state.submitted12 && !this.props.isSelfSuccess.success) {
        Swal.fire({
          title: "",
          text: this.props.isSelfSuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        this.setState({ showOtpModal: false });
      }
    }
    if (this.props.isAadharSuccess !== prevProps.isAadharSuccess) {
      if (
        this.state.submittedVerify &&
        this.props.isAadharSuccess &&
        this.props.isAadharSuccess.data === true
      ) {
        Swal.fire({
          title: "",
          text: "Aadhar Number verified successfully",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        this.setState({ en6: false, submitLoader: true });
      } else if (
        this.state.submittedVerify &&
        this.props.isAadharSuccess &&
        this.props.isAadharSuccess.data === false
      ) {
        Swal.fire({
          title: "",
          text: "Please enter valid Aadhar Number",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        this.setState({ en6: true });
      }
    }
  }
  handleclose = () => {
    this.setState({
      erroralert: false,
    })
  }

  render() {
    const {
      firstName,
      lastName,
      gender,
      email,
      mobileCountryCode,
      mobileNumber,
      qualification,
      specialization,
      experience,
      address,
      city,
      state,
      pincode,
      aadharNumber,
      panCardNumber,
      aadharCard,
      experienceCertificate,
      addressProof,
      BankName,
      branchName,
      AccountNumber,
      reEnterAcc,
      ifscCode,
      swiftCode,
      cancelledChequeLeaf,
      submitted,
      submittedVerify,
      submitLoader,
      submitted1,
      submitted12,
      file,
      panError,
      bankPassbook,
      landLineCode,
      landLineNumber,
      country,
      address2,
      country2,
      city2,
      state2,
      pincode2,
      checkBox,
      fileUpload,
      personalFile,


    } = this.state;
    return (
      <div className="page-container " style={{ paddingLeft: "0px" }}>
        <PartnerHeader />
        <section className="onboard">
          <Container>
            <div className="heading-self">
              <h2 style={{ color: "#4b5050" }}>SELF EMPLOYEE REGISTRATION</h2>
            </div>
            <Row className="mt-20">
              <Col md="sm">
                <Button className="probutton" disabled={this.state.en1}>
                  1
                </Button>
              </Col>
              <Col style={{ marginTop: 15 }}>
                <ProgressBar
                  style={{ height: "10%" }}
                  now={this.state.ProgressBarnum}
                />
              </Col>
              <Col md="sm">
                <Button className="probutton" disabled={this.state.en2}>
                  2
                </Button>
              </Col>
              <Col style={{ marginTop: 15 }}>
                <ProgressBar
                  style={{ height: "10%" }}
                  now={this.state.ProgressBarnum1}
                />
              </Col>
              <Col md="sm">
                <Button className="probutton" disabled={this.state.en3}>
                  3
                </Button>
              </Col>
              <Col style={{ marginTop: 15 }}>
                <ProgressBar
                  style={{ height: "10%" }}
                  now={this.state.ProgressBarnum2}
                />
              </Col>
              <Col md="sm">
                <Button className="probutton" disabled={this.state.en4}>
                  4
                </Button>
              </Col>
            </Row>
            <Row className="mt-10">
              <Col className="c1">Personal Details</Col>
              <Col className="c2">Aadhar Card Verification</Col>
              <Col className="c3">Files Upload</Col>
              <Col className="c4">Bank Details</Col>
            </Row>
            {/* ----------------------personal Details------------------------ */}
            <br />
            {this.state.erroralert == true ? (
              <Row>
                <Col>
                  <Alert variant="danger" onClick={() => this.handleclose()} dismissible show={this.state.erroralert}>
                    <p> Please enter <strong>mandatory!</strong> field</p>
                  </Alert>
                </Col>
              </Row>
            )
              : null}
            {this.state.showPersonalModal == true ? (
              <Container>
                <Form onSubmit={this.next}>
                  <h4>
                    <Form.Label className="heading1-self">
                      Personal Details
                    </Form.Label>
                  </h4>

                  <Form.Row>
                    <Form.Group as={Col} md="4" controlId="firstName">
                      <Form.Label>First Name <i className="validationError">*</i></Form.Label>
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        name="firstName"
                        value={firstName}
                        onChange={this.handlePersonalChange}
                        id="seFirstname"
                      />
                      {submitted && !firstName && (
                        <div className="validationError">
                          First name is required
                        </div>
                      )}
                      {this.state.isErrorPersonal.firstName !== "" && submitted && email && (
                        <div className="validationError">
                          {this.state.isErrorPersonal.firstName}
                        </div>
                      )}
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="lastName">
                      <Form.Label>Last Name<i className="validationError">*</i></Form.Label>
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        name="lastName"
                        value={lastName}
                        onChange={this.handlePersonalChange}
                        id="seLastname"
                      />
                      {submitted && !lastName && (
                        <div className="validationError">
                          Last name is required
                        </div>
                      )}
                      {this.state.isErrorPersonal.lastName !== "" && submitted && email && (
                        <div className="validationError">
                          {this.state.isErrorPersonal.lastName}
                        </div>
                      )}
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="gender">
                      <Form.Label>Gender<i className="validationError">*</i></Form.Label>
                      <select
                        type="dropdown"
                        autoComplete="off"
                        className="form-control"
                        name="gender"
                        value={gender}
                        onChange={this.handlePersonalChange}
                        id="seGender"
                      >
                        <option value=""></option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="male">Transgender</option>
                        <option value="male">others</option>
                      </select>
                      {submitted && !gender && (
                        <div className="validationError">
                          Gender is required
                        </div>
                      )}
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="4" controlId="email">
                      <Form.Label>Email<i className="validationError">*</i></Form.Label>
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={this.handlePersonalChange}
                        id="seEmail"
                      />
                      {submitted && !email && (
                        <div className="validationError">Email is required</div>
                      )}

                      {this.state.isErrorPersonal.email !== "" && submitted && email && (
                        <div className="validationError">
                          {this.state.isErrorPersonal.email}
                        </div>
                      )}
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="mobileCountryCode">
                      <Form.Label>Mobile Country Code <i className="validationError">*</i></Form.Label>
                      <select
                        type="dropdown"
                        className="form-control"
                        name="mobileCountryCode"
                        value={mobileCountryCode}
                        placeholder="select"
                        onChange={this.handleChangenum}
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
                      {submitted && !mobileCountryCode && (
                        <div className="validationError">
                          Country Code is required
                        </div>
                      )}
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="mobileNumber">
                      <Form.Label>Mobile Number<i className="validationError">*</i></Form.Label>
                      <input
                        type="number"
                        autoComplete="off"
                        className="form-control"
                        name="mobileNumber"
                        value={mobileNumber}
                        onChange={this.handlePersonalChange}
                        id="semobileNumber"
                        format="##########"
                      />
                      {submitted && !mobileNumber && (
                        <div className="validationError">
                          Mobile number is required
                        </div>
                      )}
                      {submitted &&
                        this.state.isErrorPersonal.mobileNumber != "" &&
                        mobileNumber && (
                          <div className="validationError">
                            {this.state.isErrorPersonal.mobileNumber}
                          </div>
                        )}
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="4" controlId="landLineCode">
                      <Form.Label>LandLine Code</Form.Label>
                      <input
                        type="number"
                        autoComplete="off"
                        className="form-control"
                        name="landLineCode"
                        value={landLineCode}
                        onChange={this.handleChangenum}
                        id="selandLineCode"
                      />
                      {/* {submitted && !landLineCode && (
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
                        onChange={this.handleChangenum}
                        id="selandLineNumber"
                      />
                      {/* {submitted && !landLineNumber && (
                        <div className="validationError">
                          landLineNumber is required
                        </div>
                      )} */}
                    </Form.Group>

                  </Form.Row>


                  <hr />
                  <Row>
                    <Col>
                      <p><h4 className="f700">Current Address</h4></p>
                      <Form.Row>
                        <Form.Group as={Col} md="6">
                          <Form.Label>Country<i className="validationError">*</i></Form.Label>
                          {/* <Form.Control type="text" placeholder="India" value="India"  disabled /> */}
                          <input
                            type="text"
                            autoComplete="off"
                            className="form-control"
                            name="country"
                            value={country}
                            onChange={this.handleChange}
                            id="secountry"
                          />
                          {submitted && !country && (
                            <div className="validationError">
                              country is required
                            </div>
                          )}

                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="state">
                          <Form.Label>state<i className="validationError">*</i></Form.Label>
                          <input
                            type="text"
                            autoComplete="off"
                            className="form-control"
                            name="state"
                            value={state}
                            onChange={this.handlePersonalChange}
                            id="seState"
                          />
                          {submitted && !state && (
                            <div className="validationError">State is required</div>
                          )}
                          {this.state.isErrorPersonal.state !== "" && submitted && email && (
                            <div className="validationError">
                              {this.state.isErrorPersonal.state}
                            </div>
                          )}
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>

                        <Form.Group as={Col} md="6" controlId="city">
                          <Form.Label>City<i className="validationError">*</i></Form.Label>
                          <input
                            type="text"
                            autoComplete="off"
                            className="form-control"
                            name="city"
                            value={city}
                            onChange={this.handlePersonalChange}
                            id="seCity"
                          />
                          {submitted && !city && (
                            <div className="validationError">City is required</div>
                          )}
                          {this.state.isErrorPersonal.city !== "" && submitted && email && (
                            <div className="validationError">
                              {this.state.isErrorPersonal.city}
                            </div>
                          )}
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="address">
                          <Form.Label>Address<i className="validationError">*</i> </Form.Label>
                          <textarea
                            className="form-control"
                            name="address"
                            value={address}
                            onChange={this.handlePersonalChange}
                            id="seAddress"
                          />
                          {submitted && !address && (
                            <div className="validationError">
                              Address is required
                            </div>
                          )}
                          {this.state.isErrorPersonal.address !== "" && submitted && email && (
                            <div className="validationError">
                              {this.state.isErrorPersonal.address}
                            </div>
                          )}
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group as={Col} md="6" controlId="pincode">
                          <Form.Label>Pincode<i className="validationError">*</i></Form.Label>
                          <input
                            type="number"
                            autoComplete="off"
                            className="form-control"
                            name="pincode"
                            value={pincode}
                            onChange={this.handlePersonalChange}
                            id="sePincode"
                          />

                          {submitted && !pincode && (
                            <div className="validationError">
                              Pincode is required
                            </div>
                          )}
                          {this.state.isErrorPersonal.pincode !== "" && submitted && email && (
                            <div className="validationError">
                              {this.state.isErrorPersonal.pincode}
                            </div>
                          )}
                        </Form.Group>

                      </Form.Row>
                    </Col>
                    <Col>
                      <p><h4 className="f700">Residential Address</h4></p>
                      <Form.Row>
                        <Form.Group as={Col} md="6">
                          <Form.Label>Country<i className="validationError">*</i></Form.Label>
                          {/* <Form.Control type="text" placeholder="India" value="India"  disabled /> */}
                          <input
                            type="text"
                            autoComplete="off"
                            className="form-control"
                            name="country2"
                            value={country2}
                            onChange={this.handleChange}
                            id="secountry2"
                          />
                          {submitted && !country2 && (
                            <div className="validationError">
                              country is required
                            </div>
                          )}

                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="state">
                          <Form.Label>state<i className="validationError">*</i></Form.Label>
                          <input
                            type="text"
                            autoComplete="off"
                            className="form-control"
                            name="state2"
                            value={state2}
                            onChange={this.handlePersonalChange}
                            id="seState"
                          />
                          {submitted && !state2 && (
                            <div className="validationError">State is required</div>
                          )}
                          {this.state.isErrorPersonal.state2 !== "" && submitted && email && (
                            <div className="validationError">
                              {this.state.isErrorPersonal.state2}
                            </div>
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
                            onChange={this.handlePersonalChange}
                            id="seCity"
                          />
                          {submitted && !city2 && (
                            <div className="validationError">City is required</div>
                          )}
                          {this.state.isErrorPersonal.city2 !== "" && submitted && email && (
                            <div className="validationError">
                              {this.state.isErrorPersonal.city2}
                            </div>
                          )}
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="address">
                          <Form.Label>Address<i className="validationError">*</i> </Form.Label>
                          <textarea
                            className="form-control"
                            name="address2"
                            value={address2}
                            onChange={this.handlePersonalChange}
                            id="seAddress"
                          />
                          {submitted && !address2 && (
                            <div className="validationError">
                              Address is required
                            </div>
                          )}
                          {this.state.isErrorPersonal.address2 !== "" && submitted && email && (
                            <div className="validationError">
                              {this.state.isErrorPersonal.address2}
                            </div>
                          )}
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group as={Col} md="6" controlId="pincode">
                          <Form.Label>Pincode<i className="validationError">*</i></Form.Label>
                          <input
                            type="number"
                            autoComplete="off"
                            className="form-control"
                            name="pincode2"
                            value={pincode2}
                            onChange={this.handlePersonalChange}
                            id="sePincode"
                          />

                          {submitted && !pincode2 && (
                            <div className="validationError">
                              Pincode is required
                            </div>
                          )}
                          {this.state.isErrorPersonal.pincode2 !== "" && submitted && email && (
                            <div className="validationError">
                              {this.state.isErrorPersonal.pincode2}
                            </div>
                          )}
                        </Form.Group>
                        <Form.Group as={Col} md="6"></Form.Group>
                        <Form.Group as={Col} md="6">
                          {/* <Form.checkBox
                          type="checkbox"
                          name="checkBox"
                          // value={checkBox}
                          onChange={this.handleResdential}
                          label="Same as Current address"
                          id="sameAddress"
                          checked={this.state.checkBox}
                          /> */}
                          <Form.Label >
                          <input type="checkbox"
                             name="checkBox"
                            value={checkBox}
                            onClick={this.handleResdential}
                            Label="same as current address"

                          />
                          {" "}
                          same as current address</Form.Label>





                        </Form.Group>
                      </Form.Row>
                    </Col>
                  </Row>

                </Form>
              </Container>
            ) : null}
            {/* ----------------------Adhar verification------------------------ */}
            {this.state.showAdharModal == true ? (
              <Form onSubmit={this.handleSubmit1}>
                <h4>
                  <Form.Label className="heading1-self">
                    Aadhar Card Verification <i className="validationError">*</i>
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
                          format="#### #### ####"
                        // mask="#"
                        />
                        {submittedVerify && !aadharNumber && (
                          <div className="validationError">
                            Aadhar Number is required
                          </div>
                        )}
                        {submittedVerify &&
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
                        {submitLoader == true ? (
                          <Page
                            loader={"bubble-spin"}
                            color={"#A9A9A9"}
                            size={10}
                          />
                        ) : null}
                      </Col>
                    </Row>
                  </Form.Group>
                </Form.Row>

                {/* <Form.Row>
                    <Form.Group>

                      <Button size="sm"
                      onClick={this.handleSubmit1}
                      >Verify</Button>
                      {submitLoader==true? <Page loader={"bubble-spin"} color={"#A9A9A9"} size={10} />:null}
                    </Form.Group>
                    </Form.Row> */}
              </Form>
            ) : null}

            {/* ------------------files upload---------------------------*/}
            {this.state.showFilesModal == true ? (
              <Form >
                <h4>
                  <Form.Label className="heading1-self">Education Details</Form.Label>
                </h4>
                <Form.Row>


                  <Form.Group as={Col} md="4" controlId="experience">
                    <Form.Label>Experience<i className="validationError">*</i></Form.Label>
                    <input
                      type="number"
                      autoComplete="off"
                      className="form-control"
                      placeholder="eg:yy.mm"
                      name="experience"
                      value={experience}
                      onChange={this.handleExpChange}
                      id="seExperience"
                    />
                    {submitted1 && !experience && (
                      <div className="validationError">
                        Experience is required
                      </div>
                    )}
                    {this.state.expError!== "" && submitted1 && experience && (
                      <div className="validationError">
                        {this.state.expError}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="qualification">
                    <Form.Label>Qualification<i className="validationError">*</i></Form.Label>
                    <input
                      type="text"
                      autoComplete="off"
                      className="form-control"
                      name="qualification"
                      value={qualification}
                      onChange={this.handleQualificationChange}
                      id="seQualification"
                    />
                    {submitted1 && !qualification && (
                      <div className="validationError">
                        Qualification is required
                      </div>
                    )}
                    {this.state.qualificationError !== "" && submitted1 && qualification && (
                      <div className="validationError">
                        {this.state.qualificationError}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="specialization">
                    <Form.Label>Specialization<i className="validationError">*</i></Form.Label>
                    <input
                      type="text"
                      autoComplete="off"
                      className="form-control"
                      name="specialization"
                      value={specialization}
                      onChange={this.handleSpecialChange}
                      id="seSpecialization"
                    />
                    {submitted1 && !specialization && (
                      <div className="validationError">
                        Specialization is required
                      </div>
                    )}
                    {this.state.specialError !== "" && submitted1 && specialization && (
                      <div className="validationError">
                        {this.state.specialError}
                      </div>
                    )}
                  </Form.Group>

                </Form.Row>
                <Form.Row>
                <Form.Group as={Col} md="4" controlId="experience">
                    <Form.Label>Pan Card Number<i className="validationError">*</i></Form.Label>

                    <input
                      type="text"
                      autoComplete="off"
                      className="form-control"
                      name="panCardNumber"
                      value={panCardNumber}
                      onChange={this.handlePanChange}
                      id="sepanCardNumber"
                    />
                    {submitted1 && !panCardNumber && (
                      <div className="validationError">
                        Pan Card is required
                      </div>
                    )}

                    {submitted1 &&
                      this.state.panError !== "" &&
                      panCardNumber && (
                        <div className="validationError">
                          {this.state.panError}
                        </div>
                      )}
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="specialization">
                    <Form.Label>Skills<i className="validationError">*</i></Form.Label>
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
                      <textarea
                        className="form-control"
                        value={this.state.value}
                        // placeholder="Type or paste email addresses and press `Enter`..."
                        onKeyDown={this.handleKeyDown}
                        onChange={this.handleChange1}
                        onPaste={this.handlePaste}
                        name="value"

                      />

                      {this.state.error && <p className="error">{this.state.error}</p>}


                      {/* {submitted1 && !this.state.value && (
                        <div className="validationError">
                          skills is required
                        </div>
                      )} */}
                      {submitted1 && this.state.items.length === 0 && (
                        <div className="validationError nav-left">
                          Field is required
                        </div>)}
                    </div>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                <h4>
                  <Form.Label className="heading1-self">Files Upload</Form.Label>
                </h4>
                </Form.Row>
                <Form.Row>
                <Form.Group as={Col} md="6" controlId="country">
                    <Form.Label>Files Upload<i className="validationError">*</i><span><p>(Experience Certificate,Address Proof,Profile Photo,Aadhar Card)</p></span></Form.Label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      className="form-control-file"
                      id="exampleFormControlFile1"
                      name="cancelledChequeLeaf"
                      style={{ borderBlockStyle: "outset" }}
                      // onChange={(e) => this.file(e)}
                      onChange={this.handlePersonalFile}
                      multiple
                    />
                    {submitted1 && personalFile.length === 0 && (
                      <div className="validationError">
                        File is required
                      </div>
                    )}
                      {submitted1 && personalFile.length > 4 ?(
                      <div className="validationError">
                        File exceeds the limit
                      </div>
                    ):submitted1 && personalFile.length===2 ||personalFile.length===3 ||personalFile.length===1  ?(
                      <div className="validationError">
                        Upload four respective files
                      </div>
                    ):null}

                  </Form.Group>
                </Form.Row>



                {/* <Form.Row>
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
                          }} name="experienceCertificate"
                          accept="image/png, image/jpeg"
                          onChange={(e) => this.experienceCertificate(e)}
                        />
                      </Button>
                      <FormControl
                        placeholder={this.state.experienceCertificate.name}
                        disabled
                      />
                    </InputGroup>

                    {submitted1 && !experienceCertificate && (
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
                          }} name="addressProof"
                          accept="image/png, image/jpeg"
                          onChange={(e) => this.addressProof(e)}
                        />
                      </Button>
                      <FormControl
                        placeholder={this.state.addressProof.name}
                        disabled
                      />
                    </InputGroup>
                    {submitted1 && !addressProof && (
                      <div className="validationError">
                        Address Proof is required
                      </div>
                    )}
                  </Form.Group>
                </Form.Row> */}
              </Form>
            ) : null}
            {/* -----------------------Bandk Details-------------------------- */}
            {this.state.showBankModal == true ? (
              <Form>
                <h4>
                  <Form.Label className="heading1-self">
                    Bank Details
                  </Form.Label>
                </h4>
                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="experience">
                    <Form.Label>Bank Name<i className="validationError">*</i></Form.Label>
                    <input
                      type="text"
                      autoComplete="off"
                      className="form-control"
                      name="BankName"
                      value={BankName}
                      onChange={this.handleBankChange}
                      id="seBankName"
                    />
                    {submitted12 && !BankName && (
                      <div className="validationError">
                        Bank Name is required
                      </div>
                    )}
                    {this.state.bankError !== "" && submitted12 && BankName && (
                      <div className="validationError">
                        {this.state.bankError}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="country">
                    <Form.Label>Branch Name<i className="validationError">*</i></Form.Label>
                    <input
                      type="text"
                      autoComplete="off"
                      className="form-control"
                      name="branchName"
                      value={branchName}
                      onChange={this.handleBranchChange}
                      id="sBranchName"
                    />
                    {submitted12 && !branchName && (
                      <div className="validationError">
                        Branch name is required
                      </div>
                    )}
                    {this.state.branchError !== "" && submitted12 && branchName && (
                      <div className="validationError">
                        {this.state.branchError}
                      </div>
                    )}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="experience">
                    <Form.Label> Account number<i className="validationError">*</i></Form.Label>
                    <input
                      type="text"
                      autoComplete="off"
                      className="form-control"
                      name="AccountNumber"
                      value={AccountNumber}
                      onChange={this.ChangeAccountno}
                      id="seAccountNumber"
                    />
                    {submitted12 && !AccountNumber && (
                      <div className="validationError">
                        Account Number is required
                      </div>
                    )}
                    {this.state.AccountNumberError !== "" && submitted12 && AccountNumber && (
                      <div className="validationError">
                        {this.state.AccountNumberError}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="country">
                    <Form.Label>Re-enter Account number<i className="validationError">*</i></Form.Label>
                    <input
                      type="text"
                      autoComplete="off"
                      className="form-control"
                      name="reEnterAcc"
                      value={reEnterAcc}
                      onChange={this.ChangeAccountnoMatch}
                      id="seReEnter"
                    />
                    {submitted12 && !reEnterAcc && (
                      <div className="validationError">
                        Account Number is required
                      </div>
                    )}
                    {this.state.reEnterAccError!== "" && submitted12 && reEnterAcc && (
                      <div className="validationError">
                        {this.state.reEnterAccError}
                      </div>
                    )}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="experience">
                    <Form.Label> IFSC Code<i className="validationError">*</i></Form.Label>
                    <input
                      type="text"
                      autoComplete="off"
                      className="form-control"
                      name="ifscCode"
                      value={ifscCode}
                      onChange={this.ChangeIFSC}
                      id="seIfsc"
                    />
                    {submitted12 && !ifscCode && (
                      <div className="validationError">
                        IFSC Code is required
                      </div>
                    )}

                    {submitted12 &&this.state.IFSCError!== "" && ifscCode && (
                      <div className="validationError">
                        {this.state.IFSCError}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="country">
                    <Form.Label>Swift Code</Form.Label>
                    <input
                      type="text"
                      autoComplete="off"
                      className="form-control"
                      name="swiftCode"
                      value={swiftCode}
                      onChange={this.handleChange}
                      id="seSwift"
                    />
                    {submitted12 && !swiftCode && (
                      <div className="validationError">
                        Swift Code is required
                      </div>
                    )}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="country">
                    <Form.Label>Files Upload<i className="validationError">*</i><span><p>(Bank Passbook,Cancelled Cheque Leaf)</p></span></Form.Label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      className="form-control-file"
                      id="exampleFormControlFile1"
                      name="cancelledChequeLeaf"
                      style={{ borderBlockStyle: "outset" }}
                      // onChange={(e) => this.file(e)}
                      onChange={this.handleChangeFile}
                      multiple
                    />
                    {submitted12 && fileUpload.length === 0 && (
                      <div className="validationError">
                        File is required
                      </div>
                    )}
                      {submitted12 && fileUpload.length > 2 ?(
                      <div className="validationError">
                        files exceed the limit
                      </div>
                    ):submitted12 && fileUpload.length===1?(
                      <div className="validationError">
                        Upload two respective files
                      </div>
                    ):null}

                  </Form.Group>
                  {/* <Form.Group as={Col} md="4" controlId="country">
                    <Form.Label>Cheque leaf</Form.Label>

                    <InputGroup>
                      <Button className="btn btn-primary btn-color-admin">
                        Upload
                        <input
                          type="file"
                          autoComplete="off"
                          className="form-control"
                          name="cancelledChequeLeaf"
                          onChange={(e) => this.cancelledChequeLeaf(e)}
                          accept="image/png, image/jpeg"
                          style={{
                            position: "absolute",
                            fontSize: "50px",
                            opacity: "0",
                            right: "0",
                            top: "0",
                          }}
                        />
                      </Button>
                      <FormControl
                        placeholder={this.state.cancelledChequeLeaf.name}
                        disabled
                      />
                    </InputGroup>
                    {submitted12 && !cancelledChequeLeaf && (
                      <div className="validationError">Cheque is required</div>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="country">
                    <Form.Label>Bank Passbook</Form.Label>

                    <InputGroup>
                      <Button className="btn btn-primary btn-color-admin">
                        Upload
                        <input
                          type="file"
                          autoComplete="off"
                          className="form-control"
                          name="bankPassbook"
                          // value={cancelledChequeLeaf}
                          onChange={(e) => this.bankPassbook(e)}
                          accept="image/png, image/jpeg"
                          // id="seCheque"
                          style={{
                            position: "absolute",
                            fontSize: "50px",
                            opacity: "0",
                            right: "0",
                            top: "0",
                          }}
                        />
                      </Button>
                      <FormControl
                        placeholder={this.state.bankPassbook.name}
                        disabled
                      />
                    </InputGroup>
                    {submitted12 && !this.bankPassbook && (
                      <div className="validationError">Cheque is required</div>
                    )}
                  </Form.Group> */}
                </Form.Row>
              </Form>
            ) : null}
            <Container>

              <Form.Row>

              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="2" style={{ align: "center" }}>
                  <Button
                    className="btn btn-primary btn-color-admin"
                    onClick={this.back}
                    size="md"
                    // style={{marginLeft:"40em"}}
                    id="seback"
                  >
                    Back
                  </Button>
                </Form.Group>
                <Form.Group as={Col} md="2" style={{ align: "center" }}>
                  {this.state.showNextButton ? (
                    <Button
                      className="btn btn-primary btn-color-admin"
                      id="senext"
                      onClick={this.next}
                      disabled={this.state.en6}
                      size="md"
                    // style={{ marginLeft:"40em"}}
                    >
                      Next
                    </Button>
                  ) : null}
                </Form.Group>
                <Form.Group as={Col} md="2" style={{ align: "center" }}>
                  {this.state.showNextButton1 ? (
                    <Button
                      className="btn btn-primary btn-color-admin"
                      id="senext"
                      onClick={this.next1}
                      // disabled={this.state.en6}
                      size="md"
                    // style={{ marginLeft:"40em"}}
                    >
                      Next
                    </Button>
                  ) : null}
                </Form.Group>
                <Form.Group as={Col} md="2" style={{ align: "center" }}>
                  {this.state.showButton ? (
                    <Button
                      className="btn btn-primary btn-color-admin"
                      id="seSubmit"
                      // style={{ marginLeft: "30em" }}
                      onClick={this.handleSubmit}
                    >
                      submit{" "}
                    </Button>
                  ) : null}
                </Form.Group>
              </Form.Row>
            </Container>
          </Container>
        </section>
        <Footer />
      </div>
    );
  }
}

selfEmployedReg.propTypes = {
  submitselfemp: PropTypes.func,
  verifyAadharNumber: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    isSelfSuccess: state.selfempRegisterReducer.isSelfSuccess,
    isAadharSuccess: state.selfempRegisterReducer.isAadharSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  submitselfemp: (data) => dispatch(submitselfemp(data)),
  verifyAadharNumber: (aadharNumber) =>
    dispatch(verifyAadharNumber(aadharNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(selfEmployedReg);
