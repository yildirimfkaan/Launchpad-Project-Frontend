import React from 'react';
import { Dropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import wallet from '../../helpers/wallet';
import { logoutRequestAction } from '../../store/account/userActions';
import {
  walletAccountDetailModalAction,
  WalletConnectModalAction,
} from '../../store/wallet/walletActions';
import UPWalletAccountDetailModal from '../UPWalletAccountDetailModal/UPWalletAccountDetailModal';
// eslint-disable-next-line max-len
import UPWalletAccountHistoryModal from '../UPWalletAccountHistoryModal/UPWalletAccountHistoryModal';
import UPWalletConnectModal from '../UPWalletConnectModal/UPWalletConnectModal';
import { createBrowserHistory } from 'history';
import UPIcons from '../UPIcons/UPIcons';
import './UPNavbar.scss';
import { useEffect } from 'react';
import unopadLogo from '../../assets/img/logo/unopad-logo.png';
import unopadLogoWhite from '../../assets/img/logo/unopad-logo-white.png';
import { mainColors } from '../../helpers/colors';
import BannerHome from '../UPBanner/UPBannerHome/BannerHome';
import BannerLaunchpad from '../UPBanner/UPBannerLaunchpad/BannerLaunchpad';
import BannerSales from '../UPBanner/UPBannerSales/BannerSales';
import BannerToken from '../UPBanner/UPBannerToken/BannerToken';
import BannerUserProfileDetail from '../UPBanner/UPBannerUserProfileDetail/BannerUserProfileDetail';
// eslint-disable-next-line max-len
import BannerUserProfileDetailVerify from '../UPBanner/UPBannerUserProfileDetail/BannerUserProfileDetailVerify';
// eslint-disable-next-line max-len
import BannerUserProfileDetailKYC from '../UPBanner/UPBannerUserProfileDetail/BannerUserProfileDetailKYC';
import BannerStats from '../UPBanner/UPBannerStats/BannerStats';
import BannerFaq from '../UPBanner/UPBannerFaq/BannerFaq';
import BannerTermsOfService from '../UPBanner/UPBannerTermsOfService/BannerTermsOfService';
import BannerPrivacyPolicy from '../UPBanner/UPBannerPrivacyPolicy/BannerPrivacyPolicy';
// eslint-disable-next-line max-len
import BannerProjectInformation from '../UPBanner/UPBannerProjectInformation/BannerProjectInformation';
import BannerStakingHome from '../UPBanner/UPBannerStakingHome/BannerStakingHome';
import BannerStakingProject from '../UPBanner/UpBannerStakingProject/BannerStakingProject';

function Navigation({ ...props }) {
  const {
    user,
    accounts,
    balance_,
    walletAccountDetailModalRequest,
    logoutRequest,
    WalletConnectModalRequest,
    token,
    project,
    history,
    MainLayoutStatus,
  } = props;
  const pathname = history?.location.pathname;
  const PathnameHash = history?.location.hash;
  useEffect(() => {
    if (accounts?.[0]) {
      wallet.getMyBalance('0x091DeDB221136CB493955e101B279c677473621d');
    }
  }, [accounts]);

  const handleLogout = () => {
    logoutRequest();
  };
  const pathIsActive = (path) => {
    const history = createBrowserHistory();
    const pathname = history.location.pathname.split('/')[1];

    if (pathname.toLowerCase() === path.toLowerCase()) {
      return true;
    }
    return false;
  };
  const handleShow = () => {
    walletAccountDetailModalRequest(true);
  };
  const handleShowWallet = () => {
    WalletConnectModalRequest(true);
  };
  const BannerReturn = () => {
    if (pathname.toLowerCase() === '/') {
      return <BannerHome />;
    } else if (pathname.toLowerCase() === '/launchpad') {
      return <BannerLaunchpad />;
    } else if (pathname.toLowerCase() === '/sales') {
      return <BannerSales {...props} />;
    }
    else if (pathname.toLowerCase() === '/staking') {
      return <BannerStakingHome {...props} />;
    } 
    else if (pathname.toLowerCase().split('/')[1] === 'staking-project') {
      return <BannerStakingProject />;
    }    
    else if (pathname.toLowerCase().split('/')[1] === 'project') {
      return <BannerToken />;
    } else if (pathname.toLowerCase() === '/profile') {
      if (PathnameHash.toLowerCase() === '#profile') {
        return <BannerUserProfileDetail />;
      } else if (PathnameHash.toLowerCase() === '#verify') {
        return <BannerUserProfileDetailVerify />;
      } else if (PathnameHash.toLowerCase() === '#kyc') {
        return <BannerUserProfileDetailKYC />;
      } else {
        return <BannerUserProfileDetail />;
      }
    } else if (pathname.toLowerCase() === '/stats') {
      return <BannerStats />;
    } else if (pathname.toLowerCase() === '/faq') {
      return <BannerFaq />;
    } else if (pathname.toLowerCase() === '/termsofservice') {
      return <BannerTermsOfService />;
    } else if (pathname.toLowerCase() === '/privacypolicy') {
      return <BannerPrivacyPolicy />;
    } else if (pathname.toLowerCase() === '/projectinformation') {
      return <BannerProjectInformation />;
    } else {
      return '';
    }
  };

  const getBannerClassName = () => {
    if (MainLayoutStatus === 'True') {
      if (pathname.toLowerCase() === '/') {
        return 'banner-design';
      } 
      else if (pathname.toLowerCase() === '/launchpad') {
        return 'banner-design-launchpad';
      }
      else {
        return 'banner-design-profile';
      }
    } else {
      return 'banner-public';
    }
  };

  return (
    <Container fluid className={getBannerClassName()}>
      <Navbar bg="transparent" expand="lg" style={{ zIndex: 1 }}>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src={MainLayoutStatus === 'True' ? unopadLogoWhite : unopadLogo}
              alt="Logo"
              heigth={83}
              width={116}
            />
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className={MainLayoutStatus === 'True' ? 'navbar-dark' : 'navbar-light'}
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end flex-column align-items-end navbar-design"
          >
            <Nav className="ml-auto align-items-center py-3 pe-2" variant="pills">
              <Nav.Link
                as={Link}
                className={
                  'text-fs-head-xs text-white px-2 public-nav' +
                  (pathIsActive('launchpad') ? ' active' : '')
                }
                to="/launchpad"
              >
                Launchpad
              </Nav.Link>
              <Nav.Link
                as={Link}
                className={
                  'text-fs-head-xs text-white px-2 public-nav' +
                  (pathIsActive('sales') ? ' active' : '')
                }
                to="/sales"
              >
                Sales
              </Nav.Link>
              <Nav.Link
                as={Link}
                className={
                  'text-fs-head-xs text-white px-2 public-nav' +
                  (pathIsActive('staking') ? ' active' : '')
                }
                to="/staking"
                
              >
                Staking
              </Nav.Link>
              <Nav.Link
                as={Link}
                className={
                  'text-fs-head-xs text-muted px-2 public-nav' +
                  (pathIsActive('airdrop') ? ' active' : '')
                }
                to="#"
                disabled={true}
              >
                Airdrop
              </Nav.Link>
              {!user && (
                <>
                  <Nav.Link
                    as={Link}
                    className={
                      'text-fs-head-xs text-white px-2 public-nav' +
                      (pathIsActive('login') ? ' active' : '')
                    }
                    to="/login"
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    className={
                      'text-fs-head-xs text-white px-2 public-nav' +
                      (pathIsActive('signup') ? ' active' : '')
                    }
                    to="/signup"
                  >
                    Sign up
                  </Nav.Link>
                </>
              )}
              {!accounts?.[0] && (
                <Nav.Link
                  as={Link}
                  className={'text-fs-head-xs text-white px-2 public-nav'}
                  to="#"
                  onClick={handleShowWallet}
                >
                  Connect Wallet
                </Nav.Link>
              )}

              {user && (
                <Dropdown id="user-dropdown">
                  <Dropdown.Toggle
                    className="d-flex aling-items-center px-2"
                    variant="link"
                    id="user-dropdown-toggle"
                  >
                    <div className="bg-white py-1 px-2 shadow rounded">
                      <UPIcons name="MdPerson" color={mainColors['dark-light']} size="26" />
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
            {accounts?.[0] && (
              <div
                className={
                  'd-flex justify-content-center justify-content-lg-end rounded text-white ' +
                  'm-auto mx-lg-3' +
                  (balance_ !== null && balance_ !== undefined
                    ? ' bg-primary navbar-wallet-account-container'
                    : '')
                }
              >
                {balance_ !== null &&
                  balance_ !== undefined &&
                  (
                  (
                    <div
                      title={balance_}
                      className="d-none d-sm-flex align-items-center navbar-balance-button 
                bg-primary rounded px-2 justify-content-center"
                    >
                      <div className="navbar-balance-text text-truncate mr-1 py-1">
                        {' '}
                        {(balance_).slice(0, -4) + '.' + balance_.slice(-4, balance_.length)}
                      </div>
                      <span>UNT</span>
                    </div>
                  ))}

                <div
                  title={accounts?.[0]}
                  className="navbar-account-button
                bg-white rounded text-tertiary text-fs-head-xxs d-flex align-items-center px-2"
                  onClick={handleShow}
                >
                  <span className="text-truncate me-1 ps-3 pe-2 py-1">{accounts?.[0]}</span>
                  <UPIcons name="BiWallet" color={mainColors['primary']} size="24" />
                </div>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <UPWalletAccountDetailModal />
      <UPWalletAccountHistoryModal />
      <UPWalletConnectModal />
      {BannerReturn()}
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    accounts: state.walletReducer.accounts,
    token: state.tokenReducer.token,
    project: state.projectReducer.project,
    balance_: state.walletReducer.balance_,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logoutRequest: (payload) => {
      dispatch(logoutRequestAction(payload));
    },
    walletAccountDetailModalRequest: (payload) => {
      dispatch(walletAccountDetailModalAction(payload));
    },
    WalletConnectModalRequest: (payload) => {
      dispatch(WalletConnectModalAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
