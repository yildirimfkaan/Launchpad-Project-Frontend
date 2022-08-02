import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import wallet from '../helpers/wallet';

 function WalletModal({...props}) {
  const {balance_,signerAddress} = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          {console.log("2",balance_)}
          
          Newtork: Binance Wallet: Metamask
        </Modal.Body>
        <Modal.Body>Wallet Address : {signerAddress} </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Copy Address
          </Button>
          <Button variant="secondary" href={`https://testnet.bscscan.com/address/`}>
            View in Explorer
          </Button>
          <Button variant="secondary" href="/Txlist">
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
   
  };

};
export default connect(mapStateToProps)(WalletModal);
