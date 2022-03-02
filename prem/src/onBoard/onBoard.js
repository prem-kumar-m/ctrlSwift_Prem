import React, { Component } from "react";
import Header1 from "../components/header1";
import Footer from "../components/footer";
import Sidemenu from "../components/sidemenu2";

class onBoard extends React.Component {
  navigate = (url) => {
    this.props.history.push(url);
  };
  render() {
    return (
      <div className="page-container" style={{ paddingLeft: "0px" }}>
        <Header1 navigate={(url) => this.navigate("/partnerLogin")} />
        <main className="main-content bgc-grey-100">
          <div id="mainContent">
            <div id="mainContent">
              <div className="row">
                <Sidemenu
                  navigate={(url) => this.navigate(url)}
                  // selected="onboardingEngineer"
                  className="sidemenu2"
                />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default onBoard;
