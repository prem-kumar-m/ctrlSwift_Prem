import React from "react";
import * as Constants from "../../constants";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import HeaderLogin from "../header_login/HeaderLogin";
class terms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  scrollFunction() {
    var topPage = document.getElementById("top-page");

    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      topPage.style.display = "block";
    } else {
      topPage.style.display = "none";
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollFunction);
  }
  componentDidMount() {
    // When the user scrolls down 20px from the top of the document, show the button
    window.addEventListener("scroll", this.scrollFunction);
  }

  componentDidUpdate(prevProps) {}
  render() {
    return (
      <div>
        {!window.sessionStorage.getItem(Constants.ACCESS_EMAIL) ? (
          <Header />
        ) : (
          <HeaderLogin />
        )}
        <div>
          <section style={{ marginTop: "100px" }} id="terms">
            <div className="container">
              <header>
                <h2> Terms and conditions</h2>
              </header>
              <br></br>
              <div>
                <h5 className="headCont">
                  THIS IS AN AGREEMENT BETWEEN YOU OR THE ENTITY THAT YOU
                  REPRESENT (hereinafter “You” or “Your”) AND
                  BALBAHAS(hereinafter “ BALBAHAS”) GOVERNING YOUR USE OF
                  BALBAHAS
                </h5>
              </div>
              <br></br>

              <div>
                <h4>Parts of this Agreement</h4>

                <p className="termsPara">
                  This Agreement consists of the following terms and conditions
                  (hereinafter the “General Terms”) and terms and conditions, if
                  any, specific to use of individual Services (hereinafter the
                  “Service Specific Terms”). The General Terms and Service
                  Specific Terms are collectively referred to as the “Terms”. In
                  the event of a conflict between the General Terms and Service
                  Specific Terms, the Service Specific Terms shall prevail.
                </p>
              </div>
              <hr></hr>

              <br></br>

              <div>
                <h4>Acceptance of the Terms</h4>

                <p className="termsPara">
                  You must be of legal age to enter into a binding agreement in
                  order to accept the Terms. If you do not agree to the General
                  Terms, do not use any of our Services. If you agree to the
                  General Terms and do not agree to any Service Specific Terms,
                  do not use the corresponding Service. You can accept the Terms
                  by checking a checkbox or clicking on a button indicating your
                  acceptance of the terms or by actually using the Services.
                </p>
              </div>
              <hr></hr>

              <br></br>

              <div>
                <h4>Description of Service</h4>

                <p className="termsPara">
                  We provide an array of services for online collaboration and
                  management including word processor, spreadsheet, presentation
                  tool, database application creator, email client, chat client,
                  organizer, customer relationship management application and
                  project management application ("Service" or "Services"). You
                  may use the Services for your personal and business use or for
                  internal business purpose in the organization that you
                  represent. You may connect to the Services using any Internet
                  browser supported by the Services. You are responsible for
                  obtaining access to the Internet and the equipment necessary
                  to use the Services. You can create and edit content with your
                  user account and if you choose to do so, you can publish and
                  share such content.
                </p>
              </div>
            </div>
            <div className="top-button" id="top-page" href="#terms">
              <p>
                {" "}
                <a href="#terms">
                  <span>&#8250;</span>
                </a>
              </p>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    );
  }
}
export default terms;
