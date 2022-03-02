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

class FeedBack extends React.Component {
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
          <section className="generic-banner relative banner-area-inner36">
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
        <SmallMenu message="feedback"/>

          <section>
            <div className="row">
              <div className="col-md-6">

              <Accordion defaultActiveKey="1">
                <Card.Header >
              <Accordion.Toggle as={Link} variant="link" eventKey="0" onClick={()=>this.rotate(1)} >
              <div className="cs-pluse">
             <h4 className="text-bold"><span className="rotate" id="rotate">&rsaquo;</span>   How do I escalate for service quality issues? </h4>

                </div>
              </Accordion.Toggle>

              </Card.Header>
              <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             If you have any concerns on the delivery or need to
                      escalate due to service quality issues, please send an
                      email to{" "}
                      <a href="mailto:servicedesk@b1desk.com">
                        servicedesk@CtrlSwift.com
                      </a>{" "}
                      for a prompt action.
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
              <Accordion.Toggle as={Link} variant="link" eventKey="0"  onClick={()=>this.rotate(2)}>
                <h4 style={{ color: "text-bold" }}> <span className="rotate" id="rotate2">&rsaquo;</span> Is there a provision in the portal to enter the
                        feedback?</h4>
              </Accordion.Toggle>

              </Card.Header>
              <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             Yes, please visit the Feedback page under the Existing
                      Customer link for sending the feedback thru this portal.
                      </p>
             </div>

            </Accordion.Collapse>
        </Accordion>

        <br />


              </div>
            </div>
            <br/>
            <FaqCard message="Feedback" />
          </section>

          <br></br>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default FeedBack;
