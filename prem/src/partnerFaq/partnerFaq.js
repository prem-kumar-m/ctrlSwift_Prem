import React from "react";
import { Button, Card, Col, Form } from "react-bootstrap";
import Footer from "../components/footer/Footer.js";
import PartnerHeader from "../components/partnerHeader";

class partnerFaq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      name: "",
      email: "",
      mobile: "",
      mobileCountryCode: "",
      message: "",
      organisation: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleChanges = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /\S+@[A-Za-z]+\.com/;
    const ks = /\S+@[A-Za-z]+\.co.in/;
    if (!re.test(value) && !ks.test(value)) {
      this.setState({
        emailError: "Invalid email",
      });
    } else {
      this.setState({
        emailError: "",
      });
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitted: true });
    const { email, name, mobileCountryCode, mobile, message, organisation } =
      this.state;
  };
  render() {
    const {
      email,
      name,
      submitted,
      mobileCountryCode,
      mobile,
      organisation,
      message,
    } = this.state;
    return (
      <div>
        <PartnerHeader />

        <section className="pt-faq">
          <div>
            <header style={{ textAlign: "center" }}>
              <h1>FAQ</h1>
            </header>
          </div>
          <Card className="faq-card">
            <Card.Header>
              <h3>How can we help?</h3>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Row>
                  <Form.Group md="5" as={Col}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={this.handleChange}
                    />
                    {submitted && !name && (
                      <div className="validationError">Name is required</div>
                    )}
                  </Form.Group>
                  <Form.Group md="5" as={Col}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={this.handleChanges}
                    />
                    {submitted && !email && (
                      <div className="validationError">Email is required</div>
                    )}
                    {this.state.emailError !== "" && submitted && (
                      <div className="validationError">
                        {this.state.emailError}
                      </div>
                    )}{" "}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group md="5" as={Col}>
                    <Form.Label>Mobile Country Code</Form.Label>
                    <Form.Control
                      className="form-control"
                      name="mobileCountryCode"
                      value={mobileCountryCode}
                      onChange={this.handleChange}
                    />
                    {submitted && !mobileCountryCode && (
                      <div className="validationError">
                        Country code is required
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group md="5" as={Col}>
                    <Form.Label>Mobile </Form.Label>
                    <Form.Control
                      className="form-control"
                      name="mobile"
                      value={mobile}
                      onChange={this.handleChange}
                    />
                    {submitted && !mobile && (
                      <div className="validationError">
                        Mobile number is required
                      </div>
                    )}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group md="5" as={Col}>
                    <Form.Label>Organisation</Form.Label>
                    <Form.Control
                      className="form-control"
                      name="organisation"
                      value={organisation}
                      onChange={this.handleChange}
                    />
                    {submitted && !organisation && (
                      <div className="validationError">
                        Organisation is required
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group md="5" as={Col}>
                    <Form.Label>Message </Form.Label>
                    <textarea
                      className="form-control"
                      name="message"
                      value={message}
                      onChange={this.handleChange}
                    />
                    {submitted && !message && (
                      <div className="validationError">message is required</div>
                    )}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group md="5" as={Col}></Form.Group>
                  <Form.Group md="5" as={Col}>
                    <Button onClick={this.handleSubmit}>submit</Button>
                  </Form.Group>
                </Form.Row>
              </Form>
            </Card.Body>
          </Card>
        </section>
        <Footer />
      </div>
    );
  }
}

export default partnerFaq;
