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
import { companyNewRequests, reqacceptCompany, reqdeleteCompany } from "./action";
class companyRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      showDetails1: false,
      companyDetails: "",
      tableData: [],
      goForAccept: false,
      goForDelete: false,
      status: "",
    };
  }

  delete = (user) => {
    Swal.fire({
      title: "confirm to delete",
      text: "Are you sure want to delete company request?",
      confirmButtonColor: "#3085d6",
      icon: "warning",
      confirmButtonText: "Delete",
    }).then((res) => {
      if (res.value) {
        this.deleteCompany(user);
      } else if (res.dismiss == "cancel") {
        console.log("cancel");
      }
    });
  };

  deleteCompany = (user) => {
    this.setState({ goForDelete: true, status: "deny" });
    console.log(this.state.status);
    this.props.reqdeleteCompany(
      user.companyName,
      user.email,
      this.state.status
    );
  };

  accept = (user) => {
    Swal.fire({
      title: "confirm to Accept",
      text: "Are you sure want to accept company request?",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Accept",
      showCancelButton: true,
    }).then((res) => {
      if (res.value) {
        this.acceptCompany(user);
      } else if (res.dismiss == "cancel") {
        console.log("cancel");
      }
    });
  };
  acceptCompany = (user) => {
    this.setState({ goForAccept: true, status: "Accept" });
    console.log(this.state.status);
    this.props.reqacceptCompany(
      user.companyName,
      user.email,
      this.state.status
    );
  };
  handleClose1 = () => {
    this.setState({ showDetails1: false });
  };
  clicked = (e, partnerId) => {
    e.preventDefault();
    this.setState({ showDetails: true });

    let details = this.props.company.find(
      (element) => element.partnerId == partnerId
    );

    this.setState({ companyDetails: details });
    console.log(this.state.companyDetails);
  };

  handleClose = () => {
    this.setState({ showDetails: false });
  };
  componentDidMount() {
    this.props.companyNewRequests();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.isSuccess !== prevProps.isSuccess) {
      if (this.state.goForAccept && this.props.isSuccess) {
        Swal.fire({
          title: "Accepted",
          text: this.props.isSuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((res) => {

          if (res.value) {

            window.location.reload();

          }

        });
      }
      this.setState({ goForAccept: false });
    }
    if (this.props.isDeleteSuccess !== prevProps.isDeleteSuccess) {
      if (this.state.goForDelete && this.props.isDeleteSuccess) {
        Swal.fire({
          title: "Denied",
          text: this.props.isDeleteSuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",

        }).then((res) => {

          if (res.value) {

            window.location.reload();

          }

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
              selected="companyRequest"
            />

            <div className="col-md-10">
            <button className="btn btn-primary btn-color-admin admin-logout-header-btn"
              onClick={() => { window.location = "/dashBoard"; }}>Go Back</button>
              <div className="row pt-2">
                <div className="col-12">
                  <div style={{ marginLeft: "50px" }}>
                    <h5 className="acptHeader f700"> Company Request List</h5>
                  </div>

                  <div className="row col-md-12">
                    <div className="col-md-1" />
                    <div className="col-md-10" style={{ marginTop: "25px" }}>
                      <div className="col-md-12 scroll"></div>

                      <Table striped bordered hover>
                        <thead className="thead-light">
                          <tr>
                            <th scope="col" className="acptTh">
                              COMPANY NAME
                            </th>
                            <th scope="col" className="acptTh">
                              MOBILE NUMBER
                            </th>
                            <th scope="col" className="acptTh">
                              EMAIL
                            </th>
                            <th scope="col" className="acptTh">
                              GST NUMBER
                            </th>
                            <th scope="col" className="acptTh">
                              ACTION
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.company &&
                            this.props.company.length > 0 &&
                            this.props.company.map((user, userkey) => (
                              <tr key={userkey}>
                                <th scope="row">
                                  <Link
                                    onClick={(e) =>
                                      this.clicked(e, user.partnerId)
                                    }
                                  >
                                    {user.companyName}
                                  </Link>
                                </th>
                                <td>{user.mobile}</td>
                                <td>{user.email}</td>
                                <td>{user.gstNumber}</td>
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
                            ))}
                        </tbody>
                      </Table>
                      {/* <Card className="sample">
                        <Card.Body className="sample1" >
                        hi
                        </Card.Body>
                      </Card> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* <--------------------pop up Modal--------------> */}
        <Modal
          show={this.state.showDetails}
          onHide={this.handleClose}
          backdrop={"static"}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h4>Company Details</h4>{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col} md="4">
                  <Form.Label
                    className="selfEmployeeList"
                  >
                    {" "}
                    Company Name
                  </Form.Label>

                  <input
                    className="form-control"
                    name="companyName"
                    value={this.state.companyDetails.companyName}
                    id="apCompanyName"
                    disabled
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label
                    className="selfEmployeeList"
                  >
                    Email
                  </Form.Label>
                  <Form.Control
                    className="form-control"
                    value={this.state.companyDetails.email}
                    disabled
                    id="apEmail"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label
                    className="selfEmployeeList"
                  >
                    Mobile
                  </Form.Label>

                  <Form.Control
                    placeholder="2242-5635"
                    className="form-control"
                    value={this.state.companyDetails.mobile}
                    disabled
                    id="apMobile"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label
                    className="selfEmployeeList"
                  >
                    country
                  </Form.Label>

                  <Form.Control
                    value={this.state.companyDetails.country}
                    className="form-control"
                    disabled
                    id="apCountry"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label
                    className="selfEmployeeList"
                  >
                    Address
                  </Form.Label>

                  <Form.Control
                    placeholder={this.props.address}
                    className="form-control"
                    value={this.state.companyDetails.address}
                    disabled
                    id="apAddress"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label
                    className="selfEmployeeList"
                  >
                    State
                  </Form.Label>

                  <Form.Control
                    value={this.state.companyDetails.state}
                    className="form-control"
                    disabled
                    id="State"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="4">
                  <Form.Label
                    className="selfEmployeeList"
                  >
                    City
                  </Form.Label>

                  <Form.Control
                    value={this.state.companyDetails.city}
                    className="form-control"
                    disabled
                    id="apCity"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label
                    className="selfEmployeeList"
                  >
                    pincode
                  </Form.Label>

                  <Form.Control
                    value={this.state.companyDetails.pincode}
                    className="form-control"
                    disabled
                    id="apPincode"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label
                    className="selfEmployeeList"
                  >
                    Company Url
                  </Form.Label>

                  <Form.Control
                    value={this.state.companyDetails.companyUrl}
                    className="form-control"
                    disabled
                    id="apCompanyUrl"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="4">
                  <Form.Label
                    className="selfEmployeeList"
                  >
                    GST Number
                  </Form.Label>
                  <Form.Control
                    value={this.state.companyDetails.gstNumber}
                    className="form-control"
                    disabled
                    id="apGstNo"
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
companyRequest.propTypes = {
  companyNewRequests: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    company: state.companyNewRequestsreducer.company,
    isSuccess: state.companyNewRequestsreducer.isSuccess,
    isDeleteSuccess: state.companyNewRequestsreducer.isDeleteSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  companyNewRequests: (company) => dispatch(companyNewRequests(company)),
  reqacceptCompany: (companyName, email, status) =>
    dispatch(reqacceptCompany(companyName, email, status)),
  reqdeleteCompany: (companyName, email, status) =>
    dispatch(reqdeleteCompany(companyName, email, status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(companyRequest);
