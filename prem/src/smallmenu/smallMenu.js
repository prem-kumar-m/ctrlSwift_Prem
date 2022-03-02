import React from "react";
import { Col, Row } from "react-bootstrap";

class smallMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activedata: this.props.message,
            title:""
        };
    }



    componentDidMount() {
        console.log("-------------------------->" + this.state.activedata);
        if (this.props.message) {
            switch (this.props.message) {
                case "General":
                    var active = document.getElementById("General");
                    active.classList.add("active");
                    this.setState({
                        title:"General FAQ",
                    });
                    break;
                case "aboutplatform":
                    var active = document.getElementById("aboutplatform");
                    active.classList.add("active");
                    this.setState({
                        title:"About the platform FAQ",
                    });
                    break;
                case "serviceofferings":
                    var active = document.getElementById("serviceofferings");
                    active.classList.add("active");
                    this.setState({
                        title:"Service Offerings FAQ",
                    });
                    break;
                case "priceplans":
                    var active = document.getElementById("priceplans");
                    active.classList.add("active");
                    this.setState({
                        title:"Price Plans FAQ",
                    });
                    break;
                case "serviceordering":
                    var active = document.getElementById("serviceordering");
                    active.classList.add("active");
                    this.setState({
                        title:"Service Desk Ordering FAQ",
                    });
                    break;
                case "orderprocessing":
                    var active = document.getElementById("orderprocessing");
                    active.classList.add("active");
                    this.setState({
                        title:"Order Processing FAQ",
                    });
                    break;
                case "serviceconfig":
                    var active = document.getElementById("serviceconfig");
                    active.classList.add("active");
                     this.setState({
                        title:"Service Desk Configuration FAQ",
                    });
                    break;
                case "contractrelated":
                    var active = document.getElementById("contractrelated");
                    active.classList.add("active");
                     this.setState({
                        title:"Contract Related FAQ",
                    });
                    break;
                case "invoicerelated":
                    var active = document.getElementById("invoicerelated");
                    active.classList.add("active");
                     this.setState({
                        title:"Invoice Related FAQ",
                    });
                    break;
                case "paymentrelated":
                    var active = document.getElementById("paymentrelated");
                    active.classList.add("active");
                     this.setState({
                        title:"Payment Related FAQ",
                    });
                    break;
                case "servicecharges":
                    var active = document.getElementById("servicecharges");
                    active.classList.add("active");
                     this.setState({
                        title:"Service Charges FAQ",
                    });
                    break;
                case "reportfaq":
                    var active = document.getElementById("reportfaq");
                    active.classList.add("active");
                     this.setState({
                        title:"Report FAQ",
                    });
                    break;
                case "feedback":
                    var active = document.getElementById("feedback");
                    active.classList.add("active");
                     this.setState({
                        title:"Feedback/Suggestions FAQ",
                    });
                    break;
            }
        }

    }
    componentDidUpdate(prevProps) {
        console.log("-------------------------->" + this.props.message);

    }

    render() {
        return (
            <div>
                <div className="container">

                    <div className="row">

                        <div
                            className="col-12"
                            style={{ marginBottom: 30, color: "white", fontWeight: 400 }}
                        >
                            <Row>
                                <Col>
                                    <Row
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontWeight: 400,
                                        }}
                                    >
                                        <p style={{ fontSize: 20, color: "black" }} id="title-data">
                                           {this.state.title}
                                        </p>
                                    </Row>
                                </Col>
                            </Row>
                            <br></br>
                            <div className="topnav" id="myTopnav">
                                <span></span>

                                <a className="cs-link-active" id="General" href="/faq">
                                    General
                                </a>
                                <a className="" id="aboutplatform" href="./aboutplatform">About the platform</a>
                                <a className="" id="serviceofferings" href="/serviceofferings">Service Offerings</a>
                                <a className="" id="priceplans" href="/priceplans">Price Plans</a>
                                <a className="" id="serviceordering" href="/serviceordering">Service Desk Ordering</a>
                                <a className="" id="orderprocessing" href="/orderprocessing">Order Processing</a>
                                <a className="" id="serviceconfig" href="/serviceconfig">Service Desk Configuration</a>

                                <a className="" id="contractrelated" href="/contractrelated">Contract Related</a>
                                <a className="" id="invoicerelated" href="/invoicerelated">Invoice Related</a>
                                <a className="" id="paymentrelated" href="/paymentrelated">Payment Related</a>
                                <a className="" id="servicecharges" href="/servicecharges">Service Changes</a>
                                <a className="" id="reportfaq" href="/reportfaq">Reports</a>
                                <a className="" id="feedback" href="/feedback">Feedback/Suggestions</a>
                                <a
                                    href="javascript:void(0);"
                                    className="icon"
                                    onclick="myFunction()"
                                >
                                    <i className="fa fa-bars"></i>
                                </a>
                            </div>
                            <br></br>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default smallMenu;
