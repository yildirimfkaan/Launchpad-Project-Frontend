import { Col, Container, Nav, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import beIcon from '../../../assets/img/logo/behance.svg';
// import linkedinIcon from '../../../assets/img/logo/linkedin.svg';
// import twitterIcon from '../../../assets/img/logo/twitter.svg';
import { mainColors } from '../../../helpers/colors';
import UPIcons from '../../UPIcons/UPIcons';

import './BannerToken.scss';
import { connect } from 'react-redux';

import SpinnerUnopad from '../../UPSpinnerUnopad/UPSpinnerUnopad';

function BannerToken({ ...props }) {
  const { project } = props;

  
  if (project) {
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
          <Row className="text-white text-fs-title-md mt-4">
            <Col lg={12} md={12}>
              {project.name}
            </Col>
          </Row>
          <Row className="text-white text-fs-body-md mt-4">
            <Col lg={4} md={6}>
              {project.explanation_text}
            </Col>
          </Row>
          {project.social ? (
            <Row className="text-white text-fs-body-md mt-4">
              <Col className="token-banner-icon">
                <ul>
                  {project.social.telegram ? (
                    <li>
                      <Nav.Link
                        as={Link}
                        to={{ pathname: project.social.telegram }}
                        target="_blank"
                      >
                        <UPIcons name="FaTelegram" color={mainColors['dark-light']} size="46" />
                      </Nav.Link>
                    </li>
                  ) : (
                    <></>
                  )}
                  {project.social.discord ? (
                    <li>
                      <Nav.Link as={Link} to={{ pathname: project.social.discord }} target="_blank">
                        <UPIcons name="FaDiscord" color={mainColors['dark-light']} size="46" />
                      </Nav.Link>
                    </li>
                  ) : (
                    <></>
                  )}
                  {project.social.twitter ? (
                    <li>
                      <Nav.Link as={Link} to={{ pathname: project.social.twitter }} target="_blank">
                        <UPIcons name="FaTwitter" color={mainColors['dark-light']} size="46" />
                      </Nav.Link>
                    </li>
                  ) : (
                    <></>
                  )}
                </ul>
              </Col>
            </Row>
          ) : (
            <></>
          )}
        </Container>
      </>
    );
  } else {
    return <SpinnerUnopad />;
  }
}
const mapStateToProps = (state) => {
  return {
    project: state.projectReducer.project,
  };
};

export default connect(mapStateToProps)(BannerToken);
