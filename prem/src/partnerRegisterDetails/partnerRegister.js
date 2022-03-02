import React, { Component } from "react";
import {
  Button, Col, Container, Form, Modal, Row
} from "react-bootstrap";
import Swal from "sweetalert2";
import Footer from "../components/footer/Footer.js";
import {
  addressValidator, cityValidator, companyValidator, countryValidator, mobileValidator, pincodeValidator, stateNameValidator
} from "../Core/utils";
import Pbgi3 from "../images/pbgi3.PNG";


class partnerRegister extends Component {
  constructor(props){
    super(props)
    this.state={
      company:"",
      companyError:"",
      companyUrl:"",
      companyUrlError:"",
      countryCode:"",
      countryCodeError:"",
      mobile:"",
      mobileError:"",
      email:"",
      emailError:"",
      landlineCode:"",
      landlineCodeError:"",
      landline:"",
      landLineError:"",
      country:"",
      countryError:"",
      address:"",
      addressError:"",
      stateName:"",
      stateNameError:"",
      city:"",
      cityError:"",
      pincode:"",
      pincodeError:"",
      gstNo:"",
      gstNoError:"",
      submitted:false,
      termsCondition:false,
      submitted1:false,
      checkBox:false
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleChange = event=>{
    const{name, value}=event.target;
    this.setState({
      [name]:value,
    });
  };
  handleSubmit(e){


    e.preventDefault();
    // this.setState({ submitted: true });



    const {

      city,
      country,
      landlineCountryCode,
      address,
      pincode,
      landline,
      company,
      email,
      mobile,
      companyUrl,
      countryCode,
      stateName,
      gstNo,
      companyUrlError,
      countryCodeError,
      // mobileError,
      // stateNameError,
      // cityError,
      gstNoError,
      emailError,



     } = this.state;

    // const emailError = emailValidator(this.state.email);
    const mobileError = mobileValidator(this.state.mobile);
    const countryError = countryValidator(this.state.country);
    const cityError = cityValidator(this.state.city);
    const addressError = addressValidator(this.state.address);
    const pincodeError = pincodeValidator(this.state.pincode);
    const companyError = companyValidator(this.state.company);
    const stateNameError =stateNameValidator(this.state.stateName);



    if (
      emailError ||
      mobileError ||
      countryError ||
      cityError ||
      addressError ||
      pincodeError ||
      companyError||
      stateNameError
    )
    this.setState({
      emailError: emailError,
      mobileError: mobileError,
      addressError: addressError,
      countryError: countryError,
      cityError: cityError,
      pincodeError: pincodeError,
      companyError: companyError,
      stateNameError: stateNameError,
    });
    //
        this.setState({ submitted: true });
    // }
    // else{
    //   this.setState({submitted:false});
    // }

    console.log(""+this.state.submitted);
    if(
      company&&
      companyUrl&&
      countryCode&&
      mobile&&
      country&&
      address&&
      city&&
      stateName&&
      pincode&&
      gstNo&&
      email&&
     companyError==""&&
     companyUrlError==""&&
     countryCodeError==""&&
     mobileError==""&&
     countryError==""&&
     addressError==""&&
     stateNameError==""&&
     cityError==""&&
      pincodeError==""&&
     gstNoError==""&&
     emailError==""&&

     this.state.submitted==true


    ){
       this.setState({
          termsCondition:true
        });
      }

     console.log("checking")

    // // }
    // // else{
    //   {
    //   this.setState({
    //     termsCondition:true
    //   });
    // }



  // };
  //  nextPath(path) {
  //   this.props.history.push(path);
  //  }
  }
  handleClose=()=>{
    this.setState({
        termsCondition:false

    })
  }
  handleSubmit1=event=>{
    event.preventDefault();
    const{ checkBoxError}=this.state
    if(this.state.checkBox==true){


      Swal.fire({
        text:"Your Application in process",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "ok ",
      })

      .then(function(){
        window.location="/"
      });
        // this.props.history.push("/HomePage");
    }


    else if(this.state.checkBox==false){
      this.setState({
        checkBoxError: "click the checkBox"
      })
    }
      // Swal.fire({

      //   text:"Click on checkbox ",
      //   confirmButtonColor: "#3085d6",

      //   confirmButtonText: "ok ",

      // })
      // {! checkBox&&
        // <div style={{fontSize:12, color:"red"}}>
        //   click the checkbox
        //    </div>
          //  }


    // }


  }
  handleChange1 = event=>{
    const{name, value}=event.target;
    this.setState({
      [name]:value,
    });
  };
  componentDidMount() {

  }
  componentDidUpdate(prevProps, prevState, snapshot) {



  }
  handleCheckbox=() =>{
   if(this.state.checkBox==false){

    this.setState({
      checkBox:true

    });
   }
   else{
    this.setState({
      checkBox:false

    });
   }

    console.log(this.state.checkBox);
  }




    render() {
      const{email, landline,country, stateName, countryCode,checkBox,checkBoxError, pincode, city, gstNo, mobile, company, address, landlineCode, companyUrl, submitted, submitted1}=this.state;
        return (
            <div>
              <div className="view">
                  <section   >
                    <img src={Pbgi3} alt="pbgi3" className="partnerbgimg" />
                    <div
                      className="overlay overlay-bg overlay-bg-blk"
                      style={{  opacity: 0.5  }}
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
                      <p style={{ fontSize: 26, color: "black"  }}>
                        Partner Registration Form
                      </p>
                    </Col>
                  </Row>

                  <Form autocomplete = "off">
                    <Form.Row>
                      <Form.Group as={Col} md="6" controlId="company" >
                        <Form.Label>Company Name*</Form.Label>

                        <input
                          type="text"
                          className="form-control"
                          name="company"
                          value={this.state.company}
                          onChange={this.handleChange}
                          autocomplete = "off"
                          />

                        {submitted && !company && (
                        <div style={{ fontSize: 12, color: "red" }} className="nav-left">

                            Company is required
                          </div>
                        )}

                        {submitted && company && company.length < 4 && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        company name  is too short
                      </div>
                    )}
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="companyUrl" autoComplete = "off">
                        <Form.Label>Company url *</Form.Label>
                        <input
                          type="text"
                          className="form-control"
                          name="companyUrl"
                          value={this.state.companyUrl}
                          onChange={this.handleChange}
                          autocomplete = "off"
                        />

                        {submitted && ! companyUrl&& (
                        <div style={{ fontSize: 12, color: "red" }} className="nav-left">

                            company url is required
                          </div>
                        )}
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col} md="3" controlId="countryCode" autoComplete = "off">
                        <Form.Label> Country code *</Form.Label>
                        <select
                          type="dropdown"
                          className="form-control"
                          name="countryCode"
                          value={countryCode}
                          onChange={this.handleChange}
                          autocomplete = "off"
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
                        {submitted && ! countryCode&& (
                        <div style={{ fontSize: 12, color: "red" }} className="nav-left">

                            country is required
                          </div>
                        )}


                      </Form.Group>
                      <Form.Group as={Col} md="3" controlId="mobile" autoComplete = "off">
                        <Form.Label>Mobile number *</Form.Label>
                        <input
                          type="number"
                          className="form-control"
                          name="mobile"

                          value={this.state.mobile}
                          onChange={this.handleChange}

                        />

                        {submitted && !mobile && (
                        <div style={{ fontSize: 12, color: "red" }} className="nav-left">

                            Mobile number is required
                          </div>
                        )}
                        {submitted && this.state.mobileError !== "" && mobile && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.mobileError}
                      </div>
                    )}
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="email" autoComplete = "off">
                        <Form.Label>Email  id*</Form.Label>
                        <input
                          type="text"
                         className="form-control"
                         name="email"
                         value={this.state.email}
                         onChange={this.handleChange}
                         autocomplete = "off"
                        />

