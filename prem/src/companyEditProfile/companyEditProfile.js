import React from "react";
import {
  Button,
  Col, Container, Form,
  FormControl, Row
} from "react-bootstrap";
import { BsFillEyeFill } from "react-icons/bs";
import Header1 from "../components/header1";
import Sidemenu from "../components/partnersidemenu/partnerSidemenu";
import Footer from "../components/footer";
class companyEditProfile extends React.Component {
  constructor(props){
    super(props);
    this.state={
        dataunlock:true,
        companyName:"",
        companyURL:"",
        companyEmail:"",
        companyMobile:"",
        landline:"",
        Doorno:"",
        Country:"",
        State:"",
        Pincode:"",
        GST:"",
        PAN:"",
        Escalation:"",
        Empcount:"",
        Accountno:"",
        IFSC:"",
        Swift:"",
        BankName:"",
        submitted:false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);


  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit(e){
    e.preventDefault();
    this.setState({ submitted: true });
  }



  navigate = (url) => {
    this.props.history.push(url);
  };
  enabledata=()=>{
this.setState({
  dataunlock:false,
});
  }
  render() {
    const{dataunlock,companyName,companyURL,companyEmail,companyMobile,landline,Doorno,Country,State,Pincode,GST,PAN,Escalation,Empcount,
      Accountno,IFSC,Swift,BankName,submitted
    }=this.state;
    return (
      <div className="page-container" >
        {/* <Header1 navigate={(url) => this.navigate("/partnerLogin")} /> */}
        <header>
          <Header1 />
        </header>
        <div>
       
          <main className="main-content bgc-grey-100">
            <section className="onboard">
              <div id="mainContent" >
                <div className="row">
                  <Sidemenu
                    navigate={(url) => this.navigate(url)}
                    selected="companyEditProfile"
                    className="sidemenu2"
                  />

                  <div className="col ">
                    <Container className="shadow">
                      <Row >
                        <Col md={6} >
                          <p style={{ fontSize: 26, color: "black" }}>
                            Profile
                          </p>

                        </Col>
                        <Col md={6}>
                          <div className="d-flex justify-content-center">
                          <Button
                          onClick={this.enabledata}
                          >Edit Profile</Button>

                          </div>
                          </Col>
                      </Row>
                      <Form>
                        <Form.Row>
                          <Form.Group as={Col} md={4}>
                            <Form.Label>Company Name</Form.Label>
                            <input className="form-control" name="companyName" value={companyName} onChange={this.handleChange} type="text" readOnly />
                            {submitted && !companyName && (
                                <div className="text-danger">
                                  Company Name is required
                                </div>
                              )}
                          </Form.Group>
                          <Form.Group as={Col} md={4}>
                            <Form.Label>Company Website</Form.Label>
                            <FormControl className="form-control" type="text" name="companyURL" value={companyURL}  onChange={this.handleChange} />
                           {submitted && !companyURL && (
                                <div className="text-danger">
                                  company URL  is required
                                </div>
                              )}
                          </Form.Group>
                          <Form.Group as={Col} md={4}>
                            <Form.Label>Email</Form.Label>
                            <FormControl className="form-control" type="Email" name="companyEmail" value={companyEmail} onChange={this.handleChange} readOnly={dataunlock}/>
                           {submitted && !companyEmail && (
                                <div className="text-danger">
                                  company Email is required
                                </div>
                              )}
                          </Form.Group>
                        </Form.Row>
                        <Form.Row>
                        <Form.Group as={Col} md={4}>
                            <Form.Label>Mobile</Form.Label>
                            <FormControl className="form-control" type="text" name="companyMobile" value={companyMobile} onChange={this.handleChange} />
                           {submitted && !companyMobile && (
                                <div className="text-danger">
                                  company Mobile is required
                                </div>
                              )}
                          </Form.Group>
                          <Form.Group as={Col} md={4}>
                            <Form.Label>LandLine:</Form.Label>
                            <FormControl className="form-control" type="text" name="landline" value={landline} onChange={this.handleChange} />
                           {submitted && !landline && (
                                <div className="text-danger">
                                  Landline is required
                                </div>
                              )}
                          </Form.Group>

                          <Form.Group as={Col} md={4}>
                            <Form.Label>Door No:</Form.Label>
                            <FormControl className="form-control" type="text" name="Doorno" value={Doorno} onChange={this.handleChange} />
                           {submitted && !Doorno && (
                                <div className="text-danger">
                                  Door No is required
                                </div>
                              )}
                          </Form.Group>
                        </Form.Row>
                        <Form.Row>
                          <Form.Group as={Col} md={4}>
                            <Form.Label>Country</Form.Label>
                            <FormControl className="form-control" type="text" name="Country" value={Country} onChange={this.handleChange} />
                           {submitted && !Country && (
                                <div className="text-danger">
                                  Country is required
                                </div>
                              )}
                          </Form.Group>
                          <Form.Group as={Col} md={4}>
                            <Form.Label>State</Form.Label>
                            <FormControl className="form-control" type="text" name="State" value={State} onChange={this.handleChange} />
                           {submitted && !State && (
                                <div className="text-danger">
                                  State is required
                                </div>
                              )}
                          </Form.Group>

                        </Form.Row>

                        <Form.Row>
                          <Form.Group as={Col} md={4}>
                            <Form.Label>Pincode</Form.Label>
                            <FormControl className="form-control" type="number" name="Pincode" value={Pincode} onChange={this.handleChange} />
                           {submitted && !Pincode && (
                                <div className="text-danger">
                                  Pincode is required
                                </div>
                              )}
                          </Form.Group>

                        </Form.Row>
                        <hr></hr>
                        <Form.Row>
                          <Form.Group as={Col} md={4}>
                          <Form.Label>GST No</Form.Label>
                            <FormControl className="form-control" type="number" name="GST" value={GST} onChange={this.handleChange} />
                           {submitted && !GST && (
                                <div className="text-danger">
                                  GST No is required
                                </div>
                              )}
                          </Form.Group>
                          <Form.Group as={Col} md={4}>
                            <Form.Label>PAN No</Form.Label>
                            <FormControl className="form-control" type="number" name="PAN" value={PAN} onChange={this.handleChange} />

                           {submitted && !PAN && (
                                <div className="text-danger">
                                  PAN No is required
                                </div>
                              )}
                          </Form.Group>
                          <Form.Group as={Col} md={4}>
                            <Form.Label>Escalation Matrix:</Form.Label>
                            <FormControl className="form-control" type="text" name="Escalation" value={Escalation} onChange={this.handleChange} readOnly={dataunlock}/>
                           {submitted && !Escalation && (
                                <div className="text-danger">
                                  Escalation Matrix is required
                                </div>
                              )}
                          </Form.Group>
                          </Form.Row>
                          <Form.Row>
                          <Form.Group as={Col} md={4}>
                            <Form.Label>Employee Count:</Form.Label>
                            <FormControl className="form-control" type="number" name="Empcount" value={Empcount} onChange={this.handleChange} readOnly={dataunlock}/>
                           {submitted && !Empcount && (
                                <div className="text-danger">
                                  Employee Count is required
                                </div>
                              )}
                          </Form.Group>
                          <Form.Group as={Col}>
                            <Form.Label>
                             Address Proof:{""}
                            </Form.Label><br/>
                            <Button
                              type="submit"
                              className="btn btn-primary"
                             // onClick={this.handleSubmit}
                            >
                              Preview {" "} <span><BsFillEyeFill /></span>{"  "}
                            </Button>
                          </Form.Group>
                          <Form.Group as={Col} md={4}>
                            <Form.Label>Address Proof Re-upload:</Form.Label>
                            <div className="form-group">
                                                <button className="btn shadow btn-upload text-grey fz-18 border border-secondary">
                                                    <input type="file" accept=".pdf" />
                                                </button>
                                            </div>
                          </Form.Group>
                          </Form.Row>
                          <hr></hr>
                          <h3>Bank Information</h3>
                          <br/>
                          <Form.Row>

                          <Form.Group as={Col} md={4}>
                            <Form.Label>Account No</Form.Label>
                            <FormControl className="form-control" type="text" name="Accountno" value={Accountno} onChange={this.handleChange} readOnly={dataunlock} />
                          {submitted && !Accountno && (
                                <div className="text-danger">
                                 Account No is required
                                </div>
                              )}
                          </Form.Group>
                          <Form.Group as={Col} md={4}>
                            <Form.Label>IFSC Code </Form.Label>
                            <FormControl className="form-control" type="text" name="IFSC" value={IFSC} onChange={this.handleChange} />
                          {submitted && !IFSC && (
                                <div className="text-danger">
                                  IFSC Code is required
                                </div>
                              )}
                          </Form.Group>
                          <Form.Group as={Col} md={4}>
                            <Form.Label>Swift code</Form.Label>
                            <FormControl className="form-control" type="number" name="Swift" value={Swift} onChange={this.handleChange} readOnly={dataunlock}/>
                         {submitted && !Swift && (
                                <div className="text-danger">
                                 Swift code is required
                                </div>
                              )}
                          </Form.Group>
                        </Form.Row>
                        <Form.Row>
                        <Form.Group as={Col} md={4}>
                            <Form.Label>Bank Name:</Form.Label>
                            <FormControl className="form-control" type="text" name="BankName" value={BankName} onChange={this.handleChange} readOnly={dataunlock}/>
                         {submitted && !BankName && (
                                <div className="text-danger">
                                  Bank Name is required
                                </div>
                              )}
                          </Form.Group>

                          <Form.Group as={Col}>
                          <Form.Label>Passbook Photo:</Form.Label><br/>
                            <Button
                              type="submit"
                              className="btn btn-primary"
                            //  onClick={this.handleSubmit}
                            >
                              Preview {"  "} <span><BsFillEyeFill /></span>
                            </Button>
                          </Form.Group>
                          <Form.Group as={Col} md={4}>
                            <Form.Label>Passbook Photo Re-upload:</Form.Label>
                            <div className="form-group">
                                                <button className="btn shadow btn-upload text-grey fz-18 border border-secondary">
                                                    <input type="file" accept=".pdf" />
                                                </button>
                                            </div>
                          </Form.Group>
                        </Form.Row>

                          <Form.Row>
                          <Form.Group as={Col}>
                            <Button
                              type="submit"
                              className="btn btn-primary"
                              onClick={this.handleSubmit}
                            >
                              Submit
                            </Button>
                          </Form.Group>
                        </Form.Row>
                      </Form>
                    </Container>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default companyEditProfile;
