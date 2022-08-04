import React from 'react';
import { Dropdown } from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import wallet from '../helpers/wallet';
import { logoutRequestAction } from '../store/account/userActions';
import { walletAccountDetailModalAction } from '../store/wallet/walletActions';
import WalletAccountDetailModal from './WalletAccountDetailModal';
import WalletAccountHistoryModal from './WalletAccountHistoryModal';
// import {BsPersonCircle} from 'react-icons';
// import Button from 'react-bootstrap/Button';
import { createBrowserHistory } from 'history';

function Navigation({ ...props }) {
  const { user, accounts, walletAccountDetailModalRequest, logoutRequest, h } = props;

  // const [modalShow, setModalShow] = useState(false);
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
  // function getWalletAccountDetail() {
  //   walletAccountDetailRequest();
  // }

  const handleShow = () => {
    walletAccountDetailModalRequest(true);
  };

  console.log('state', props);
  return (
    <>
      <Navbar bg="dark" expand="lg" style={{ zIndex: 1 }}>
        <Container>
          <Navbar.Brand 
          as = {Link}
          to="/home">
            <img src="assets/img/logo.svg" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto" variant="pills">
              <Nav.Link
                as = {Link}

                className={'text-white' + (pathIsActive('launchpad') ? ' active' : '')}
                to="/launchpad"
              >
                Launchpad
              </Nav.Link>
              <Nav.Link
                as = {Link}

                className={'text-white' + (pathIsActive('sales') ? ' active' : '')}
                to="/"
              >
                Sales
              </Nav.Link>
              <Nav.Link
               as = {Link}
                className={'text-white' + (pathIsActive('staking') ? ' active' : '')}
                to="/"
              >
                Staking
              </Nav.Link>
              <Nav.Link
               as = {Link}
                className={'text-white' + (pathIsActive('airdrop') ? ' active' : '')}
                to="/"
              >
                Airdrop
              </Nav.Link>
              {!accounts?.[0] ? (
                <Nav.Link
                  className="text-white"
                  variant="primary"
                  onClick={() => wallet.connectWallet()}
                >
                  Connect Wallet
                </Nav.Link>
              ) : (
                <Nav.Link className="text-white" onClick={handleShow}>
                  Wallet Account
                </Nav.Link>
              )}

              <Dropdown>
                <Dropdown.Toggle variant="link" id="dropdown-basic">
                  U
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="">Profile</Dropdown.Item>
                  {user && <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>}
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

      {/* <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="/home">
                  <img src="assets/img/logo.svg" alt="Logo" />
                </a>
                <button
                  class="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="toggler-icon"></span>
                  <span class="toggler-icon"></span>
                  <span class="toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                  <ul id="nav" class="navbar-nav ml-auto">
                    <li class="nav-item">
                      <a class="page-scroll active" href="/launchpad">
                        Launchpad
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="page-scroll" >
                        Sales
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="page-scroll" >
                        Staking
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="page-scroll" >
                        Airdrop
                      </a>
                    </li>
                    <li class="nav-item">
                      {!accounts?.[0] ? (
                        <a variant="primary" onClick={() => wallet.connectWallet()}>
                          Connect Wallet
                        </a>
                      ) : (
                        <WalletModal />
                      )}
                    </li>

                    {user && (
                      <li class="nav-item">
                        <a class="page-scroll" onClick={handleLogout}>
                          {' '}
                          Logout
                        </a>
                      </li>
                    )}
                    {!user && (
                      <>
                        <li class="nav-item">
                          <a class="page-scroll" href="/login">
                            Login
                          </a>
                        </li>
                        <li class="nav-item">
                          <a class="page-scroll" href="/signup">
                            SignUp
                          </a>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </nav> */}
      <WalletAccountDetailModal />
      <WalletAccountHistoryModal />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    accounts: state.walletReducer.accounts,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
