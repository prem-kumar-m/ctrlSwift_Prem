import React from "react";
import { Form, Col, Row, Container, Button } from "react-bootstrap";
import onboard from "../images/onboard.jpg";
import Sidemenu from "../components/sidemenu2";
import Header1 from "../components/header1";
import Footer from "../components/footer";

class onboardingEngineer extends React.Component {
  navigate = (url) => {
    this.props.history.push(url);
  };
  render() {
    return (
      <div className="page-container" style={{ paddingLeft: "0px" }}>
        <Header1
        // navigate={(url) => this.navigate("/adminlogin")}
        />
        <main className="main-content bgc-grey-100">
          <div id="mainContent">
            <div className="row">
              <Sidemenu
                navigate={(url) => this.navigate(url)}
                selected="onboardingEngineer"
                className="sidemenu2"
              />
              {/* <div className="view">
                  <section   >
                    <img src={onboard} alt="onboard" className="onboardbgimg" />
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
                </div>          */}
              <Container className="container-size">
                <Row>
                  <Col>
                    <p style={{ fontSize: 26, color: "black" }}>
                      Add/Edit Users
                    </p>
                  </Col>
                </Row>
                <Form>
                  <Form.Row>
                    <Form.Group as={Col} md="4" controlId="partnerId">
                      <Form.Label>Partner ID</Form.Label>
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        // name="partnerId"
                        // value={partnerId}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="employeeId">
                      <Form.Label>Employee ID</Form.Label>
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        // name="employeeId"
                        // value={employeeId}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="4" controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        // name="firstName"
                        // value={firstName}
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        // name="lastName"
                        // value={lastName}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="4" controlId="gender">
                      <Form.Label>Gender</Form.Label>
                      <select
                        type="dropdown"
                        autoComplete="off"
                        className="form-control"
                        // name="gender"
                        // value={gender}
                      >
                        <option value=""></option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                      </select>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        // name="email"
                        // value={email}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} md="4" controlId="mobileCountryCode">
                      <Form.Label>Mobile Country Code *</Form.Label>
                      <select
                        type="dropdown"
                        className="form-control"
                        //   name="mobileCountryCode"
                        //   value={mobileCountryCode}
                        //   placeholder="select"
                        //   onChange={this.handleChange}
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
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="mobile">
                      <Form.Label>Mobile</Form.Label>
                      <input
                        type="number"
                        autoComplete="off"
                        className="form-control"
                        // name="mobile"
                        // value={mobile}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="4" controlId="qualification">
                      <Form.Label>Qualification</Form.Label>
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        // name="qualification"
                        // value={qualification}
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="specialization">
                      <Form.Label>Specialization</Form.Label>
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        // name="specialization"
                        // value={specialization}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="4" controlId="experience">
                      <Form.Label>Experience</Form.Label>
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        // name="experience"
                        // value={experience}
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="country">
                      <Form.Label>Country</Form.Label>
                      <select
                        type="dropdown"
                        className="form-control"
                        name="country"
                        placeholder="select"
                        // name="country"
                        // value={country}
                        // onChange={this.handleChange}
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
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="4" controlId="address">
                      <Form.Label>Address *</Form.Label>
                      <textarea
                        className="form-control"
                        //   name="address"
                        //   value={address}
                        //   onChange={this.handleChange}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="city">
                      <Form.Label>City</Form.Label>
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        // name="city"
                        // value={city}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="4" controlId="state">
                      <Form.Label>state</Form.Label>
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        // name="state"
                        // value={state}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="pincode">
                      <Form.Label>Pincode</Form.Label>
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        // name="pincode"
                        // value={pincode}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="4" controlId="idProof">
                      <Form.Label>ID proof</Form.Label>
                      <input type="file" className="form-control" />
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                      <Form.Label>Address Proof</Form.Label>
                      <input type="file" className="form-control" />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="4">
                      <Form.Label>Pan Card</Form.Label>
                      <input type="file" className="form-control" />
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                      <Form.Label>Adhar card</Form.Label>
                      <input type="file" className="form-control" />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} sm="5"></Form.Group>
                    <Form.Group as={Col} sm="1">
                      <Button
                        type="submit"
                        className="btn btn-primary"
                        variant="success"
                        style={{ marginLeft: "20em" }}
                      >
                        Submit
                      </Button>
                    </Form.Group>
                  </Form.Row>
                </Form>
              </Container>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default onboardingEngineer;
