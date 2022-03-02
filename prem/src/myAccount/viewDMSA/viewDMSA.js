import { PropTypes } from "prop-types";
import { Scrollbars } from "rc-scrollbars";
import React from "react";
import {
  ButtonGroup, ButtonToolbar, Container, Modal, Row
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../components/footer/Footer.js";
import Header from "../../components/header_login/HeaderLogin";
import * as Constants from "../../constants";
import Logo from "../../images/logo.png";
import { requestDmsaAnnexure } from "./action";

class viewDsa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: "",
      model: "",
      page: "1",
    };
  }

  componentDidMount() {
    if (!window.sessionStorage.getItem(Constants.ACCESS_EMAIL)) {
      return Swal.fire({
        title: "",
        text: "Please login before proceeding",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      }).then((res) => {
        if (res.value) {
          window.sessionStorage.setItem(Constants.REGISTERED, true);
          this.props.history.push("/");
        }
      });
    }

    console.log("done");
    //  this.props.dmsaAnnexure();
  }
  navigate = (url) => {
    this.props.history.push(url);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!window.sessionStorage.getItem(Constants.ACCESS_EMAIL)) {
      return Swal.fire({
        title: "",
        text: "Please login before proceeding",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      }).then((res) => {
        if (res.value) {
          window.sessionStorage.setItem(Constants.REGISTERED, true);
          this.props.history.push("/");
        }
      });
    }

    console.log("page number \n" + this.state.page);
    if (this.props.dmasAnnexure !== prevProps.dmasAnnexure) {
      if (this.props.dmasAnnexure.success === true) {
        this.setState({
          details: this.props.dmasAnnexure.dmsaRequests,
        });
      } else if (this.props.dmasAnnexure.success === false) {
        if (
          this.props.dmasAnnexure.message ===
          "There is no plan available. Please customize your plan."
        ) {
          Swal.fire({
            title: "",
            text: this.props.dmasAnnexure.message,
            type: "warning",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            closeOnConfirm: true,
            confirmButtonText: "OK",
          }).then((res) => {
            if (res.value) {
              window.location.href = "/customizePage";
            }
          });
        } else {
          Swal.fire({
            title: "",
            text: this.props.dmasAnnexure.message,
            type: "warning",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            closeOnConfirm: true,
            confirmButtonText: "OK",
          });
        }
      }
    }
  }

  model = (e) => {
    console.log("e \n" + e);
    this.setState({
      model: e,
    });
  };

  handleCloseLite = () => {
    this.setState({
      model: "",
    });
  };

  page = (e) => {
    console.log("e \n" + JSON.stringify(e));
    this.setState({
      page: e.value,
    });
  };
  alert = (e) => {
    console.log(
      e.name + "\n" + this.state.isAdmin + "\n" + this.state.isPlanOrdered
    );
    this.props.history.push("/" + e.name);

  };
  render() {
    return (
      <div>
        <Header navigate={(url) => this.navigate("/")} />
        <section
          className="relative banner-area-inner21"
          style={{ paddingTop: "200px", textAlign: "center" }}
        >
          <div className="overlay overlay-bg overlay-bg-blk"></div>
          <div className="container">
            <div className="row height align-items-center justify-content-center">
              <div className="col-lg-10">
                <div className="generic-banner-content">
                  <h2 className="head2-inner">One Process - One Tool</h2>
                  <p className="text-white" style={{ opacity: 0.5 }}>
                  CtrlSwiftTM comprises of a robust maturity assessment
                    methodology and transformation cookbooks to progressively
                    drive the Service Desk transformation to the desired
                    end-state.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <br />
        <Container>
        <Row className="col-md-12">
        <div className="col-md-12 " >
              <div className="d-flex justify-content-center">

              <ButtonToolbar
                aria-label="Toolbar with button groups"
                style={{ marginBottom: 20, marginLeft: 70 }}
              ><ButtonGroup className="mr-2">
                  <button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    to="./userDashboard"
                    onClick={(e) => this.alert({ name: "userDashboard" })}
                    id="cs-ud-userDashboard"
                  >
                    Dashboard
                  </button>{" "}
              </ButtonGroup>
                <ButtonGroup className="mr-2">

                  <button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    onClick={(e) => this.alert({ name: "editProfile" })}
                    id="cs-us-editProfile"
                  >
                    Edit Profile
                  </button>{" "}
                </ButtonGroup>
                <ButtonGroup className="mr-2">
                  <button
                    onClick={(e) => this.alert({ name: "viewInvoice" })}
                    className="genric-btn primary radius text-uppercase"
                    variant=""
                    id="cs-us-viewInvoice"
                  >
                    View Invoice
                  </button>
                </ButtonGroup>
                <ButtonGroup className="mr-2">
                  <button
                    onClick={(e) => this.alert({ name: "planDetailsList" })}
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    id="cs-us-planDetailsList"
                  >
                    Plan Details
                  </button>{" "}
                </ButtonGroup>
                <ButtonGroup className="mr-2">
                  <button
                    onClick={(e) => this.alert({ name: "viewDMSA" })}
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    id="cs-us-viewDMSA"
                  >
                    View DMSA
                  </button>{" "}
                </ButtonGroup>
              </ButtonToolbar>
          </div></div>
        </Row>
        <main className="main-content bgc-grey-100">
          <div id="mainContent">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-1" />
                  <div className="col-md-10">
                    <div
                      className="bgc-white p-20"
                      style={{ paddingBottom: "0px" }}
                    >
                      <div className="row">
                        {/* <h4 className="c-grey-900 col-md-6">Instructions of MSA contents are present here</h4> */}
                      </div>
                      <br />
                      <div className="mT-3">
                        <form method="POST">
                          <div className="form-group col-md-12">
                            <div className="col-md-1" />
                            <div
                              className=" col-md-10"
                              style={{
                                borderBottomStyle: "initial",
                                marginLeft: "8%",
                              }}
                            >
                              <div className="form-group bgc-white p-40 bd modelcontent">
                                {/* <Scrollbars style={{ maxWidth: "100%", height: 600 }}> */}
                                {/* <div className="col-md-1"/> */}
                                <p
                                  style={{
                                    fontSize: "12",
                                    fontWeight: "normal",
                                  }}
                                >
                                  <div>
                                    <div className="text-center">
                                      <h3> SERVICE AGREEMENT</h3>
                                    </div>
                                    <br />
                                    <div className="text-center">
                                    <img src={Logo} alt="CtrlSwift" className="logo_width" />
                                    </div>
                                    <br />
                                    <p
                                      style={{
                                        fontSize: "12",
                                        fontWeight: "normal",
                                      }}
                                      align="justify"
                                    >
                                      <span
                                        style={{
                                          fontSize: "14",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        1. Standard of Service:
                                      </span>{" "}
                                      Balbhas shall at all times ensure that the
                                      Services are performed with due diligence
                                      and using generally accepted industry
                                      standards and practices.
                                      <br />
                                      <span
                                        style={{
                                          fontSize: "14",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        2. Scope:
                                      </span>{" "}
                                      Balbhas shall carry out the Services in
                                      accordance with the deliverables and
                                      specifications set out in{" "}
                                      <span
                                        style={{
                                          fontSize: "14",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Annexures
                                      </span>
                                      .<br />
                                      <span
                                        style={{
                                          fontSize: "14",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        3. Term of Agreement:
                                      </span>{" "}
                                      Effective term of the agreement will be as
                                      per the period mentioned in{" "}
                                      <span
                                        style={{
                                          fontSize: "14",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        respective Annexure (1Year){" "}
                                      </span>
                                      under this agreement.
                                      <br />
                                      <span
                                        style={{
                                          fontSize: "14",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        4. Personnel:
                                      </span>{" "}
                                      Balbhas shall assign appropriately
                                      qualified and competent employees or
                                      consultants to perform the Services.
                                      Balbhas shall ensure that there is
                                      continuity in the employees and
                                      consultants assigned to perform the
                                      Services so as to ensure no disruption or
                                      delay in the performance of the Services
                                      or inconvenience to the Client.
                                      <br />
                                      On Client providing notice for replacement
                                      of personnel, Balbhas shall replace the
                                      personnel with a competent personnel to
                                      the satisfaction of the client, within 30
                                      days of such notice.
                                      <br />
                                      <span
                                        style={{
                                          fontSize: "14",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        5.
                                      </span>{" "}
                                      Balbhas will ensure that their employees
                                      on this project will be covered under the
                                      applicable statutory schemes, like ESI,
                                      PF.
                                      <br />
                                      <span
                                        style={{
                                          fontSize: "14",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        6.
                                      </span>{" "}
                                      Balbhas shall ensure that their engineers
                                      carry out the assignment in accordance
                                      with suitable business and professional
                                      etiquette. Balbhas shall choose the
                                      personnel for the assignment after
                                      consultation with the Client and shall be
                                      responsible for ensuring that all aspects
                                      of the assignment are carried out within
                                      the framework of this agreement.
                                      <br />
                                      <span
                                        style={{
                                          fontSize: "14",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        7. Payment:{" "}
                                      </span>
                                      The amounts and terms as mentioned in
                                      Annexure B of this agreement will be paid
                                      by Client immediately against submission
                                      of the invoice by Balbhas. Payment shall
                                      be made within 30 days from the date of
                                      Invoice.
                                      <br />
                                      <span
                                        style={{
                                          fontSize: "14",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        8. Assignment:
                                      </span>{" "}
                                      Balbhas may not assign or sub-contract any
                                      of its rights or obligations under this
                                      Agreement to a sub-contractor, but only
                                      with the Client’s prior written consent. A
                                      person who is not a party to this
                                      Agreement has no right under the Contracts
                                      (Rights of Third Parties) Act 2001 to
                                      enforce any term of this Agreement.
                                      <br />
                                    </p>{" "}
                                  </div>

                                  <div>
                                    {" "}
                                    <p
                                      style={{
                                        fontSize: "12",
                                        fontWeight: "normal",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontSize: "14",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        9. Intellectual Property:
                                      </span>{" "}
                                      Balbhas and Client mutually agree and
                                      warrant that any product or service
                                      provided to each other pursuant tthis
                                      Agreement and the use of the same by
                                      either party shall not result in an
                                      infringement of any laws including the
                                      violation of any intellectual property.
                                      <br />
                                      <span
                                        style={{
                                          fontSize: "14",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        10. Service Level Guarantee:
                                      </span>{" "}
                                      Balbhas shall ensure that all calls are
                                      attended to and the problem rectified
                                      based on service level agreed in Annexure
                                      A of this Agreement.
                                      <br />
                                      <span
                                        style={{
                                          fontSize: "14",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        11. Confidentiality:{" "}
                                      </span>
                                      Any information that is disclosed to
                                      Balbhas by the Client pursuant to this
                                      Agreement and is confidential to Client
                                      shall be marked accordingly. Balbhas will
                                      instruct its personnel to keep such
                                      information confidential, using the same
                                      care and discretion with regard to the
                                      identified information as they use with
                                      information which Balbhas designates as
                                      confidential.
                                      <br />
                                      <span
                                        style={{
                                          fontSize: "14",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        12. Termination:
                                      </span>{" "}
                                      This Agreement may be terminated
                                      immediately by the Client giving written
                                      notice in the event of a breach of this
                                      Agreement by Balbhas or if Balbhas should
                                      become insolvent or enters into
                                      liquidation, whether compulsory or
                                      voluntary. In addition, the Client may by
                                      giving sixty (60) days’ prior written
                                      notice to Balbhas terminate this
                                      Agreement. Client agrees to pay Balbhas
                                      any pending payments for services already
                                      delivered prior to the termination and for
                                      all services performed through the date of
                                      cancellation.
                                      <br />
                                      <span
                                        style={{
                                          fontSize: "14",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        13. Indemnity:
                                      </span>{" "}
                                      Both parties agree to indemnify each other
                                      against breach of contract or any claim
                                      asserted against either party - for any
                                      infringement of any Intellectual Property
                                      Rights including patents, copyright,
                                      trademark, trade secrets, industrial
                                      design rights or other proprietary rights
                                      arising from use of Equipment or any part
                                      thereof pursuant to this Agreement - by
                                      any third party; provided either party
                                      agrees to notify the other party promptly
                                      of any such claim and provides the
                                      required authority and necessary
                                      information and assistance to investigate
                                      and defend, at their own expense, all
                                      claims asserted against that party as
                                      cited above.
                                      <br />
                                      <span
                                        style={{
                                          fontSize: "14",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        14. Limitation of Liability (Mutual):
                                      </span>{" "}
                                      Under no circumstances shall the liability
                                      of Balbhas / Client, regardless of the
                                      nature of claim whether in contract, tort,
                                      strict liability or any other theory of
                                      liability, exceed the lesser of: a) actual
                                      damages or loss assessed by the arbitrator
                                      or any other dispute resolution mechanism
                                      adopted by the parties under this
                                      Agreement or b) fee received under this
                                      Agreement.
                                      <br />
                                      <span
                                        style={{
                                          fontSize: "14",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        15. Waiver:
                                      </span>{" "}
                                      Failure or delay on the part of either
                                      party to exercise any right or remedy
                                      (whether single or partial) under this
                                      Agreement shall not be construed or
                                      operated as a waiver of such right or
                                      remedy or a waiver of such right to
                                      subsequently enforce such right or remedy.
                                      <br />
                                      <span
                                        style={{
                                          fontSize: "14",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        16. Arbitration & Governing Laws:
                                      </span>{" "}
                                      This Agreement is made under and shall be
                                      construed in accordance with the laws of
                                      India. Any dispute arising out of or in
                                      connection with this Agreement shall be
                                      resolved by arbitration in accordance with
                                      the Arbitration and Conciliation Act, 1996
                                      and the Arbitrators shall be appointed by
                                      both parties and the place of Arbitration
                                      will be Chennai, India. In case of dispute
                                      not being resolved by Arbitration, it
                                      shall be referred to courts of competent
                                      jurisdiction and the place of such
                                      jurisdiction shall be Chennai, India.
                                      <br />
                                    </p>
                                  </div>
                                  <div>
                                    {" "}
                                    <p
                                      style={{
                                        fontSize: "12",
                                        fontWeight: "normal",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontSize: "14",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        17. Non Solicitation (Mutual):
                                      </span>{" "}
                                      Except as otherwise expressly agreed to by
                                      Balbhas/Client in writing, during the term
                                      of this Agreement and for a period of one
                                      (1) year following its termination or
                                      expiration, Balbhas/Client agrees not to
                                      directly or indirectly or through third
                                      parties solicit or hire for employment any
                                      of Balbhas’s/Client’s current or previous
                                      employees (unless a period of twelve
                                      months has elapsed from the last date that
                                      the employee was employed by
                                      Balbhas/Client) or prospective employee
                                      profiles forwarded by Balbhas.
                                      <br />
                                      <span
                                        style={{
                                          fontSize: "14",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        18. Force Majeure:
                                      </span>{" "}
                                      Balbhas shall not be considered in default
                                      of its obligations if performance of such
                                      obligations is prevented or delayed by
                                      acts of God or government, war, riots,
                                      civil disorder, failure or delay of
                                      transportation, or such other causes which
                                      are beyond Balbhas’s control.
                                      <br />
                                      <span
                                        style={{
                                          fontSize: "12",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        19. Entire Agreement:
                                      </span>{" "}
                                      This Agreement, including the Annexures
                                      attached hereto, sets forth the entire
                                      Agreement and understanding of the parties
                                      with respect to the subject matter hereof,
                                      and supersedes all prior oral and written
                                      agreements, understandings,
                                      representations, conditions and all other
                                      communications relating thereto.
                                      <br />
                                      <span
                                        style={{
                                          fontSize: "12",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        20. Annexure:
                                      </span>{" "}
                                      <br />
                                      <span
                                        style={{
                                          fontSize: "12",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        a. Annexure A
                                      </span>{" "}
                                      – Escalation Matrix
                                      <br />
                                      <span
                                        style={{
                                          fontSize: "12",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        b. Annexure B{" "}
                                      </span>
                                      – Onsite Resource
                                      <br />
                                      <span
                                        style={{
                                          fontSize: "12",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        c. Annexure C{" "}
                                      </span>
                                      – L1 Server Support
                                      <br />
                                      <span
                                        style={{
                                          fontSize: "14",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Note:
                                      </span>{" "}
                                      Any new profiles addition to the existing
                                      contract will be added as an additional
                                      annexures reference to same MSA with Same
                                      Terms & conditions if it’s notexplicitly
                                      mentioned and MSA is valid, till any one
                                      profile contract is valid.
                                      <br />
                                    </p>
                                    <div className="row tbl-price">
                                      <div className="col-lg-1" />
                                      <div className="table-wrap col-lg-10">
                                        <table className="schdule-table table table-bordered">
                                          <thead className="thead-light">
                                            <tr>
                                              <th
                                                className="head"
                                                scope="col"
                                                style={{
                                                  fontSize: 16,
                                                  fontFamily: "Poppins",
                                                }}
                                              >
                                                Balbhas:
                                              </th>
                                              <th
                                                className="head"
                                                scope="col"
                                                style={{
                                                  fontSize: 16,
                                                  fontFamily: "Poppins",
                                                }}
                                              >
                                                Balbhas Business Sysnomics Pvt
                                                Ltd
                                              </th>
                                              <th
                                                className="head"
                                                scope="col"
                                                style={{
                                                  fontSize: 16,
                                                  fontFamily: "Poppins",
                                                }}
                                              >
                                                Client:
                                              </th>
                                              <th
                                                className="head"
                                                scope="col"
                                                style={{
                                                  fontSize: 16,
                                                  fontFamily: "Poppins",
                                                }}
                                              >
                                                LatentView Analytics Pvt. Ltd.
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <th scope="row">Signature</th>
                                              <td></td>
                                              <td>Signature</td>
                                              <td></td>
                                            </tr>

                                            <tr>
                                              <th scope="row">Name</th>
                                              <td>Mr. Saravanan KP</td>
                                              <td>Name</td>
                                              <td>Mr.Gowdhaman Jothilingam</td>
                                            </tr>

                                            <tr>
                                              <th scope="row">Title</th>
                                              <td>CEO</td>
                                              <td>Title </td>
                                              <td>Senior IT Manager</td>
                                            </tr>

                                            <tr>
                                              <th scope="row">Address</th>
                                              <td>
                                                RMZ Business Millennia, Phase 2,
                                                4B, 6th Floor, #143 MGR Road,
                                                Perungudi, Chennai- 600096
                                              </td>
                                              <td>Address</td>
                                              <td>
                                                LatentView Analytics Pvt. Ltd
                                                5th Floor, Neville Tower, Block
                                                A3, Ramanujan IT City SEZ, Rajiv
                                                Gandhi Salai (OMR), Taramani,
                                                Chennai-600 113, INDIA
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                      <div className="col-lg-1" />
                                    </div>
                                  </div>
                                </p>
                              </div>
                            </div>
                            <div className="col-md-1" />
                          </div>

                        </form>
                        <br />
                      </div>
                    </div>
                    <div className="col-md-1" />
                  </div>{" "}
                </div>{" "}
              </div>
            </div>{" "}
          </div>
        </main>
        <br />

        <Modal
          show={this.state.model === "Annexure A"}
          size="lg"
          dialogClassName="modal-90w"
          onHide={(e) => this.handleCloseLite()}
          backdrop={"static"}
          className="model"
        >
          <Modal.Header closeButton>
            <h5 className="text-center">
              <span>{this.state.model}</span>
            </h5>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group bgc-white p-2 modelcontent">
              {/* <textarea className="form-control" id="exampleFormControlTextarea1" rows="15" disabled="true"> */}
              <Scrollbars style={{ maxWidth: "100%", height: 430 }}>
                <div>
                  <p>
                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                      Annexure A - Contact details and Escalation matrix
                    </span>
                    <br />
                    <br />
                    <span
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        textDecorationLine: "underline",
                      }}
                    >
                      Contact Matrix:
                    </span>{" "}
                    <br />
                    <br />
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                      Level 1:
                    </span>
                    <Link
                      style={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        textDecorationLine: "underline",
                      }}
                    >
                      ServiceDesk@CtrlSwift.com
                    </Link>{" "}
                    <br />
                    <br />
                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                      Level 2: Service Account Manager,
                    </span>
                    <br />
                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                      Gayathiri Balaji
                    </span>
                    <br />
                    <Link
                      style={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        textDecorationLine: "underline",
                      }}
                    >
                      gayathiri.b@CtrlSwift.com
                    </Link>
                    <br />
                    <br />
                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                      Level 3: Service Delivery Head,
                    </span>
                    <br />
                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                      Ramalingam V
                    </span>
                    <br />
                    <Link
                      style={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        textDecorationLine: "underline",
                      }}
                    >
                      ramalingam.v@CtrlSwift.com
                    </Link>
                    <br />
                    <br />
                  </p>
                </div>
                {/* </textarea> */}
              </Scrollbars>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={(e) => this.handleCloseLite()}
              className="buttons"
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.model === "Annexure B"}
          size="lg"
          dialogClassName="modal-90w"
          onHide={(e) => this.handleCloseLite()}
          backdrop={"static"}
          className="model"
        >
          <Modal.Header closeButton>
            <h5 className="text-center">
              <span>{this.state.model}</span>
            </h5>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group bgc-white p-2 modelcontent">
              {/* <textarea className="form-control" id="exampleFormControlTextarea1" rows="15" disabled="true"> */}
              <Scrollbars style={{ maxWidth: "100%", height: 430 }}>
                <div>
                  <p>File will be update soon</p>
                </div>
                {/* </textarea> */}
              </Scrollbars>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={(e) => this.handleCloseLite()}
              className="buttons"
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.model === "Annexure C"}
          size="lg"
          dialogClassName="modal-90w"
          onHide={(e) => this.handleCloseLite()}
          backdrop={"static"}
          className="model"
        >
          <Modal.Header closeButton>
            <h5 className="text-center">
              <span>{this.state.model}</span>
            </h5>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group bgc-white p-2 modelcontent">
              {/* <textarea className="form-control" id="exampleFormControlTextarea1" rows="15" disabled="true"> */}
              <Scrollbars style={{ maxWidth: "100%", height: 430 }}>
                <div>
                  <p>File will be update soon</p>
                </div>
                {/* </textarea> */}
              </Scrollbars>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={(e) => this.handleCloseLite()}
              className="buttons"
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
        </Container>
        <Footer />
      </div>
    );
  }
}

viewDsa.propTypes = {
  requestloadtimezone: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    dmasAnnexure: state.dmasAnnexureReducer.dmasAnnexure,
  };
};

const mapDispatchToProps = (dispatch) => ({
  //requestloadtimezone: timezone => dispatch(requestloadtimezone(timezone)),
  dmsaAnnexure: (state) => dispatch(requestDmsaAnnexure(state)),
  //requestDemo:demo => dispatch(requestDemo(demo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(viewDsa);
