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
class FAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
  }
  myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
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
          <div className="banner-space"></div>
          <section className="generic-banner relative banner-area-inner5">
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
          <SmallMenu message="General"/>
          <section>
            <div className="row">
              <div className="col-md-6">
              <Accordion defaultActiveKey="1" >
              <Card.Header >
              <Accordion.Toggle as={Link} variant="link" eventKey="0" onClick={()=>this.rotate(1)} >
              <div className="cs-pluse">
             <h4 className="text-bold"><span className="rotate" id="rotate">&rsaquo;</span> How do I cancel my subscription ?  </h4> 

                </div>
              </Accordion.Toggle>
              </Card.Header>
            <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
                      Sorry that for some reason you had to cancel your subscription.
                      You can do it within the ctrlswift service you are using or send an e-mail to
                      <a href="#"> accounts@ctrlswift.com </a>
                      </p>
             </div>

            </Accordion.Collapse>
        </Accordion>
        <br/>
        <Accordion defaultActiveKey="1">
              <Card.Header>
              <Accordion.Toggle as={Link} variant="link" eventKey="0"  onClick={()=>this.rotate(2)}>
                <h4 style={{ color: "text-bold" }}> <span className="rotate" id="rotate2">&rsaquo;</span> How to reset my CtrlSwift password ? </h4> 
              </Accordion.Toggle>
              </Card.Header>
            <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
                          No data
                      </p>
             </div>

            </Accordion.Collapse>
        </Accordion>
              </div>
              <div className="col-md-6">
              <Accordion defaultActiveKey="1">
              <Card.Header>
              <Accordion.Toggle as={Link} variant="link" eventKey="0"  onClick={()=>this.rotate(3)}>
                <h4 style={{ color: "text-bold" }}> <span className="rotate" id="rotate3">&rsaquo;</span> Is there any long term contract ? </h4>
              </Accordion.Toggle>
              </Card.Header>
            <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             No. It is available on Pay Per Use, One Year Contract and Three Years Contract.
                      </p>
             </div>

            </Accordion.Collapse>
        </Accordion>
        <br/>
        <Accordion defaultActiveKey="1">
              <Card.Header>
              <Accordion.Toggle as={Link} variant="link" eventKey="0"  onClick={()=>this.rotate(4)}>
                <h4 style={{ color: "text-bold" }}> <span className="rotate" id="rotate4">&rsaquo;</span> What kind of payments do you accept ? </h4> 
              </Accordion.Toggle>
              </Card.Header>
            <Accordion.Collapse eventKey="0">
             <div className="container">
             <p  className=" faq-text-content">
             We accept payments via Visa, Master, and American Express. and bank transfers for yearly subscription.
              For details, please
              e-mail: <a href="#"> accounts@b1swift.com </a>
                      </p>
             </div>

            </Accordion.Collapse>
        </Accordion>
          </div>
            </div>
            <br/>
            <FaqCard message="FAQ" />
          </section>

          <br></br>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default FAQ;
