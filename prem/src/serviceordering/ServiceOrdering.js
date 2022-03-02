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



class ServiceOrdering extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

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
          <section className="generic-banner relative banner-area-inner28">
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

          <SmallMenu message="serviceordering" />

          <section>
            <div className="row">
              <div className="col-md-6">
              <Accordion defaultActiveKey="1" >
                  <Card.Header >
                  <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(1)}>
                      <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate">&rsaquo;</span>{" "}
                      Can I get a demo of the tool, before I decide to raise a request?
                                            </h4>
                    </Accordion.Toggle>

                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <div className="container">
                      <p className=" faq-text-content">

                      The Service Desk demo is always available for a customer before signing up a new contract.
                       Please go to the Price Plan section to initiate a request for a demo.
                       The CtrlSwift team will come back with a demo schedule.
                      </p>
                    </div>

                  </Accordion.Collapse>
                </Accordion> <br />  <Accordion defaultActiveKey="1" >
                  <Card.Header >
                  <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(2)}>
                      <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate2">&rsaquo;</span>{" "}
                      What is the process to order for a Shared Service Desk?                      </h4>
                    </Accordion.Toggle>

                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <div className="container">
                      <p className=" faq-text-content">

                      Shared Service Desk is available in 3 variants, viz., Lite, Enterprise and Premium.
                       One of these models can be ordered by visiting the Price Plan page and by choosing one of the Service Categories.
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
                      What is the process to order for a Dedicated<br/> Service Desk?
                                         </h4>
                    </Accordion.Toggle>

                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <div className="container">
                      <p className=" faq-text-content">

                      The process to order for a Dedicated Service Desk involves contacting the CtrlSwift team, sharing the people, process and tools requirements, arriving at the overall cost and agreeing to the delivery model. Since these steps require a fair amount of mutual discussions, these will be performed outside of this portal.
                       The CtrlSwift team will engage the customer at all times to ensure a smooth and quicker order completion.
                      </p>
                    </div>

                  </Accordion.Collapse>
                </Accordion> <br />
                <Accordion defaultActiveKey="1" >
                  <Card.Header >
                  <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(4)}>
                      <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate4">&rsaquo;</span>{" "}
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
            </div>
            <br/>
            <FaqCard message="Service Desk Ordering" />
          </section>

          <br></br>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default ServiceOrdering;
