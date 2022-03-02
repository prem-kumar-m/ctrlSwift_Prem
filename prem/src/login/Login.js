import { Formik } from "formik";
import React, { useState } from "react";
import {
  // Navbar,
  // Nav,
  // NavDropdown,
  Button, Col, Container, Form,
  InputGroup, Modal, Row
} from "react-bootstrap";
import * as Yup from "yup";
// import { Redirect } from 'react-router'
import "../components/header/Header.scss";
// import Logo from "../images/logo.png";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  captcha: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const Header = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <header id="header">
      <Container>
        <Row className="row align-items-center justify-content-between d-flex"></Row>
      </Container>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            onSubmit={(values) => {
              // same shape as initial values
              console.log(values);
            }}
            validationSchema={loginSchema}
            initialValues={{}}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Row>
                  <Form.Group as={Col} md="12" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">
                          {" "}
                          <span className="fa fa-envelope"></span>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isValid={touched.email && !errors.email}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="12" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">
                          {" "}
                          <span className="fa fa-lock"></span>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isValid={touched.password && !errors.password}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Button variant="outline-primary" type="button">
                    <span className="fa fa-refresh"></span> Refresh
                  </Button>
                </Form.Row>
                <Form.Group
                  as={Col}
                  md="12"
                  className="d-flex justify-content-center"
                >
                  <Button type="submit" className="mt-2">
                    Submit form
                  </Button>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row className="justify-content-md-center">
              <Col className="text-center">
                <a href="#!" className="forgot-password-link">
                  Forgot password?
                </a>
                <p className="login-card-footer-text">
                  Don't have an account?{" "}
                  <a href="#!" className="text-reset forgot-password-link">
                    Register here
                  </a>
                </p>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </header>
  );
};

export default Header;
