import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import './BannerFaq.scss';

function BannerFaq() {
  return (
    <>
      <Container className="faq-banner">
        <Row className="text-white text-fs-head-xs">
          <Col>Home / FAQ</Col>
        </Row>
        <Row className="text-white text-fs-title-md mt-4">
          <Col lg={12} md={12}>
          FAQ
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

export default BannerFaq;
