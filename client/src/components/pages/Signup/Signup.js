import React, { Component } from "react";
import { motion } from "framer-motion";
import {
  pageVariants,
  pageTransition,
} from "../../shared/PageAnimation/PageAnimation";
import AuthService from "../../../service/auth.service";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Signup.css";
import logo from "./logo2.png";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        username: "",
        email: "",
        password: "",
        role: "",
      },
      showToast: false,
      toastText: "",
    };
    this.authService = new AuthService();
  }

  handleInputChange = (e) =>
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value },
    });

  handleSubmit = (e) => {
    e.preventDefault();

    this.authService
      .signup(this.state.user)
      .then((newUser) => {
        console.log(newUser);

        console.log(newUser.data);
        this.props.storeUser(newUser.data);
        this.props.history.push("/courses");
        this.props.handleToast(true, "Registro exitoso!", "#d4edda");
      })
      .catch((err) =>
        this.props.handleToast(
          true,
          err.response.data.message[0].msg,
          "#f8d7da"
        )
      );
  };

  render() {
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <section className="signup-page">
          <Container className="mt-5">
            <Row>
              <Col lg={{ span: 6, offset: 3 }} className="signup-form">
                <Row className="justify-content-center mt-3">
                  <figure className="form-logo">
                    <img src={logo} alt="Freedemy logo" />
                  </figure>
                </Row>

                <h1 className="text-center">Sign Up</h1>

                <hr />

                <Form validated={this.validated} onSubmit={this.handleSubmit}>
                  <Form.Group controlId="username">
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="username"
                      placeholder="Ingrese nombre de usuario"
                      value={this.state.username}
                      onChange={this.handleInputChange}
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                      Tu nombre de usuario debe tener más de 5 caracteres
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      name="password"
                      placeholder="Choose a password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                      Su contraseña debe tener más de 4 caracteres y contener un
                      número
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      name="email"
                      placeholder="sample@email.net"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="role">
                    <Form.Label>Cambiar rol</Form.Label>
                    <Form.Control
                      as="select"
                      name="role"
                      value={this.state.role}
                      onChange={this.handleInputChange}
                    >
                      <option>Cual es tu rol?</option>
                      <option value="Student">Estudiante</option>
                      <option value="Teacher">Profesor</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group
                    className="mt-5 mb-3"
                    style={{ width: "60%", margin: "auto" }}
                  >
                    <Button className="btn-block" variant="dark" type="submit">
                      Empecemos !
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </section>
      </motion.div>
    );
  }
}

export default Signup;
