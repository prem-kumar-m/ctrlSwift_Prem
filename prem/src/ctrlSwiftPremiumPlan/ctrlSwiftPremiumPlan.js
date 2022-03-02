import React from "react";
import { Button } from "react-bootstrap";
import Header from "../components/header/Header";
import HeaderLogin from "../components/header_login/HeaderLogin";
import Footer from "../components/footer/Footer.js";
import * as Constants from "../constants";
import Switch from "react-switch";
import { requestPlanPrice } from "../ctrlSwiftLitePlan/action";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class ctrlSwiftPremium extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plan:"Premium",
      paymentTerms:"Monthly",
      toggle: false,
      discountPercentage :'',
      discountPercentagelist:"5",

    };
    this.handleToggleChange = this.handleToggleChange.bind(this);
  }

  handleToggleChange = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
    if(this.state.toggle === false){
      this.setState({
        paymentTerms:"Monthly"
      })
      this.props.requestPlanPrice(this.state.plan,this.state.paymentTerms);

    }else{
      this.setState({
        paymentTerms:"Yearly"
      })
      this.props.requestPlanPrice(this.state.plan,this.state.paymentTerms);

    }
  };
  cardchange=(flag)=>{
    console.log("-----testing")
        window.localStorage.setItem("priceFlag",this.state.plan);
        window.localStorage.setItem("screen_data",flag);
        console.log(window.localStorage.getItem("screen_data"));
      }

  componentDidMount() {
    this.props.requestPlanPrice(this.state.plan,this.state.paymentTerms);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    window.localStorage.clear();
    if (this.props.isSuccess !== prevProps.isSuccess) {
      if (
        this.props.isSuccess !== undefined &&
        this.props.isSuccess !== null &&
        this.props.isSuccess.dynamicPriceList !== undefined
      ) {
        this.setState({
          discountPercentage :this.props.isSuccess.dynamicPriceList,
        });
      }
    }
    console.log( this.state.discountPercentage.discountPercentage);

  }


  render() {
    const {discountPercentagelist} =this.state;
    return (
      <div>
        {!window.sessionStorage.getItem(Constants.ACCESS_EMAIL) ? (
          <Header />
        ) : (
          <HeaderLogin />
        )}
        <div className="view">
          <section className="generic-banner relative banner-area-inner12">
            <div className="overlay overlay-bg overlay-bg-blk"></div>
            <div className="container">
              <div className="row height align-items-center justify-content-center">
                <div className="col-lg-10">
                  <div className="generic-banner-content inner-banner-txt">
                    <h2 className="head2">
                      Choose a plan that's right for your business
                    </h2>
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
        </div>

        <section className="price-area section-gap" id="schedule">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="menu-content pb-70 col-lg-8">
                <div className="title text-center">
                  <h1 className="mb-10">PRICING PLANS</h1>
                  <p style={{ fontSize: 18 }}>
                    Choose a plan that's right for your business
                  </p>
                  <br></br>
                  <h1>CtrlSwift PREMIUM</h1>
                </div>
              </div>
            </div>
            <div className="title text-center" style={{ marginBottom: 50,fontWeight:200 }}>
              <span
                style={{ fontSize: "20px", color: "#004dcf", marginRight: 20 }}
                className="lable"
              >
                <b>Pay Monthly </b>
              </span>

              <Switch
                checked={this.state.toggle}
                onChange={this.handleToggleChange}
                onHandleColor="#fff"
                onColor="#0950a1"
                uncheckedIcon={false}
                checkedIcon={false}
              />

              <span
                style={{ fontSize: "20px", color: "#004dcf", marginLeft: 20 }}
                className="lable"
              >
                <b> Pay Yearly </b>
              </span>
            </div>
            <div className="row justify-content-center">
            {this.props.isSuccess&&this.props.isSuccess.dynamicPriceList  && this.props.isSuccess.dynamicPriceList.map((users,index ) => ( 

              <div className="col-lg-4 col-md-6 single-price"  key ={index}>
                <div className="top-part">
                { users.model === "PPU" ?
                    <div className="card-cs">
                     <span>
                      <i> {users.discountPercentage}% off</i>
                    </span>
                    </div>: this.state.paymentTerms === "Yearly" || users.model === "Dedicated" && users.model === "Shared" ?
                       <div className="card-cs">
                         <span>
                      <i> {users.discountPercentage}% off</i>
                    </span>
                       </div>
                   :<div className="">
                   <span>

                   </span>
                   </div> }
                <h1 className="package-no">{users.serialNumber}</h1>
                  <br></br>
                  {/* <h2>Premium-PPU</h2> */}
                  <p style={{fontSize:"24px",}}>{users.plan}-<span style={{fontWeight:"600",color:"black"}}>{users.model}</span></p>

                </div>
                <div className="package-list"></div>
                <div className="bottom-part">
                <h1 style={{ fontSize: "2.5em", fontWeight: 400 }}>
                <span>
                      {this.state.toggle ?
                        <span>
                          <s style={{ color: "#8bc34a" }}> {users.selectModelPrice}</s>$<br/>{users.discountAmount}$
                        </span>
                       :
                       users.model === "PPU"?
                          <span>
                          <s style={{ color: "#8bc34a" }}> {users.selectModelPrice}</s>$<br/>{users.discountAmount}$
                        </span>
                      :users.model === "Dedicated" || users.model === "Shared" ?
                      <span>
                      {" "}
                       {users.selectModelPrice}$
                    </span>:null  }
                    </span>
                </h1>
                  <br></br>
                  <h4 style={{ marginLeft: 20, fontSize: 18 }}>{users.paymentTerms}</h4>
                  <br></br>
                  <div >
                {users.paymentTerms ==="Monthly" ?
                <div>
                  <br/><br/>
                  </div>
                :
                <div>
                </div>
                }
                 </div>
                  <div className="bottom-part">
                    <Button
                      className="genric-btn primary radius text-uppercase"
                      variant=" "
                      style={{ width: 200 }}
                      href="./customizePage"
                      onClick={()=>this.cardchange(users.model)}

                    >
                      Customize
                    </Button>{" "}
                  </div>
                  <br></br>
                  <div className="bottom-part">
                    <Button
                      className="genric-btn primary radius text-uppercase"
                      variant=" "
                      style={{ width: 200 }}
                      href="./requestdemo"
                    >
                      Requset Demo
                    </Button>{" "}
                  </div>
                </div>
              </div>
               ))}
            </div>
          </div>
        </section>
        <section className="schedule-area pb-100">
          <div className="container">
            <div className="row d-flex justify-content-center"></div>
            <div className="row tbl-price">
              <div className="table-wrap col-sm-12 col-lg-12 col-lg-12">
                <table className="schdule-table table table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th
                        className="head"
                        scope="col"
                        style={{ fontFamily: "Poppins" }}
                      >
                        sl
                      </th>
                      <th
                        className="head"
                        scope="col"
                        style={{ fontFamily: "Poppins" }}
                      >
                        storage
                      </th>
                      <th
                        className="head"
                        scope="col"
                        style={{ fontFamily: "Poppins" }}
                      >
                        100 GB
                      </th>
                      <th
                        className="head"
                        scope="col"
                        style={{ fontFamily: "Poppins" }}
                      >
                        Unlimited
                      </th>
                      <th
                        className="head"
                        scope="col"
                        style={{ fontFamily: "Poppins" }}
                      >
                        Unlimited
                      </th>
                    </tr>
                  </thead>
                  {this.state.hideshow ? (
                    <tbody>
                      <tr>
                        <th className="name" scope="row">
                          01
                        </th>
                        <td>Single file upload limit</td>
                        <td>2 GB</td>
                        <td>5 GB</td>
                        <td>5 GB</td>
                      </tr>
                      <tr>
                        <th className="name" scope="row">
                          02
                        </th>
                        <td>Enterprise app integrations</td>
                        <td>-</td>
                        <td>1</td>
                        <td>3</td>
                      </tr>

                      <tr>
                        <th className="name" scope="row">
                          03
                        </th>
                        <td>Version histort</td>
                        <td>25</td>
                        <td>50</td>
                        <td>50</td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <th className="name" scope="row">
                          01
                        </th>
                        <td>Single file upload limit</td>
                        <td>2 GB</td>
                        <td>5 GB</td>
                        <td>5 GB</td>
                      </tr>
                      <tr>
                        <th className="name" scope="row">
                          02
                        </th>
                        <td>Enterprise app integrations</td>
                        <td>-</td>
                        <td>1</td>
                        <td>3</td>
                      </tr>

                      <tr>
                        <th className="name" scope="row">
                          03
                        </th>
                        <td>Version histort</td>
                        <td>25</td>
                        <td>50</td>
                        <td>50</td>
                      </tr>
                      <tr>
                        <th className="name" scope="row">
                          04
                        </th>
                        <td>Minimum users</td>
                        <td>3</td>
                        <td>3</td>
                        <td>3</td>
                      </tr>
                      <tr>
                        <th className="name" scope="row">
                          05
                        </th>
                        <td>Maximum users</td>
                        <td>10</td>
                        <td>Unlimited</td>
                        <td>Unlimited</td>
                      </tr>
                      <tr>
                        <th className="name" scope="row">
                          06
                        </th>
                        <td>External Collaboratiors</td>
                        <td>Require paid accounts</td>
                        <td>Require paid accounts</td>
                        <td>Unlimited</td>
                      </tr>
                    </tbody>
                  )}
                </table>

                {this.state.hideshow ? (
                  <Button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    onClick={() => {
                      this.setState({ hideshow: !this.state.hideshow });
                    }}
                  >
                    showmore
                  </Button>
                ) : (
                  <Button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    onClick={() => {
                      this.setState({ hideshow: !this.state.hideshow });
                    }}
                  >
                    showless
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}

ctrlSwiftPremium.propTypes = {
  submitpartner: PropTypes.func,
};

const mapStateToProps=(state)=>{
  return{
    isSuccess: state.ctrlSwiftLiteReducer.isSuccess,
  };
};
 const mapDispatchToProps = (dispatch)=>({
  requestPlanPrice:(plan,paymentTerms)=>
  dispatch(requestPlanPrice(
    plan,
    paymentTerms
  ))
});

export default connect(mapStateToProps, mapDispatchToProps)(ctrlSwiftPremium);;

