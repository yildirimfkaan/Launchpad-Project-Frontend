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
      <Modal.Header  className="border-bottom-0 mt-0 mb-0 p-2 bg-white">
      </Modal.Header>
      <Modal.Body className="px-0 py-0">
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
