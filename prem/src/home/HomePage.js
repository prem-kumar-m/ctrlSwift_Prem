import React, { lazy, Suspense } from "react";
import { Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import LazyLoad from 'react-lazy-load';
import "react-splitter-layout/lib/index.css";
import * as Constants from "../constants";
import "../css/animate.min.css";
import "../css/bootstrap/bootstrap.css";
import "../css/font-awesome.min.css";
import "../css/linearicons.css";
import "../css/magnific-popup.css";
import "../css/main.css";
import "../css/nice-select.css";
import backgroundImage25 from "../images/demovideo.mp4";
import backgroundImage3 from "../images/WebP/about1.webp";
import backgroundImage4 from "../images/WebP/about2.webp";
import backgroundImage9 from "../images/WebP/diagram-03.webp";
import "./HomePage.scss";
const Bannercarousel = lazy(() => import("../components/Bannercarousel/Bannercarousel"));
const Header = lazy(() => import("../components/header/Header"));
const Footer = lazy(() => import("../components/footer/Footer.js"));
const HeaderLogin = lazy(() => import("../components/header_login/HeaderLogin"));
const SmallbannerLite = lazy(() => import("../components/smallBanner/SmallbannerLite"));
const Clients = lazy(() => import("../components/Clients/Clients"));
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      nameError: "",
      email: "",
      emailError: "",
      message: "",
      submitted: false,
      isLoginSuccess: false,
      isReadyToRedirect: false,
      navigate: "",

    };
  }
  cardchange = (flag) => {
    window.localStorage.setItem("priceFlag", flag);
    console.log(window.localStorage.getItem(flag));
  }

  componentDidMount() {
    localStorage.clear();
    console.log(navigator.userAgent);
    var ba = ["MSIE", "Trident", "Edge"];
    var b, ua = navigator.userAgent;
    for (var i = 0; i < ba.length; i++) {
      if (ua.indexOf(ba[i]) > -1) {
        b = ba[i];

      }
    }
    if (b === "MSIE" || b === "Trident" || b === "Edge") {
      b = "Internet Explorer";
      alert("You are using " + b + " browser Please switch to chrome for better view");
    }

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }



  render() {

    return (
      <div>
        <Suspense fallback={<div style={{ fontSize: "20px", color: "black" }}>
          <div className="text-center">
            <div className="spinner-border text-info  m-10" role="status">
            </div>
          </div></div>}>
          {!window.sessionStorage.getItem(Constants.ACCESS_EMAIL) ? (
            <Header />
          ) : (
            <HeaderLogin />
          )}
          <Bannercarousel />
          <section className="home-video-area" id="knowus">
            <div className="container-fluid">
              <div className="row justify-content align-items-center">
                <div className="col-lg-6 about-right about-padding">
                  <h1 className="head2">About Us</h1>
                  <div id="#head2">
                    CtrlSwift Framework demands Super Intelligence and Experience in various parameters defined below and it’s not an easy methodology to adapt and integrate.
                    Service Delivery Architecture Framework
                    <div className="unordered-list  ">
                      <ul>
                        <li>  Business Service Management  </li>
                        <li>  Business Support Case Definition  </li>
                        <li>  Service Delivery Management
                          <br />
                          <Button className=" medium radius text-uppercase  lite-color"
                            onClick={() => { this.props.history.push("./aboutctrlSwift") }}
                          >Read more</Button>


                        </li>



                      </ul>
                    </div>
                  </div>
                </div>
                <section className="video-area col-lg-6" style={{ padding: "0px" }}>
                  <div className="overlay overlay-bg"></div>
                  <div className="containers">
                    <div className="video-content">
                      <img className="img-fluid" src={backgroundImage3} alt=" about1" width="100%" />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>

          <section className="home-aboutus-area">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div
                  className="col-lg-6 no-padding about-left"
                  style={{ padding: "0px" }}
                >
                  <LazyLoad>
                    <img className="img-fluid" src={backgroundImage4} alt="about2" />

                  </LazyLoad>
                </div>
                <div className="col-lg-6 no-padding about-right">
                  <h1 className="head2">Why CtrlSwift?</h1>
                  <span className="text-white">

                    <p id="#head3">
                      IT is evolving at the speed of light. Innovations are happening across various Matrices and directions like Applications, Processes, Tools, Compliances, and so on. Software as a Services, Infrastructure as a Service, and Platform as a service are increasing the speed of deployment & ease the capex investment and fulfil the Business Need on the go.

                      Technologies are evolving in one direction and the investments on Technologies is getting obsolete in on other direction.
                      <br />{"  "}
                      <Button className=" text-uppercase btn btn-primary"
                        onClick={() => { this.props.history.push("./aboutctrlSwift#What CtrlSwift") }}
                        id="cs-h-why" >Read more</Button>


                    </p>

                  </span>
                </div>
              </div>
            </div>
          </section>



          <section
            className="video-sec-area section-gap-home1 mt-0"
            id="videos"
          >
            <div className="container">
              <div className="row justify-content-center align-items-center">
                <div className="col-lg-6 video-left">
                  <h1 className="head1">
                    We provide our services to customers with a view to accelerate
                    business and optimize their IT spend through large scale
                    automation, simplification and optimization strategies.
                  </h1>
                  <p>
                    <span>
                      CtrlSwift is built on our high end IT Service Management tool
                    </span>
                  </p>
                  <p className="font-weight-normal">
                    CtrlSwiftTM is a proprietary Service Desk platform of Balbhas
                    Business Sysnomics. Balbhas is a Leader in Automation &
                    Technology Services to IT customers of Small, Medium and
                    enterprise businesses.
                  </p>
                  <Button
                    className="genric-btn primary "
                    variant=" "
                    href="./customizePage"
                  >
                    Get Started now
                  </Button>
                </div>

                <div className="col-lg-6 video-left">
                  <div>
                    <Carousel>
                      <Carousel.Item>
                        {" "}
                        <LazyLoad>
                          <video
                            src={backgroundImage25}
                            style={{
                              float: "left",
                              width: 550,
                              height: 450,
                              paddingBottom: 10,
                              marginTop: "none",
                            }}
                            autoPlay={false}
                            controls

                          />
                        </LazyLoad>
                        {" "}
                      </Carousel.Item>
                    </Carousel>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <SmallbannerLite />
          <section
            className="price-area section-gap"
            style={{ marginTop: -150 }}
            id="offerings"
          >
            <div className="container">
              <div className="row d-flex justify-content-center">
                <div className="menu-content pb-70 col-lg-12">
                  <div className="title text-center">
                    <h1
                      style={{
                        fontWeight: 300,
                        fontSize: "45px",
                        fontFamily: "Poppins,sans-serif",
                        color: "#464a48",
                      }}
                    >
                      Service Offerings
                    </h1>
                    <p className="fontsize">
                      CtrlSwift has classified the services as follows based on the
                      technology
                    </p>
                    <div className="para3">
                      <div
                        className="speaker-img  scroll"
                        style={{ alignItems: "center" }}
                      >
                        <picture>
                          <img
                            src={backgroundImage9}
                            className="img fluid"
                            alt="smaple image"
                          />
                        </picture>

                      </div>

                      <p className="font-weight-normal">
                        {" "}
                        CtrlSwift is combination of Business One Framework and One
                        Desk Framework.{" "}
                      </p>

                      <p className="font-weight-normal" >
                        Business One Framework focus of Service Delivery
                        Architecture, Quality of Delivery, Business and IT Process
                        of delivery and Automation of Service Delivery
                        Organization.{" "}
                      </p>

                      <p className="font-weight-normal" >
                        One Desk Framework understands customer Need and create
                        inputs to Business one Framework so that Business One
                        Framework and One Desk Framework will connect at a point
                        and start deliver customer needs and improves its Quality
                        and Optimization Day by Day.
                      </p>

                      <p className="font-weight-normal" >
                        Integrated Business One Desk - CtrlSwift understands customer
                        Business Needs Better and translates that into technical
                        deliverables and start assigning the tasks automatically
                        to various team integrated in Business one Framework.{" "}
                      </p>

                      <p className="font-weight-normal" >
                        CtrlSwift understands customer requirement faster and
                        expectation clearly by collection right set of data and
                        provision the services faster and better.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="row  "
                style={{ width: -200, marginLeft: -50, marginRight: -50 }}
              >
                <div className="col-lg-3 col-md-6 single-price">
                  <div className="top-part">
                    <h1 className="package-no">01</h1>
                    <h4>CtrlSwift Lite</h4>
                  </div>
                  <div className="package-list font-color-weight  ">
                    <ul>
                      <li>Ticket E-2-E management</li>
                      <li>Contact management</li>
                      <li>Mail-box monitoring</li>
                      <li>Ticket asssignment and followup</li>
                      <li>End-user communication</li>
                    </ul>
                  </div>
                  <div className="bottom-part" style={{ marginTop: "3em" }}>
                    <Button
                      className="genric-btn success-border  radius text-uppercase"
                      variant=" "
                      style={{ width: 200 }}
                      onClick={() => { window.location = "/ctrlSwiftlite"; }}

                    >
                      Learn More
                    </Button>
                  </div>
                  <br></br>
                  <div className="bottom-part">

                    <Button
                      className="genric-btn success-border  radius text-uppercase"
                      variant=" "
                      style={{ width: 200 }}
                      href="./customizePage"

                      onClick={() => this.cardchange("Lite")}
                    >
                      Customize
                    </Button>
                  </div>
                  <br></br>
                  <div className="bottom-part">
                    <Button
                      className="genric-btn success-border  radius text-uppercase"
                      variant=" "
                      href="./requestdemo"
                      style={{ width: 200 }}
                    >
                      Request Demo
                    </Button>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 single-price">
                  <div className="top-part">
                    <h1 className="package-no">02</h1>
                    <h4>CtrlSwift Enterprise</h4>
                  </div>
                  <div className="package-list font-color-weight ">
                    <ul>
                      <li>Vendor performance</li>
                      <li>SLA management</li>
                      <li>Escalation management</li>
                      <li>Outage handling</li>
                      <li>Asset & license management</li>
                      <li>Access management</li>
                      <li></li>
                    </ul>
                  </div>
                  <div className="bottom-part">
                    <Button
                      className="genric-btn success-border  radius text-uppercase"
                      variant=" "
                      style={{ width: 200 }}
                      onClick={() => { window.location = "/ctrlSwiftlite#cs-Enterprise"; }}

                    >
                      Learn More
                    </Button>
                  </div>
                  <br></br>
                  <div className="bottom-part">

                    <Button
                      className="genric-btn success-border  radius text-uppercase"
                      variant=" "
                      style={{ width: 200 }}
                      href="./customizePage"
                      onClick={() => this.cardchange("Enterprise")}

                    >
                      Customize
                    </Button>
                  </div>
                  <br></br>
                  <div className="bottom-part">
                    <Button
                      className="genric-btn success-border  radius text-uppercase"
                      variant=" "
                      style={{ width: 200 }}
                      href="./requestdemo"
                    >
                      Request Demo
                    </Button>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 single-price">
                  <div className="top-part">
                    <h1 className="package-no">03</h1>
                    <h4>CtrlSwift Premium</h4>
                  </div>
                  <div className="package-list font-color-weight ">
                    <ul>
                      <li>Ticket E-2-E management</li>
                      <li>Contact management</li>
                      <li>Mail-box monitoring</li>
                      <li>Ticket asssignment and followup</li>
                      <li>End-user communication</li>
                    </ul>
                  </div>
                  <div className="bottom-part" style={{ marginTop: "3em" }}>
                    <Button
                      className="genric-btn success-border  radius text-uppercase"
                      variant=" "
                      style={{ width: 200 }}
                      onClick={() => { window.location = "/ctrlSwiftlite#cs-Premium"; }}


                    >
                      Learn More
                    </Button>
                  </div>
                  <br></br>
                  <div className="bottom-part">
                    <Button
                      className="genric-btn success-border  radius text-uppercase"
                      variant=" "
                      style={{ width: 200 }}
                      href="./customizePage"
                      onClick={() => this.cardchange("Premium")}

                    >
                      Customize
                    </Button>
                  </div>
                  <br></br>
                  <div className="bottom-part">
                    <Button
                      className="genric-btn success-border  radius text-uppercase"
                      variant=" "
                      style={{ width: 200 }}
                      href="./requestdemo"
                    >
                      Request Demo
                    </Button>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 single-price">
                  <div className="top-part">
                    <h1 className="package-no">04</h1>
                    <h4>CtrlSwift Ultimate</h4>
                  </div>
                  <div className="package-list font-color-weight ">
                    <ul>
                      <li>Ticket E-2-E management</li>
                      <li>Contact management</li>
                      <li>Mail-box monitoring</li>
                      <li>Ticket asssignment and followup</li>
                      <li>End-user communication</li>
                    </ul>
                  </div>
                  <div className="bottom-part" style={{ marginTop: "3em" }}>
                    <Button
                      className="genric-btn success-border  radius text-uppercase"
                      variant=" "
                      style={{ width: 200 }}
                      onClick={() => { window.location = "/ctrlSwiftlite#cs-Ultimate"; }}

                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Clients />

          <section
            className="callaction-area relative section-gap"
            style={{ marginTop: -130 }}
          >
            <div className="overlay overlay-bg"></div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10" style={{ opacity: 60 }}>
                  <span className="head5 font-color-weight">CtrlSwift</span>
                  <p>
                    Balbhas Business sysnomics LLC, 608 Parkaire Crossing
                    Marietta, GA 30068 USA
                  </p>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </Suspense>
      </div>
    );
  }
}

export default HomePage;
