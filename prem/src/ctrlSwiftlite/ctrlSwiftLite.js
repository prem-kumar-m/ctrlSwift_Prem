import AOS from 'aos';
import 'aos/dist/aos.css';
import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Redirect } from "react-router";
import Footer from "../components/footer/Footer.js";
import Header from "../components/header/Header";
import HeaderLogin from "../components/header_login/HeaderLogin";
import * as Constants from "../constants";
import arrowup from "../images/arrowup.png";
class ctrlSwiftLite extends React.Component {
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

// When the user scrolls down 20px from the top of the document, show the button
window.addEventListener('scroll', this.scrollFunction);



  }


  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  render() {
    if (this.state.isReadyToRedirect) return <Redirect to="/user" />;
    return (
      <div className="">
        {!window.sessionStorage.getItem(Constants.ACCESS_EMAIL) ? (
          <Header />
        ) : (
          <HeaderLogin />
        )}{" "}
        {/* <div className="view">
          <section className="generic-banner relative banner-area-inner6">
            <div className="overlay overlay-bg overlay-bg-blk"></div>
            <div className="container">
              <div className="row height align-items-center centered-banner justify-content-center">
                <div className="col-lg-10">
                  <div className="generic-banner-content " id="slider1" className="slide-in">
                    <h2 className="head2-inner">Service Offerings</h2>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div> */}
        <div className="banner-bg-img" id="service-offering" >
          <div className="caption" >
          <div className="generic-banner-content  " data-aos="zoom-out-up"  data-aos-duration="2000" >
                    <h2 className="head2-inner ">Service Offerings</h2>
                  </div><br/><br/>
            <span className="border" data-aos="fade-down-left" data-aos-duration="2000">CtrlSwift Lite</span>


          </div>
        </div>
        <br />
        <Container>
          <Form>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="">

                <div  >
                  <h2> CtrlSwift Lite </h2>
                  <br />
                  <p >
                    Industry has the biggest challenge of measuring the services. There is no specific scale or standardization is not available to measure. Service Providers internal or Partners or Vendors coming with their own Measurement System to measure the Services. Quality of Measurement is getting changed from Case to case based on the maturity of Service Providers.
                  </p>

                  <p>Internal Service Providers take the advantage of measuring with their own scale which shows the better results.  </p>

                  <p> People are measured by SLA, Tickets and Number of Resources involved offered to internal or partner customers. People count the tickets and use the numbers to showcase the activities done for the month. Is Management expecting the same from IT Support team who is tracking the system? No. Management is expecting prediction of expected tickets, classification of tickets, Improvement of reducing tickets in the particular bucket  </p>

                </div>
              </Form.Group>

            </Form.Row>

          </Form>
        </Container>

        <div className="banner-bg-img1" id="cs-Enterprise" >
        <div className="caption">
        <div className="generic-banner-content " >

            <span className="border" data-aos="zoom-in-down" data-aos-duration="2000">CtrlSwift Enterprise</span>
</div>

          </div>
        </div>
        <br />
        <Container  >
          <Row>
            <Col>          <h2>End User Application Management</h2>
            </Col>
          </Row>
          <Row>

            <Col>

              <ul>
                <li>Patch Management </li>
                <li>Application Installation </li>
                <br></br>

                <li>
                  <h4>Cloud VDI </h4>
                </li>
                <li>VDI Creation </li>
                <li>Application Installation </li>
                <li>Cloud VDI Support </li>
                <br></br>

                <li>
                  <h4>EPS (End point Security)</h4>
                </li>
                <li>End Point License Management </li>
                <li>End Point Security Installation </li>
                <li>End Point Security Management</li>
                <br></br>

                <li>
                  <h4>Mail Solution</h4>
                </li>
                <li>O365, Dominos, Gsuite, Linux Mail Server Management </li>
                <li>User Creation, Addition, Deletion</li>
                <li>Mail Security Policy Definition</li>
                <li>Mail DLP</li>
                <li>MDM</li>
                <br></br>
              </ul>
            </Col>
            <Col>
              <ul>
                <li>
                  <h4>End User OS Management</h4>
                </li>
                <li>Linux</li>
                <li>Unix</li>
                <li>Windows</li>
                <li>Mac</li>
                <br></br>

                <li>
                  <h4>Spare Management</h4>
                </li>
                <li>Annual Maintenance Contract</li>
                <li>Faulty Spare replacement</li>
                <br></br>

                <li>
                  <h4>End Point Ancillary Devices Management </h4>
                </li>
                <li>Printer Support</li>
                <li>Scanner Support</li>
                <li>WIFI Implementation Support</li>
                <li>Total Tickets expected</li>
              </ul>
            </Col>
          </Row>
        </Container>
        <div className="banner-bg-img2" id="cs-Premium">
        <div className="caption">
        <div className="generic-banner-content  " data-aos="zoom-in-down" data-aos-duration="2000" >

            <span className="border" >CtrlSwift Premium</span>

</div>
          </div>
        </div>
        <br />
        <Container >
        <Row>
            <Col> <h2>Cloud Migration</h2></Col>
             </Row>
          <Row>


          <Col>

                <ul>
                  <li>Migrating from on-prem to cloud </li>
                  <li>Cloud DR </li>
                  <br></br>

                  <li>
                    <h4>Cloud Monitoring </h4>
                  </li>
                  <li>Cloud Best Practices Parameters Monitoring</li>
                  <li>Cloud Cost parameters Monitoring</li>
                  <li>Cloud Utilization Monitoring</li>
                  <br></br>

                  <li>
                    <h4>Cloud Management</h4>
                  </li>
                  <li>Cloud Compliance</li>
                  <li>Cloud Cost Optimization</li>
                  <li>Cloud Availability Management</li>
                  <li>Cloud Provisioning</li>
                  <li>Cloud Automation</li>
                  <br></br>

                  <li>
                    <h4>Active Directory</h4>
                  </li>
                  <li>Cloud AD Integration</li>
                  <li>Group Policy & User level policy defintiion</li>
                  <li>Defined Access</li>
                  <li>Restricted Access</li>
                  <li>SSO </li>
                  <br></br>
</ul>
</Col><Col>
<ul>
                  <li>
                    <h4>Cloud Security Management</h4>
                  </li>
                  <li>Cloud Firewall</li>
                  <li>Cloud VPN and Restricted Access</li>
                  <li>Private Access</li>
                  <br></br>

                  <li>
                    <h4>CtrlSwift Premium - Datacentre</h4>
                  </li>
                  <li>VMWare Support</li>
                  <li>Nutanix Support</li>
                  <li>Citrix Support</li>
                  <li>Exchange Server Support</li>
                  <li>Microsoft Dynamics Support</li>
                  <li>Cisco Support</li>
                  <li>Juniper Support</li>
                  <li>DB Support</li>
                  <br></br>

                  <li>
                    <h4>Projects Support</h4>
                  </li>
                  <li>Mail Migration</li>
                  <li>Cloud Deployment</li>
                  <li>Dynamics Deployment</li>
                </ul>
              </Col>
          </Row>
          </Container>
          <div className="banner-bg-img3" id="cs-Ultimate">
        <div className="caption">
        <div className="generic-banner-content  " >

            <span className="border">CtrlSwift Ultimate</span>
</div>
          </div>

<div href="#service-offering">
<div className="top-button" id="top-page" href="#service-offering">
  <a  href="#service-offering"> <img src={arrowup}/></a>

   </div>
</div>



        </div>

        <Container>


        </Container>

        <Footer />

      </div>
    );
  }
}

export default ctrlSwiftLite;
