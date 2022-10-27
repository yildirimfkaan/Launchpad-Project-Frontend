import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './BannerHome.scss';

function BannerHome() {
  return (
    <Container className="home-banner">
    <Row className="text-white text-fs-head-lg">
      <Col>
        <div>Trust.</div>
        <div>Earning.</div>
        <div>Trust.</div>
      </Col>
    </Row>
    <Row className='text-primary text-fs-head-lg'>
      <Col>Our numero unos.</Col>
    </Row>
    <Row className="mt-4">
      <Col>
        <Button variant="primary" style={ {width : '212px'} }>Learnd More</Button>
      </Col>
    </Row>
  </Container>
  );
}

export default BannerHome;
