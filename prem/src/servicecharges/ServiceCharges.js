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


//
class ServiceCharges extends React.Component {
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
          <section className="generic-banner relative banner-area-inner34">
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
        <SmallMenu message="servicecharges"/>
          <section>
            <div className="row">
              <div className="col-md-6">

              <Accordion defaultActiveKey="1">
                <Card.Header >
              <Accordion.Toggle as={Link} variant="link" eventKey="0" onClick={()=>this.rotate(1)} >
              <div className="cs-pluse">
             <h4 className="text-bold"><span className="rotate" id="rotate">&rsaquo;</span>   Can I upgrade or downgrade an existing scope of
                        services?  </h4>

                </div>
              </Accordion.Toggle>

              </Card.Header>
              <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             You can upgrade the service category from Basic to Premium
                      or Enterprise thru this portal. You can also downgrade or
                      change the scope of the services. You will receive a new
                      Digital Service Agreement for the revised scope of
                      services.
                      </p>
             </div>

            </Accordion.Collapse>
        </Accordion>
        <br />


        <Accordion defaultActiveKey="1">
        <Card.Header>
              <Accordion.Toggle as={Link} variant="link" eventKey="0"  onClick={()=>this.rotate(2)}>
                <h4 style={{ color: "text-bold" }}> <span className="rotate" id="rotate2">&rsaquo;</span> Can I terminate an existing service?</h4>
              </Accordion.Toggle>

              </Card.Header>
              <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             You can terminate a Service Desk service either on the
                      date of contract expiry or pre-matured. You are requested
                      to provide your valuable feedback in the Feedback Form for
                      necessary improvement actions at our end.
                      </p>
             </div>

            </Accordion.Collapse>
        </Accordion>

        <br />





              </div>
              <br></br>

              <div className="col-md-6">

              <Accordion defaultActiveKey="1">
        <Card.Header>
              <Accordion.Toggle as={Link} variant="link" eventKey="0"  onClick={()=>this.rotate(3)}>
                <h4 style={{ color: "text-bold" }}> <span className="rotate" id="rotate3">&rsaquo;</span>What is your methodology for changing/ renewing my
                        short-term contracts?</h4>
              </Accordion.Toggle>

              </Card.Header>
              <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             You may go for a monthly or quarterly contract. If the
                      service is satisfied, it is logical to extend the contract
                      as a long-term contract to get as much maximum benefits as
                      possible. To effect this, please go to the Service Upgrade
                      page under Existing Customer section and modify the
                      contract tenure to the same contract length or to a longer
                      duration.
                      </p>
             </div>

            </Accordion.Collapse>
        </Accordion>

              </div>
            </div>
            <br/>
            <FaqCard message="Service Charges" />
          </section>

          <br></br>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default ServiceCharges;
