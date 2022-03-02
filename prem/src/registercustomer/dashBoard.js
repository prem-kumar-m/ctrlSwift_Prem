import _ from "lodash";
import { MDBContainer } from "mdbreact";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import {
  Col,
  Form
} from "react-bootstrap";
import { Bar, Line, Pie, Polar } from "react-chartjs-2";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Footer from "../components/footer";
import Header1 from "../components/header1";
import Sidemenu from "../components/sidemenu";
import "../css/main.css";
import { reqloadreguser, requestloadallData } from "./action";
class dashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRequest: {},
      showassignModal: false,
      showrescheduleModal: false,
      showcancelModal: false,
      requestoriginallist: _.cloneDeep(props.reglist),
      reglist: _.cloneDeep(props.reglist),
      isShowroomLoaded: false,
      showroom: "",
      listshowroom: "",
      salesperson: "",
      itassignee: "",
      isAssignRequestSuccess: {},
      ticket: "",
      popassignsuccessmessage: true,
      rescheduledDate: new Date(),
      availableslots: {},
      timeslot: "",
      comments: "",
      popreschedulesuccessmessage: true,
      popcancellationsuccessmessage: true,
      popcompletionsuccessmessage: true,
      reglistcount: '',
      mode: "ASSIGN",
      timeZone: "(GMT+5:30) Asia/Calcutta",
      adminlist: '',
      totalPlans: '',
      userDetails: '',
      totalregcount: '',
      plancount: [],
      year: new Date().getFullYear(),
      tickerdata: '',
      dataBar: {
        labels: [],
        datasets: [
          {
            data: [],
            label: " Total plan",
            barThickness: 60,
            maxBarThickness: 25,
            backgroundColor: [
              "#F7464A",
              "#46BFBD",
              "#FDB45C",
              "#949FB1",
              "#4D5360",
              "#AC64AD",
              "#FF5733",
            ],
            hoverBackgroundColor: [
              "#FF5A5E",
              "#5AD3D1",
              "#FFC870",
              "#A8B3C5",
              "#616774",
              "#DA92DB"
            ],

          },
        ],
      },


      usedDataPie: {
        label: [],
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "#F7464A",
              "#46BFBD",
              "#FDB45C",
              "#949FB1",
              "#4D5360",
              "#AC64AD"
            ],
            hoverBackgroundColor: [
              "#FF5A5E",
              "#5AD3D1",
              "#FFC870",
              "#A8B3C5",
              "#616774",
              "#DA92DB"
            ],
          },
        ],
      },
      usedDataLine: {

        label: [" Manage Engine"],
        labels: ["January", "February", "March", "April", "May",
          "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
          {

            data: [],
            label: [],
            backgroundColor: [
              "#F7464A",
              "#46BFBD",
              "#FDB45C",
              "#949FB1",
              "#4D5360",
              "#AC64AD",
              "#FFA07A",
              "#6495ED",
              "#9FE2BF",
              "#800080",
              "#D68910",
              "#E74C3C",
            ],
            hoverBackgroundColor: [
              "#FF5A5E",
              "#5AD3D1",
              "#FFC870",
              "#A8B3C5",
              "#616774",
              "#DA92DB",
              "#FFA07A",
              "#6495ED",
              "#9FE2BF",
              "#800080",
              "#D68910",
              "#E74C3C",
            ],
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
            tension: 0.1,
          },
        ],
      },
      usedDataPolar: {

        label: [" Used Plans"],
        labels: [],
        datasets: [
          {

            data: [],
            label: ["Yearly Chart"],
            backgroundColor: [
              "#F7464A",
              "#46BFBD",
              "#FDB45C",
              "#949FB1",
              "#4D5360",
              "#AC64AD",
              "#FFA07A",
              "#6495ED",
              "#9FE2BF",
              "#800080",
              "#D68910",
              "#E74C3C",
            ],
            hoverBackgroundColor: [
              "#FF5A5E",
              "#5AD3D1",
              "#FFC870",
              "#A8B3C5",
              "#616774",
              "#DA92DB",
              "#FFA07A",
              "#6495ED",
              "#9FE2BF",
              "#800080",
              "#D68910",
              "#E74C3C",
            ],
          },
        ],
      },


    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  callbackFunction = (childData) => {
    if (
      this.props.reglist &&
      this.props.reglist.success == true
    ) {
      this.setState({ datalist1: childData });
    } else {
      this.setState({ datalist1: childData });
    }
  };



  componentDidMount() {
    this.props.reqloadreguser();
    this.props.requestloadallData(this.state.year);
    console.log("checking yuva" + this.props.reglist);

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    console.log("index data :" + JSON.stringify(this.props.loadplan));

    if (this.props.reglist !== prevProps.reglist) {
      this.setState({
        reglist: this.props.reglist,
        reglistCopy: this.props.reglist,
        reglistcount: this.props.reglist.length,
      });
    }
    // dashboard Bar && Pie chart data ;

    if (this.props.loadplan !== prevProps.loadplan) {
      if (this.props.loadplan && this.props.loadplan.success) {

        this.state.dataBar.datasets[0].data = this.props.loadplan.planStatusList;
        this.state.dataBar.labels = this.props.loadplan.planStatusCountList;
        this.state.usedDataPie.datasets[0].data = this.props.loadplan.highestPlanList;
        this.state.usedDataPie.labels = this.props.loadplan.highestCountPlanList;
        this.state.usedDataPie.label = this.props.loadplan.highestCountPlanList;
        this.state.usedDataLine.datasets[0].data = this.props.loadplan.ticketsInMonth;
        this.state.tickerdata = this.props.loadplan.ticketsInMonth.length;
        this.state.usedDataLine.datasets[0].label = this.props.loadplan.currentYear;
        this.state.usedDataPolar.datasets[0].data = this.props.loadplan.highestModelList;
        this.state.usedDataPolar.labels = this.props.loadplan.highestCountModelList;

        this.state.totalregcount = this.props.loadplan.registeredCustomerCount;
        this.state.plancount = this.props.loadplan.totalActivePlansList;
        // don't remove setstate
        this.setState({
        });
        console.log(this.state.plancount);
      } else {
        Swal.fire({
          title: "",
          text: "Oops Something went wrong ",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }
          //  ).then((res) => {
          //    if (res.value) {
          //      this.props.history.push("/");
          //    }
          //  }
        );

      }
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
  navigate = (url) => {
    this.props.history.push(url);
  };


  customerDetials = (name, id) => {
    console.log(
      "event-------" + JSON.stringify(name) + "-----event--------" + id
    );
    localStorage.setItem("name", name);
    localStorage.setItem("id", id);
    window.location.href = "/customerDetials";
  };

  displaydata = (e, data) => {
    let details = this.state.datalist1.find(
      (element) => element.company === data);
    this.setState({
      userDetails: details,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });

  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { year } = this.state;
    if (year) {
      this.props.requestloadallData(year);

    }
  }


  render() {
    const datas = [{
      name: "", value: ""
    }]
    const { year } = this.state;
    return (
      <div className="container-fulid page-container" style={{ paddingLeft: "0px" }}>
        <Header1 navigate={(url) => this.navigate("/admin")} />
        <main className="container-fuild bgc-grey-100">
          <div id="mainContent">
            <div id="mainContent">
              <div className="row">
                <Sidemenu
                  navigate={(url) => this.navigate(url)}
                  selected="dashBoard"
                />



                <div className="col-md-9">
                  <div className="row">
                    <div className="col-md-12 ">
                      <div className="bgc-white p-20" >
                        <div className=" p-20">
                          <div className="col-md-12 ">
                            <h3 className="font-weight-bold">CtrlSwift Admin Dashboard</h3>
                            <br />
                            <div className="container">
                            <Form.Row>
                              <Form.Group as={Col} md="10" controlId="landLine">
                                <div className="card shadow">
                                  <div className="card-header text-dark font-weight-bold d-inline">
                                    Manage Engine chart Flow
                                    {this.state.tickerdata === 0 ? <span className="cs-dataline"> (No data: {this.state.year})</span> : null}


                                  </div>
                                  <div className="card-body">
                                    <MDBContainer>
                                      <Line
                                        data={this.state.usedDataLine}
                                        options={{ responsive: true }}
                                      />
                                    </MDBContainer>
                                  </div>
                                </div>
                              </Form.Group>
                              <Form.Group as={Col} md="2" controlId="landLine">
                                <div className="card shadow">
                                  <div className="card-header text-dark font-weight-bold">
                                    Choose Year
                                  </div>
                                  <div className="card-body">
                                    <input
                                      type="number"
                                      className="form-control"
                                      name="year"
                                      value={year}
                                      onChange={this.handleChange}

                                    /><br />
                                    <button className="btn btn-primary btn-sm btn-block" onClick={this.handleSubmit} > Go </button>
                                  </div>

                                </div>
                              </Form.Group>
                            </Form.Row>

                          </div>
                            <div className="row">
                              <div className="col-xl-3  col-sm-6 col-12 mb-4">

                              </div>

                              {/*---------------- dashboard chart ------------------*/}
                              <div className="col-12 mb-4" style={{ width: "50%" }}>
                                <Form>
                                  <Form.Row>
                                    <Form.Group as={Col} md="6" controlId="landLine">

                                      <div className="card shadow">
                                        <div className="card-header text-dark font-weight-bold">Plan Status List</div>

                                        <div className="card-body">
                                          <MDBContainer>
                                            <Bar
                                              data={this.state.dataBar}
                                              options={{ responsive: true, offset: false, label: false }}
                                            />
                                          </MDBContainer>
                                        </div>
                                      </div>


                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="landLine">
                                      <div className="card shadow">
                                        <div className="card-header text-dark font-weight-bold">
                                          Highest Plan List
                                        </div>
                                        <div className="card-body">
                                          <MDBContainer>
                                            <Pie
                                              data={this.state.usedDataPie}
                                              options={{ responsive: true, offset: false }}
                                            />
                                          </MDBContainer>
                                        </div>
                                      </div>
                                    </Form.Group>

                                  </Form.Row>

                                </Form>

                              </div>

                            </div>

                          </div>


                          {/* -----------------------------table register Customer -----------------------------------------*/}
                          <div className="container">
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="card  shadow">
                                  <div className="card-header text-dark font-weight-bold"> Choosen Models </div>
                                  <div className="card-body">
                                    <p>{this.state.userDetails.company}</p>
                                    <Polar
                                      data={this.state.usedDataPolar}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col">
                                <div className="row row-cols-1 row-cols-md-2">
                                  <div className="col-6 mb-4">
                                    <div className="card shadow">
                                      <div className="card-header text-dark font-weight-bold text-nowrap"> Registered Customers </div>
                                      <div className="card-body">
                                        <div className="d-flex justify-content-center px-md-1">

                                          <div className="text-center">
                                            <h2>{this.state.totalregcount}</h2>

                                          </div>
                                        </div>

                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6 mb-4">
                                    <div className="card shadow">
                                      <div className="card-header text-dark font-weight-bold cs-dataline" style={{ color: "#F7464A" }}> Total Active Lite   </div>

                                      <div className="card-body">
                                        <div className="d-flex justify-content-center px-md-1">

                                          <div className="text-center">
                                            <h2>{this.state.plancount[0]}</h2>

                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6 mb-4">
                                    <div className="card shadow">
                                      <div className="card-header text-dark font-weight-bold text-nowrap" style={{ color: "#46BFBD" }}> Total Active Enterprise </div>
                                      <div className="card-body">
                                        <div className="d-flex justify-content-center px-md-1">

                                          <div className="text-center">
                                            <h2>{this.state.plancount[1]}</h2>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6 mb-4">
                                    <div className="card shadow">
                                      <div className="card-header text-dark font-weight-bold text-nowrap" style={{ color: "#FDB45C" }}> Total Active Premium </div>
                                      <div className="card-body">
                                        <div className="d-flex justify-content-center px-md-1">

                                          <div className="text-center">
                                            <h2>{this.state.plancount[2]}</h2>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>

                          </div>
                          <br />


                        </div>

                      </div>
                    </div>
                  </div>
                  {/* <Footer /> */}

                </div>
              </div>
            </div>
          </div>

        </main>
    <Footer/>
      </div>
    );
  }
}
dashBoard.propTypes = {
  reqloadreguser: PropTypes.func,
  loadplan: PropTypes.object,
  reglist: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    reglist: state.registercustomerReducer.reglist,
    loadplan: state.registercustomerReducer.loadplan,
  };
};

const mapDispatchToProps = (dispatch) => (
  // console.log("data in footer:" +year),

  {
    reqloadreguser: (state) => dispatch(reqloadreguser(state)),
    requestloadallData: (year) => dispatch(requestloadallData(year)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(dashBoard);
