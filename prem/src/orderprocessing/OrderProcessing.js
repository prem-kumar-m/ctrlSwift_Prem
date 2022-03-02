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
class OrderProcessing extends React.Component {
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
          <section className="generic-banner relative banner-area-inner29">
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
         <SmallMenu message="orderprocessing"/>
          <section>
            <div className="row">
              <div className="col-md-6">
              <Accordion defaultActiveKey="1" >
                  <Card.Header >
                  <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(1)}>
                      <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate">&rsaquo;</span>{" "}
                      What will happen after I have raised a new Service Desk order?
                   </h4>
                    </Accordion.Toggle>

                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <div className="container">
                      <p className=" faq-text-content">

                      A new order will be assigned to CtrlSwift Project Manager,
                       who will in turn check internally regarding the bandwidth availability and other logistics readiness, 
                       plan for necessary transition for launching the Service Desk delivery, as per the customer-requested date. 
                       Once the Project Manager is OK, He/She will approve the order and the workflow returns to the customer for further steps.
                      </p>
                    </div>

                  </Accordion.Collapse>
                </Accordion> <br />
                <Accordion defaultActiveKey="1" >
                  <Card.Header >
                  <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(2)}>
                      <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate2">&rsaquo;</span>{" "}
                      Can I cancel a new Service Desk order?
                                                               </h4>
                    </Accordion.Toggle>

                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <div className="container">
                      <p className=" faq-text-content">
                      You can cancel an order while creating the order.
                      You can also cancel an unprocessed order by clicking the Cancel Your Order option under orders menu.
                      </p>
                    </div>

                  </Accordion.Collapse>
                </Accordion> <br />
              </div>
              <br></br>

              <div className="col-md-6">
              <Accordion defaultActiveKey="1" >
                  <Card.Header >
                  <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(3)}>
                      <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate3">&rsaquo;</span>{" "}
                      What is the general duration to complete the order processing at your end?
                                      </h4>
                    </Accordion.Toggle>

                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <div className="container">
                      <p className=" faq-text-content">

                      The CtrlSwift Project Manager is expected to complete the order in 2 days maximum.
                       The Project Manager would need to certain checks and come back to the customer for any additional inputs for clearly understanding the requirements.
                      </p>
                    </div>

                  </Accordion.Collapse>
                </Accordion> <br />
              </div>
            </div>
            <br/>
            <FaqCard message="Order Processing" />
          </section>

          <br></br>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default OrderProcessing;
