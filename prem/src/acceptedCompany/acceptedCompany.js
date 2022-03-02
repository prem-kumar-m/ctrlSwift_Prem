import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { Col, Form, Modal, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { Table } from "react-bootstrap";
import Header1 from "../components/header1";
import Sidemenu2 from "../components/Sidemenu2";
import { acceptedPartners } from "./action";

class acceptedCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      companyDetails: "",
      tableData: [],
    };
  }

  componentDidMount() {
    console.log("============in mount ===============");
    this.props.acceptedPartners();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(
      "========after function========" + JSON.stringify(this.props.company)
    );
  }


  handleClose = () => {
    this.setState({ showDetails: false });
  };

  showCompanyDetails = (e, partnerId) => {
    e.preventDefault();

    this.setState({
      showDetails: true,
    });

    let details = this.props.company.find(
      (element) => element.partnerId === partnerId
    );

    this.setState({
      companyDetails: details,
    });

    // this.props.company;
  };
  handleCompanySelectChange = () => {
    this.props.acceptedPartners(this.state.companyName);
  };
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
              selected="acceptedCompany"
            />
            <div className="col-md-10">
            <button className="btn btn-primary btn-color-admin admin-logout-header-btn"
              onClick={() => { window.location = "/dashBoard"; }}>Go Back</button>
              <div className="row pt-2">
                <div className="col-12">
                  <div style={{ marginLeft: "50px" }}>
                    <h5 className="acptHeader f700"> Partner's List</h5>
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
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.company &&
                            this.props.company.length > 0 &&
                            this.props.company.map((user, userkey) => (
                              <tr key={userkey}>
                                <td>
                                  <Link
                                    onClick={(e) =>
                                      this.showCompanyDetails(e, user.partnerId)
                                    }
                                  >
                                    {user.companyName}
                                  </Link>
                                </td>
                                <td>{user.mobile}</td>
                                <td>{user.email}</td>
                                <td>{user.gstNumber}</td>
                              </tr>
                            ))}
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
          onHide={() => this.handleClose()}
          backdrop={"dynamic"}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h4>Company Details</h4>{" "}
              {/* {this.state.showDetails ? "Truee" : "false"} */}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col} md="4">
                  <Form.Label className="selfEmployeeList">
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
                  <Form.Label className="selfEmployeeList">Email</Form.Label>
                  <Form.Control
                    className="form-control"
                    value={this.state.companyDetails.email}
                    disabled
                    id="apEmail"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label className="selfEmployeeList">Mobile</Form.Label>

                  <Form.Control
                    placeholder="2242-5635"
                    className="form-control"
                    value={this.state.companyDetails.mobile}
                    disabled
                    id="apMobile"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label className="selfEmployeeList">country</Form.Label>

                  <Form.Control
                    value={this.state.companyDetails.country}
                    className="form-control"
                    disabled
                    id="apCountry"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label className="selfEmployeeList">Address</Form.Label>

                  <Form.Control
                    placeholder={this.props.address}
                    className="form-control"
                    value={this.state.companyDetails.address}
                    disabled
                    id="apAddress"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label className="selfEmployeeList">State</Form.Label>

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
                  <Form.Label className="selfEmployeeList">City</Form.Label>

                  <Form.Control
                    value={this.state.companyDetails.city}
                    className="form-control"
                    disabled
                    id="apCity"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label className="selfEmployeeList">pincode</Form.Label>

                  <Form.Control
                    value={this.state.companyDetails.pincode}
                    className="form-control"
                    disabled
                    id="apPincode"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label className="selfEmployeeList">
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
                  <Form.Label className="selfEmployeeList">
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

acceptedCompany.propTypes = {
  acceptedPartners: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    company: state.acceptedPartnersReducer.company,
  };
};

const mapDispatchToProps = (dispatch) => ({
  acceptedPartners: (company, address) =>
    dispatch(acceptedPartners(company, address)),
});
export default connect(mapStateToProps, mapDispatchToProps)(acceptedCompany);
