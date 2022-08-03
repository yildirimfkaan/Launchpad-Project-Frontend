/* eslint-disable max-len */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import wallet from '../helpers/wallet';
import { walletAccountHistoryRequestAction } from '../store/wallet/walletActions';

 
 function WalletModal({...props}) {
  const {balance_,signerAddress,accounts,walletAccountHistoryRequest} = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  function getWalletAccountHistory(){
        walletAccountHistoryRequest();

  }

  return (
    <>
      <a variant="primary" onClick={handleShow}>
        Launch demo modal
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Wallet Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>Balance: {balance_} UNPTest</Modal.Body>
        <Modal.Body>
          {/* {console.log("2",balance_)} */}
          
          Newtork: Binance Wallet: Metamask
        </Modal.Body>
        <Modal.Body>Wallet Address : {accounts?.[0]} </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Copy Address
          </Button>
          <Button variant="secondary" href={`https://testnet.bscscan.com/address/` + accounts?.[0]}>
            View in Explorer
          </Button>
          <Button variant="secondary" onClick={getWalletAccountHistory}>
            History
          </Button>
          <Button
            variant="secondary"
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
    balance_:state.walletReducer.balance_,
    signerAddress:state.walletReducer.signerAddress,
    accounts: state.walletReducer.accounts,
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
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(WalletModal);
