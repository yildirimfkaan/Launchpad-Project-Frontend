/* eslint-disable max-len */

import React from 'react';
import { Nav } from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import wallet from '../../helpers/wallet';
import { WalletConnectModalAction } from '../../store/wallet/walletActions';
import './UPWalletConnectModal.scss';
import metamaskIcon from '../../assets/img/logo/metamask-icon.png';
import coinbaseIcon from '../../assets/img/logo/coinbase.png';
import trustwalletIcon from '../../assets/img/logo/trustwallet.png';

function WalletConnectModal({ ...props }) {
  const { WalletConnectModal, WalletConnectModalRequest } = props;

  const handleClose = () => {
    WalletConnectModalRequest(false);
  };

  return (
    <>
      <Modal show={WalletConnectModal} onHide={handleClose} size="lg" centered>
        <Modal.Header className="border-0" closeButton></Modal.Header>
        <Modal.Body>
          <div className="account-div text-fs-head-sm mb-4 ms-4 text-t-head-color">
            Connect Wallet{' '}
          </div>
          <Nav.Link onClick={() => wallet.connectWallet('metamask')}>
            <div className="d-flex modal-row mx-4">
              <div className="d-flex align-items-center p-2">
                <img className="wallet-icon ms-2" alt="metamask-icon" src={metamaskIcon} />
                <span className="ms-4 text-fs-head-sm text-t-head-color">Metamask</span>
              </div>
            </div>
          </Nav.Link>

          <Nav.Link onClick={() => wallet.connectWallet('coinbase')}>
            <div className="d-flex modal-row align-items-center mx-4">
              <div className="d-flex align-items-center">
                <img className="wallet-icon ms-2" alt="coinbase-icon" src={coinbaseIcon} />
                <span className="ms-4 text-fs-head-sm text-t-head-color">Coinbase</span>
              </div>
              <div className=" ms-auto p-2 new-logo px-3 me-1 d-flex align-items-center text-fs-body-sm">
                New
              </div>
            </div>
          </Nav.Link>
          {/* <Nav.Link onClick={() => wallet.connectWallet()}> */}
            <div className="d-flex modal-row align-items-center mx-4">
              <div className="d-flex align-items-center">
                <img className="wallet-icon ms-2" alt="trustwallet-icon" src={trustwalletIcon} />
                <span className="ms-4 text-fs-head-sm text-t-head-color">Trust Wallet</span>
              </div>
              <div className=" ms-auto p-2 coming-soon-logo px-3 me-1 d-flex align-items-center text-fs-body-sm">
                Coming Soon
              </div>
            </div>
          {/* </Nav.Link> */}
        </Modal.Body>
        {/* <div className=" ms-auto p-2 new-logo px-3 me-1 d-flex align-items-center text-fs-body-sm ">
          New
        </div>
        <div className=" ms-auto p-2 coming-soon-logo px-3 me-1 d-flex align-items-center text-fs-body-sm">
          Coming Soon
        </div> */}
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
