import { Col } from "react-bootstrap";
import "./NoMatches-msg.css";

const NoMatchesMsg = () => {
  return (
    <Col md={{ span: 10, offset: 1 }}>
      <h2 className="noMatch-msg">No hay coincidencias, inténtalo de nuevo</h2>
    </Col>
  );
};

export default NoMatchesMsg;
