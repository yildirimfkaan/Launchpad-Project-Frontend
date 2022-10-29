import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './Subscribe.scss';

function Subscribe() {
  return (
    <Container>
      <Row>
        <Col>
          <div className="subscribe">
            <div className="icon1"></div>
            <div className="icon2"></div>
            <div className="text-white text-fs-head-xl title">Subscribe For Newsletter</div>

            <div className="text-white text-fs-head-md text">
              We have all been in this industry too long not to make the security of your funds our
              absolute top priority. We’ve received multiple audits from Open Zeppelin and Trail
            </div>
            <InputGroup className="email-form">
              <Form.Control className="email" type="email" placeholder="Email Address" />

              <Button className="email-button" variant="primary" type="submit">
                Learn More
              </Button>
            </InputGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Subscribe;
