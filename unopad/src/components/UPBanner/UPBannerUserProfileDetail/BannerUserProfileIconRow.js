import { Col, Row } from 'react-bootstrap';
import MailActive from '../../../assets/img/svg-icons/mail-active.svg';
import MailDisabled from '../../../assets/img/svg-icons/mail-passive.svg';
import KycDisabled from '../../../assets/img/svg-icons/key-passive.svg';
import WalletActive from '../../../assets/img/svg-icons/wallet-active.svg';
import WalletDisabled from '../../../assets/img/svg-icons/wallet-passive.svg';

import './BannerUserProfileIconRow.scss';
import { connect } from 'react-redux';
import { checkUserVerified, checkUserWalletAccount } from '../../../helpers/verificationHelper';

function BannerUserProfileIconRow({ ...props }) {
  const { user, accounts } = props;
  return (
    <>
      <Row className="text-white text-fs-title-md mt-4">
        <Col lg={12} md={12}>
          User Profile
        </Col>
      </Row>
      <Row className="text-white text-fs-body-md user-profile-detail-banner-row">
        <Col sm={12} md={4}>
          <div>
            {checkUserVerified(user) ? (
              <a className="user-profile-detail-banner-icon text-white" href="/profile#profile">
                <img alt="be" src={MailActive} />
                <div className="mt-3">E-Mail Verification</div>
              </a>
            ) : (
              <a className="user-profile-detail-banner-icon text-white" href="/profile#profile">
                <img alt="be" src={MailDisabled} />
                <div className="mt-3">E-Mail Verification</div>
              </a>
            )}
          </div>
        </Col>
        <Col sm={12} md={4}>
          <div>
            <a className="user-profile-detail-banner-icon text-white" href="/profile#kyc">
              <img alt="be" src={KycDisabled} />
              <div className="mt-3">KYC Authentication</div>
            </a>
          </div>
        </Col>
        <Col sm={12} md={4}>
          <div>
            {checkUserWalletAccount(accounts) ? (
              <a className="user-profile-detail-banner-icon text-white" href="/profile#verify">
                <img alt="be" src={WalletActive} />
                <div className="mt-3">Wallet Verification</div>
              </a>
            ) : (
              <a className="user-profile-detail-banner-icon text-white" href="/profile#verify">
                <img alt="be" src={WalletDisabled} />
                <div className="mt-3">Wallet Verification</div>
              </a>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    accounts: state.walletReducer.accounts,
  };
};

export default connect(mapStateToProps)(BannerUserProfileIconRow);
