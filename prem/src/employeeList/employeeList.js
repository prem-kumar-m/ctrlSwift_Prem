import _ from "lodash";
import React from "react";
import {
  Button, Col, Container, Dropdown,
  DropdownButton, Row
} from "react-bootstrap";
import Swal from "sweetalert2";
// import PartnerHeader1 from "../components/partnerHeader1";
import Header1 from "../components/header1";
import Footer from "../components/footer";
import Pagination from "../pagination/pagination"


import Sidemenu from "../components/partnersidemenu/partnerSidemenu";

class employeeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [
        {
          employeeId: "1234",
          name: "alice",
          mobNo: "1234567890",
          email: "ertyu@gmail.com",
          status: "Active",
        },
        {
          employeeId: "5678",
          name: "bob",
          mobNo: "4567891230",
          email: "bnmkj@gmail.com",
          status: "Inactive",
        },
        {
          employeeId: "9023",
          name: "bob",
          mobNo: "4567891230",
          email: "bnmkj@gmail.com",
          status: "Assigned",
        },
        {
          employeeId: "9023",
          name: "bob",
          mobNo: "4567891230",
          email: "bnmkj@gmail.com",
          status: "Assigned",
        },
        {
          employeeId: "9023",
          name: "bob",
          mobNo: "4567891230",
          email: "bnmkj@gmail.com",
          status: "Assigned",
        },
        {
          employeeId: "9023",
          name: "bob",
          mobNo: "4567891230",
          email: "bnmkj@gmail.com",
          status: "Assigned",
        },
      ],
      tableData1:[],
    };
  }
  navigate = (url) => {
    this.props.history.push(url);
  };

  nextPath(path) {
    this.props.history.push(path);
  }
  delete = () => {
    Swal.fire({
      title: "confirm to delete",
      text: "Are You Sure Want to delete?",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "ok ",
      showCancelButton: "true",
      cancelButtonColor: "#d33",
      icon: "warning",
    });
  };

  callbackFunction = (childData) => {
    if (this.state.tableData) {
        this.setState({ datalist1: childData });
    } else {
        this.setState({ datalist1: childData });
    }
};

  filter = (evt)  =>{
    const val = evt.target.value;
    const requestlist = _.cloneDeep(this.state.tableData);
    console.log("d------->",val,requestlist);

    if (val !=="All" ) {
      this.setState({ requestlist: [] }, () => {
        const results = _.filter(requestlist, (item) => {
          return (
            item.status.indexOf(val) > -1
          );
        });
        this.setState({ datalist1: results });
      });
    } else {
      this.setState({ datalist1: [] }, () => {
        this.setState({ datalist1: this.state.tableData });
      });
      // this.state.datalist1.slice(0,5);
    }
}
componentDidMount(){
  this.setState({
    tableData1:this.state.tableData,
  })
}
componentDidUpdate(){
  console.log(this.state.tableData)
}
  render() {
    return (
      <div>
        <div className="page-container" style={{ paddingLeft: "0px" }}>
          <header>
            <Header1 />
          </header>
          {/* <Header1 navigate={(url) => this.navigate("/partnerLogin")} /> */}
          {/* <PartnerHeader1 /> */}
          <main className="main-content bgc-grey-100">
            <section >
              <div id="mainContent">
                <div className="row ml-2">
                  <Sidemenu
                    navigate={(url) => this.navigate(url)}
                    selected="employeeList"
                    className="sidemenu2"
                  />
                  <div className="col ">
                    <Container className="shadow p-40 bg-light">
                      <Row>
                        <Col md="4" >
                          <p style={{ fontSize: 26, color: "black" }}>
                            List Of Users
                          </p>
                        </Col>

                        <Col md="2" >
                        <label htmlFor="cancelreason">
                                  Filter By Status
                                </label>
                                </Col>
                                <Col >
                                <select
                                  className="form-control "
                                  onChange={(evt) => this.filter(evt)}
                                >
                                  <option value="All">All</option>
                                  <option value="Active">Active</option>
                                  <option  value="Inactive">Inactive</option>
                                  <option  value="Assigned">Assigned</option>

                                </select>
                        </Col>
                        <Col md="4" >
                          <Button
                           onClick={() => {
                            window.location = "/onboardingEngineer";
                          }}
                          >
                          <i class="fa fa-user-plus" aria-hidden="true"></i>{" "}
                          Add user
                          </Button>

                        </Col>
                      </Row>
                      <table class=" table table-hover table-sm editicon ">
                        <thead class="thead-light">
                          <tr>
                            <th
                              class="head"
                              scope="col"
                              style={{
                                fontSize: 16,
                                fontFamily: "Poppins",
                                color: "black",
                              }}
                            >
                              EMPLOYEE ID
                            </th>
                            <th
                              class="head"
                              scope="col"
                              style={{
                                fontSize: 16,
                                fontFamily: "Poppins",
                                color: "black",
                              }}
                            >
                              NAME
                            </th>

                            <th
                              class="head"
                              scope="col"
                              style={{
                                fontSize: 16,
                                fontFamily: "Poppins",
                                color: "black",
                              }}
                            >
                              EMAIL
                            </th>
                            <th
                              class="head"
                              scope="col"
                              style={{
                                fontSize: 16,
                                fontFamily: "Poppins",
                                color: "black",
                              }}
                            >
                              MOBILE NUMBER
                            </th>
                            <th
                              class="head"
                              scope="col"
                              style={{
                                fontSize: 16,
                                fontFamily: "Poppins",
                                color: "black",
                              }}
                            >
                              status
                            </th>
                            <th
                              class="head"
                              scope="col"
                              style={{
                                fontSize: 16,
                                fontFamily: "Poppins",
                                color: "black",
                              }}
                            >

                            </th>

                          </tr>
                        </thead>
                        <tbody>
                          {this.state.datalist1 &&
                            this.state.datalist1.length > 0 &&
                            this.state.datalist1.map((user, userkey) => (
                              <tr key={userkey}>
                                <th scope="row">
                                
                                  {user.employeeId === "1234" ? (
                                    <span>
                                      <i
                                        class="fa fa-check-circle fa-xs"
                                        aria-hidden="true"
                                        style={{ color: "green" }}
                                      ></i>
                                    </span>
                                  ) : user.employeeId === "5678" ? (
                                    <span>
                                      <i
                                        class="fa fa-times-circle"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                  ) : (
                                    <span>
                                      <i
                                        class="fa fa-circle"
                                        aria-hidden="true"
                                        style={{
                                          color: "red",
                                        }}
                                      ></i>
                                    </span>
                                  )} {" "}

                                  {user.employeeId}

                                </th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.mobNo}</td>
                                <td>{user.status}</td>
                                <td>



                                  <div>
                                    <DropdownButton className="editbtn">
                                      <Dropdown.Item href="/companyEditProfile">
                                        Edit
                                      </Dropdown.Item>
                                      <Dropdown.Item onClick={this.delete}>
                                        Delete
                                      </Dropdown.Item>
                                    </DropdownButton>
                                  </div>
                                </td>

                              </tr>
                            ))}
                        </tbody>
                      </table>
                      <div className="row">
                            <div className="cs-align-center" >
                                <div className="col-12" style={{ margin: "auto" }}>
                                    {this.state.tableData && (

                                        <Pagination
                                            parentCallback={this.callbackFunction}
                                            customer={this.state.tableData}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </Container>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}
export default employeeList;
