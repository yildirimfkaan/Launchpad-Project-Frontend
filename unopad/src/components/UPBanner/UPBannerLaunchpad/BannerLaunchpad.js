import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './BannerLaunchpad.scss';

function BannerLaunchpad() {
  return (
    <Container className="launchpad-banner">
      <Row className="text-white text-fs-head-xs">
        <Col>Home / Launchpad</Col>
      </Row>
      <Row className="text-white text-fs-head-lg mt-4">
        <Col lg={3} md={4}>
          Efficient Platform for Decentralized Fundrising
        </Col>
      </Row>
      <Row className="text-white text-fs-body-md mt-4">
        <Col lg={4} md={6}>
          We have all been in this industry too long not to make the security of your funds our
          absolute top priority.
        </Col>
      </Row>
    </Container>
  );
}

export default BannerLaunchpad;
