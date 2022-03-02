import { PropTypes } from "prop-types";
import React, { Component } from "react";
import {
  Col,
  Form, Modal, Table
} from "react-bootstrap";
import { connect } from "react-redux";
// import Logo from "../images/logo.png";
import { Link } from "react-router-dom";
import Header1 from "../components/header1";
import Sidemenu2 from "../components/Sidemenu2";
import { acceptedSelfEmployee } from "./action";


class acceptedSelfEmployee1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      tableData: [],
      nameDetails: "",
    };
  }
  show = (e, partnerEmployeeProfileId) => {
    e.preventDefault();
    this.setState({ showDetails: true });
    let details = this.props.company.partnerProfiles.find(
      (element) => element.partnerEmployeeProfileId == partnerEmployeeProfileId
    );
    this.setState({ nameDetails: details });
  };
  handleClose = () => {
    this.setState({ showDetails: false });
  };

  componentDidMount() {
    console.log("==========in mount========");
    this.props.acceptedSelfEmployee();
    console.log("=============after mount=============");
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

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
              selected="acceptedSelfEmployee1"
            />

            <div className="col-md-10">
            <button className="btn btn-primary btn-color-admin admin-logout-header-btn"
              onClick={() => { window.location = "/dashBoard"; }}>Go Back</button>
              <div className="row pt-2">
                <div className="col-12">
                  <div style={{ marginLeft: "50px" }}>
                    <h5 className="acptHeader f700"> Self Employee List</h5>
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
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.company &&
                            this.props.company.partnerProfiles &&
                            this.props.company.partnerProfiles.length > 0 &&
                            this.props.company.partnerProfiles.map(
                              (user, userkey) => (
                                <tr key={userkey}>
                                  <td>
                                    <Link
                                      onClick={(e) =>
                                        this.show(
                                          e,
                                          user.partnerEmployeeProfileId
                                        )
                                      }
                                    >
                                      {user.firstName}
                                    </Link>
                                  </td>
                                  <td>{user.mobileNumber}</td>
                                  <td>{user.email}</td>
                                  <td>{user.aadharNumber}</td>
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
        <Modal
          show={this.state.showDetails}
          onHide={this.handleClose}
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

acceptedSelfEmployee1.propTypes = {
  acceptedSelfEmployee: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    company: state.acceptedSelfEmployeereducer.company,
  };
};

const mapDispatchToProps = (dispatch) => ({
  acceptedSelfEmployee: () => dispatch(acceptedSelfEmployee()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(acceptedSelfEmployee1);
