import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Spinner } from 'react-bootstrap';

function SpinnerUnopad() {
  return (
    <Container className="sales-banner">
      <Row className="text-white text-fs-head-xs">
        <Col lg={4}></Col>
        <Col lg={4} className="text-center">
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
        </Col>
        <Col lg={4}></Col>
      </Row>
    </Container>
  );
}

export default SpinnerUnopad;
