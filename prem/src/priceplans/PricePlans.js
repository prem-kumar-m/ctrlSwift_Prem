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
class PricePlans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() { }

  componentDidUpdate(prevProps, prevState, snapshot) { }
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
          <section className="generic-banner relative banner-area-inner27">
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
          <SmallMenu message="priceplans" />
          <section>
            <div className="row">
              <div className="col-md-6">
                <Accordion defaultActiveKey="1" >
                  <Card.Header >
                  <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(1)}>               
                      <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate">&rsaquo;</span>{" "}
                        Is the price same for all your services?
                      </h4>
                    </Accordion.Toggle>

                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <div className="container">
                      <p className=" faq-text-content">

                        The price is different, based the service window selected, contract period etc.
                        While basic services involve lower prices, the premium services involve higher prices.
                      </p>
                    </div>

                  </Accordion.Collapse>
                </Accordion> <br />
                <Accordion defaultActiveKey="1" >
                  <Card.Header >
                  <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(2)}>               
                      <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate2">&rsaquo;</span>{" "}
                        Why does the price vary across the 3 Service Categories?
                      </h4>
                    </Accordion.Toggle>

                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <div className="container">
                      <p className=" faq-text-content">

                        The Lite category involves simple services and hence the effort to be spent in the service delivery will be less than that of a premium set of services.
                        In the premium set of services,
                        higher effort is needed for troubleshooting, knowledge management and maintenance etc.
                      </p>
                    </div>

                  </Accordion.Collapse>
                </Accordion> <br />
              </div>
              <div className="col-md-6">
                <Accordion defaultActiveKey="1" >
                  <Card.Header >
                  <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(3)}>               
                      <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate3">&rsaquo;</span>{" "}
                        What are the influencing factors that control the overall price?
                      </h4>
                    </Accordion.Toggle>

                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <div className="container">
                      <p className=" faq-text-content">

                        Although each service category has its own base/ standard price,
                        the overall price is dynamically computed based on
                        <ul>
                          <li>(a) service window
                          </li>
                          <li>  (b) current state in terms of ticket volume, number of users, number of assets, number of vendors etc.
                          </li>
                        </ul>
                      </p>
                    </div>

                  </Accordion.Collapse>
                </Accordion> <br /><Accordion defaultActiveKey="1" >
                  <Card.Header >
                  <Accordion.Toggle as={Link} variant="link" eventKey="0"onClick={()=>this.rotate(4)}>               
                      <h4 style={{ color: "text-bold" }}><span className="rotate" id="rotate4">&rsaquo;</span>{" "}
                        How does the price vary between Shared Service Desk and Dedicated Service Desk?  
                                            </h4>
                    </Accordion.Toggle>

                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <div className="container">
                      <p className=" faq-text-content">

                        In the context of Dedicated Service Desk, higher prices are applicable.
                        As the delivery happens in a dedicated environment using dedicated set of people and tools,
                        the price will be higher than that of Shared Service Desk model. Also, in the Dedicated set-up,
                        depending on the process requirements,
                        there will be a need for a significant customization to be done onto the process and tool.
                      </p>
                    </div>

                  </Accordion.Collapse>
                </Accordion> <br />
              </div>
            </div>
            <br />
            <FaqCard message="Price Plan" />
          </section>

          <br></br>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default PricePlans;
