import React from "react";
import { Container, Row, Col,Accordion,Card} from "react-bootstrap";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer.js";
import * as Yup from "yup"; // for everything
import { Redirect } from "react-router";
import HeaderLogin from "../components/header_login/HeaderLogin";
import "react-datepicker/dist/react-datepicker.css";
import "react-multi-email/style.css";
import * as Constants from "../constants";
import FaqCard from "../faqCard/faqCard";
import SmallMenu from "../smallmenu/smallMenu";
import { Link } from "react-router-dom";
class PaymentRelated extends React.Component {
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
          <section className="generic-banner relative banner-area-inner33">
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
        <SmallMenu message="paymentrelated"/>
          <section>
            <div className="row">
              <div className="col-md-6">
              <Accordion defaultActiveKey="1">
                <Card.Header >
              <Accordion.Toggle as={Link} variant="link" eventKey="0" onClick={()=>this.rotate(1)} >
              <div className="cs-pluse">
             <h4 className="text-bold"><span className="rotate" id="rotate">&rsaquo;</span>   Can we make the payments in the portal?  </h4> 

                </div>
              </Accordion.Toggle>

              </Card.Header>
              <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             Yes..CtrlSwift is the only medium to view the invoices and
                      make the payments. You can make your payments manually or
                      make them as recurring payments.
                      </p>
             </div>

            </Accordion.Collapse>
        </Accordion>
        <br />


        <Accordion defaultActiveKey="1">
        <Card.Header>
              <Accordion.Toggle as={Link} variant="link" eventKey="0"  onClick={()=>this.rotate(2)}>
                <h4 style={{ color: "text-bold" }}> <span className="rotate" id="rotate2">&rsaquo;</span>  What is the timeframe within which the customer needs to
                        clear the invoice?</h4>
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
                <h4 style={{ color: "text-bold" }}> <span className="rotate" id="rotate3">&rsaquo;</span> What will happen if the invoice payment is delayed?</h4> 
              </Accordion.Toggle>

              </Card.Header>
              <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             Timely payment of invoices is a pre-cursor for us to
                      continue to provide the service to the customer. If the
                      payment has not been made within the stipulated time, the
                      provisioning of services will stop, after a final reminder
                      to the customer.
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
              <Accordion.Toggle as={Link} variant="link" eventKey="0"  onClick={()=>this.rotate(4)}>
                <h4 style={{ color: "text-bold" }}> <span className="rotate" id="rotate4">&rsaquo;</span> What are the payment options available?</h4> 
              </Accordion.Toggle>

              </Card.Header>
              <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             Saravanan/ Rajesh to suggest an answer for this question.
                      </p>
             </div>

            </Accordion.Collapse>
        </Accordion>

        <br />
              <br></br>

              <Accordion defaultActiveKey="1">
        <Card.Header>
              <Accordion.Toggle as={Link} variant="link" eventKey="0"  onClick={()=>this.rotate(5)}>
                <h4 style={{ color: "text-bold" }}> <span className="rotate" id="rotate5">&rsaquo;</span> How do I report the payment issues?</h4> 
              </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             For any issue in payments (over charges, double payments,
                      payment gateway not working, payment failure etc.), please
                      write to contact@CtrlSwift.com and ProjectManager@CtrlSwift.com.
                      </p>
            </div>

            </Accordion.Collapse>
        </Accordion>

        <br />
        <Accordion defaultActiveKey="1">
        <Card.Header>
              <Accordion.Toggle as={Link} variant="link" eventKey="0"  onClick={()=>this.rotate(6)}>
                <h4 style={{ color: "text-bold" }}> <span className="rotate" id="rotate6">&rsaquo;</span> How does the penalty process work?</h4> 
              </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             The decision of applying the penalty is left to the
                      customer. The penalty can be initiated anytime, by the
                      customer, based on service level performance. The penalty
                      is reflected in the invoice.
                      </p>
             </div>

            </Accordion.Collapse>
        </Accordion>
        <br />
        </div>

              </div>

            <br/>
            <FaqCard message="Payment" />
          </section>

          <br></br>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default PaymentRelated;
