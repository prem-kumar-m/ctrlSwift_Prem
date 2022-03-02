import React from "react";
import { Carousel } from "react-bootstrap";
import Footer from "../components/footer/Footer";
import PartnerHeader from "../components/partnerHeader";
import backgroundImage11 from "../images/l2.png";
import backgroundImage12 from "../images/l3.png";


class partnerHome extends React.Component {
  render() {
    return (
      <div>
        <div>
          <PartnerHeader />
        </div>

        <div>
          <div>
            <section className="generic-banner relative banner-area-inner2">
              <div className="overlay overlay-bg "></div>
              <div className="container">
                <div className="row height  align-items-center justify-content-center">
                  <div className="col-lg-10">
                    <div className="generic-banner-content">
                      <h2 className="head2-inner">Partners</h2>
                      <p className="text-white" style={{ opacity: 0.5 }}></p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <section>
            <Carousel>
              <Carousel.Item>
                <h1 style={{ marginTop: 50 }}>Our Partners</h1>
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
                      src={backgroundImage12}
                      className="d-block mx-auto"
                      alt="smaple image"
                    />
                  </a>
                </div>
              </Carousel.Item>
            </Carousel>
          </section>
        </div>

        <Footer />
      </div>
    );
  }
}
export default partnerHome;
