import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import beIcon from '../../../assets/img/logo/behance.svg';
import linkedinIcon from '../../../assets/img/logo/linkedin.svg';
import twitterIcon from '../../../assets/img/logo/twitter.svg';

import './BannerToken.scss';
import { connect } from 'react-redux';

import SpinnerUnopad from '../../UPSpinnerUnopad/UPSpinnerUnopad';

function BannerToken({ ...props }) {
  const {
    project
  } = props;

  console.log("project", project);
  if(project){
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
              {project.name}
            </Col>
          </Row>
          <Row className="text-white text-fs-body-md mt-4">
            <Col lg={4} md={6}>
              { project.explanation_text}
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
  else{
    return <SpinnerUnopad/>
  }
}
const mapStateToProps = (state) => {
  return {
    project: state.projectReducer.project,
  };
};

export default connect(mapStateToProps)(BannerToken);
