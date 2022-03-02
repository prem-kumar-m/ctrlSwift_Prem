import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Multiselect } from "multiselect-react-dropdown";
import { PropTypes } from "prop-types";
import React from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
// import { RadioGroup, RadioButton } from 'react-radio-buttons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import Select from "react-select";
// import { Redirect } from 'react-router'
// import { emailValidator, mobileValidator, firstNameValidator, lastNameValidator } from '../Core/utils'
import Switch from "react-switch";
import Swal from "sweetalert2";
import Footer from "../components/footer/Footer.js";
import Header from "../components/header/Header";
import HeaderLogin from "../components/header_login/HeaderLogin";
import Loader from "../components/loading";
import * as Constants from "../constants";
import { requestContactUs } from "../contactus/action";
import {
  automatedEndTime,
  automatedEndTimeEnterprise,
  automatedEndTimePremium, dataCustomizePage1,
  litetimeslot, requestClaculatePrice, requestEnterpriseClaculatePrice, requestLiteClaculatePrice, requestloadtimezone, requestPremiumClaculatePrice
} from "./action";

class CustomizePage extends React.Component {
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
      liteCustomizeDay: [],

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
      enterpriseCustomizeDay: [],

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
      premiumCustomizeDay: [],

      TollFreeNumber: "Yes",
      checked1: false,
      checked2: false,
      checked3: false,
      startDate: "",
      ContractDuration: "",
      PaymentTerms: "",
      showassignModal: false,
      showconfirmModal: false,
      closw: false,

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
    };
    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
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
    console.log("" + name + "" + value);
    this.setState({
      [name]: value,
      liteRecommendedModel: "",
      liteRecommendedPrice: "",
      liteRecommendedseater: "",
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
        liteSupportWindow: [],
        liteRecommendedModel: "",
        liteRecommendedPrice: "",
        dataLite: [],
        liteSeatCount: "",
        //liteRecommendedseater:'',
        liteSelectedModelPrice: "",
        liteClick: false,
        liteSeatCount: "",
      });
    } else {
      this.setState({
        // startTime:'',
        // endTime:'',
        liteSeatCount: "",
        liteserviceSupport: opt.value,
        liteModels: opt.value,
      });
    }
  };

  enterprisehandleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      enterpriseRecommendedModel: "",
      enterpriseRecommendedPrice: "",
      enterpriseRecommendedseater: "",
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
      // this.setState({
      //   enterpriseSeatCount:'',
      // })
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
        enterpriseserviceSupport: opt.value,
        enterpriseModels: opt.value,
      });
    }
  };

  premiumhandleChange = (event) => {
    const { name, value } = event.target;
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
    this.setState({ liteStartTime: selectedOption.label });
  };

  handleSelectChangeEndTime = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({ liteEndTime: selectedOption.label });
  };

  handleSelectChangeLiteStartTime = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({
      liteStartTime: selectedOption.label,
      liteRecommendedModel: "",
      liteRecommendedPrice: "",
    });
    this.props.automatedEndTime(
      this.state.liteTimezone,
      this.state.liteserviceSupport,
      selectedOption.label
    );
  };

  handleSelectChangeLiteStarttime = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({
      liteStartTime: selectedOption.label,
      liteRecommendedModel: "",
      liteRecommendedPrice: "",
    });
  };

  handleSelectChangeLiteEndTime = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({
      liteEndTime: selectedOption.label,
      liteRecommendedModel: "",
      liteRecommendedPrice: "",
    });
  };

  handleSelectChangeEnterpriseStartTime = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({
      enterpriseStartTime: selectedOption.label,
      enterpriseRecommendedModel: "",
      enterpriseRecommendedPrice: "",
    });
    this.props.automatedEndTimeEnterprise(
      this.state.enterpriseTimezone,
      this.state.enterpriseserviceSupport,
      selectedOption.label
    );
  };

  handleSelectChangeEnterpriseStarttime = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({
      enterpriseStartTime: selectedOption.label,
      enterpriseRecommendedModel: "",
      enterpriseRecommendedPrice: "",
    });
  };

  handleSelectChangeEnterpriseEndTime = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({
      enterpriseEndTime: selectedOption.label,
      enterpriseRecommendedModel: "",
      enterpriseRecommendedPrice: "",
    });
  };

  handleSelectChangePremiumStartTime = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({
      premiumStartTime: selectedOption.label,
      premiumRecommendedModel: "",
      premiumRecommendedPrice: "",
    });
    this.props.automatedEndTimePremium(
      this.state.premiumTimezone,
      this.state.premiumserviceSupport,
      selectedOption.label
    );
  };

  handleSelectChangePremiumStarttime = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({
      premiumStartTime: selectedOption.label,
      premiumRecommendedModel: "",
      premiumRecommendedPrice: "",
    });
  };

  handleSelectChangePremiumEndTime = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({
      premiumEndTime: selectedOption.label,
      premiumRecommendedModel: "",
      premiumRecommendedPrice: "",
    });
  };

  liteAdd = (e) => {
    this.setState({
      liteModelsSubmit: true,
    });
    console.log(
      "this.state.dataLite \n" + JSON.stringify(this.state.dataLite.length > 0)
    );
    console.log("this.state.dataLite \n" + JSON.stringify(this.state.dataLite));

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
          // liteStartTime:'',
          // liteEndTime:'',
          liteModels: "",
          liteModelsSubmit: "false",
          // startTime:'',
          // endTime:'',
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
        const data = {
          timeZone: this.state.liteTimezone,
          dayList: ["Monday", "Tuesday", "wednesday", "thursday", "friday"],
          startTime: this.state.liteStartTime,
          endTime: this.state.liteEndTime,
        };
        console.log(
          "data\n" + JSON.stringify(data) + this.state.liteSupportWindow.length
        );
        this.state.liteSupportWindow.push(data);
        /* if(this.state.liteSupportWindow.length == 0){
           this.state.liteSupportWindow.push(data);
         }else if(this.state.liteSupportWindow.timeZone !==this.state.liteTimezone||
           this.state.liteSupportWindow.startTime !==this.state.liteStartTime||
           this.state.liteSupportWindow.endTime !==this.state.liteEndTime){
             this.state.liteSupportWindow.timeZone =this.state.liteTimezone;
           this.state.liteSupportWindow.startTime =this.state.liteStartTime;
           this.state.liteSupportWindow.endTime =this.state.liteEndTime;
         }*/

        console.log(
          "liteSupportWindow\n" + JSON.stringify(this.state.liteSupportWindow)
        );
        this.setState({
          // startTime:'',
          //endTime:'',
          liteModels: "",
          liteModelsSubmit: "false",
        });
      }
    }
  };

  enterpriseAdd = (e) => {
    this.setState({
      enterpriseModelsSubmit: true,
    });
    console.log(
      "this.state.dataEnterprise \n" + JSON.stringify(this.state.dataEnterprise)
    );
    console.log(
      "\n this.state.enterpriseTimezone \n" +
        this.state.enterpriseTimezone +
        "\n this.state.startTime\n" +
        this.state.startTime +
        "\n -this.state.endTime \n" +
        this.state.endTime
    );
    if (e == "Customize") {
      if (this.state.dataEnterprise.length > 0) {
        //const data =this.state.dataenterprise;
        //this.state.enterpriseSupportWindow.push(data);
        this.state.enterpriseSupportWindow = this.state.dataEnterprise;
        console.log(
          "enterpriseSupportWindow\n" +
            JSON.stringify(this.state.enterpriseSupportWindow)
        );
        this.setState({
          // enterpriseStartTime:'',
          // enterpriseEndTime:'',
          enterpriseModels: "",
          startTime: "",
          endTime: "",
          enterpriseModelsSubmit: "false",
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
        const data = {
          timeZone: this.state.enterpriseTimezone,
          dayList: ["Monday", "Tuesday", "wednesday", "thursday", "friday"],
          startTime: this.state.enterpriseStartTime,
          endTime: this.state.enterpriseEndTime,
        };
        console.log("data\n" + JSON.stringify(data));
        this.state.enterpriseSupportWindow.push(data);
        //console.log("enterpriseSupportWindow\n"+JSON.stringify(this.state.enterpriseSupportWindow))
        this.setState({
          //startTime:'',
          //endTime:'',
          enterpriseModels: "",
          enterpriseModelsSubmit: "false",
        });
      }
    }
  };

  premiumAdd = (e) => {
    this.setState({
      premiumModelsSubmit: true,
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
          // premiumStartTime:'',
          // premiumEndTime:'',
          premiumModelsSubmit: "false",
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
          this.state.premiumStartTime +
          "\n" +
          this.state.premiumEndTime
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
          // startTime: '',
          // endTime: '',
          premiumModels: "",
          premiumModelsSubmit: "false",
        });
      }
    }
  };

  liteTimeZone = (opt) => {
    // this.liteDateRef.current.resetSelectedValues();
    this.setState({
      liteTimezone: opt.value,
      liteRecommendedModel: "",
      liteRecommendedPrice: "",
      /*days:[ {label: "Monday", value: "Monday"},
          {label: "Tuesday", value: "Tuesday"},
          {label: "Wednesday", value: 'Wednesday'},
          {label: "Thursday", value: 'Thursday'},
          {label: "Friday", value: 'Friday'},
          {label: "Saturday", value: 'Saturday'},
          {label: "Sunday", value: 'Sunday'},],
          dataLite:[],
          startTime:'',
          endTime:'',
          selectDate:[],*/
    });

    this.props.litetimeslot(opt.value);
    let TimeSlot = [{ label: "Loading Showrooms...", value: 1 }];
    console.log(
      "this.props.liteTimeSlot.slots" + JSON.stringify(this.props.timeSlotLite)
    );

    console.log(" this.state.littTimeSlot \n" + JSON.stringify(TimeSlot));
    //this.setState({liteTimeZone: selectedOption.label});

    console.log(" yuva" + this.state.liteTimezone);
  };

  enterpriseTimeZone = (opt) => {
    this.setState({
      enterpriseTimezone: opt.value,
      enterpriseRecommendedModel: "",
      enterpriseRecommendedPrice: "",
    });
    console.log(opt.value);
    this.props.litetimeslot(opt.value);
  };

  premiumTimeZone = (opt) => {
    this.setState({
      premiumTimezone: opt.value,
      premiumRecommendedModel: "",
      premiumRecommendedPrice: "",
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

    console.log(
      "liteModel" +
        liteModel +
        "\n" +
        "liteticketVol" +
        liteticketVol +
        "\n" +
        "liteserviceSupport" +
        liteserviceSupport +
        "\n" +
        "liteSupportWindow" +
        liteSupportWindow +
        "\n" +
        "TollFreeNumber" +
        TollFreeNumber +
        "\n" +
        "ContractDuration" +
        ContractDuration +
        "\n" +
        "PaymentTerms" +
        PaymentTerms +
        "\n" +
        "startDate" +
        startDate
    );
    // const plans='';
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
                commericialModel: this.state.liteModel,
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
                recommendModel: this.state.liteRecommendedModel,
                recommendPrice: this.state.liteRecommendedPrice,
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
                commericialModel: this.state.enterpriseModel,
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
                recommendModel: this.state.enterpriseRecommendedModel,
                recommendPrice: this.state.enterpriseRecommendedPrice,
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
                commericialModel: this.state.premiumModel,
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
                recommendModel: this.state.premiumRecommendedModel,
                recommendPrice: this.state.premiumRecommendedPrice,
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
                commericialModel: this.state.liteModel,
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
                recommendModel: this.state.liteRecommendedModel,
                recommendPrice: this.state.liteRecommendedPrice,
              },
              {
                plan: "Enterprise",
                commericialModel: this.state.enterpriseModel,
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
                recommendModel: this.state.enterpriseRecommendedModel,
                recommendPrice: this.state.enterpriseRecommendedPrice,
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
                commericialModel: this.state.liteModel,
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
                recommendModel: this.state.liteRecommendedModel,
                recommendPrice: this.state.liteRecommendedPrice,
              },
              {
                plan: "Premium",
                commericialModel: this.state.premiumModel,
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
                recommendModel: this.state.premiumRecommendedModel,
                recommendPrice: this.state.premiumRecommendedPrice,
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
                commericialModel: this.state.enterpriseModel,
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
                recommendModel: this.state.enterpriseRecommendedModel,
                recommendPrice: this.state.enterpriseRecommendedPrice,
              },
              {
                plan: "Premium",
                commericialModel: this.state.premiumModel,
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
                recommendModel: this.state.premiumRecommendedModel,
                recommendPrice: this.state.premiumRecommendedPrice,
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
          console.log("testing");
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
            console.log("testing 2");
            this.state.plansList = [
              {
                plan: "Lite",
                commericialModel: this.state.liteModel,
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
                recommendModel: this.state.liteRecommendedModel,
                recommendPrice: this.state.liteRecommendedPrice,
              },
              {
                plan: "Enterprise",
                commericialModel: this.state.enterpriseModel,
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
                recommendModel: this.state.enterpriseRecommendedModel,
                recommendPrice: this.state.enterpriseRecommendedPrice,
              },
              {
                plan: "Premium",
                commericialModel: this.state.premiumModel,
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
                recommendModel: this.state.premiumRecommendedModel,
                recommendPrice: this.state.premiumRecommendedPrice,
              },
            ];
          } else {
            console.log("testing 3");
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
          text: "Atleast select one Plan",
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
    console.log(JSON.stringify(this.state.plansList));
    this.props.claculatePrice({
      plansList: this.state.plansList,
      isTollFreeNumber: TollFreeNumber,
      contractDuration: ContractDuration,
      payment: PaymentTerms,
      serviceInitializationDate: startDate,
    });
    if (this.state.plansList) {
      this.setState({
        isLoading: true,
      });
    }
    console.log(JSON.stringify(this.state.plansList));
    const customize1 = {
      plansList: this.state.plansList,
      isTollFreeNumber: TollFreeNumber,
      contractDuration: ContractDuration,
      payment: PaymentTerms,
      serviceInitializationDate: startDate,
    };
    localStorage.setItem("customize1", JSON.stringify(customize1));
    this.props.dataCustomizePage1({
      plansList: this.state.plansList,
      isTollFreeNumber: TollFreeNumber,
      contractDuration: ContractDuration,
      payment: PaymentTerms,
      serviceInitializationDate: startDate,
    });
  };

  /* handleSubmit(e) {
    e.preventDefault();
    const { firstName, landline, lastName, city, country
      , message, pincode, department, companyName, workMail, mobile, } = this.state;


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


    if (firstName && lastName && mobile && message && workMail && country
      && city && department && companyName && pincode && emailError == "" &&
      firstNameError === "" && lastNameError === "" && mobileError === "") {

      this.props.history.push("/RegisterOtp");

    }
  }*/

  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  radioButton = (value) => {
    console.log("value" + value);
    this.setState({
      TollFreeNumber: value,
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
      liteSupportWindow: [],
      liteModels: "",
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
      startTime: "",
      endTime: "",
      selectDate: [],
      liteserviceSupport: "",
      liteCustomizeDay: [],
      liteModelsSubmit: false,
    });
  };

  handleCloseEnterprise = () => {
    this.setState({
      enterpriseserviceSupport: "",
      enterpriseModels: "",
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
      startTime: "",
      endTime: "",
      selectDate: [],
      enterpriseSupportWindow: [],
      enterpriseCustomizeDay: [],
      enterpriseModelsSubmit: false,
    });
  };

  handleClosepremium = () => {
    this.setState({
      premiumserviceSupport: "",
      premiumModels: "",
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
      startTime: "",
      endTime: "",
      selectDate: [],
      premiumSupportWindow: [],
      premiumCustomizeDay: [],
      premiumModelsSubmit: false,
    });
  };

  switch1 = (e) => {
    if (e === true) {
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
  };

  switch2 = (e) => {
    if (e === true) {
      this.setState({
        checked2: !this.state.checked2,
        enterpriseModel: "",
        enterpriseticketVol: "",
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
        enterpriseSupportWindow: [],
        enterpriseRecommendedModel: "",
        enterpriseRecommendedseater: "",
        enterpriseRecommendedPrice: "",
        enterpriseSelectedModelPrice: "",
        enterpriseserviceSupport: "",
        enterpriseSeatCount: "",
        enterpriseClick: false,
      });
    }
  };
  switch3 = (e) => {
    if (e === true) {
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
    }
  };

  componentDidMount() {
    let params = window.localStorage.getItem("priceFlag");
    let paramsvalue = window.localStorage.getItem("screen_data");
    console.log(
      "----------------customizePage------ " +
        window.localStorage.getItem("screen_data") +
        "plans" +
        window.localStorage.getItem("priceFlag")
    );

    if (params === "Lite") {
      this.setState({
        checked1: true,
        liteModel: window.localStorage.getItem("screen_data"),
      });
    } else if (params === "Enterprise") {
      this.setState({
        checked2: true,
        enterpriseModel: window.localStorage.getItem("screen_data"),
      });
    } else if (params === "Premium") {
      this.setState({
        checked3: true,
        premiumModel: window.localStorage.getItem("screen_data"),
      });
    }

    this.setState({ showassignModal: true, showconfirmModal: true });

    var state = JSON.parse(localStorage.getItem("customizeState"));
    // console.log(JSON.stringify(state.TollFreeNumber))
    if (state !== null && state !== "") {
      this.setState({
        timezoneOption: state.timezoneOption,
        plansList: state.plansList,
        lite: state.lite,
        liteModel: state.liteModel,
        liteticketVol: state.liteticketVol,
        liteserviceSupport: state.liteserviceSupport,
        liteRecommendedModel: state.liteRecommendedModel,
        liteRecommendedseater: state.liteRecommendedseater,
        liteRecommendedPrice: state.liteRecommendedPrice,
        liteSelectedModelPrice: state.liteSelectedModelPrice,
        liteSupportWindow: state.liteSupportWindow,
        liteModels: state.liteModels,
        liteTimezone: state.liteTimezone,
        littTimeSlot: state.littTimeSlot,
        liteSeatCount: state.liteSeatCount,
        liteModelsSubmit: state.liteModelsSubmit,
        liteStartTime: state.liteStartTime,
        liteEndTime: state.liteEndTime,
        liteClick: state.liteClick,

        enterpriseModel: state.enterpriseModel,
        enterpriseticketVol: state.enterpriseticketVol,
        enterpriseserviceSupport: state.enterpriseserviceSupport,
        enterpriseRecommendedModel: state.enterpriseRecommendedModel,
        enterpriseRecommendedseater: state.enterpriseRecommendedseater,
        enterpriseRecommendedPrice: state.enterpriseRecommendedPrice,
        enterpriseSelectedModelPrice: state.enterpriseSelectedModelPrice,
        enterpriseSupportWindow: state.enterpriseSupportWindow,
        enterpriseModels: state.enterpriseModels,
        enterpriseTimezone: state.enterpriseTimezone,
        enterpriseTimeSlot: state.enterpriseTimeSlot,
        enterpriseSeatCount: state.enterpriseSeatCount,
        enterpriseStartTime: state.enterpriseStartTime,
        enterpriseEndTime: state.enterpriseEndTime,
        enterpriseClick: state.enterpriseClick,

        premiumModel: state.premiumModel,
        premiumticketVol: state.premiumticketVol,
        premiumserviceSupport: state.premiumserviceSupport,
        premiumRecommendedModel: state.premiumRecommendedModel,
        premiumRecommendedseater: state.premiumRecommendedseater,
        premiumRecommendedPrice: state.premiumRecommendedPrice,
        premiumSelectedModelPrice: state.premiumSelectedModelPrice,
        premiumSupportWindow: state.premiumSupportWindow,
        premiumModels: state.premiumModels,
        premiumTimezone: state.premiumTimezone,
        premiumTimeSlot: state.premiumTimeSlot,
        premiumSeatCount: state.premiumSeatCount,
        premiumStartTime: state.premiumStartTime,
        premiumEndTime: state.premiumEndTime,
        premiumClick: state.premiumClick,

        TollFreeNumber: state.TollFreeNumber,
        checked1: state.checked1,
        checked2: state.checked2,
        checked3: state.checked3,
        startDate: state.startDate,
        ContractDuration: state.ContractDuration,
        PaymentTerms: state.PaymentTerms,
        showassignModal: state.showassignModal,
        showconfirmModal: state.showconfirmModal,
        closw: state.closw,

        submitted: state.submitted,
        isLoginSuccess: state.isLoginSuccess,
        isReadyToRedirect: state.isReadyToRedirect,
        emailError: state.emailError,
        isSuccess: state.isSuccess,
        startTime: state.startTime,
        endTime: state.endTime,
        date: state.date,
        automatedTime: state.automatedTime,
        automatedTimeEnterprise: state.automatedTimeEnterprise,
        automatedTimePremium: state.automatedTimePremium,

        day: state.day,
        days: state.days,
        dayss: state.dayss,
        daysLite: state.daysLite,
        daysEnterprise: state.daysEnterprise,
        daysPremium: state.daysPremium,
      });
      this.props.requestloadtimezone();
    } else {
      this.props.requestloadtimezone();
    }
    // console.log(JSON.stringify(state.liteserviceSupport))
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // window.localStorage.removeItem("lite");
    // window.localStorage.removeItem("Enterprise");
    // window.localStorage.removeItem("Premium");
    console.log("-------------------- :" + this.state.liteRecommendedModel);
    window.localStorage.removeItem("priceFlag");
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
        this.setState({
          isLoading: false,
          sendMail: false,
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
        this.setState({
          isLoading: false,
          sendMail: false,
        });
      }
      this.setState({
        showDedicatedCustomice: false,
        planDedicatedCustomice: "",
      });
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
      });
    }
    if (this.props.automatedTime !== prevProps.automatedTime) {
      console.log(
        "updated not null detials ......................" +
          this.props.automatedTime.endTime
      );

      this.setState({
        liteEndTime: this.props.automatedTime.endTime,
      });
    }
    if (this.props.automatedTimePremium !== prevProps.automatedTimePremium) {
      console.log(
        "updated not null detials ......................" +
          this.props.automatedTimePremium.endTime
      );

      this.setState({
        premiumEndTime: this.props.automatedTimePremium.endTime,
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
          title: "Note",
          text: this.props.timezonelist.message,
          type: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          closeOnConfirm: true,
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            window.location.reload();
          }
        });
      }
    }

    if (this.props.timeSlotLite !== prevProps.timeSlotLite) {
      if (this.props.timeSlotLite.success === true) {
        console.log(JSON.stringify(this.props.timeSlotLite));
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
    //  console.log("this.state.lite"+JSON.stringify(this.state.lite));
    //  console.log(this.state.checked3 == true)
    //  console.log("this.state.lite"+JSON.stringify(this.state.selectDate));
    // console.log("this.state.liteSupportWindow"+this.state.liteSupportWindow == null);
    // console.log("this.state.liteSupportWindow"+!!this.state.liteSupportWindow[0]);
    //  console.log("this.state.liteSupportWindow"+this.state.liteSupportWindow =='');
    console.log(
      this.state.liteModel +
        "\n" +
        this.state.liteticketVol +
        "\n" +
        this.state.liteserviceSupport
    );

    console.log(JSON.stringify(this.props.liteRecommended));
    if (this.props.liteRecommended !== prevProps.liteRecommended) {
      console.log("done");
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
            console.log(
              "test",
              this.props.liteRecommended.modelList[0].recommendSeat
            );

            this.setState({
              liteSeatCount:
                this.props.liteRecommended.modelList[0].recommendSeat,
            });
          } else if (this.state.liteSeatCount) {
            console.log(
              "test2 \n" +
                this.props.liteRecommended.modelList[0].userEnteredSeatCount
            );

            this.setState({
              liteSeatCount:
                this.props.liteRecommended.modelList[0].userEnteredSeatCount,
            });
          }
          {
            /*}   if(this.state.liteserviceSupport =="8 X 5 Weekdays (office hours support)"){

            this.setState({
              liteSeatCount: this.props.liteRecommended.modelList[0].recommendSeat,
             })
           }

           else if(!!this.state.liteSeatCount){
            console.log("test2");

           this.setState({
            liteSeatCount: this.props.liteRecommended.modelList[0].userEnteredSeatCount,
           })

            }*/
          }
          if (
            this.state.liteserviceSupport == "16 X 5 After office hours support"
          ) {
            this.setState({
              liteSeatCount:
                this.props.liteRecommended.modelList[0].recommendSeat,
            });
          } else if (!this.state.liteSeatCount) {
            this.setState({
              liteSeatCount:
                this.props.liteRecommended.modelList[0].recommendSeat,
            });
          }

          // else if (!!this.state.liteSeatCount) {
          //   console.log("test2");

          //   this.setState({
          //     liteSeatCount: this.props.liteRecommended.modelList[0].recommendSeat,
          //   })

          // }

          console.log("1");
          if (this.state.liteClick == true) {
            console.log(
              "2",
              this.props.liteRecommended.modelList[0].recommendSeat
            );
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
              liteCustomizeDay: [],
            });
            this.handleCloseLite();
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
      console.log("liteModel" + this.state.liteModel + "\n");
      console.log(
        "model" +
          this.state.liteModels +
          "\n" +
          this.state.liteticketVol +
          "\n" +
          "support" +
          this.state.liteserviceSupport
      );

      if (
        this.state.liteModel &&
        this.state.liteticketVol >= 50 &&
        this.state.liteserviceSupport
      ) {
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
        console.log("in 0");
        // if((this.state.liteModel === "Dedicated"&& this.state.liteSeatCount)||(this.state.liteModel !== "Dedicated")){
        if (
          this.state.liteserviceSupport == "Weekend Support (48hours)" ||
          this.state.liteserviceSupport == "24x7"
        ) {
          console.log("in 1" + this.state.liteSeatCount);
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
          console.log("in 2");
          if (!!this.state.liteSupportWindow[0]) {
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
          }
        } else if (this.state.liteserviceSupport == "Customize") {
          if (!!this.state.liteSupportWindow[0]) {
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
        }
        //}
      }
    }

    //----enterprise------------------enterprise------------enterprise--------enterprise-----------------

    //console.log(this.props.liteRecommended)
    if (this.props.enterpriseRecommended !== prevProps.enterpriseRecommended) {
      console.log("done");
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
          console.log("1");
          if (this.state.enterpriseClick == true) {
            console.log("2");
            //document.getElementById("enterpriseSeatcount").setAttribute("disabled", true);
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
            // enterpriseRecommendedseater:this.props.enterpriseRecommended.modelList[0].recommendSeat
          });
          console.log("3");
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
              enterpriseCustomizeDay: [],
            });
            this.handleCloseEnterprise();
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
        this.state.enterpriseticketVol >= 50 &&
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
          this.props.enterpriseClaculatePrice({
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
          if (!!this.state.enterpriseSupportWindow[0]) {
            this.props.enterpriseClaculatePrice({
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
          }
        } else if (this.state.enterpriseserviceSupport == "Customize") {
          if (!!this.state.enterpriseSupportWindow[0]) {
            this.props.enterpriseClaculatePrice({
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
      }
    }

    //------------------premium--------premium--------premium-------premium-------premium-------------

    if (this.props.premiumRecommended !== prevProps.premiumRecommended) {
      console.log("done");
      if (this.props.premiumRecommended.success == true) {
        if (this.props.premiumRecommended.modelList[0].recommendSeat) {
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
            // premiumRecommendedseater:this.props.premiumRecommended.modelList[0].recommendSeat
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
              premiumCustomizeDay: [],
            });
            this.handleClosepremium();
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
        this.state.premiumModels +
          "\n" +
          this.state.premiumticketVol +
          "\n" +
          this.state.premiumserviceSupport
      );

      if (
        this.state.premiumModel &&
        this.state.premiumticketVol >= 50 &&
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
          if (!!this.state.premiumSupportWindow[0]) {
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
          }
        } else if (this.state.premiumserviceSupport == "Customize") {
          if (!!this.state.premiumSupportWindow[0]) {
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
          }
        }
        // }
      }
    }
    //======================recommendedPrice============recommendedPrice=============recommendedPrice===========
    if (this.props.recommendedPrice !== prevProps.recommendedPrice) {
      this.setState({
        isLoading: false,
      });
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
        var plansList = this.props.recommendedPrice.modelList.map(
          (row, rowkey) => {
            // key={rowkey}
            return {
              plan: row.selectedPlan,
              commericialModel: row.selectedCommercialModel,
              ticket: this.state.plansList[rowkey].ticket,
              selectedModelPrice: row.selectedModelPrice,
              paymentTerms: this.props.recommendedPrice.paymentTerms,
              serviceSupport: this.state.plansList[rowkey].serviceSupport,
              userEnteredSeatCount:
                this.state.plansList[rowkey].userEnteredSeatCount,
              supportWindow: this.state.plansList[rowkey].supportWindow,
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
        console.log("dataCustomizePage1 \n" + JSON.stringify(data));

        localStorage.setItem("customizeState", JSON.stringify(this.state));
        // <a href="/planDetails"></a>
        this.props.history.push("/planDetails");

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

  handleChangeStartDate = (date) => {
    let dayparam = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let dayparams = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let monthparam =
      date.getMonth() < 9 ? "0" + (1 + date.getMonth()) : 1 + date.getMonth();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Octr",
      "Nov",
      "Dec",
    ];
    let dateparam = date.getFullYear() + "-" + monthparam + "-" + dayparam;
    var days = dayparam;
    this.state.d1 = date.getFullYear() + "," + monthparam + "," + days;
    console.log(this.state.d1);
    console.log(new Date(this.state.d1));
    console.log(new Date(this.state.d1).toISOString().split("T")[0]);
    this.setState({
      startDate: dateparam,
    });
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

    console.log(JSON.stringify(this.state.days));
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

  selectDateLite = (event) => {
    let ddl = document.getElementById("productdd");
    this.setState({
      liteCustomizeDay: event,
      liteRecommendedModel: "",
      liteRecommendedPrice: "",
    });
    console.log(JSON.stringify(event));
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
    if (this.state.selectDate.length > 0) {
      this.setState({
        showtimeLite: true,
      });
    }
  };

  removeDateLite = (event) => {
    this.setState({
      liteCustomizeDay: event,
      liteRecommendedModel: "",
      liteRecommendedPrice: "",
    });
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
    if (this.state.selectDate.length === 0) {
      this.setState({
        showtimeLite: false,
      });
    }

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
    this.setState({
      enterpriseCustomizeDay: event,
      enterpriseRecommendedModel: "",
      enterpriseRecommendedPrice: "",
    });
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
    if (this.state.selectDate.length !== 0) {
      this.setState({
        showtimeEnterprise: true,
      });
    }
    console.log(JSON.stringify(this.state.days));
  };

  removeDateEnterprise = (event) => {
    this.setState({
      enterpriseCustomizeDay: event,
      enterpriseRecommendedModel: "",
      enterpriseRecommendedPrice: "",
    });
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

    if (this.state.selectDate.length === 0) {
      this.setState({
        showtimeEnterprise: false,
      });
    }
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

    this.setState({
      premiumCustomizeDay: event,
      premiumRecommendedModel: "",
      premiumRecommendedPrice: "",
    });

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
    if (this.state.selectDate.length > 0) {
      this.setState({
        showtimePremium: true,
      });
    }
  };

  removeDatePremium = (event) => {
    this.setState({
      premiumCustomizeDay: event,
      premiumRecommendedModel: "",
      premiumRecommendedPrice: "",
    });
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

    if (this.state.selectDate.length === 0) {
      this.setState({
        showtimePremium: false,
      });
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

  addLite = () => {
    if (
      this.state.selectDate &&
      this.state.liteStartTime &&
      this.state.liteEndTime &&
      this.state.liteTimezone
    ) {
      const data = {
        timeZone: this.state.liteTimezone,
        dayList1: this.state.selectDate.toString(),
        dayList: this.state.selectDate,
        startTime: this.state.liteStartTime,
        endTime: this.state.liteEndTime,
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
        liteStartTime: "",
        liteEndTime: "",
      });
    } else {
      Swal.fire({
        title: "",
        text: "Please fill all fields",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
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
      this.state.enterpriseStartTime &&
      this.state.enterpriseEndTime &&
      this.state.enterpriseTimezone
    ) {
      const data = {
        timeZone: this.state.enterpriseTimezone,
        dayList1: this.state.selectDate.toString(),
        dayList: this.state.selectDate,
        startTime: this.state.enterpriseStartTime,
        endTime: this.state.enterpriseEndTime,
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

      // this.enterpriseAdd("Customize")
      this.setState({
        selectDate: [],
        enterpriseStartTime: "",
        enterpriseEndTime: "",
      });
    } else {
      Swal.fire({
        title: "",
        text: "Please fill all fields",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
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
      this.state.premiumStartTime &&
      this.state.premiumEndTime &&
      this.state.premiumTimezone
    ) {
      const data = {
        timeZone: this.state.premiumTimezone,
        dayList: this.state.selectDate,
        dayList1: this.state.selectDate.toString(),
        startTime: this.state.premiumStartTime,
        endTime: this.state.premiumEndTime,
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

      //this.premiumAdd("Customize")

      this.setState({
        selectDate: [],
        premiumStartTime: "",
        premiumEndTime: "",
      });
    } else {
      Swal.fire({
        title: "",
        text: "Please fill all fields",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
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
    // if (this.state.isReadyToRedirect) return <Redirect to="/user" />
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

    const serviceSupportsOptionDedicated = [
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
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div>
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
                          methodology and transformation cookbooks to
                          progressively drive the Service
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
                  <h1>Customize your plan</h1>
                  <p style={{ fontSize: 26, color: "black" }}>
                    It won't take more than 15 minutes time.
                  </p>
                </Col>
              </Row>
              <Form className="col-md-12">
                <Form.Row
                  style={{
                    backgroundColor: "#0950a1",
                    fontSize: 20,
                    borderRadius: 12,
                  }}
                >
                  <div className="col-md-1 ">
                    <Form.Label
                      style={{
                        fontSize: 20,
                        marginBlock: "10px",
                        color: "#fff",
                        paddingLeft: "10px",
                      }}
                    >
                      Lite
                    </Form.Label>
                  </div>
                  <div className="col-md-10" />
                  <div className="col-md-1" style={{ marginTop: 8 }}>
                    <Switch
                      checked={this.state.checked1}
                      onChange={this.switch1}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      onHandleColor="#fff"
                      onColor="#F26622"
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={20}
                      width={48}
                      id="cs-cp-lite-toggle"
                    />
                  </div>
                </Form.Row>

                <Form.Row className="mt-2">
                  {/* <Form.Group as={Col} md="4" controlId="liteModel">
                  <Form.Label>Commercial Model</Form.Label>


                                <input  readOnly disabled={!this.state.checked1}  style={this.state.checked1?{backgroundColor:'white'}:null}  className="form-control"
        name="liteModel" value={liteModel} />
                            {submitted && !liteModel && this.state.checked1 &&  <div style ={{fontSize:12,color:"red"}}>This field is required</div> }
                </Form.Group>  */}

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
                      id="cs-cp-lite-commercialModal"
                    >
                      <option value=""></option>
                      <option value="PPU">PPU</option>
                      <option value="Shared">Shared</option>
                      <option value="Dedicated">Dedicated</option>
                    </select>
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
                      autocomplete="off"
                      id="cs-cp-lite-ticket"
                    />
                    {liteticketVol && liteticketVol < 50 && (
                      <p style={{ color: "red" }}>
                        Volume should be Minimum  50
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

                      isDisabled={!this.state.checked1 || liteModel === ""}
                      value={{
                        label: this.state.liteserviceSupport,
                        value: this.state.liteserviceSupport,
                      }}
                      role={country}
                      options={
                        liteModel !== "Dedicated"
                          ? serviceSupportsOption
                          : serviceSupportsOptionDedicated
                      }
                      name="liteserviceSupport"
                      id="cs-cp-lite-support"
                    />

                    {liteModel !== "Dedicated" ? (
                      <div style={{ fontSize: "10" }}>
                        (Please choose customize option for multi select)
                      </div>
                    ) : null}
                    {submitted &&
                      !liteserviceSupport &&
                      this.state.checked1 && (
                        <div style={{ fontSize: 12, color: "red" }}>
                          This field is required
                        </div>
                      )}
                  </Form.Group>
                  {/* <Form.Group as={Col} md="4" controlId="liteModel">
                <Form.Label>Selected Model Price(Per Month)</Form.Label>
               <input type="text" disabled="true" className="form-control" style={this.state.checked1 ?{backgroundColor:'#fff'}:null}
 name="liteSelectedModelPrice" value={liteSelectedModelPrice+" $"} />
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
                          this.state.checked1
                            ? { backgroundColor: "#fff" }
                            : null
                        }
                        name="liteSelectedModelPrice"
                        value={liteSelectedModelPrice + " $"}
                        id="cs-cp-lite-selectmod"
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
                            onChange={this.liteResourceshandleChange}
                            id="liteSeatcount"
                            name="liteSeatCount"
                            value={liteSeatCount}
                            id="cs-cp-lite-resource"
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

                    <Form.Group
                      as={Col}
                      md="4"
                      controlId="liteRecommendedModel"
                    >
                      <Form.Label>Recommended Commercial Model</Form.Label>
                      <input
                        type="text"
                        className="form-control cs-lable"
                        // style={{
                        //   backgroundColor: "#FFA500",
                        //   color: "white",
                        //   fontWeight: "bold",
                        // }}
                        disabled="true"
                        name="liteRecommendedModel"
                        value={liteRecommendedModel}
                        id="cs-cp-lite-recommercialmod"
                      />
                    </Form.Group>

                    {/* {liteShowCSeater && liteModel !== "Dedicated" ? <Form.Group as={Col} md="4" controlId="liteRecommendedseater">
                <Form.Label>Recommended Resources</Form.Label>
                <input type="text" style={{ backgroundColor: '#FFA500', color: 'white', fontWeight: 'bold' }} className="form-control" required pattern="[0-9a-zA-Z_.-]*"
                  onChange={this.litehandleChange} disabled="ture" name="liteRecommendedseater" value={liteRecommendedseater} />
              </Form.Group> : null} */}
                    <Form.Group
                      as={Col}
                      md="4"
                      controlId="liteRecommendedPrice"
                    >
                      <Form.Label>
                        Recommended Model Price(Per Month)
                      </Form.Label>
                      <input
                        type="text"
                        // style={{
                        //   backgroundColor: "#FFA500",
                        //   color: "white",
                        //   fontWeight: "bold",
                        // }}
                        className="form-control cs-lable"
                        disabled="true"
                        name="liteRecommendedPrice"
                        value={liteRecommendedPrice + " $"}
                        id="cs-cp-lite-remodprize"
                      />
                    </Form.Group>

                    {liteShowESeater ? null : (
                      <Form.Group as={Col} md="4" controlId="liteSeatCount">
                        {" "}
                      </Form.Group>
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

                    <Form.Group
                      as={Col}
                      md="4"
                      controlId="liteRecommendedModel"
                    >
                      <Form.Label> </Form.Label>
                      <br /> <br />
                      <Form.Check
                        type="checkbox"
                        label="Proceed with recommended"
                        onClick={(event) => this.liteClick(event)}
                        id="liteCheck"
                        checked={this.state.liteClick}
                        id="cs-cp-lite-check"
                      />
                    </Form.Group>
                  </Form.Row>
                ) : null}
              </Form>
              <br />
              <Form className="col-md-12">
                <Form.Row
                  style={{
                    backgroundColor: "#0950a1",
                    fontSize: 20,
                    borderRadius: 12,
                  }}
                >
                  <div className="col-md-1">
                    <Form.Label
                      style={{
                        fontSize: 20,
                        marginBlock: "10px",
                        color: "#fff",
                        paddingLeft: "10px",
                      }}
                    >
                      Enterprise
                    </Form.Label>
                  </div>
                  <div className="col-md-10" />
                  <div className="col-md-1" style={{ marginTop: 8 }}>
                    <Switch
                      checked={this.state.checked2}
                      onChange={this.switch2}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      onHandleColor="#fff"
                      onColor="#F26622"
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={20}
                      width={48}
                      id="cs-cp-enter-toggle"
                    />
                  </div>
                </Form.Row>

                <Form.Row className="mt-2">
                  {/* <Form.Group as={Col} md="4" controlId="enterpriseModel">
                  <Form.Label>Commercial Model</Form.Label>
                               <input   disabled={!this.state.checked2}  style={this.state.checked2?{backgroundColor:'white'}:null}  className="form-control"
        name="enterpriseModel" value={this.state.checked2?enterpriseModel:null} />
   {submitted && !enterpriseModel && this.state.checked2 &&  <div style ={{fontSize:12,color:"red"}}>This field is required</div> }
                </Form.Group>  */}

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
                      id="cs-cp-enter-commercialmodel"
                    >
                      <option value=""></option>
                      <option value="PPU">PPU</option>
                      <option value="Shared">Shared</option>
                      <option value="Dedicated">Dedicated</option>
                    </select>
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
                      autocomplete="off"
                      id="cs-cp-enter-ticket"
                    />
                    {submitted &&
                      !enterpriseticketVol &&
                      this.state.checked2 && (
                        <div style={{ fontSize: 12, color: "red" }}>
                          This field is required
                        </div>
                      )}
                    {enterpriseticketVol && enterpriseticketVol < 50 && (
                      <p style={{ color: "red" }}>
                        Volume should be Minimum  50
                      </p>
                    )}
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="enterpriseSupportWindow"
                  >
                    <Form.Label>Support Window</Form.Label>

                    <Select
                      onChange={this.enterpriseHandleChange}
                      isDisabled={
                        !this.state.checked2 || enterpriseModel === ""
                      }
                      value={{
                        label: this.state.enterpriseserviceSupport,
                        value: this.state.enterpriseserviceSupport,
                      }}
                      role={country}
                      options={
                        enterpriseModel !== "Dedicated"
                          ? serviceSupportsOption
                          : serviceSupportsOptionDedicated
                      }
                      name="enterpriseserviceSupport"
                      id="cs-cp-enter-support"
                    />

                    {enterpriseModel !== "Dedicated" ? (
                      <div style={{ fontSize: "10" }}>
                        (Please choose customize option for multi select)
                      </div>
                    ) : null}
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
 name="enterpriseSelectedModelPrice" value={enterpriseSelectedModelPrice+" $"} />
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
                          this.state.checked2
                            ? { backgroundColor: "#fff" }
                            : null
                        }
                        name="enterpriseSelectedModelPrice"
                        value={enterpriseSelectedModelPrice + " $"}
                        id="cs-cp-enter-selectmod"
                      />
                    </Form.Group>

                    {enterpriseShowESeater ? (
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="enterpriseSeatCount"
                      >
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
                            name="enterpriseSeatCount"
                            value={enterpriseSeatCount}
                            id="cs-cp-enter-resource"
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
                        {console.log(enterpriseSeatCount)}
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
                              Minimum seat count is{" "}
                              {enterpriseRecommendedseater}
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
                        // style={{
                        //   backgroundColor: "#FFA500",
                        //   color: "white",
                        //   fontWeight: "bold",
                        // }}
                        disabled="true"
                        name="enterpriseRecommendedModel"
                        value={enterpriseRecommendedModel}
                        id="cs-cp-enter-recommercialmod"
                      />
                    </Form.Group>

                    {/* {enterpriseShowCSeater && enterpriseModel !== "Dedicated" ? <Form.Group as={Col} md="4" controlId="enterpriseRecommendedseater">
                <Form.Label>Recommended Resources</Form.Label>
                <input type="text" style={{ backgroundColor: '#FFA500', color: 'white', fontWeight: 'bold' }} className="form-control" required pattern="[0-9a-zA-Z_.-]*"
                  onChange={this.enterprisehandleChange} disabled="ture" name="enterpriseRecommendedseater" value={enterpriseRecommendedseater} />
                <div style={{ fontSize: '10' }}>(Based on chosen Commercial Model)</div>
              </Form.Group> : null} */}

                    <Form.Group
                      as={Col}
                      md="4"
                      controlId="enterpriseRecommendedPrice"
                    >
                      <Form.Label>
                        Recommended Model Price(Per Month)
                      </Form.Label>
                      <input
                        type="text"
                        className="form-control cs-lable"
                        // style={{
                        //   backgroundColor: "#FFA500",
                        //   color: "white",
                        //   fontWeight: "bold",
                        // }}
                        disabled="true"
                        name="enterpriseRecommendedPrice"
                        value={enterpriseRecommendedPrice + " $"}
                        id="cs-cp-enter-remodprize"
                      />
                    </Form.Group>

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

                    <Form.Group as={Col} md="4" controlId="enterpriseCheck">
                      <Form.Label> </Form.Label>
                      <br /> <br />
                      <Form.Check
                        type="checkbox"
                        label="Proceed with recommended"
                        onClick={(event) => this.enterpriseClick(event)}
                        id="enterpriseCheck"
                        checked={this.state.enterpriseClick}
                        id="cs-cp-enter-check"
                      />
                    </Form.Group>
                  </Form.Row>
                ) : null}
              </Form>

              <br />
              <Form className="col-md-12">
                <Form.Row
                  style={{
                    backgroundColor: "#0950a1",
                    fontSize: 20,
                    borderRadius: 12,
                  }}
                >
                  <div className="col-md-1">
                    <Form.Label
                      style={{
                        fontSize: 20,
                        marginBlock: "10px",
                        color: "#fff",
                        paddingLeft: "10px",
                      }}
                    >
                      Premium
                    </Form.Label>
                  </div>
                  <div className="col-md-10" />
                  <div className="col-md-1" style={{ marginTop: 8 }}>
                    <Switch
                      checked={this.state.checked3}
                      onChange={this.switch3}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      onHandleColor="#fff"
                      onColor="#F26622"
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={20}
                      width={48}
                      id="cs-cp-premium-toggle"
                    />
                  </div>
                </Form.Row>

                <Form.Row className="mt-2">
                  {/* <Form.Group as={Col} md="4" controlId="premiumModel">
                  <Form.Label>Commercial Model</Form.Label>

<input   disabled={!this.state.checked3}  style={this.state.checked3?{backgroundColor:'white'}:null}  className="form-control"
        name="premiumModel" value={this.state.checked3?premiumModel:null} />
                               {submitted && !premiumModel && this.state.checked3 &&  <div style ={{fontSize:12,color:"red"}}>This field is required</div> }
                </Form.Group>  */}

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
                      id="cs-cp-premium-commercialmodel"
                    >
                      <option value=""></option>
                      <option value="PPU">PPU</option>
                      <option value="Shared">Shared</option>
                      <option value="Dedicated">Dedicated</option>
                    </select>
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
                      autocomplete="off"
                      id="cs-cp-premium-ticket"
                    />
                    {submitted && !premiumticketVol && this.state.checked3 && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        This field is required
                      </div>
                    )}
                    {premiumticketVol && premiumticketVol < 50 && (
                      <p style={{ color: "red" }}>
                        Volume should be Minimum  50
                      </p>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="premiumSupportWindow">
                    <Form.Label>Support Window</Form.Label>

                    <Select
                      onChange={this.premiumHandleChange}
                      isDisabled={!this.state.checked3 || premiumModel === ""}
                      value={{
                        label: this.state.premiumserviceSupport,
                        value: this.state.premiumserviceSupport,
                      }}
                      role={country}
                      options={
                        premiumModel !== "Dedicated"
                          ? serviceSupportsOption
                          : serviceSupportsOptionDedicated
                      }
                      name="premiumserviceSupport"
                      id="cs-cp-premium-support"
                    />

                    {premiumModel !== "Dedicated" ? (
                      <div style={{ fontSize: "10" }}>
                        (Please choose customize option for multi select)
                      </div>
                    ) : null}
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
name="premiumSelectedModelPrice" value={premiumSelectedModelPrice+" $"} />
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
                          this.state.checked3
                            ? { backgroundColor: "#fff" }
                            : null
                        }
                        name="premiumSelectedModelPrice"
                        value={premiumSelectedModelPrice + " $"}
                        id="cs-cp-premium-selectmod"
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
                            id="cs-cp-premium-resource"
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
                        // style={{
                        //   backgroundColor: "#FFA500",
                        //   color: "white",
                        //   fontWeight: "bold",
                        // }}
                        disabled="true"
                        name="premiumRecommendedModel"
                        value={premiumRecommendedModel}
                        id="cs-cp-premium-recommercialmod"
                      />
                    </Form.Group>

                    {/* {premiumShowCSeater & premiumModel !== "Dedicated" ? <Form.Group as={Col} md="4" controlId="premiumRecommendedseater">
                <Form.Label>Recommended Resources</Form.Label>
                <input type="text" style={{ backgroundColor: '#FFA500', color: 'white', fontWeight: 'bold' }} className="form-control" required pattern="[0-9a-zA-Z_.-]*"
                  onChange={this.premiumhandleChange} disabled="true" name="premiumRecommendedseater" value={premiumRecommendedseater} />
                <div style={{ fontSize: '10' }}>(Based on chosen Commercial Model)</div>
              </Form.Group> : null} */}

                    <Form.Group
                      as={Col}
                      md="4"
                      controlId="premiumRecommendedPrice"
                    >
                      <Form.Label>
                        Recommended Model Price(Per Month)
                      </Form.Label>
                      <input
                        type="text"
                        // style={{
                        //   backgroundColor: "#FFA500",
                        //   color: "white",
                        //   fontWeight: "bold",
                        // }}
                        className="form-control cs-lable"
                        disabled="true"
                        name="premiumRecommendedPrice"
                        value={premiumRecommendedPrice + " $"}
                        id="cs-cp-premium-remodprize"
                      />
                    </Form.Group>

                    {premiumShowCSeater && premiumModel === "Dedicated" ? (
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="premiumRecommendedseater"
                      >
                        <Form.Label>Recommended seater</Form.Label>
                        <input
                          type="text"
                          // style={{
                          //   backgroundColor: "#FFA500",
                          //   color: "white",
                          //   fontWeight: "bold",
                          // }}
                          className="form-control cs-lable"
                          required
                          pattern="[0-9a-zA-Z_.-]*"
                          onChange={this.premiumhandleChange}
                          disabled="true"
                          name="premiumRecommendedseater"
                          value={premiumRecommendedseater}
                          id="cs-cp-premium-recommendedseater"
                        />
                        <div style={{ fontSize: "10" }}>
                          (Based on chosen Commercial Model)
                        </div>
                      </Form.Group>
                    ) : null}

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

                    <Form.Group as={Col} md="4" controlId="premiumCheck">
                      <Form.Label> </Form.Label>
                      <br /> <br />
                      <Form.Check
                        type="checkbox"
                        label="Proceed with recommended"
                        onClick={(event) => this.premiumClick(event)}
                        id="premiumCheck"
                        checked={this.state.premiumClick}
                        id="cs-cp-premium-check"
                      />
                    </Form.Group>
                  </Form.Row>
                ) : null}
              </Form>

              <br />
              <Form>
                <Form.Row>
                  <Form.Group>
                    <Form.Label>
                      Toll free number call forwarding required:
                    </Form.Label>
                    <RadioGroup
                      row
                      aria-label="position"
                      name="position"
                      value={this.state.TollFreeNumber}
                      defaultValue={this.state.TollFreeNumber}
                    >
                      <FormControlLabel
                        value="Yes"
                        onColor="#8bc34a"
                        control={<Radio color="primary" />}
                        label="Yes"
                        labelPlacement="End"
                        // disabled={!this.state.checked3}
                        onChange={(e) => {
                          this.setState({ TollFreeNumber: "Yes" });
                        }}
                        id="cs-cp-yes"
                      />

                      <FormControlLabel
                        value="No"
                        control={<Radio color="primary" />}
                        label="No"
                        labelPlacement="End"
                        // disabled={!this.state.checked3}
                        onChange={(e) => {
                          this.setState({ TollFreeNumber: "No" });
                        }}
                        id="cs-cp-no"
                      />
                    </RadioGroup>
                    {/* <RadioGroup value={TollFreeNumber} onChange={this.radioButton} horizontal>
                  <RadioButton value="yes" iconSize={20} color="black" rootColor="black">
                    Yes
  </RadioButton>
                  <RadioButton value="No" iconSize={20} rootColor="black">
                    No
  </RadioButton>
                </RadioGroup> */}
                    {submitted && !TollFreeNumber && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        This field is required
                      </div>
                    )}
                  </Form.Group>
                </Form.Row>
              </Form>

              <Form autoComplete="off">
                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="ContractDuration">
                    <Form.Label>Subscription Period</Form.Label>

                    <select
                      type="dropdown"
                      className="form-control"
                      name="ContractDuration"
                      value={ContractDuration}
                      placeholder="select"
                      onChange={this.handleChange}
                      id="cs-cp-subscription"
                    >
                      <option value=""></option>
                      <option value="1 Year">1 Year</option>
                      <option value="3 Years">3 Years</option>
                    </select>
                    {submitted && !ContractDuration && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        This field is required
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="InitiationDate">
                    <Form.Label>Payment Terms</Form.Label>
                    {liteModel === "PPU" ||
                    enterpriseModel == "PPU" ||
                    premiumModel == "PPU" ? (
                      <select
                        type="dropdown"
                        className="form-control"
                        name="PaymentTerms"
                        value={PaymentTerms}
                        placeholder="select"
                        onChange={this.handleChange}
                        id="cs-cp-payterms"
                      >
                        <option value=""></option>
                        <option value="Yearly">Yearly</option>
                        {/* <option  value="Monthly">Monthly</option> */}
                      </select>
                    ) : (
                      <select
                        type="dropdown"
                        className="form-control"
                        name="PaymentTerms"
                        value={PaymentTerms}
                        placeholder="select"
                        onChange={this.handleChange}
                        id="cs-cp-payterms"
                      >
                        <option value=""></option>
                        <option value="Yearly">Yearly</option>
                        <option value="Monthly">Monthly</option>
                      </select>
                    )}
                    {/* <input type="text" style={{backgroundColor:'white'}} readOnly className="form-control" name="PaymentTerms" value={PaymentTerms} ></input> */}
                    {/* only monthy option so it was commanted */}
                    {/* //{( (ContractDuration!=="Pay Per use")) ? */}
                    {/* <select type="dropdown" className="form-control" name="PaymentTerms" value={PaymentTerms}
                  placeholder='select' onChange={this.handleChange}>
                           <option  value=""></option>
                   <option  value="Yearly">Yearly</option>
                   <option  value="Monthly">Monthly</option>
                         </select> */}
                    {/* //  <select type="dropdown" className="form-control" name="PaymentTerms" value={PaymentTerms}
                //         placeholder='select' onChange={this.handleChange}>
                //                  <option  value=""></option>
                //         <option  value="Yearly">Yearly</option>
                //          <option  value="Monthly">Monthly</option>
                //                </select>}
                                   {/* <select type="dropdown" className="form-control" name="PaymentTerms" value={PaymentTerms}
                        placeholder='select' onChange={this.handleChange}>
                                 <option  value=""></option>
                         <option  value="Yearly">Yearly</option>
                         <option  value="Monthly">Monthly</option>
                               </select> */}
                    {submitted && !PaymentTerms && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        This field is required
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="startDate">
                    <Form.Label>Service Initiation Date</Form.Label>
                    <div className="dateclass">
                      <DatePicker
                        name="startDate"
                        value={startDate}
                        id="startDate"
                        //autoFocus="0"
                        onChange={this.handleChangeStartDate}
                        minDate={new Date(this.state.date)}
                        maxDate={
                          new Date(
                            currentYear,
                            currentMonth + 1,
                            currentDate + 7
                          )
                        }
                        id="cs-cp-initiationdate"
                      />
                      {submitted && !startDate && (
                        <div style={{ fontSize: 12, color: "red" }}>
                          This field is required
                        </div>
                      )}
                    </div>
                  </Form.Group>
                </Form.Row>
              </Form>

              <br />
              <br />
              <Form.Row>
                <Form.Group as={Col} md="10" />
                <Form.Group as={Col} md="2" controlId="startDate">
                  <button
                    type="button"
                    className="genric-btn primary radius text-uppercase"
                    onClick={() => this.claculatePrice()}
                    id="cs-cp-next"
                  >
                    NEXT
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
                          id="cs-cp-yourname"
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
                          id="cs-cp-youremail"
                        />
                        {sendMail && !workMail && (
                          <div
                            style={{ fontSize: 12, color: "red" }}
                            className="nav-left"
                          >
                            Email is required
                          </div>
                        )}
                        {sendMail &&
                          this.state.emailError !== "" &&
                          workMail && (
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
                          id="cs-cp-yoursubject"
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
                          id="cs-cp-yourmsg"
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
                    className="genric-btn radius btn btn-primary btn btn-primary"
                    id="cs-cp-send"
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
                          id="cs-cp-litesupport-time"
                        />
                        {/* {this.state.liteModelsSubmit !== false && !this.state.liteTimezone &&
                      <div style={{ fontSize: 12, color: "red" }}>This field is required</div>} */}
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
                            this.state.daysLite !== []
                              ? this.state.daysLite
                              : [{ label: "No Option", value: "No Option" }]
                          }
                          ref={this.liteDateRef}
                          displayValue="value"
                          showCheckbox={false}
                          avoidHighlightFirstOption={true}
                          selectedValues={this.state.liteCustomizeDay}
                          id="productdd"
                          disablePreSelectedValues={false}
                          closeOnSelect={false}
                          name="responseproduct"
                          onSelect={(evt) => this.selectDateLite(evt)}
                          onRemove={(evt) => this.removeDateLite(evt)}
                          id="cs-cp-litesupport-day"
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
                          onChange={this.handleSelectChangeLiteStarttime}
                          isDisabled={
                            !!this.state.liteTimezone && this.state.showtimeLite
                              ? false
                              : true
                          }
                          isSearchable={true}
                          options={this.state.littTimeSlot}
                          value={{ label: liteStartTime, value: liteStartTime }}
                          name={"liteStartTime"}
                          id="cs-cp-litesupport-starttime"
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
                          onChange={this.handleSelectChangeLiteEndTime}
                          isDisabled={
                            !!this.state.liteTimezone && this.state.showtimeLite
                              ? false
                              : true
                          }
                          isSearchable={true}
                          options={this.state.littTimeSlot}
                          value={{ label: liteEndTime, value: liteEndTime }}
                          name={"liteEndTime"}
                          id="cs-cp-litesupport-endtime"
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
                          id="cs-cp-litesupport-add"
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
                                  <td scope="row">{user.dayList1}</td>
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
                                id="cs-cp-litesupport-clear"
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
                    className="genric-btn radius btn btn-primary btn btn-primary"
                    id="cs-cp-litesupport-submit"
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
                          id="cs-cp-lite-time8"
                        />
                        {this.state.liteModelsSubmit !== false &&
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
                          id="cs-cp-lite-starttime8"
                        />
                        {this.state.liteModelsSubmit !== false &&
                          !this.state.liteStartTime && (
                            <div style={{ fontSize: 12, color: "red" }}>
                              This field is required
                            </div>
                          )}
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
                          id="cs-cp-lite-endtime8"
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
                    className="genric-btn radius btn btn-primary btn btn-primary"
                    id="cs-cp-lite-submit8"
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
                          id="cs-cp-lite-time16"
                        />
                        {this.state.liteModelsSubmit !== false &&
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
                          id="cs-cp-lite-starttime16"
                        />
                        {this.state.liteModelsSubmit !== false &&
                          !this.state.liteStartTime && (
                            <div style={{ fontSize: 12, color: "red" }}>
                              This field is required
                            </div>
                          )}
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
                          id="cs-cp-lites-endtime16"
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
                    className="genric-btn radius btn btn-primary btn btn-primary"
                    id="cs-cp-lite-submit16"
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
                          id="cs-cp-entersupport-time"
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
                            this.state.daysEnterprise !== []
                              ? this.state.daysEnterprise
                              : [{ label: "No Option", value: "No Option" }]
                          }
                          ref={this.enterpriseDateRef}
                          displayValue="value"
                          showCheckbox={false}
                          avoidHighlightFirstOption={true}
                          id="productdd"
                          disablePreSelectedValues={false}
                          closeOnSelect={false}
                          selectedValues={this.state.enterpriseCustomizeDay}
                          name="responseproduct"
                          onSelect={(evt) => this.selectDateEnterprise(evt)}
                          onRemove={(evt) => this.removeDateEnterprise(evt)}
                          disabled={this.state.days !== [] ? true : false}
                          id="cs-cp-entersupport-day"
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
                          onChange={this.handleSelectChangeEnterpriseStarttime}
                          isDisabled={
                            !!this.state.enterpriseTimezone &&
                            this.state.showtimeEnterprise
                              ? false
                              : true
                          }
                          isSearchable={true}
                          options={this.state.littTimeSlot}
                          value={{
                            label: enterpriseStartTime,
                            value: enterpriseStartTime,
                          }}
                          name={"enterpriseStartTime"}
                          id="cs-cp-entersupport-starttime"
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
                          onChange={this.handleSelectChangeEnterpriseEndTime}
                          isDisabled={
                            !!this.state.enterpriseTimezone &&
                            this.state.showtimeEnterprise
                              ? false
                              : true
                          }
                          isSearchable={true}
                          options={this.state.littTimeSlot}
                          value={{
                            label: enterpriseEndTime,
                            value: enterpriseEndTime,
                          }}
                          name={"enterpriseEndTime"}
                          id="cs-cp-entersupport-endtime"
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
                          id="cs-cp-entersupport-add"
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
                                  <td scope="row">{user.dayList1}</td>
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
                                id="cs-cp-entersupport-clear"
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
                    className="genric-btn radius btn btn-primary btn btn-primary"
                    id="cs-cp-entersupport-submit"
                  >
                    SUBMIT
                  </button>
                </Modal.Footer>
              </Modal>

              <Modal
                show={
                  enterpriseModels == "8 X 5 Weekdays (office hours support)"
                }
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
                          id="cs-cp-enter-time8"
                        />
                        {this.state.enterpriseModelsSubmit !== false &&
                          !this.state.enterpriseTimezone && (
                            <div style={{ fontSize: 12, color: "red" }}>
                              This field is required
                            </div>
                          )}
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
                          id="cs-cp-enter-starttime8"
                        />
                        {this.state.enterpriseModelsSubmit !== false &&
                          !this.state.enterpriseStartTime && (
                            <div style={{ fontSize: 12, color: "red" }}>
                              This field is required
                            </div>
                          )}
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
                          id="cs-cp-enter-endtime8"
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
                      this.enterpriseAdd(
                        "8 X 5 Weekdays (office hours support)"
                      )
                    }
                    className="genric-btn radius btn btn-primary btn btn-primary"
                    id="cs-cp-enter-submit8"
                  >
                    SUBMIT
                  </button>
                </Modal.Footer>
              </Modal>

              <Modal
                show={enterpriseModels == "16 X 5 After office hours support"}
                onHide={(e) =>
                  this.handleCloseEnterprise(
                    "16 X 5 After office hours support"
                  )
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
                          id="cs-cp-enter-time16"
                        />
                        {this.state.enterpriseModelsSubmit !== false &&
                          !this.state.enterpriseTimezone && (
                            <div style={{ fontSize: 12, color: "red" }}>
                              This field is required
                            </div>
                          )}
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
                          id="cs-cp-enter-starttime16"
                        />
                        {this.state.enterpriseModelsSubmit !== false &&
                          !this.state.enterpriseStartTime && (
                            <div style={{ fontSize: 12, color: "red" }}>
                              This field is required
                            </div>
                          )}
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
                          id="cs-cp-enters-endtime16"
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
                    className="genric-btn radius btn btn-primary btn btn-primary"
                    id="cs-cp-enter-submit16"
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
                          id="cs-cp-premiumsupport-time"
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
                            this.state.daysPremium !== []
                              ? this.state.daysPremium
                              : [{ label: "No Option", value: "No Option" }]
                          }
                          ref={this.premiumDateRef}
                          displayValue="value"
                          showCheckbox={false}
                          avoidHighlightFirstOption={true}
                          id="productdd"
                          disablePreSelectedValues={false}
                          closeOnSelect={false}
                          selectedValues={this.state.premiumCustomizeDay}
                          name="responseproduct"
                          onSelect={(evt) => this.selectDatePremium(evt)}
                          onRemove={(evt) => this.removeDatePremium(evt)}
                          disabled={this.state.days !== [] ? true : false}
                          id="cs-cp-premiumsupport-day"
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
                          onChange={this.handleSelectChangePremiumStarttime}
                          isDisabled={
                            !!this.state.premiumTimezone &&
                            this.state.showtimePremium
                              ? false
                              : true
                          }
                          isSearchable={true}
                          options={this.state.littTimeSlot}
                          value={{
                            label: premiumStartTime,
                            value: premiumStartTime,
                          }}
                          name={"premiumStartTime"}
                          id="cs-cp-premiumsupport-starttime"
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
                          onChange={this.handleSelectChangePremiumEndTime}
                          isDisabled={
                            !!this.state.premiumTimezone &&
                            this.state.showtimePremium
                              ? false
                              : true
                          }
                          isSearchable={true}
                          options={this.state.littTimeSlot}
                          value={{
                            label: premiumEndTime,
                            value: premiumEndTime,
                          }}
                          name={"premiumEndTime"}
                          id="cs-cp-premiumsupport-endtime"
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
                          id="cs-cp-premiumsupport-add"
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
                                  <td scope="row">{user.dayList1}</td>
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
                                id="cs-cp-premiumsupport-clear"
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
                    className="genric-btn radius btn btn-primary btn btn-primary"
                    id="cs-cp-premiumsupport-submit"
                  >
                    SUBMIT
                  </button>
                </Modal.Footer>
              </Modal>

              <Modal
                show={premiumModels == "8 X 5 Weekdays (office hours support)"}
                onHide={(e) =>
                  this.handleClosepremium(
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
                          onChange={(evt) => this.premiumTimeZone(evt)}
                          isSearchable={true}
                          value={{
                            label: this.state.premiumTimezone,
                            value: this.state.premiumTimezone,
                          }}
                          role={country}
                          options={timezoneOption}
                          name="country"
                          id="cs-cp-premium-time8"
                        />
                        {this.state.premiumModelsSubmit !== false &&
                          !this.state.premiumTimezone && (
                            <div style={{ fontSize: 12, color: "red" }}>
                              This field is required
                            </div>
                          )}
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
                          isDisabled={
                            !!this.state.premiumTimezone ? false : true
                          }
                          isSearchable={true}
                          options={this.state.littTimeSlot}
                          value={{
                            label: premiumStartTime,
                            value: premiumStartTime,
                          }}
                          name={"premiumStartTime"}
                          id="cs-cp-premium-starttime8"
                        />
                        {this.state.premiumModelsSubmit !== false &&
                          !this.state.premiumStartTime && (
                            <div style={{ fontSize: 12, color: "red" }}>
                              This field is required
                            </div>
                          )}
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
                          id="cs-cp-premium-endtime8"
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
                    className="genric-btn radius btn btn-primary btn btn-primary"
                    id="cs-cp-premium-submit8"
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
                          id="cs-cp-premium-time16"
                        />
                        {this.state.premiumModelsSubmit !== false &&
                          !this.state.premiumTimezone && (
                            <div style={{ fontSize: 12, color: "red" }}>
                              This field is required
                            </div>
                          )}
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
                          isDisabled={
                            !!this.state.premiumTimezone ? false : true
                          }
                          isSearchable={true}
                          options={this.state.littTimeSlot}
                          value={{
                            label: premiumStartTime,
                            value: premiumStartTime,
                          }}
                          name={"premiumStartTime"}
                          id="cs-cp-premium-starttime16"
                        />
                        {this.state.premiumModelsSubmit !== false &&
                          !this.state.premiumStartTime && (
                            <div style={{ fontSize: 12, color: "red" }}>
                              This field is required
                            </div>
                          )}
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
                          id="cs-cp-premiums-endtime16"
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
                    className="genric-btn radius btn btn-primary btn btn-primary"
                    id="cs-cp-premium-submit16"
                  >
                    SUBMIT
                  </button>
                </Modal.Footer>
              </Modal>
            </Container>
            <Footer />
          </div>
        )}
      </div>
    );
  }
}

CustomizePage.propTypes = {
  requestloadtimezone: PropTypes.func,
  liteRecommended: PropTypes.func,
  enterpriseRecommended: PropTypes.func,
  premiumRecommended: PropTypes.func,
  timeSlotLite: PropTypes.func,
  recommendedPrice: PropTypes.func,
  automatedEndTime: PropTypes.func,
  automatedEndTimeEnterprise: PropTypes.func,
  automatedEndTimePremium: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    timezonelist: state.customizePageReducer.timezonelist,
    liteRecommended: state.customizePageReducer.liteRecommended,
    enterpriseRecommended: state.customizePageReducer.enterpriseRecommended,
    premiumRecommended: state.customizePageReducer.premiumRecommended,
    timeSlotLite: state.customizePageReducer.timeSlotLite,
    recommendedPrice: state.customizePageReducer.recommendedPrice,
    dataCustomizePage1: state.customizePageReducer.dataCustomizePage1,
    automatedEndTime: state.customizePageReducer.automatedEndTime,
    automatedTime: state.customizePageReducer.automatedTime,
    automatedEndTimeEnterprise:
      state.customizePageReducer.automatedEndTimeEnterprise,
    automatedTimeEnterprise: state.customizePageReducer.automatedTimeEnterprise,
    automatedTimePremium: state.customizePageReducer.automatedTimePremium,
    automatedEndTimePremium: state.customizePageReducer.automatedEndTimePremium,
    isSuccess: state.contactUsReducer.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestloadtimezone: (timezone) => dispatch(requestloadtimezone(timezone)),
  liteClaculatePrice: (data) => dispatch(requestLiteClaculatePrice(data)),
  enterpriseClaculatePrice: (data) =>
    dispatch(requestEnterpriseClaculatePrice(data)),
  premiumClaculatePrice: (data) => dispatch(requestPremiumClaculatePrice(data)),
  litetimeslot: (liteTimeZone) => dispatch(litetimeslot(liteTimeZone)),
  claculatePrice: (data) => dispatch(requestClaculatePrice(data)),
  dataCustomizePage1: (data) => dispatch(dataCustomizePage1(data)),
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
  requestContactUs: (ticket) => dispatch(requestContactUs(ticket)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomizePage);
