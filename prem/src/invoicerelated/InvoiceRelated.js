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
class InvoiceRelated extends React.Component {
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
    else if(e == 7){
      var element = document.getElementById("rotate7");
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
          <section className="generic-banner relative banner-area-inner32">
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
        <SmallMenu message="invoicerelated"/>

          <section>
            <div className="row">
              <div className="col-md-6">
                <Accordion defaultActiveKey="1">
                <Card.Header >
              <Accordion.Toggle as={Link} variant="link" eventKey="0" onClick={()=>this.rotate(1)} >
              <div className="cs-pluse">
             <h4 className="text-bold"><span className="rotate" id="rotate">&rsaquo;</span>   What is the start date and end date of the first
                        invoice?  </h4>

                </div>
              </Accordion.Toggle>

              </Card.Header>
              <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             The start date of the first invoice is the first day of
                      the service transition and the end date is 30 days from
                      the start date. For example, if the service transition
                      date is 4th April, then the invoice will bear 4th April as
                      the start date and 3rd May as the end date.
                      </p>
             </div>

            </Accordion.Collapse>
        </Accordion>
        <br />


        <Accordion defaultActiveKey="1">
        <Card.Header>
              <Accordion.Toggle as={Link} variant="link" eventKey="0"  onClick={()=>this.rotate(2)}>
                <h4 style={{ color: "text-bold" }}> <span className="rotate" id="rotate2">&rsaquo;</span>What is the start date and end date of regular invoices?</h4> 
              </Accordion.Toggle>

              </Card.Header>
              <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             The invoice is not based on a perfect month or quarter.
                      For example, if the customer was on-boarded on 4th of a
                      month, then the end date of an invoice will be 3rd of the
                      next month, for a monthly payment frequency. The same
                      logic will apply for a quarterly, bi-annual or yearly
                      payment frequencies.
                      </p>
             </div>

            </Accordion.Collapse>
        </Accordion>

        <br />


        <Accordion defaultActiveKey="1">
        <Card.Header>
              <Accordion.Toggle as={Link} variant="link" eventKey="0"  onClick={()=>this.rotate(3)}>
                <h4 style={{ color: "text-bold" }}> <span className="rotate" id="rotate3">&rsaquo;</span>When do I get the first invoice?</h4> 
              </Accordion.Toggle>

              </Card.Header>
              <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             The very first invoice gets generated as soon as the
                      customer views and signs-off the Digital Service
                      Agreement.
                      </p>
             </div>

            </Accordion.Collapse>
        </Accordion>

        <br />
        <Accordion defaultActiveKey="1">
        <Card.Header>
              <Accordion.Toggle as={Link} variant="link" eventKey="0"  onClick={()=>this.rotate(4)}>
                <h4 style={{ color: "text-bold" }}> <span className="rotate" id="rotate4">&rsaquo;</span> Why should I pay the first invoice quickly?</h4> 
              </Accordion.Toggle>

              </Card.Header>
              <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             For us, clearance of the first invoice is a pre-cursor and
                      assurance for initiating the service transition and
                      setting the delivery.
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
              <Accordion.Toggle as={Link} variant="link" eventKey="0"  onClick={()=>this.rotate(5)}>
                <h4 style={{ color: "text-bold" }}> <span className="rotate" id="rotate5">&rsaquo;</span>What will happen if the first invoice is not paid in 7
                        days time?</h4>
              </Accordion.Toggle>

              </Card.Header>
              <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             If the first invoice is not paid in 7 days time from the
                      time of its issue, then by the end of the 7th day, the
                      Digital Service Agreement stands cancelled. The customer
                      needs to raise a new Service Order, if the Service Desk
                      service is still needed.
                      </p>
             </div>

            </Accordion.Collapse>
        </Accordion>

        <br />
        <Accordion defaultActiveKey="1">
        <Card.Header>
              <Accordion.Toggle as={Link} variant="link" eventKey="0"  onClick={()=>this.rotate(6)}>
                <h4 style={{ color: "text-bold" }}> <span className="rotate" id="rotate6">&rsaquo;</span> How do I escalate for invoice errors or concerns?</h4> 
              </Accordion.Toggle>

              </Card.Header>
              <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             We ensure that the invoices do not have discrepancies or
                      errors. If at all there is some concern on the amount (on
                      the billed amount, billing period, previous payment not
                      reflected etc..), please write to contact@CtrlSwift.com
                      </p>
             </div>

            </Accordion.Collapse>
        </Accordion>
        <br />

        <Accordion defaultActiveKey="1">
        <Card.Header>
              <Accordion.Toggle as={Link} variant="link" eventKey="0"  onClick={()=>this.rotate(7)}>
                <h4 style={{ color: "text-bold" }}> <span className="rotate" id="rotate7">&rsaquo;</span> Is the GST included in the service charges?</h4> 
              </Accordion.Toggle>

              </Card.Header>
              <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             Yes, the GST is applicable for India region and included
                      on top of the service charges. The rate of GST will be per
                      the Government of India norms.</p>
             </div>

            </Accordion.Collapse>
        </Accordion>
        <br />


              </div>
            </div>
            <br/>
            <FaqCard message="Invoice" />
          </section>

          <br></br>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default InvoiceRelated;
