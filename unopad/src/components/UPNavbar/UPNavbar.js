import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
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
import { mainColors } from '../../helpers/colors';

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
  } = props;
  useEffect(() => {
    if (accounts?.[0]) {
      wallet.getMyBalance('0x012b020b2479f42835FAFd7037339B5bDBa4C3Fb');
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
  return (
    <>
      <Navbar bg="transparent" expand="lg" style={{ zIndex: 1 }}>
        <Container>
          <Navbar.Brand as={Link} to="/home">
            <img src={unopadLogo} alt="Logo" heigth={83} width={116} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="ml-auto" variant="pills">
              <Nav.Link
                as={Link}
                className={
                  'text-fs-head-xs text-dark-light px-2' +
                  (pathIsActive('launchpad') ? ' active' : '')
                }
                to="/launchpad"
              >
                Launchpad
              </Nav.Link>
              <Nav.Link
                as={Link}
                className={
                  'text-fs-head-xs text-dark-light px-2' + (pathIsActive('sales') ? ' active' : '')
                }
                to="/sales"
              >
                Sales
              </Nav.Link>
              <Nav.Link
                as={Link}
                className={
                  'text-fs-head-xs text-muted px-2' + (pathIsActive('staking') ? ' active' : '')
                }
                to="#"
                disabled={true}
              >
                Staking
              </Nav.Link>
              <Nav.Link
                as={Link}
                className={
                  'text-fs-head-xs text-muted px-2' + (pathIsActive('airdrop') ? ' active' : '')
                }
                to="#"
                disabled={true}
              >
                Airdrop
              </Nav.Link>
              {!accounts?.[0] ? (
                <Button variant="outline-primary" onClick={handleShowWallet}>
                  Connect Wallet
                </Button>
              ) : (
                <ButtonGroup>
                  {balance_ !== null && balance_ !== undefined && (
                    <Button
                      title={balance_}
                      variant="outline-primary"
                      className="d-flex align-items-center navbar-balance-button"
                    >
                      <div className="navbar-balance-text text-truncate mr-1">{balance_}</div>
                      <span>UNT</span>
                    </Button>
                  )}
                  <Button
                    title={accounts?.[0]}
                    variant="outline-primary"
                    className="navbar-account-button text-truncate"
                    onClick={handleShow}
                  >
                    {accounts?.[0]}
                  </Button>
                </ButtonGroup>
              )}

              <Dropdown id="user-dropdown">
                <Dropdown.Toggle className="d-flex" variant="link" id="user-dropdown-toggle">
                  <UPIcons name="MdPerson" color={mainColors['dark-light']} size="26" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {user && (
                    <>
                      <Dropdown.Item as={Link} to="/profile">
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </>
                  )}
                  {!user && (
                    <>
                      <Dropdown.Item href="/login">Login</Dropdown.Item>
                      <Dropdown.Item href="/signup">Signup</Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <UPWalletAccountDetailModal />
      <UPWalletAccountHistoryModal />
      <UPWalletConnectModal />
    </>
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
