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
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { mainColors } from '../../helpers/colors';
import UPIcons from '../UPIcons/UPIcons';
import metamaskIcon from './metamask-icon.png';

function WalletAccountDetailModal({ ...props }) {
  const {
    balance_,
    accounts,
    walletAccountHistoryRequest,
    walletAccountDetailModal,
    walletAccountDetailModalRequest,
    setAlert,
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
        outTimeMS: 3000,
      });
    } else {
      console.log('error occured');
    }
  };
  return (
    <Modal show={walletAccountDetailModal} onHide={handleClose} size="lg" centered>
      <Modal.Header className="border-0" closeButton></Modal.Header>
      <Modal.Body className="px-5">
        <div className="account-div text-fs-head-xs mb-3">Account </div>
        <Container className="body-div">
          <Row className='py-2'>
            <Col className="d-flex flex-column align-items-center">
              <div className="titles text-fs-body-sm">Balance</div>
              <div className="titles text-fs-head-xs">{balance_}</div>
            </Col>
            <Col className="d-flex flex-column align-items-center">
              <div className="titles text-fs-body-sm">Network</div>
              <div className="titles text-fs-head-xs">Newtork</div>
              
            </Col>
            <Col className="d-flex flex-column align-items-center">
              <div className="titles text-fs-body-sm"> Wallet</div>
              <div className="titles text-fs-head-xs"> Metamask</div>
            </Col>
          </Row>
        </Container>
        <div className="d-flex align-items-center py-2 mt-3 metamask-div">
          <img className="metamask-icon ms-2" alt="metamask-icon" src={metamaskIcon} />
          <span className="ms-3 text-fs-head-xs primary text-truncate" ref={accountSpanRef}>
            {accounts?.[0]}{' '}
          </span>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex align-items-center justify-content-center border-0">
        <Button
          variant="transparent"
          onClick={() => {
            copyAddress();
          }}
        >
          <UPIcons name="BiCopy" color={mainColors['t-body-color']} />
          <span className="text-t-body-color">Copy Address</span>
        </Button>
        <Button
          variant="transparent"
          target="_blank"
          href={`https://testnet.bscscan.com/address/` + accounts?.[0]}
        >
          <UPIcons name="BiExport" color={mainColors['t-body-color']} />
          <span className="text-t-body-color">View in Explorer</span>
        </Button>
        <Button variant="transparent" onClick={getWalletAccountHistory}>
          <UPIcons name="BiHistory" color={mainColors['t-body-color']} />
          <span className="text-t-body-color">History</span>
        </Button>
        <Button
          variant="transparent"
          onClick={() => {
            wallet.disconnectWallet();
            handleClose();
          }}
        >
          <UPIcons name="BiExit" color={mainColors['t-body-color']} />
          <span className="text-t-body-color">Disconnect</span>
        </Button>
      </Modal.Footer>
    </Modal>
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
