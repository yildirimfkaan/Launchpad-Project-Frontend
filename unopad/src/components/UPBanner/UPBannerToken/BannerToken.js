import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import beIcon from '../../../assets/img/logo/behance.svg';
import linkedinIcon from '../../../assets/img/logo/linkedin.svg';
import twitterIcon from '../../../assets/img/logo/twitter.svg';

import './BannerToken.scss';

function BannerToken() {
  return (
    <>
      <Container className="token-banner">
        <Row className="text-white text-fs-head-xs">
          <Col>
            <a className="text-white" href="/">
              Home
            </a>
            /Sales/Product Page
          </Col>
        </Row>
        <Row className="text-white text-fs-head-lg mt-4">
          <Col lg={12} md={12}>
            Battle for Giostone
          </Col>
        </Row>
        <Row className="text-white text-fs-body-md mt-4">
          <Col lg={4} md={6}>
            We have all been in this industry too long not to make the security of your funds our
            absolute top priority.
          </Col>
        </Row>

        <Row className="text-white text-fs-body-md mt-4">
          <Col className="token-banner-icon">
            <ul>
              <li>
                <img alt="be" src={beIcon} />
              </li>
              <li>
                <img alt="be" src={linkedinIcon} />
              </li>
              <li>
                <img alt="be" src={twitterIcon} />
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default BannerToken;
