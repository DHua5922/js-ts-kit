import { Card } from "react-bootstrap";

function Feature({ title, description }) {
  return (
    <Card.Body style={{ padding: "2rem" }}>
      <br />
      <Card.Title style={{ fontSize: "2rem" }}>{title}</Card.Title>
      <p />
      <Card.Text style={{ fontSize: "1.5rem" }}>{description}</Card.Text>
      <br />
    </Card.Body>
  );
}

export default Feature;
