import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './Subscribe.scss';

function Subscribe() {
  return (
    <Container className="subscribe">
      <Col className="icon1"></Col>

      <Col className="icon2"></Col>

      <Row>
        <Col className="text-white text-fs-head-xl text-center">Subscribe For Newsletter</Col>
      </Row>
      <Row>
        <Col></Col>
        <Col lg={8} className="text-white text-fs-head-md text-center mt-4">
          We have all been in this industry too long not to make the security of your funds our
          absolute top priority. We’ve received multiple audits from Open Zeppelin and Trail
        </Col>
        <Col></Col>
      </Row>

      <Row style={{width:"70%"}}>
        <Col>
          <InputGroup className="email-form">
            <Form.Control className="email" type="email" placeholder="Email Address" />

            <Button className="email-button" variant="primary" type="submit">
              Learn More
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Subscribe;
