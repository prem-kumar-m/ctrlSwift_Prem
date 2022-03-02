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
class ReportFaq extends React.Component {
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
          <section className="generic-banner relative banner-area-inner35">
            <div className="overlay overlay-bg overlay-bg-blk"></div>
            <div className="container">
              <div className="row height align-items-center justify-content-center">
                <div className="col-lg-10">
                  <div className="generic-banner-content">
                    <h2 className="head2-inner">FAQ</h2>
                    <p className="text-white" style={{ opacity: 0.5 }}>
                      {" "}
                      CtrlSwift comprises of a robust maturity assessment
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
        <SmallMenu message="reportfaq"/>

          <section>
            <div className="row">
              <div className="col-md-6">

              <Accordion defaultActiveKey="1">
                <Card.Header >
              <Accordion.Toggle as={Link} variant="link" eventKey="0" onClick={()=>this.rotate(1)} >
              <div className="cs-pluse">
             <h4 className="text-bold"><span className="rotate" id="rotate">&rsaquo;</span>   What reports can I get from the portal? </h4>

                </div>
              </Accordion.Toggle>

              </Card.Header>
              <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             The portal will contain the monthly and quarterly MIS
                      reports. These reports are derived based on the analytics
                      to aid informed decisions.
                      </p>
             </div>

            </Accordion.Collapse>
        </Accordion>
        <br />


        <Accordion defaultActiveKey="1">
        <Card.Header>
              <Accordion.Toggle as={Link} variant="link" eventKey="0"  onClick={()=>this.rotate(2)}>
                <h4 style={{ color: "text-bold" }}> <span className="rotate" id="rotate2">&rsaquo;</span> Can I order for a special report?</h4>
              </Accordion.Toggle>

              </Card.Header>
              <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             Yes, you can order for a special report, if it is not
                      readily available from the ITSM tool. The Service Desk
                      Lead will generate that report and send to you based on
                      the best efforts.
                      </p>
             </div>

            </Accordion.Collapse>
        </Accordion>

        <br />

              </div>
            </div>
            <br/>
            <FaqCard message="Report" />
          </section>

          <br></br>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default ReportFaq;
