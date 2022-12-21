import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import UnopadWhite from '../../assets/img/logo/unopad-logo-white.png';
import './Subscribe.scss';


function Subscribe() {
  return (
    <>
    
    <Container className="subscribe mt-4" style={{width:"60%"}}>
    <img src={UnopadWhite}  alt='Unopad Logo' className='mb-4'/>
      <Row>
        <Col className="Subscribe-title">Subscribe For Newsletter</Col>
      </Row>
      <Row>
        <Col></Col>
        <Col lg={8} md={8} className="Subscribe-text">
          We have all been in this industry too long not to make the security of your funds our
          absolute top priority. 
        </Col>
        <Col></Col>
      </Row>

      <Row className='email-row' style={{width:"70%"}}>
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
    </>
  );
}

export default Subscribe;
