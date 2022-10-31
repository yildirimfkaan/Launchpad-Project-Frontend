import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Registration from '../../../assets/img/logo/registration.png';
import KycActive from '../../../assets/img/logo/kyc-active.png';
import WalletDisabled from '../../../assets/img/logo/wallet-disabled.png';

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
                <div className="mt-3">Registration</div>
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
                <div className="mt-3">Verify C-Chain Wallet Ownership</div>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default BannerUserProfileDetail;
