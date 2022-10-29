/* eslint-disable max-len */

import React from 'react';
import Button from 'react-bootstrap/Button';
import { Nav, Row, Col, Figure } from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import wallet from '../../helpers/wallet';
import { WalletConnectModalAction } from '../../store/wallet/walletActions';
import './UPWalletConnectModal.scss';

function WalletConnectModal({ ...props }) {
  const { WalletConnectModal, WalletConnectModalRequest } = props;

  const handleClose = () => {
    WalletConnectModalRequest(false);
  };

  return (
    <>
      <Modal show={WalletConnectModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Wallets</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Figure>
                <Nav.Link onClick={() => wallet.connectWallet()}>
                  <Figure.Image
                    width={150}
                    height={150}
                    src="https://1000logos.net/wp-content/uploads/2022/03/Coinbase-logo.png"
                  />
                </Nav.Link>
              </Figure>
            </Col>
            <Col>
              <Figure>
                <Nav.Link onClick={() => wallet.connectWallet()}>
                  <Figure.Image
                    width={150}
                    height={150}
                    src="https://1000logos.net/wp-content/uploads/2022/05/MetaMask-Emblem.png"
                  />
                </Nav.Link>
              </Figure>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer className="justify-content-center">
          <Button variant="danger" size="lg" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    WalletConnectModal: state.walletReducer.WalletConnectModal,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // connectWalletRequest: (payload) => {
    //   dispatch(connectWallet(payload));
    // },
    WalletConnectModalRequest: (payload) => {
      dispatch(WalletConnectModalAction(payload));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WalletConnectModal);
