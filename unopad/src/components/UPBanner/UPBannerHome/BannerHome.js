import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './BannerHome.scss';

function BannerHome() {
  return (
    <Container className="home-banner">
      <Row className="text-white text-fs-title-md">
        <Col>
          <div>Trust.</div>
          <div>Earning.</div>
          <div>Technology.</div>
        </Col>
      </Row>
      <Row className="text-primary text-fs-title-md">
        <Col>Our numero unos.</Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Button variant="primary" style={{ width: '212px' }}>
            Learn More
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default BannerHome;
