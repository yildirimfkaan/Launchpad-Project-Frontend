import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { swapTokenModalAction } from '../../store/project/projectActions';
import SwapToken from './SwapToken';
import './UPSwapTokenModal.scss';
import * as loadingActionTypes from '../../store/loading/loadingActionTypes';

function UPSwapTokenModal ({ ...props }) {
  const { swapTokenModal, swapTokenModalRequest, isLoading } = props;

  const handleClose = () => {
    if (isLoading?.[loadingActionTypes.SWAP_TOKEN_LOADING]) {
      return;
    }
    swapTokenModalRequest(false);
  };

  return (
    <Modal show={swapTokenModal} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="border-bottom-0 h4">Swap Token</Modal.Header>
      <Modal.Body>
        <SwapToken />
      </Modal.Body>
    </Modal>
  );
}
const mapStateToProps = (state) => {
  return {
    swapTokenModal: state.projectReducer.swapTokenModal,
    isLoading: state.loadingReducer.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    swapTokenModalRequest: (payload) => {
      dispatch(swapTokenModalAction(payload));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UPSwapTokenModal );
