import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Multiselect } from "multiselect-react-dropdown";
import { PropTypes } from "prop-types";
import React from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
// import {  RadioButton } from 'react-radio-buttons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Select from "react-select";
import Switch from "react-switch";
import Swal from "sweetalert2";
import Footer from "../components/footer/Footer.js";
import Header from "../components/header/Header";
import HeaderLogin from "../components/header_login/HeaderLogin";
import * as Constants from "../constants";
import { requestContactUs } from "../contactus/action";
import {
  emailValidator, firstNameValidator,
  lastNameValidator, mobileValidator
} from "../Core/utils";
import {
  automatedEndTime,
  automatedEndTimeEnterprise,
  automatedEndTimePremium, checkStatus, dataCustomizePage1, litetimeslot, requestClaculatePrice, requestEnterpriseClaculatePriceupgread, requestLiteClaculatePrice, requestloaddetails, requestloadtimezone, requestPremiumClaculatePrice
} from "./action";

class UpgradeCustomizePage extends React.Component {
  constructor(props) {
    super(props);
    this.liteDateRef = React.createRef();
    this.enterpriseDateRef = React.createRef();
    this.premiumDateRef = React.createRef();
    this.liteSupportTypeRef = React.createRef();
    this.state = {
      timezoneOption: "",
      plansList: [],
      lite: {
        Model: "",
        ticketVol: "",
        serviceSupport: "",
        RecommendedModel: "",
        Recommendedseater: "",
        RecommendedPrice: "",
        SelectedModelPrice: "",
      },
      liteModel: "",
      liteticketVol: "",
      liteserviceSupport: "",
      liteRecommendedModel: "",
      liteRecommendedseater: "",
      liteRecommendedPrice: "",
      liteSelectedModelPrice: "",
      liteSupportWindow: [],
      liteModels: "",
      liteTimezone: "",
      littTimeSlot: "",
      liteSeatCount: "",
      liteModelsSubmit: "false",
      liteStartTime: "",
      liteEndTime: "",
      liteClick: false,

      enterpriseModel: "",
      enterpriseticketVol: "",
      enterpriseserviceSupport: "",
      enterpriseRecommendedModel: "",
      enterpriseRecommendedseater: "",
      enterpriseRecommendedPrice: "",
      enterpriseSelectedModelPrice: "",
      enterpriseSupportWindow: [],
      enterpriseModels: "",
      enterpriseTimezone: "",
      enterpriseTimeSlot: "",
      enterpriseSeatCount: "",
      enterpriseStartTime: "",
      enterpriseEndTime: "",
      enterpriseClick: false,

      premiumModel: "",
      premiumticketVol: "",
      premiumserviceSupport: "",
      premiumRecommendedModel: "",
      premiumRecommendedseater: "",
      premiumRecommendedPrice: "",
      premiumSelectedModelPrice: "",
      premiumSupportWindow: [],
      premiumModels: "",
      premiumTimezone: "",
      premiumTimeSlot: "",
      premiumSeatCount: "",
      premiumStartTime: "",
      premiumEndTime: "",
      premiumClick: false,

      TollFreeNumber: "",
      checked1: false,
      checked2: false,
      checked3: false,
      startDate: "",
      ContractDuration: "",
      PaymentTerms: "",
      showassignModal: false,
      showconfirmModal: false,
      closw: false,
      plan: "",

      submitted: false,
      isLoginSuccess: false,
      isReadyToRedirect: false,
      emailError: "",
      isSuccess: false,
      startTime: "",
      endTime: "",
      date: "",
      automatedTime: "",
      automatedTimeEnterprise: "",
      automatedTimePremium: "",
      email: "",
      tokenLite: "",
      detailslist: "",
      tokenEnterprise: "",
      tokenPremium: "",
      token: "",
      serviceSupport: "",
      supportWindow: [],
      showCheckStatus: false,
      day: [
        "",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      days: [
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
        { label: "Sunday", value: "Sunday" },
      ],

      daysLite: [
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
        { label: "Sunday", value: "Sunday" },
      ],

      daysEnterprise: [
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
        { label: "Sunday", value: "Sunday" },
      ],

      daysPremium: [
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
        { label: "Sunday", value: "Sunday" },
      ],

      dayss: [
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
      ],
      selectDate: [],
      dataLite: [],
      dataEnterprise: [],
      dataPremium: [],
      litetimehite:false,
      enterprisetimehite:false,
      premiumtimehite:false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeLiteStartDate = this.handleChangeLiteStartDate.bind(this);
    this.handleChangeEnterpriseStartDate =
      this.handleChangeEnterpriseStartDate.bind(this);
    this.handleChangePremiumStartDate =
      this.handleChangePremiumStartDate.bind(this);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  navigate = (url) => {
    this.props.history.push(url);
  };

  litehandleChange = (event) => {
    const { name, value } = event.target;
    if (value === "PPU") {
      this.setState({
        litePaymentTerms: "Yearly",
      });
    }else{
      this.setState({
        litePaymentTerms: this.state.litePaymentTerm,
      });
    }
    console.log("" + name + "\n" + value);
    this.setState({
      [name]: value,
      liteRecommendedModel: "",
      liteRecommendedPrice: "",
      // liteRecommendedseater:'',
      liteSelectedModelPrice: "",
      liteClick: false,
      liteSeatCount: "",
    });
    if (name === "liteModel" && value !== "Dedicated") {
      this.setState({
        liteSeatCount: "",
        liteRecommendedseater: "",
        liteClick: false,
      });
    } else if (
      name === "liteModel" &&
      value === "Dedicated" &&
      this.state.liteserviceSupport == "Customize"
    ) {
      this.handleCloseLite();
      this.setState({
        liteSeatCount: value,
      });
    }
  };

  liteResourceshandleChange = (event) => {
    const { name, value } = event.target;
    console.log("" + name + "" + value);
    this.setState({
      [name]: value,
      liteRecommendedModel: "",
      liteRecommendedPrice: "",
      // liteRecommendedseater:'',
      liteSelectedModelPrice: "",
      liteClick: false,
      //liteSeatCount: '',
    });
    if (name === "liteModel" && value !== "Dedicated") {
      this.setState({
        liteSeatCount: "",
        liteRecommendedseater: "",
        liteClick: false,
      });
    } else if (
      name === "liteModel" &&
      value === "Dedicated" &&
      this.state.liteserviceSupport == "Customize"
    ) {
      this.handleCloseLite();
      this.setState({
        liteSeatCount: value,
      });
    }
  };

  liteHandleChange = (opt) => {
    if (opt.value !== "Customize") {
      this.handleCloseLite();
    }

    if (opt.value == "Customize" && this.state.liteModel == "Dedicated") {
      this.setState({
        showDedicatedCustomice: true,
        planDedicatedCustomice: "Lite",
      });
    } else if (this.state.liteserviceSupport !== opt.value) {
      this.setState({
        liteserviceSupport: opt.value,
         liteStartTime: "",
         liteEndTime: "",
        liteModels: opt.value,
       // liteSupportWindow: [],
        liteRecommendedModel: "",
        liteRecommendedPrice: "",
        dataLite: [],
        liteSeatCount: "",
        liteRecommendedseater:'',
        liteSelectedModelPrice: "",
        liteClick: false,
      });
    } else {
      this.setState({
        // startTime:'',
        // endTime:'',
       // liteSeatCount: "",
        liteserviceSupport: opt.value,
        liteModels: opt.value,
      });
    }
  };

  enterprisehandleChange = (event) => {
    const { name, value } = event.target;
    if (value === "PPU") {
      this.setState({
        enterprisePaymentTerms: "Yearly",
      });
    }else{
      this.setState({
        enterprisePaymentTerms: this.state.enterprisePaymentTerm,
      });
    }
    this.setState({
      [name]: value,
      enterpriseRecommendedModel: "",
      enterpriseRecommendedPrice: "",
      //enterpriseRecommendedseater:'',
      enterpriseSelectedModelPrice: "",
      enterpriseClick: false,
      enterpriseSeatCount: "",
    });
    if (name === "enterpriseModel" && value !== "Dedicated") {
      this.setState({
        enterpriseSeatCount: "",
        enterpriseRecommendedseater: "",
        enterpriseClick: false,
      });
    } else if (
      name === "enterpriseModel" &&
      value === "Dedicated" &&
      this.state.enterpriseserviceSupport == "Customize"
    ) {
      this.handleCloseEnterprise();
    }
  };

  enterpriseResourceshandleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      enterpriseRecommendedModel: "",
      enterpriseRecommendedPrice: "",
      //enterpriseRecommendedseater:'',
      enterpriseSelectedModelPrice: "",
      enterpriseClick: false,
      // enterpriseSeatCount: '',
    });
    if (name === "enterpriseModel" && value !== "Dedicated") {
      this.setState({
        enterpriseSeatCount: "",
        enterpriseRecommendedseater: "",
        enterpriseClick: false,
      });
    } else if (
      name === "enterpriseModel" &&
      value === "Dedicated" &&
      this.state.enterpriseserviceSupport == "Customize"
    ) {
      this.handleCloseEnterprise();
      this.setState({
        enterpriseSeatCount: value,
      });
    }
  };

  enterpriseHandleChange = (opt) => {
    //const {name, value} = event.target;
    if (opt.value !== "Customize") {
      this.handleCloseEnterprise();
    }
    if (opt.value == "Customize" && this.state.enterpriseModel == "Dedicated") {
      this.setState({
        showDedicatedCustomice: true,
        planDedicatedCustomice: "Enterprise",
      });
    } else if (this.state.enterpriseserviceSupport !== opt.value) {
      this.setState({
        enterpriseStartTime: "",
        enterpriseEndTime: "",
        enterpriseserviceSupport: opt.value,
        enterpriseModels: opt.value,
        enterpriseSupportWindow: [],
        enterpriseRecommendedModel: "",
        enterpriseRecommendedPrice: "",
        dataEnterprise: [],
        // enterpriseRecommendedseater:'',
        enterpriseSelectedModelPrice: "",
        enterpriseClick: false,
        enterpriseSeatCount: "",
      });
    } else {
      this.setState({
        // startTime:'',
        // endTime:'',
       // enterpriseRecommendedPrice: "",

        enterpriseserviceSupport: opt.value,
        enterpriseModels: opt.value,
      });
    }
  };
  premiumhandleChange = (event) => {
    const { name, value } = event.target;
    if (value == "PPU") {
      this.setState({
        premiumPaymentTerms: "Yearly",
      });
    }else{
      this.setState({
        premiumPaymentTerms: this.state.premiumPaymentTerm,
      });
    }
    this.setState({
      [name]: value,
      premiumRecommendedModel: "",
      premiumRecommendedPrice: "",
      premiumRecommendedseater: "",
      premiumSelectedModelPrice: "",
      premiumClick: false,
      premiumSeatCount: "",
    });
    if (name === "premiumModel" && value !== "Dedicated") {
      this.setState({
        premiumSeatCount: "",
        premiumRecommendedseater: "",
        premiumClick: false,
      });
    } else if (
      name === "premiumModel" &&
      value === "Dedicated" &&
      this.state.premiumserviceSupport == "Customize"
    ) {
      this.handleClosepremium();
    }
  };

  premiumResourceshandleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      premiumRecommendedModel: "",
      premiumRecommendedPrice: "",
      premiumRecommendedseater: "",
      premiumSelectedModelPrice: "",
      premiumClick: false,
      // premiumSeatCount: ''
    });
    if (name === "premiumModel" && value !== "Dedicated") {
      this.setState({
        premiumSeatCount: "",
        premiumRecommendedseater: "",
        premiumClick: false,
      });
    } else if (
      name === "premiumModel" &&
      value === "Dedicated" &&
      this.state.premiumserviceSupport == "Customize"
    ) {
      this.handleClosepremium();
      this.setState({
        premiumSeatCount: value,
      });
    }
  };

  premiumHandleChange = (opt) => {
    if (opt.value !== "Customize") {
      this.handleClosepremium();
    }
    //const {name, value} = event.target;
    if (opt.value == "Customize" && this.state.premiumModel == "Dedicated") {
      this.setState({
        showDedicatedCustomice: true,
        planDedicatedCustomice: "Premium",
      });
    } else if (this.state.premiumserviceSupport !== opt.value) {
      this.setState({
        premiumStartTime: "",
        premiumEndTime: "",
        premiumserviceSupport: opt.value,
        premiumModels: opt.value,
        premiumSupportWindow: [],
        premiumRecommendedModel: "",
        premiumRecommendedPrice: "",
        dataPremium: [],
        //premiumRecommendedseater:'',
        premiumSelectedModelPrice: "",
        premiumClick: false,
        premiumSeatCount: "",
      });
    } else {
      this.setState({
        // startTime:'',
        // endTime:'',
        premiumserviceSupport: opt.value,
        premiumModels: opt.value,
      });
    }
  };

  handleSelectChangeStartTime = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({ startTime: selectedOption.label });
  };

  handleSelectChangeEndTime = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({ endTime: selectedOption.label });
  };

  handleSelectChangeLiteStartTime = (selectedOption) => {
    this.setState({ liteStartTime: selectedOption.label });
    this.props.automatedEndTime(
      this.state.liteTimezone,
      this.state.liteserviceSupport,
      selectedOption.label
    );
  };

  handleSelectChangeLiteEndTime = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({ liteEndTime: selectedOption.label });
  };

  handleSelectChangeEnterpriseStartTime = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({ enterpriseStartTime: selectedOption.label });
    this.props.automatedEndTimeEnterprise(
      this.state.enterpriseTimezone,
      this.state.enterpriseserviceSupport,
      selectedOption.label
    );
  };

  handleSelectChangeEnterpriseEndTime = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({ enterpriseEndTime: selectedOption.label });
  };

  handleSelectChangePremiumStartTime = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({ premiumStartTime: selectedOption.label });
    this.props.automatedEndTimePremium(
      this.state.premiumTimezone,
      this.state.premiumserviceSupport,
      selectedOption.label
    );
  };

  handleSelectChangePremiumEndTime = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({ premiumEndTime: selectedOption.label });
  };

  liteAdd = (e) => {
    this.setState({
      liteModelsSubmit: "true",
    });
    console.log(
      "this.state.dataLite \n" + JSON.stringify(this.state.dataLite.length > 0)
    );
    //console.log("\n this.state.liteTimezone \n"+this.state.liteTimezone+"\n this.state.startTime\n"+this.state.startTime+"\n -this.state.endTime \n"+this.state.endTime)
    if (e == "Customize") {
      if (this.state.dataLite.length > 0) {
        //const data =this.state.dataLite;
        //this.state.liteSupportWindow.push(data);
        this.state.liteSupportWindow = this.state.dataLite;
        console.log(
          "liteSupportWindow\n" + JSON.stringify(this.state.liteSupportWindow)
        );
        this.setState({
          liteStartTime: "",
          liteEndTime: "",
          liteModels: "",
          startTime: "",
          endTime: "",
          //dataLite:[],
          days: [
            { label: "Monday", value: "Monday" },
            { label: "Tuesday", value: "Tuesday" },
            { label: "Wednesday", value: "Wednesday" },
            { label: "Thursday", value: "Thursday" },
            { label: "Friday", value: "Friday" },
            { label: "Saturday", value: "Saturday" },
            { label: "Sunday", value: "Sunday" },
          ],
        });
      } else {
        console.log("2");
        Swal.fire({
          title: "",
          text: "Please fill all fields",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });

        // this.setState({
        //   liteserviceSupport:'',
        //   liteSupportWindow:'',
        //   liteModels:'',
        //     startTime:'',
        // endTime:'',
        // })
      }
    } else {
      if (
        this.state.liteTimezone &&
        this.state.liteStartTime &&
        this.state.liteEndTime
      ) {
        const data =[ {
          timeZone: this.state.liteTimezone,
          dayList: ["Monday", "Tuesday", "wednesday", "thursday", "friday"],
          startTime: this.state.liteStartTime,
          endTime: this.state.liteEndTime,
        }];
        console.log("data\n" + JSON.stringify(data));
        this.setState({
          liteSupportWindow : data,
        })
        // this.state.liteSupportWindow.push(data);
        //console.log("liteSupportWindow\n"+JSON.stringify(this.state.liteSupportWindow))
        this.setState({
          // startTime:'',
          //endTime:'',
          liteModels: "",
          liteRecommendedModel:'',
          liteRecommendedPrice:'',
          liteSeatCount:'',
          liteRecommendedseater:'',
        });
      }
    }
  };

  enterpriseAdd = (e) => {
    this.setState({
      enterpriseModelsSubmit: "true",
    });

    if (e == "Customize") {
      if (this.state.dataEnterprise.length > 0) {
        this.state.enterpriseSupportWindow = this.state.dataEnterprise;
        console.log(
          "enterpriseSupportWindow\n" +
            JSON.stringify(this.state.enterpriseSupportWindow)
        );
        this.setState({
          enterpriseStartTime: "",
          enterpriseEndTime: "",
          enterpriseModels: "",
          startTime: "",
          endTime: "",
          //dataEnterprise:[],
          days: [
            { label: "Monday", value: "Monday" },
            { label: "Tuesday", value: "Tuesday" },
            { label: "Wednesday", value: "Wednesday" },
            { label: "Thursday", value: "Thursday" },
            { label: "Friday", value: "Friday" },
            { label: "Saturday", value: "Saturday" },
            { label: "Sunday", value: "Sunday" },
          ],
        });
      } else {
        console.log("2");
        Swal.fire({
          title: "",
          text: "Please fill all fields",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });

        // this.setState({
        //   liteserviceSupport:'',
        //   liteSupportWindow:'',
        //   liteModels:'',
        //     startTime:'',
        // endTime:'',
        // })
      }
    } else {
      if (
        this.state.enterpriseTimezone &&
        this.state.enterpriseStartTime &&
        this.state.enterpriseEndTime
      ) {
        const data = [{
          timeZone: this.state.enterpriseTimezone,
          dayList: ["Monday", "Tuesday", "wednesday", "thursday", "friday"],
          startTime: this.state.enterpriseStartTime,
          endTime: this.state.enterpriseEndTime,
        }];
        this.setState({
          enterpriseSupportWindow : data,
        })
        this.setState({
          enterpriseModels: "",
          enterpriseRecommendedModel:'',
          enterpriseRecommendedPrice:'',
          enterpriseRecommendedseater:'',
          enterpriseSeatCount:'',
        });
      }
    }
  };

  premiumAdd = (e) => {
    this.setState({
      premiumModelsSubmit: "true",
    });
    console.log(
      "this.state.dataPremium \n" + JSON.stringify(this.state.dataPremium)
    );
    //console.log("\n this.state.premiumTimezone \n"+this.state.premiumTimezone+"\n this.state.startTime\n"+this.state.startTime+"\n -this.state.endTime \n"+this.state.endTime)
    if (e == "Customize") {
      if (this.state.dataPremium.length > 0) {
        //const data =this.state.dataPremium;
        //this.state.premiumSupportWindow.push(data);
        this.state.premiumSupportWindow = this.state.dataPremium;
        console.log(
          "premiumSupportWindow\n" +
            JSON.stringify(this.state.premiumSupportWindow)
        );
        this.setState({
          premiumStartTime: "",
          premiumEndTime: "",
          startTime: "",
          endTime: "",
          premiumModels: "",
          //dataPremium:[],
          days: [
            { label: "Monday", value: "Monday" },
            { label: "Tuesday", value: "Tuesday" },
            { label: "Wednesday", value: "Wednesday" },
            { label: "Thursday", value: "Thursday" },
            { label: "Friday", value: "Friday" },
            { label: "Saturday", value: "Saturday" },
            { label: "Sunday", value: "Sunday" },
          ],
        });
      } else {
        console.log("2");
        Swal.fire({
          title: "",
          text: "Please fill all fields",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });

        // this.setState({
        //   liteserviceSupport:'',
        //   liteSupportWindow:'',
        //   liteModels:'',
        //     startTime:'',
        // endTime:'',
        // })
      }
    } else {
      console.log(
        this.state.liteTimezone +
          "\n" +
          this.state.startTime +
          "\n" +
          this.state.endTime
      );
      if (
        this.state.premiumTimezone &&
        this.state.premiumStartTime &&
        this.state.premiumEndTime
      ) {
        console.log("testing");
        const data = {
          timeZone: this.state.premiumTimezone,
          dayList: ["Monday", "Tuesday", "wednesday", "thursday", "friday"],
          startTime: this.state.premiumStartTime,
          endTime: this.state.premiumEndTime,
        };
        console.log("data\n" + JSON.stringify(data));
        this.state.premiumSupportWindow.push(data);
        //console.log("premiumSupportWindow\n"+JSON.stringify(this.state.premiumSupportWindow))
        this.setState({
          startTime: "",
          endTime: "",
          premiumModels: "",
          premiumRecommendedModel:'',
          premiumRecommendedPrice:'',
          premiumRecommendedseater:'',
          premiumSeatCount:'',
        });
      }
    }
  };

  liteTimeZone = (opt) => {
    this.setState({
      liteTimezone: opt.value,
    });

    this.props.litetimeslot(opt.value);

  };

  enterpriseTimeZone = (opt) => {
    this.setState({
      enterpriseTimezone: opt.value,
    });
    console.log(opt.value);
    this.props.litetimeslot(opt.value);
  };

  premiumTimeZone = (opt) => {
    this.setState({
      premiumTimezone: opt.value,
    });
    console.log(opt.value);
    this.props.litetimeslot(opt.value);
  };

  claculatePrice = () => {
    // this.props.history.push('/planDetails?data=' + {"dada":"dada"} )
    this.setState({ submitted: true });
    const {
      liteModel,
      liteticketVol,
      liteserviceSupport,
      liteSupportWindow,
      TollFreeNumber,
      ContractDuration,
      PaymentTerms,
      startDate,
    } = this.state;

    if (
      this.state.TollFreeNumber &&
      this.state.startDate &&
      this.state.ContractDuration &&
      this.state.PaymentTerms
    ) {
      if (this.state.checked1 || this.state.checked2 || this.state.checked3) {
        if (
          this.state.checked1 &&
          !this.state.checked2 &&
          !this.state.checked3
        ) {
          if (
            liteModel &&
            liteticketVol >= 50 &&
            liteserviceSupport &&
            ((liteModel === "Dedicated" &&
              this.state.liteSeatCount &&
              this.state.liteRecommendedseater &&
              this.state.liteSeatCount >= this.state.liteRecommendedseater) ||
              liteModel !== "Dedicated")
          ) {
            this.state.plansList = [
              {
                plan: "Lite",
                token: this.state.tokenLite,
                model: this.state.liteModel,
                ticket: this.state.liteticketVol,
                userEnteredSeatCount: this.state.liteSeatCount,
                recommendSeat: this.state.liteRecommendedseater,
                serviceSupport:
                  liteserviceSupport ==
                    "8 X 5 Weekdays (office hours support)" ||
                  liteserviceSupport == "16 X 5 After office hours support"
                    ? [liteserviceSupport, "Customize"]
                    : [liteserviceSupport],
                supportWindow: liteSupportWindow,
                newSelectedModelPrice: this.state.liteSelectedModelPrice,
                paymentTerms: this.state.litePaymentTerms,
                isTollFreeNumber: this.state.liteIsTollFreeNumber,
                serviceInitializationDate: this.state.liteInitialisationDate,
                contractDuration: this.state.liteContractDuration,
                currencyCode: this.state.currencyCode,
              },
            ];
          } else {
            Swal.fire({
              title: "",
              text: "Please fill all the required fields.",
              icon: "warning",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OK",
            });
          }
        } else if (
          !this.state.checked1 &&
          this.state.checked2 &&
          !this.state.checked3
        ) {
          if (
            this.state.enterpriseModel &&
            this.state.enterpriseticketVol >= 50 &&
            this.state.enterpriseserviceSupport &&
            ((this.state.enterpriseModel === "Dedicated" &&
              this.state.enterpriseSeatCount &&
              this.state.enterpriseRecommendedseater &&
              this.state.enterpriseSeatCount >=
                this.state.enterpriseRecommendedseater) ||
              this.state.enterpriseModel !== "Dedicated")
          ) {
            this.state.plansList = [
              {
                plan: "Enterprise",
                token: this.state.tokenEnterprise,
                model: this.state.enterpriseModel,
                ticket: this.state.enterpriseticketVol,
                userEnteredSeatCount: this.state.enterpriseSeatCount,
                recommendSeat: this.state.enterpriseRecommendedseater,
                serviceSupport:
                  this.state.enterpriseserviceSupport ==
                    "8 X 5 Weekdays (office hours support)" ||
                  this.state.enterpriseserviceSupport ==
                    "16 X 5 After office hours support"
                    ? [this.state.enterpriseserviceSupport, "Customize"]
                    : [this.state.enterpriseserviceSupport],
                supportWindow: this.state.enterpriseSupportWindow,
                newSelectedModelPrice: this.state.enterpriseSelectedModelPrice,
                paymentTerms: this.state.enterprisePaymentTerms,
                isTollFreeNumber: this.state.enterpriseIsTollFreeNumber,
                serviceInitializationDate:
                  this.state.enterpriseInitialisationDate,
                contractDuration: this.state.enterpriseContractDuration,
                currencyCode: this.state.currencyCode,
              },
            ];
          } else {
            Swal.fire({
              title: "",
              text: "Please fill all the required fields.",
              icon: "warning",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OK",
            });
          }
        } else if (
          !this.state.checked1 &&
          !this.state.checked2 &&
          this.state.checked3
        ) {
          if (
            this.state.premiumModel &&
            this.state.premiumticketVol >= 50 &&
            this.state.premiumserviceSupport &&
            ((this.state.premiumModel === "Dedicated" &&
              this.state.premiumSeatCount &&
              this.state.premiumRecommendedseater &&
              this.state.premiumSeatCount >=
                this.state.premiumRecommendedseater) ||
              this.state.premiumModel !== "Dedicated")
          ) {
            this.state.plansList = [
              {
                plan: "Premium",
                token: this.state.tokenPremium,
                model: this.state.premiumModel,
                ticket: this.state.premiumticketVol,
                userEnteredSeatCount: this.state.premiumSeatCount,
                recommendSeat: this.state.premiumRecommendedseater,
                serviceSupport:
                  this.state.premiumserviceSupport ==
                    "8 X 5 Weekdays (office hours support)" ||
                  this.state.premiumserviceSupport ==
                    "16 X 5 After office hours support"
                    ? [this.state.premiumserviceSupport, "Customize"]
                    : [this.state.premiumserviceSupport],
                supportWindow: this.state.premiumSupportWindow,
                newSelectedModelPrice: this.state.premiumSelectedModelPrice,
                paymentTerms: this.state.premiumPaymentTerms,
                isTollFreeNumber: this.state.premiumIsTollFreeNumber,
                serviceInitializationDate: this.state.premiumInitialisationDate,
                contractDuration: this.state.premiumContractDuration,
                currencyCode: this.state.currencyCode,
              },
            ];
          } else {
            Swal.fire({
              title: "",
              text: "Please fill all the required fields.",
              icon: "warning",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OK",
            });
          }
        } else if (
          this.state.checked1 &&
          this.state.checked2 &&
          !this.state.checked3
        ) {
          if (
            liteModel &&
            liteticketVol >= 50 &&
            liteserviceSupport &&
            ((liteModel === "Dedicated" &&
              this.state.liteSeatCount &&
              this.state.liteRecommendedseater &&
              this.state.liteSeatCount >= this.state.liteRecommendedseater) ||
              liteModel !== "Dedicated") &&
            this.state.enterpriseModel &&
            this.state.enterpriseticketVol >= 50 &&
            this.state.enterpriseserviceSupport &&
            ((this.state.enterpriseModel === "Dedicated" &&
              this.state.enterpriseSeatCount &&
              this.state.enterpriseRecommendedseater &&
              this.state.enterpriseSeatCount >=
                this.state.enterpriseRecommendedseater) ||
              this.state.enterpriseModel !== "Dedicated")
          ) {
            this.state.plansList = [
              {
                plan: "Lite",
                token: this.state.tokenLite,
                model: this.state.liteModel,
                ticket: this.state.liteticketVol,
                userEnteredSeatCount: this.state.liteSeatCount,
                recommendSeat: this.state.liteRecommendedseater,
                serviceSupport:
                  liteserviceSupport ==
                    "8 X 5 Weekdays (office hours support)" ||
                  liteserviceSupport == "16 X 5 After office hours support"
                    ? [liteserviceSupport, "Customize"]
                    : [liteserviceSupport],
                supportWindow: liteSupportWindow,
                newSelectedModelPrice: this.state.liteSelectedModelPrice,
                paymentTerms: this.state.litePaymentTerms,
                isTollFreeNumber: this.state.liteIsTollFreeNumber,
                serviceInitializationDate: this.state.liteInitialisationDate,
                contractDuration: this.state.liteContractDuration,
                currencyCode: this.state.currencyCode,
              },
              {
                plan: "Enterprise",
                token: this.state.tokenEnterprise,
                model: this.state.enterpriseModel,
                ticket: this.state.enterpriseticketVol,
                userEnteredSeatCount: this.state.enterpriseSeatCount,
                recommendSeat: this.state.enterpriseRecommendedseater,
                serviceSupport:
                  this.state.enterpriseserviceSupport ==
                    "8 X 5 Weekdays (office hours support)" ||
                  this.state.enterpriseserviceSupport ==
                    "16 X 5 After office hours support"
                    ? [this.state.enterpriseserviceSupport, "Customize"]
                    : [this.state.enterpriseserviceSupport],
                supportWindow: this.state.enterpriseSupportWindow,
                newSelectedModelPrice: this.state.enterpriseSelectedModelPrice,
                paymentTerms: this.state.enterprisePaymentTerms,
                isTollFreeNumber: this.state.enterpriseIsTollFreeNumber,
                serviceInitializationDate:
                  this.state.enterpriseInitialisationDate,
                contractDuration: this.state.enterpriseContractDuration,
                currencyCode: this.state.currencyCode,
              },
            ];
          } else {
            Swal.fire({
              title: "",
              text: "Please fill all the required fields.",
              icon: "warning",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OK",
            });
          }
        } else if (
          this.state.checked1 &&
          !this.state.checked2 &&
          this.state.checked3
        ) {
          if (
            liteModel &&
            liteticketVol >= 50 &&
            liteserviceSupport &&
            ((liteModel === "Dedicated" &&
              this.state.liteSeatCount &&
              this.state.liteRecommendedseater &&
              this.state.liteSeatCount >= this.state.liteRecommendedseater) ||
              liteModel !== "Dedicated") &&
            this.state.premiumModel &&
            this.state.premiumticketVol >= 50 &&
            this.state.premiumserviceSupport &&
            ((this.state.premiumModel === "Dedicated" &&
              this.state.premiumSeatCount &&
              this.state.premiumRecommendedseater &&
              this.state.premiumSeatCount >=
                this.state.premiumRecommendedseater) ||
              this.state.premiumModel !== "Dedicated")
          ) {
            this.state.plansList = [
              {
                plan: "Lite",
                token: this.state.tokenLite,
                model: this.state.liteModel,
                ticket: this.state.liteticketVol,
                userEnteredSeatCount: this.state.liteSeatCount,
                recommendSeat: this.state.liteRecommendedseater,
                serviceSupport:
                  liteserviceSupport ==
                    "8 X 5 Weekdays (office hours support)" ||
                  liteserviceSupport == "16 X 5 After office hours support"
                    ? [liteserviceSupport, "Customize"]
                    : [liteserviceSupport],
                supportWindow: liteSupportWindow,
                newSelectedModelPrice: this.state.liteSelectedModelPrice,
                paymentTerms: this.state.litePaymentTerms,
                isTollFreeNumber: this.state.liteIsTollFreeNumber,
                serviceInitializationDate: this.state.liteInitialisationDate,
                contractDuration: this.state.liteContractDuration,
                currencyCode: this.state.currencyCode,
              },
              {
                plan: "Premium",
                token: this.state.tokenPremium,
                model: this.state.premiumModel,
                ticket: this.state.premiumticketVol,
                userEnteredSeatCount: this.state.premiumSeatCount,
                recommendSeat: this.state.premiumRecommendedseater,
                serviceSupport:
                  this.state.premiumserviceSupport ==
                    "8 X 5 Weekdays (office hours support)" ||
                  this.state.premiumserviceSupport ==
                    "16 X 5 After office hours support"
                    ? [this.state.premiumserviceSupport, "Customize"]
                    : [this.state.premiumserviceSupport],
                supportWindow: this.state.premiumSupportWindow,
                newSelectedModelPrice: this.state.premiumSelectedModelPrice,
                paymentTerms: this.state.premiumPaymentTerms,
                isTollFreeNumber: this.state.premiumIsTollFreeNumber,
                  serviceInitializationDate: this.state.premiumInitialisationDate,
                contractDuration: this.state.premiumContractDuration,
                currencyCode: this.state.currencyCode,
              },
            ];
          } else {
            Swal.fire({
              title: "",
              text: "Please fill all the required fields.",
              icon: "warning",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OK",
            });
          }
        } else if (
          !this.state.checked1 &&
          this.state.checked2 &&
          this.state.checked3
        ) {
          if (
            this.state.enterpriseModel &&
            this.state.enterpriseticketVol >= 50 &&
            this.state.enterpriseserviceSupport &&
            ((this.state.enterpriseModel === "Dedicated" &&
              this.state.enterpriseSeatCount &&
              this.state.enterpriseRecommendedseater &&
              this.state.enterpriseSeatCount >=
                this.state.enterpriseRecommendedseater) ||
              this.state.enterpriseModel !== "Dedicated") &&
            this.state.premiumModel &&
            this.state.premiumticketVol >= 50 &&
            this.state.premiumserviceSupport &&
            ((this.state.premiumModel === "Dedicated" &&
              this.state.premiumSeatCount &&
              this.state.premiumRecommendedseater &&
              this.state.premiumSeatCount >=
                this.state.premiumRecommendedseater) ||
              this.state.premiumModel !== "Dedicated")
          ) {
            this.state.plansList = [
              {
                plan: "Enterprise",
                token: this.state.tokenEnterprise,
                model: this.state.enterpriseModel,
                ticket: this.state.enterpriseticketVol,
                userEnteredSeatCount: this.state.enterpriseSeatCount,
                recommendSeat: this.state.enterpriseRecommendedseater,
                serviceSupport:
                  this.state.enterpriseserviceSupport ==
                    "8 X 5 Weekdays (office hours support)" ||
                  this.state.enterpriseserviceSupport ==
                    "16 X 5 After office hours support"
                    ? [this.state.enterpriseserviceSupport, "Customize"]
                    : [this.state.enterpriseserviceSupport],
                supportWindow: this.state.enterpriseSupportWindow,
                newSelectedModelPrice: this.state.enterpriseSelectedModelPrice,
                paymentTerms: this.state.enterprisePaymentTerms,
                isTollFreeNumber: this.state.enterpriseIsTollFreeNumber,
                serviceInitializationDate:
                  this.state.enterpriseInitialisationDate,
                contractDuration: this.state.enterpriseContractDuration,
                currencyCode: this.state.currencyCode,
              },
              {
                plan: "Premium",
                token: this.state.tokenPremium,
                model: this.state.premiumModel,
                ticket: this.state.premiumticketVol,
                userEnteredSeatCount: this.state.premiumSeatCount,
                recommendSeat: this.state.premiumRecommendedseater,
                serviceSupport:
                  this.state.premiumserviceSupport ==
                    "8 X 5 Weekdays (office hours support)" ||
                  this.state.premiumserviceSupport ==
                    "16 X 5 After office hours support"
                    ? [this.state.premiumserviceSupport, "Customize"]
                    : [this.state.premiumserviceSupport],
                supportWindow: this.state.premiumSupportWindow,
                newSelectedModelPrice: this.state.premiumSelectedModelPrice,
                paymentTerms: this.state.premiumPaymentTerms,
                isTollFreeNumber: this.state.premiumIsTollFreeNumber,
                 serviceInitializationDate: this.state.premiumInitialisationDate,
                contractDuration: this.state.premiumContractDuration,
                currencyCode: this.state.currencyCode,
              },
            ];
          } else {
            Swal.fire({
              title: "",
              text: "Please fill all the required fields.",
              icon: "warning",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OK",
            });
          }
        } else if (
          this.state.checked1 &&
          this.state.checked2 &&
          this.state.checked3
        ) {
          if (
            liteModel &&
            liteticketVol >= 50 &&
            liteserviceSupport &&
            ((liteModel === "Dedicated" &&
              this.state.liteSeatCount &&
              this.state.liteRecommendedseater &&
              this.state.liteSeatCount >= this.state.liteRecommendedseater) ||
              liteModel !== "Dedicated") &&
            this.state.enterpriseModel &&
            this.state.enterpriseticketVol >= 50 &&
            this.state.enterpriseserviceSupport &&
            ((this.state.enterpriseModel === "Dedicated" &&
              this.state.enterpriseSeatCount &&
              this.state.enterpriseRecommendedseater &&
              this.state.enterpriseSeatCount >=
                this.state.enterpriseRecommendedseater) ||
              this.state.enterpriseModel !== "Dedicated") &&
            this.state.premiumModel &&
            this.state.premiumticketVol >= 50 &&
            this.state.premiumserviceSupport &&
            ((this.state.premiumModel === "Dedicated" &&
              this.state.premiumSeatCount &&
              this.state.premiumRecommendedseater &&
              this.state.premiumSeatCount >=
                this.state.premiumRecommendedseater) ||
              this.state.premiumModel !== "Dedicated")
          ) {
            this.state.plansList = [
              {
                plan: "Lite",
                token: this.state.tokenLite,
                model: this.state.liteModel,
                ticket: this.state.liteticketVol,
                userEnteredSeatCount: this.state.liteSeatCount,
                recommendSeat: this.state.liteRecommendedseater,
                serviceSupport:
                  liteserviceSupport ==
                    "8 X 5 Weekdays (office hours support)" ||
                  liteserviceSupport == "16 X 5 After office hours support"
                    ? [liteserviceSupport, "Customize"]
                    : [liteserviceSupport],
                supportWindow: liteSupportWindow,
                newSelectedModelPrice: this.state.liteSelectedModelPrice,
                paymentTerms: this.state.litePaymentTerms,
                isTollFreeNumber: this.state.liteIsTollFreeNumber,
                serviceInitializationDate: this.state.liteInitialisationDate,
                contractDuration: this.state.liteContractDuration,
                currencyCode: this.state.currencyCode,
              },
              {
                plan: "Enterprise",
                token: this.state.tokenEnterprise,
                token: this.state.tokenPremium,
                model: this.state.enterpriseModel,
                ticket: this.state.enterpriseticketVol,
                userEnteredSeatCount: this.state.enterpriseSeatCount,
                recommendSeat: this.state.enterpriseRecommendedseater,
                serviceSupport:
                  this.state.enterpriseserviceSupport ==
                    "8 X 5 Weekdays (office hours support)" ||
                  this.state.enterpriseserviceSupport ==
                    "16 X 5 After office hours support"
                    ? [this.state.enterpriseserviceSupport, "Customize"]
                    : [this.state.enterpriseserviceSupport],
                supportWindow: this.state.enterpriseSupportWindow,
                newSelectedModelPrice: this.state.enterpriseSelectedModelPrice,
                paymentTerms: this.state.enterprisePaymentTerms,
                isTollFreeNumber: this.state.enterpriseIsTollFreeNumber,
                serviceInitializationDate:
                  this.state.enterpriseInitialisationDate,
                contractDuration: this.state.enterpriseContractDuration,
                currencyCode: this.state.currencyCode,
              },
              {
                plan: "Premium",
                token: this.state.tokenPremium,
                model: this.state.premiumModel,
                ticket: this.state.premiumticketVol,
                userEnteredSeatCount: this.state.premiumSeatCount,
                recommendSeat: this.state.premiumRecommendedseater,
                serviceSupport:
                  this.state.premiumserviceSupport ==
                    "8 X 5 Weekdays (office hours support)" ||
                  this.state.premiumserviceSupport ==
                    "16 X 5 After office hours support"
                    ? [this.state.premiumserviceSupport, "Customize"]
                    : [this.state.premiumserviceSupport],
                supportWindow: this.state.premiumSupportWindow,
                newSelectedModelPrice: this.state.premiumSelectedModelPrice,
                paymentTerms: this.state.premiumPaymentTerms,
                isTollFreeNumber: this.state.premiumIsTollFreeNumber,
                serviceInitializationDate: this.state.premiumInitialisationDate,
                contractDuration: this.state.premiumContractDuration,
                currencyCode: this.state.currencyCode,
              },
            ];
          } else {
            Swal.fire({
              title: "",
              text: "Please fill all the required fields.",
              icon: "warning",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OK",
            });
          }
        }
      } else {
        Swal.fire({
          title: "",
          text: "Atleast select one plan",
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
        text: "Please fill all the required fields.",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
    console.log("\n\n\n\n" + JSON.stringify(this.state.plansList));
    /* this.props.claculatePrice(
      {
        "email":window.sessionStorage.getItem(Constants.ACCESS_EMAIL),
        "upgradeRequestList":this.state.plansList,
        // "isTollFreeNumber":TollFreeNumber,
        // "contractDuration":ContractDuration,
        // "payment":PaymentTerms,
        // "serviceInitializationDate":startDate,
      }
    )*/
    if (this.state.plansList.length > 0) {
      this.props.checkStatus({
        email: window.sessionStorage.getItem(Constants.ACCESS_EMAIL),
        upgradeRequestList: this.state.plansList,
      });
    }

    console.log(window.sessionStorage.getItem(Constants.ACCESS_EMAIL));
    const modifiedDetails = {
      email: window.sessionStorage.getItem(Constants.ACCESS_EMAIL),
      upgradeRequestList: this.state.plansList,
      isOrderSummary: false,
    };
    this.setState({
      upAndDownPageData: { plansList: this.state.plansList },
    });
    localStorage.setItem("modifiedDetails", JSON.stringify(modifiedDetails));
    this.props.dataCustomizePage1({
      plansList: this.state.plansList,
      isTollFreeNumber: TollFreeNumber,
      contractDuration: ContractDuration,
      payment: PaymentTerms,
      serviceInitializationDate: startDate,
    });
  };

  update =()=>{
    const modifiedDetails = {
      email: window.sessionStorage.getItem(Constants.ACCESS_EMAIL),
      upgradeRequestList: this.state.plansList,
      isOrderSummary: false,
    };
    localStorage.setItem("modifiedDetails", JSON.stringify(modifiedDetails));

  }

  handleSubmit(e) {
    e.preventDefault();
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

  liteRadioButton = (value) => {
    console.log("value" + value);
    this.setState({
      liteIsTollFreeNumber: value,
    });
  };

  enterpriseRadioButton = (value) => {
    console.log("value" + value);
    this.setState({
      enterpriseIsTollFreeNumber: value,
    });
  };

  premiumRadioButton = (value) => {
    console.log("value" + value);
    this.setState({
      premiumIsTollFreeNumber: value,
    });
  };

  DedicatedCustomiceModel = () => {
    this.setState({
      showDedicatedCustomice: false,
      planDedicatedCustomice: "",
      yourName: "",
      workMail: "",
      yourSubject: "",
      message: "",
    });
  };

  sendMail = () => {
    // e.preventDefault();

    this.setState({ sendMail: true });
    // {this.state.planDedicatedCustomice=="Lite"?this.switch1();:null}

    if (
      this.state.yourName &&
      this.state.workMail &&
      this.state.yourSubject &&
      this.state.message &&
      !this.state.emailError &&
      !this.state.subjectError
    ) {
      console.log("testing");

      this.props.requestContactUs({
        contactFlag: "true",
        name: this.state.yourName,
        email: this.state.workMail,
        subject: this.state.yourSubject,
        message: this.state.message,
      });
      this.setState({
        isLoading: true,
      });

      //
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
        yourNameError: "Please enter the valid name",
      });
    } else {
      this.setState({
        yourNameError: "",
      });
    }
  };

  changeSubject = (event) => {
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

  handleCloseLite = () => {
    this.setState({
    //  liteSupportWindow: [],
      liteModels: "",
      // daysLite: [
      //   { label: "Monday", value: "Monday" },
      //   { label: "Tuesday", value: "Tuesday" },
      //   { label: "Wednesday", value: "Wednesday" },
      //   { label: "Thursday", value: "Thursday" },
      //   { label: "Friday", value: "Friday" },
      //   { label: "Saturday", value: "Saturday" },
      //   { label: "Sunday", value: "Sunday" },
      // ],
      // dataLite: [],
      // startTime: "",
      // endTime: "",
      // selectDate: [],
      // liteserviceSupport: "",
    });
  };

  handleCloseEnterprise = () => {
    this.setState({
      enterpriseserviceSupport: "",
      enterpriseModels: "",
      days: [
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
        { label: "Sunday", value: "Sunday" },
      ],
      dataEnterprise: [],
      startTime: "",
      endTime: "",
      selectDate: [],
      enterpriseSupportWindow: [],
    });
  };

  handleClosepremium = () => {
    this.setState({
      premiumserviceSupport: "",
      premiumModels: "",
      days: [
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
        { label: "Sunday", value: "Sunday" },
      ],
      dataPremium: [],
      startTime: "",
      endTime: "",
      selectDate: [],
      premiumSupportWindow: [],
    });
  };

  handleCloseCheckStatus = () => {
    console.log("testing");
    this.setState({
      showCheckStatus: false,
    });
  };

  switch1 = (e) => {
    console.log(e);
    if (
      this.state.checked1 === true &&
      this.state.checked2 === false &&
      this.state.checked3 === false &&
      this.state.plansList !== []
    ) {
      this.setState({
        plansList: [],
      });
    }
    if (this.state.checked1 === false) {
      const date = this.state.date.split("/");
      console.log(JSON.stringify(date));
      this.setState({
        // liteInitialisationDate: date[0] + "-" + date[1] + "-" + date[2],
      });
    } else {
      for (
        var i = 0;
        i < this.props.detailslist.planActiveCustomizationRequests.length;
        i++
      ) {
        if (
          this.props.detailslist.planActiveCustomizationRequests[i].plan ==
          "Lite"
        ) {
          this.setState({
            // liteInitialisationDate:
            //   this.props.detailslist.planActiveCustomizationRequests[i]
            //     .initialisationDate,
          });
        }
      }
    }

    if (e === true) {
      this.setState({
        checked1: !this.state.checked1,
        liteModel: this.state.liteModel,
        liteticketVol: this.state.liteticketVol,
        liteSupportWindow: [],
        liteRecommendedModel: "",
        liteRecommendedseater: "",
        liteRecommendedPrice: "",
        liteSelectedModelPrice: "",
        liteserviceSupport: "",
        liteSeatCount: "",
        liteClick: false,
      });
    } else {
      this.setState({
        checked1: !this.state.checked1,
        liteModel: "",
        liteticketVol: "",
        liteSupportWindow: [],
        liteRecommendedModel: "",
        liteRecommendedseater: "",
        liteRecommendedPrice: "",
        liteSelectedModelPrice: "",
        liteserviceSupport: "",
        liteSeatCount: "",
        liteClick: false,
      });
    }
    for (
      var i = 0;
      i < this.props.detailslist.planActiveCustomizationRequests.length;
      i++
    ) {
      if (
        this.props.detailslist.planActiveCustomizationRequests[i].plan == "Lite"
      ) {
        this.setState({
          liteticketVol:
            this.props.detailslist.planActiveCustomizationRequests[i].ticket,
          liteserviceSupport:
            this.props.detailslist.planActiveCustomizationRequests[i]
              .serviceSupport,
          liteSelectedModelPrice:
            this.props.detailslist.planActiveCustomizationRequests[i]
              .selectModelPrice,
          tokenLite:
            this.props.detailslist.planActiveCustomizationRequests[i].token,
          liteModel:
            this.props.detailslist.planActiveCustomizationRequests[i].model,
          litePaymentTerms:
            this.props.detailslist.planActiveCustomizationRequests[i]
              .paymentTerms,
          liteContractDuration:
            this.props.detailslist.planActiveCustomizationRequests[i]
              .contractDuration,
          liteIsTollFreeNumber:
            this.props.detailslist.planActiveCustomizationRequests[i]
              .isTollFreeNumber,
          liteSupportWindow:
            this.props.detailslist.planActiveCustomizationRequests[i]
              .supportWindows,
          // liteInitialisationDate: this.props.detailslist.planActiveCustomizationRequests[i].initialisationDate,
        });
        if (
          this.props.detailslist.planActiveCustomizationRequests[i].model ==
          "Dedicated"
        ) {
          this.setState({
            liteSeatCount:
              this.props.detailslist.planActiveCustomizationRequests[i]
                .enteredSeatCount,
            // liteRecommendedseater:this.props.detailslist.planActiveCustomizationRequests[i].enteredSeatCount,
          });
        }
        if (
          this.props.detailslist.planActiveCustomizationRequests[i].serviceSupport ==
          "16 X 5 After office hours support" ||           this.props.detailslist.planActiveCustomizationRequests[i].serviceSupport ==
          "8 X 5 Weekdays (office hours support)"
        ) {
          this.liteTimeZone({"label":this.props.detailslist.planActiveCustomizationRequests[i].supportWindows[0].timeZone,
                              "value":this.props.detailslist.planActiveCustomizationRequests[i].supportWindows[0].timeZone});

          this.setState({
            liteTimezone: this.props.detailslist.planActiveCustomizationRequests[i].supportWindows[0].timeZone,
            liteStartTime: this.props.detailslist.planActiveCustomizationRequests[i].supportWindows[0].startTime,
            liteEndTime:this.props.detailslist.planActiveCustomizationRequests[i].supportWindows[0].endTime,
            litetimehite:true,
          });
        }
      }
    }
  };

  switch2 = (e) => {

    if (
      (this.state.checked1 === false) & (this.state.checked2 === true) &&
      this.state.checked3 === false &&
      this.state.plansList !== []
    ) {
      this.setState({
        plansList: [],
      });
    }
    if (this.state.checked2 === false) {
      const date = this.state.date.split("/");
      console.log(JSON.stringify(date));
      this.setState({
       // enterpriseInitialisationDate: date[0] + "-" + date[1] + "-" + date[2],
      });
    } else {
      for (
        var i = 0;
        i < this.props.detailslist.planActiveCustomizationRequests.length;
        i++
      ) {
        if (
          this.props.detailslist.planActiveCustomizationRequests[i].plan ==
          "Enterprise"
        ) {
          this.setState({
            // enterpriseInitialisationDate:
            //   this.props.detailslist.planActiveCustomizationRequests[i]
            //     .initialisationDate,
          });
        }
      }
    }

    if (e === true) {
      console.log("testing");
      this.setState({
        checked2: !this.state.checked2,
        enterpriseModel: this.state.enterpriseModel,
        enterpriseticketVol: this.state.enterpriseticketVol,
        enterpriseSupportWindow: [],
        enterpriseRecommendedModel: "",
        enterpriseRecommendedseater: "",
        enterpriseRecommendedPrice: "",
        enterpriseSelectedModelPrice: "",
        enterpriseserviceSupport: "",
        enterpriseSeatCount: "",
        enterpriseClick: false,
      });
    } else {

      this.setState({
        checked2: !this.state.checked2,
        enterpriseModel: "",
        enterpriseticketVol: "",
        enterpriseSupportWindow: "",
        enterpriseRecommendedModel: "",
        enterpriseRecommendedseater: "",
        enterpriseRecommendedPrice: "",
        enterpriseSelectedModelPrice: "",
        enterpriseserviceSupport: "",
        enterpriseSeatCount: "",
        enterpriseClick: false,
      });
      for (
        var i = 0;
        i < this.props.detailslist.planActiveCustomizationRequests.length;
        i++
      ) {
        if (
          this.props.detailslist.planActiveCustomizationRequests[i].plan ==
          "Enterprise"
        ) {
          this.setState({
            enterpriseticketVol:
              this.props.detailslist.planActiveCustomizationRequests[i].ticket,
            enterpriseserviceSupport:
              this.props.detailslist.planActiveCustomizationRequests[i]
                .serviceSupport,
            enterpriseSelectedModelPrice:
              this.props.detailslist.planActiveCustomizationRequests[i]
                .selectModelPrice,
            tokenEnterprise:
              this.props.detailslist.planActiveCustomizationRequests[i].token,
            enterpriseModel:
              this.props.detailslist.planActiveCustomizationRequests[i].model,
            enterprisePaymentTerms:
              this.props.detailslist.planActiveCustomizationRequests[i]
                .paymentTerms,
                enterprisePaymentTerm:
                this.props.detailslist.planActiveCustomizationRequests[i]
                  .paymentTerms,
            enterpriseContractDuration:
              this.props.detailslist.planActiveCustomizationRequests[i]
                .contractDuration,
            enterpriseIsTollFreeNumber:
              this.props.detailslist.planActiveCustomizationRequests[i]
                .isTollFreeNumber,
            enterpriseSupportWindow:
              this.props.detailslist.planActiveCustomizationRequests[i]
                .supportWindows,
            //enterpriseInitialisationDate: this.props.detailslist.planActiveCustomizationRequests[i].initialisationDate,
          });
console.log("enterpriseSupportWindow"+ JSON.stringify( this.props.detailslist.planActiveCustomizationRequests[i]
  .supportWindows));
          if (
            this.props.detailslist.planActiveCustomizationRequests[i].model =="Dedicated" ) {
            this.setState({
              enterpriseSeatCount:
                this.props.detailslist.planActiveCustomizationRequests[i]
                  .enteredSeatCount,
              //enterpriseRecommendedseater:this.props.detailslist.planActiveCustomizationRequests[i].enteredSeatCount,
            });
          }
          if (
            this.props.detailslist.planActiveCustomizationRequests[i].serviceSupport ==
            "16 X 5 After office hours support" ||
            this.props.detailslist.planActiveCustomizationRequests[i].serviceSupport ==
            "8 X 5 Weekdays (office hours support)"



          ) {
            this.enterpriseTimeZone({"label":this.props.detailslist.planActiveCustomizationRequests[i].supportWindows[0].timeZone,
                                "value":this.props.detailslist.planActiveCustomizationRequests[i].supportWindows[0].timeZone});

            this.setState({
              enterpriseTimezone: this.props.detailslist.planActiveCustomizationRequests[i].supportWindows[0].timeZone,
              enterpriseStartTime: this.props.detailslist.planActiveCustomizationRequests[i].supportWindows[0].startTime,
              enterpriseEndTime:this.props.detailslist.planActiveCustomizationRequests[i].supportWindows[0].endTime,
              enterprisetimehite:true,
            });
          }
        }
      }
    }
  };
  switch3 = (e) => {
    if (this.state.checked3 === false) {
      const date = this.state.date.split("/");
      console.log(JSON.stringify(date));
      this.setState({
   //     premiumInitialisationDate: date[0] + "-" + date[1] + "-" + date[2],
      });
    } else {
      for (
        var i = 0;
        i < this.props.detailslist.planActiveCustomizationRequests.length;
        i++
      ) {
        if (
          this.props.detailslist.planActiveCustomizationRequests[i].plan ==
          "Premium"
        ) {
          this.setState({
            // premiumInitialisationDate:
            //   this.props.detailslist.planActiveCustomizationRequests[i]
            //     .initialisationDate,
          });
        }
      }
    }

    if (
      this.state.checked1 === false &&
      this.state.checked2 === false &&
      this.state.checked3 === true &&
      this.state.plansList !== []
    ) {
      this.setState({
        plansList: [],
      });
    }
    if (e === true) {
      console.log("testing");
      this.setState({
        checked3: !this.state.checked3,
        premiumModel: this.state.premiumModel,
        premiumticketVol: this.state.premiumticketVol,
        premiumSupportWindow: this.state.supportWindow,
        premiumRecommendedModel: this.state.recommendModel,
        premiumRecommendedseater: "",
        premiumRecommendedPrice: "",
        premiumSelectedModelPrice: "",
        premiumserviceSupport: "",
        premiumSeatCount: "",
        premiumClick: false,
      });
    } else {
      this.setState({
        checked3: !this.state.checked3,
        premiumModel: "",
        premiumticketVol: "",
        premiumSupportWindow: [],
        premiumRecommendedModel: "",
        premiumRecommendedseater: "",
        premiumRecommendedPrice: "",
        premiumSelectedModelPrice: "",
        premiumserviceSupport: "",
        premiumSeatCount: "",
        premiumClick: false,
      });

      for (
        var i = 0;
        i < this.props.detailslist.planActiveCustomizationRequests.length;
        i++
      ) {
        if (
          this.props.detailslist.planActiveCustomizationRequests[i].plan ==
          "Premium"
        ) {
          console.log(
            this.props.detailslist.planActiveCustomizationRequests[i]
              .isTollFreeNumber
          );
          this.setState({
            premiumticketVol:
              this.props.detailslist.planActiveCustomizationRequests[i].ticket,
            premiumserviceSupport:
              this.props.detailslist.planActiveCustomizationRequests[i]
                .serviceSupport,
            premiumSelectedModelPrice:
              this.props.detailslist.planActiveCustomizationRequests[i]
                .selectModelPrice,
            tokenPremium:
              this.props.detailslist.planActiveCustomizationRequests[i].token,
            premiumModel:
              this.props.detailslist.planActiveCustomizationRequests[i].model,
            premiumPaymentTerms:
              this.props.detailslist.planActiveCustomizationRequests[i]
                .paymentTerms,
                premiumPaymentTerm:
                this.props.detailslist.planActiveCustomizationRequests[i]
                  .paymentTerms,
            premiumContractDuration:
              this.props.detailslist.planActiveCustomizationRequests[i]
                .contractDuration,
            premiumIsTollFreeNumber:
              this.props.detailslist.planActiveCustomizationRequests[i]
                .isTollFreeNumber,
            premiumSupportWindow:
              this.props.detailslist.planActiveCustomizationRequests[i]
                .supportWindows,
            // premiumInitialisationDate: this.props.detailslist.planActiveCustomizationRequests[i].initialisationDate,
          });
          if (
            this.props.detailslist.planActiveCustomizationRequests[i].model ==
            "Dedicated"
          ) {
            this.setState({
              premiumSeatCount:
                this.props.detailslist.planActiveCustomizationRequests[i]
                  .enteredSeatCount,
              // premiumRecommendedseater:this.props.detailslist.planActiveCustomizationRequests[i].enteredSeatCount,
            });
          }
        }
      }
    }
  };
  clicked = () => {

    // this.setState({
    //   isReadyToRedirect:true,
    // })
    this.props.history.push("/modifiedplanDetails");
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

    this.props.requestloaddetails();

    this.setState({ showassignModal: true, showconfirmModal: true });
    this.props.requestloadtimezone();
    console.log("updated not null detials ......................");
    console.log(
      "componentDidMount----window.sessionStorage.getItem(Constants.ACCESS_EMAIL)------>" +
        window.sessionStorage.getItem(Constants.ACCESS_EMAIL)
    );
    console.log("email  ...................." + this.state.email);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {


    if (this.props.isSuccess !== prevProps.isSuccess) {

      if (this.props.isSuccess.success === true) {
        Swal.fire({
          title: "",
          text: "Your request has been submitted, We will get back to you soon!",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });

        if (this.state.planDedicatedCustomice == "Lite") {
          this.switch1();
        } else if (this.state.planDedicatedCustomice == "Enterprise") {
          this.switch2();
        } else if (this.state.planDedicatedCustomice == "Premium") {
          this.switch3();
        }

        this.setState({
          showDedicatedCustomice: false,
          planDedicatedCustomice: "",
          yourName: "",
          workMail: "",
          yourSubject: "",
          message: "",
        });
      } else if (this.props.isSuccess.success === false) {
        Swal.fire({
          title: "",
          text: "Technical issues, Please try again",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }

      this.setState({
        showDedicatedCustomice: false,
        planDedicatedCustomice: "",
      });
    }

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

    console.log(this.state.enterpriseModel);
    if (this.props.detailslist !== prevProps.detailslist) {
      console.log("done");
      if (this.props.detailslist.success == true) {
        if (this.props.detailslist.planActiveCustomizationRequests) {
          this.setState({
            currencyCode: this.props.detailslist.currencyCode,
          });
          for (
            var i = 0;
            i < this.props.detailslist.planActiveCustomizationRequests.length;
            i++
          ) {
            if (
              this.props.detailslist.planActiveCustomizationRequests[i].plan ==
              "Lite"
            ) {
              this.setState({
                liteticketVol:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .ticket,
                liteserviceSupport:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .serviceSupport,
                liteSelectedModelPrice:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .selectModelPrice,
                tokenLite:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .token,
                liteModel:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .model,
                litePaymentTerms:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .paymentTerms,
                    litePaymentTerm:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .paymentTerms,
                liteContractDuration:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .contractDuration,
                liteIsTollFreeNumber:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .isTollFreeNumber,
                liteSupportWindow:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .supportWindows,
                liteInitialisationDate:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .initialisationDate,
              });
              if (
                this.props.detailslist.planActiveCustomizationRequests[i]
                  .model == "Dedicated"
              ) {
                this.setState({
                  liteSeatCount:
                    this.props.detailslist.planActiveCustomizationRequests[i]
                      .enteredSeatCount,
                  // liteRecommendedseater:this.props.detailslist.planActiveCustomizationRequests[i].enteredSeatCount,
                });
              }
              if (
                this.props.detailslist.planActiveCustomizationRequests[i].serviceSupport == "Customize"
              ) {
                this.setState({
                  dataLite: this.props.detailslist.planActiveCustomizationRequests[i].supportWindows
                });
              }

            } else if (
              this.props.detailslist.planActiveCustomizationRequests[i].plan ==
              "Enterprise"
            ) {
              this.setState({
                enterpriseticketVol:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .ticket,
                enterpriseserviceSupport:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .serviceSupport,
                enterpriseSelectedModelPrice:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .selectModelPrice,
                tokenEnterprise:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .token,
                enterpriseModel:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .model,
                enterprisePaymentTerms:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .paymentTerms,
                enterpriseContractDuration:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .contractDuration,
                enterpriseIsTollFreeNumber:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .isTollFreeNumber,
                enterpriseSupportWindow:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .supportWindows,
                enterpriseInitialisationDate:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .initialisationDate,
              });
              if (
                this.props.detailslist.planActiveCustomizationRequests[i]
                  .model == "Dedicated"
              ) {
                this.setState({
                  enterpriseSeatCount:
                    this.props.detailslist.planActiveCustomizationRequests[i]
                      .enteredSeatCount,
                  //enterpriseRecommendedseater:this.props.detailslist.planActiveCustomizationRequests[i].enteredSeatCount,
                });
              }
              if (
                this.props.detailslist.planActiveCustomizationRequests[i].serviceSupport == "Customize"
              ) {
                this.setState({
                  dataEnterprise: this.props.detailslist.planActiveCustomizationRequests[i].supportWindows
                });
              }
            } else if (
              this.props.detailslist.planActiveCustomizationRequests[i].plan ==
              "Premium"
            ) {
              this.setState({
                premiumticketVol:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .ticket,
                premiumserviceSupport:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .serviceSupport,
                premiumSelectedModelPrice:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .selectModelPrice,
                tokenPremium:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .token,
                premiumModel:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .model,
                premiumPaymentTerms:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .paymentTerms,
                premiumContractDuration:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .contractDuration,
                premiumIsTollFreeNumber:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .isTollFreeNumber,
                premiumSupportWindow:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .supportWindows,
                premiumInitialisationDate:
                  this.props.detailslist.planActiveCustomizationRequests[i]
                    .initialisationDate,
              });
              if (
                this.props.detailslist.planActiveCustomizationRequests[i]
                  .model == "Dedicated"
              ) {
                this.setState({
                  premiumSeatCount:
                    this.props.detailslist.planActiveCustomizationRequests[i]
                      .enteredSeatCount,
                  // premiumRecommendedseater:this.props.detailslist.planActiveCustomizationRequests[i].enteredSeatCount,
                });
              }     if (
                this.props.detailslist.planActiveCustomizationRequests[i]
                  .serviceSupport == "Customize"
              ) {

                this.setState({
                  dataPremium: this.props.detailslist.planActiveCustomizationRequests[i].supportWindows
                });
              }
            }
          }
          this.setState({
            // liteticketVol:this.props.detailslist.planActiveCustomizationRequests[2].ticket,
            // liteserviceSupport: this.props.detailslist.planActiveCustomizationRequests[2].serviceSupport,
            // liteSelectedModelPrice: this.props.detailslist.planActiveCustomizationRequests[2].selectModelPrice,
            // enterpriseticketVol:this.props.detailslist.planActiveCustomizationRequests[1].ticket,
            // enterpriseserviceSupport: this.props.detailslist.planActiveCustomizationRequests[1].serviceSupport,
            // enterpriseSelectedModelPrice: this.props.detailslist.planActiveCustomizationRequests[1].selectModelPrice,
            //  premiumticketVol:this.props.detailslist.planActiveCustomizationRequests[0].ticket,
            //  premiumserviceSupport: this.props.detailslist.planActiveCustomizationRequests[0].serviceSupport,
            //  premiumSelectedModelPrice: this.props.detailslist.planActiveCustomizationRequests[0].selectModelPrice,
            TollFreeNumber:
              this.props.detailslist.planActiveCustomizationRequests[0]
                .isTollFreeNumber,
            ContractDuration:
              this.props.detailslist.planActiveCustomizationRequests[0]
                .contractDuration,
            PaymentTerms:
              this.props.detailslist.planActiveCustomizationRequests[0]
                .paymentTerms,
            startDate:
              this.props.detailslist.planActiveCustomizationRequests[0]
                .initialisationDate,
            plan: this.props.detailslist.planActiveCustomizationRequests[0]
              .plan,
            //token:this.props.detailslist.planActiveCustomizationRequests[0].token,
            detailslist: this.props.detailslist,
          });
          console.log("token+++++" + this.state.token);
        }
      }
      if (this.props.detailslist.success == false) {
        Swal.fire({
          title: "Oops!!",
          text: "Currently You dont have any Active Plans, Please Choose Plan to Proceed!",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          closeOnConfirm: true,
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            window.location.href = "/customizePage";
          }
        });
      }
    }

    //console.log("this.props.liteTimeSlot.slots"+JSON.stringify(this.props.timeSlotLite))
    if (
      this.props.automatedTimeEnterprise !== prevProps.automatedTimeEnterprise
    ) {
      console.log(
        "updated not null detials ......................" +
          this.props.automatedTimeEnterprise.endTime
      );

      this.setState({
        enterpriseEndTime: this.props.automatedTimeEnterprise.endTime,
        enterprisetimehite:false,
      });
    }
    if (this.props.automatedTime !== prevProps.automatedTime) {
      console.log(
        "updated not null detials ......................" +
          this.props.automatedTime.endTime
      );

      this.setState({
        liteEndTime: this.props.automatedTime.endTime,
        litetimehite:false,
      });
    }
    if (this.props.automatedTimePremium !== prevProps.automatedTimePremium) {
      console.log(
        "updated not null detials ......................" +
          this.props.automatedTimePremium.endTime
      );

      this.setState({
        premiumEndTime: this.props.automatedTimePremium.endTime,
        premiumtimehite:false,
      });
    }

    //this.props.automatedTime;

    if (this.props.timezonelist !== prevProps.timezonelist) {
      if (this.props.timezonelist.success === true) {
        var data = this.props.timezonelist.startDate.split("-");
        var data2 = data[0] + "/" + data[1] + "/" + data[2];

        this.setState({
          date: data2.toString(),
        });
      } else if (this.props.timezonelist.success === false) {
        Swal.fire({
          title: "",
          text: this.props.timezonelist.message,
          type: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          closeOnConfirm: true,
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
          }
        });
      }
    }

    if (this.props.timeSlotLite !== prevProps.timeSlotLite) {
      if (this.props.timeSlotLite.success === true) {
        console.log(JSON.stringify(this.props.timeSlotLite));
        if(this.state.litetimehite === true){
          this.handleSelectChangeLiteStartTime({"label":this.state.liteStartTime,"value":this.state.liteStartTime})
        }else if(this.state.enterprisetimehite === true){
          this.handleSelectChangeEnterpriseStartTime({"label":this.state.enterpriseStartTime,"value":this.state.enterpriseStartTime})
        }else if(this.state.premiumtimehite === true){
          this.handleSelectChangePremiumStartTime({"label":this.state.premiumStartTime,"value":this.state.premiumStartTime})
        }

      } else if (this.props.timeSlotLite.success === false) {
        Swal.fire({
          title: "",
          text: this.props.timeSlotLite.message,
          type: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          closeOnConfirm: true,
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
          }
        });
      }
    }


    if (this.props.liteRecommended !== prevProps.liteRecommended) {
      if (this.props.liteRecommended.success == true) {
        if (this.props.liteRecommended.modelList[0].recommendSeat) {
          this.setState({
            liteRecommendedPrice:
              this.props.liteRecommended.modelList[0].recommendPrice,
            liteRecommendedModel:
              this.props.liteRecommended.modelList[0].recommendModel,
            liteRecommendedseater:
              this.props.liteRecommended.modelList[0].recommendSeat,
            liteSelectedModelPrice:
              this.props.liteRecommended.modelList[0].selectedModelPrice,
          });
          if (!this.state.liteSeatCount) {
            this.setState({
              liteSeatCount:
                this.props.liteRecommended.modelList[0].recommendSeat,
            });
          } else if (!!this.state.liteSeatCount) {
            this.setState({
              liteSeatCount:
                this.props.liteRecommended.modelList[0].userEnteredSeatCount,
            });
          }

             if(this.state.liteserviceSupport =="8 X 5 Weekdays (office hours support)"
              && !this.state.liteSeatCount){

            this.setState({
              liteSeatCount: this.props.liteRecommended.modelList[0].recommendSeat,
             })
           }else if(!!this.state.liteSeatCount &&
             this.state.liteserviceSupport =="8 X 5 Weekdays (office hours support)"){
            console.log("test2");

           this.setState({
            liteSeatCount: this.props.liteRecommended.modelList[0].userEnteredSeatCount,
           })

            }

          if (
            this.state.liteserviceSupport == "16 X 5 After office hours support"&& !this.state.liteSeatCount
          ) {
            this.setState({
              liteSeatCount:
                this.props.liteRecommended.modelList[0].recommendSeat,
            });
          } else if (!!this.state.liteSeatCount&&this.state.liteserviceSupport == "16 X 5 After office hours support") {

            this.setState({
              liteSeatCount:
                this.props.liteRecommended.modelList[0].userEnteredSeatCount,
            });
          } else if (!this.state.liteSeatCount) {
            this.setState({
              liteSeatCount:
                this.props.liteRecommended.modelList[0].recommendSeat, //-------
            });
          }

          console.log("1");
          if (this.state.liteClick == true) {
            console.log("2");
            this.setState({
              liteModel: this.props.liteRecommended.modelList[0].recommendModel,
              liteSeatCount:
                this.props.liteRecommended.modelList[0].recommendSeat,
            });
          }
        } else {
          this.setState({
            liteRecommendedPrice:
              this.props.liteRecommended.modelList[0].recommendPrice,
            liteRecommendedModel:
              this.props.liteRecommended.modelList[0].recommendModel,
            liteSelectedModelPrice:
              this.props.liteRecommended.modelList[0].selectedModelPrice,
            liteRecommendedseater:
              this.props.liteRecommended.modelList[0].recommendSeat,
          });
          console.log("3");
          if (this.state.liteClick == true) {
            console.log(
              "4\n" + this.props.liteRecommended.modelList[0].recommendModel
            );
            this.setState({
              liteModel: this.props.liteRecommended.modelList[0].recommendModel,
            });
          }
        }

        //  console.log(this.props.liteRecommended.modelList[0]);
        // console.log(JSON.stringify(this.props.liteRecommended.modelList[0].recommendPrice) +"\n"+this.props.liteRecommended.modelList[0].recommendModel  );
      } else if (this.props.liteRecommended.success == false) {
        Swal.fire({
          title: "",
          text: this.props.liteRecommended.message,
          type: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          closeOnConfirm: true,
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            this.setState({
              liteserviceSupport: "",
              liteSupportWindow: [],
            });
          }
        });
        this.state.liteserviceSupport = [];
        //  this.setState({
        //   //liteModels:this.state.liteserviceSupport,
        //   liteserviceSupport:[],
        // })
      }
    }

    if (
      this.state.liteRecommendedModel == "" &&
      this.state.liteRecommendedPrice == ""
    ) {
      if (
        this.state.liteModel &&
        this.state.liteticketVol &&
        this.state.liteserviceSupport
      ) {
        if (
          this.state.liteserviceSupport == "Weekend Support (48hours)" ||
          this.state.liteserviceSupport == "24x7"
        ) {
          this.props.liteClaculatePrice({
            plansList: [
              {
                plan: "Lite",
                commericialModel: this.state.liteModel,
                ticket: this.state.liteticketVol,
                userEnteredSeatCount: this.state.liteSeatCount,
                recommendSeat: this.state.liteRecommendedseater,
                serviceSupport: [this.state.liteserviceSupport],
                supportWindow: this.state.liteSupportWindow,
              },
            ],
          });
        } else if (

          this.state.liteserviceSupport ==
            "8 X 5 Weekdays (office hours support)" ||
          this.state.liteserviceSupport == "16 X 5 After office hours support"
        ) {
         //  if (!!this.state.liteSupportWindow[0]) {
            this.props.liteClaculatePrice({
              plansList: [
                {
                  plan: "Lite",
                  commericialModel: this.state.liteModel,
                  ticket: this.state.liteticketVol,
                  userEnteredSeatCount: this.state.liteSeatCount,
                  recommendSeat: this.state.liteRecommendedseater,
                  serviceSupport: [this.state.liteserviceSupport, "Customize"],
                  supportWindow: this.state.liteSupportWindow,
                },
              ],

            });

         // }
        } else if (this.state.liteserviceSupport == "Customize") {
          // if (!!this.state.liteSupportWindow[0]) {
            this.props.liteClaculatePrice({
              plansList: [
                {
                  plan: "Lite",
                  commericialModel: this.state.liteModel,
                  ticket: this.state.liteticketVol,
                  userEnteredSeatCount: this.state.liteSeatCount,
                  recommendSeat: this.state.liteRecommendedseater,
                  serviceSupport: [this.state.liteserviceSupport],
                  supportWindow: this.state.liteSupportWindow,
                },
              ],
            });
          }
        // }
        //}
      }
    }

    //----enterprise------------------enterprise------------enterprise--------enterprise-----------------

    //console.log(this.props.liteRecommended)
    if (this.props.enterpriseRecommended !== prevProps.enterpriseRecommended) {
      if (this.props.enterpriseRecommended.success == true) {
        if (this.props.enterpriseRecommended.modelList[0].recommendSeat) {
          this.setState({
            enterpriseRecommendedPrice:
              this.props.enterpriseRecommended.modelList[0].recommendPrice,
            enterpriseRecommendedModel:
              this.props.enterpriseRecommended.modelList[0].recommendModel,
            enterpriseRecommendedseater:
              this.props.enterpriseRecommended.modelList[0].recommendSeat,
            //enterpriseSeatCount: this.props.enterpriseRecommended.modelList[0].recommendSeat,
            enterpriseSelectedModelPrice:
              this.props.enterpriseRecommended.modelList[0].selectedModelPrice,
          });
          if (!this.state.enterpriseSeatCount) {
            this.setState({
              enterpriseSeatCount:
                this.props.enterpriseRecommended.modelList[0].recommendSeat,
            });
          }
          if (this.state.enterpriseClick == true) {
            this.setState({
              enterpriseModel:
                this.props.enterpriseRecommended.modelList[0].recommendModel,
              enterpriseSeatCount:
                this.props.enterpriseRecommended.modelList[0].recommendSeat,
            });
          }
        } else {
          this.setState({
            enterpriseRecommendedPrice:
              this.props.enterpriseRecommended.modelList[0].recommendPrice,
            enterpriseRecommendedModel:
              this.props.enterpriseRecommended.modelList[0].recommendModel,
            enterpriseSelectedModelPrice:
              this.props.enterpriseRecommended.modelList[0].selectedModelPrice,
          });
          if (this.state.enterpriseClick == true) {
            console.log(
              "4\n" +
                this.props.enterpriseRecommended.modelList[0].recommendModel
            );
            //document.getElementById("enterpriseSeatcount").removeAttribute("disabled");

            this.setState({
              enterpriseModel:
                this.props.enterpriseRecommended.modelList[0].recommendModel,
            });
          }
        }

        //  console.log(this.props.enterpriseRecommended.modelList[0]);
        // console.log(JSON.stringify(this.props.enterpriseRecommended.modelList[0].recommendPrice) +"\n"+this.props.enterpriseRecommended.modelList[0].recommendModel  );
      } else if (this.props.enterpriseRecommended.success == false) {
        Swal.fire({
          title: "",
          text: this.props.enterpriseRecommended.message,
          type: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          closeOnConfirm: true,
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            this.setState({
              enterpriseserviceSupport: "",
              enterpriseSupportWindow: [],
            });
          }
        });
        this.state.enterpriseserviceSupport = [];
        //   this.setState({
        //    //enterpriseModels:this.state.enterpriseserviceSupport,
        //    enterpriseserviceSupport:[],
        //  })
      }
    }

    if (
      this.state.enterpriseRecommendedModel == "" &&
      this.state.enterpriseRecommendedPrice == ""
    ) {
      console.log("enterpriseModel" + this.state.enterpriseModel + "\n");
      console.log(
        this.state.enterpriseModels +
          "\n" +
          this.state.enterpriseticketVol +
          "\n" +
          this.state.enterpriseserviceSupport
      );

      if (
        this.state.enterpriseModel &&
        this.state.enterpriseticketVol &&
        this.state.enterpriseserviceSupport
      ) {
        const {
          enterpriseModel,
          enterpriseticketVol,
          enterpriseserviceSupport,
          enterpriseSupportWindow,
          TollFreeNumber,
          ContractDuration,
          PaymentTerms,
          startDate,
        } = this.state;
        console.log("in 0");
        //  if((this.state.enterpriseModel === "Dedicated"&& this.state.enterpriseSeatCount)||(this.state.enterpriseModel !== "Dedicated")){
        if (
          this.state.enterpriseserviceSupport == "Weekend Support (48hours)" ||
          this.state.enterpriseserviceSupport == "24x7"
        ) {
          console.log("in 1");
          this.props.enterpriseClaculatePriceupgread({
            plansList: [
              {
                plan: "Enterprise",
                commericialModel: this.state.enterpriseModel,
                ticket: this.state.enterpriseticketVol,
                userEnteredSeatCount: this.state.enterpriseSeatCount,
                recommendSeat: this.state.enterpriseRecommendedseater,
                serviceSupport: [this.state.enterpriseserviceSupport],
                supportWindow: this.state.enterpriseSupportWindow,
              },
            ],
          });
        } else if (
          this.state.enterpriseserviceSupport ==
            "8 X 5 Weekdays (office hours support)" ||
          this.state.enterpriseserviceSupport ==
            "16 X 5 After office hours support"
        ) {
          console.log("in 2");
        //  if (!!this.state.enterpriseSupportWindow[0]) {
            this.props.enterpriseClaculatePriceupgread({
              plansList: [
                {
                  plan: "Enterprise",
                  commericialModel: this.state.enterpriseModel,
                  ticket: this.state.enterpriseticketVol,
                  userEnteredSeatCount: this.state.enterpriseSeatCount,
                  recommendSeat: this.state.enterpriseRecommendedseater,
                  serviceSupport: [
                    this.state.enterpriseserviceSupport,
                    "Customize",
                  ],
                  supportWindow: this.state.enterpriseSupportWindow,
                },
              ],
            });
        //  }
        } else if (this.state.enterpriseserviceSupport == "Customize") {

          // if (!!this.state.enterpriseSupportWindow[0]) {
            this.props.enterpriseClaculatePriceupgread({
              plansList: [
                {
                  plan: "Enterprise",
                  commericialModel: this.state.enterpriseModel,
                  ticket: this.state.enterpriseticketVol,
                  userEnteredSeatCount: this.state.enterpriseSeatCount,
                  recommendSeat: this.state.enterpriseRecommendedseater,
                  serviceSupport: [this.state.enterpriseserviceSupport],
                  supportWindow: this.state.enterpriseSupportWindow,
                },
              ],
            });
          }
        }
        //}
     // }
    }

    //------------------premium--------premium--------premium-------premium-------premium-------------

    if (this.props.premiumRecommended !== prevProps.premiumRecommended) {
      console.log("done");
      if (this.props.premiumRecommended.success == true) {
        console.log("done2");
        if (this.props.premiumRecommended.modelList[0].recommendSeat) {
          console.log("done3");
          this.setState({
            premiumRecommendedPrice:
              this.props.premiumRecommended.modelList[0].recommendPrice,
            premiumRecommendedModel:
              this.props.premiumRecommended.modelList[0].recommendModel,
            premiumRecommendedseater:
              this.props.premiumRecommended.modelList[0].recommendSeat,
            //premiumSeatCount: this.props.premiumRecommended.modelList[0].recommendSeat,
            premiumSelectedModelPrice:
              this.props.premiumRecommended.modelList[0].selectedModelPrice,
          });
          if (!this.state.premiumSeatCount) {
            console.log("done4");
            this.setState({
              premiumSeatCount:
                this.props.premiumRecommended.modelList[0].recommendSeat,
            });
          }
          console.log(
            this.state.premiumSeatCount <
              this.props.premiumRecommended.modelList[0].recommendSeat
          );
          console.log(
            this.state.premiumSeatCount +
              "\n" +
              this.props.premiumRecommended.modelList[0].recommendSeat
          );

          if (
            this.state.premiumSeatCount <
            this.props.premiumRecommended.modelList[0].recommendSeat
          ) {
            console.log("done5");
            console.log(
              this.state.premiumSeatCount +
                "\n" +
                this.props.premiumRecommended.modelList[0].recommendSeat
            );
            this.setState({
              premiumSeatCount:
                this.props.premiumRecommended.modelList[0].recommendSeat,
            });
          }
          console.log("1");
          if (this.state.premiumClick == true) {
            console.log("2");
            //document.getElementById("premiumSeatcount").setAttribute("disabled", true);
            this.setState({
              premiumModel:
                this.props.premiumRecommended.modelList[0].recommendModel,
              premiumSeatCount:
                this.props.premiumRecommended.modelList[0].recommendSeat,
            });
          }
        } else {
          this.setState({
            premiumRecommendedPrice:
              this.props.premiumRecommended.modelList[0].recommendPrice,
            premiumRecommendedModel:
              this.props.premiumRecommended.modelList[0].recommendModel,
            premiumSelectedModelPrice:
              this.props.premiumRecommended.modelList[0].selectedModelPrice,
          });
          console.log("3");
          if (this.state.premiumClick == true) {
            console.log(
              "4\n" + this.props.premiumRecommended.modelList[0].recommendModel
            );

            this.setState({
              premiumModel:
                this.props.premiumRecommended.modelList[0].recommendModel,
            });
          }
        }
      } else if (this.props.premiumRecommended.success == false) {
        Swal.fire({
          title: "",
          text: this.props.premiumRecommended.message,
          type: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          closeOnConfirm: true,
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            this.setState({
              premiumserviceSupport: "",
              premiumSupportWindow: [],
            });
          }
        });
        this.state.premiumserviceSupport = [];
        //   this.setState({
        //    //premiumModels:this.state.premiumserviceSupport,
        //    premiumserviceSupport:[],
        //  })
      }
    }

    if (
      this.state.premiumRecommendedModel == "" &&
      this.state.premiumRecommendedPrice == ""
    ) {
      console.log("premiumModel" + this.state.premiumModel + "\n");
      console.log(
        "------\n" +
          this.state.premiumModel +
          "\n" +
          this.state.premiumticketVol +
          "\n" +
          this.state.premiumserviceSupport
      );

      if (
        this.state.premiumModel &&
        this.state.premiumticketVol &&
        this.state.premiumserviceSupport
      ) {
        const {
          premiumModel,
          premiumticketVol,
          premiumserviceSupport,
          premiumSupportWindow,
          TollFreeNumber,
          ContractDuration,
          PaymentTerms,
          startDate,
        } = this.state;
        console.log("in 0");
        //  if((this.state.premiumModel === "Dedicated"&& this.state.premiumSeatCount)||(this.state.premiumModel !== "Dedicated")){
        if (
          this.state.premiumserviceSupport == "Weekend Support (48hours)" ||
          this.state.premiumserviceSupport == "24x7"
        ) {
          console.log("in 1");
          this.props.premiumClaculatePrice({
            plansList: [
              {
                plan: "Premium",
                commericialModel: this.state.premiumModel,
                ticket: this.state.premiumticketVol,
                userEnteredSeatCount: this.state.premiumSeatCount,
                recommendSeat: this.state.premiumRecommendedseater,
                serviceSupport: [this.state.premiumserviceSupport],
                supportWindow: this.state.premiumSupportWindow,
              },
            ],
          });
        } else if (
          this.state.premiumserviceSupport ==
            "8 X 5 Weekdays (office hours support)" ||
          this.state.premiumserviceSupport ==
            "16 X 5 After office hours support"
        ) {
          console.log("in 2");
//          if (!!this.state.premiumSupportWindow[0]) {
            this.props.premiumClaculatePrice({
              plansList: [
                {
                  plan: "Premium",
                  commericialModel: this.state.premiumModel,
                  ticket: this.state.premiumticketVol,
                  userEnteredSeatCount: this.state.premiumSeatCount,
                  recommendSeat: this.state.premiumRecommendedseater,
                  serviceSupport: [
                    this.state.premiumserviceSupport,
                    "Customize",
                  ],
                  supportWindow: this.state.premiumSupportWindow,
                },
              ],
            });
 //         }
        } else if (this.state.premiumserviceSupport == "Customize") {
          // if (!!this.state.premiumSupportWindow[0]) {
            this.props.premiumClaculatePrice({
              plansList: [
                {
                  plan: "Premium",
                  commericialModel: this.state.premiumModel,
                  ticket: this.state.premiumticketVol,
                  userEnteredSeatCount: this.state.premiumSeatCount,
                  recommendSeat: this.state.premiumRecommendedseater,
                  serviceSupport: [this.state.premiumserviceSupport],
                  supportWindow: this.state.premiumSupportWindow,
                },
              ],
            });
         // }
        }
        // }
      }
    }

    //==================checkstatus================

    if (this.props.recivedcheckStatus !== prevProps.recivedcheckStatus) {
      if (this.props.recivedcheckStatus.success === true) {
        if (this.props.recivedcheckStatus.updatePlanRequestList.length > 0) {
          if (this.state.showCheckStatus === false) {
            this.setState({
              showCheckStatus: true,
            });
            this.props.recivedcheckStatus.updatePlanRequestList.forEach(
              (element, keyId) => {

                const date = element.serviceInitializationDate.split("-");
                const data = date[1] + "-" + date[0] + "-" + date[2];
                let dates = new Date(JSON.stringify(data.toString()));
                let dayparam = dates.getDate() < 10 ? "0" + dates.getDate() : dates.getDate();
                let dayparams = dates.getDate() < 10 ? "0" + dates.getDate() : dates.getDate();
                let monthparam = dates.getMonth() < 9 ? "0" + (1 + dates.getMonth()) : 1 + dates.getMonth();
                let dateparam = dates.getFullYear() + "-" + monthparam + "-" + dayparam;

                if(element.plan ==="Lite"){
                  const planStatus = element.planStatus;
                  this.state.plansList.forEach(element => {
                    if(element.plan ==="Lite"){
                      element.serviceInitializationDate = dateparam;
                      element.planNewStatus= planStatus;
                      this.update();
                    }
                  });
                  this.setState({
                    liteInitialisationDate:dateparam,
                    liteSelectedDate: new Date(JSON.stringify(data.toString())),
                    liteMinDate:new Date(JSON.stringify(data.toString()))
                  });
                }else if(element.plan ==="Enterprise"){
                  const planStatus = element.planStatus;
                  this.state.plansList.forEach(element => {
                    console.log(JSON.stringify(element.serviceInitializationDate));
                    if(element.plan ==="Enterprise"){
                      element.serviceInitializationDate = dateparam;
                      element.planNewStatus= planStatus;
                      this.update();
                    }
                  });
                  this.setState({
                    enterpriseInitialisationDate:dateparam,
                    enterpriseSelectedDate: new Date(JSON.stringify(data.toString())),
                    enterpriseMinDate: new Date(JSON.stringify(data.toString())),
                  });

                }else if(element.plan ==="Premium"){
                  const planStatus = element.planStatus;
    this.state.plansList.forEach(element => {
      if(element.plan ==="Premium"){
        element.serviceInitializationDate = dateparam;
        element.planNewStatus= planStatus;
        this.update();
      }
    });
                  this.setState({
                    premiumInitialisationDate:dateparam,
                    premiumSelectedDate: new Date(JSON.stringify(data.toString())),
                    premiumMinDate: new Date(JSON.stringify(data.toString())),
                  });
                }
              }
            );
          }
        }
      }
    }
    //======================recommendedPrice============recommendedPrice=============recommendedPrice===========
    if (this.props.recommendedPrice !== prevProps.recommendedPrice) {
      if (this.props.recommendedPrice.success === true) {
        console.log(
          "this.props.recommendedPrice \n" +
            JSON.stringify(this.props.recommendedPrice)
        );
        window.sessionStorage.setItem(
          Constants.PLAN_DETAILS,
          JSON.stringify(this.props.recommendedPrice.modelList)
        );
        localStorage.setItem(
          "recommendedPrice",
          JSON.stringify(this.props.recommendedPrice)
        );
        console.log(
          " this.state.plansList" + JSON.stringify(this.state.plansList)
        );
        console.log(
          " this.state.plansList testing" +
            JSON.stringify(
              this.state.detailslist.planActiveCustomizationRequests
            )
        );

        var plansList = this.props.recommendedPrice.modelList.map(
          (row, rowkey) => {
            // key={rowkey}
            for (
              var i = 0;
              i < this.state.detailslist.planActiveCustomizationRequests.length;
              i++
            ) {
              if (
                this.state.detailslist.planActiveCustomizationRequests[i]
                  .plan == row.selectedPlan
              ) {
                this.state.token =
                  this.state.detailslist.planActiveCustomizationRequests[
                    i
                  ].token;
                this.state.serviceSupport =
                  this.state.detailslist.planActiveCustomizationRequests[
                    i
                  ].serviceSupport;
                this.state.supportWindow =
                  this.state.detailslist.planActiveCustomizationRequests[
                    i
                  ].supportWindow;
                this.state.startDate =
                  this.state.detailslist.planActiveCustomizationRequests[
                    i
                  ].initialisationDate;
              }
            }
            return {
              plan: row.selectedPlan,
              ticket: this.state.plansList[rowkey].ticket,
              commericialModel: row.selectedCommercialModel,
              selectedModelPrice: row.selectedModelPrice,
              paymentTerms: this.props.recommendedPrice.paymentTerms,
              token: this.state.token,
              serviceSupport: this.state.plansList[rowkey].serviceSupport,
              userEnteredSeatCount:
                this.state.plansList[rowkey].userEnteredSeatCount,
              supportWindow: this.state.supportWindow,
              initialisationDate: this.state.startDate,
            };
          }
        );
        console.log("plansList" + JSON.stringify(plansList));
        const data = {
          plansList: plansList,
          isTollFreeNumber: this.state.TollFreeNumber,
          contractDuration: this.state.ContractDuration,
          payment: this.state.PaymentTerms,
          serviceInitializationDate: this.state.startDate,
        };

        localStorage.setItem("dataCustomizePage1", JSON.stringify(data));
        this.props.history.push("/modifiedplanDetails");
        var user = JSON.parse(localStorage.getItem("recommendedPrice"));
        var dataCustomizePage1 = JSON.parse(
          localStorage.getItem("dataCustomizePage1")
        );
        console.log(
          "dataCustomizePage1 \n" + JSON.stringify(dataCustomizePage1)
        );
        console.log("data \n" + JSON.stringify(user));
      }
    }
  }

  handleChangeLiteStartDate = (date) => {
    let dayparam = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let dayparams = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let monthparam =
      date.getMonth() < 9 ? "0" + (1 + date.getMonth()) : 1 + date.getMonth();
    let dateparam = date.getFullYear() + "-" + monthparam + "-" + dayparam;
    var days = dayparam;
    this.state.d1 = date.getFullYear() + "," + monthparam + "," + days;
    console.log(this.state.d1);
    console.log(new Date(this.state.d1));
    console.log(new Date(this.state.d1).toISOString().split("T")[0]);
    this.setState({
      liteInitialisationDate: dateparam,
      liteSelectedDate: date,
    });
   console.log(JSON.stringify(this.state.plansList[0].serviceInitializationDate));
    this.state.plansList.forEach(element => {
      console.log(JSON.stringify(element.serviceInitializationDate));
      if(element.plan ==="Lite"){
        element.serviceInitializationDate = dateparam;
        this.update();
      }
    });

  };

  handleChangeEnterpriseStartDate = (date) => {
    let dayparam = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let dayparams = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let monthparam =
      date.getMonth() < 9 ? "0" + (1 + date.getMonth()) : 1 + date.getMonth();
    let dateparam = date.getFullYear() + "-" + monthparam + "-" + dayparam;
    var days = dayparam;
    this.state.d1 = date.getFullYear() + "," + monthparam + "," + days;
    console.log(this.state.d1);
    console.log(new Date(this.state.d1));
    console.log(new Date(this.state.d1).toISOString().split("T")[0]);
    this.setState({
      enterpriseInitialisationDate: dateparam,
      enterpriseSelectedDate: date,
    });

    this.state.plansList.forEach(element => {
      console.log(JSON.stringify(element.serviceInitializationDate));
      if(element.plan ==="Enterprise"){
        element.serviceInitializationDate = dateparam;
        this.update();
      }
    });

  };

  handleChangePremiumStartDate = (date) => {
    let dayparam = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let dayparams = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let monthparam = date.getMonth() < 9 ? "0" + (1 + date.getMonth()) : 1 + date.getMonth();
    let dateparam = date.getFullYear() + "-" + monthparam + "-" + dayparam;
    var days = dayparam;
    this.state.d1 = date.getFullYear() + "," + monthparam + "," + days;
    console.log(this.state.d1);
    console.log(new Date(this.state.d1));
    console.log(new Date(this.state.d1).toISOString().split("T")[0]);
    this.setState({
      premiumInitialisationDate: dateparam,
      premiumSelectedDate: date,
    });

    this.state.plansList.forEach(element => {
      console.log(JSON.stringify(element.serviceInitializationDate));
      if(element.plan ==="Premium"){
        element.serviceInitializationDate = dateparam;
        this.update();
      }
    });

  };

  selectDateLite = (event) => {
    let ddl = document.getElementById("productdd");

    console.log(ddl);
    if (event[0].label !== "No Option") {
      var v1 = [];
      var v2 = [];
      for (var i = 0; i < event.length; i++) {
        console.log("event" + event[i].label);
        v2 = event[i].label;
        v1.push(v2);
      }
      this.state.selectDate.push(v2);
      console.log("this.state.selectDate" + this.state.selectDate);

      for (var j = 0; j < this.state.daysLite.length; j++) {
        for (var i = 0; i < event.length; i++) {
          // console.log("event[i]"+event[i]);
          // console.log("this.state.daysLite[j]"+this.state.daysLite[j]);
          console.log(event[i] === this.state.daysLite[j]);

          if (event[i] === this.state.daysLite[j]) {
            this.state.daysLite.splice(j, 1);
          }
        }
      }
      console.log(this.state.daysLite);
    }

    console.log(JSON.stringify(this.state.days));
  };

  removeDateLite = (event) => {
    console.log(JSON.stringify(event));
    this.state.selectDate = [];
    var v1 = [];
    var v2 = [];
    for (var i = 0; i < event.length; i++) {
      console.log("event" + event[i].label);
      v2 = event[i].label;
      v1.push(v2);
      this.state.selectDate.push(v2);
    }
    console.log("this.state.selectDate" + v2);

    console.log("this.state.selectDate" + this.state.selectDate);

    const days = [
      { label: "Monday", value: "Monday" },
      { label: "Tuesday", value: "Tuesday" },
      { label: "Wednesday", value: "Wednesday" },
      { label: "Thursday", value: "Thursday" },
      { label: "Friday", value: "Friday" },
      { label: "Saturday", value: "Saturday" },
      { label: "Sunday", value: "Sunday" },
    ];

    for (var j = 0; j < days.length; j++) {
      for (var i = 0; i < this.state.selectDate.length; i++) {
        console.log(this.state.selectDate[i] === days[j]);

        if (
          JSON.stringify(this.state.selectDate[i]) === JSON.stringify(days[j])
        ) {
          days.splice(j, 1);
        }
      }
    }

    for (var j = 0; j < days.length; j++) {
      for (var i = 0; i < event.length; i++) {
        console.log(event[i] === days[j]);

        if (JSON.stringify(event[i]) === JSON.stringify(days[j])) {
          days.splice(j, 1);
        }
      }
    }
    this.setState({
      daysLite: days,
    });

    console.log(this.state.daysLite);
  };

  selectDateEnterprise = (event) => {
    let ddl = document.getElementById("productdd");

    console.log(ddl);
    if (event[0].label !== "No Option") {
      var v1 = [];
      var v2 = [];
      for (var i = 0; i < event.length; i++) {
        console.log("event" + event[i].label);
        v2 = event[i].label;
        v1.push(v2);
      }
      this.state.selectDate.push(v2);
      console.log("this.state.selectDate" + this.state.selectDate);

      for (var j = 0; j < this.state.daysEnterprise.length; j++) {
        for (var i = 0; i < event.length; i++) {
          // console.log("event[i]"+event[i]);
          // console.log("this.state.daysLite[j]"+this.state.daysLite[j]);
          console.log(event[i] === this.state.daysEnterprise[j]);

          if (event[i] === this.state.daysEnterprise[j]) {
            this.state.daysEnterprise.splice(j, 1);
          }
        }
      }
      console.log(this.state.daysEnterprise);
    }

    console.log(JSON.stringify(this.state.days));
  };

  removeDateEnterprise = (event) => {
    console.log(JSON.stringify(event));
    this.state.selectDate = [];
    var v1 = [];
    var v2 = [];
    for (var i = 0; i < event.length; i++) {
      console.log("event" + event[i].label);
      v2 = event[i].label;
      v1.push(v2);
      this.state.selectDate.push(v2);
    }
    console.log("this.state.selectDate" + v2);

    console.log("this.state.selectDate" + this.state.selectDate);

    const days = [
      { label: "Monday", value: "Monday" },
      { label: "Tuesday", value: "Tuesday" },
      { label: "Wednesday", value: "Wednesday" },
      { label: "Thursday", value: "Thursday" },
      { label: "Friday", value: "Friday" },
      { label: "Saturday", value: "Saturday" },
      { label: "Sunday", value: "Sunday" },
    ];

    for (var j = 0; j < days.length; j++) {
      for (var i = 0; i < this.state.selectDate.length; i++) {
        console.log(this.state.selectDate[i] === days[j]);

        if (
          JSON.stringify(this.state.selectDate[i]) === JSON.stringify(days[j])
        ) {
          days.splice(j, 1);
        }
      }
    }

    for (var j = 0; j < days.length; j++) {
      for (var i = 0; i < event.length; i++) {
        console.log(event[i] === days[j]);

        if (JSON.stringify(event[i]) === JSON.stringify(days[j])) {
          days.splice(j, 1);
        }
      }
    }
    this.setState({
      daysEnterprise: days,
    });

    console.log(this.state.daysEnterprise);
  };

  selectDatePremium = (event) => {
    let ddl = document.getElementById("productdd");

    console.log(ddl);
    if (event[0].label !== "No Option") {
      var v1 = [];
      var v2 = [];
      for (var i = 0; i < event.length; i++) {
        console.log("event" + event[i].label);
        v2 = event[i].label;
        v1.push(v2);
      }
      this.state.selectDate.push(v2);
      console.log("this.state.selectDate" + this.state.selectDate);

      for (var j = 0; j < this.state.daysPremium.length; j++) {
        for (var i = 0; i < event.length; i++) {
          // console.log("event[i]"+event[i]);
          // console.log("this.state.daysLite[j]"+this.state.daysLite[j]);
          console.log(event[i] === this.state.daysPremium[j]);

          if (event[i] === this.state.daysPremium[j]) {
            this.state.daysPremium.splice(j, 1);
          }
        }
      }
      console.log(this.state.daysPremium);
    }

    console.log(JSON.stringify(this.state.days));
  };

  removeDatePremium = (event) => {
    console.log(JSON.stringify(event));
    this.state.selectDate = [];
    var v1 = [];
    var v2 = [];
    for (var i = 0; i < event.length; i++) {
      console.log("event" + event[i].label);
      v2 = event[i].label;
      v1.push(v2);
      this.state.selectDate.push(v2);
    }
    console.log("this.state.selectDate" + v2);

    console.log("this.state.selectDate" + this.state.selectDate);

    const days = [
      { label: "Monday", value: "Monday" },
      { label: "Tuesday", value: "Tuesday" },
      { label: "Wednesday", value: "Wednesday" },
      { label: "Thursday", value: "Thursday" },
      { label: "Friday", value: "Friday" },
      { label: "Saturday", value: "Saturday" },
      { label: "Sunday", value: "Sunday" },
    ];

    for (var j = 0; j < days.length; j++) {
      for (var i = 0; i < this.state.selectDate.length; i++) {
        console.log(this.state.selectDate[i] === days[j]);

        if (
          JSON.stringify(this.state.selectDate[i]) === JSON.stringify(days[j])
        ) {
          days.splice(j, 1);
        }
      }
    }

    for (var j = 0; j < days.length; j++) {
      for (var i = 0; i < event.length; i++) {
        console.log(event[i] === days[j]);

        if (JSON.stringify(event[i]) === JSON.stringify(days[j])) {
          days.splice(j, 1);
        }
      }
    }
    this.setState({
      daysPremium: days,
    });

    console.log(this.state.daysPremium);
  };

  selectDate = (event) => {
    console.log(JSON.stringify(event));
    let ddl = document.getElementById("productdd");

    console.log(ddl);
    if (event[0].label !== "No Option") {
      var v1 = [];
      var v2 = [];
      for (var i = 0; i < event.length; i++) {
        console.log("event" + event[i].label);
        v2 = event[i].label;
        v1.push(v2);
      }
      this.state.selectDate.push(v2);
      console.log("this.state.selectDate" + this.state.selectDate);
    }
  };

  removeDate = (event) => {
    console.log(JSON.stringify(event));
    this.state.selectDate = [];
    var v1 = [];
    var v2 = [];
    for (var i = 0; i < event.length; i++) {
      console.log("event" + event[i].label);
      v2 = event[i].label;
      v1.push(v2);
      this.state.selectDate.push(v2);
    }
    console.log("this.state.selectDate" + v2);

    console.log("this.state.selectDate" + this.state.selectDate);
  };

  addLite = () => {
    if (
      this.state.selectDate &&
      this.state.startTime &&
      this.state.endTime &&
      this.state.liteTimezone
    ) {
      const data = {
        timeZone: this.state.liteTimezone,
        //dayList:this.state.selectDate.toString(),
        dayList: this.state.selectDate,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
      };
      this.state.dataLite.push(data);
      this.liteDateRef.current.resetSelectedValues();
      console.log(" this.state.dataLite" + JSON.stringify(this.state.dataLite));
      for (var j = 0; j < this.state.selectDate.length; j++) {
        for (var i = this.state.days.length - 1; i >= 0; i--) {
          if (this.state.days[i].label === this.state.selectDate[j]) {
            this.state.days.splice(i, 1);
          }
        }
      }

      this.setState({
        selectDate: [],
        startTime: "",
        endTime: "",
      });
    }
  };

  clearLite = () => {
    this.setState({
      daysLite: [
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
        { label: "Sunday", value: "Sunday" },
      ],
      dataLite: [],
    });
  };

  addEnterprise = () => {
    if (
      this.state.selectDate &&
      this.state.startTime &&
      this.state.endTime &&
      this.state.enterpriseTimezone
    ) {
      const data = {
        timeZone: this.state.enterpriseTimezone,
        //dayList:this.state.selectDate.toString(),
        dayList: this.state.selectDate,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
      };
      this.state.dataEnterprise.push(data);
      this.enterpriseDateRef.current.resetSelectedValues();
      console.log(" this.state.dataLite" + JSON.stringify(this.state.dataLite));
      for (var j = 0; j < this.state.selectDate.length; j++) {
        for (var i = this.state.days.length - 1; i >= 0; i--) {
          if (this.state.days[i].label === this.state.selectDate[j]) {
            this.state.days.splice(i, 1);
          }
        }
      }

      this.setState({
        selectDate: [],
        startTime: "",
        endTime: "",
      });
    }
  };

  clearEnterprise = () => {
    this.setState({
      daysEnterprise: [
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
        { label: "Sunday", value: "Sunday" },
      ],
      dataEnterprise: [],
    });
  };

  addPremium = () => {
    if (
      this.state.selectDate &&
      this.state.startTime &&
      this.state.endTime &&
      this.state.premiumTimezone
    ) {
      const data = {
        timeZone: this.state.premiumTimezone,
        dayList: this.state.selectDate,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
      };
      this.state.dataPremium.push(data);
      console.log(
        "this.state.dataPremium \n" + JSON.stringify(this.state.dataPremium)
      );
      this.premiumDateRef.current.resetSelectedValues();
      console.log(" this.state.dataLite" + JSON.stringify(this.state.dataLite));
      for (var j = 0; j < this.state.selectDate.length; j++) {
        for (var i = this.state.days.length - 1; i >= 0; i--) {
          if (this.state.days[i].label === this.state.selectDate[j]) {
            this.state.days.splice(i, 1);
          }
        }
      }

      this.setState({
        selectDate: [],
        startTime: "",
        endTime: "",
      });
    }
  };

  // clearpremium =()=>{
  //   this.setState({
  //     days:[
  //       {label: "Monday", value: "Monday"},
  //       {label: "Tuesday", value: "Tuesday"},
  //       {label: "Wednesday", value: 'Wednesday'},
  //       {label: "Thursday", value: 'Thursday'},
  //       {label: "Friday", value: 'Friday'},
  //       {label: "Saturday", value: 'Saturday'},
  //       {label: "Sunday", value: 'Sunday'},],
  //       dataPremium:[]
  //   })
  // }

  /*addpremium = () =>{
  if(this.state.selectDate && this.state.startTime && this.state.endTime){
    const data={Days:this.state.selectDate.toString(),
                startTime:this.state.startTime,
                endTime:this.state.endTime}
      this.state.dataPremium.push(data);
      this.premiumDateRef.current.resetSelectedValues();

     for (var j = 0; j < this.state.selectDate.length; j++) {
          for (var i = this.state.days.length - 1; i >= 0; i--)  {
            if (this.state.days[i].label === this.state.selectDate[j]) {
              this.state.days.splice(i, 1);
              }
            }
          }



        this.setState({
          selectDate:[],
          startTime:'',
          endTime:'',
        })
  }
}*/

  clearpremium = () => {
    this.setState({
      daysPremium: [
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
        { label: "Sunday", value: "Sunday" },
      ],
      dataPremium: [],
    });
  };

  date = (e) => {
    console.log(JSON.stringify(e[0].label));
    const date = [];
    this.setState({
      selectDate: this.state.selectDate,
    });
    this.state.selectDate.push(e[0].label);
  };

  liteClick = () => {
    //const {checked}=event.target

    this.setState({
      liteModel: this.state.liteRecommendedModel,
      liteRecommendedModel: "",
      liteRecommendedPrice: "",
      liteSelectedModelPrice: "",
      liteClick: !this.state.liteClick,
    });
  };

  enterpriseClick = (event) => {
    const { checked } = event.target;

    this.setState({
      enterpriseModel: this.state.enterpriseRecommendedModel,
      enterpriseRecommendedModel: "",
      enterpriseRecommendedPrice: "",
      enterpriseSelectedModelPrice: "",
      enterpriseClick: !this.state.enterpriseClick,
    });
  };

  premiumClick = (event) => {
    const { checked } = event.target;

    this.setState({
      premiumModel: this.state.premiumRecommendedModel,
      premiumRecommendedModel: "",
      premiumRecommendedPrice: "",
      premiumSelectedModelPrice: "",
      premiumClick: !this.state.premiumClick,
    });
  };
  render() {
     if (this.state.isReadyToRedirect) return <Redirect to="/modifiedplanDetails" />
    const {
      lite,
      liteModel,
      liteModels,
      liteticketVol,
      liteTimezone,
      littTimeSlot,
      liteserviceSupport,
      liteRecommendedModel,
      liteRecommendedseater,
      liteRecommendedPrice,
      liteSelectedModelPrice,
      liteSupportWindow,
      liteSeatCount,
      liteClick,
      tokenLite,

      tokenEnterprise,
      enterpriseModel,
      enterpriseticketVol,
      enterpriseserviceSupport,
      enterpriseRecommendedModel,
      enterpriseRecommendedseater,
      enterpriseRecommendedPrice,
      enterpriseSelectedModelPrice,
      enterpriseSupportWindow,
      enterpriseSeatCount,
      enterpriseClick,

      tokenPremium,
      premiumModel,
      premiumticketVol,
      premiumserviceSupport,
      premiumRecommendedModel,
      premiumRecommendedseater,
      premiumRecommendedPrice,
      premiumSelectedModelPrice,
      premiumSeatCount,
      premiumSupportWindow,
      premiumModels,
      premiumTimezone,
      premiumTimeSlot,
      premiumClick,

      enterpriseModels,
      enterpriseTimezone,
      enterpriseTimeSlot,
      TollFreeNumber,
      ContractDuration,
      InitiationDate,
      PaymentTerms,
      timezoneOption,
      liteStartTime,
      startDate,
      liteEndTime,
      startTime,
      endTime,
      enterpriseStartTime,
      enterpriseEndTime,
      premiumStartTime,
      premiumEndTime,
      code1,
      country,
      city,
      pincode,
      mobile,
      landline,
      companyName,
      submitted,
      yourName,
      workMail,
      yourSubject,
      message,
      sendMail,
    } = this.state;
    // if(!timezoneOption){
    //       let timezoneOpt = [{label: "All", value: "All"},];
    //     if (this.props.timezonelist !== undefined && this.props.timezonelist !== null && this.props.timezonelist.timeZones.length) {
    //            for(var i=0;i<(this.props.timezonelist.timeZones.length);i++)
    //            {
    //             timezoneOpt[i] = {label:this.props.timezonelist.timeZones[i-1], value: this.props.timezonelist.timeZones[i-1]}
    //            }
    //           this.setState({
    //             timezoneOption:timezoneOpt
    //           })
    //       }}

    let timezoneOpt = [{ label: "All", value: "All" }];
    if (
      this.props.timezonelist !== undefined &&
      this.props.timezonelist !== null
    ) {
      if (!!this.props.timezonelist.timeZones) {
        this.state.timezoneOption = this.props.timezonelist.timeZones.map(
          (row) => {
            return { label: row, value: row };
          }
        );
      }

      // console.log("this.state.littTimeSlot"+JSON.stringify(this.state.timezoneOption))
    } else {
      this.state.timezoneOption = [{ label: "No Option", value: "No Option" }];
    }

    if (
      this.props.timeSlotLite !== undefined &&
      this.props.timeSlotLite !== null
    ) {
      if (!!this.props.timeSlotLite.slots) {
        this.state.littTimeSlot = this.props.timeSlotLite.slots.map((row) => {
          return { label: row, value: row };
        });
      }
      //console.log("this.state.littTimeSlot"+JSON.stringify(this.state.littTimeSlot))
    } else {
      this.state.littTimeSlot = [{ label: "No Option", value: "No Option" }];
    }
    // if(liteTimezone === null){
    //   console.log("1");
    //   let timeOpt = [{label: "All", value: "All"},];
    // if (this.props.litetime !== undefined && this.props.litetime !== null && this.props.litetime.slots.length>0) {
    //   console.log("2");
    //        for(var i=0;i<(this.props.litetime.slots.length);i++)
    //        {
    //         console.log("3");
    //         timeOpt[i] = {label:this.props.litetime.slots[i-1], value: this.props.litetime.slots[i-1]}
    //        }
    //       this.setState({
    //         littTimeSlot:timeOpt
    //       })
    //   }}

    const option = [
      { label: "", value: "" },
      { label: "1:00", value: "1:00" },
      { label: "2:00", value: "2:00" },
      { label: "3:00", value: "3:00" },
      { label: "4:00", value: "4:00" },
      { label: "5:00", value: "5:00" },
      { label: "6:00", value: "6:00" },
      { label: "7:00", value: "7:00" },
      { label: "8:00", value: "8:00" },
      { label: "9:00", value: "9:00" },
      { label: "10:00", value: "10:00" },
      { label: "11:00", value: "11:00" },
      { label: "12:00", value: "12:00" },
      { label: "13:00", value: "13:00" },
      { label: "14:00", value: "14:00" },
      { label: "15:00", value: "15:00" },
      { label: "16:00", value: "16:00" },
      { label: "17:00", value: "17:00" },
      { label: "18:00", value: "18:00" },
      { label: "19:00", value: "19:00" },
      { label: "20:00", value: "20:00" },
      { label: "21:00", value: "21:00" },
      { label: "22:00", value: "22:00" },
      { label: "23:00", value: "23:00" },
    ];
    // {label: "24:00", value: '24:00'},]

    const serviceSupportsOption = [
      { label: "", value: "" },
      { label: "24x7", value: "24x7" },
      {
        label: "8 X 5 Weekdays (office hours support)",
        value: "8 X 5 Weekdays (office hours support)",
      },
      {
        label: "16 X 5 After office hours support",
        value: "16 X 5 After office hours support",
      },
      {
        label: "Weekend Support (48hours)",
        value: "Weekend Support (48hours)",
      },
      { label: "Customize", value: "Customize" },
    ];

    const model = [
      { label: "", value: "" },
      { label: "PPU", value: "PPU" },
      { label: "Shared", value: "Shared" },
      { label: "Dedicated", value: "Dedicated" },
    ];

    console.log(this.state.checked1);

    var liteShowESeater = false;
    if (liteModel == "Dedicated" && liteserviceSupport && liteticketVol) {
      liteShowESeater = true;
    } else {
      liteShowESeater = false;
    }

    var liteShow = false;
    if (liteModel && liteserviceSupport && liteticketVol) {
      liteShow = true;
    } else {
      liteShow = false;
    }

    var liteShowCSeater = false;
    if (liteRecommendedModel == "Dedicated") {
      liteShowCSeater = true;
    } else {
      liteShowCSeater = false;
    }

    var enterpriseShowESeater = false;
    if (
      enterpriseModel == "Dedicated" &&
      enterpriseserviceSupport &&
      enterpriseticketVol
    ) {
      enterpriseShowESeater = true;
    } else {
      enterpriseShowESeater = false;
    }

    var enterpriseShow = false;
    if (enterpriseModel && enterpriseserviceSupport && enterpriseticketVol) {
      enterpriseShow = true;
    } else {
      enterpriseShow = false;
    }

    var enterpriseShowCSeater = false;
    if (enterpriseRecommendedModel == "Dedicated") {
      enterpriseShowCSeater = true;
    } else {
      enterpriseShowCSeater = false;
    }

    var premiumShowESeater = false;
    if (
      premiumModel == "Dedicated" &&
      premiumserviceSupport &&
      premiumticketVol
    ) {
      premiumShowESeater = true;
    } else {
      premiumShowESeater = false;
    }

    var premiumShow = false;
    if (premiumModel && premiumserviceSupport && premiumticketVol) {
      premiumShow = true;
    } else {
      premiumShow = false;
    }

    var premiumShowCSeater = false;
    if (premiumRecommendedModel == "Dedicated") {
      premiumShowCSeater = true;
    } else {
      premiumShowCSeater = false;
    }
    var date = new Date();
    var currentMonth = date.getMonth();
    var currentDate = date.getDate();
    var currentYear = date.getFullYear();
    return (
      <div>
        {!window.sessionStorage.getItem(Constants.ACCESS_EMAIL) ? (
          <Header />
        ) : (
          <HeaderLogin />
        )}
        {/* <div className="view">
        <img src={CustomizePageImg} className="img-fluid" alt="smaple image" />

      </div> */}
        <div className="view">
          <section className="generic-banner relative banner-area-inner17">
            <div
              className="overlay overlay-bg overlay-bg-blk"
              style={{ backgroundColor: "black", opacity: 0.8 }}
            ></div>
            <div className="container">
              <div className="row height align-items-center justify-content-center">
                <div className="col-lg-10">
                  <div className="generic-banner-content">
                    <h2 className="head2-inner">One Process - One Tool</h2>
                    <p className="text-white" style={{ opacity: 0.5 }}>
                      {" "}
                      CtrlSwiftTM comprises of a robust maturity assessment
                      methodology and transformation cookbooks to progressively
                      drive the Service
                      <br /> Desk transformation to the desired end-state.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <Container>
          <Row>
            <Col>
              <br />
              <br />
              <h1>Upgrade/Downgrade</h1>
              <p style={{ fontSize: 26, color: "black" }}>
                It won't take more than 15 minutes time.
              </p>
            </Col>
          </Row>
          {liteModel == "" ? null : (
            <Form className="col-md-12">
              <Form.Row
                style={{
                  backgroundColor: "#0950a1",
                  fontSize: 20,
                  borderRadius: 12,
                }}
              >
                <div className="col-md-1">
                <Form.Label style={{ fontSize: 20, marginBlock: "10px",color:"#fff",paddingLeft:"10px" }}>
                    Lite
                  </Form.Label>
                </div>
                <div className="col-md-10" />
                <div className="col-md-1 my-2" >
                  {tokenLite ? (
                    <button
                      type="button"
                      className="btn cur-p-cs "
                      style={{ backgroundColor: "#0950a1",border:" 1px solid #fff" }}
                      onClick={() => this.switch1()}
                    >
                      <i
                        className={
                          this.state.checked1
                            ? "c-white-500 ti-back-left"
                            : "c-white-500 ti-pencil"
                        }
                      />
                    </button>
                  ) : (
                    <Switch
                      checked={this.state.checked1}
                      onChange={this.switch1}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={20}
                      width={48}
                    />
                  )}
                </div>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md="4" controlId="liteModel">
                  <Form.Label>Commercial Model</Form.Label>
                  <select
                    type="dropdown"
                    className="form-control"
                    name="liteModel"
                    value={liteModel}
                    disabled={!this.state.checked1}
                    placeholder="select"
                    onChange={this.litehandleChange}
                  >
                    <option value=""></option>
                    <option value="PPU">PPU</option>
                    <option value="Shared">Shared</option>
                    <option value="Dedicated">Dedicated</option>
                  </select>

                  {/* <input  readOnly disabled={!this.state.checked1}  style={this.state.checked1?{backgroundColor:'white'}:null}  className="form-control"
        name="liteModel" value={liteModel} />  */}
                  {submitted && !liteModel && this.state.checked1 && (
                    <div style={{ fontSize: 12, color: "red" }}>
                      This field is required
                    </div>
                  )}
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="liteticketVol">
                  <Form.Label>Ticket Vol/Month</Form.Label>
                  <input
                    type="number"
                    disabled={!this.state.checked1}
                    style={
                      !this.state.checked1
                        ? { backgroundColor: "#f2f4f2" }
                        : null
                    }
                    className="form-control"
                    required
                    pattern="[0-9a-zA-Z_.-]*"
                    onChange={this.litehandleChange}
                    name="liteticketVol"
                    value={liteticketVol}
                  />
                  {liteticketVol && liteticketVol < 50 && (
                    <p style={{ color: "red" }}>
                      Volume should be greater than 50
                    </p>
                  )}
                  {submitted && !liteticketVol && this.state.checked1 && (
                    <div style={{ fontSize: 12, color: "red" }}>
                      This field is required
                    </div>
                  )}
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="liteserviceSupport">
                  <Form.Label>Support Window</Form.Label>
                  <Select
                    //onChange={this.getMetal}
                    onChange={this.liteHandleChange}
                    // isSearchable={true}

                    isDisabled={!this.state.checked1}
                    value={{
                      label: this.state.liteserviceSupport,
                      value: this.state.liteserviceSupport,
                    }}
                    role={country}
                    options={serviceSupportsOption}
                    name="liteserviceSupport"
                  />

                  <div style={{ fontSize: "10" }}>
                    (Please choose customize option for multi select)
                  </div>
                  {submitted && !liteserviceSupport && this.state.checked1 && (
                    <div style={{ fontSize: 12, color: "red" }}>
                      This field is required
                    </div>
                  )}
                </Form.Group>
                {/* <Form.Group as={Col} md="4" controlId="liteModel">
                <Form.Label>Selected Model Price(Per Month)</Form.Label>
               <input type="text" disabled="true" className="form-control" style={this.state.checked1 ?{backgroundColor:'#fff'}:null}
 name="liteSelectedModelPrice" value={liteSelectedModelPrice} />
                </Form.Group> */}
              </Form.Row>

              {liteShow ? (
                <Form.Row>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="liteSelectedModelPrice"
                  >
                    <Form.Label>Selected Model Price(Per Month)</Form.Label>
                    <input
                      type="text"
                      disabled="true"
                      className="form-control"
                      style={
                        this.state.checked1 ? { backgroundColor: "#fff" } : null
                      }
                      name="liteSelectedModelPrice"
                      value={liteSelectedModelPrice + " $"}
                    />
                  </Form.Group>

                  {liteShowESeater ? (
                    <Form.Group as={Col} md="4" controlId="liteSeatCount">
                      <Form.Label>
                        Number of Resources(Min count {liteRecommendedseater})
                      </Form.Label>
                      {liteModel == "Dedicated" ? (
                        <select
                          className="form-control"
                          disabled={!this.state.checked1}
                          onChange={this.liteResourceshandleChange}
                          id="liteSeatcount"
                          name="liteSeatCount"
                          value={liteSeatCount}
                        >
                          <option value={liteRecommendedseater}>
                            {liteRecommendedseater}
                          </option>

                          <option value={liteRecommendedseater + 1}>
                            {liteRecommendedseater + 1}
                          </option>
                          <option value={liteRecommendedseater + 2}>
                            {liteRecommendedseater + 2}
                          </option>
                          <option value={liteRecommendedseater + 3}>
                            {liteRecommendedseater + 3}
                          </option>
                          <option value={liteRecommendedseater + 4}>
                            {liteRecommendedseater + 4}
                          </option>
                          <option value={liteRecommendedseater + 5}>
                            {liteRecommendedseater + 5}
                          </option>
                          <option value={liteRecommendedseater + 6}>
                            {liteRecommendedseater + 6}
                          </option>
                          <option value={liteRecommendedseater + 7}>
                            {liteRecommendedseater + 7}
                          </option>
                          <option value={liteRecommendedseater + 8}>
                            {liteRecommendedseater + 8}
                          </option>
                          <option value={liteRecommendedseater + 9}>
                            {liteRecommendedseater + 9}
                          </option>
                          <option value={liteRecommendedseater + 10}>
                            {liteRecommendedseater + 10}
                          </option>
                          <option value={liteRecommendedseater + 11}>
                            {liteRecommendedseater + 11}
                          </option>
                          <option value={liteRecommendedseater + 12}>
                            {liteRecommendedseater + 12}
                          </option>
                          <option value={liteRecommendedseater + 13}>
                            {liteRecommendedseater + 13}
                          </option>
                          <option value={liteRecommendedseater + 14}>
                            {liteRecommendedseater + 14}
                          </option>
                          <option value={liteRecommendedseater + 15}>
                            {liteRecommendedseater + 15}
                          </option>
                          <option value={liteRecommendedseater + 16}>
                            {liteRecommendedseater + 16}
                          </option>
                          <option value={liteRecommendedseater + 17}>
                            {liteRecommendedseater + 17}
                          </option>
                          <option value={liteRecommendedseater + 18}>
                            {liteRecommendedseater + 18}
                          </option>
                          <option value={liteRecommendedseater + 19}>
                            {liteRecommendedseater + 19}
                          </option>
                          <option value={liteRecommendedseater + 20}>
                            {liteRecommendedseater + 20}
                          </option>
                          <option value={liteRecommendedseater + 21}>
                            {liteRecommendedseater + 21}
                          </option>
                          <option value={liteRecommendedseater + 22}>
                            {liteRecommendedseater + 22}
                          </option>
                          <option value={liteRecommendedseater + 23}>
                            {liteRecommendedseater + 23}
                          </option>
                          <option value={liteRecommendedseater + 24}>
                            {liteRecommendedseater + 24}
                          </option>
                          <option value={liteRecommendedseater + 25}>
                            {liteRecommendedseater + 25}
                          </option>
                        </select>
                      ) : null}
                      <div style={{ fontSize: "10" }}>
                        (Applicable only for dedicated model)
                      </div>
                      {liteModel == "Dedicated" &&
                        submitted &&
                        !liteSeatCount &&
                        this.state.checked1 && (
                          <div style={{ fontSize: 12, color: "red" }}>
                            This field is required
                          </div>
                        )}
                      {liteModel == "Dedicated" &&
                        submitted &&
                        liteSeatCount &&
                        this.state.checked1 &&
                        liteSeatCount < liteRecommendedseater && (
                          <div style={{ fontSize: 12, color: "red" }}>
                            Minimum seat count is {liteRecommendedseater}
                          </div>
                        )}
                    </Form.Group>
                  ) : null}

                  <Form.Group as={Col} md="4" controlId="liteRecommendedModel">
                    <Form.Label>Recommended Commercial Model</Form.Label>
                    <input
                      type="text"
                      className="form-control cs-lable"
                      style={{
                     //   backgroundColor: "#FFA500",
                        color: "white",
                        fontWeight: "bold",
                      }}
                      disabled="true"
                      name="liteRecommendedModel"
                      value={liteRecommendedModel}
                    />
                  </Form.Group>

                  {/* {liteShowCSeater && liteModel !== "Dedicated"?    <Form.Group as={Col} md="4" controlId="liteRecommendedseater">
                  <Form.Label>Recommended Resources</Form.Label>
                  <input type="text" style={{backgroundColor:'#FFA500',color:'white',fontWeight:'bold'}}    className="form-control" required pattern="[0-9a-zA-Z_.-]*"
        onChange={this.litehandleChange}   disabled="ture"   name="liteRecommendedseater" value={liteRecommendedseater} />
                </Form.Group>:null} */}
                  <Form.Group as={Col} md="4" controlId="liteRecommendedPrice">
                    <Form.Label>Recommended Model Price(Per Month)</Form.Label>
                    <input
                      type="text"
                      style={{
                     //   backgroundColor: "#FFA500",
                        color: "white",
                        fontWeight: "bold",
                      }}
                      className="form-control cs-lable"
                      disabled="true"
                      name="liteRecommendedPrice"
                      value={liteRecommendedPrice + " $"}
                    />
                  </Form.Group>

                  {/* <Form.Group as={Col} md="4" controlId="litePaymentTerms">
               <Form.Label>Payment Terms</Form.Label>
               <input type="text" disabled="true" className="form-control" style={this.state.checked1 ?{backgroundColor:'#fff'}:null}
 name="litePaymentTerms" value={this.state.litePaymentTerms} />
             </Form.Group> */}

                  <Form.Group as={Col} md="4" controlId="InitiationDate">
                    <Form.Label>Payment Terms</Form.Label>
                    {liteModel === "PPU" ? (
                      // <select type="dropdown"  disabled={!this.state.checked1} className="form-control" name="litePaymentTerms" value={this.state.litePaymentTerms}
                      //   placeholder='select' onChange={()=>{this.setState({litePaymentTerms:"Yearly"})}}>
                      //   <option value=""></option>
                      //   <option value="Yearly">Yearly</option>
                      //   {/* <option  value="Monthly">Monthly</option> */}
                      // </select>
                      <input
                        type="text"
                        disabled="true"
                        className="form-control"
                        name="litePaymentTerms"
                        value={this.state.litePaymentTerms}
                        placeholder="select"
                      />
                    ) : (
                      <select
                        type="dropdown"
                        //disabled={!this.state.checked1}
                        disabled="true"
                        className="form-control"
                        name="litePaymentTerms"
                        value={this.state.litePaymentTerms}
                        placeholder="select"
                        onChange={this.handleChange}
                      >
                        <option value=""></option>
                        <option value="Yearly">Yearly</option>
                        <option value="Monthly">Monthly</option>
                      </select>
                    )}

                    {submitted && !this.state.litePaymentTerms && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        This field is required
                      </div>
                    )}
                  </Form.Group>

                  {/* <Form.Group as={Col} md="4" controlId="liteContractDuration">
               <Form.Label>Contract Duration</Form.Label>
               <input type="text" disabled="true" className="form-control" style={this.state.checked1 ?{backgroundColor:'#fff'}:null}
 name="liteContractDuration" value={this.state.liteContractDuration} />
             </Form.Group> */}

                  <Form.Group as={Col} md="4" controlId="liteContractDuration">
                    <Form.Label>Subscription Period</Form.Label>

                    <select
                      type="dropdown"
                      //disabled={!this.state.checked1}
                      disabled="true"
                      className="form-control"
                      name="liteContractDuration"
                      value={this.state.liteContractDuration}
                      placeholder="select"
                      onChange={this.handleChange}
                    >
                      <option value=""></option>
                      <option value="1 Year">1 Year</option>
                      <option value="3 Years">3 Years</option>
                    </select>
                    {submitted && !this.state.liteContractDuration && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        This field is required
                      </div>
                    )}
                  </Form.Group>

                  {/* <Form.Group as={Col} md="4" controlId=" liteSupportWindow">
               <Form.Label>Support Window</Form.Label>
               <input type="text" disabled="true" className="form-control" style={this.state.checked1 ?{backgroundColor:'#fff'}:null}
 name=" liteSupportWindow" value={this.state.liteSupportWindow} />
             </Form.Group> */}
                  <Form.Group as={Col} md="4" controlId="liteIsTollFreeNumber">
                    <Form.Label>Toll free number:</Form.Label>
                    <RadioGroup
                      row
                      aria-label="position"
                      name="position"
                      value={this.state.liteIsTollFreeNumber}
                      defaultValue={this.state.premiumIsTollFreeNumber}
                    >
                      <FormControlLabel
                        value="Yes"
                        onColor="#8bc34a"
                        control={<Radio color="primary" />}
                        label="Yes"
                        labelPlacement="End"
                        disabled={!this.state.checked1}
                        onChange={(e) => {
                          this.setState({ liteIsTollFreeNumber: "Yes" });
                        }}
                      />

                      <FormControlLabel
                        value="No"
                        control={<Radio color="primary" />}
                        label="No"
                        labelPlacement="End"
                        disabled={!this.state.checked1}
                        onChange={(e) => {
                          this.setState({ liteIsTollFreeNumber: "No" });
                        }}
                      />
                    </RadioGroup>
                  </Form.Group>
                  {/* <Form.Group as={Col} md="4" controlId="startDate">
                    <Form.Label>Service Initiation Date</Form.Label>
                    <div className="dateclass">
                      <DatePicker
                        name="liteInitialisationDate"
                        value={this.state.liteInitialisationDate}
                        id="liteInitialisationDate"
                        //value={startDate}
                        style={
                          !this.state.checked1
                            ? { backgroundColor: "#f2f4f2" }
                            : null
                        }
                        disabled={!this.state.checked1}
                        selected={this.state.liteSelectedDate}
                        onChange={(date) =>
                          this.handleChangeLiteStartDate(date)
                        }
                        minDate={new Date(this.state.date)}
                        maxDate={
                          new Date(
                            currentYear,
                            currentMonth + 1,
                            currentDate + 7
                          )
                        }
                      />
                      {submitted && !startDate && (
                        <div style={{ fontSize: 12, color: "red" }}>
                          This field is required
                        </div>
                      )}
                    </div>
                  </Form.Group> */}

                  {liteShowESeater ? null : (
                    <Form.Group
                      as={Col}
                      md="4"
                      controlId="liteSeatCount"
                    ></Form.Group>
                  )}
                  {liteShowCSeater ? (
                    <Form.Group as={Col} md="4" controlId="liteSeatCount">
                      {" "}
                    </Form.Group>
                  ) : (
                    <Form.Group as={Col} md="4" controlId="liteSeatCount">
                      {" "}
                    </Form.Group>
                  )}
                  {liteShowCSeater && liteModel !== "PPU" ? null : (
                    <Form.Group as={Col} md="8" controlId="liteSeatCount">
                      {" "}
                    </Form.Group>
                  )}
                  {liteShowCSeater && liteModel !== "Shared" ? null : (
                    <Form.Group as={Col} md="8" controlId="liteSeatCount">
                      {" "}
                    </Form.Group>
                  )}

                  <Form.Group as={Col} md="4" controlId="liteRecommendedModel">
                    <Form.Label> </Form.Label>
                    <br /> <br />
                    <Form.Check
                      type="checkbox"
                      label="Proceed with recommended"
                      onClick={(event) => this.liteClick(event)}
                      id="liteCheck"
                      checked={this.state.liteClick}
                      disabled={!this.state.checked1}
                    />
                  </Form.Group>
                </Form.Row>
              ) : null}
            </Form>
          )}
          <br />

          {enterpriseModel ? (
            <Form className="col-md-12">
              <Form.Row
                style={{
                  backgroundColor: "#0950a1",
                  fontSize: 20,
                  borderRadius: 12,
                }}
              >
                <div className="col-md-1">
                <Form.Label style={{ fontSize: 20, marginBlock: "10px",color:"#fff",paddingLeft:"10px" }}>
                    Enterprise
                  </Form.Label>
                </div>
                <div className="col-md-10" />
                <div className="col-md-1 my-2" >
                  {tokenEnterprise ? (
                    <button
                      type="button"
                      className="btn cur-p-cs "
                      style={{ backgroundColor: "#0950a1",border:" 1px solid #fff" }}
                      onClick={() => this.switch2()}
                    >
                      <i
                        className={
                          this.state.checked2
                            ? "c-white-500 ti-back-left"
                            : "c-white-500 ti-pencil"
                        }
                      />
                    </button>
                  ) : (
                    <Switch
                      checked={this.state.checked2}
                      onChange={this.switch2}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={20}
                      width={48}
                    />
                  )}
                </div>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md="4" controlId="enterpriseModel">
                  <Form.Label>Commercial Model</Form.Label>
                  <select
                    type="dropdown"
                    className="form-control"
                    name="enterpriseModel"
                    value={enterpriseModel}
                    disabled={!this.state.checked2}
                    placeholder="select"
                    onChange={this.enterprisehandleChange}
                  >
                    <option value=""></option>
                    <option value="PPU">PPU</option>
                    <option value="Shared">Shared</option>
                    <option value="Dedicated">Dedicated</option>
                  </select>
                  {/* <input   disabled={!this.state.checked2}  style={this.state.checked2?{backgroundColor:'white'}:null}  className="form-control"
        name="enterpriseModel" value={this.state.checked2?enterpriseModel:null} /> */}
                  {submitted && !enterpriseModel && this.state.checked2 && (
                    <div style={{ fontSize: 12, color: "red" }}>
                      This field is required
                    </div>
                  )}
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="enterpriseticketVol">
                  <Form.Label>Ticket Vol/Month</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    style={
                      !this.state.checked2
                        ? { backgroundColor: "#f2f4f2" }
                        : null
                    }
                    required
                    pattern="[0-9a-zA-Z_.-]*"
                    onChange={this.enterprisehandleChange}
                    disabled={!this.state.checked2}
                    name="enterpriseticketVol"
                    value={enterpriseticketVol}
                  />
                  {submitted && !enterpriseticketVol && this.state.checked2 && (
                    <div style={{ fontSize: 12, color: "red" }}>
                      This field is required
                    </div>
                  )}
                  {enterpriseticketVol && enterpriseticketVol < 50 && (
                    <p style={{ color: "red" }}>
                      Volume should be greater than 50
                    </p>
                  )}
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="enterpriseSupportWindow">
                  <Form.Label>Support Window</Form.Label>

                  <Select
                    onChange={this.enterpriseHandleChange}
                    isDisabled={!this.state.checked2}
                    value={{
                      label: this.state.enterpriseserviceSupport,
                      value: this.state.enterpriseserviceSupport,
                    }}
                    role={country}
                    options={serviceSupportsOption}
                    name="enterpriseserviceSupport"
                  />

                  <div style={{ fontSize: "10" }}>
                    (Please choose customize option for multi select)
                  </div>
                  {submitted &&
                    !enterpriseserviceSupport &&
                    this.state.checked2 && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        This field is required
                      </div>
                    )}
                </Form.Group>
                {/* <Form.Group as={Col} md="4" controlId="enterpriseModel">
                <Form.Label>Selected Model Price(Per Month)</Form.Label>
               <input type="text"   disabled="true" className="form-control"  style={this.state.checked2 ?{backgroundColor:'#fff'}:null}
 name="enterpriseSelectedModelPrice" value={enterpriseSelectedModelPrice} />
                </Form.Group>  */}
              </Form.Row>

              {enterpriseShow ? (
                <Form.Row>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="enterpriseSelectedModelPrice"
                  >
                    <Form.Label>Selected Model Price(Per Month)</Form.Label>
                    <input
                      type="text"
                      disabled="true"
                      className="form-control"
                      style={
                        this.state.checked2 ? { backgroundColor: "#fff" } : null
                      }
                      name="enterpriseSelectedModelPrice"
                      value={enterpriseSelectedModelPrice + " $"}
                    />
                  </Form.Group>

                  {enterpriseShowESeater ? (
                    <Form.Group as={Col} md="4" controlId="enterpriseSeatCount">
                      <Form.Label>
                        Number of Resources(Min count{" "}
                        {enterpriseRecommendedseater})
                      </Form.Label>
                      {enterpriseModel == "Dedicated" ? (
                        <select
                          type="dropdown"
                          className="form-control"
                          required
                          pattern="[0-9a-zA-Z_.-]*"
                          onChange={this.enterpriseResourceshandleChange}
                          disabled={!this.state.checked2}
                          name="enterpriseSeatCount"
                          value={enterpriseSeatCount}
                        >
                          <option value={enterpriseRecommendedseater}>
                            {enterpriseRecommendedseater}
                          </option>
                          <option value={enterpriseRecommendedseater + 1}>
                            {enterpriseRecommendedseater + 1}
                          </option>
                          <option value={enterpriseRecommendedseater + 2}>
                            {enterpriseRecommendedseater + 2}
                          </option>
                          <option value={enterpriseRecommendedseater + 3}>
                            {enterpriseRecommendedseater + 3}
                          </option>
                          <option value={enterpriseRecommendedseater + 4}>
                            {enterpriseRecommendedseater + 4}
                          </option>
                          <option value={enterpriseRecommendedseater + 5}>
                            {enterpriseRecommendedseater + 5}
                          </option>
                          <option value={enterpriseRecommendedseater + 6}>
                            {enterpriseRecommendedseater + 6}
                          </option>
                          <option value={enterpriseRecommendedseater + 7}>
                            {enterpriseRecommendedseater + 7}
                          </option>
                          <option value={enterpriseRecommendedseater + 8}>
                            {enterpriseRecommendedseater + 8}
                          </option>
                          <option value={enterpriseRecommendedseater + 9}>
                            {enterpriseRecommendedseater + 9}
                          </option>
                          <option value={enterpriseRecommendedseater + 10}>
                            {enterpriseRecommendedseater + 10}
                          </option>
                          <option value={enterpriseRecommendedseater + 11}>
                            {enterpriseRecommendedseater + 11}
                          </option>
                          <option value={enterpriseRecommendedseater + 12}>
                            {enterpriseRecommendedseater + 12}
                          </option>
                          <option value={enterpriseRecommendedseater + 13}>
                            {enterpriseRecommendedseater + 13}
                          </option>
                          <option value={enterpriseRecommendedseater + 14}>
                            {enterpriseRecommendedseater + 14}
                          </option>
                          <option value={enterpriseRecommendedseater + 15}>
                            {enterpriseRecommendedseater + 15}
                          </option>
                          <option value={enterpriseRecommendedseater + 16}>
                            {enterpriseRecommendedseater + 16}
                          </option>
                          <option value={enterpriseRecommendedseater + 17}>
                            {enterpriseRecommendedseater + 17}
                          </option>
                          <option value={enterpriseRecommendedseater + 18}>
                            {enterpriseRecommendedseater + 18}
                          </option>
                          <option value={enterpriseRecommendedseater + 19}>
                            {enterpriseRecommendedseater + 19}
                          </option>
                          <option value={enterpriseRecommendedseater + 20}>
                            {enterpriseRecommendedseater + 20}
                          </option>
                          <option value={enterpriseRecommendedseater + 21}>
                            {enterpriseRecommendedseater + 21}
                          </option>
                          <option value={enterpriseRecommendedseater + 22}>
                            {enterpriseRecommendedseater + 22}
                          </option>
                          <option value={enterpriseRecommendedseater + 23}>
                            {enterpriseRecommendedseater + 23}
                          </option>
                          <option value={enterpriseRecommendedseater + 24}>
                            {enterpriseRecommendedseater + 24}
                          </option>
                          <option value={enterpriseRecommendedseater + 25}>
                            {enterpriseRecommendedseater + 25}
                          </option>
                        </select>
                      ) : null}
                      <div style={{ fontSize: "10" }}>
                        (Applicable only for dedicated model)
                      </div>
                      {enterpriseModel == "Dedicated" &&
                        submitted &&
                        !enterpriseSeatCount &&
                        this.state.checked2 && (
                          <div style={{ fontSize: 12, color: "red" }}>
                            This field is required
                          </div>
                        )}
                      {enterpriseModel == "Dedicated" &&
                        submitted &&
                        enterpriseSeatCount &&
                        enterpriseSeatCount < enterpriseRecommendedseater &&
                        this.state.checked2 && (
                          <div style={{ fontSize: 12, color: "red" }}>
                            Minimum seat count is {enterpriseRecommendedseater}
                          </div>
                        )}
                    </Form.Group>
                  ) : null}

                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="enterpriseRecommendedModel"
                  >
                    <Form.Label>Recommended Commercial Model</Form.Label>

                    <input
                      type="text"
                      className="form-control cs-lable"
                      style={{
                       // backgroundColor: "#FFA500",
                        color: "white",
                        fontWeight: "bold",
                      }}
                      disabled="true"
                      name="enterpriseRecommendedModel"
                      value={enterpriseRecommendedModel}
                    />
                  </Form.Group>

                  {/* { enterpriseShowCSeater && enterpriseModel!=="Dedicated"?    <Form.Group as={Col} md="4" controlId="enterpriseRecommendedseater">
                  <Form.Label>Recommended Resources</Form.Label>
                  <input type="text"  style={{backgroundColor:'#FFA500',color:'white',fontWeight:'bold'}}   className="form-control" required pattern="[0-9a-zA-Z_.-]*"
        onChange={this.enterprisehandleChange}   disabled="ture"  name="enterpriseRecommendedseater" value={enterpriseRecommendedseater} />
                     <div style={{fontSize:'10'}}>(Based on chosen Commercial Model)</div>
                </Form.Group>:null} */}

                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="enterpriseRecommendedPrice"
                  >
                    <Form.Label>Recommended Model Price(Per Month)</Form.Label>
                    <input
                      type="text"
                      className="form-control cs-lable"
                      style={{
                    //    backgroundColor: "#FFA500",
                        color: "white",
                        fontWeight: "bold",
                      }}
                      disabled="true"
                      name="enterpriseRecommendedPrice"
                      value={enterpriseRecommendedPrice + " $"}
                    />
                  </Form.Group>
                  {/* <Form.Group as={Col} md="4" controlId="litePaymentTerms">
               <Form.Label>Payment Terms</Form.Label>
               <input type="text" disabled="true" className="form-control" style={this.state.checked1 ?{backgroundColor:'#fff'}:null}
 name="litePaymentTerms" value={this.state.litePaymentTerms} />
             </Form.Group> */}

                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="enterprisePaymentTerms"
                  >
                    <Form.Label>Payment Terms</Form.Label>
                    {enterpriseModel == "PPU" ? (
                      // <select type="dropdown"  disabled={!this.state.checked2} className="form-control" name="enterprisePaymentTerms" value={this.state.enterprisePaymentTerms}
                      //   placeholder='select' onChange={()=>{this.setState({enterprisePaymentTerms:"Yearly"})}}>
                      //   <option value=""></option>
                      //   <option value="Yearly">Yearly</option>
                      //   {/* <option  value="Monthly">Monthly</option> */}
                      // </select>
                      <input
                        type="text"
                        disabled="true"
                        className="form-control"
                        name="enterprisePaymentTerms"
                        value={this.state.enterprisePaymentTerms}
                        placeholder="select"
                      />
                    ) : (
                      <select
                        type="dropdown"
                        //disabled={!this.state.checked2}
                        disabled="true"
                        className="form-control"
                        name="enterprisePaymentTerms"
                        value={this.state.enterprisePaymentTerms}
                        placeholder="select"
                        onChange={this.handleChange}
                      >
                        <option value=""></option>
                        <option value="Yearly">Yearly</option>
                        <option value="Monthly">Monthly</option>
                      </select>
                    )}

                    {submitted && !this.state.enterprisePaymentTerms && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        This field is required
                      </div>
                    )}
                  </Form.Group>

                  {/* <Form.Group as={Col} md="4" controlId="enterpriseContractDuration">
               <Form.Label>Contract Duration</Form.Label>
               <input type="text" disabled="true" className="form-control" style={this.state.checked2 ?{backgroundColor:'#fff'}:null}
 name="enterpriseContractDuration" value={this.state.enterpriseContractDuration} />
             </Form.Group> */}

                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="enterpriseContractDuration"
                  >
                    <Form.Label>Subscription Period</Form.Label>

                    <select
                      type="dropdown"
                      //disabled={!this.state.checked2}
                      disabled="true"
                      className="form-control"
                      name="enterpriseContractDuration"
                      value={this.state.enterpriseContractDuration}
                      placeholder="select"
                      onChange={this.handleChange}
                    >
                      <option value=""></option>
                      <option value="1 Year">1 Year</option>
                      <option value="3 Years">3 Years</option>
                    </select>
                    {submitted && !this.state.enterpriseContractDuration && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        This field is required
                      </div>
                    )}
                  </Form.Group>

                  {/* <Form.Group as={Col} md="4" controlId=" liteSupportWindow">
               <Form.Label>Support Window</Form.Label>
               <input type="text" disabled="true" className="form-control" style={this.state.checked2 ?{backgroundColor:'#fff'}:null}
 name=" liteSupportWindow" value={this.state.liteSupportWindow} />
             </Form.Group> */}
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="enterpriseIsTollFreeNumber"
                  >
                    <Form.Label>Toll free number:</Form.Label>
                    <RadioGroup
                      row
                      aria-label="position"
                      name="position"
                      value={this.state.enterpriseIsTollFreeNumber}
                      defaultValue={this.state.premiumIsTollFreeNumber}
                    >
                      <FormControlLabel
                        value="Yes"
                        onColor="#8bc34a"
                        control={<Radio color="primary" />}
                        label="Yes"
                        labelPlacement="End"
                        disabled={!this.state.checked2}
                        onChange={(e) => {
                          this.setState({ enterpriseIsTollFreeNumber: "Yes" });
                        }}
                      />

                      <FormControlLabel
                        value="No"
                        control={<Radio color="primary" />}
                        label="No"
                        labelPlacement="End"
                        disabled={!this.state.checked2}
                        onChange={(e) => {
                          this.setState({ enterpriseIsTollFreeNumber: "No" });
                        }}
                      />
                    </RadioGroup>
                    {/* <RadioGroup value={this.state.enterpriseIsTollFreeNumber} onChange={this.enterpriseRadioButton} horizontal>
                  <RadioButton value="Yes" iconSize={20} color="black" rootColor="black">
                    Yes
  </RadioButton>
                  <RadioButton value="No" iconSize={20} rootColor="black">
                    No
  </RadioButton>
                </RadioGroup> */}
                  </Form.Group>

                  {/* <Form.Group as={Col} md="4" controlId="startDate">
                    <Form.Label>Service Initiation Date</Form.Label>
                    <div className="dateclass">
                      <DatePicker
                        name="enterpriseInitialisationDate"
                        value={this.state.enterpriseInitialisationDate}
                        id="enterpriseInitialisationDate"
                        //value={startDate}
                        style={
                          !this.state.checked2
                            ? { backgroundColor: "#f2f4f2" }
                            : null
                        }
                        disabled={!this.state.checked2}
                        selected={this.state.enterpriseSelectedDate}
                        onChange={(date) =>
                          this.handleChangeEnterpriseStartDate(date)
                        }
                        minDate={new Date(this.state.date)}
                        maxDate={
                          new Date(
                            currentYear,
                            currentMonth + 1,
                            currentDate + 7
                          )
                        }
                      />
                      {submitted &&
                        !this.state.enterpriseInitialisationDate && (
                          <div style={{ fontSize: 12, color: "red" }}>
                            This field is required
                          </div>
                        )}
                    </div>
                  </Form.Group> */}

                  {enterpriseShowESeater ? null : (
                    <Form.Group as={Col} md="4">
                      {" "}
                    </Form.Group>
                  )}
                  {enterpriseShowCSeater ? (
                    <Form.Group as={Col} md="4">
                      {" "}
                    </Form.Group>
                  ) : (
                    <Form.Group as={Col} md="4">
                      {" "}
                    </Form.Group>
                  )}
                  {enterpriseShowCSeater && enterpriseModel !== "PPU" ? null : (
                    <Form.Group as={Col} md="8">
                      {" "}
                    </Form.Group>
                  )}
                  {enterpriseShowCSeater &&
                  enterpriseModel !== "Shared" ? null : (
                    <Form.Group as={Col} md="8">
                      {" "}
                    </Form.Group>
                  )}

                  <Form.Group as={Col} md="4" controlId="enterpriseCheck">
                    <Form.Label> </Form.Label>
                    <br /> <br />
                    <Form.Check
                      type="checkbox"
                      label="Proceed with recommended"
                      onClick={(event) => this.enterpriseClick(event)}
                      id="enterpriseCheck"
                      checked={this.state.enterpriseClick}
                      disabled={!this.state.checked2}
                    />
                  </Form.Group>
                </Form.Row>
              ) : null}
            </Form>
          ) : null}

          <br />

          {premiumModel ? (
            <Form className="col-md-12">
              <Form.Row
                style={{
                  backgroundColor: "#0950a1",
                  fontSize: 20,
                  borderRadius: 12,
                }}
              >
                <div className="col-md-1">
                <Form.Label style={{ fontSize: 20, marginBlock: "10px",color:"#fff",paddingLeft:"10px" }}>
                    Premium
                  </Form.Label>
                </div>
                <div className="col-md-10" />
                <div className="col-md-1 my-2" >
                  {tokenPremium ? (
                    <button
                      type="button"
                       className="btn cur-p-cs "
                       style={{ backgroundColor: "#0950a1",border:" 1px solid #fff" }}
                       onClick={() => this.switch3()}
                    >
                      <i
                        className={
                          this.state.checked3
                            ? "c-white-500 ti-back-left"
                            : "c-white-500 ti-pencil"
                        }
                      />
                    </button>
                  ) : (
                    <Switch
                      checked={this.state.checked3}
                      onChange={this.switch3}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={20}
                      width={48}
                    />
                  )}
                </div>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md="4" controlId="premiumModel">
                  <Form.Label>Commercial Model</Form.Label>
                  <select
                    type="dropdown"
                    className="form-control"
                    name="premiumModel"
                    value={premiumModel}
                    disabled={!this.state.checked3}
                    placeholder="select"
                    onChange={this.premiumhandleChange}
                  >
                    <option value=""></option>
                    <option value="PPU">PPU</option>
                    <option value="Shared">Shared</option>
                    <option value="Dedicated">Dedicated</option>
                  </select>

                  {/* <input   disabled={!this.state.checked3}  style={this.state.checked3?{backgroundColor:'white'}:null}  className="form-control"
        name="premiumModel" value={this.state.checked3?premiumModel:null} /> */}
                  {submitted && !premiumModel && this.state.checked3 && (
                    <div style={{ fontSize: 12, color: "red" }}>
                      This field is required
                    </div>
                  )}
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="premiumticketVol">
                  <Form.Label>Ticket Vol/Month</Form.Label>
                  <input
                    type="text"
                    style={
                      !this.state.checked3
                        ? { backgroundColor: "#f2f4f2" }
                        : null
                    }
                    className="form-control"
                    required
                    pattern="[0-9a-zA-Z_.-]*"
                    onChange={this.premiumhandleChange}
                    disabled={!this.state.checked3}
                    name="premiumticketVol"
                    value={premiumticketVol}
                  />
                  {submitted && !premiumticketVol && this.state.checked3 && (
                    <div style={{ fontSize: 12, color: "red" }}>
                      This field is required
                    </div>
                  )}
                  {premiumticketVol && premiumticketVol < 50 && (
                    <p style={{ color: "red" }}>
                      Volume should be greater than 50
                    </p>
                  )}
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="premiumSupportWindow">
                  <Form.Label>Support Window</Form.Label>

                  <Select
                    onChange={this.premiumHandleChange}
                    isDisabled={!this.state.checked3}
                    value={{
                      label: this.state.premiumserviceSupport,
                      value: this.state.premiumserviceSupport,
                    }}
                    role={country}
                    options={serviceSupportsOption}
                    name="premiumserviceSupport"
                  />

                  <div style={{ fontSize: "10" }}>
                    (Please choose customize option for multi select)
                  </div>
                  {submitted &&
                    !premiumserviceSupport &&
                    this.state.checked3 && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        This field is required
                      </div>
                    )}
                </Form.Group>
                {/* <Form.Group as={Col} md="4" controlId="premiumSelectedModelPrice">
              <Form.Label>Selected Model Price(Per Month)</Form.Label>
              <input type="text"   disabled="true" className="form-control"  style={this.state.checked3 ?{backgroundColor:'#fff'}:null}
name="premiumSelectedModelPrice" value={premiumSelectedModelPrice} />
            </Form.Group> */}
              </Form.Row>

              {premiumShow ? (
                <Form.Row>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="premiumSelectedModelPrice"
                  >
                    <Form.Label>Selected Model Price(Per Month)</Form.Label>
                    <input
                      type="text"
                      disabled="true"
                      className="form-control"
                      style={
                        this.state.checked3 ? { backgroundColor: "#fff" } : null
                      }
                      name="premiumSelectedModelPrice"
                      value={premiumSelectedModelPrice + " $"}
                    />
                  </Form.Group>

                  {premiumShowESeater ? (
                    <Form.Group as={Col} md="4" controlId="premiumSeatCount">
                      <Form.Label>
                        Number of Resources (Min count{" "}
                        {premiumRecommendedseater})
                      </Form.Label>
                      {premiumModel == "Dedicated" ? (
                        <select
                          type="text"
                          className="form-control"
                          required
                          pattern="[0-9a-zA-Z_.-]*"
                          onChange={this.premiumResourceshandleChange}
                          disabled={!this.state.checked3}
                          name="premiumSeatCount"
                          value={premiumSeatCount}
                        >
                          <option value={premiumRecommendedseater}>
                            {premiumRecommendedseater}
                          </option>
                          <option value={premiumRecommendedseater + 1}>
                            {premiumRecommendedseater + 1}
                          </option>
                          <option value={premiumRecommendedseater + 2}>
                            {premiumRecommendedseater + 2}
                          </option>
                          <option value={premiumRecommendedseater + 3}>
                            {premiumRecommendedseater + 3}
                          </option>
                          <option value={premiumRecommendedseater + 4}>
                            {premiumRecommendedseater + 4}
                          </option>
                          <option value={premiumRecommendedseater + 5}>
                            {premiumRecommendedseater + 5}
                          </option>
                          <option value={premiumRecommendedseater + 6}>
                            {premiumRecommendedseater + 6}
                          </option>
                          <option value={premiumRecommendedseater + 7}>
                            {premiumRecommendedseater + 7}
                          </option>
                          <option value={premiumRecommendedseater + 8}>
                            {premiumRecommendedseater + 8}
                          </option>
                          <option value={premiumRecommendedseater + 9}>
                            {premiumRecommendedseater + 9}
                          </option>
                          <option value={premiumRecommendedseater + 10}>
                            {premiumRecommendedseater + 10}
                          </option>
                          <option value={premiumRecommendedseater + 11}>
                            {premiumRecommendedseater + 11}
                          </option>
                          <option value={premiumRecommendedseater + 12}>
                            {premiumRecommendedseater + 12}
                          </option>
                          <option value={premiumRecommendedseater + 13}>
                            {premiumRecommendedseater + 13}
                          </option>
                          <option value={premiumRecommendedseater + 14}>
                            {premiumRecommendedseater + 14}
                          </option>
                          <option value={premiumRecommendedseater + 15}>
                            {premiumRecommendedseater + 15}
                          </option>
                          <option value={premiumRecommendedseater + 16}>
                            {premiumRecommendedseater + 16}
                          </option>
                          <option value={premiumRecommendedseater + 17}>
                            {premiumRecommendedseater + 17}
                          </option>
                          <option value={premiumRecommendedseater + 18}>
                            {premiumRecommendedseater + 18}
                          </option>
                          <option value={premiumRecommendedseater + 19}>
                            {premiumRecommendedseater + 19}
                          </option>
                          <option value={premiumRecommendedseater + 20}>
                            {premiumRecommendedseater + 20}
                          </option>
                          <option value={premiumRecommendedseater + 21}>
                            {premiumRecommendedseater + 21}
                          </option>
                          <option value={premiumRecommendedseater + 22}>
                            {premiumRecommendedseater + 22}
                          </option>
                          <option value={premiumRecommendedseater + 23}>
                            {premiumRecommendedseater + 23}
                          </option>
                          <option value={premiumRecommendedseater + 24}>
                            {premiumRecommendedseater + 24}
                          </option>
                          <option value={premiumRecommendedseater + 25}>
                            {premiumRecommendedseater + 25}
                          </option>
                        </select>
                      ) : null}
                      <div style={{ fontSize: "10" }}>
                        (Applicable only for dedicated model)
                      </div>
                      {premiumModel == "Dedicated" &&
                        submitted &&
                        !premiumSeatCount &&
                        this.state.checked3 && (
                          <div style={{ fontSize: 12, color: "red" }}>
                            This field is required
                          </div>
                        )}
                      {premiumModel == "Dedicated" &&
                        submitted &&
                        premiumSeatCount &&
                        premiumSeatCount < premiumRecommendedseater &&
                        this.state.checked3 && (
                          <div style={{ fontSize: 12, color: "red" }}>
                            Minimum seat count is {premiumRecommendedseater}
                          </div>
                        )}
                    </Form.Group>
                  ) : null}

                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="premiumRecommendedModel"
                  >
                    <Form.Label>Recommended Commercial Model</Form.Label>
                    <input
                      type="text"
                      className="form-control cs-lable"
                      style={{
                       // backgroundColor: "#FFA500",
                        color: "white",
                        fontWeight: "bold",
                      }}
                      disabled="true"
                      name="premiumRecommendedModel"
                      value={premiumRecommendedModel}
                    />
                  </Form.Group>

                  {/* {premiumShowCSeater & premiumModel !=="Dedicated"?<Form.Group as={Col} md="4" controlId="premiumRecommendedseater">
                <Form.Label>Recommended Resources</Form.Label>
              <input type="text"  style={{backgroundColor:'#FFA500'}}   className="form-control" required pattern="[0-9a-zA-Z_.-]*"
      onChange={this.premiumhandleChange}   disabled="true"   name="premiumRecommendedseater" value={premiumRecommendedseater} />
                      <div style={{fontSize:'10'}}>(Based on chosen Commercial Model)</div>
              </Form.Group>:null} */}

                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="premiumRecommendedPrice"
                  >
                    <Form.Label>Recommended Model Price(Per Month)</Form.Label>
                    <input
                      type="text"
                      style={{
                      //  backgroundColor: "#FFA500",
                        color: "white",
                        fontWeight: "bold",
                      }}
                      className="form-control cs-lable"
                      disabled="true"
                      name="premiumRecommendedPrice"
                      value={premiumRecommendedPrice + " $"}
                    />
                  </Form.Group>
{/* ------------------------------future enhancement--------------------------------- */}
                  {/* {premiumShowCSeater && premiumModel === "Dedicated" ? (
                    <Form.Group
                      as={Col}
                      md="4"
                      controlId="premiumRecommendedseater"
                    >
                      <Form.Label>Recommended seater</Form.Label>
                      <input
                        type="text"
                        style={{
                          backgroundColor: "#FFA500",
                          color: "white",
                          fontWeight: "bold",
                        }}
                        className="form-control"
                        required
                        pattern="[0-9a-zA-Z_.-]*"
                        onChange={this.premiumhandleChange}
                        disabled="true"
                        name="premiumRecommendedseater"
                        value={premiumRecommendedseater}
                      />
                      <div style={{ fontSize: "10" }}>
                        (Based on chosen Commercial Model)
                      </div>
                    </Form.Group>
                  ) : null} */}

                  {/* <Form.Group as={Col} md="4" controlId="premiumPaymentTerms">
               <Form.Label>Payment Terms</Form.Label>
               <input type="text" disabled="true" className="form-control" style={this.state.checked1 ?{backgroundColor:'#fff'}:null}
 name="premiumPaymentTerms" value={this.state.premiumPaymentTerms} />
             </Form.Group> */}

                  <Form.Group as={Col} md="4" controlId="premiumPaymentTerms">
                    <Form.Label>Payment Terms</Form.Label>
                    {premiumModel == "PPU" ? (
                      /*<select type="dropdown"  disabled={!this.state.checked3} className="form-control" name="premiumPaymentTerms" value={this.state.premiumPaymentTerms}
                    placeholder='select' onChange={()=>{this.setState({premiumPaymentTerms:"Yearly"})}}>
                    <option value=""></option>
                    <option value="Yearly">Yearly</option>
                    <input type="text"  disabled="true" className="form-control" name="premiumPaymentTerms" value={this.state.premiumPaymentTerms}
                    placeholder='select' onChange={()=>{this.setState({premiumPaymentTerms:"Yearly"})}}/>

                  </select>*/
                      <input
                        type="text"
                        disabled="true"
                        className="form-control"
                        name="premiumPaymentTerms"
                        value={this.state.premiumPaymentTerms}
                        placeholder="select"
                      />
                    ) : (
                      <select
                        type="dropdown"
                        //disabled={!this.state.checked3}
                        disabled="true"
                        className="form-control"
                        name="premiumPaymentTerms"
                        value={this.state.premiumPaymentTerms}
                        placeholder="select"
                        onChange={this.handleChange}
                      >
                        <option value=""></option>
                        <option value="Yearly">Yearly</option>
                        <option value="Monthly">Monthly</option>
                      </select>
                    )}

                    {submitted && !this.state.premiumPaymentTerms && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        This field is required
                      </div>
                    )}
                  </Form.Group>

                  {/* <Form.Group as={Col} md="4" controlId="premiumContractDuration">
               <Form.Label>Contract Duration</Form.Label>
               <input type="text" disabled="true" className="form-control" style={this.state.checked3 ?{backgroundColor:'#fff'}:null}
 name="premiumContractDuration" value={this.state.premiumContractDuration} />
             </Form.Group> */}

                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="premiumContractDuration"
                  >
                    <Form.Label>Subscription Period</Form.Label>

                    <select
                      type="dropdown"
                     // disabled={!this.state.checked3}
                      disabled="true"
                      className="form-control"
                      name="premiumContractDuration"
                      value={this.state.premiumContractDuration}
                      placeholder="select"
                      onChange={this.handleChange}
                    >
                      <option value=""></option>
                      <option value="1 Year">1 Year</option>
                      <option value="3 Years">3 Years</option>
                    </select>
                    {submitted && !this.state.premiumContractDuration && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        This field is required
                      </div>
                    )}
                  </Form.Group>

                  {/* <Form.Group as={Col} md="4" controlId=" liteSupportWindow">
               <Form.Label>Support Window</Form.Label>
               <input type="text" disabled="true" className="form-control" style={this.state.checked3 ?{backgroundColor:'#fff'}:null}
 name=" liteSupportWindow" value={this.state.liteSupportWindow} />
             </Form.Group> */}
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="premiumIsTollFreeNumber"
                  >
                    <Form.Label>Toll free number:</Form.Label>
                    <RadioGroup
                      row
                      aria-label="position"
                      name="position"
                      value={this.state.premiumIsTollFreeNumber}
                      defaultValue={this.state.premiumIsTollFreeNumber}
                    >
                      <FormControlLabel
                        value="Yes"
                        onColor="#8bc34a"
                        control={<Radio color="primary" />}
                        label="Yes"
                        labelPlacement="End"
                        disabled={!this.state.checked3}
                        onChange={(e) => {
                          this.setState({ premiumIsTollFreeNumber: "Yes" });
                        }}
                      />

                      <FormControlLabel
                        value="No"
                        control={<Radio color="primary" />}
                        label="No"
                        labelPlacement="End"
                        disabled={!this.state.checked3}
                        onChange={(e) => {
                          this.setState({ premiumIsTollFreeNumber: "No" });
                        }}
                      />
                    </RadioGroup>
                    {/* <RadioGroup  value={this.state.premiumIsTollFreeNumber} onChange={this.premiumRadioButton} horizontal>
                  <RadioButton disabled={this.state.premiumIsTollFreeNumber!==""?!this.state.checked3:null}  value="Yes" iconSize={20} color="black" rootColor="black">
                    Yes
  </RadioButton>
                  <RadioButton disabled={this.state.premiumIsTollFreeNumber!==""?!this.state.checked3:null}  value="No" iconSize={20} rootColor="black">
                    No
  </RadioButton>
                </RadioGroup> */}
                  </Form.Group>
                  {/*
                  <Form.Group>
                    <Form.Label>Service Initiation Date</Form.Label>
                    <div
                      className="dateclass"
                      style={
                        !this.state.checked3
                          ? { backgroundColor: "#f2f4f2" }
                          : null
                      }
                    >
                      <DatePicker
                        name="premiumInitialisationDate"
                        value={this.state.premiumInitialisationDate}
                        id="premiumInitialisationDate"
                        //value={startDate}
                        //  Style={!this.state.checked3?{backgroundColor:'#f2f4f2'}:null}
                        //  style={!this.state.checked3?{backgroundColor:'#f2f4f2'}:null}
                        disabled={!this.state.checked3}
                        selected={this.state.premiumSelectedDate}
                        onChange={(date) =>
                          this.handleChangePremiumStartDate(date)
                        }
                        minDate={new Date(this.state.date)}
                        maxDate={
                          new Date(
                            currentYear,
                            currentMonth + 1,
                            currentDate + 7
                          )
                        }
                      />
                      {submitted && !this.state.premiumInitialisationDate && (
                        <div style={{ fontSize: 12, color: "red" }}>
                          This field is required
                        </div>
                      )}
                    </div>
                  </Form.Group> */}

                  {premiumShowESeater ? null : (
                    <Form.Group as={Col} md="4" controlId="liteSeatCount">
                      {" "}
                    </Form.Group>
                  )}
                  {premiumShowCSeater ? null : (
                    <Form.Group as={Col} md="4" controlId="liteSeatCount">
                      {" "}
                    </Form.Group>
                  )}
                  {premiumShowCSeater && premiumModel !== "PPU" ? null : (
                    <Form.Group as={Col} md="8">
                      {" "}
                    </Form.Group>
                  )}
                  {premiumShowCSeater && premiumModel !== "Shared" ? null : (
                    <Form.Group as={Col} md="8">
                      {" "}
                    </Form.Group>
                  )}

                  <Form.Group as={Col} md="4" controlId="premiumCheck">
                    <Form.Label> </Form.Label>
                    <br /> <br />
                    <Form.Check
                      type="checkbox"
                      label="Proceed with recommended"
                      onClick={(event) => this.premiumClick(event)}
                      id="premiumCheck"
                      checked={this.state.premiumClick}
                      disabled={!this.state.checked3}
                    />
                  </Form.Group>
                </Form.Row>
              ) : null}
            </Form>
          ) : null}

          <br />
          {/*}   <Form>
      <Form.Row>
      <Form.Group>
      <Form.Label>Toll free number call forwarding required:</Form.Label>
      <RadioGroup onChange={ this.radioButton } horizontal>
  <RadioButton value="yes" iconSize={20} color="black" rootColor="black">
    Yes
  </RadioButton>
  <RadioButton value="No" iconSize={20} rootColor="black">
    No
  </RadioButton>
</RadioGroup>
{submitted && !TollFreeNumber &&  <div style ={{fontSize:12,color:"red"}}>This field is required</div>}
        </Form.Group>
        </Form.Row>
      </Form>

          */}
          {/*
<Form>
<Form.Row>
                <Form.Group as={Col} md="4" controlId="ContractDuration">
                  <Form.Label>Subscription Period</Form.Label>

                  <select type="dropdown" disabled={true} className="form-control" name="ContractDuration" value={ContractDuration}
                        placeholder='select' onChange={this.handleChange}>
                                        <option  value=""></option>
                                        <option  value="Pay Per use">Pay Per use</option>
                                        <option  value="1 Year">1 Year</option>
                                        <option  value="3 Years">3 Years</option>
                               </select>
           {submitted && !ContractDuration &&  <div style ={{fontSize:12,color:"red"}}>This field is required</div>}
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="InitiationDate">
                  <Form.Label>Payment Terms</Form.Label>
                 {/* {( (liteModel=="PPU")|| (premiumModel=="PPU") || (enterpriseModel=="PPU") ) ?
                  <select type="dropdown" className="form-control" name="PaymentTerms" value={PaymentTerms}
                  placeholder='select' onChange={this.handleChange}>
                           <option  value=""></option>
                   <option  value="Yearly">Yearly</option>
                   <option  value="Monthly">Monthly</option>
                         </select>:
                 <select type="dropdown" className="form-control" name="PaymentTerms" value={PaymentTerms}
                        placeholder='select' onChange={this.handleChange}>
                                 <option  value=""></option>
                         <option  value="Yearly">Yearly</option>
                         <option  value="Monthly">Monthly</option>
                               </select>} */}
          {/*    <select type="dropdown" disabled={true} className="form-control" name="PaymentTerms" value={PaymentTerms}
                        placeholder='select' onChange={this.handleChange}>
                                 <option  value=""></option>
                         <option  value="Yearly">Yearly</option>
                         <option  value="Monthly">Monthly</option>
                               </select>
                               {submitted && !PaymentTerms &&  <div style ={{fontSize:12,color:"red"}}>This field is required</div>}
                </Form.Group>


                <Form.Group as={Col} md="4" controlId="startDate">
                  <Form.Label>Service Initiation Date</Form.Label>
                  <div className="dateclass"  >
                       <DatePicker
                          name="startDate"
                          value={startDate}
                          id="startDate"
                          readOnly={true}
                          onChange={this.handleChangeStartDate}
                         minDate={new Date(this.state.date)}
                         maxDate={new Date(currentYear, currentMonth+1, currentDate+7)}

                      />
 {submitted && !startDate &&  <div style ={{fontSize:12,color:"red"}}>This field is required</div>}
              </div>
              </Form.Group>
              </Form.Row>
</Form>
                              */}
          <br />
          <br />
          <Form.Row>
            <Form.Group as={Col} md="10" />
            <Form.Group as={Col} md="2" controlId="startDate">
              <button
                type="button"
                className="genric-btn primary radius text-uppercase"
                onClick={() => this.claculatePrice()}
              >
                CALCULATE PRICE
              </button>
            </Form.Group>
          </Form.Row>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <Modal
            show={this.state.showDedicatedCustomice}
            onHide={this.DedicatedCustomiceModel}
            backdrop={"static"}
          >
            <Modal.Header closeButton>
              <h5 className="text-center">
                <span>Contact Us </span>
              </h5>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <div className="row">
                  {/* <div className="col-md-5" >
                    <label htmlFor="name" style={{ fontFamily: 'nosRegular', fontSize: '14px' }}>Name</label>
                  </div> */}
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      name="yourName"
                      value={yourName}
                      onChange={this.Change}
                      placeholder="Your Name*"
                    />
                    {sendMail && !yourName && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        Your Name is required
                      </div>
                    )}
                    {sendMail &&
                      this.state.yourNameError !== "" &&
                      yourName && (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.subjectError}
                        </div>
                      )}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  {/* <div className="col-md-5" >
                    <label htmlFor="name" style={{ fontFamily: 'nosRegular', fontSize: '14px', textAlign: 'center' }}>Email</label>
                  </div> */}
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      name="workMail"
                      value={workMail}
                      onChange={this.handleChanges}
                      placeholder="Your Email*"
                    />
                    {sendMail && !workMail && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        Email is required
                      </div>
                    )}
                    {sendMail && this.state.emailError !== "" && workMail && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.emailError}
                      </div>
                    )}{" "}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  {/* <div className="col-md-5" >
                    <label htmlFor="name" style={{ fontFamily: 'nosRegular', fontSize: '14px', textAlign: 'center' }}>Subject</label>
                  </div> */}
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      name="yourSubject"
                      value={yourSubject}
                      onChange={this.changeSubject}
                      placeholder="Your Subject*"
                    />
                    {sendMail && !yourSubject && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        Your Subject is required
                      </div>
                    )}
                    {/* {sendMail &&  this.state.yourSubjectError !=="" && yourSubject &&
                                                        <div style ={{fontSize:12,color:"red"}}>{this.state.subjectError}</div>
                                                        } */}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  {/* <div className="col-md-5" >
                    <label htmlFor="name" style={{ fontFamily: 'nosRegular', fontSize: '14px', textAlign: 'center' }}>Message</label>
                  </div> */}
                  <div className="col-md-12">
                    <textarea
                      className="form-control"
                      name="message"
                      value={message}
                      onChange={this.changeSubject}
                      placeholder="Your Message*"
                    />
                    {sendMail && !message && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        Message is required
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={(e) => this.sendMail()}
                className="buttons"
              >
                SEND
              </button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={liteModels == "Customize"}
            onHide={this.handleCloseLite}
            backdrop={"static"}
          >
            <Modal.Header closeButton>
              <h5 className="text-center">
                <span>Customize Support Window</span>
              </h5>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                    >
                      Choose Time Zone
                    </label>
                  </div>
                  <div className="col-md-8">
                    <Select
                      onChange={(evt) => this.liteTimeZone(evt)}
                      isSearchable={true}
                      value={{
                        label: this.state.liteTimezone,
                        value: this.state.liteTimezone,
                      }}
                      role={country}
                      options={timezoneOption}
                      name="country"
                    />
                    {this.state.liteModelsSubmit !== "false" &&
                      !this.state.liteTimezone && (
                        <div style={{ fontSize: 12, color: "red" }}>
                          This field is required
                        </div>
                      )}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                    >
                      Days in a week
                    </label>
                  </div>
                  <div className="col-md-8">
                    <Multiselect
                      options={
                        this.state.days !== []
                          ? this.state.days
                          : [{ label: "No Option", value: "No Option" }]
                      }
                      ref={this.liteDateRef}
                      displayValue="value"
                      showCheckbox={false}
                      avoidHighlightFirstOption={true}
                      id="productdd"
                      disablePreSelectedValues={true}
                      closeOnSelect={false}
                      name="responseproduct"
                      onSelect={(evt) => this.selectDateLite(evt)}
                      onRemove={(evt) => this.removeDateLite(evt)}
                    />{" "}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-md-2">
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                    >
                      Start Time
                    </label>
                  </div>
                  <div className="col-md-4">
                    <Select
                      onChange={this.handleSelectChangeStartTime}
                      isDisabled={!!this.state.liteTimezone ? false : true}
                      isSearchable={true}
                      options={this.state.littTimeSlot}
                      value={{ label: startTime, value: startTime }}
                      name={"country"}
                    />{" "}
                  </div>
                  <div className="col-md-2">
                    <label
                      htmlFor="name"
                      style={{
                        fontFamily: "nosRegular",
                        fontSize: "14px",
                        textAlign: "center",
                      }}
                    >
                      End Time
                    </label>
                  </div>
                  <div className="col-md-4">
                    <Select
                      onChange={this.handleSelectChangeEndTime}
                      isDisabled={!!this.state.liteTimezone ? false : true}
                      isSearchable={true}
                      options={this.state.littTimeSlot}
                      value={{ label: endTime, value: endTime }}
                      name={"endTime"}
                    />{" "}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-md-10" />
                  <div className="col-md-2">
                    <button
                      type="button"
                      onClick={() => this.addLite()}
                      className="btn-success"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-12 scroll">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Days</th>
                          <th scope="col">Start Time</th>
                          <th scope="col">End Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.dataLite &&
                          this.state.dataLite.map((user, userkey) => (
                            <tr key={userkey}>
                              <td scope="row">{user.dayList}</td>
                              <td>{user.startTime}</td>
                              <td>{user.endTime}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-10" />
                        <div className="col-md-2">
                          <button
                            type="button"
                            onClick={() => this.clearLite()}
                            className="btn-danger"
                          >
                            CLEAR
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={(e) => this.liteAdd("Customize")}
                className="buttons"
              >
                SUBMIT
              </button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={liteModels == "8 X 5 Weekdays (office hours support)"}
            onHide={(e) =>
              this.handleCloseLite("8 X 5 Weekdays (office hours support)")
            }
            backdrop={"static"}
          >
            <Modal.Header closeButton>
              <h5 className="text-center">
                <span>8 X 5 Support Window</span>
              </h5>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                    >
                      Choose Time Zone
                    </label>
                  </div>
                  <div className="col-md-8">
                    <Select
                      onChange={(evt) => this.liteTimeZone(evt)}
                      isSearchable={true}
                      value={{
                        label: this.state.liteTimezone,
                        value: this.state.liteTimezone,
                      }}
                      role={country}
                      options={timezoneOption}
                      name="country"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-md-2">
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                    >
                      Start Time
                    </label>
                  </div>
                  <div className="col-md-4">
                    <Select
                      onChange={this.handleSelectChangeLiteStartTime}
                      isDisabled={!!this.state.liteTimezone ? false : true}
                      isSearchable={true}
                      options={this.state.littTimeSlot}
                      value={{ label: liteStartTime, value: liteStartTime }}
                      name={"liteStartTime"}
                    />{" "}
                  </div>
                  <div className="col-md-2">
                    <label
                      htmlFor="name"
                      style={{
                        fontFamily: "nosRegular",
                        fontSize: "14px",
                        textAlign: "center",
                      }}
                    >
                      End Time
                    </label>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      disabled="true"
                      className="form-control"
                      style={{ backgroundColor: "#fff" }}
                      name="liteEndTime"
                      value={liteEndTime}
                    />{" "}
                  </div>
                </div>
              </div>
              <div></div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={(e) =>
                  this.liteAdd("8 X 5 Weekdays (office hours support)")
                }
                className="buttons"
              >
                SUBMIT
              </button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={liteModels == "16 X 5 After office hours support"}
            onHide={(e) =>
              this.handleCloseLite("16 X 5 After office hours support")
            }
            backdrop={"static"}
          >
            <Modal.Header closeButton>
              <h5 className="text-center">
                <span>16 X 5 Support Window</span>
              </h5>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                    >
                      Choose Time Zone
                    </label>
                  </div>
                  <div className="col-md-8">
                    <Select
                      onChange={(evt) => this.liteTimeZone(evt)}
                      isSearchable={true}
                      value={{
                        label: this.state.liteTimezone,
                        value: this.state.liteTimezone,
                      }}
                      role={country}
                      options={timezoneOption}
                      name="country"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-md-2">
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                    >
                      Start Time
                    </label>
                  </div>
                  <div className="col-md-4">
                    <Select
                      onChange={this.handleSelectChangeLiteStartTime}
                      isDisabled={!!this.state.liteTimezone ? false : true}
                      isSearchable={true}
                      options={this.state.littTimeSlot}
                      value={{ label: liteStartTime, value: liteStartTime }}
                      name={"liteStartTime"}
                    />{" "}
                  </div>
                  <div className="col-md-2">
                    <label
                      htmlFor="name"
                      style={{
                        fontFamily: "nosRegular",
                        fontSize: "14px",
                        textAlign: "center",
                      }}
                    >
                      End Time
                    </label>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      disabled="true"
                      className="form-control"
                      style={{ backgroundColor: "#fff" }}
                      name="liteEndTime"
                      value={liteEndTime}
                    />
                  </div>
                </div>
              </div>
              <div></div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={(e) =>
                  this.liteAdd("16 X 5 After office hours support")
                }
                className="buttons"
              >
                SUBMIT
              </button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={enterpriseModels == "Customize"}
            onHide={this.handleCloseEnterprise}
            backdrop={"static"}
          >
            <Modal.Header closeButton>
              <h5 className="text-center">
                <span>Customize Support Window</span>
              </h5>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                    >
                      Choose Time Zone
                    </label>
                  </div>
                  <div className="col-md-8">
                    <Select
                      onChange={(evt) => this.enterpriseTimeZone(evt)}
                      isSearchable={true}
                      value={{
                        label: this.state.enterpriseTimezone,
                        value: this.state.enterpriseTimezone,
                      }}
                      role={country}
                      options={timezoneOption}
                      name="country"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                    >
                      Days in a week
                    </label>
                  </div>
                  <div className="col-md-8">
                    <Multiselect
                      options={
                        this.state.days !== []
                          ? this.state.days
                          : [{ label: "No Option", value: "No Option" }]
                      }
                      ref={this.enterpriseDateRef}
                      displayValue="value"
                      showCheckbox={false}
                      avoidHighlightFirstOption={true}
                      id="productdd"
                      disablePreSelectedValues={true}
                      closeOnSelect={false}
                      name="responseproduct"
                      onSelect={(evt) => this.selectDateEnterprise(evt)}
                      onRemove={(evt) => this.removeDateEnterprise(evt)}
                      disabled={this.state.days !== [] ? true : false}
                    />{" "}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-md-2">
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                    >
                      Start Time
                    </label>
                  </div>
                  <div className="col-md-4">
                    <Select
                      onChange={this.handleSelectChangeStartTime}
                      isDisabled={
                        !!this.state.enterpriseTimezone ? false : true
                      }
                      isSearchable={true}
                      options={this.state.littTimeSlot}
                      value={{ label: startTime, value: startTime }}
                      name={"country"}
                    />{" "}
                  </div>
                  <div className="col-md-2">
                    <label
                      htmlFor="name"
                      style={{
                        fontFamily: "nosRegular",
                        fontSize: "14px",
                        textAlign: "center",
                      }}
                    >
                      End Time
                    </label>
                  </div>
                  <div className="col-md-4">
                    <Select
                      onChange={this.handleSelectChangeEndTime}
                      isDisabled={
                        !!this.state.enterpriseTimezone ? false : true
                      }
                      isSearchable={true}
                      options={this.state.littTimeSlot}
                      value={{ label: endTime, value: endTime }}
                      name={"endTime"}
                    />{" "}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-md-10" />
                  <div className="col-md-2">
                    <button
                      type="button"
                      onClick={() => this.addEnterprise()}
                      className="btn-success"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-12 scroll">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Days</th>
                          <th scope="col">Start Time</th>
                          <th scope="col">End Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.dataEnterprise &&
                          this.state.dataEnterprise.map((user, userkey) => (
                            <tr key={userkey}>
                              <td scope="row">{user.dayList}</td>
                              <td>{user.startTime}</td>
                              <td>{user.endTime}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-10" />
                        <div className="col-md-2">
                          <button
                            type="button"
                            onClick={() => this.clearEnterprise()}
                            className="btn-danger"
                          >
                            CLEAR
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={(e) => this.enterpriseAdd("Customize")}
                className="buttons"
              >
                SUBMIT
              </button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={enterpriseModels == "8 X 5 Weekdays (office hours support)"}
            onHide={(e) =>
              this.handleCloseEnterprise(
                "8 X 5 Weekdays (office hours support)"
              )
            }
            backdrop={"static"}
          >
            <Modal.Header closeButton>
              <h5 className="text-center">
                <span>8 X 5 Support Window</span>
              </h5>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                    >
                      Choose Time Zone
                    </label>
                  </div>
                  <div className="col-md-8">
                    <Select
                      onChange={(evt) => this.enterpriseTimeZone(evt)}
                      isSearchable={true}
                      value={{
                        label: this.state.enterpriseTimezone,
                        value: this.state.enterpriseTimezone,
                      }}
                      role={country}
                      options={timezoneOption}
                      name="country"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-md-2">
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                    >
                      Start Time
                    </label>
                  </div>
                  <div className="col-md-4">
                    <Select
                      onChange={this.handleSelectChangeEnterpriseStartTime}
                      isDisabled={
                        !!this.state.enterpriseTimezone ? false : true
                      }
                      isSearchable={true}
                      options={this.state.littTimeSlot}
                      value={{
                        label: enterpriseStartTime,
                        value: enterpriseStartTime,
                      }}
                      name={"enterpriseStartTime"}
                    />{" "}
                  </div>
                  <div className="col-md-2">
                    <label
                      htmlFor="name"
                      style={{
                        fontFamily: "nosRegular",
                        fontSize: "14px",
                        textAlign: "center",
                      }}
                    >
                      End Time
                    </label>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      disabled="true"
                      className="form-control"
                      style={{ backgroundColor: "#fff" }}
                      name="enterpriseEndTime"
                      value={enterpriseEndTime}
                    />{" "}
                  </div>
                </div>
              </div>
              <div></div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={(e) =>
                  this.enterpriseAdd("8 X 5 Weekdays (office hours support)")
                }
                className="buttons"
              >
                SUBMIT
              </button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={enterpriseModels == "16 X 5 After office hours support"}
            onHide={(e) =>
              this.handleCloseEnterprise("16 X 5 After office hours support")
            }
            backdrop={"static"}
          >
            <Modal.Header closeButton>
              <h5 className="text-center">
                <span>16 X 5 Support Window</span>
              </h5>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                    >
                      Choose Time Zone
                    </label>
                  </div>
                  <div className="col-md-8">
                    <Select
                      onChange={(evt) => this.enterpriseTimeZone(evt)}
                      isSearchable={true}
                      value={{
                        label: this.state.enterpriseTimezone,
                        value: this.state.enterpriseTimezone,
                      }}
                      role={country}
                      options={timezoneOption}
                      name="country"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-md-2">
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                    >
                      Start Time
                    </label>
                  </div>
                  <div className="col-md-4">
                    <Select
                      onChange={this.handleSelectChangeEnterpriseStartTime}
                      isDisabled={
                        !!this.state.enterpriseTimezone ? false : true
                      }
                      isSearchable={true}
                      options={this.state.littTimeSlot}
                      value={{
                        label: enterpriseStartTime,
                        value: enterpriseStartTime,
                      }}
                      name={"enterpriseStartTime"}
                    />{" "}
                  </div>
                  <div className="col-md-2">
                    <label
                      htmlFor="name"
                      style={{
                        fontFamily: "nosRegular",
                        fontSize: "14px",
                        textAlign: "center",
                      }}
                    >
                      End Time
                    </label>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      disabled="true"
                      className="form-control"
                      style={{ backgroundColor: "#fff" }}
                      name="enterpriseEndTime"
                      value={enterpriseEndTime}
                    />{" "}
                  </div>
                </div>
              </div>
              <div></div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={(e) =>
                  this.enterpriseAdd("16 X 5 After office hours support")
                }
                className="buttons"
              >
                SUBMIT
              </button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={premiumModels == "Customize"}
            onHide={this.handleClosepremium}
            backdrop={"static"}
          >
            <Modal.Header closeButton>
              <h5 className="text-center">
                <span>Customize Support Window</span>
              </h5>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                    >
                      Choose Time Zone
                    </label>
                  </div>
                  <div className="col-md-8">
                    <Select
                      onChange={(evt) => this.premiumTimeZone(evt)}
                      isSearchable={true}
                      value={{
                        label: this.state.premiumTimezone,
                        value: this.state.premiumTimezone,
                      }}
                      role={country}
                      options={timezoneOption}
                      name="country"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                    >
                      Days in a week
                    </label>
                  </div>
                  <div className="col-md-8">
                    <Multiselect
                      options={
                        this.state.days !== []
                          ? this.state.days
                          : [{ label: "No Option", value: "No Option" }]
                      }
                      ref={this.premiumDateRef}
                      displayValue="value"
                      showCheckbox={false}
                      avoidHighlightFirstOption={true}
                      id="productdd"
                      disablePreSelectedValues={true}
                      closeOnSelect={false}
                      name="responseproduct"
                      onSelect={(evt) => this.selectDatePremium(evt)}
                      onRemove={(evt) => this.removeDatePremium(evt)}
                      disabled={this.state.days !== [] ? true : false}
                    />{" "}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-md-2">
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                    >
                      Start Time
                    </label>
                  </div>
                  <div className="col-md-4">
                    <Select
                      onChange={this.handleSelectChangeStartTime}
                      isDisabled={!!this.state.premiumTimezone ? false : true}
                      isSearchable={true}
                      options={this.state.littTimeSlot}
                      value={{ label: startTime, value: startTime }}
                      name={"country"}
                    />{" "}
                  </div>
                  <div className="col-md-2">
                    <label
                      htmlFor="name"
                      style={{
                        fontFamily: "nosRegular",
                        fontSize: "14px",
                        textAlign: "center",
                      }}
                    >
                      End Time
                    </label>
                  </div>
                  <div className="col-md-4">
                    <Select
                      onChange={this.handleSelectChangeEndTime}
                      isDisabled={!!this.state.premiumTimezone ? false : true}
                      isSearchable={true}
                      options={this.state.littTimeSlot}
                      value={{ label: endTime, value: endTime }}
                      name={"endTime"}
                    />{" "}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-md-10" />
                  <div className="col-md-2">
                    <button
                      type="button"
                      onClick={() => this.addPremium()}
                      className="btn-success"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-12 scroll">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Days</th>
                          <th scope="col">Start Time</th>
                          <th scope="col">End Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.dataPremium &&
                          this.state.dataPremium.map((user, userkey) => (
                            <tr key={userkey}>
                              <td scope="row">{user.dayList}</td>
                              <td>{user.startTime}</td>
                              <td>{user.endTime}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-10" />
                        <div className="col-md-2">
                          <button
                            type="button"
                            onClick={() => this.clearpremium()}
                            className="btn-danger"
                          >
                            CLEAR
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={(e) => this.premiumAdd("Customize")}
                className="buttons"
              >
                SUBMIT
              </button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={premiumModels == "8 X 5 Weekdays (office hours support)"}
            onHide={(e) =>
              this.handleClosepremium("8 X 5 Weekdays (office hours support)")
            }
            backdrop={"static"}
          >
            <Modal.Header closeButton>
              <h5 className="text-center">
                <span>8 X 5 Support Window</span>
              </h5>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                    >
                      Choose Time Zone
                    </label>
                  </div>
                  <div className="col-md-8">
                    <Select
                      onChange={(evt) => this.premiumTimeZone(evt)}
                      isSearchable={true}
                      value={{
                        label: this.state.premiumTimezone,
                        value: this.state.premiumTimezone,
                      }}
                      role={country}
                      options={timezoneOption}
                      name="country"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-md-2">
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                    >
                      Start Time
                    </label>
                  </div>
                  <div className="col-md-4">
                    <Select
                      onChange={this.handleSelectChangePremiumStartTime}
                      isDisabled={!!this.state.premiumTimezone ? false : true}
                      isSearchable={true}
                      options={this.state.littTimeSlot}
                      value={{
                        label: premiumStartTime,
                        value: premiumStartTime,
                      }}
                      name={"premiumStartTime"}
                    />{" "}
                  </div>
                  <div className="col-md-2">
                    <label
                      htmlFor="name"
                      style={{
                        fontFamily: "nosRegular",
                        fontSize: "14px",
                        textAlign: "center",
                      }}
                    >
                      End Time
                    </label>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      disabled="true"
                      className="form-control"
                      style={{ backgroundColor: "#fff" }}
                      name="premiumEndTime"
                      value={premiumEndTime}
                    />{" "}
                  </div>
                </div>
              </div>
              <div></div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={(e) =>
                  this.premiumAdd("8 X 5 Weekdays (office hours support)")
                }
                className="buttons"
              >
                SUBMIT
              </button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={premiumModels == "16 X 5 After office hours support"}
            onHide={(e) =>
              this.handleClosepremium("16 X 5 After office hours support")
            }
            backdrop={"static"}
          >
            <Modal.Header closeButton>
              <h5 className="text-center">
                <span>16 X 5 Support Window</span>
              </h5>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                    >
                      Choose Time Zone
                    </label>
                  </div>
                  <div className="col-md-8">
                    <Select
                      onChange={(evt) => this.premiumTimeZone(evt)}
                      isSearchable={true}
                      value={{
                        label: this.state.premiumTimezone,
                        value: this.state.premiumTimezone,
                      }}
                      role={country}
                      options={timezoneOption}
                      name="country"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-md-2">
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                    >
                      Start Time
                    </label>
                  </div>
                  <div className="col-md-4">
                    <Select
                      onChange={this.handleSelectChangePremiumStartTime}
                      isDisabled={!!this.state.premiumTimezone ? false : true}
                      isSearchable={true}
                      options={this.state.littTimeSlot}
                      value={{
                        label: premiumStartTime,
                        value: premiumStartTime,
                      }}
                      name={"premiumStartTime"}
                    />{" "}
                  </div>
                  <div className="col-md-2">
                    <label
                      htmlFor="name"
                      style={{
                        fontFamily: "nosRegular",
                        fontSize: "14px",
                        textAlign: "center",
                      }}
                    >
                      End Time
                    </label>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      disabled="true"
                      className="form-control"
                      style={{ backgroundColor: "#fff" }}
                      name="premiumEndTime"
                      value={premiumEndTime}
                    />{" "}
                  </div>
                </div>
              </div>
              <div></div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={(e) =>
                  this.premiumAdd("16 X 5 After office hours support")
                }
                className="buttons"
              >
                SUBMIT
              </button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={this.state.showCheckStatus === true}
            onHide={() => this.handleCloseCheckStatus()}
            backdrop={"static"}
          >
            <Modal.Header className="text-center" closeButton>
              <h5 className="text-center">
                <Modal.Title style={{ textAlign: "center", marginTop: 10 }}>
                  Plan Status
                </Modal.Title>
              </h5>
            </Modal.Header>
            <Modal.Body>
              <table className="schdule-table table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th
                      className="head"
                      scope="col"
                      style={{ fontSize: 14, fontFamily: "Poppins" }}
                    >
                      Plan
                    </th>
                    <th
                      className="head"
                      scope="col"
                      style={{ fontSize: 14, fontFamily: "Poppins" }}
                    >
                      Status
                    </th>
                    <th
                      className="head"
                      scope="col"
                      style={{ fontSize: 14, fontFamily: "Poppins" }}
                    >
                      Service Initiation Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.recivedcheckStatus &&
                    this.props.recivedcheckStatus.updatePlanRequestList !==
                      undefined &&
                    this.props.recivedcheckStatus.updatePlanRequestList.length >
                      0 &&
                    this.props.recivedcheckStatus.updatePlanRequestList.map(
                      (plan, plankey) => (
                        <tr key={plankey}>
                          <td className="name" scope="row">
                            {plan.plan}{" "}
                          </td>
                          <td className="name" scope="row">
                            {plan.planStatus}{" "}
                          </td>
                          <td className="name" scope="row">
                            {
                              <div className="dateclass">
                                <DatePicker
                                  name="premiumInitialisationDate"
                                  value={
                                    plan.plan === "Lite"
                                      ? this.state.liteInitialisationDate
                                      : plan.plan === "Enterprise"
                                      ? this.state.enterpriseInitialisationDate
                                      : this.state.premiumInitialisationDate
                                  }
                                  id="premiumInitialisationDate"
                                  selected={
                                    plan.plan === "Lite"
                                      ? this.state.liteSelectedDate
                                      : plan.plan === "Enterprise"
                                      ? this.state.enterpriseSelectedDate
                                      : this.state.premiumSelectedDate
                                  }
                                  onChange={(date) =>
                                    plan.plan === "Lite"
                                      ? this.handleChangeLiteStartDate(date)
                                      : plan.plan === "Enterprise"
                                      ? this.handleChangeEnterpriseStartDate(date)
                                      : this.handleChangePremiumStartDate(date)
                                  }
                                   minDate={ plan.plan === "Lite"?this.state.liteMinDate:plan.plan === "Enterprise"?this.state.enterpriseMinDate:this.state.premiumMinDate}
                                  maxDate={
                                    new Date(
                                      currentYear,
                                      currentMonth + 1,
                                      currentDate + 20
                                    )
                                  }
                                />
                              </div>
                            }{" "}
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>

              <Row className="justify-content-md-center">
                <Button
                  className="genric-btn primary radius text-uppercase"
                  variant=" "
                  onClick={this.clicked}
                >
                  OK{" "}
                </Button>
              </Row>
            </Modal.Body>
          </Modal>
        </Container>
        <Footer />
      </div>
    );
  }
}

UpgradeCustomizePage.propTypes = {
  requestloadtimezone: PropTypes.func,
  liteRecommended: PropTypes.func,
  enterpriseRecommended: PropTypes.func,
  premiumRecommended: PropTypes.func,
  timeSlotLite: PropTypes.func,
  recommendedPrice: PropTypes.func,
  automatedEndTime: PropTypes.func,
  automatedEndTimeEnterprise: PropTypes.func,
  automatedEndTimePremium: PropTypes.func,
  detailslist: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    timezonelist: state.upgradeReducer.timezonelist,
    liteRecommended: state.upgradeReducer.liteRecommended,
    enterpriseRecommended: state.upgradeReducer.enterpriseRecommended,
    premiumRecommended: state.upgradeReducer.premiumRecommended,
    timeSlotLite: state.upgradeReducer.timeSlotLite,
    recommendedPrice: state.upgradeReducer.recommendedPrice,
    dataCustomizePage1: state.upgradeReducer.dataCustomizePage1,
    automatedEndTime: state.upgradeReducer.automatedEndTime,
    automatedTime: state.upgradeReducer.automatedTime,
    automatedEndTimeEnterprise: state.upgradeReducer.automatedEndTimeEnterprise,
    automatedTimeEnterprise: state.upgradeReducer.automatedTimeEnterprise,
    automatedTimePremium: state.upgradeReducer.automatedTimePremium,
    automatedEndTimePremium: state.upgradeReducer.automatedEndTimePremium,
    detailslist: state.upgradeReducer.detailslist,
    isSuccess: state.contactUsReducer.isSuccess,
    recivedcheckStatus: state.upgradeReducer.recivedcheckStatus,
    pricedetails: state.orderChangeReducer.pricedetails,

  };
};

const mapDispatchToProps = (dispatch) => ({
  requestContactUs: (ticket) => dispatch(requestContactUs(ticket)),

  requestloadtimezone: (timezone) => dispatch(requestloadtimezone(timezone)),
  liteClaculatePrice: (data) => dispatch(requestLiteClaculatePrice(data)),
  enterpriseClaculatePriceupgread: (data) =>
    dispatch(requestEnterpriseClaculatePriceupgread(data)),
  premiumClaculatePrice: (data) => dispatch(requestPremiumClaculatePrice(data)),
  litetimeslot: (liteTimeZone) => dispatch(litetimeslot(liteTimeZone)),
  claculatePrice: (data) => dispatch(requestClaculatePrice(data)),
  checkStatus: (data) => dispatch(checkStatus(data)),
  dataCustomizePage1: (data) => dispatch(dataCustomizePage1(data)),
  requestloaddetails: (email) => dispatch(requestloaddetails(email)),
  automatedEndTime: (liteTimeZone, liteserviceSupport, liteStartTime) =>
    dispatch(automatedEndTime(liteTimeZone, liteserviceSupport, liteStartTime)),
  automatedEndTimeEnterprise: (
    enterpriseTimeZone,
    enterpriseserviceSupport,
    enterpriseStartTime
  ) =>
    dispatch(
      automatedEndTimeEnterprise(
        enterpriseTimeZone,
        enterpriseserviceSupport,
        enterpriseStartTime
      )
    ),
  automatedEndTimePremium: (
    premiumTimezone,
    premiumserviceSupport,
    premiumStartTime
  ) =>
    dispatch(
      automatedEndTimePremium(
        premiumTimezone,
        premiumserviceSupport,
        premiumStartTime
      )
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpgradeCustomizePage);
