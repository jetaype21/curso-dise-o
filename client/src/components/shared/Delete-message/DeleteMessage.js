import { Container } from "react-bootstrap";

const DeleteMessage = () => {
  return (
    <Container>
      <h5>Peticion de eliminar</h5>
      <hr />
      <p>
        Está a punto de eliminar información de forma permanente, ¿está seguro
        de Eliminar?
      </p>
    </Container>
  );
};
export default DeleteMessage;
