import AOS from 'aos';
import 'aos/dist/aos.css';
import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "react-multi-email/style.css";
import { Redirect } from "react-router";
import Footer from "../components/footer/Footer.js";
import Header from "../components/header/Header";
import HeaderLogin from "../components/header_login/HeaderLogin";
import * as Constants from "../constants";
import backgroundImage23 from "../images/BSM.jpg";
class AboutctrlSwift extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  scrollFunction() {
    var topPage = document.getElementById("top-page");

    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      topPage.style.display = "block";
    } else {
      topPage.style.display = "none";
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollFunction);
}
  componentDidMount() {
    AOS.init();
    window.removeEventListener('scroll', this.scrollFunction);


  }

  componentDidUpdate(prevProps, prevState, snapshot) { }

  render() {
    if (this.state.isReadyToRedirect) return <Redirect to="/user" />;

    return (
      <div>
        {!window.sessionStorage.getItem(Constants.ACCESS_EMAIL) ? (
          <Header />
        ) : (
          <HeaderLogin />
        )}{" "}

        <div className="banner-bg-img4" id="About-ctrl">
          <div className="caption" >
            <div className="generic-banner-content  " data-aos="zoom-in-up" data-aos-duration="1500">
              <span className="border" >About CtrlSwift</span>

            </div><br /><br />
            <p className="text-white" style={{ opacity: 1 }}>
              centralized instances of SOPs and KEDBs
            </p>


          </div>
        </div>

        <Container style={{ alignItems: "center" }} >

            <Row>
              <Col>
                <p style={{ fontSize: 20, color: "black", fontStyle: "bold" }}>
                </p>
                <br></br>
                <p style={{ fontSize: 15,color: "black", textAlign: "justify" }}   data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500">
                  CtrlSwift Framework demands Super Intelligence and Experience in various parameters defined below and it’s not an easy methodology to adapt and integrate.
                </p>
              </Col>
            </Row>

            <Form>
              <Form.Row>
                <Form.Group as={Col} md="6" controlId="">
                  <div className="unordered-list" >
                    <h4>Service Delivery Architecture Framework </h4>
                    <br />
                    <ul
                      style={{
                        fontSize: 15,
                        letterSpacing: 1,
                        marginLeft: "10%",
                        color: "black"
                      }}
                    >
                      <li>Business Service Management </li>
                      <li>Business Support Case Definition  </li>
                      <li>Service Delivery Management  </li>
                      <li>Service Experience Standardization</li>
                      <li>Tools Framework to Track </li>

                    </ul>

                  </div>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="">
                  <div className="unordered-list" >
                    <h4> </h4>
                    <br />  <br />
                    <ul
                      style={{
                        fontSize: 15,
                        letterSpacing: 1,
                        color:"black"
                      }}
                    >
                      <li>
                        Tools Framework to implement various IT & Business Processes
                      </li>
                      <li>Process standardisation  </li>
                      <li>Technology Guidance  </li>
                      <li>Technology Management  </li>
                      <li>Service Quality Framework  </li>
                      <li>Automation  </li>
                    </ul>

                  </div>
                </Form.Group>

              </Form.Row>
            </Form>
            <Row>
              <Col>
                <p  style={{color:"black"}}>
                  CtrlSwift has Super Powerful Team with High Potential Knowledge and Experience which has created the complex CtrlSwift Nerve System under the framework and provided the simple interface for customers to collaborate. CtrlSwift provides a “One Process - One Tool” experience to all end-users/ customers. It revolves around ITSM Automation, Process Simplification, Digital User Experience, Smart Self-Service Systems centralized Knowledge Management.
                  CtrlSwift comprises of a robust maturity assessment methodology and transformation cookbook
                </p>
              </Col>
            </Row>
        </Container>


        <div className="banner-bg-img5" id="What CtrlSwift" >
          <div className="caption" >
            <div className="generic-banner-content  " data-aos="zoom-in-up" data-aos-duration="1500">
              <span className="border" >What is CtrlSwift?</span>

            </div><br /><br />
            <p className="text-white" style={{ opacity: 1 }}>
            </p>


          </div>
        </div>
        <Container style={{ alignItems: "center" }}>
          <Row>
            <Col>
              <p style={{ fontSize: 20, color: "black" }}>
              </p>
              <br></br>
              <p style={{ fontSize: 15, textAlign: "justify",color: "black"  }}>
              <div  style={{color: "black"}} >

                <p >
                  CtrlSwift is NextGen IT OPS Independent Platform to Provide Freedom from Operations & IT Services Management of any Business vertical across the Globe. Industry 4.0 demands next level of Business Services Management platform which includes Business Service Level & Business Availability Improvement Also Business Operation Cost Optimization                 </p>
</div>
                <p >
                  CtrlSwift has defined the CtrlSwift Super Intelligent Framework (CrtlSwiftSIF) purely to upgrade the existing Business Services Management Best Practices. CtrlSwiftSIF is unique and it is designed to share its Business Intelligence to across all Businesses on NextGen Service Delivery & Commercial model which is vital and bring lot of values to various growing organizations on increasing their sustainability, service availability, productivity improvement without investing for Tool, Infrastructure and its support related cost
                </p>

                <p >
                  CtrlSwift Super Intelligent Framework is a real time framework and its combination of Human Intelligence, Tools, Artificial Intelligence to manage any IT Setup which can be customized as per customer need and ready to be deployed within matter of time. CtrlSwiftSIF will perform combination of People, Tools to Manage ITSM, Monitoring Infrastructure and Business & IT process Management.
                </p>

                <p >
                  Simple platform solves the problems of managing team of IT Operations Management, standardizing challenges of Tools, Business & IT Process Improvement/Automation on simple “CONTROLLED EASY TO CHANGE” Commercial model.
                </p>
              </p>
            </Col>
          </Row>


          <Form>

            <br />
            <br />
            <br />
          </Form>
        </Container>
        <div className="banner-bg-img6 " id="Why CtrlSwift?" data-aos="animation_name">
          <div className="caption" >
            <div className="generic-banner-content  " data-aos="zoom-in-up" data-aos-duration="1500">
              <span className="border" >Why is CtrlSwift?</span>

            </div><br /><br />
            <p className="text-white" style={{ opacity: 1 }}>
            </p>


          </div>
        </div>
        <Container style={{ alignItems: "center" }}>
          <Row>
            <Col>
              <br></br>
              <p style={{ fontSize: 15, textAlign: "justify" ,color:"black"}}>
                <p>
                  IT is evolving at the speed of light. Innovations are happening across various Matrices and directions like Applications, Processes, Tools, Compliances, and so on. Software as a Services, Infrastructure as a Service, and Platform as a service are increasing the speed of deployment & ease the capex investment and fulfil the Business Need on the go.  {" "}
                </p>

                <p  style={{ fontSize: 15, textAlign: "justify" ,color:"black"}}>
                  Technologies are evolving in one direction and the investments on Technologies is getting obsolete in on other direction. Businesses are forced to invest on latest technologies to retain their business & to manage their competition pressure and indirectly it is increasing its operational cost as they have to recruit resources to manage the latest technologies.  {" "}
                </p>
              </p>

              <p  style={{ fontSize: 15, textAlign: "justify" ,color:"black"}}>
                Specialization approach and productization of technologies, processes, tools brought out lot of products to manage Business Services. Integration of various products in a common platform or passing inputs from one product to other by creating connectors complicating the technology services management and various hidden cost in terms of subscription charges and customization and roll out and immediately moving to various other technologies as business delivery model is volatile and demands Man power to data fetching, movement and management.  {" "}
              </p>

              <p  style={{ fontSize: 15, textAlign: "justify" ,color:"black"}}>
                Every growing and grown businesses are struggling to retain their employees and they unable to give commitment and career growth as technologies are volatile and getting changed frequently. So, Businesses are making huge investment on IT Strategist alignment to ensure they are always getting the better and to retain their growth.
              </p>
              <p style={{ fontSize: 15, textAlign: "justify" ,color:"black"}}>
                270 Degree out of 360 Degrees in ITSM is getting lot of innovations and moving towards solutions improvement and enablement of various Business challenges but remaining 90 Degree of IT Service Management (People-Service Delivery Model) is not changed much and its almost standstill for a decade. We understood the need of the hour and Business One Desk Framework Got Defined.
              </p>
              <div className="cs-ab-mb">
                <img alt="" className="rounded mx-auto d-block" src={backgroundImage23}  />
                <br />
              </div>


            </Col>
          </Row>
          <div href="#About-ctrl">
<div className="top-button" id="top-page" href="#About-ctrl">
<p  > <a href="#About-ctrl">
<span>&#8250;</span>
  </a></p>
   </div>
</div>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default AboutctrlSwift;
