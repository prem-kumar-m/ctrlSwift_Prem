import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer-area section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-6 col-sm-6">
            <div className="single-footer-widget">
              <p className="footer-text">
                Copyright ©
                <script>document.write(new Date().getFullYear());</script>2020
                CtrlSwift All rights reserved
                <i className="icon-heart3" aria-hidden="true"></i>
              </p>
            </div>
          </div>
          <div className="col-lg-5  col-md-6 col-sm-6">
            <div className="single-footer-widget">
              <h6>Newsletter</h6>
              <p>Stay update with our latest</p>
              <div className="" id="mc_embed_signup">
                <form
                  target="_blank"
                  novalidate="true"
                  action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"
                  method="get"
                  className="form-inline"
                >
                  <input
                    className="form-control"
                    name="EMAIL"
                    placeholder="Enter Email"
                    onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Enter Email '"
                    required=""
                    type="email"
                  />
                  <button className="click-btn btn btn-default">
                    <i
                      className="fa fa-long-arrow-right btn-footer"
                      aria-hidden="true"
                    ></i>
                  </button>

                  <div className="info"></div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-6 social-widget">
            <div className="single-footer-widget">
              <h6>Follow Us</h6>
              <p>Let us be social</p>
              <div className="footer-social d-flex align-items-center">
                <a href="#">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="#">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fa fa-dribbble"></i>
                </a>
                <a href="#">
                  <i className="fa fa-behance"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
