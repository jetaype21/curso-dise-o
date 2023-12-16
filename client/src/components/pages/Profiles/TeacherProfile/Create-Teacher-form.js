import React, { Component } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  pageVariants,
  pageTransition,
} from "../../../shared/PageAnimation/PageAnimation";
import TeachersService from "../../../../service/teachers.service";
import FilesService from "../../../../service/upload.service";
import Loader from "../../../shared/Spinner/Loader";
import { Container, Row, Col, Form, Button, Tabs, Tab } from "react-bootstrap";
import "./Create-Teacher-form.css";

class NewTeacherForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher: {
        name: "",
        surname: "",
        jobOccupation: "",
        description: "",
        linkedin: "",
        youtube: "",
        website: "",
        user: this.props.loggedUser ? this.props.loggedUser._id : "",
      },
      uploadingActive: false,
    };
    this.teachersService = new TeachersService();
    this.filesService = new FilesService();
  }

  handleInputChange = (e) =>
    this.setState({
      teacher: { ...this.state.teacher, [e.target.name]: e.target.value },
    });

  handleSubmit = (e) => {
    e.preventDefault();

    this.teachersService
      .saveTeacher(this.state.teacher)
      .then(() => {
        this.props.storeUser(this.props.loggedUser);
        this.props.history.push("/profile");
        this.props.handleToast(
          true,
          "Congratulations!, now you have a teacher's profile",
          "#d4edda"
        );
      })
      .catch((err) =>
        this.props.handleToast(
          true,
          err.response.data.message[0].msg,
          "#f8d7da"
        )
      );
  };

  handleImageUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    this.setState({ uploadingActive: true });

    this.filesService
      .uploadImage(uploadData)
      .then((response) => {
        this.setState({
          teacher: {
            ...this.state.teacher,
            imageUrl: response.data.secure_url,
          },
          uploadingActive: false,
        });
      })
      .catch((err) =>
        this.props.handleToast(true, err.response.data.message, "#f8d7da")
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
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <h1 className="mt-5">Cree su perfil de profesor</h1>
              <hr />

              <Form onSubmit={this.handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="name">
                      <Form.Label>Nombres</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        placeholder="Ingrese sus nombres"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="surname">
                      <Form.Label>Apellidos</Form.Label>
                      <Form.Control
                        type="text"
                        name="surname"
                        value={this.state.surname}
                        onChange={this.handleInputChange}
                        placeholder="Ingrese sus apellidos"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="jobOccupation">
                  <Form.Label>Profesion</Form.Label>
                  <Form.Control
                    type="text"
                    name="jobOccupation"
                    value={this.state.jobOccupation}
                    onChange={this.handleInputChange}
                    placeholder="Caul es su profesion?"
                  />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Acerca de mi</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                    placeholder="Acerca de el"
                  />
                </Form.Group>

                <Tabs
                  className="mt-4"
                  defaultActiveKey="linkedin"
                  id="Personal Links"
                >
                  <Tab eventKey="linkedin" title="Linkedin">
                    <Form.Group controlId="linkedin">
                      <Form.Label>Linkedin URL</Form.Label>
                      <Form.Control
                        type="text"
                        name="linkedin"
                        value={this.state.linkedin}
                        onChange={this.handleInputChange}
                        placeholder="Tiene perfil de linkedin?"
                      />
                    </Form.Group>
                  </Tab>
                  <Tab eventKey="website" title="Website">
                    <Form.Group controlId="website">
                      <Form.Label>Website URL</Form.Label>
                      <Form.Control
                        type="text"
                        name="website"
                        value={this.state.website}
                        onChange={this.handleInputChange}
                        placeholder="Tiene un sitio web?"
                      />
                    </Form.Group>
                  </Tab>
                  <Tab eventKey="youtube" title="Youtube">
                    <Form.Group controlId="youtube">
                      <Form.Label>Youtube URL</Form.Label>
                      <Form.Control
                        type="text"
                        name="youtube"
                        value={this.state.youtube}
                        onChange={this.handleInputChange}
                        placeholder="Tiene un canal de yt??"
                      />
                    </Form.Group>
                  </Tab>
                </Tabs>

                <Form.Group className="mt-3">
                  <Form.Label>
                    Imagen (file: jpg or png){" "}
                    {this.state.uploadingActive && <Loader />}
                  </Form.Label>
                  <Form.Control type="file" onChange={this.handleImageUpload} />
                </Form.Group>

                <Button
                  className="mt-3 add-course"
                  type="submit"
                  disabled={this.state.uploadingActive}
                >
                  {" "}
                  {this.state.uploadingActive
                    ? "Image loading..."
                    : "Create Teacher profile"}
                </Button>
              </Form>
              {this.state.uploadingActive || (
                <Link
                  to="/profile"
                  className="btn btn-outline-dark mt-5"
                  disabled
                >
                  regresar
                </Link>
              )}
            </Col>
          </Row>
        </Container>
      </motion.div>
    );
  }
}

export default NewTeacherForm;
