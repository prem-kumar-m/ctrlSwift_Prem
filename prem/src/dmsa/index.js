import { PropTypes } from "prop-types";
import React from "react";
import {
  Button, ButtonGroup, ButtonToolbar, Form,
  Modal
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/footer/Footer.js";
import Header from "../components/header_login/HeaderLogin";
import Loader from "../components/loading";
import * as Constants from "../constants";
import Logo from "../images/logo.png";
import {
  createOrderData, fileUpload, paymentSuccess
} from "./action";

class dmsa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poNumber: "",
      //gstNumber:'',
      files: null,
      checkbox: false,
      plansList: "",
      annexure: ["flase", "false", "false"],
      annexureA: false,
      annexureB: false,
      annexureC: false,
      annexureACheck: false,
      annexureBCheck: false,
      annexureCCheck: false,
      data: "",
      clickSubmit: false,
      clickFileUpload: false,
      dataCustomizePage1: "",
      dataCustomizePage: "",
      recommendedPrice: "",
      page: "1",
      isLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleInputChange = () => {
    this.setState({
      clickSubmit: true,
      checkbox: !this.state.checkbox,
    });

    /*  const data ={
        "email":window.sessionStorage.getItem(Constants.ACCESS_EMAIL),
        //"gstNumber":this.state.gstNumber,
        "plansList":this.state.plansList,
        "isTollFreeNumber":this.state.dataCustomizePage1.isTollFreeNumber,
          "contractDuration":this.state.dataCustomizePage1.contractDuration,
          "payment":this.state.dataCustomizePage1.payment,
          "serviceInitializationDate":this.state.dataCustomizePage1.serviceInitializationDate,
          "currencyCode":this.state.dataCustomizePage.currency==="$"?"USD":"INR",
      }
           ////console.log("data \n \n"+JSON.stringify(data));

             this.state.data=data;

     // if(!!window.sessionStorage.getItem(Constants.ACCESS_EMAIL)){
      var count=0
     for(var i=0;i<this.state.annexure.length;i++){
      if(this.state.annexure[i]=="true"){
        count=count+1;
      }
     }
     //if(this.state.gstNumber ){
      if(count===1){
        ////console.log("1");
        if(this.state.annexureACheck === true){
         this.setState({checkbox: !this.state.checkbox,clickSubmit:true})
         localStorage.setItem('dataDMSA', JSON.stringify(this.state.data));
         this.props.agreementUpdate(this.state.data)
        }else{
         Swal.fire({
           title: "",
           text: "Please click the I Agree in Annexure.",
           icon: 'warning',
           showCancelButton: false,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'OK'
       })
       }
      }

      if(count===2){
        ////console.log("2");
       if(this.state.annexureACheck === true && this.state.annexureBCheck === true){
        this.setState({checkbox: !this.state.checkbox,clickSubmit:true})
        localStorage.setItem('dataDMSA', JSON.stringify(this.state.data));
        this.props.agreementUpdate(this.state.data)
       }else{
         Swal.fire({
           title: "",
           text: "Please click the I Agree in Annexure.",
           icon: 'warning',
           showCancelButton: false,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'OK'
       })
       }
     }

     if(count===3){
      ////console.log("3");
       if(this.state.annexureACheck === true && this.state.annexureBCheck === true && this.state.annexureCCheck === true){
        this.setState({checkbox: !this.state.checkbox,clickSubmit:true})
        localStorage.setItem('dataDMSA', JSON.stringify(this.state.data));
        this.props.agreementUpdate(this.state.data)
       }else{
         Swal.fire({
           title: "",
           text: "Please click the I Agree in Annexure.",
           icon: 'warning',
           showCancelButton: false,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'OK'
       })
       }
     }
//    }else{
//      Swal.fire({
//          title: "",
//          text: "Please fill the Tax ID.",
//          icon: 'warning',
//          showCancelButton: false,
//          confirmButtonColor: '#3085d6',
//          cancelButtonColor: '#d33',
//          confirmButtonText: 'OK'
//      })
//  }

    /* }else{
      Swal.fire({
          title: "",
          text: "Please login before proceeding.",
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK'
      })
  } */
  };

  annexureACheck = (event) => {
    this.setState({
      annexureACheck: !this.state.annexureACheck,
      annexureA: false,
    });
  };

  annexureBCheck = (event) => {
    this.setState({
      annexureBCheck: !this.state.annexureBCheck,
      annexureB: false,
    });
  };

  annexureCCheck = (event) => {
    this.setState({
      annexureCCheck: !this.state.annexureCCheck,
      annexureC: false,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    ////console.log(value.length);
    this.setState({
      [name]: value,
    });
    if (value.length === 0) {
      // document.getElementById("exampleFormControlFile1").value = "";
      this.setState({ file: "" });
    }
  };

  handleCloseEnterprise = () => {
    this.setState({
      annexureA: false,
      annexureB: false,
      annexureC: false,
    });
  };

  annexureA = () => {
    this.setState({
      annexureA: true,
    });
  };

  annexureB = () => {
    this.setState({
      annexureB: true,
    });
  };

  annexureC = () => {
    this.setState({
      annexureC: true,
    });
  };

  convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
        console.log(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  file = (e) => {
    let file = e.target.files[0];
    console.log("e.target.files[0]\n" + JSON.stringify(e.target.files[0]));
    console.log("e.target.files[0]\n" + JSON.stringify(e.target.files[0].size));
    const fileSize = e.target.files[0].size;
    const fsize = Math.round(fileSize / 1024);
    const base64 = this.convertBase64(file);
    console.log(base64); //====base64======convertion========
    ////console.log("fsize"+fsize)
    ////console.log("file"+file)
    ////console.log(file.type =="application/pdf");
    if (file.type == "application/pdf") {
      if (fsize < 1025 && fsize > 1) {
        this.setState({ file: file });
      } else {
        // document.getElementById("exampleFormControlFile1").value = "";
        this.setState({ file: "" });
        Swal.fire({
          title: "",
          text: "File Size Should Be Minimum 2KB and Maximun 1024KB",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    } else if (file.type !== "application/pdf") {
      // document.getElementById("exampleFormControlFile1").value = "";
      this.setState({ file: "" });
      Swal.fire({
        title: "",
        text: "Only PDF File Accepted",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };

  fileUpload = (e) => {
    this.setState({ clickFileUpload: true });
    console.log(this.state.file);
    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("number", this.state.poNumber);
    formData.append(
      "email",
      window.sessionStorage.getItem(Constants.ACCESS_EMAIL)
    );
    console.log(formData);
    if (this.state.file && this.state.poNumber) {
      this.props.fileUpload(formData);
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
    /*}else{
          Swal.fire({
            title: "",
            text: "Please login before proceeding",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        })
        }*/
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
    //this.pop()
    if (
      window.sessionStorage.getItem(Constants.ACCESS_INVOICENUMB) !==
        undefined &&
      window.sessionStorage.getItem(Constants.ACCESS_INVOICENUMB) != null
    ) {
      ////console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_INVOICENUMB));
      // this.props.clearTokensCustomer();
    }
    if (
      window.sessionStorage.getItem(Constants.ACCESS_COUNTRY) !== undefined &&
      window.sessionStorage.getItem(Constants.ACCESS_COUNTRY) != null
    ) {
      ////console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_COUNTRY));
      // this.props.clearTokensCustomer();
    }
    if (
      window.sessionStorage.getItem(Constants.ACCESS_INVOICEDATE) !==
        undefined &&
      window.sessionStorage.getItem(Constants.ACCESS_INVOICEDATE) != null
    ) {
      ////console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_INVOICEDATE));
      // this.props.clearTokensCustomer();
    }

    if (
      window.sessionStorage.getItem(Constants.ACCESS_PAYMENTTERMS) !==
        undefined &&
      window.sessionStorage.getItem(Constants.ACCESS_PAYMENTTERMS) != null
    ) {
      ////console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_PAYMENTTERMS));
      // this.props.clearTokensCustomer();
    }
    if (
      window.sessionStorage.getItem(Constants.ACCESS_DUEDATE) !== undefined &&
      window.sessionStorage.getItem(Constants.ACCESS_DUEDATE) != null
    ) {
      ////console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_DUEDATE));
      // this.props.clearTokensCustomer();
    }

    if (
      window.sessionStorage.getItem(Constants.ACCESS_ITEM) !== undefined &&
      window.sessionStorage.getItem(Constants.ACCESS_ITEM) != null
    ) {
      ////console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_ITEM));
      // this.props.clearTokensCustomer();
    }

    if (
      window.sessionStorage.getItem(Constants.ACCESS_SUBTOTAL) !== undefined &&
      window.sessionStorage.getItem(Constants.ACCESS_SUBTOTAL) != null
    ) {
      ////console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_SUBTOTAL));
      // this.props.clearTokensCustomer();
    }

    if (
      window.sessionStorage.getItem(Constants.ACCESS_TOTAL) !== undefined &&
      window.sessionStorage.getItem(Constants.ACCESS_TOTAL) != null
    ) {
      ////console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_TOTAL));
      // this.props.clearTokensCustomer();
    }
    if (
      window.sessionStorage.getItem(Constants.ACCESS_BALANCEDUE) !==
        undefined &&
      window.sessionStorage.getItem(Constants.ACCESS_BALANCEDUE) != null
    ) {
      ////console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_BALANCEDUE));
      // this.props.clearTokensCustomer();
    }
    if (
      window.sessionStorage.getItem(Constants.ACCESS_TOTALINWORDS) !==
        undefined &&
      window.sessionStorage.getItem(Constants.ACCESS_TOTALINWORDS) != null
    ) {
      ////console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_TOTALINWORDS));
      // this.props.clearTokensCustomer();
    }
    if (
      window.sessionStorage.getItem(Constants.ACCESS_ADDRESS) !== undefined &&
      window.sessionStorage.getItem(Constants.ACCESS_ADDRESS) != null
    ) {
      ////console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_ADDRESS));
      // this.props.clearTokensCustomer();
    }

    if (
      window.sessionStorage.getItem(Constants.ACCESS_CITY) !== undefined &&
      window.sessionStorage.getItem(Constants.ACCESS_CITY) != null
    ) {
      ////console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_CITY));
      // this.props.clearTokensCustomer();
    }

    if (
      window.sessionStorage.getItem(Constants.ACCESS_COMPANY) !== undefined &&
      window.sessionStorage.getItem(Constants.ACCESS_COMPANY) != null
    ) {
      ////console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_COMPANY));
      // this.props.clearTokensCustomer();
    }
    if (
      window.sessionStorage.getItem(Constants.ACCESS_PINCODE) !== undefined &&
      window.sessionStorage.getItem(Constants.ACCESS_PINCODE) != null
    ) {
      ////console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_PINCODE));
      // this.props.clearTokensCustomer();
    }
    if (
      window.sessionStorage.getItem(Constants.ACCESS_INVOICETOKEN) !==
        undefined &&
      window.sessionStorage.getItem(Constants.ACCESS_INVOICETOKEN) != null
    ) {
      ////console.log('login INVOICE NUMB.' + window.sessionStorage.getItem(Constants.ACCESS_INVOICETOKEN));
      // this.props.clearTokensCustomer();
    }

    ////console.log("this.props.dataCustomizePage \n"+JSON.stringify(this.props.dataCustomizePage));
    var recommendedPrice = JSON.parse(localStorage.getItem("recommendedPrice"));
    ////console.log("data \n"+JSON.stringify(recommendedPrice))
    var dataCustomizePage1 = JSON.parse(
      localStorage.getItem("dataCustomizePage1")
    );
    ////console.log("dataCustomizePage1 \n"+JSON.stringify(dataCustomizePage1))
    var dataCustomizePage = JSON.parse(
      localStorage.getItem("dataCustomizePage")
    );
    ////console.log("data \n"+JSON.stringify(dataCustomizePage))
    this.state.planDetails = JSON.parse(localStorage.getItem("customize1"));
    ////console.log("data \n"+JSON.stringify(this.state.planDetails))

    //////console.log("this.props.recommendedPrice \n"+JSON.stringify(this.state.gstNumber));
    if (this.state.poNumber.length < 4) {
      this.setState({ file: "" });
    }
    ////console.log("this.props.recommendedPrice \n"+JSON.stringify(this.props.recommendedPrice));
    //  ////console.log("this.props.priceByTerms \n"+JSON.stringify(this.props.priceByTerms));
    //  ////console.log("this.props.pricedetails \n"+JSON.stringify(this.props.pricedetails));
    ////console.log("this.props.dataCustomizePage \n"+JSON.stringify(this.props.dataCustomizePage));
    ////console.log("this.props.dataCustomizePage1 \n"+JSON.stringify(this.props.dataCustomizePage1));
    // this.state.recommendedPrice =this.props.recommendedPrice;
    // this.state.dataCustomizePage = this.props.dataCustomizePage;
    // this.state.dataCustomizePage1 = this.props.dataCustomizePage1;
    this.state.recommendedPrice = JSON.parse(
      localStorage.getItem("recommendedPrice")
    );
    this.state.dataCustomizePage = JSON.parse(
      localStorage.getItem("dataCustomizePage")
    );
    this.state.dataCustomizePage1 = JSON.parse(
      localStorage.getItem("dataCustomizePage1")
    );
    // ////console.log("this.state.dataCustomizePage1 \n"+JSON.stringify(this.state.dataCustomizePage1.plansList.length));
    if (
      this.state.dataCustomizePage1 !== undefined &&
      this.state.dataCustomizePage1 !== null &&
      this.state.dataCustomizePage1.plansList.length > 0 &&
      this.state.recommendedPrice !== undefined &&
      this.state.recommendedPrice !== null &&
      this.state.recommendedPrice.modelList.length > 0 &&
      this.state.dataCustomizePage !== undefined &&
      this.state.dataCustomizePage !== null &&
      this.state.dataCustomizePage.data.length > 0
    ) {
      //&& !this.state.gstNumber
      if (this.state.dataCustomizePage1.plansList.length === 1) {
        this.setState({ annexure: ["true", "false", "false"] });
      } else if (this.state.dataCustomizePage1.plansList.length === 2) {
        this.setState({ annexure: ["true", "true", "false"] });
      } else if (this.state.dataCustomizePage1.plansList.length === 3) {
        this.setState({ annexure: ["true", "true", "true"] });
      }

      const plansList = this.state.dataCustomizePage1.plansList.map(
        (row, rowkey) => {
          return {
            plan: row.plan,
            commericialModel: row.commericialModel,
            recommendSeat: row.recommendSeat,
            ticket: row.ticket,
            serviceSupport: row.serviceSupport,
            supportWindow: row.supportWindow,
            recommendPrice:
              this.state.recommendedPrice.modelList[rowkey].recommendPrice,
            recommendModel:
              this.state.recommendedPrice.modelList[rowkey].recommendModel,
            userEnteredSeatCount:
              this.state.recommendedPrice.modelList[rowkey]
                .userEnteredSeatCount,
            recommendSeat:
              this.state.recommendedPrice.modelList[rowkey].recommendSeat,
            selectedModelPrice:
              this.state.recommendedPrice.modelList[rowkey].selectedModelPrice,
            paymentTerms:
              this.state.dataCustomizePage.data[rowkey].paymentTerms,
            individualPrice:
              this.state.dataCustomizePage.data[rowkey].individualPlanPrice,
          };
        }
      );
      ////console.log("plansList \n"+JSON.stringify(plansList));
      this.state.plansList = plansList;
    }
  }

  pop = () => {
    Swal.fire({
      title:
        " Payment completed successfully" +
        "\n\n" +
        "Thanks for placing order with CtrlSwift!",
      text: "We value your confidence and Trust! We will start deliver as per your service expectations! CtrlSwift Project Manager will reach you shortly!  Please reach us pm@CtrlSwift.com and +1 67 8666 3463 in case of queries",

      icon: "success",

      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
    }).then((res) => {
      if (res.value) {
        window.location.href = "/viewInvoice";
      }
    });
  };

  call = (response) => {
    ////console.log(JSON.stringify(response));
    //this.props.paymentDetails(response);
    ////console.log(JSON.stringify(this.state.planDetails));
    var paymentResponces = JSON.parse(localStorage.getItem("paymentResponces"));
    console.log("paymentResponces \n" + JSON.stringify(paymentResponces));
    var createOrderData = JSON.parse(localStorage.getItem("createOrderData"));
    console.log("createOrderData \n" + JSON.stringify(createOrderData));
    const data = {
      customerId: window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID),
      email: window.sessionStorage.getItem(Constants.ACCESS_EMAIL),
      //"gstNumber":this.state.planDetails.gstNumber,
      plansList: paymentResponces,
      isTollFreeNumber: this.state.planDetails.isTollFreeNumber,
      contractDuration: this.state.planDetails.contractDuration,
      serviceInitializationDate:
        this.state.planDetails.serviceInitializationDate,
      currencyCode: createOrderData.currencyCode,
      generatedSignature: response.razorpay_signature,
      orderId: response.razorpay_order_id,
      razorPaymentId: response.razorpay_payment_id,
    };
    console.log(JSON.stringify(data));

    this.setState({
      isLoading: true,
    });
    this.props.paymentDetails(data);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.state.dataCustomizePage1 !== undefined &&
      this.state.dataCustomizePage1 !== null &&
      this.state.dataCustomizePage1.plansList.length > 0 &&
      this.state.recommendedPrice !== undefined &&
      this.state.recommendedPrice !== null &&
      this.state.recommendedPrice.modelList.length > 0 &&
      this.state.dataCustomizePage !== undefined &&
      this.state.dataCustomizePage !== null &&
      this.state.dataCustomizePage.data.length > 0
    ) {
      //&& !this.state.gstNumber
    }

    if (
      this.props.fileUploadresponces !== undefined &&
      this.props.fileUploadresponces !== null
    ) {
      if (this.props.fileUploadresponces !== prevProps.fileUploadresponces) {
        if (
          this.props.fileUploadresponces.success == true &&
          this.state.clickFileUpload
        ) {
          this.state.clickFileUpload = false;
          this.setState({
            file: "",
            files: "",
            poNumber: "",
          });
          //this.state.files=null,
          //document.getElementById("examplepoNumber").innerHTML ='';
  //        document.getElementById("exampleFormControlFile1").value = "";
          Swal.fire({
            title: "",
            text: "File uploaded is successfully",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          });
        }
      }
    }

    if (
      this.props.paymentStaus !== undefined &&
      this.props.paymentStaus !== null
    ) {
      if (this.props.paymentStaus !== prevProps.paymentStaus) {
        ////console.log(JSON.stringify(this.props.paymentStaus) );

        this.setState({
          isLoading: false,
        });
        if (this.props.paymentStaus.success == true) {
          this.pop();
        } else {
          Swal.fire({
            title: "",
            text: this.props.paymentStaus.message,
            icon: "info",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          });
        }
        //         if(this.props.paymentStaus.success == true ){
        //             Swal.fire({
        //                 title: "",
        //                 text: "Payment completed successfully",
        //                 icon: 'info',
        //                 showCancelButton: false,
        //                 confirmButtonColor: '#3085d6',
        //                 cancelButtonColor: '#d33',
        //                // confirmButtonText: 'OK'
        //             }).then((res) => {
        //                      if(res.value){
        //                        this.pop()
        //                          //window.location.href = "/viewInvoice";
        //                      }})
        // }
      }
    }

    if (this.props.createOrderId !== prevProps.createOrderId) {
      if (this.props.createOrderId.success == true) {
        this.loadRazorpay();
        this.state.paymentData = this.props.createOrderId;
      } else if (this.props.createOrderId.success == false) {
        Swal.fire({
          title: "Note",
          text: this.props.createOrderId.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            this.setState({
              isLoading: false,
            });
          }
        });
      }
    }

    if (
      this.props.updateAgreement !== undefined &&
      this.props.updateAgreement !== null
    ) {
      if (this.props.updateAgreement !== prevProps.updateAgreement) {
        if (
          this.props.updateAgreement.success == true &&
          this.state.clickSubmit
        ) {
          window.sessionStorage.setItem(
            Constants.ACCESS_INVOICENUMB,
            this.props.updateAgreement.invoiceNumber
          );
          window.sessionStorage.setItem(
            Constants.ACCESS_COMPANY,
            this.props.updateAgreement.company
          );
          window.sessionStorage.setItem(
            Constants.ACCESS_CITY,
            this.props.updateAgreement.city
          );
          window.sessionStorage.setItem(
            Constants.ACCESS_ADDRESS,
            this.props.updateAgreement.address
          );
          window.sessionStorage.setItem(
            Constants.ACCESS_PINCODE,
            this.props.updateAgreement.pincode
          );
          window.sessionStorage.setItem(
            Constants.ACCESS_COUNTRY,
            this.props.updateAgreement.country
          );

          window.sessionStorage.setItem(
            Constants.ACCESS_INVOICEDATE,
            this.props.updateAgreement.invoiceDate
          );
          window.sessionStorage.setItem(
            Constants.ACCESS_PAYMENTTERMS,
            this.props.updateAgreement.paymentTerms
          );
          window.sessionStorage.setItem(
            Constants.ACCESS_DUEDATE,
            this.props.updateAgreement.dueDate
          );
          window.sessionStorage.setItem(
            Constants.ACCESS_ITEM,
            this.props.updateAgreement.lineItems[1].itemAndDescription
          );
          window.sessionStorage.setItem(
            Constants.ACCESS_SUBTOTAL,
            this.props.updateAgreement.subtotal
          );
          window.sessionStorage.setItem(
            Constants.ACCESS_BALANCEDUE,
            this.props.updateAgreement.balanceDue
          );
          window.sessionStorage.setItem(
            Constants.ACCESS_TOTAL,
            this.props.updateAgreement.total
          );
          window.sessionStorage.setItem(
            Constants.ACCESS_TOTALINWORDS,
            this.props.updateAgreement.totalInWords
          );
          window.sessionStorage.setItem(
            Constants.ACCESS_INVOICETOKEN,
            this.props.updateAgreement.accessToken
          );
          localStorage.setItem(
            "updateAgreement",
            JSON.stringify(this.props.updateAgreement)
          );
          this.props.history.push("/invoiceCreate");
          this.state.clickSubmit = false;
          this.state.checkbox = false;
        } else if (
          this.props.updateAgreement.success == false &&
          this.state.clickSubmit
        ) {
          this.state.clickSubmit = false;
          this.state.checkbox = false;

          if (this.props.updateAgreement.message == "E251") {
            Swal.fire({
              title: "",
              text:
                "Request to keep the currency type as previous plan taken(" +
                this.props.updateAgreement.currencyCode +
                ")",
              icon: "warning",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OK",
            }).then((res) => {
              if (res.value) {
                this.props.history.push("/planDetails");
              }
            });
          } else {
            Swal.fire({
              title: "",
              text: this.props.updateAgreement.message,
              icon: "warning",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OK",
            }).then((res) => {
              if (res.value) {
                this.setState({
                  isLoading: false,
                });
              }
            });
          }
        }
      }
    }
  }

  navigate = (url) => {
    this.props.history.push(url);
  };

  page = (e) => {
    ////console.log("e \n"+JSON.stringify(e));
    this.setState({
      page: e.value,
    });
  };

  displayRazorpay = () => {
    this.setState({
      isLoading: false,
    });
    ////console.log("this.state.paymentData.currency,"+JSON.stringify(this.state.paymentData))
    const options = {
      key: this.state.paymentData.keyId,
      amount: this.state.paymentData.amount,
      currency: this.state.paymentData.currency,
      name: "services",
      description: this.state.paymentData.description,
      image: Logo,
      order_id: this.state.paymentData.orderId,
      handler: (response) => {
        ////console.log(JSON.stringify(response));

        this.state.paymentResponces = response;
        if (
          response.razorpay_payment_id &&
          response.razorpay_order_id &&
          response.razorpay_signature
        ) {
          this.call(response);
        }
      },

      prefill: {
        name: this.state.paymentData.customerName,
        email: this.state.paymentData.email,
        contact: this.state.paymentData.contact,
      },
    };
    const paymentObject = new window.Razorpay(options);
    ////console.log("paymentObject \n"+paymentObject)
    paymentObject.open();
    ////console.log("paymentObject \n"+paymentObject)
    paymentObject.on("payment.failed", function (response) {
      ////console.log(JSON.stringify(response));
    });
  };

  loadRazorpay = () => {
    ////console.log("Razorpay ")
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
    script.onload = this.displayRazorpay;
  };

  payNow = () => {
    var createOrderData = JSON.parse(localStorage.getItem("createOrderData"));
    console.log("data \n" + JSON.stringify(createOrderData));
    console.log("-----" + this.state.checkbox);
    if (this.state.poNumber === "") {
      if (this.state.checkbox || this.state.clickFileUpload === true) {
        this.props.createOrderData(createOrderData);
        this.setState({
          isLoading: true,
        });
      } else {
        Swal.fire({
          title: "",
          text: "Please accept terms and conditions",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    } else if (this.state.poNumber !== "") {
      if (this.state.checkbox && this.state.clickFileUpload === true) {
        this.props.createOrderData(createOrderData);
        this.setState({
          isLoading: true,
        });
      } else if (
        this.state.checkbox === false &&
        this.state.clickFileUpload === false
      ) {
        Swal.fire({
          title: "",
          text: "Please accept terms and conditions and Upload PO File",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      } else if (
        this.state.checkbox === true &&
        this.state.clickFileUpload === false
      ) {
        Swal.fire({
          title: "",
          text: "Please Upload PO File ",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    }

  };

  render() {
    const { poNumber, gstNumber, files } = this.state;

    return (
      <div>
        <Header navigate={(url) => this.navigate("/")} />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div>
            <div className="banner-space"></div>
            <section
              className="relative banner-area-inner16"
              style={{ paddingTop: "200px", textAlign: "center" }}
            >
              <div className="overlay overlay-bg overlay-bg-blk"></div>
              <div className="container">
                <div className="row height align-items-center justify-content-center">
                  <div className="col-lg-10">
                    <div className="generic-banner-content">
                      <h2 className="head2-inner">One Process - One Tool</h2>
                      <p className="text-white" style={{ opacity: 0.5 }}>
                        CtrlSwift comprises of a robust maturity assessment
                        methodology and transformation cookbooks to
                        progressively drive the Service Desk transformation to
                        the desired end-state.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <br />

            <main className="main-content bgc-grey-100">
              <div id="mainContent">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-1" />
                      <div className="col-md-10">
                        <div
                          className="bgc-white p-20"
                          style={{ paddingBottom: "0px" }}
                        >
                          <br />
                          <div className="mT-3">
                            <form name="form" onSubmit={this.handleSubmit}>
                              <div className="form-row col-md-12">
                                <div className={"form-group col-md-5"}>
                                  <label htmlFor="examplepoNumber">
                                    PO Number(Optional)
                                  </label>
                                  <input
                                    type="text"
                                    ref={(input) => (this.poNumber = input)}
                                    className="form-control"
                                    id="examplepoNumber"
                                    name="poNumber"
                                    value={poNumber}
                                    disabled={this.state.mode === "edit"}
                                    onChange={this.handleChange}
                                    id="cs-dmsa-pono"
                                  />
                                  {this.state.clickFileUpload &&
                                    !this.state.poNumber && (
                                      <div
                                        style={{ fontSize: 12, color: "red" }}
                                      >
                                        This field is required
                                      </div>
                                    )}
                                </div>
                                <div className="col-md-2" />
                              </div>
                              <div className="form-row col-md-12">
                                <div className="form-group col-md-12">
                                  <label for="exampleFormControlFile1">
                                    Upload PO File
                                    <span>
                                      (File Size Should be Min 2KB & Max 1024
                                      KB)
                                    </span>
                                  </label>

                                  <input
                                    type="file"
                                    accept=".pdf"
                                    disabled={
                                      this.state.poNumber.length >= 4
                                        ? false
                                        : true
                                    }
                                    className="form-control-file"
                                    id="exampleFormControlFile1"
                                    name="file"
                                    style={{ borderBlockStyle: "outset" }}
                                    onChange={(e) => this.file(e)}
                                    id="cs-dmsa-pofile"
                                  />
                                  {this.state.clickFileUpload &&
                                    !this.state.file && (
                                      <div
                                        style={{ fontSize: 12, color: "red" }}
                                      >
                                        This field is required
                                      </div>
                                    )}
                                </div>
                              </div>
                              <br />
                              <div className="form-row col-md-12">
                                <div className={"form-group col-md-12"}>
                                  <div>
                                    <ButtonToolbar aria-label="Toolbar with button groups">
                                      <ButtonGroup className="mr-2">
                                        <Button
                                          className="genric-btn primary radius text-uppercase"
                                          variant=" "
                                          disabled={
                                            this.state.poNumber &&
                                            this.state.file
                                              ? false
                                              : true
                                          }
                                          onClick={(e) => this.fileUpload(e)}
                                          id="cs-dmsa-upload"
                                        >
                                          Upload
                                        </Button>
                                      </ButtonGroup>
                                    </ButtonToolbar>
                                  </div>
                                </div>
                              </div>
                              <br />
                              <br />

                              <div>
                                <form method="POST" style={{ marginTop: 60 }}>
                                  <div className="form-group col-md-12">
                                    <div className="col-md-1" />
                                    <div
                                      className=" col-md-10"
                                      style={{
                                        borderBottomStyle: "initial",
                                        marginLeft: "8%",
                                      }}
                                    >
                                      <div className="form-group bgc-white p-40 bd modelcontent">
                                        <p
                                          style={{
                                            fontSize: "12",
                                            fontWeight: "normal",
                                          }}
                                        >
                                          <div>
                                            <div className="text-center">
                                              <h3> SERVICE AGREEMENT</h3>
                                            </div>
                                            <br />
                                            <div className="text-center">
                                              <img
                                                src={Logo}
                                                alt="CtrlSwift"
                                                className="logo_width"
                                              />
                                            </div>
                                            <br />
                                            <p
                                              style={{
                                                fontSize: "12",
                                                fontWeight: "normal",
                                              }}
                                              align="justify"
                                            >
                                              <span
                                                style={{
                                                  fontSize: "14",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                1. Standard of Service:
                                              </span>{" "}
                                              Balbhas shall at all times ensure
                                              that the Services are performed
                                              with due diligence and using
                                              generally accepted industry
                                              standards and practices.
                                              <br />
                                              <span
                                                style={{
                                                  fontSize: "14",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                2. Scope:
                                              </span>{" "}
                                              Balbhas shall carry out the
                                              Services in accordance with the
                                              deliverables and specifications
                                              set out in{" "}
                                              <span
                                                style={{
                                                  fontSize: "14",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                Annexures
                                              </span>
                                              .<br />
                                              <span
                                                style={{
                                                  fontSize: "14",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                3. Term of Agreement:
                                              </span>{" "}
                                              Effective term of the agreement
                                              will be as per the period
                                              mentioned in{" "}
                                              <span
                                                style={{
                                                  fontSize: "14",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                respective Annexure (1Year){" "}
                                              </span>
                                              under this agreement.
                                              <br />
                                              <span
                                                style={{
                                                  fontSize: "14",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                4. Personnel:
                                              </span>{" "}
                                              Balbhas shall assign appropriately
                                              qualified and competent employees
                                              or consultants to perform the
                                              Services. Balbhas shall ensure
                                              that there is continuity in the
                                              employees and consultants assigned
                                              to perform the Services so as to
                                              ensure no disruption or delay in
                                              the performance of the Services or
                                              inconvenience to the Client.
                                              <br />
                                              On Client providing notice for
                                              replacement of personnel, Balbhas
                                              shall replace the personnel with a
                                              competent personnel to the
                                              satisfaction of the client, within
                                              30 days of such notice.
                                              <br />
                                              <span
                                                style={{
                                                  fontSize: "14",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                5.
                                              </span>{" "}
                                              Balbhas will ensure that their
                                              employees on this project will be
                                              covered under the applicable
                                              statutory schemes, like ESI, PF.
                                              <br />
                                              <span
                                                style={{
                                                  fontSize: "14",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                6.
                                              </span>{" "}
                                              Balbhas shall ensure that their
                                              engineers carry out the assignment
                                              in accordance with suitable
                                              business and professional
                                              etiquette. Balbhas shall choose
                                              the personnel for the assignment
                                              after consultation with the Client
                                              and shall be responsible for
                                              ensuring that all aspects of the
                                              assignment are carried out within
                                              the framework of this agreement.
                                              <br />
                                              <span
                                                style={{
                                                  fontSize: "14",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                7. Payment:{" "}
                                              </span>
                                              The amounts and terms as mentioned
                                              in Annexure B of this agreement
                                              will be paid by Client immediately
                                              against submission of the invoice
                                              by Balbhas. Payment shall be made
                                              within 30 days from the date of
                                              Invoice.
                                              <br />
                                              <span
                                                style={{
                                                  fontSize: "14",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                8. Assignment:
                                              </span>{" "}
                                              Balbhas may not assign or
                                              sub-contract any of its rights or
                                              obligations under this Agreement
                                              to a sub-contractor, but only with
                                              the Client’s prior written
                                              consent. A person who is not a
                                              party to this Agreement has no
                                              right under the Contracts (Rights
                                              of Third Parties) Act 2001 to
                                              enforce any term of this
                                              Agreement.
                                              <br />
                                            </p>{" "}
                                          </div>

                                          <div>
                                            {" "}
                                            <p
                                              style={{
                                                fontSize: "12",
                                                fontWeight: "normal",
                                              }}
                                            >
                                              <span
                                                style={{
                                                  fontSize: "14",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                9. Intellectual Property:
                                              </span>{" "}
                                              Balbhas and Client mutually agree
                                              and warrant that any product or
                                              service provided to each other
                                              pursuant tthis Agreement and the
                                              use of the same by either party
                                              shall not result in an
                                              infringement of any laws including
                                              the violation of any intellectual
                                              property.
                                              <br />
                                              <span
                                                style={{
                                                  fontSize: "14",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                10. Service Level Guarantee:
                                              </span>{" "}
                                              Balbhas shall ensure that all
                                              calls are attended to and the
                                              problem rectified based on service
                                              level agreed in Annexure A of this
                                              Agreement.
                                              <br />
                                              <span
                                                style={{
                                                  fontSize: "14",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                11. Confidentiality:{" "}
                                              </span>
                                              Any information that is disclosed
                                              to Balbhas by the Client pursuant
                                              to this Agreement and is
                                              confidential to Client shall be
                                              marked accordingly. Balbhas will
                                              instruct its personnel to keep
                                              such information confidential,
                                              using the same care and discretion
                                              with regard to the identified
                                              information as they use with
                                              information which Balbhas
                                              designates as confidential.
                                              <br />
                                              <span
                                                style={{
                                                  fontSize: "14",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                12. Termination:
                                              </span>{" "}
                                              This Agreement may be terminated
                                              immediately by the Client giving
                                              written notice in the event of a
                                              breach of this Agreement by
                                              Balbhas or if Balbhas should
                                              become insolvent or enters into
                                              liquidation, whether compulsory or
                                              voluntary. In addition, the Client
                                              may by giving sixty (60) days’
                                              prior written notice to Balbhas
                                              terminate this Agreement. Client
                                              agrees to pay Balbhas any pending
                                              payments for services already
                                              delivered prior to the termination
                                              and for all services performed
                                              through the date of cancellation.
                                              <br />
                                              <span
                                                style={{
                                                  fontSize: "14",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                13. Indemnity:
                                              </span>{" "}
                                              Both parties agree to indemnify
                                              each other against breach of
                                              contract or any claim asserted
                                              against either party - for any
                                              infringement of any Intellectual
                                              Property Rights including patents,
                                              copyright, trademark, trade
                                              secrets, industrial design rights
                                              or other proprietary rights
                                              arising from use of Equipment or
                                              any part thereof pursuant to this
                                              Agreement - by any third party;
                                              provided either party agrees to
                                              notify the other party promptly of
                                              any such claim and provides the
                                              required authority and necessary
                                              information and assistance to
                                              investigate and defend, at their
                                              own expense, all claims asserted
                                              against that party as cited above.
                                              <br />
                                              <span
                                                style={{
                                                  fontSize: "14",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                14. Limitation of Liability
                                                (Mutual):
                                              </span>{" "}
                                              Under no circumstances shall the
                                              liability of Balbhas / Client,
                                              regardless of the nature of claim
                                              whether in contract, tort, strict
                                              liability or any other theory of
                                              liability, exceed the lesser of:
                                              a) actual damages or loss assessed
                                              by the arbitrator or any other
                                              dispute resolution mechanism
                                              adopted by the parties under this
                                              Agreement or b) fee received under
                                              this Agreement.
                                              <br />
                                              <span
                                                style={{
                                                  fontSize: "14",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                15. Waiver:
                                              </span>{" "}
                                              Failure or delay on the part of
                                              either party to exercise any right
                                              or remedy (whether single or
                                              partial) under this Agreement
                                              shall not be construed or operated
                                              as a waiver of such right or
                                              remedy or a waiver of such right
                                              to subsequently enforce such right
                                              or remedy.
                                              <br />
                                              <span
                                                style={{
                                                  fontSize: "14",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                16. Arbitration & Governing
                                                Laws:
                                              </span>{" "}
                                              This Agreement is made under and
                                              shall be construed in accordance
                                              with the laws of India. Any
                                              dispute arising out of or in
                                              connection with this Agreement
                                              shall be resolved by arbitration
                                              in accordance with the Arbitration
                                              and Conciliation Act, 1996 and the
                                              Arbitrators shall be appointed by
                                              both parties and the place of
                                              Arbitration will be Chennai,
                                              India. In case of dispute not
                                              being resolved by Arbitration, it
                                              shall be referred to courts of
                                              competent jurisdiction and the
                                              place of such jurisdiction shall
                                              be Chennai, India.
                                              <br />
                                            </p>
                                          </div>
                                          <div>
                                            {" "}
                                            <p
                                              style={{
                                                fontSize: "12",
                                                fontWeight: "normal",
                                              }}
                                            >
                                              <span
                                                style={{
                                                  fontSize: "14",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                17. Non Solicitation (Mutual):
                                              </span>{" "}
                                              Except as otherwise expressly
                                              agreed to by Balbhas/Client in
                                              writing, during the term of this
                                              Agreement and for a period of one
                                              (1) year following its termination
                                              or expiration, Balbhas/Client
                                              agrees not to directly or
                                              indirectly or through third
                                              parties solicit or hire for
                                              employment any of
                                              Balbhas’s/Client’s current or
                                              previous employees (unless a
                                              period of twelve months has
                                              elapsed from the last date that
                                              the employee was employed by
                                              Balbhas/Client) or prospective
                                              employee profiles forwarded by
                                              Balbhas.
                                              <br />
                                              <span
                                                style={{
                                                  fontSize: "14",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                18. Force Majeure:
                                              </span>{" "}
                                              Balbhas shall not be considered in
                                              default of its obligations if
                                              performance of such obligations is
                                              prevented or delayed by acts of
                                              God or government, war, riots,
                                              civil disorder, failure or delay
                                              of transportation, or such other
                                              causes which are beyond Balbhas’s
                                              control.
                                              <br />
                                              <span
                                                style={{
                                                  fontSize: "12",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                19. Entire Agreement:
                                              </span>{" "}
                                              This Agreement, including the
                                              Annexures attached hereto, sets
                                              forth the entire Agreement and
                                              understanding of the parties with
                                              respect to the subject matter
                                              hereof, and supersedes all prior
                                              oral and written agreements,
                                              understandings, representations,
                                              conditions and all other
                                              communications relating thereto.
                                              <br />
                                              <span
                                                style={{
                                                  fontSize: "12",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                20. Annexure:
                                              </span>{" "}
                                              <br />
                                              <span
                                                style={{
                                                  fontSize: "12",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                a. Annexure A
                                              </span>{" "}
                                              – Escalation Matrix
                                              <br />
                                              <span
                                                style={{
                                                  fontSize: "12",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                b. Annexure B{" "}
                                              </span>
                                              – Onsite Resource
                                              <br />
                                              <span
                                                style={{
                                                  fontSize: "12",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                c. Annexure C{" "}
                                              </span>
                                              – L1 Server Support
                                              <br />
                                              <span
                                                style={{
                                                  fontSize: "14",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                Note:
                                              </span>{" "}
                                              Any new profiles addition to the
                                              existing contract will be added as
                                              an additional annexures reference
                                              to same MSA with Same Terms &
                                              conditions if it’s notexplicitly
                                              mentioned and MSA is valid, till
                                              any one profile contract is valid.
                                              <br />
                                            </p>
                                            <div className="row tbl-price">
                                              <div className="col-lg-1" />
                                              <div className="table-wrap col-lg-10">
                                                <table className="schdule-table table table-bordered">
                                                  <thead className="thead-light">
                                                    <tr>
                                                      <th
                                                        className="head"
                                                        scope="col"
                                                        style={{
                                                          fontSize: 16,
                                                          fontFamily: "Poppins",
                                                        }}
                                                      >
                                                        Balbhas:
                                                      </th>
                                                      <th
                                                        className="head"
                                                        scope="col"
                                                        style={{
                                                          fontSize: 16,
                                                          fontFamily: "Poppins",
                                                        }}
                                                      >
                                                        Balbhas Business
                                                        Sysnomics Pvt Ltd
                                                      </th>
                                                      <th
                                                        className="head"
                                                        scope="col"
                                                        style={{
                                                          fontSize: 16,
                                                          fontFamily: "Poppins",
                                                        }}
                                                      >
                                                        Client:
                                                      </th>
                                                      <th
                                                        className="head"
                                                        scope="col"
                                                        style={{
                                                          fontSize: 16,
                                                          fontFamily: "Poppins",
                                                        }}
                                                      >
                                                        LatentView Analytics
                                                        Pvt. Ltd.
                                                      </th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    <tr>
                                                      <th scope="row">
                                                        Signature
                                                      </th>
                                                      <td></td>
                                                      <td>Signature</td>
                                                      <td></td>
                                                    </tr>

                                                    <tr>
                                                      <th scope="row">Name</th>
                                                      <td>Mr. Saravanan KP</td>
                                                      <td>Name</td>
                                                      <td>
                                                        Mr.Gowdhaman Jothilingam
                                                      </td>
                                                    </tr>

                                                    <tr>
                                                      <th scope="row">Title</th>
                                                      <td>CEO</td>
                                                      <td>Title </td>
                                                      <td>Senior IT Manager</td>
                                                    </tr>

                                                    <tr>
                                                      <th scope="row">
                                                        Address
                                                      </th>
                                                      <td>
                                                        RMZ Business Millennia,
                                                        Phase 2, 4B, 6th Floor,
                                                        #143 MGR Road,
                                                        Perungudi, Chennai-
                                                        600096
                                                      </td>
                                                      <td>Address</td>
                                                      <td>
                                                        LatentView Analytics
                                                        Pvt. Ltd 5th Floor,
                                                        Neville Tower, Block A3,
                                                        Ramanujan IT City SEZ,
                                                        Rajiv Gandhi Salai
                                                        (OMR), Taramani,
                                                        Chennai-600 113, INDIA
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </div>
                                              <div className="col-lg-1" />
                                            </div>
                                          </div>
                                        </p>
                                      </div>
                                    </div>{" "}
                                    <div className="col-md-1" />
                                  </div>

                                  <br />
                                </form>
                              </div>

                              {this.state.annexure[0] == "true" &&
                              this.state.annexure[1] == "false" &&
                              this.state.annexure[2] == "false" ? (
                                <div className="form-row col-md-12">
                                  <div className={"col-md-5"} />
                                  <div className={"form-group col-md-2"}>
                                    <div>
                                      <ButtonToolbar aria-label="Toolbar with button groups">
                                        <ButtonGroup className="mr-2">
                                          <Button
                                            className="genric-btn primary radius text-uppercase"
                                            variant=" "
                                            onClick={this.annexureA}
                                          >
                                            Annexure A
                                          </Button>
                                        </ButtonGroup>
                                      </ButtonToolbar>
                                    </div>
                                    <div className={"col-md-5"} />
                                  </div>
                                </div>
                              ) : this.state.annexure[0] == "true" &&
                                this.state.annexure[1] == "true" &&
                                this.state.annexure[2] == "false" ? (
                                <div className="form-row col-md-12">
                                  <div className={"col-md-4"} />
                                  <div className={"form-group col-md-4"}>
                                    <div>
                                      <ButtonToolbar aria-label="Toolbar with button groups">
                                        <ButtonGroup className="mr-2">
                                          <Button
                                            className="genric-btn primary radius text-uppercase"
                                            variant=" "
                                            onClick={this.annexureA}
                                          >
                                            Annexure A
                                          </Button>
                                        </ButtonGroup>
                                        <ButtonGroup className="mr-2">
                                          <Button
                                            className="genric-btn primary radius text-uppercase"
                                            variant=" "
                                            onClick={this.annexureB}
                                          >
                                            Annexure B
                                          </Button>
                                        </ButtonGroup>
                                      </ButtonToolbar>
                                    </div>
                                    <div className={"col-md-4"} />
                                  </div>
                                </div>
                              ) : this.state.annexure[0] == "true" &&
                                this.state.annexure[1] == "true" &&
                                this.state.annexure[2] == "true" ? (
                                <div className="form-row col-md-12">
                                  <div className={"col-md-3"} />
                                  <div className={"form-group col-md-6"}>
                                    <div>
                                      <ButtonToolbar aria-label="Toolbar with button groups">
                                        <ButtonGroup className="mr-2">
                                          <Button
                                            className="genric-btn primary radius text-uppercase"
                                            variant=" "
                                            onClick={this.annexureA}
                                            id="cs-dmsa-annexurea"
                                          >
                                            Annexure A
                                          </Button>
                                        </ButtonGroup>
                                        <ButtonGroup className="mr-2">
                                          <Button
                                            className="genric-btn primary radius text-uppercase"
                                            variant=" "
                                            onClick={this.annexureB}
                                            id="cs-dmsa-annexureb"
                                          >
                                            Annexure B
                                          </Button>
                                        </ButtonGroup>
                                        <ButtonGroup className="mr-2">
                                          <Button
                                            className="genric-btn primary radius text-uppercase"
                                            variant=" "
                                            onClick={this.annexureC}
                                            id="cs-dmsa-annexurec"
                                          >
                                            Annexure c
                                          </Button>
                                        </ButtonGroup>
                                      </ButtonToolbar>
                                    </div>
                                    <div className={"col-md-3"} />
                                  </div>
                                </div>
                              ) : null}

                              <Form.Check
                                type="checkbox"
                                label="I agree with the above listed terms and
                      conditions"
                                required
                                name="isGoing"
                                onChange={this.handleInputChange}
                                id="wantUpdate"
                                checked={this.state.checkbox}
                                id="cs-dmsa-check"
                              />
                              <br />
                              <br />
                              <br />
                              <div className="form-row col-md-12">
                                <div className="col-md-5" />
                                <Button
                                  className="genric-btn primary radius text-uppercase"
                                  variant=" "
                                  onClick={this.payNow}
                                  id="cs-dmsa-paynow"
                                >
                                  PAY NOW
                                </Button>
                                <div className="col-md-5" />
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="col-md-1" />
                      </div>{" "}
                    </div>{" "}
                  </div>
                </div>{" "}
              </div>
            </main>

            <Modal
              show={this.state.annexureA}
              size="lg"
              onHide={this.handleCloseEnterprise}
              backdrop={"static"}
            >
              <Modal.Header closeButton>
                <h5 className="text-center">
                  <span>Annexure A</span>
                </h5>
              </Modal.Header>
              <Modal.Body>
                <div className="form-group">
                  <p>
                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                      Annexure A - Contact details and Escalation matrix
                    </span>
                    <br />
                    <br />
                    <span
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        textDecorationLine: "underline",
                      }}
                    >
                      Contact Matrix:
                    </span>{" "}
                    <br />
                    <br />
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                      Level 1:
                    </span>
                    <Link
                      style={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        textDecorationLine: "underline",
                      }}
                    >
                      ServiceDesk@CtrlSwift.com
                    </Link>{" "}
                    <br />
                    <br />
                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                      Level 2: Service Account Manager,
                    </span>
                    <br />
                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                      Gayathiri Balaji
                    </span>
                    <br />
                    <Link
                      style={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        textDecorationLine: "underline",
                      }}
                    >
                      gayathiri.b@CtrlSwift.com
                    </Link>
                    <br />
                    <br />
                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                      Level 3: Service Delivery Head,
                    </span>
                    <br />
                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                      Ramalingam V
                    </span>
                    <br />
                    <Link
                      style={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        textDecorationLine: "underline",
                      }}
                    >
                      ramalingam.v@CtrlSwift.com
                    </Link>
                    <br />
                    <br />
                  </p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="col-sm-3">

                  <Button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    onClick={this.annexureACheck}
                  >
                    I Agree
                  </Button>
                </div>
              </Modal.Footer>
            </Modal>

            <Modal
              show={this.state.annexureB}
              onHide={this.handleCloseEnterprise}
              backdrop={"static"}
            >
              <Modal.Header closeButton>
                <h5 className="text-center">
                  <span>Annexure B</span>
                </h5>
              </Modal.Header>
              <Modal.Body>
                <div className="form-group">File will be update</div>
              </Modal.Body>
              <Modal.Footer>
                <div className="col-sm-3">
                  <Button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    onClick={this.annexureBCheck}
                  >
                    I Agree
                  </Button>
                </div>
              </Modal.Footer>
            </Modal>

            <Modal
              show={this.state.annexureC}
              onHide={this.handleCloseEnterprise}
              backdrop={"static"}
            >
              <Modal.Header closeButton>
                <h5 className="text-center">
                  <span>Annexure C</span>
                </h5>
              </Modal.Header>
              <Modal.Body>
                <div className="form-group">File will be update</div>
              </Modal.Body>
              <Modal.Footer>
                <div className="col-sm-3">
                  <input
                    name="isGoing"
                    type="checkbox"
                    checked={this.state.annexureCCheck}
                    onChange={this.annexureCCheck}
                  />{" "}
                  <text>I Agree</text>I agree with the above listed terms and
                  conditions
                  {/* <Button className="genric-btn primary radius text-uppercase" variant=" "onClick={this.annexureCCheck}>I Agree</Button>  */}
                </div>
              </Modal.Footer>
            </Modal>

            <br />

            <Footer />
          </div>
        )}
      </div>
    );
  }
}
dmsa.propTypes = {
  recommendedPrice: PropTypes.func,
  updateAgreement: PropTypes.func,
  fileUploadresponces: PropTypes.func,
  createOrderId: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    pricedetails: state.priceDetailsReducer.pricedetails,
    recommendedPrice: state.customizePageReducer.recommendedPrice,
    dataCustomizePage1: state.customizePageReducer.dataCustomizePage1,
    dataCustomizePage: state.priceDetailsReducer.dataCustomizePage,
    priceByTerms: state.priceDetailsReducer.priceByTerms,
    updateAgreement: state.dmsaReducer.updateAgreement,
    fileUploadresponces: state.dmsaReducer.fileUploadresponces,
    createOrderId: state.dmsaReducer.createOrderId,
    paymentStaus: state.dmsaReducer.paymentStaus,
  };
};
const mapDispatchToProps = (dispatch) => ({
  // agreementUpdate: (data) => dispatch(agreementUpdate(data)),
  fileUpload: (data) => dispatch(fileUpload(data)),
  createOrderData: (data) => dispatch(createOrderData(data)),
  paymentDetails: (responces) => dispatch(paymentSuccess(responces)),
});

export default connect(mapStateToProps, mapDispatchToProps)(dmsa);
