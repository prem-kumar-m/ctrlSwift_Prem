import React from "react";
import { Accordion, Card, Container } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "react-multi-email/style.css";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer.js";
import Header from "../components/header/Header";
import HeaderLogin from "../components/header_login/HeaderLogin";
import * as Constants from "../constants";
import FaqCard from "../faqCard/faqCard";
import SmallMenu from "../smallmenu/smallMenu";


class ServiceOfferings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() { }

  componentDidUpdate(prevProps, prevState, snapshot) { }
  rotate=(e)=>{
    if(e == 1){
      var element = document.getElementById("rotate");
      element.classList.toggle("active1");
    }
    else if(e == 2){
      var element = document.getElementById("rotate2");
      element.classList.toggle("active1");
    }
    else if(e == 3){
      var element = document.getElementById("rotate3");
      element.classList.toggle("active1");
    }
    else if(e == 4){
      var element = document.getElementById("rotate4");
      element.classList.toggle("active1");
    }
    else if(e == 5){
      var element = document.getElementById("rotate5");
      element.classList.toggle("active1");
    }
    else if(e == 6){
      var element = document.getElementById("rotate6");
      element.classList.toggle("active1");
    }


  }
  render() {
    if (this.state.isReadyToRedirect) return <Redirect to="/user" />;

    return (
      <div>
        {!window.sessionStorage.getItem(Constants.ACCESS_EMAIL) ? (
          <Header />
        ) : (
          <HeaderLogin />
        )}
        <div className="view">
          <section className="generic-banner relative banner-area-inner26">
            <div className="overlay overlay-bg overlay-bg-blk"></div>
            <div className="container">
              <div className="row height align-items-center justify-content-center">
                <div className="col-lg-10">
                  <div className="generic-banner-content">
                    <h2 className="head2-inner">FAQ</h2>
                    <p className="text-white" style={{ opacity: 0.5 }}>
                      {" "}
                      CtrlSwiftTM comprises of a robust maturity assessment
                      methodology and transformation cookbooks to progressively
                      drive the Service Desk transformation to the desired
                      end-state.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <br></br>
        <br></br>

        <Container style={{ alignItems: "center" }}>
          <SmallMenu message="serviceofferings" />

          <section>
            <br />
            <div className="row">
              <div className="col-md-6">

                <Accordion defaultActiveKey="1" >
                  <Card.Header >
                  <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(1)}>
                      <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate">&rsaquo;</span>{" "}
                        Do you have standard SLAs and KPIs?
                      </h4>
                    </Accordion.Toggle>

                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <div className="container">
                      <p className=" faq-text-content">

                        Yes. CtrlSwift model is designed with a set of standard SLAs, as part of our Standard Offerings.
                        We also have standard set of metrics and KPIs that will be used uniformly for all our customers.
                      </p>
                    </div>

                  </Accordion.Collapse>
                </Accordion> <br />
                <Accordion defaultActiveKey="1" >
                  <Card.Header >
                  <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(2)}>
                      <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate2">&rsaquo;</span>{" "}
                      What are your standard service levels?
                      </h4>
                    </Accordion.Toggle>

                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <div className="container">
                      <p className=" faq-text-content">

                      We have 4 service levels, as shown below. These service
                      levels have been evolved, based on our delivery
                      experience.
                      <br></br>
                      <div className="col=md-5">

                        <table>
                          <thead>
                            <tr>
                              <th scope="col">Category</th>
                              <th scope="col">Response Time</th>
                              <th scope="col">Resolution Time</th>
                              <th scope="col">Compliance</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th className="name" scope="row">
                                P1
                              </th>
                              <td>15 min</td>
                              <td>2 hours</td>
                              <td>99.9%</td>
                            </tr>
                            <tr>
                              <th className="name" scope="row">
                                P2
                              </th>
                              <td>30 min</td>
                              <td>4 hours</td>
                              <td>99.9%</td>
                            </tr>
                            <tr>
                              <th className="name" scope="row">
                                P3
                              </th>
                              <td>60 min</td>
                              <td>8 hours</td>
                              <td>99.9%</td>
                            </tr>
                            <tr>
                              <th className="name" scope="row">
                                P4
                              </th>
                              <td>120 min</td>
                              <td>16 hours</td>
                              <td>99.9%</td>
                            </tr>
                          </tbody>
                        </table>
                        </div>
                      </p>
                    </div>

                  </Accordion.Collapse>
                </Accordion> <br />
                <Accordion defaultActiveKey="1" >
                  <Card.Header >
                  <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(3)}>
                      <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate3">&rsaquo;</span>{" "}
                      Why do I need to refer to the Service Catalogue?
                      </h4>
                    </Accordion.Toggle>

                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <div className="container">
                      <p className=" faq-text-content">

                      Our Service Catalogue is designed to portray our offerings in the form of services, such as Escalation Management, Outage Management, and Vendor Management. By looking at this catalogue,
                       the customer will be able to precisely choose the right category of services, based on their needs.
                      </p>
                    </div>

                  </Accordion.Collapse>
                </Accordion>
              </div>
<div className="col-md-6">
<Accordion defaultActiveKey="1" >
                  <Card.Header >
                  <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(4)}>
                      <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate4">&rsaquo;</span>{" "}
                      What is defined as Service Category?
                                    </h4>
                    </Accordion.Toggle>

                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <div className="container">
                      <p className=" faq-text-content">

                      A set of services are grouped together and called as one Service Category.
                       We have 3 Service Categories for Shared Service Desk, viz., CtrlSwift Lite, CtrlSwift Enterprise and CtrlSwift Premium. For instance, if the customer needs us to provide only basic set of services such as ticket assignment,
                       mail-box monitoring, then the customer can choose CtrlSwift Lite.
                      </p>
                    </div>

                  </Accordion.Collapse>
                </Accordion><br/>
                <Accordion defaultActiveKey="1" >
                  <Card.Header >
                  <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(5)}>
                      <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate5">&rsaquo;</span>{" "}
                      I am interested in a Managed Services contract. For this, which service should I select?
                                    </h4>
                    </Accordion.Toggle>

                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <div className="container">
                      <p className=" faq-text-content">

                      A Managed Services delivery involves an end to end management of services, periodic analytics, and implementation of service improvements and deployment of knowledge management solutions. The best plan to suit to this context is CtrlSwift Premium.
                       The length of the contract needs to be at least one year, in order to pass the benefits back to the customer.
                      </p>
                    </div>

                  </Accordion.Collapse>
                </Accordion>
</div>
            </div>
            <FaqCard message="Service Offering" />
          </section>

          <br></br>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default ServiceOfferings;
