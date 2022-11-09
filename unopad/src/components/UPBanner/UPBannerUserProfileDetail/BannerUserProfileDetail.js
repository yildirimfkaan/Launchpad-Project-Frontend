import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Registration from '../../../assets/img/svg-icons/mail-active.svg';
import KycActive from '../../../assets/img/svg-icons/key-active.svg';
import WalletDisabled from '../../../assets/img/svg-icons/wallet-active.svg';

import './BannerUserProfileDetail.scss';

function BannerUserProfileDetail() {
  return (
    <>
      <Container className="user-profile-detail-banner">
        <Row className="text-white text-fs-head-xs">
          <Col>Home / User Profile / Profile Details</Col>
        </Row>
        <Row className="text-white text-fs-head-lg mt-4">
          <Col lg={12} md={12}>
            User Profile
          </Col>
        </Row>

        <Row className="text-white text-fs-body-md mt-4">
          <Col className="d-flex justify-content-end user-profile-detail-banner-icon">
            <ul>
              <li>
                <img alt="be" src={Registration} />
              </li>
              <li>
                <div className="mt-3">E-Mail Verification</div>
              </li>
            </ul>
          </Col>
          <Col className="d-flex justify-content-center user-profile-detail-banner-icon">
            <ul>
              <li>
                <img alt="be" src={KycActive} />
              </li>
              <li>
                <div className="mt-3">KYC Authentication</div>
              </li>
            </ul>
          </Col>
          <Col className="d-flex justify-content-start user-profile-detail-banner-icon">
            <ul>
              <li>
              <img alt="be" src={WalletDisabled} />
              </li>
              <li>
                <div className="mt-3">Wallet Verification</div>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default BannerUserProfileDetail;
