import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



import './BannerUserProfileDetail.scss';
import BannerUserProfileIconRow from './BannerUserProfileIconRow';

function BannerUserProfileDetail() {
  return (
    <>
      <Container className="user-profile-detail-banner">
      <Row className="text-white text-fs-head-xs">
          <Col>
            <a className="text-white" href="/">
              Home
            </a>
            
            <a className="text-white" href="/profile">
            /User Profile
            </a>

            <a className="text-white" href="/profile#verify">
            /Verify
            </a>
            
          </Col>
        </Row>

        <BannerUserProfileIconRow/>
      </Container>
    </>
  );
}

export default BannerUserProfileDetail;
