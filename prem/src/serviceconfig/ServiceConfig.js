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
class ServiceConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}
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
          <section className="generic-banner relative banner-area-inner30">
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
         <SmallMenu message="serviceconfig"/>
          <section>
            <div className="row">
              <div className="col-md-6">
              <Accordion defaultActiveKey="1" >
                  <Card.Header >
                  <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(1)}>
                      <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate">&rsaquo;</span>{" "}
                      What will happen once I send the configuration data to you?
                                                                              </h4>
                    </Accordion.Toggle>

                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <div className="container">
                      <p className=" faq-text-content">

                      The data required for configuring the Service Desk for you gets stored in the portal,
                       and then gets copied into the ITSM tool, thru a back-end process.
                       If any data is not in sync or any extra data is needed,
                       the Project Manager will work with the customer to address these data issues/ needs.
                      </p>

                    </div>

                  </Accordion.Collapse>
                </Accordion> <br />
                <Accordion defaultActiveKey="1" >
                  <Card.Header >
                  <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(2)}>
                      <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate2">&rsaquo;</span>{" "}
                      How do I know the readiness of my new Service Desk from your end
                                                       </h4>
                    </Accordion.Toggle>

                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <div className="container">
                      <p className=" faq-text-content">

                      The Project Manager will inform the customer as soon as the Foundation data gets configured in the ITSM tool and also the required people bandwidth and other logistics are arranged at our end.
                       S/he will provide a specific URL that can be used by the end-users to access the ITSM tool for raising the tickets.
                       S/he will also provide the details of the new Toll Free Number and support email id.
                      </p>
                    </div>

                  </Accordion.Collapse>
                </Accordion> <br />
                <Accordion defaultActiveKey="1" >
                  <Card.Header >
                  <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(3)}>
                      <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate3">&rsaquo;</span>{" "}
                      Is the customer required to do any transition to Balbhas?
                                    </h4>
                    </Accordion.Toggle>

                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <div className="container">
                      <p className=" faq-text-content">

                      It depends on the type of services being requested.
                       For example, if the scope of service is ticket management,
                        vendor management and service reporting, then no transition is needed as CtrlSwift is readily capable to start the service for such services.\
                         On the other hand, if certain services need technical know-hows of the customer,
                         then Balbhas would request a quick knowledge acquisition from the customer to provide technical troubleshooting.

                      </p>
                    </div>

                  </Accordion.Collapse>
                </Accordion> <br />
              </div>
              <br></br>

              <div className="col-md-6">
              <Accordion defaultActiveKey="1" >
                  <Card.Header >
                  <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(4)}>
                      <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate4">&rsaquo;</span>{" "}
                      What is called Service Desk Configuration?
                                                                                               </h4>
                    </Accordion.Toggle>

                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <div className="container">
                      <p className=" faq-text-content">

                      The Service Desk Configuration is nothing but bringing the user info, location details, vendor details into our ITSM tool. By having this specific data, we will be able to precisely serve for the customer’s end-users. Also, we need to capture your escalation points which will be added as the target audience in our escalation process. We also need to know the Toll-Free Number set-up and the support email id. We will leverage the existing toll free number and the support email id, however, 
                      if the customer wants us to use our TFN and unique support email id, we need to provision them.
                      </p>
                    </div>

                  </Accordion.Collapse>
                </Accordion> <br />
                <Accordion defaultActiveKey="1" >
                  <Card.Header >
                  <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(5)}>
                      <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate5">&rsaquo;</span>{" "}
                      What are the typical data that I need to provide to start the Service Desk service from your end?
                                                                                               </h4>
                    </Accordion.Toggle>

                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <div className="container">
                      <p className=" faq-text-content">

                      We need the basic data about your environment so that we will be able to manage the tickets end-to-end for the customer. The following data are needed: User Info, asset details, location-details, escalation points, vendor details, resolver groups, toll-free number, support email id.
                      </p>
                    </div>

                  </Accordion.Collapse>
                </Accordion> <br />
                <Accordion defaultActiveKey="1" >
                  <Card.Header >
                  <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(6)}>
                      <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate6">&rsaquo;</span>{" "}
                      Can I send configuration dataset over email?
                                                                         </h4>
                    </Accordion.Toggle>

                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <div className="container">
                      <p className=" faq-text-content">

                      We have the provision in this portal to capture the basic foundation data,
                       which will be copied into the ITSM tool, at the back end. While entering the data into the portal,
                        our edit logic will ensure that the basic data are provided in the right format.
                       Hence, it is preferable to use the portal rather than sending by email.
                      </p>
                    </div>

                  </Accordion.Collapse>
                </Accordion> <br />
              </div>
            </div>
            <br/>
            <FaqCard message="Service Desk Configuration" />
          </section>

          <br></br>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default ServiceConfig;
