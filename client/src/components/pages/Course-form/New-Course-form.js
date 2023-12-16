import React, { Component } from "react";
import { motion } from "framer-motion";
import {
  pageVariants,
  pageTransition,
} from "../../shared/PageAnimation/PageAnimation";
import CoursesService from "./../../../service/courses.service";
import FilesService from "./../../../service/upload.service";
import Loader from "../../shared/Spinner/Loader";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./New-Course-form.css";

class NewCourseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {
        title: "",
        lead: "",
        description: "",
        category: "",
        difficultyLevel: "",
        whatYouWillLearn: [],
        price: "",
        duration: "",
        requirements: [],
        imageUrl: this.props.teacherInfo.imageUrl || "",
        owner: this.props.teacherInfo._id || "",
      },
      uploadingActive: false,
    };
    this.coursesService = new CoursesService();
    this.filesService = new FilesService();
  }

  handleInputChange = (e) =>
    this.setState({
      course: { ...this.state.course, [e.target.name]: e.target.value },
    });

  handleSubmit = (e) => {
    e.preventDefault();

    this.coursesService
      .saveCourse(this.state.course)
      .then(() => {
        this.props.history.push("/courses");
        this.props.handleToast(true, "Nuevo curso creado!", "#d4edda");
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
          course: { ...this.state.course, imageUrl: response.data.secure_url },
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
            <Col lg={{ span: 8, offset: 2 }}>
              <h1 className="mt-5">Crea un nuevo curso</h1>
              <hr />
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="title">
                  <Form.Label>Titulo</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    placeholder="Titulo del curso"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="lead">
                  <Form.Label>Párrafo principal</Form.Label>
                  <Form.Control
                    type="text"
                    name="lead"
                    value={this.state.lead}
                    onChange={this.handleInputChange}
                    placeholder="crea un parrafo principal"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Descripcion</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                    placeholder="Descripcion del curso"
                    required
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="category">
                      <Form.Label>Categoria</Form.Label>
                      <Form.Control
                        as="select"
                        name="category"
                        value={this.state.category}
                        onChange={this.handleInputChange}
                      >
                        <option>Seleccione categorias</option>
                        <option value="ETS">ETS</option>
                        <option value="PSICOLOGIA">PSICOLOGIA</option>
                        <option value="EDUCACION SEXUAL">
                          EDUCACION SEXUAL
                        </option>
                        <option value="BIENESTAR FAMILIAR">
                          BIENESTAR FAMILIAR
                        </option>
                        <option value="OTRO">OTRO</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="difficultyLevel">
                      <Form.Label>Nivel</Form.Label>
                      <Form.Control
                        as="select"
                        name="difficultyLevel"
                        value={this.state.difficultyLevel}
                        onChange={this.handleInputChange}
                      >
                        <option>Seleccione una opcion</option>
                        <option value="TODOS LOS NIVELES">
                          Todos los niveles
                        </option>
                        <option value="SECONDARIA">Secondaria</option>
                        <option value="TECNOLOGICO">Tecnologico</option>
                        <option value="ESCOLARES">ESCOLARES</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="whatYouWillLearn">
                  <Form.Label>Temas princiales</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="whatYouWillLearn"
                    value={this.state.whatYouWillLearn}
                    onChange={this.handleInputChange}
                    placeholder="Temas principales a aprender para los alumnos"
                    required
                  />
                  <Form.Text id="whatYouWillLearn" muted>
                    Separe los temas con comas
                  </Form.Text>
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="price">
                      <Form.Label>Precio</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        value={this.state.price}
                        onChange={this.handleInputChange}
                        min="0"
                        placeholder="Precio"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="duration">
                      <Form.Label>Duracion</Form.Label>
                      <Form.Control
                        type="number"
                        name="duration"
                        value={this.state.duration}
                        onChange={this.handleInputChange}
                        min="0"
                        placeholder="Cuantas horas dura?"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="requirements">
                  <Form.Label>Requerimientos</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="requirements"
                    value={this.state.requirements}
                    onChange={this.handleInputChange}
                    placeholder="Requerimientos para el curso?"
                  />
                  <Form.Text id="requirements" muted>
                    Separe los requerimientos con comas
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="videos">
                  <Form.Label>Videos</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="videos"
                    value={this.state.videos}
                    onChange={this.handleInputChange}
                    placeholder="Incluyre audios (audio or video)"
                  />
                  <Form.Text id="videos" muted>
                    Separe los URLs con comas
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    Image (file: jpg or png){" "}
                    {this.state.uploadingActive && <Loader />}
                  </Form.Label>
                  <Form.Control type="file" onChange={this.handleImageUpload} />
                </Form.Group>

                <Button
                  className="mt-3 add-course"
                  type="submit"
                  disabled={this.state.uploadingActive}
                >
                  {this.state.uploadingActive
                    ? "Image loading..."
                    : "Create course"}
                </Button>
              </Form>
              {this.state.uploadingActive || (
                <Link
                  to={`/teachers/${this.props.teacherInfo._id}`}
                  className="btn btn-outline-dark mt-5"
                  disabled
                >
                  Regresar
                </Link>
              )}
            </Col>
          </Row>
        </Container>
      </motion.div>
    );
  }
}

export default NewCourseForm;
