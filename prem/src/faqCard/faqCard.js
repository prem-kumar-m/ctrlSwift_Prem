import { PropTypes } from "prop-types";
import React from "react";
import { Accordion, Button, Card, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { requestInquiryList } from "./action";
class faqCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      emailError: "",
      isDetailsSuccess: false,
      name: "",
      email: "",
      mobileNumber: "",
      region: "",
      message: "",
      mobileCountryCode: "",
      organization: "",
      enquiryType: this.props.message,
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
    const {
      email,
      name,
      region,
      mobileNumber,
      message,
      mobileCountryCode,
      organization,
      enquiryType,
      emailError,
    } = this.state;
    if (
      email &&
      name &&
      region &&
      mobileNumber &&
      message &&
      mobileCountryCode &&
      organization &&
      emailError == ""
    ) {
      this.props.requestInquiryList(
        name,
        email,
        organization,
        mobileCountryCode,
        mobileNumber,
        region,
        enquiryType,
        message
      );

    }
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(
      "=======after did update" + JSON.stringify(this.props.isDetailsSuccess)
    );
    if (this.props.isDetailsSuccess !== prevProps.isDetailsSuccess) {
      if (
        this.props.isDetailsSuccess &&
        this.props.isDetailsSuccess.data &&
        this.props.isDetailsSuccess.data.success === true
      ) {
        Swal.fire({
          // title: "",
          text: this.props.isDetailsSuccess.data.message,
          icon: "success",

          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then(() => {
          this.setState({
            name: " ",
            email: " ",
            organization: " ",
            mobileCountryCode: " ",
            mobileNumber: " ",
            region: " ",

            message: " ",
          });
        });
      }
    }
  }

  render() {
    const {
      name,
      email,
      mobileNumber,
      region,
      message,
      submitted,
      mobileCountryCode,
      organization,
      enquiryType,
    } = this.state;
    return (
      <div>
        <Accordion defaultActiveKey="0">
          <Card className="faq-card">
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                <h4 style={{ color: "unset" }}>HOW CAN WE HELP ?</h4>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {/* <Card.Title>
                  <h4 style={{ color: "unset" }}>HOW CAN WE HELP ?</h4>
                </Card.Title>
                <br /> */}
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
                        <div
                          className="help-block"
                          style={{ fontSize: 12, color: "red" }}
                        >
                          Name is required
                        </div>
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
                        <div
                          className="help-block"
                          style={{ fontSize: 12, color: "red" }}
                        >
                          Email is required
                        </div>
                      )}
                      {this.state.emailError !== "" && submitted && (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.emailError}
                        </div>
                      )}
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="5" controlId="mobileCountryCode">
                      <Form.Label>Mobile Country Code </Form.Label>
                      <select
                        type="dropdown"
                        className="form-control"
                        name="mobileCountryCode"
                        value={mobileCountryCode}
                        placeholder="select"
                        onChange={this.handleChange}
                      >
                        <option value=""></option>

                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+86">+86</option>
                        <option value="+44">+44</option>
                        <option value="+81">+81</option>
                        <option value="+49">+49</option>
                        <option value="+33">+33</option>
                        <option value="+55">+55</option>
                        <option value="+39">+39</option>
                        <option value="+1">+1</option>
                        <option value="+7">+7</option>
                        <option value="+65">+65</option>
                        <option value="+64">+64</option>
                        <option value="+61">+61</option>
                        <option value="+964">+964</option>
                      </select>
                      {submitted && !mobileCountryCode && (
                        <div
                          style={{ fontSize: 12, color: "red" }}
                          className="nav-left"
                        >
                          Mobile code is required
                        </div>
                      )}
                    </Form.Group>
                    <Form.Group md="5" as={Col}>
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        type="number"
                        className="form-control"
                        name="mobileNumber"
                        value={mobileNumber}
                        onChange={this.handleChange}
                      />
                      {submitted && !mobileNumber && (
                        <div
                          className="help-block"
                          style={{ fontSize: 12, color: "red" }}
                        >
                          Mobile is required
                        </div>
                      )}
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group md="5" as={Col}>
                      <Form.Label>Organization </Form.Label>
                      <Form.Control
                        className="form-control"
                        name="organization"
                        value={organization}
                        onChange={this.handleChange}
                      />
                      {submitted && !organization && (
                        <div
                          className="help-block"
                          style={{ fontSize: 12, color: "red" }}
                        >
                          Organization is required
                        </div>
                      )}
                    </Form.Group>
                    <Form.Group md="5" as={Col}>
                      <Form.Label>Region</Form.Label>
                      <select
                        type="dropdown"
                        autoComplete="off"
                        className="form-control"
                        name="region"
                        value={region}
                        onChange={this.handleChange}
                      >
                        <option value=""></option>
                        <option value="India">India</option>
                        <option value="US">US</option>
                        <option value="China">China</option>
                        <option value="UK">Uk</option>
                        <option value="Japan">Japan</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Italy">Italy</option>
                        <option value="Canada">Canada</option>
                        <option value="Russia">Russia</option>
                        <option value="Singapore">Singapore</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Australia">Australia</option>
                        <option value="Iraq">Iraq</option>
                      </select>
                      {submitted && !region && (
                        <div
                          className="help-block"
                          style={{ fontSize: 12, color: "red" }}
                        >
                          Region is required
                        </div>
                      )}
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group md="5" as={Col}>
                      <Form.Label>Inquiry Type</Form.Label>
                      <Form.Control
                        className="form-control"
                        value={enquiryType}
                        disabled
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group md="5" as={Col}>
                      <Form.Label>Message</Form.Label>
                      <textarea
                        type="textarea"
                        className="form-control"
                        name="message"
                        value={message}
                        onChange={this.handleChange}
                      />
                      {submitted && !message && (
                        <div
                          className="help-block"
                          style={{ fontSize: 12, color: "red" }}
                        >
                          Message is required
                        </div>
                      )}
                    </Form.Group>
                  </Form.Row>

                  <Button
                    className="faqbutton text-uppercase"
                    onClick={(e) => this.handleSubmit(e)}
                  >
                    {" "}
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}
faqCard.propTypes = {
  requestInquiryList: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    isDetailsSuccess: state.requestInquiryListreducer.isDetailsSuccess,
  };
};
const mapDispatchToProps = (dispatch) => ({
  requestInquiryList: (
    name,
    email,
    organization,
    mobileCountryCode,
    mobileNumber,
    region,
    enquiryType,
    message
  ) =>
    dispatch(
      requestInquiryList(
        name,
        email,
        organization,
        mobileCountryCode,
        mobileNumber,
        region,
        enquiryType,
        message
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(faqCard);
