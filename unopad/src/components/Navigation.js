import React from 'react';
import { connect } from 'react-redux';
import wallet from '../helpers/wallet';
import { logoutRequest } from '../store/account/userActions';
import WalletModal from './WalletAccountDetailModal';
import WalletAccountHistoryModal from './WalletAccountHistoryModal';

// import Button from 'react-bootstrap/Button';

function Navigation({ ...props }) {
  const { user, accounts } = props;
  // const [modalShow, setModalShow] = useState(false);
  const handleLogout = () => {
    props.dispatch(logoutRequest());
  };
  console.log('state', props);
  return (
    <React.Fragment>
      <link rel="shortcut icon" type="image/x-icon" href="assets/img/favicon.png" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
        crossorigin="anonymous"
      />
      <link rel="stylesheet" href="../assets/css/LineIcons.2.0.css" />
      <link rel="stylesheet" href="../assets/css/animate.css" />
      <link rel="stylesheet" href="../assets/css/main.css" />
      <link rel="stylesheet" href="../assets/css/navbar.css" />

      <div class="preloader d-none">
        <div class="loader">
          <div class="ytp-spinner">
            <div class="ytp-spinner-container">
              <div class="ytp-spinner-rotator">
                <div class="ytp-spinner-left">
                  <div class="ytp-spinner-circle"></div>
                </div>
                <div class="ytp-spinner-right">
                  <div class="ytp-spinner-circle"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header class="header navbar-area navbar-section">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="/Home">
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
                      <a class="page-scroll active" href="/Launchpad">
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
              </nav>
            </div>
          </div>
        </div>
      </header>
      <WalletAccountHistoryModal/>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    accounts: state.walletReducer.accounts,
  };
};

export default connect(mapStateToProps)(Navigation);
