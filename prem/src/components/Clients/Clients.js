import React from "react";
import Carousel from "react-bootstrap/Carousel";
import backgroundImage31 from "../../images/WebP/l.webp";
import backgroundImage32 from "../../images/WebP/r.webp";
import backgroundImage33 from "../../images/WebP/l90.webp";
import backgroundImage34 from "../../images/WebP/l92.webp";
import backgroundImage35 from "../../images/WebP/l000.webp";
import backgroundImage10 from "../../images/WebP/l1.webp";
import backgroundImage11 from "../../images/WebP/l2.webp";
import backgroundImage12 from "../../images/WebP/l3.webp";
import backgroundImage13 from "../../images/WebP/l4.webp";
import backgroundImage14 from "../../images/WebP/l5.webp";
import backgroundImage15 from "../../images/WebP/l6.webp";
import backgroundImage16 from "../../images/WebP/l7.webp";
import backgroundImage17 from "../../images/WebP/l8.webp";
import backgroundImage18 from "../../images/WebP/l9.webp";
import backgroundImage19 from "../../images/WebP/l91.webp";

function Clients() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
export default Clients;