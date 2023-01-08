/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
// import unopad_token_abi from '../../helpers/unopad_token';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { setLoadingAction } from '../../store/loading/loadingActions';
import * as loadingActionTypes from '../../store/loading/loadingActionTypes';
import wallet from '../../helpers/wallet';
// import UPTransactions from '../UPTransactions/UPTransactions';
import Spinner from 'react-bootstrap/Spinner';
import './UPSwapTokenModal.scss';
import { Form } from 'react-bootstrap';
import { abiRequestAction } from '../../store/abi/abiActions';
import { swapTokenModalAction } from '../../store/token/tokenActions';
import { transactionRequest } from '../../store/transaction/transactionActions';

function SwapUnoToken({ ...props }) {
  const {
    balance_,
    signerAddress,
    token,
    setLoading,
    isLoading,
    project,
    unopadProject,
    abiHistoryRequest,
    abiHistory,
    swapTokenModalRequest,
    transactionRequest,
  } = props;
  const [txs, setTxs] = useState([]);
  const [unoTokenInputValue, setUnoTokenInputValue] = useState({
    UnoTokenAmount: 1,
    etherValue: 1,
  });

  const handleAbi = () => {
    abiHistoryRequest();
  };
  const UnoTokenOnChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name == 'etherValue') {
      const unoTokenValue = value;
      unoTokenInputValue.UnoTokenAmount = unoTokenValue;
      unoTokenInputValue.etherValue = value;
      setUnoTokenInputValue({ ...unoTokenInputValue });
    } else if (name == 'UnoTokenAmount') {
      const etherValue = value;
      unoTokenInputValue.UnoTokenAmount = value;
      unoTokenInputValue.etherValue = etherValue;
      setUnoTokenInputValue({ ...unoTokenInputValue });
    }
  };
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });
  const closeModal = () => {
    swapTokenModalRequest(false);
  };
  useEffect(() => {
    if (abiHistory?.[0]?.[project?.token.symbol + '_abi']) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const unopad_token = new ethers.Contract(
        project?.token.address,
        abiHistory?.[0]?.[project?.token.symbol + '_abi'],
        provider,
      );

      try {
        unopad_token.on('Transfer', (from, to, amount, event) => {
          setTxs((currentTxs) => [
            ...currentTxs,
            {
              txHash: event.transactionHash,
              from,
              to,
              amount: String(amount),
            },
          ]);
        });
      } catch (e) {
        console.log('error', e);
      }
      return () => {
        unopad_token.removeAllListeners();
      };
    }
  }, [abiHistory, project]);

  useEffect(() => {
    handleAbi();
  }, []);
  const swapToken = async (e) => {
    e.preventDefault();
    setTxs([]);
    setLoading({ key: loadingActionTypes.SWAP_TOKEN_LOADING, isLoading: true });
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const web3 = new Web3(window.ethereum);
    await wallet.controlAndSwitchOrAddNetwork();
    await window.ethereum.enable();
    const unopad_token = new web3.eth.Contract(
      abiHistory?.[0]?.['UNOT_abi'],
      unopadProject?.token?.address,
    );
    const unopad_presale = new web3.eth.Contract(
      abiHistory?.[0]?.[project?.token.symbol + '_presale_abi'],
      project?.token.presale_contract.contract_address,
    );
    const etherMiktari = data.get('etherValue');
    const project_id = project?.id;
    const token_count = unoTokenInputValue.UnoTokenAmount;
    const token_address = project?.token.address;
    const transaction_time = new Date();

    const user_public_address = signerAddress;
    try {
      const approve_transaction = await unopad_token.methods
        .approve(
          project?.token.presale_contract.contract_address,
          web3.utils.toWei(String(Number(etherMiktari) * 10000), 'wei'),
        )
        .send({
          from: signerAddress,
          to: project?.token.presale_contract.contract_address,
          data: web3.eth.abi.encodeFunctionSignature('whitdrawETH()'),
        });
      setLoading({ key: loadingActionTypes.SWAP_TOKEN_LOADING, isLoading: false });
      setLoading({ key: loadingActionTypes.BUY_UNOTOKEN_LOADING, isLoading: true });
      const transaction = await unopad_presale.methods
        .swap(web3.utils.toWei(String(Number(etherMiktari) * 10000), 'wei'))
        .send({
          from: signerAddress,
          to: project?.token.presale_contract.contract_address,
          data: web3.eth.abi.encodeFunctionSignature('whitdrawETH()'),
        });
      wallet.getMyBalance(project?.token.address);
      const transaction_status = transaction.status;
      const payload2 = {
        project_id,
        token_count,
        user_public_address,
        token_address,
        transaction_time,
        transaction_status,
      };

      transactionRequest(payload2);

      Swal.fire({
        icon: 'success',
        iconColor: '#E4007D',
        text: 'Transaction succeed',
        confirmButtonColor: '#E4007D',
        html:
          '<a href=https://testnet.bscscan.com/tx/' +
          transaction.transactionHash +
          " target='_blank'> Check Detail Transaction !</a>",
      }).then(closeModal);
    } catch (err) {
      console.error(err);

      if (err?.receipt?.transactionHash) {
        Swal.fire({
          icon: 'error',
          iconColor: '#E4007D',
          title: 'Transaction is Failed',
          confirmButtonColor: '#E4007D',
          // eslint-disable-next-line max-len, no-template-curly-in-string
          html:
            '<a href=https://testnet.bscscan.com/tx/' +
            err.receipt.transactionHash +
            " target='_blank'> Check Detail Transaction !</a>",
        }).then(closeModal);
        setLoading({ key: loadingActionTypes.SWAP_TOKEN_LOADING, isLoading: false });
        setLoading({ key: loadingActionTypes.BUY_UNOTOKEN_LOADING, isLoading: false });
        const transaction_status = false;
        const payload2 = {
          project_id,
          token_count,
          user_public_address,
          token_address,
          transaction_time,
          transaction_status,
        };
        transactionRequest(payload2);
      } else {
        Swal.fire({
          icon: 'warning',
          iconColor: '#E4007D',
          confirmButtonColor: '#E4007D',
          text: err.message,
        }).then(closeModal);
        setLoading({ key: loadingActionTypes.SWAP_TOKEN_LOADING, isLoading: false });
        setLoading({ key: loadingActionTypes.BUY_UNOTOKEN_LOADING, isLoading: false });
      }
    }
  };
  return (
    <>
      <form className="m-0" onSubmit={swapToken}>
        <div
          className="credit-card w-full lg:w-3/4 sm:w-auto 
          shadow-lg mx-auto rounded-xl"
        >
          <main className="px-4">
            <p className="d-flex justify-content-center text-fs-head-md">Swap Token</p>{' '}
            <div className="mx-3">
              <div className="my-3">
                <p className="d-flex text-fs-head-xxs">{project?.token.symbol} Amount</p>{' '}
                <Form.Control
                  type="number"
                  name="etherValue"
                  className="input input-bordered text-fs-body-md text-t-body-color bg-light"
                  placeholder="Ether Value"
                  min="1"
                  step="1"
                  max="1000"
                  value={unoTokenInputValue.etherValue}
                  onChange={UnoTokenOnChangeHandler}
                  disabled={
                    isLoading?.[loadingActionTypes.SWAP_TOKEN_LOADING] ||
                    isLoading?.[loadingActionTypes.BUY_UNOTOKEN_LOADING]
                  }
                />
                <p
                  className="d-flex  
                text-fs-head-xxs mt-3"
                >
                  Uno Token Amount
                </p>{' '}
                <Form.Control
                  type="number"
                  name="UnoTokenAmount"
                  id="UnoTokenAmount"
                  className="input input-bordered text-fs-body-md text-t-body-color bg-light "
                  placeholder="UnoTokenAmount"
                  value={unoTokenInputValue.UnoTokenAmount}
                  onChange={UnoTokenOnChangeHandler}
                  min="1"
                  step="1"
                  max="1000"
                  disabled={
                    isLoading?.[loadingActionTypes.SWAP_TOKEN_LOADING] ||
                    isLoading?.[loadingActionTypes.BUY_UNOTOKEN_LOADING]
                  }
                />
              </div>
            </div>
          </main>
          <footer className="d-flex justify-content-center p-2">
            <button
              type="submit"
              className="btn btn-primary d-flex justify-content-center"
              disabled={
                isLoading?.[loadingActionTypes.SWAP_TOKEN_LOADING] ||
                isLoading?.[loadingActionTypes.BUY_UNOTOKEN_LOADING]
              }
            >
              {' '}
              {isLoading?.[loadingActionTypes.BUY_UNOTOKEN_LOADING] ? (
                <div className="d-flex align-items-center justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden"></span>
                  </Spinner>
                  <span className="ml-2">Pending Transaction...</span>
                </div>
              ) : isLoading?.[loadingActionTypes.SWAP_TOKEN_LOADING] ? (
                <div className="d-flex align-items-center justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden"></span>
                  </Spinner>
                  <span className="ml-2">Approving Transaction...</span>
                </div>
              ) : (
                'Swap Token'
              )}
            </button>
          </footer>
        </div>
      </form>
      {/* <UPTransactions {...Transfer_txs} /> */}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    provider2: state.walletReducer.provider2,
    project: state.projectReducer.project,
    unopadProject: state.projectReducer.unopadProject,
    signer: state.walletReducer.signer,
    signerAddress: state.walletReducer.signerAddress,
    web3: state.walletReducer.web3,
    erc20_: state.walletReducer.erc20_,
    balance_: state.walletReducer.balance_,
    contractAddress: state.walletReducer.contractAddress,
    token: state.tokenReducer.token,
    isLoading: state.loadingReducer.isLoading,
    abiHistory: state.abiReducer.abiHistory,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (payload) => {
      dispatch(setLoadingAction(payload));
    },
    abiHistoryRequest: (payload) => {
      dispatch(abiRequestAction(payload));
    },
    swapTokenModalRequest: (payload) => {
      dispatch(swapTokenModalAction(payload));
    },
    transactionRequest: (creds) => {
      dispatch(transactionRequest(creds));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SwapUnoToken);
