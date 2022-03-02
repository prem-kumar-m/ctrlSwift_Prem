import React from "react";
import { Accordion, Card, Container } from "react-bootstrap";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer.js";
import Header from "../components/header/Header";
import HeaderLogin from "../components/header_login/HeaderLogin";
import * as Constants from "../constants";
import FaqCard from "../faqCard/faqCard";
import SmallMenu from "../smallmenu/smallMenu";
class AboutPlatform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() { }

  componentDidUpdate(prevProps, prevState, snapshot) { }
  rotate=(e)=>{
    if(e === 1){
      var element = document.getElementById("rotate1");
      element.classList.toggle("active1");
    }
    else if(e === 2){
      var element = document.getElementById("rotate2");
      element.classList.toggle("active1");
    }
    else if(e === 3){
      var element = document.getElementById("rotate3");
      element.classList.toggle("active1");
    }
    else if(e === 4){
      var element = document.getElementById("rotate4");
      element.classList.toggle("active1");
    }
    else if(e === 5){
      var element = document.getElementById("rotate5");
      element.classList.toggle("active1");
    }
    else if(e === 6){
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
          <section className="generic-banner relative banner-area-inner25">
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
          <SmallMenu message="aboutplatform" />

          <section>

            <div className="row">
              <div className="col-md-6">
              <Accordion defaultActiveKey="1" >
              <Card.Header >
              <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(1)}>
                <h4 style={{ color: "text-bold",overflow:"hidden" }}><span className="rotate" id="rotate1">&rsaquo;</span>{" "}
                What segments of the customer does CtrlSwift cater
                 to?
                   </h4>
              </Accordion.Toggle>

              </Card.Header>
            <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             CtrlSwift is designed to provide the services to the
                      following segments:
                      <div className="unordered-list">
                        <ul style={{ fontSize: 15, letterSpacing: 1 }}>
                          <li>Service Delivery Architecture Framework</li>
                          <li>Business Service Management</li>
                          <li> Business Support Case Definition</li>
                          <li> Service Delivery Management</li>
                          <li> Service Experience Standardisation</li>
                          <li> Tools Framework to Track</li>
                        </ul>
                      </div>
                      </p>
             </div>

            </Accordion.Collapse>
        </Accordion> <br/>
        <Accordion defaultActiveKey="1" >
              <Card.Header >
              <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(2)}>
                <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate2">&rsaquo;</span>{" "}
                Is CtrlSwift a dedicated service desk for a customer?
                  </h4>
              </Accordion.Toggle>

              </Card.Header>
            <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">

                        Depending on the need for transition, the service launch
                        date will vary. Normally it takes 2-14 days to start
                        servicing a new customer. Once the customer orders for
                        the service desk, we need to collect the Foundation Data
                        and configure/set those data in our ITSM tool.

                        </p>
             </div>

            </Accordion.Collapse>
        </Accordion> <br/>
        <Accordion defaultActiveKey="1" >
              <Card.Header >
              <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(3)}>
                <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate3">&rsaquo;</span>{" "}
                How long will it take to start the services from CtrlSwift?
                  </h4>
              </Accordion.Toggle>

              </Card.Header>
            <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             CtrlSwift model is primarily a Shared Service Desk, working
                        in a multi-tenant form. If a customer still needs a
                        dedicated set-up, CtrlSwift can set-up the desired delivery
                        model, in consultation with the customer.
                        </p>
             </div>

            </Accordion.Collapse>
        </Accordion>
              </div>
              <div className="col-md-6">

              <Accordion defaultActiveKey="1">
              <Card.Header >
              <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(4)}>
                <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate4">&rsaquo;</span>{" "}
 If the portal does not work, how do I communicate?
 </h4>
              </Accordion.Toggle>

              </Card.Header>
            <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">

                        Please write a mail to{" "}
                        <a href="mailto:contact@b1desk.com">
                          contact@CtrlSwift.com.
                        </a>{" "}

                        </p>
             </div>

            </Accordion.Collapse>
        </Accordion>
        <br/>
        <Accordion defaultActiveKey="1" >
              <Card.Header >
              <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(5)}>
                <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate5">&rsaquo;</span>{" "}
                How do I report the technical issue on this portal,
                        while using it?
                                          </h4>
              </Accordion.Toggle>

              </Card.Header>
            <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             {" "}
                        Please write a mail to{" "}
                        <a href="mailto:contact@b1desk.com">
                          contact@CtrlSwift.com
                        </a>
                        </p>
             </div>

            </Accordion.Collapse>
        </Accordion>
        <br/>
        <Accordion defaultActiveKey="1" >
              <Card.Header >
              <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(6)}>
                <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate6">&rsaquo;</span>{" "}
                If I need to get a demo of this platform, who needs to
                        be contacted?
                                          </h4>
              </Accordion.Toggle>

              </Card.Header>
            <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             Please click the <a href="/requestdemo"> “Request Demo”</a> available in the Home page

                        </p>
             </div>

            </Accordion.Collapse>
        </Accordion>

              </div>
            </div>
            <br />
            <FaqCard message="AboutPlatForm" />
          </section>

          <br></br>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default AboutPlatform;
