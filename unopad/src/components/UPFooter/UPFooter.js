import React from 'react';
import { Col, Nav, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import unopadLogo from '../../assets/img/logo/unopad-logo.png';
import { mainColors } from '../../helpers/colors';
import {
  walletAccountDetailModalAction,
  WalletConnectModalAction,
} from '../../store/wallet/walletActions';
import UPIcons from '../UPIcons/UPIcons';
import './UPFooter.scss';

function Footer({ ...props }) {
  const { WalletConnectModalRequest, walletAccountDetailModalRequest, accounts } = props;

  return (
    <div className="d-flex flex-column my-5 py-5">
      <img className="mb-5 m-auto" alt="unopad-logo" src={unopadLogo} height={119} />
      <Row className="border-top border-bottom py-4">
        <Col xs="6" md="3" className="my-2">
          <Nav.Link as={Link} to="/#">
            <UPIcons name="FaLinkedin" color={mainColors['dark-light']} size="56" />
          </Nav.Link>
        </Col>
        <Col xs="6" md="3" className="my-2">
          <Nav.Link as={Link} to="/#">
            <UPIcons name="FaBehanceSquare" color={mainColors['dark-light']} size="56" />
          </Nav.Link>
        </Col>
        <Col xs="6" md="3" className="my-2">
          <Nav.Link as={Link} to="/#">
            <UPIcons name="FaTwitter" color={mainColors['dark-light']} size="56" />
          </Nav.Link>
        </Col>
        <Col xs="6" md="3" className="my-2">
          <Nav.Link as={Link} to="/#">
            <UPIcons name="FaYoutube" color={mainColors['dark-light']} size="56" />
          </Nav.Link>
        </Col>
      </Row>
      <Row className="text-center pt-5">
        <Col xs="6" md="2" className="my-2">
          <Nav.Link as={Link} className="text-dark-light text-fs-head-sm" to="/launchpad">
            Launchpad
          </Nav.Link>
        </Col>
        <Col xs="6" md="2" className="my-2">
          <Nav.Link as={Link} className="text-dark-light text-fs-head-sm" to="/sales">
            Sales
          </Nav.Link>
        </Col>
        <Col xs="6" md="2" className="my-2">
          <Nav.Link as={Link} className="text-dark-light text-fs-head-sm" to="/login">
            Login
          </Nav.Link>
        </Col>
        <Col xs="6" md="2" className="my-2">
          <Nav.Link
            className="text-dark-light text-fs-head-sm"
            onClick={() => {
              if (accounts?.[0]) {
                walletAccountDetailModalRequest(true);
              } else {
                WalletConnectModalRequest(true);
              }
            }}
          >
            Connect Wallet
          </Nav.Link>
        </Col>
        <Col xs="6" md="2" className="mt-2">
          <Nav.Link as={Link} className="text-dark-light text-fs-head-sm" to="/contact">
            Contact
          </Nav.Link>
        </Col>
        <Col xs="6" md="2" className="mt-2">
          <Nav.Link as={Link} className="text-dark-light text-fs-head-sm" to="/faq">
            FAQ
          </Nav.Link>
        </Col>
      </Row>
    </div>
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
    walletAccountDetailModalRequest: (payload) => {
      dispatch(walletAccountDetailModalAction(payload));
    },
    WalletConnectModalRequest: (payload) => {
      dispatch(WalletConnectModalAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
