import { PropTypes } from "prop-types";
import React, { Component } from "react";
import {
  Button, Col,
  Form, Modal, Table
} from "react-bootstrap";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Header1 from "../components/header1";
import Sidemenu2 from "../components/Sidemenu2";
import { reqacceptEmp, reqdeleteEmp, requestedSelfEmployee } from "./action";

class selfEmployeeRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      showDetails1: false,
      tableData: [],
      nameDetails: "",
      goForDelete: false,
      goForAccept: false,
    };
  }

  delete = (user) => {
    Swal.fire({
      title: "confirm to delete",
      text: "Are you sure want to delete Employee request?",
      confirmButtonColor: "#3085d6",
      icon: "warning",

      confirmButtonText: "Delete",
    }).then((res) => {
      if (res.value) {
        this.deleteSelfEmp(user);
      } else if (res.dismiss == "cancel") {
        console.log("cancel");
      }
    });
  };

  deleteSelfEmp = (user) => {
    this.setState({ goForDelete: true, status: "deny" });
    console.log(this.state.status);
    this.props.reqdeleteEmp(user.email, this.state.status);
  };
  accept = (user) => {
    Swal.fire({
      title: "confirm to Accept",
      text: "Are you sure want to accept Employee request?",
      confirmButtonColor: "#3085d6",

      confirmButtonText: "Accept",
    }).then((res) => {
      if (res.value) {
        this.acceptSelfEmp(user);
      } else if (res.dismiss == "cancel") {
        console.log("cancel");
      }
    });
  };

  acceptSelfEmp = (user) => {
    this.setState({ goForAccept: true, status: "accept" });
    console.log(this.state.status);
    this.props.reqacceptEmp(user.email, this.state.status);
  };
  clicked1 = (e, partnerEmployeeProfileId) => {
    e.preventDefault();
    this.setState({ showDetails1: true });

    let details = this.props.company.partnerProfiles.find(
      (element) => element.partnerEmployeeProfileId == partnerEmployeeProfileId
    );
    this.setState({ nameDetails: details });
  };
  handleClose1 = () => {
    this.setState({ showDetails1: false });
  };

  componentDidMount() {
    console.log("==========in mount========");
    this.props.requestedSelfEmployee();
    console.log("=============after mount=============");
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("ddddddddddd" + JSON.stringify(this.props.company));
    if (this.props.isSuccess !== prevProps.isSuccess) {
      if (this.state.goForAccept && this.props.isSuccess) {
        Swal.fire({
          title: "Accpted",
          text: this.props.isSuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        window.location.reload();
      }
      this.setState({ goForAccept: false });
    }
    if (this.props.isDeleteSuccess !== prevProps.isDeleteSuccess) {
      if (this.state.goForDelete && this.props.isDeleteSuccess) {
        Swal.fire({
          title: "Deleted",
          text: this.props.isDeleteSuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
      this.setState({ goForDelete: false });
    }
  }

  navigate = (url) => {
    this.props.history.push(url);
  };

  render() {
    return (
      <div>
        <Header1 navigate={(url) => this.navigate("/adminlogin")} />
        <main className="main-content bgc-grey-100">
          <div className="row pl-2">
            <Sidemenu2
              navigate={(url) => this.navigate(url)}
              selected="selfEmployeeRequest"
            />

            <div className="col-md-10">
            <button className="btn btn-primary btn-color-admin admin-logout-header-btn"
              onClick={() => { window.location = "/dashBoard"; }}>Go Back</button>
              <div className="row pt-2">
                <div className="col-12">
                  <div style={{ marginLeft: "50px" }}>
                    <h5 className="acptHeader f700"> Self Employee Request List</h5>
                  </div>

                  <div className="row col-md-12">
                    <div className="col-md-1" />
                    <div className="col-md-10" style={{ marginTop: "25px" }}>
                      <div className="col-md-12 scroll"></div>
                      <Table striped bordered hover>
                        <thead className="thead-light">
                          <tr>
                            <th scope="col" className="acptTh">
                              NAME
                            </th>
                            <th scope="col" className="acptTh">
                              MOBILE NUMBER
                            </th>
                            <th scope="col" className="acptTh">
                              EMAIL
                            </th>
                            <th scope="col" className="acptTh">
                              AADHAR NUMBER
                            </th>
                            <th scope="col" className="acptTh">
                              ACTION
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.company &&
                            this.props.company.partnerProfiles &&
                            this.props.company.partnerProfiles.length > 0 &&
                            this.props.company.partnerProfiles.map(
                              (user, userkey) => (
                                <tr key={userkey}>
                                  <th scope="row">
                                    <Link
                                      onClick={(e) =>
                                        this.clicked1(
                                          e,
                                          user.partnerEmployeeProfileId
                                        )
                                      }
                                    >
                                      {user.firstName}
                                    </Link>
                                  </th>
                                  <td>{user.mobileNumber}</td>
                                  <td>{user.email}</td>
                                  <td>{user.aadharNumber}</td>
                                  <td>
                                    <Button
                                      variant="success"
                                      sm={4}
                                      onClick={() => this.accept(user)}
                                    >
                                      <i>
                                        <BsCheckLg />
                                      </i>
                                    </Button>{" "}
                                    <Button
                                      variant="danger"
                                      onClick={() => this.delete(user)}
                                    >
                                      <BsXLg />
                                    </Button>
                                  </td>
                                </tr>
                              )
                            )}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* <--------------------pop up Modal--------------> */}

        <Modal
          show={this.state.showDetails1}
          onHide={this.handleClose1}
          backdrop={"static"}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h4>Personal Details</h4>{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col} md="4">
                  <Form.Label className="selfEmployeeList" id="asefirstName">
                    First Name
                  </Form.Label>

                  <Form.Control
                    value={this.state.nameDetails.firstName}
                    className="form-control"
                    disabled
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label className="selfEmployeeList">
                    Last Name
                  </Form.Label>

                  <Form.Control
                    value={this.state.nameDetails.lastName}
                    className="form-control"
                    disabled
                    id="aselastName"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label className="selfEmployeeList">Gender</Form.Label>

                  <Form.Control
                    value={this.state.nameDetails.gender}
                    className="form-control"
                    disabled
                    id="asegender"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="4">
                  <Form.Label className="selfEmployeeList">Email</Form.Label>

                  <Form.Control
                    className="form-control"
                    value={this.state.nameDetails.email}
                    disabled
                    id="aseEmail"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label className="selfEmployeeList">Mobile</Form.Label>

                  <Form.Control
                    className="form-control"
                    value={this.state.nameDetails.mobileNumber}
                    disabled
                    id="aseMobile"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label className="selfEmployeeList">
                    Aadhar Number
                  </Form.Label>

                  <Form.Control
                    className="form-control"
                    value={this.state.nameDetails.aadharNumber}
                    disabled
                    id="aseAdharNo"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md="4">
                  <Form.Label className="selfEmployeeList">
                    Pan Card Number
                  </Form.Label>

                  <Form.Control
                    className="form-control"
                    value={this.state.nameDetails.panCardNumber}
                    disabled
                    id="asePanNo"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label className="selfEmployeeList">
                    Qualification
                  </Form.Label>

                  <Form.Control
                    value={this.state.nameDetails.qualification}
                    className="form-control"
                    disabled
                    id="aseQualification"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label className="selfEmployeeList">
                    Specialization
                  </Form.Label>

                  <Form.Control
                    value={this.state.nameDetails.specialization}
                    className="form-control"
                    disabled
                    id="aseSpecialization"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="4">
                  <Form.Label className="selfEmployeeList">City</Form.Label>

                  <Form.Control
                    value={this.state.nameDetails.city}
                    className="form-control"
                    disabled
                    id="aseCity"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label className="selfEmployeeList">State</Form.Label>

                  <Form.Control
                    value={this.state.nameDetails.state}
                    className="form-control"
                    disabled
                    id="aseState"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label className="selfEmployeeList">Pincode</Form.Label>

                  <Form.Control
                    value={this.state.nameDetails.pincode}
                    className="form-control"
                    disabled
                    id="asePincode"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row></Form.Row>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
selfEmployeeRequest.propTypes = {
  requestedSelfEmployee: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    company: state.requestedSelfEmployeereducer.company,
    isSuccess: state.requestedSelfEmployeereducer.isSuccess,
    isDeleteSuccess: state.requestedSelfEmployeereducer.isDeleteSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestedSelfEmployee: () => dispatch(requestedSelfEmployee()),
  reqacceptEmp: (email, status) => dispatch(reqacceptEmp(email, status)),
  reqdeleteEmp: (email, status) => dispatch(reqdeleteEmp(email, status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(selfEmployeeRequest);
