import React, {Suspense } from "react";
import backgroundImage6 from "../../images/WebP/s3.webp";
import backgroundImage7 from "../../images/WebP/s1.webp";
import backgroundImage8 from "../../images/WebP/s4.webp";
import backgroundImage26 from "../../images/b1desk-lite01.jpg";
import { Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { SmallbannerList } from "./action";
import LazyLoad from 'react-lazy-load';

class Smallbanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSuccess: false,
      litePlan: "",
      enterprisePlan: "",
      premiumPlan: "",
      duplicateLitePlan: "",

    };
  }
  componentDidMount() {
    this.props.SmallbannerList();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.isSuccess !== prevProps.isSuccess) {
      if (
        this.props.isSuccess !== undefined &&
        this.props.isSuccess !== null &&
        this.props.isSuccess.litePlan !== undefined
      ) {
        this.setState({
          litePlan: this.props.isSuccess.litePlan,
        });
      }
    }
    if (this.props.isSuccess !== prevProps.isSuccess) {
      if (
        this.props.isSuccess !== undefined &&
        this.props.isSuccess !== null &&
        this.props.isSuccess.enterprisePlan !== undefined
      ) {
        this.setState({
          enterprisePlan: this.props.isSuccess.enterprisePlan,
        });
      }
    }
    if (this.props.isSuccess !== prevProps.isSuccess) {
      if (
        this.props.isSuccess !== undefined &&
        this.props.isSuccess !== null &&
        this.props.isSuccess.premiumPlan !== undefined
      ) {

        this.setState({
          premiumPlan: this.props.isSuccess.premiumPlan,
        });
      }
    }
    if (this.props.isSuccess !== prevProps.isSuccess) {
      if (
        this.props.isSuccess !== undefined &&
        this.props.isSuccess !== null &&
        this.props.isSuccess.duplicateLitePlan !== undefined
      ) {
        this.setState({
          duplicateLitePlan: this.props.isSuccess.duplicateLitePlan,
        });
      }
    }
    console.log(JSON.stringify(this.state.litePlan) + "--" + JSON.stringify(this.state.premiumPlan) + "--" + JSON.stringify(this.state.enterprisePlan) + "---" + JSON.stringify(this.state.duplicateLitePlan));

  }

  redirect =()=>{
    console.log("redirect"+this.props.history);
  }


  render() {

    return (
      <div className="">
        <Suspense fallback={<div style={{ fontSize: "20px", color: "black" }}>Loading...</div>}>

          <section
            className="pricingplans-area pb-100"
            style={{ marginTop: -230 }}
            id="pricingplans"
          >


            <div>
              <Carousel className="view" >
                <Carousel.Item >
                  <div className="container-fluid" id="pricingplans">
                    <div className="row no-padding">
                      <div
                        className="active-speaker-carusel col-lg-6 no-padding img-r"
                        style={{ padding: "0px" }}
                      >
                        <div className="single-speaker item" >
                          <div className="container">
                            <div className="row align-items-center" >
                              <div className="col-md-6 speaker-img no-padding">
                                <LazyLoad>
                                  <img
                                    src={backgroundImage6}
                                    className="col-md-6 speaker-img no-padding"
                                    alt="smaple image"
                                  />
                                </LazyLoad>

                              </div>
                              <div className="col-md-6 speaker-info no-padding">
                                <div className="head6" style={{ textAlign: "left" }}>
                                  CtrlSwift <br />    {"  "}  {this.state.litePlan.plan}
                                </div>
                                <div>
                                  <div style={{ textAlign: "left" }}>
                                    <div className="divider"></div>
                                    <span className="head5"> Pay Per Use</span>
                                    <h4 className="head4" style={{ marginBottom: 12 }}>
                                      {this.state.litePlan.payPerUse}$
                                    </h4>
                                    <p>Close upto 50 Tickets with 0 cost</p>
                                  </div>
                                  <div className="divider"></div>
                                  <div style={{ textAlign: "left" }}>
                                    <span className="head5"> Shared</span>
                                    <h4 className="head4">
                                      {this.state.litePlan.shared}$</h4>
                                    <p>Per ticket/per hour whichever is lesser</p>
                                  </div>
                                  <div className="divider"></div>
                                  <div style={{ textAlign: "left" }}>
                                    <span className="head5">Dedicated</span>

                                    <h4 className="head4">
                                      {this.state.litePlan.dedicated}$
                                    </h4>
                                    <p>Per Hour</p>
                                  </div>
                                  <div className="bottom-part" style={{ textAlign: 'left' }}>
                                    <Button
                                      className="genric-btn primary radius text-uppercase lite-color "
                                      variant=" "
                                      //  href="/ctrlSwiftlite"
                                      onClick={() => { window.location = "/ctrlSwiftlite"; }}
                                    >
                                      Learn More
                                    </Button>
                                  </div>
                                  <div></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="active-speaker-carusel col-lg-6 no-padding img-r"
                        style={{ padding: "0px" }}
                      >
                        <div className="single-speaker item" >
                          <div className="container">
                            <div className="row align-items-center" >
                              <div className="col-md-6 speaker-img no-padding">
                                <LazyLoad >
                                  <img
                                    src={backgroundImage7}
                                    className="col-md-6 speaker-img no-padding"
                                    alt="smaple image"
                                  />
                                </LazyLoad>

                              </div>
                              <div className="col-md-6 speaker-info no-padding">
                                <div className="head6" style={{ textAlign: "left" }}>
                                  CtrlSwift <br />  {this.state.enterprisePlan.plan}
                                </div>
                                <div>
                                  <div style={{ textAlign: "left" }}>
                                    <div className="divider"></div>
                                    <span className="head5"> Pay Per Use</span>
                                    <h4 className="head4" style={{ marginBottom: 12 }}>
                                      {this.state.enterprisePlan.payPerUse}$
                                    </h4>
                                    <p>Close upto 50 Tickets with 0 cost</p>
                                  </div>
                                  <div className="divider"></div>
                                  <div style={{ textAlign: "left" }}>
                                    <span className="head5"> Shared</span>
                                    <h4 className="head4">
                                      {this.state.enterprisePlan.shared}$</h4>
                                    <p>Per ticket/per hour whichever is lesser</p>
                                  </div>
                                  <div className="divider"></div>
                                  <div style={{ textAlign: "left" }}>
                                    <span className="head5">Dedicated</span>

                                    <h4 className="head4">
                                      {this.state.enterprisePlan.dedicated}$
                                    </h4>
                                    <p>Per Hour</p>
                                  </div>
                                  <div className="bottom-part" style={{ textAlign: 'left' }}>
                                    <Button
                                      className="genric-btn primary radius text-uppercase lite-color "
                                      variant=" "
                                      // href="/ctrlSwiftlite"
                                      onClick={() => { window.location = "/ctrlSwiftlite"; }}

                                    >
                                      Learn More
                                    </Button>
                                  </div>
                                  <div></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
                <Carousel.Item >
                  <div className="container-fluid" id="pricingplans">
                    <div className="row no-padding">
                      <div
                        className="active-speaker-carusel col-lg-6 no-padding img-r"
                        style={{ padding: "0px" }}
                      >

                        <div className="single-speaker item"  >
                          <div className="container" >
                            <div className="row align-items-center" >
                              <div className="col-md-6 speaker-img no-padding">
                                <LazyLoad >
                                <img
                                  src={backgroundImage8}
                                  className="col-md-6 speaker-img no-padding"
                                  alt="smaple image"
                                />
                                </LazyLoad>
                              </div>
                              <div className="col-md-6 speaker-info no-padding">
                                <div className="head6" style={{ textAlign: "left" }}>
                                  CtrlSwift <br /> {this.state.premiumPlan.plan}
                                </div>
                                <div>
                                  <div style={{ textAlign: "left" }}>
                                    <div className="divider"></div>
                                    <span className="head5"> Pay Per Use</span>
                                    <h4 className="head4" style={{ marginBottom: 12 }}>
                                      {this.state.premiumPlan.payPerUse}$
                                    </h4>
                                    <p>Close upto 50 Tickets with 0 cost</p>
                                  </div>
                                  <div className="divider"></div>
                                  <div style={{ textAlign: "left" }}>
                                    <span className="head5"> Shared</span>
                                    <h4 className="head4">
                                      {this.state.premiumPlan.shared}$
                                    </h4>
                                    <p>Per ticket/per hour whichever is lesser</p>
                                  </div>
                                  <div className="divider"></div>
                                  <div style={{ textAlign: "left" }}>
                                    <span className="head5">Dedicated</span>

                                    <h4 className="head4">
                                      {this.state.premiumPlan.dedicated}$
                                    </h4>
                                    <p>Per Hour</p>
                                  </div>
                                  <div className="bottom-part" style={{ textAlign: 'left' }}>
                                    <Button
                                      className="genric-btn primary radius text-uppercase lite-color "
                                      variant=" "
                                      // href="/ctrlSwiftlite"
                                      onClick={() => { window.location = "/ctrlSwiftlite"; }}

                                    >
                                      Learn More
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="active-speaker-carusel col-lg-6 no-padding img-r"
                        style={{ padding: "0px" }}
                      >
                        <div className="single-speaker item" >
                          <div className="container">
                            <div className="row align-items-center" >
                              <div className="col-md-6 speaker-img no-padding">
                              <LazyLoad>
                              <img
                                  src={backgroundImage26}
                                  className="col-md-6 speaker-img no-padding"
                                  alt="smaple image"
                                />
                              </LazyLoad>

                              </div>
                              <div className="col-md-6 speaker-info no-padding">
                                <div className="head6" style={{ textAlign: "left" }}>
                                  CtrlSwift <br /> {this.state.duplicateLitePlan.plan}
                                </div>
                                <div>
                                  <div style={{ textAlign: "left" }}>
                                    <div className="divider"></div>
                                    <span className="head5"> Pay Per Use</span>
                                    <h4 className="head4" style={{ marginBottom: 12 }}>
                                      {this.state.duplicateLitePlan.payPerUse}$
                                    </h4>
                                    <p>Close upto 50 Tickets with 0 cost</p>
                                  </div>
                                  <div className="divider"></div>
                                  <div style={{ textAlign: "left" }}>
                                    <span className="head5"> Shared</span>
                                    <h4 className="head4">
                                      {this.state.duplicateLitePlan.shared}$</h4>
                                    <p>Per ticket/per hour whichever is lesser</p>
                                  </div>
                                  <div className="divider"></div>
                                  <div style={{ textAlign: "left" }}>
                                    <span className="head5">Dedicated</span>

                                    <h4 className="head4">
                                      {this.state.duplicateLitePlan.dedicated}$
                                    </h4>
                                    <p>Per Hour</p>
                                  </div>
                                  <div className="bottom-part" style={{ textAlign: 'left' }}>
                                    <Button
                                      className="genric-btn primary radius text-uppercase lite-color "
                                      variant=" "
                                      // href="/ctrlSwiftlite"
                                      onClick={() => { window.location = "/ctrlSwiftlite"; }}

                                    >
                                      Learn More
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Carousel.Item>



              </Carousel>  </div>




          </section>
        </Suspense>
      </div>
    );
  }
}
Smallbanner.propTypes = {
  SmallbannerList: PropTypes.func,

};
const mapStateToProps = (state) => {
  console.debug(state, 'state');
  return {
    isSuccess: state.smallbannerRerducer.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  SmallbannerList: (state) => dispatch(SmallbannerList(state)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Smallbanner);
