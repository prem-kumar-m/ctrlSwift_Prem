import React from "react";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import backgroundImage from "../../images/hc1.jpg";
import backgroundImage1 from "../../images/hc2.jpg";
import backgroundImage2 from "../../images/hc3.jpg";
import backgroundImage3 from "../../images/hc4.jpg";
import backgroundImage4 from "../../images/hc5.jpg";
import backgroundImage5 from "../../images/hc6.jpg";

function Bannercarousel() {
  return (
    <section style={{ height: window.innerHeight }}>
      <div className="ctrl-carousel-bg" >
        <Carousel className="view" style={{ margin: 0 }}>
          <Carousel.Item >
            <div style={{ height: window.innerHeight, width: window.innerWidth }}
            >
              <Carousel.Caption>
                <div className="cs-carousel-carcontainer">
                  <h6
                    style={{
                      fontWeight: 500,
                      fontFamily: "Poppins,sans-serif",
                      textTransform: "uppercase"
                    }}
                    className="lh-sm"
                  >
                    IT "OPS" Automation Platform
                  </h6>
                  <br />
                  <p className="lh-sm">
                    CtrlSwift = Services including tools, people and Improvement
                    <br />
                    <br />
                    <span className="lh-sm">

                      “Multiple Technology & Services - One Services Partner to
                      support”
                    </span>
                  </p>
                  <Row>
                    <Col>
                      <Button >Get Started</Button>

                    </Col>
                  </Row>
                </div>
                <div className="cs-carousel-carcontainer-right">
                  <div className="ctr-gallery">
                    <div className="ctrl-box">
                      <div className="ctrl-info">
                        <img src={backgroundImage} alt="ctrl-banner-img" />
                      </div>
                      <div className="ctrl-info1">
                        <img src={backgroundImage1} alt="ctrl-banner-img" />
                        <br />
                        <img src={backgroundImage2} alt="ctrl-banner-img" />
                      </div>
                    </div>
                  </div>
                </div>

              </Carousel.Caption>
            </div>
          </Carousel.Item>
          <Carousel.Item >
            <div style={{ height: window.innerHeight, width: window.innerWidth }}
            >
              <Carousel.Caption>
                <div className="cs-carousel-carcontainer">
                  <h6
                    style={{
                      fontWeight: 500,
                      fontFamily: "Poppins,sans-serif",
                      textTransform: "uppercase"
                    }}
                    className="lh-sm"
                  >
                    BEGINING OF IT SERVICES REVOLUTION
                  </h6>
                  <br />
                  <p className="lh-sm">
                    First Pay Per Use IT Services Commercial Model
                    <br />
                    <br />
                    <span className="lh-sm">

                      “Choose your requirement Similar to your Pizza Toppings
                      and get ready with your Business Applications matter of
                      time”
                    </span>
                  </p>
                  <Row>
                    <Col>
                      <Button >Get Started</Button>

                    </Col>
                  </Row>
                </div>
                <div className="cs-carousel-carcontainer-right">
                  <div className="ctr-gallery-bg-2">
                    <div className="ctrl-box">
                      <div className="ctrl-info-bg-2">
                        <img src={backgroundImage3} alt="ctrl-banner-img" />
                      </div>
                    </div>
                  </div>
                </div>

              </Carousel.Caption>
            </div>
          </Carousel.Item>
          <Carousel.Item >
            <div style={{ height: window.innerHeight, width: window.innerWidth }}
            >
              <Carousel.Caption>
                <div className="cs-carousel-carcontainer">
                  <h6
                    style={{
                      fontWeight: 500,
                      fontFamily: "Poppins,sans-serif",
                      textTransform: "uppercase"
                    }}
                    className="lh-sm"
                  >
                    NEXTGEN IT OPS INDEPENDENT SYSTEM
                  </h6>
                  <br />
                  <p className="lh-sm">
                    Free from People dependency to Business Dependent System
                    <br />
                    <br />
                    <span className="lh-sm">

                      “Flexible Delivery model of any support window – Pay per
                      use – Optimized Fixed Contract”
                    </span>
                  </p>
                  <Row>
                    <Col>
                      <Button >Get Started</Button>

                    </Col>
                  </Row>
                </div>
                <div className="cs-carousel-carcontainer-right">
                  <div className="ctr-gallery">
                    <div className="ctrl-box">
                      <div className="ctrl-info">
                        <img src={backgroundImage4} alt="ctrl-banner-img" />
                      </div>
                      <div className="ctrl-info2">
                        <img src={backgroundImage5} alt="ctrl-banner-img" />
                      </div>
                    </div>
                  </div>
                </div>

              </Carousel.Caption>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </section>
  );
}
export default Bannercarousel;