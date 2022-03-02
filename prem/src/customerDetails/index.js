import _ from "lodash";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Footer from "../components/footer";
import Header1 from "../components/header1";
import { planDetialsRequest } from "./action";


class customerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customizeDetials: "",
      planList: [],
      name: "",
      customerID: "",
      show: false,
      isLoading: false,
      dataPie: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "#F7464A",
              "#46BFBD",
              "#FDB45C",
              "#949FB1",
              // "#4D5360",
              // "#AC64AD"
            ],
            hoverBackgroundColor: [
              "#FF5A5E",
              "#5AD3D1",
              "#FFC870",
              "#A8B3C5",
              // "#616774",
              // "#DA92DB"
            ],
          },
        ],
      },
      usedDataPie: {
        labels: [],
        datasets: [
          {
            data: [20, 35, 49],
            backgroundColor: [
              "#F7464A",
              "#46BFBD",
              "#FDB45C",
              "#949FB1",
              // "#4D5360",
              // "#AC64AD"
            ],
            hoverBackgroundColor: [
              "#FF5A5E",
              "#5AD3D1",
              "#FFC870",
              "#A8B3C5",
              // "#616774",
              // "#DA92DB"
            ],
          },
        ],
      },
    };
  }
  componentDidMount() {
    const name = localStorage.getItem("name");
    const id = localStorage.getItem("id");
    console.log("this.state.name" + name);
    console.log("this.state.id" + id);
    this.setState({
      name: name,
      customerID: id,
    });
    this.props.planDetials(id);
    this.setState({
      isLoading: true,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.planList !== prevProps.planList) {
      this.setState({
        isLoading: false,
      });
      if (this.props.planList.success) {
        this.state.dataPie.datasets[0].data = this.props.planList.plansList.map(
          (row, rowkey) => {
            return this.props.planList.plansList[rowkey].actualTicket;
          }
        );

        this.state.dataPie.labels = this.props.planList.plansList.map(
          (row, rowkey) => {
            return this.props.planList.plansList[rowkey].plan;
          }
        );

        // this.state.usedDataPie.datasets[0].data = this.props.planList.plansList.map(
        //   (row, rowkey) => {
        //     return this.props.planList.plansList[rowkey].actualTicket;
        //   }
        // );

        this.state.usedDataPie.labels = this.props.planList.plansList.map(
          (row, rowkey) => {
            return this.props.planList.plansList[rowkey].plan;
          }
        );

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
          //showCancelButton: true,
          confirmButtonColor: "#3085d6",
          //cancelButtonColor: '#d33',
          confirmButtonText: "OK",
        });
      }
    }

  }

  componentWillReceiveProps(nextProps) {
    console.log(JSON.stringify(nextProps));
  }
  navigate = (url) => {
    this.props.history.push(url);
  };
  // planDetials = (e) => {
  //   alert(JSON.stringify(this.props.planList));
  // };

  render() {
    return (
      <div className="page-container" style={{ paddingLeft: "0px" }}>
        <Header1 navigate={(url) => this.navigate("/admin")} />
        <main className="main-content bgc-grey-100">
          <div id="mainContent">
            <div id="mainContent">
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-12 ">
                      <button type="button" className="btn btn-primary" id="back">
                        <a href="/registerCustomer">
                          <font color="white">Back</font>
                        </a>
                      </button>
                    </div>

                    <div className="col-md-12">
                      <div
                        className="bgc-white p-20"
                        style={{ paddingBottom: "0px" }}
                      >
                        {/* <div className="row">
                          <div className="col-md-6">
                            <MDBContainer>
                              <h3 className="mt-5">
                                Total Ticket Volume By Plan
                              </h3>
                              <br></br>
                              <Pie
                                data={this.state.dataPie}
                                options={{ responsive: true }}
                              />
                            </MDBContainer>
                          </div>
                          <div className="col-md-6">
                            <MDBContainer>
                              <h3 className="mt-5">
                                Used Ticket Volume By Plan
                              </h3>
                              <br></br>
                              <Pie
                                data={this.state.usedDataPie}
                                options={{ responsive: true }}
                              />
                            </MDBContainer>
                          </div>
                        </div> */}
                        <h2>Plan details</h2>
                        <div
                          className="scroll"
                          style={{ width: "100%", height: 500 }}
                        >
                          <table
                            className="table table-hover"
                            style={{ textAlign: "left" }}
                          >
                            <thead>
                              <tr>
                                <th scope="col" style={{ fontWeight: "bold" }}>
                                  Plan
                                </th>
                                <th scope="col" style={{ fontWeight: "bold" }}>
                                  Actual Ticket
                                </th>
                                <th scope="col" style={{ fontWeight: "bold" }}>
                                  Service Support
                                </th>
                                <th scope="col" style={{ fontWeight: "bold" }}>
                                  Payment Terms
                                </th>
                                <th scope="col" style={{ fontWeight: "bold" }}>
                                  TollFree Number
                                </th>
                                <th scope="col" style={{ fontWeight: "bold" }}>
                                  Contract Duration
                                </th>
                                <th scope="col" style={{ fontWeight: "bold" }}>
                                  Initialisation Date
                                </th>
                                <th scope="col" style={{ fontWeight: "bold" }}>
                                  Expire Date
                                </th>
                                <th scope="col" style={{ fontWeight: "bold" }}>
                                  status
                                </th>
                                <th scope="col" style={{ fontWeight: "bold" }}>
                                  Created On
                                </th>
                                <th scope="col" style={{ fontWeight: "bold" }}>
                                Activated On
                                </th>
                                <th scope="col" style={{ fontWeight: "bold" }}>
                                  Updated On
                                </th>

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
                                  ).map((customer, customerkey) => (
                                    <tr key={customerkey}>
                                      <td style={{ columnWidth: 200 }}>
                                        {customer.plan}
                                      </td>
                                      <td style={{ columnWidth: 200 }}>
                                      {customer.actualTicket}

                                      </td>
                                      <td style={{ columnWidth: 200 }}>
                                      {/* <Link
                                className="details-link"
                                onClick={(e) => {
                                  this.planDetials({
                                    token: customer.token,
                                    plan: customer.supportWindows,
                                  });
                                }}
                              >
                                   {customer.serviceSupport}
                              </Link> */}
                                                                          {customer.serviceSupport}

                                      </td>
                                      <td style={{ columnWidth: 200 }}>
                                        {customer.paymentTerms}
                                      </td>
                                      <td style={{ columnWidth: 200 }}>
                                        {customer.isTollFreeNumber}
                                      </td>
                                      <td style={{ columnWidth: 200 }}>
                                        {customer.contractDuration}
                                      </td>
                                      <td style={{ columnWidth: 200 }}>
                                        {customer.serviceInitialisationDate}{" "}
                                      </td>
                                      <td style={{ columnWidth: 200 }}>
                                        {customer.serviceExpireDate}
                                      </td>
                                      <td style={{ columnWidth: 200 }}>
                                        {customer.status}
                                      </td>
                                      <td style={{ columnWidth: 200 }}>
                                        {customer.createdOn}
                                      </td>
                                      <td style={{ columnWidth: 200 }}>
                                        {customer.activatedOn}
                                      </td>
                                      <td style={{ columnWidth: 200 }}>
                                        {customer.updatedOn}
                                      </td>
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
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
customerDetails.propTypes = {
  //reqloadreguser: PropTypes.func,

  //planDetials: PropTypes.func,
  planList: PropTypes.func,
};

const mapStateToProps = (state) => {
  console.log(JSON.stringify(state.customerDetailsReducer.planList));
  return {
    planList: state.customerDetailsReducer.planList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  planDetials: (id) => dispatch(planDetialsRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(customerDetails);
