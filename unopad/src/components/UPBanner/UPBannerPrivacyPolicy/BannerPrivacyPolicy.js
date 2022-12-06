import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import './BannerPrivacyPolicy.scss';

function BannerPrivacyPolicy() {
  return (
    <>
      <Container className="privacypolicy-banner">
        <Row className="text-white text-fs-head-xs">
          <Col>Home / Privacy Policy</Col>
        </Row>
        <Row className="text-white text-fs-title-md mt-4">
          <Col lg={12} md={12}>
          Privacy Policy
          </Col>
        </Row>
        <Row className="text-white text-fs-body-md mt-4">
          <Col lg={4} md={6}>
            We have all been in this industry too long not to make the security of your funds our
            absolute top priority.
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default BannerPrivacyPolicy;
