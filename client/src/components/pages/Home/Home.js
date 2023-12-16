import { useState } from "react";
import { motion } from "framer-motion";
import CoursesService from "../../../service/courses.service";
import { Container, Row, Carousel, Col, Image } from "react-bootstrap";
import "./Home.css";
// import CourseCard from './../../shared/CourseCard/Course-card'
import RandomCard from "./Random-card";
import Loader from "../../shared/Spinner/Loader";

import Hero from "./Hero";
import Features from "./Features";
import Banner from "./Banner";

const Home = (props) => {
  const coursesService = new CoursesService();

  const [courses, setCourses] = useState(() => {
    coursesService
      .getRandomCourses()
      .then((response) => setCourses(response.data))
      .catch(() => {
        // props.history.push('/courses')
        props.handleToast(
          true,
          "Ocurrio un error, vuela a intentar",
          "#f8d7da"
        );
      });
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero
        title="Ets Education"
        p1="Apremde sobre las enfermedades ets."
        p2="aprende a cuidarte con Ets Education."
      />

      <section className="container-fluid about">
        <Container>
          <Row className="d-flex align-items-center">
            <Col md={6}>
              <Image
                style={{ width: "100%" }}
                src="https://res.cloudinary.com/dodneiokm/image/upload/v1608222311/project3-ironhack/freedemt_x0s3mo.png"
              />
            </Col>
            <Col md={6}>
              <h2 className="mb-3">Acerca de nosotros</h2>
              <p>
                Somos Ets Education, una plataforma de aprendizaje en línea.
                Ayudamos a adolescentes a prepararse para una vida sexual
                saludable.
              </p>
              <p>
                Conectar a estudiantes con las habilidades que necesitan para
                tener una vida sexual sana. Ofrecemos la oportunidad de abrir el
                acceso a la educación sexual.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Carousel */}
      <Container>
        <section className="carousel-section mt-5">
          <h2 className="mt-5 mb-5 text-center ">Explore lo que ofrecemos</h2>

          {courses ? (
            <Carousel className="carousel">
              <Carousel.Item>
                <Row>
                  {[...courses].slice(0, 4).map((elm) => (
                    /* <CourseCard key={elm._id} {...elm} /> */
                    <RandomCard key={elm._id} {...elm} />
                  ))}
                </Row>
              </Carousel.Item>
              <Carousel.Item>
                <Row>
                  {[...courses].slice(4, 8).map((elm) => (
                    /* <CourseCard key={elm._id} {...elm} /> */
                    <RandomCard key={elm._id} {...elm} />
                  ))}
                </Row>
              </Carousel.Item>
            </Carousel>
          ) : (
            <Loader />
          )}
        </section>
      </Container>
      <Banner
        title="Aproveche al máximo su experiencia de aprendizaje en línea"
        text="Nuestros profesores te ayudarán a aprender sin salir de casa."
      />

      {/* Features */}
      <Features />
    </motion.div>
  );
};

export default Home;
