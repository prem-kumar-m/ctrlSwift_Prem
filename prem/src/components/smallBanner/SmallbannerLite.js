import { PropTypes } from "prop-types";
import React, { Suspense } from "react";
import { Button, Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { connect } from "react-redux";
import liteLogo from "../../images/lite_logo.png";
import enterprise from "../../images/enterprise_logo.png";
import premium from "../../images/premium_logo.png";
import { SmallbannerList } from "./action";


class SmallbannerLite extends React.Component {
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

  redirect = () => {
    console.log("redirect" + this.props.history);
  }


  render() {

    return (
      <div className="">
        <Suspense fallback={<div style={{ fontSize: "20px", color: "black" }}>Loading...</div>}>

          <section
            className="pricingplans-area pb-100"
            id="pricingplans"
          >


            <div className="container">
              <br />
              <Row>
                <Col>
                  <Card className="shadow cardhover">
                    <Card.Header>
                      <Card.Title><p className="f600 fz-30"> {this.state.litePlan.plan}{"  "}
                          <img src={liteLogo} alt="lite" draggable="false" width={"12%"}/></p>

                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <ListGroup className="list-group-flush">
                        <ListGroupItem>
                          <Card.Title>Pay Per Use</Card.Title>
                          <h3 className="f700" id="rp-data1"> ${this.state.litePlan.payPerUse}</h3>
                          <Card.Text>Close upto 50 Tickets with 0 cost</Card.Text>
                        </ListGroupItem>
                        <span className="border-bottom"></span>
                        <ListGroupItem>
                          <Card.Title>Shared</Card.Title>
                          <h3 className="f700" id="rp-data1">${this.state.litePlan.shared}</h3>
                          <Card.Text>Per ticket/per hour whichever is lesser</Card.Text>
                        </ListGroupItem>
                        <span className="border-bottom"></span>
                        <ListGroupItem>
                          <Card.Title>Dedicated</Card.Title>
                          <h3 className="f700" id="rp-data1"> ${this.state.litePlan.dedicated}</h3>
                          <Card.Text>Per Hour</Card.Text>
                        </ListGroupItem>
                      </ListGroup>
                      <div className="hr"></div>

                    </Card.Body>
                    <Card.Footer>
                      <Button
                        className="genric-btn primary radius text-uppercase lite-color float-right "
                        variant=" "
                        onClick={() => { window.location = "/ctrlSwiftlite"; }}
                      >
                        Learn More
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col>
                <Card className="shadow cardhover">
                    <Card.Header>
                      <Card.Title><p className="f600 fz-30"> {this.state.enterprisePlan.plan}{"  "}
                          <img src={enterprise} alt="lite" draggable="false" width={"12%"}/></p>

                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <ListGroup className="list-group-flush">
                        <ListGroupItem>
                          <Card.Title>Pay Per Use</Card.Title>
                          <h3 className="f700" id="rp-data1"> $ {this.state.enterprisePlan.payPerUse}</h3>
                          <Card.Text>Close upto 50 Tickets with 0 cost</Card.Text>
                        </ListGroupItem>
                        <span className="border-bottom"></span>
                        <ListGroupItem>
                          <Card.Title>Shared</Card.Title>
                          <h3 className="f700" id="rp-data1">${this.state.enterprisePlan.shared}</h3>
                          <Card.Text>Per ticket/per hour whichever is lesser</Card.Text>
                        </ListGroupItem>
                        <span className="border-bottom"></span>
                        <ListGroupItem>
                          <Card.Title>Dedicated</Card.Title>
                          <h3 className="f700" id="rp-data1"> ${this.state.enterprisePlan.dedicated}</h3>
                          <Card.Text>Per Hour</Card.Text>
                        </ListGroupItem>
                      </ListGroup>
                    </Card.Body>
                    <Card.Footer>
                      <Button
                        className="genric-btn primary radius text-uppercase lite-color float-right "
                        variant=" "
                        onClick={() => { window.location = "/ctrlSwiftlite"; }}
                      >
                        Learn More
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col>
                <Card className="shadow cardhover">
                    <Card.Header>
                      <Card.Title><p className="f600 fz-30"> {this.state.premiumPlan.plan}{"  "}
                          <img src={premium} alt="lite" draggable="false" width={"12%"}/></p>

                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <ListGroup className="list-group-flush">
                        <ListGroupItem>
                          <Card.Title>Pay Per Use</Card.Title>
                          <h3 className="f700" id="rp-data1"> ${this.state.premiumPlan.payPerUse}</h3>
                          <Card.Text>Close upto 50 Tickets with 0 cost</Card.Text>
                        </ListGroupItem>
                        <span className="border-bottom"></span>
                        <ListGroupItem>
                          <Card.Title>Shared</Card.Title>
                          <h3 className="f700" id="rp-data1">${this.state.premiumPlan.shared}</h3>
                          <Card.Text>Per ticket/per hour whichever is lesser</Card.Text>
                        </ListGroupItem>
                        <span className="border-bottom"></span>
                        <ListGroupItem>
                          <Card.Title>Dedicated</Card.Title>
                          <h3 className="f700" id="rp-data1"> ${this.state.premiumPlan.dedicated}</h3>
                          <Card.Text>Per Hour</Card.Text>
                        </ListGroupItem>
                      </ListGroup>
                    </Card.Body>
                    <Card.Footer>
                      <Button
                        className="genric-btn primary radius text-uppercase lite-color float-right "
                        variant=" "
                        onClick={() => { window.location = "/ctrlSwiftlite"; }}
                      >
                        Learn More
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            </div>




          </section>
        </Suspense>
      </div>
    );
  }
}
SmallbannerLite.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SmallbannerLite);
