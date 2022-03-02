import React from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Footer from "../footer/Footer";
import Commercialsidemenu from "../sidemenu/Commercialsidemenu";
class gpstracking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      page: "",
      emailError: "",
      submitted: false,
      isVerifySuccess: false,
      isReadyToRedirect: false,
    };

  }



  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }
  navigate = (url) => {
    this.props.history.push(url);
  };
  render() {
    if (this.state.isReadyToRedirect)
      return (
        <Redirect
          to={
            "/partnerResetOtp?email=" +
            this.state.email +
            "&page=" +
            this.state.page
          }
        />
      );

    const { email, submitted } = this.state;
    return (
      <div className="container-fulid">
  <Commercialsidemenu
  navigate={(url) => this.navigate(url)}
  selected="tickets"
  />
  <div className="col-md-9">

  </div>
    



        <Footer />
      </div>
    );
  }
}
gpstracking.propTypes = {
//   partnerVerifyLogin: PropTypes.func,
};
const mapStateToProps = (state) => {
//   return {
//     isVerifySuccess: state.partnerGetmailReducer.isVerifySuccess,
//   };
};

const mapDispatchToProps = (dispatch) => ({
//   partnerVerifyEmail: (email) => dispatch(partnerVerifyEmail(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(gpstracking);
