import React, { Component } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  pageVariants,
  pageTransition,
} from "../../shared/PageAnimation/PageAnimation";
import CoursesService from "./../../../service/courses.service";
import FilesService from "./../../../service/upload.service";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Loader from "./../../shared/Spinner/Loader";

class EditCourseForm extends Component {
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
        videos: [],
        imageUrl: "",
        owner: this.props.teacherInfo ? this.props.teacherInfo._id : "",
      },
      uploadingActive: false,
    };
    this.coursesService = new CoursesService();
    this.filesService = new FilesService();
  }

  componentDidMount = () => {
    const course_id = this.props.match.params.course_id;

    this.coursesService
      .getCourse(course_id)
      .then((res) => this.setState({ course: res.data }))
      .catch(() => {
        this.props.history.push("/profile");
        this.props.handleToast(
          true,
          "Ocurrio un error, vuela a intentar",
          "#f8d7da"
        );
      });
  };

  handleInputChange = (e) =>
    this.setState({
      course: { ...this.state.course, [e.target.name]: e.target.value },
    });

  handleSubmit = (e) => {
    e.preventDefault();
    const course_id = this.props.match.params.course_id;
    this.coursesService
      .editCourse(course_id, this.state.course)
      .then(() => {
        this.props.history.push("/courses");
        this.props.handleToast(true, "Edicion exitosa!", "#d4edda");
      })
      .catch(() => {
        this.props.history.push(`/teachers/${this.props.teacherInfo._id}`);
        this.props.handleToast(
          true,
          "Ocurrio un error, vuela a intentar",
          "#f8d7da"
        );
      });
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
              <h1 className="mt-5">Editar curso</h1>
              <hr />
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="title">
                  <Form.Label>Titulo</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={this.state.course.title}
                    onChange={this.handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="lead">
                  <Form.Label>Parrafo principal</Form.Label>
                  <Form.Control
                    type="text"
                    name="lead"
                    value={this.state.course.lead}
                    onChange={this.handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Descipcion</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={this.state.course.description}
                    onChange={this.handleInputChange}
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
                        value={this.state.course.category}
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
                        value={this.state.course.difficultyLevel}
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
                  <Form.Label>Temas principales</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="whatYouWillLearn"
                    value={this.state.course.whatYouWillLearn}
                    onChange={this.handleInputChange}
                    required
                  />
                  <Form.Text id="whatYouWillLearn" muted>
                    Separe los temas con comas
                  </Form.Text>
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="price">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        value={this.state.course.price}
                        onChange={this.handleInputChange}
                        min="0"
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
                        value={this.state.course.duration}
                        onChange={this.handleInputChange}
                        min="0"
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
                    value={this.state.course.requirements}
                    onChange={this.handleInputChange}
                  />
                  <Form.Text id="requirements" muted>
                    Separe los requerimientos con comas
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="requirements">
                  <Form.Label>Videos</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="videos"
                    value={this.state.course.videos}
                    onChange={this.handleInputChange}
                  />
                  <Form.Text id="videos" muted>
                    Separe los URLs con comas
                  </Form.Text>
                </Form.Group>

                <Form.Group>
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
                  {this.state.uploadingActive
                    ? "Image loading..."
                    : "Confirm Edition"}
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

export default EditCourseForm;
