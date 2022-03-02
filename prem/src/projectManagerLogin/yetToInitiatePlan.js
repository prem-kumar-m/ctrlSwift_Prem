import _ from "lodash";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { Col, Container, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import Select from "react-select";
import Swal from "sweetalert2";
import Footer from "../components/footer";
import Header1 from "../components/header1";
import Loader from "../components/loading";
import {
  getAccountName,
  getSiteName, planDetailsRequest, requestToActivatePlanByProjectManage
} from "./action";

class yetToInitiatePlane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customizeDetails: "",
      planList: [],
      name: "",
      customerId: "",
      show: false,
      isLoading: false,
      planDetails: "",
      showPlanDetailsModeal: false,
      accountName: "",
      siteName: "",
      accountNameOption: [{ label: "Loading Account Name...", value: 1 }],
      siteNameOption: [{ label: "Loading Site Name...", value: 1 }],
      plan: "",
      token: "",
      activedate: true,
      activeday: '',
    };
  }
  componentDidMount() {

    var today = new Date();
    var year = today.getFullYear();
    const mes = today.toLocaleString('default', { month: 'short' });
    var dia = today.getDate();
    var fecha = dia + "-" + mes + "-" + year;
    this.props.planDetails();
    this.setState({
      isLoading: true,
      activeday: fecha
    });

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.state.activeday);
    console.log(
      this.state.accountName +
      "\n" +
      JSON.stringify(this.state.accountNameOption)
    );
    console.log(this.props.planList);

    if (this.props.planList !== prevProps.planList) {
      this.setState({
        isLoading: false,
      });
      if (this.props.planList.success) {
        this.setState({
          planList: this.props.planList.plansList,
          show: true,
          isLoading: false,
        });
      } else {
        Swal.fire({
          title: "",
          text: this.props.planList.message,
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            window.location.reload();
          }
        });
      }

    }


    if (this.props.accountName !== prevProps.accountName) {
      if (this.props.accountName.success === true) {
        this.setState({
          accountNameOption: this.props.accountName.accounts.map(
            (accountName) => {
              return { label: accountName, value: accountName };
            }
          ),
        });
      }
    }

    if (this.props.planActivateStaus !== prevProps.planActivateStaus) {
      if (this.props.planActivateStaus.success === true) {
        Swal.fire({
          title: "Success",
          text: "Plan Activation Request Is Completed Successfully",
          icon: "info",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            window.location.reload();
          }
        });
        this.handleClose();
        // window.location.reload();
      }
    }

    if (this.props.siteName !== prevProps.siteName) {
      if (this.props.siteName.success === true) {
        console.log(this.props.siteName);
        this.setState({
          siteNameOption: this.props.siteName.sites.map((salesperson) => {
            return { label: salesperson, value: salesperson };
          }),
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
  navigate = (url) => {
    this.props.history.push(url);
  };

  yetToInitiatePlane = (row) => {
    console.log(JSON.stringify(row));
    this.setState({
      planDetails: row,
      showPlanDetailsModeal: true,
      token: row.token,
      plan: row.plan,
      customerId: row.customerId,
    });
    let customerId = row.customerId;
    console.log(row.customerId);
    this.props.getAccountName(customerId);
  };

  handleClose = () => {
    this.setState({
      accountNameOption: [{ label: "Loading Account Name...", value: 1 }],
      siteNameOption: [{ label: "Loading Site Name...", value: 1 }],
      showPlanDetailsModeal: false,
      accountName: "",
      siteName: "",
      token: "",
      plan: "",
      customerId: "",
    });
  };

  handleAccountChange = (selectedOption) => {
    this.setState({ accountName: selectedOption.label });
    console.log("selected Showroom is " + selectedOption.label);
    this.props.getSiteName(selectedOption.label, this.state.customerId);
  };

  handleSiteChange = (selectedOption) => {
    this.setState({ siteName: selectedOption.label });
    console.log("selected Showroom is " + selectedOption.label);
    //this.props.getSiteName(selectedOption.label);
  };

  activatePlanrequest = () => {
    //this.handleClose();
    this.setState({
      active: true,
    });
    if (
      this.state.token &&
      this.state.plan &&
      this.state.customerId &&
      this.state.accountName &&
      this.state.siteName
    ) {
      const requestActivatePlan = {
        token: this.state.token,
        plan: this.state.plan,
        customerId: this.state.customerId,
        account: this.state.accountName,
        site: this.state.siteName,
      };
      this.props.requestToActivatePlanByProjectManage(requestActivatePlan);
    }
  };

  render() {
    const { accountName, siteName, activeday } = this.state;

    return (
      <div className="page-container" style={{ paddingLeft: "0px" }}>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div>
            <Header1
              navigate={(url) => this.navigate("/pmlogin")}
            />
            <main className="main-content bgc-grey-100">
              <div id="mainContent">
                <div id="mainContent">
                  <div className="row">
                    <div className="col-md-12 ">
                      <div className="col-md-12 bgc-white bd bdrs-2 p-20">
                        <div className="row">
                          <h2 className="c-grey-900 col-md-7">Plan details</h2>
                        </div>
                        <div
                          className=" scroll"
                          style={{ height: 500, width: "auto" }}
                        >
                          <table
                            className="table table-hover "
                            style={{ width: "100%", textAlign: "left" }}
                          >
                            <thead>
                              <tr>
                                <th scope="col" style={{ fontWeight: "bold" }}>
                                  S.NO
                                </th>
                                <th scope="col" style={{ fontWeight: "bold" }}>
                                  Company Name
                                </th>
                                <th scope="col" style={{ fontWeight: "bold" }}>
                                  Admin Name
                                </th>
                                <th scope="col" style={{ fontWeight: "bold" }}>
                                  Plan
                                </th>
                                <th scope="col" style={{ fontWeight: "bold" }}>
                                  Model
                                </th>
                                <th scope="col" style={{ fontWeight: "bold" }}>
                                  Service Initiation Date
                                </th>
                                <th scope="col" style={{ fontWeight: "bold" }}>
                                  Status
                                </th>
                                <th scope="col" />
                              </tr>
                            </thead>

                            <tbody>
                              {this.state.show
                                ? this.props.planList &&
                                this.props.planList.plansList.length > 0 &&
                                _.orderBy(
                                  this.props.planList.plansList,
                                  ["plan"],
                                  ["ace"]
                                ).map((row, rowkey) => (
                                  <tr key={rowkey}>
                                    <td>{rowkey + 1}</td>
                                    <td>{row.company}</td>
                                    <td>
                                      {row.firstName + " " + row.lastName}
                                    </td>
                                    <td>{row.plan}</td>
                                    <td>{row.model}</td>
                                    <td>{row.initialisationDate}</td>
                                    {row.status == "Yet to initiate" && row.enableButton === true ? (
                                      <td> <button
                                        className="btn btn-color-admin"
                                        style={{width:"100%"}}
                                        onClick={() =>
                                          this.yetToInitiatePlane(row)
                                        }
                                      >
                                        Yet to initiate
                                      </button>
                                      </td>
                                    )
                                      :
                                      (
                                        <td>
                                         <button
                                        className="btn btn-color-admin"
                                        style={{width:"100%"}}
                                        disabled
                                        onClick={() =>
                                          this.yetToInitiatePlane(row)
                                        }
                                      >
                                        {row.status}
                                      </button>





                                        </td>
                                      )}
                                    <td></td>
                                  </tr>
                                ))
                                : null}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <Modal
              show={this.state.showPlanDetailsModeal === true}
              size="lg"
              dialogClassName="modal-90w"
              onHide={(e) => this.handleClose()}
              backdrop={"static"}
              className="model"
            >
              <Modal.Header closeButton>
                <h3 className="text-center">
                  <span>
                    Site Details{" "}
                    <span style={{ fontSize: 15 }}>
                      (Customer ID :{this.state.planDetails.customerId})
                    </span>{" "}
                  </span>
                </h3>
              </Modal.Header>
              <Modal.Body>
                <Container className="form-group bgc-white p-2 modelcontent">
                  <Form>
                    <Form.Group>
                      <Form.Row>
                        <Col md="6">
                          <h5>Account Name</h5>
                          <Select
                            onChange={this.handleAccountChange}
                            isSearchable={true}
                            options={this.state.accountNameOption}
                            value={{ label: accountName, value: accountName }}
                            name={"accountName"}
                          />
                          {this.state.active && !this.state.accountName && (
                            <div style={{ fontSize: 12, color: "red" }}>
                              This field is required
                            </div>
                          )}
                        </Col>
                        <Col md="6">
                          <h5>Site Name :</h5>
                          <Select
                            onChange={this.handleSiteChange}
                            isDisabled={!accountName}
                            isSearchable={true}
                            options={this.state.siteNameOption}
                            value={{ label: siteName, value: siteName }}
                            name={"siteName"}
                          />
                          {this.state.active &&
                            !this.state.siteName &&
                            accountName && (
                              <div style={{ fontSize: 12, color: "red" }}>
                                This field is required
                              </div>
                            )}
                        </Col>
                      </Form.Row>
                    </Form.Group>

                    {/* <Form.Group>
                                        <Form.Row>
                                            <Col md="6">
                                                <h5>Company ID :</h5>
                                                <input className="form-control" value={this.state.planDetails.customerId} ></input>
                                            </Col>
                                        </Form.Row>
                                    </Form.Group> */}
                    <Form.Group>
                      <Form.Row>
                        <Col md="5" />
                        <Col md="2">
                          <button
                            type="button"
                            onClick={(e) => this.activatePlanrequest()}
                            className="btn btn-primary"
                          >
                            Activate
                          </button>
                        </Col>
                        <Col md="5" />
                      </Form.Row>
                    </Form.Group>
                    <hr />

                    <Form.Group>
                      <Form.Row>
                        <h4>Company Details :</h4>
                        <hr />
                      </Form.Row>
                    </Form.Group>
                    <Form.Group>
                      <Form.Row>
                        <Col md="6">
                          <h5>Admin Name :</h5>
                          <input
                            className="form-control"
                            value={
                              this.state.planDetails.firstName +
                              " " +
                              this.state.planDetails.lastName
                            }
                          ></input>
                        </Col>
                        <Col md="6">
                          <h5>Company Name :</h5>
                          <input
                            className="form-control"
                            value={this.state.planDetails.company}
                          ></input>
                        </Col>
                      </Form.Row>
                    </Form.Group>

                    {/* <Form.Group>
                                        <Form.Row>
                                            <Col md="6">
                                                <h5>Comapany ID :</h5>
                                                <input className="form-control" value={this.state.planDetails.customerId} ></input>
                                            </Col>
                                        </Form.Row>
                                    </Form.Group> */}

                    <hr />

                    <Form.Group>
                      <Form.Row>
                        <h4>Plan Details :</h4>
                        <hr />
                      </Form.Row>
                    </Form.Group>

                    <Form.Group>
                      <Form.Row>
                        <Col md="6">
                          <h5>Plan :</h5>
                          <input
                            className="form-control"
                            value={this.state.planDetails.plan}
                          ></input>
                        </Col>
                        <Col md="6">
                          <h5>Model :</h5>
                          <input
                            className="form-control"
                            value={this.state.planDetails.model}
                          ></input>
                        </Col>
                      </Form.Row>
                    </Form.Group>

                    <Form.Group>
                      <Form.Row>
                        <Col md="6">
                          <h5>Contract Duration :</h5>
                          <input
                            className="form-control"
                            value={this.state.planDetails.contractDuration}
                          ></input>
                        </Col>
                        <Col md="6">
                          <h5>Payment Terms :</h5>
                          <input
                            className="form-control"
                            value={this.state.planDetails.paymentTerms}
                          ></input>
                        </Col>
                      </Form.Row>
                    </Form.Group>

                    <Form.Group>
                      <Form.Row>
                        <Col md="6">
                          <h5>status :</h5>
                          <input
                            className="form-control"
                            value={this.state.planDetails.status}
                          ></input>
                        </Col>
                        <Col md="6">
                          <h5>Service Initiation Date :</h5>
                          <input
                            className="form-control"
                            value={this.state.planDetails.initialisationDate}
                          ></input>
                        </Col>
                      </Form.Row>
                    </Form.Group>
                    <hr />
                  </Form>
                </Container>
              </Modal.Body>
              {/* <Modal.Footer>
                            <button type="button" onClick={(e) => this.handleCloseLite()} className="buttons">Submit</button>
                        </Modal.Footer> */}
            </Modal>
            <Footer />
          </div>
        )}
      </div>
    );
  }
}
yetToInitiatePlane.propTypes = {
  //reqloadreguser: PropTypes.func,

  //planDetails: PropTypes.func,
  planList: PropTypes.func,
};

const mapStateToProps = (state) => {
  console.log(JSON.stringify(state.projectManagerLoginreducer.planList));
  return {
    planList: state.projectManagerLoginreducer.planList,
    accountName: state.projectManagerLoginreducer.accountName,
    siteName: state.projectManagerLoginreducer.siteName,
    planActivateStaus: state.projectManagerLoginreducer.planActivateStaus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  planDetails: (id) => dispatch(planDetailsRequest(id)),
  getAccountName: (customerId) => dispatch(getAccountName(customerId)),
  getSiteName: (siteName, customerId) =>
    dispatch(getSiteName(siteName, customerId)),
  requestToActivatePlanByProjectManage: (requestActivatePlan) =>
    dispatch(requestToActivatePlanByProjectManage(requestActivatePlan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(yetToInitiatePlane);
