import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import BuyUnoToken from './BuyUnoToken';

import * as loadingActionTypes from '../../store/loading/loadingActionTypes';
import { buyTokenModalAction } from '../../store/token/tokenActions';

function UPBuyTokenModal({ ...props }) {
  const { buyTokenModal, buyTokenModalRequest, isLoading } = props;

  const handleClose = () => {
    if (isLoading?.[loadingActionTypes.BUY_UNOTOKEN_LOADING]) {
      return;
    }
    buyTokenModalRequest(false);
  };

  return (
    <Modal show={buyTokenModal} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="border-bottom-0 h4">
        Buy Uno Token
      </Modal.Header>
      <Modal.Body>
        <BuyUnoToken />
      </Modal.Body>
    </Modal>
  );
}
const mapStateToProps = (state) => {
  return {
    buyTokenModal: state.tokenReducer.buyTokenModal,
    isLoading: state.loadingReducer.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    buyTokenModalRequest: (payload) => {
      dispatch(buyTokenModalAction(payload));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UPBuyTokenModal);
