import React from "react";
import { Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import "react-splitter-layout/lib/index.css";
import Swal from "sweetalert2";
import * as Constants from "../../constants";
import "../../css/animate.min.css";
import "../../css/bootstrap/bootstrap.css";
import "../../css/font-awesome.min.css";
import "../../css/linearicons.css";
import "../../css/magnific-popup.css";
import "../../css/main.css";
import "../../css/nice-select.css";
import backgroundImage3 from "../../images/about1.jpg";
import backgroundImage4 from "../../images/about2.jpg";
import backgroundImage25 from "../../images/demovideo.mp4";
import backgroundImage9 from "../../images/diagram-03.png";
import backgroundImage31 from "../../images/l.png";
import backgroundImage35 from "../../images/l000.png";
import backgroundImage10 from "../../images/l1.png";
import backgroundImage11 from "../../images/l2.png";
import backgroundImage12 from "../../images/l3.png";
import backgroundImage13 from "../../images/l4.png";
import backgroundImage14 from "../../images/l5.png";
import backgroundImage15 from "../../images/l6.png";
import backgroundImage16 from "../../images/l7.png";
import backgroundImage17 from "../../images/l8.png";
import backgroundImage18 from "../../images/l9.png";
import backgroundImage33 from "../../images/l90.png";
import backgroundImage19 from "../../images/l91.png";
import backgroundImage34 from "../../images/l92.png";
import backgroundImage32 from "../../images/r.png";
import Bannercarousel from "../Bannercarousel/Bannercarousel";
import Footer from "../footer/Footer";
import PartnersHeader from "../header/PartnersHeader";
import HeaderLogin from "../header_login/HeaderLogin";
import PartnerComp from "../partnerComp/partnerComp";
import SmallbannerLite from "../smallBanner/SmallbannerLite";
import "./HomePage.scss";

class PartnerCard extends React.Component {
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
      // swiftlite:"lite",
      // swiftEnterprise:"Enterprise",
      // swiftPremium:"Premium",
    };
    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleNameChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /^[A-Za-z_ ]+$/;

    if (!re.test(value)) {
      this.setState({
        nameError: "Invalid name.",
      });
    } else {
      this.setState({
        nameError: "",
      });
    }
  };

  handleEmailChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /\S+@[A-Za-z]+\.com/;
    const ks = /\S+@[A-Za-z]+\.co.in/;
    if (!re.test(value) && !ks.test(value)) {
      this.setState({
        emailError: "Invalid email",
      });
    } else {
      this.setState({
        emailError: "",
      });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });

    if (
      this.state.nameError === "" &&
      this.state.emailError === "" &&
      this.state.username !== "" &&
      this.state.email !== ""
    ) {
      Swal.fire({
        title: "",
        text: "Thanks for submitting!",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      }).then((res) => {
        if (res.value) {
          window.location.reload();
        }
      });
    }
  }
  cardchange = (flag) => {
    window.localStorage.setItem("priceFlag", flag);
    console.log(window.localStorage.getItem(flag));
  };

  componentDidMount() {
    localStorage.clear();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(
      this.state.username +
      "-----/n" +
      this.state.email +
      "/n-------" +
      this.state.emailError +
      "/n------" +
      this.state.nameError
    );
  }
  handleChanges = () => {
    this.props.history.push("/selfEmployedReg");
  };

  render() {
    // if (this.state.isReadyToRedirect) return <Redirect to="/requestdemo" />;
    return (
      <div>
        {!window.sessionStorage.getItem(Constants.ACCESS_EMAIL) ? (
          <PartnersHeader />
        ) : (
          <HeaderLogin />
        )}
        <section style={{ height: window.innerHeight }}>
          <div style={{ background: "#262b3d" }}>
          <Bannercarousel />
          </div>
        </section>

        <section className="home-video-area" id="knowus">
          <div className="container-fluid">
            <div className="row justify-content align-items-center">
              <div className="col-lg-6 about-right about-padding">
                <h1 className="head2">About Us</h1>
                <p id="#head2">
                  CtrlSwift Framework demands Super Intelligence and Experience
                  in various parameters defined below and it’s not an easy
                  methodology to adapt and integrate. Service Delivery
                  Architecture Framework
                  <div className="unordered-list  ">
                    <ul>
                      <li> Business Service Management </li>
                      <li> Business Support Case Definition </li>
                      <li>
                        {" "}
                        Service Delivery Management
                        <p>
                          <Button
                            className=" medium radius text-uppercase  lite-color"
                            href="./aboutctrlSwift"
                          >
                            Read more
                          </Button>
                        </p>
                      </li>

                    </ul>{" "}
                  </div>
                </p>
              </div>
              <section className="video-area col-lg-6" style={{ padding: "0px" }}>
                <div className="overlay overlay-bg"></div>
                <div className="containers">
                  <div className="video-content">
                    <img className="img-fluid" src={backgroundImage3} alt=" " />
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
                <img className="img-fluid" src={backgroundImage4} alt="" />
              </div>
              <div className="col-lg-6 no-padding about-right">
                <h1 className="head2">Why CtrlSwift?</h1>
                <span className="text-white">

                  <p id="#head3">
                    IT is evolving at the speed of light. Innovations are
                    happening across various Matrices and directions like
                    Applications, Processes, Tools, Compliances, and so on.
                    Software as a Services, Infrastructure as a Service, and
                    Platform as a service are increasing the speed of deployment
                    & ease the capex investment and fulfil the Business Need on
                    the go. Technologies are evolving in one direction and the
                    investments on Technologies is getting obsolete in on other
                    direction.
                    <br />
                    {"  "}
                    <Button
                      className=" text-uppercase btn btn-primary"
                      href="./ctrlSwiftlite"
                      id="cs-h-why"
                    >
                      Read more
                    </Button>
                  </p>
                </span>
              </div>
            </div>
          </div>
        </section>



        <section
          className="video-sec-area section-gap-home"
          style={{ marginTop: -85 }}
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
                    CtrlSwift is built on our high end IT Service Management
                    tool
                  </span>
                </p>
                <p>
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
                      ></video>{" "}
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
                  <p>
                    CtrlSwift has classified the services as follows based on
                    the technology
                  </p>
                  <div className="para3">
                    <div
                      className="speaker-img  scroll"
                      style={{ alignItems: "center" }}
                    >
                      <img
                        src={backgroundImage9}
                        className="img fluid"
                        alt="smaple image"
                      />
                    </div>

                    <p>
                      {" "}
                      CtrlSwift is combination of Business One Framework and One
                      Desk Framework.{" "}
                    </p>

                    <p>
                      Business One Framework focus of Service Delivery
                      Architecture, Quality of Delivery, Business and IT Process
                      of delivery and Automation of Service Delivery
                      Organization.{" "}
                    </p>

                    <p>
                      One Desk Framework understands customer Need and create
                      inputs to Business one Framework so that Business One
                      Framework and One Desk Framework will connect at a point
                      and start deliver customer needs and improves its Quality
                      and Optimization Day by Day.
                    </p>

                    <p>
                      Integrated Business One Desk – CtrlSwift understands
                      customer Business Needs Better and translates that into
                      technical deliverables and start assigning the tasks
                      automatically to various team integrated in Business one
                      Framework.{" "}
                    </p>

                    <p>
                      CtrlSwift understands customer requirement faster and
                      expectation clearly by collection right set of data and
                      provision the services faster and better.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="row"
              style={{ width: -200, marginLeft: -50, marginRight: -50 }}
            >
              <div className="col-lg-3 col-md-6 single-price">
                <div className="top-part">
                  <h1 className="package-no">01</h1>
                  <h4>CtrlSwift Lite</h4>
                </div>
                <div className="package-list">
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
                    href="./ctrlSwiftLite"
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
                <div className="package-list">
                  <ul>
                    <li>Vendor performance</li>
                    <li>SLA management</li>
                    <li>Escalation management</li>
                    <li>Outage handling</li>
                    <li>Asset & license management</li>
                    <li>Access management</li>
                  </ul>
                </div>
                <div className="bottom-part">
                  <Button
                    className="genric-btn success-border  radius text-uppercase"
                    variant=" "
                    style={{ width: 200 }}
                    href="./ctrlSwiftlite#cs-Enterprise"
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
                <div className="package-list">
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
                    href="./ctrlSwiftlite#cs-Premium"
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
                <div className="package-list">
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
                    href="/ctrlSwiftlite#cs-Ultimate"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div id="partners" >

            <section className="mt-5 justify-content-center ">

              <PartnerComp />

            </section>

          </div>
        </section>

        <Carousel
          style={{ backgroundColor: "#FFFFFF", height: 400, marginTop: -50 }}
        >
          <Carousel.Item>
            <h1 style={{ marginTop: 50 }}>Our Clients</h1>
            <div className="row" style={{ marginTop: 100 }}>
              <a className="col single-img" href="#">
                <img
                  src={backgroundImage11}
                  className="d-block mx-auto"
                  alt="smaple image"
                />
              </a>
              <a className="col single-img" href="#">
                <img
                  src={backgroundImage10}
                  className="d-block mx-auto"
                  alt="smaple image"
                />
              </a>
              <a className="col single-img" href="#">
                <img
                  src={backgroundImage12}
                  className="d-block mx-auto"
                  alt="smaple image"
                />
              </a>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <h1 style={{ marginTop: 50 }}>Our Clients</h1>
            <div className="row" style={{ marginTop: 100 }}>
              <a className="col single-img" href="#">
                <img
                  src={backgroundImage13}
                  className="d-block mx-auto"
                  alt="smaple image"
                />
              </a>
              <a className="col single-img" href="#">
                <img
                  src={backgroundImage14}
                  className="d-block mx-auto"
                  alt="smaple image"
                />
              </a>

              <a className="col single-img" href="#">
                <img
                  src={backgroundImage31}
                  className="d-block mx-auto"
                  alt="smaple image"
                />
              </a>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <h1 style={{ marginTop: 50 }}>Our Clients</h1>
            <div className="row" style={{ marginTop: 100 }}>
              <a className="col single-img" href="#">
                <img
                  src={backgroundImage15}
                  className="d-block mx-auto"
                  alt="smaple image"
                />
              </a>

              <a className="col single-img" href="#">
                <img
                  src={backgroundImage18}
                  className="d-block mx-auto"
                  alt="smaple image"
                />
              </a>

              <a className="col single-img" href="#">
                <img
                  src={backgroundImage17}
                  className="d-block mx-auto"
                  alt="smaple image"
                />
              </a>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <h1 style={{ marginTop: 50 }}>Our Clients</h1>
            <div className="row" style={{ marginTop: 100 }}>
              <a className="col single-img" href="#">
                <img
                  src={backgroundImage19}
                  className="d-block mx-auto"
                  alt="smaple image"
                />
              </a>
              <a className="col single-img" href="#">
                <img
                  src={backgroundImage16}
                  className="d-block mx-auto"
                  alt="smaple image"
                />
              </a>
              <a className="col single-img" href="#">
                <img
                  src={backgroundImage32}
                  className="d-block mx-auto"
                  alt="smaple image"
                />
              </a>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <h1 style={{ marginTop: 50 }}>Our Clients</h1>
            <div className="row" style={{ marginTop: 100 }}>
              <a className="col single-img" href="#">
                <img
                  src={backgroundImage33}
                  className="d-block mx-auto"
                  alt="smaple image"
                />
              </a>
              <a className="col single-img" href="#">
                <img
                  src={backgroundImage34}
                  className="d-block mx-auto"
                  alt="smaple image"
                />
              </a>
              <a className="col single-img" href="#">
                <img
                  src={backgroundImage35}
                  className="d-block mx-auto"
                  alt="smaple image"
                />
              </a>
            </div>
          </Carousel.Item>
        </Carousel>
        <section
          className="callaction-area relative section-gap"
          style={{ marginTop: -130 }}
        >
          <div className="overlay overlay-bg"></div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10" style={{ opacity: 60 }}>
                <span className="head5 font-weight-bold">CtrlSwift</span>
                <p>
                  Balbhas Business sysnomics LLC, 608 Parkaire Crossing
                  Marietta, GA 30068 USA
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}

export default PartnerCard;
