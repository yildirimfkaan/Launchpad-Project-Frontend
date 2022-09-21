/* eslint-disable max-len */
import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import wallet from '../../helpers/wallet';
import { setAlertAction } from '../../store/alert/alertActions';
import {
  walletAccountDetailModalAction,
  walletAccountHistoryRequestAction,
} from '../../store/wallet/walletActions';
import './UPWalletAccountDetailModal.scss';

function WalletAccountDetailModal({ ...props }) {
  const {
    balance_,
    accounts,
    walletAccountHistoryRequest,
    walletAccountDetailModal,
    walletAccountDetailModalRequest,
    setAlert
  } = props;
  const accountSpanRef = useRef(null);

  const handleClose = () => {
    walletAccountDetailModalRequest(false);
  };

  function getWalletAccountHistory() {
    walletAccountHistoryRequest();
  }
  const copyAddress = () => {

    if (accountSpanRef?.current) {
      navigator.clipboard.writeText(accountSpanRef.current.textContent);
      setAlert({
        title: 'Success!',
        text: 'Wallet Address Copied To Clipboard',
        variant: 'success',
        outTimeMS: 3000
      })
      
    } else {
      console.log('error occured');
    }
    
  };
  return (
    <>
      <Modal show={walletAccountDetailModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Wallet Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>Balance: </b>
          {balance_}
        </Modal.Body>
        <Modal.Body>
          <b>Newtork: </b>
          Binance Wallet: Metamask
        </Modal.Body>
        <Modal.Body>
          <b>Wallet Address: </b> <span ref={accountSpanRef}>{accounts?.[0]} </span>
        </Modal.Body>
        <Modal.Footer className="d-flex align-items-center justify-content-center">
          <Button
            variant="primary"
            onClick={() => {
              copyAddress();
              
            }}
          >
            Copy Address
          </Button>
          <Button
            variant="primary"
            target="_blank"
            href={`https://testnet.bscscan.com/address/` + accounts?.[0]}
          >
            View in Explorer
          </Button>
          <Button variant="primary" onClick={getWalletAccountHistory}>
            History
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              wallet.disconnectWallet();
              handleClose();
            }}
          >
            Disconnect
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    balance_: state.walletReducer.balance_,
    accounts: state.walletReducer.accounts,
    walletAccountDetailModal: state.walletReducer.walletAccountDetailModal,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // connectWalletRequest: (payload) => {
    //   dispatch(connectWallet(payload));
    // },
    walletAccountHistoryRequest: (payload) => {
      dispatch(walletAccountHistoryRequestAction(payload));
    },
    setAlert: (payload) => {
      dispatch(setAlertAction(payload));
    },
    walletAccountDetailModalRequest: (payload) => {
      dispatch(walletAccountDetailModalAction(payload));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WalletAccountDetailModal);
