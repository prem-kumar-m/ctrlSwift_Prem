import React from "react";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import { FaHandshake, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

class partnerComp extends React.Component {
  render() {
    return (
      <div>
        <div className="container splitScreen bg-light shadow">
          <div className="ruler mt-3 ">
            <div className="ptc1">
              <Card className="card-home shadow">
                <Card.Header><h3 className="font-weight-bold text-dark">Partners
                {"   "}<span className="pt-icon">
                  <FaHandshake />
                </span></h3></Card.Header>
                <Card.Body>
                  <text className="font-weight-bold text-dark" >
                    Partnerships increase your lease of knowledge, expertise,
                    and resources available to make better products
                  </text>


                </Card.Body>
                <Card.Footer className="text-dark text-center">
                  <Button
                    variant=" "
                    className="pt-button"
                    onClick={() => {
                      window.location = "/partnerLogin";
                    }}
                  >
                    Login
                  </Button></Card.Footer>
              </Card>
            </div>

            <div className="ptc3">
              <Card className="card-home shadow">
              <Card.Header><h3 className="font-weight-bold text-dark">Partner's Advantage
              </h3></Card.Header>

                <Card.Body>
                  <div className="unordered-list">
                    <ul>
                      <li >Bridging the Gap in Expertise and Knowledge</li>
                      <li> Moral Support</li>
                    </ul>
                  </div>
                </Card.Body>
                <Card.Footer className="border-0 pt-footer">
                  <Button
                    variant=" "
                    style={{color:"#0950a1",fontSize:"16px",fontWeight:600}}
                    // href="/partnerHome"
                    onClick={() => {
                      window.location = "/partnerHome";
                    }}
                  >
                    Read more..
                  </Button>

                </Card.Footer>
              </Card>
            </div>
          </div>
          {/* <hr className="vertical"></hr> */}

          <div className="ptc2">
            <Card className="card-home-reg shadow">
              <Card.Header className="text-center ">
              <h4 className="pt-heading font-weight-bold">Registration type</h4>
              </Card.Header>

              <Card.Body>
                <div className="row ">
                  <i
                    className="fa fa-user fa-3x pt-icon-reg mx-auto"
                    aria-hidden="true"
                  ></i>
                </div>
                <div className="row ">
                  <Button
                    variant=" "
                    className="pt-regbtn mt-4 mx-auto"
                    onClick={() => {
                      window.location = "/selfEmployedReg";
                    }}
                  >
                    Self Employee Registration
                  </Button>
                </div>
                <div className="row mt-3 ">
                  <i
                    className="fa fa-building fa-3x pt-icon-reg mx-auto"
                    aria-hidden="true"
                  ></i>
                </div>

                <div className="row">
                  <Button
                    variant=" "
                    className="pt-regbtn mt-4 mx-auto"
                    onClick={() => {
                      window.location = "/partnerRegister";
                    }}
                  >
                    Company Registration
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default partnerComp;