                        {submitted && !email && (
                        <div style={{ fontSize: 12, color: "red" }} className="nav-left">

                            Work Mail is required
                          </div>
                        )}
                        {submitted && this.state.emailError !== "" && email && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.emailError}
                      </div>
                    )}
                      </Form.Group>
                      </Form.Row>

                      <Form.Row>
                      <Form.Group as={Col} md="6" controlId="landlineCode" >
                        <Form.Label>Land Line Code</Form.Label>
                        <input
                          type="number"
                          className="form-control"
                          name="landlineCode"
                          value={this.state.landlineCode}
                          onChange={this.handleChange}
                          autocomplete = "off"
                        />

                        {/* {submitted && !landlineCode && (
                        <div style={{ fontSize: 12, color: "red" }} className="nav-left">

                            Landline code is required
                          </div>
                        )} */}
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="landline">
                        <Form.Label>Landline</Form.Label>
                        <input
                          type="number"
                          className="form-control"
                          name="landline"
                          value={this.state.landline}
                          onChange={this.handleChange}
                          autocomplete = "off"
                        />

                        {/* {submitted && !landline && (
                        <div style={{ fontSize: 12, color: "red" }} className="nav-left">

                            landline is required
                          </div>
                        )} */}
                      </Form.Group>
                      </Form.Row>



                    <Form.Row>
                      <Form.Group as={Col} md="6" controlId="country">
                        <Form.Label>Country *</Form.Label>
                        <select type="dropdown" className="form-control" name="country"
                        placeholder='select'
                        name="country"
                        value={country}
                        onChange={this.handleChange}  >
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

                      {submitted && ! country&& (
                        <div style={{ fontSize: 12, color: "red" }} className="nav-left">

                          country is required
                          </div>
                        )}
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="address"autocomplete = "off" >
                        <Form.Label>Address *</Form.Label>
                        <textarea
                          className="form-control"
                          name="address"
                          value={this.state.address}
                          onChange={this.handleChange}
                          autocomplete = "off"
                        />

                        {submitted && !address && (
                        <div style={{ fontSize: 12, color: "red" }} className="nav-left">

                            address is required
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

                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} md="6" controlId="stateName" autoComplete = "off">
                        <Form.Label>State *</Form.Label>
                        <input type="text"  className="form-control"
                          name="stateName"
                          value={this.state.stateName}
                          onChange={this.handleChange}
                        />

                        {submitted && !stateName && (
                        <div style={{ fontSize: 12, color: "red" }} className="nav-left">

                            state is required
                          </div>
                        )}

                        {submitted && stateName && stateName.length < 4 && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        state is too short
                      </div>
                    )}

                      </Form.Group>

                        <Form.Group as={Col} md="6" autoComplete = "off" >
                        <Form.Label>City *</Form.Label>
                        <input type="text"  className="form-control"
                          name="city"
                          value={this.state.city}
                          onChange={this.handleChange}
                          autoComplete = "off"
                        />

                        {submitted && !city && (
                        <div style={{ fontSize: 12, color: "red" }} className="nav-left">

                            city name is required
                          </div>
                        )}

                        {submitted && city && city.length < 4 && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        city  is too short
                      </div>
                    )}
                      </Form.Group>
                      </Form.Row>



                      <Form.Row>

                      <Form.Group as={Col} md="6" controlId="pincode" autoComplete = "off">
                        <Form.Label>Pincode *</Form.Label>
                        <input
                          type="number"
                          className="form-control"
                          name="pincode"

                          value={this.state.pincode}
                          onChange={this.handleChange}

                        />

                        {submitted && !pincode && (
                        <div style={{ fontSize: 12, color: "red" }} className="nav-left">

                            pincode is required
                          </div>
                        )}


                        {submitted && pincode && pincode.length <6 && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        pincode  is too short
                      </div>
                    )}
                       </Form.Group>
                      <Form.Group as={Col} md="6" controlId="gstNo" autoComplete = "off">
                        <Form.Label>GST Number *</Form.Label>
                        <input
                          type="text"
                          className="form-control"
                          name="gstNo"
                          value={this.state.gstNo}
                          onChange={this.handleChange}

                        />

                        {submitted && !gstNo && (
                        <div style={{ fontSize: 12, color: "red" }} className="nav-left">

                            GST number is required
                          </div>
                        )}
                        <div style={{marginLeft:"17em", marginTop:"2em"}}>
                        <Button variant="success"
                      onClick={this.handleSubmit}

                      >Register</Button>
                      </div>
                      </Form.Group>

                    </Form.Row>
                    <Form.Row>

                    </Form.Row>
                    </Form>

                </Container>

                <Modal show={this.state.termsCondition} onHide={this.handleClose} backdrop={'static'}>
                  <Modal.Header closeButton>TERMS AND CONDITION</Modal.Header>
                  <Modal.Body>
                  A Terms and Conditions agreement outlines the terms that visitors must agree to if they want to interact with your website.
                 Essentially, if the visitor continues to use the website after accepting the Terms, they enter into a contract with you.
                  </Modal.Body>
                  <Modal.Footer>
                  <Form.Check
                   type="checkbox"
                    label="click here to accept the terms and conditions"
                    name="checkBox"
                    onClick={this.handleCheckbox}
                    value={checkBox}
                     />

                     {this.state.checkBoxError !== "" &&
                                (
                                  <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.checkBoxError}
                                  </div>
                                )}
                    {/* {
                      checkBox===false&&
                      <div style={{fontSize:12, color:"red"}}>
                        click the checkbox
                        </div>
                    } */}
                                    {/* {this.state.checkBox}
                                    {!checkBox&&
                                     <div style={{fontSize:12, color:"red"}}>
                                       click the checkbox
                                        </div> } */}




                    <Button  className="genric-btn primary radius text-uppercase" variant="success"  onClick={this.handleSubmit1}>Accept</Button>
                  </Modal.Footer>

                </Modal>


                <Footer />
              </div>



        );
    }
}

export default partnerRegister;