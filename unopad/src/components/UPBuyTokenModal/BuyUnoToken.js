/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import unopad_token_abi from '../../helpers/unopad_token';
import unopad_presale_abi from '../../helpers/unopad_presale';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { setLoadingAction } from '../../store/loading/loadingActions';
import * as loadingActionTypes from '../../store/loading/loadingActionTypes';
import wallet from '../../helpers/wallet';
import UPTransactions from '../UPTransactions/UPTransactions';
import Spinner from 'react-bootstrap/Spinner';
import './UPBuyTokenModal.scss';
import { FloatingLabel, Form } from 'react-bootstrap';

function BuyUnoToken({ ...props }) {
  const { balance_, signerAddress, token, setLoading, isLoading , project } = props;
  const [txs, setTxs] = useState([]);
  const [unoTokenInputValue, setUnoTokenInputValue] = useState({
    UnoTokenAmount: 1,
    etherValue: 0.001,
  });
  console.log("asda",project)
  const UnoTokenOnChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name == 'etherValue') {
      const unoTokenValue = value * 1000;
      unoTokenInputValue.UnoTokenAmount = unoTokenValue;
      unoTokenInputValue.etherValue = value;
      setUnoTokenInputValue({ ...unoTokenInputValue });
    } else if (name == 'UnoTokenAmount') {
      const etherValue = value / 1000;
      unoTokenInputValue.UnoTokenAmount = value;
      unoTokenInputValue.etherValue = etherValue;
      setUnoTokenInputValue({ ...unoTokenInputValue });
    }
  };
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const unopad_token = new ethers.Contract(project.token.address, unopad_token_abi, provider);

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
  }, []);

  const buyToken = async (e) => {
    e.preventDefault();
    setTxs([]);
    setLoading({ key: loadingActionTypes.BUY_UNOTOKEN_LOADING, isLoading: true });
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const web3 = new Web3(window.ethereum);
    await wallet.controlAndSwitchOrAddNetwork();
    await window.ethereum.enable();
    const unopad_token = new web3.eth.Contract(unopad_token_abi, project.token.address);
    const unopad_presale = new web3.eth.Contract(
      unopad_presale_abi,
      project.token.presale_contract.contract_address,
    );
    const etherMiktari = data.get('etherValue');
    try {
      await unopad_presale.methods.buy().send({
        from: signerAddress,
        to: project.token.presale_contract.contract_address,
        data: web3.eth.abi.encodeFunctionSignature('whitdrawETH()'),
        value: web3.utils.toWei(etherMiktari, 'ether'),
      });
      wallet.getMyBalance(project.token.address);
      setLoading({ key: loadingActionTypes.BUY_UNOTOKEN_LOADING, isLoading: false });
      Swal.fire({
        icon: 'success',
        text: 'Transaction succeed',
      });
    } catch (err) {
      if (err?.receipt?.transactionHash) {
        Swal.fire({
          icon: 'error',
          title: 'Transaction is Failed',
          // eslint-disable-next-line max-len, no-template-curly-in-string
          html:
            '<a href=https://testnet.bscscan.com/tx/' +
            err.receipt.transactionHash +
            " target='_blank'> Check Detail Transaction !</a>",
        });
        setLoading({ key: loadingActionTypes.BUY_UNOTOKEN_LOADING, isLoading: false });
      } else {
        Swal.fire({
          icon: 'warning',
          text: err.message,
        });
        setLoading({ key: loadingActionTypes.BUY_UNOTOKEN_LOADING, isLoading: false });
      }
    }
  };
  const Transfer_txs = [txs];
  return (
    <>
      <form className="m-0" onSubmit={buyToken}>
        <div
          className="credit-card w-full lg:w-3/4 sm:w-auto 
          shadow-lg mx-auto rounded-xl"
        >
          <main className="px-4">
          <p className="d-flex justify-content-center text-fs-head-md">Buy Token</p>{' '}
            <div className="mx-3">
              <div className="my-3">
              <p className="d-flex text-fs-head-xxs">Ether Value</p>{' '}
                <FloatingLabel label="Ether Value" className="mb-3">
                  <Form.Control
                    type="number"
                    name="etherValue"
                    className="input input-bordered text-fs-body-md text-t-body-color bg-light"
                    placeholder="Ether Value"
                    min="0.001"
                    step="0.001"
                    value={unoTokenInputValue.etherValue}
                    onChange={UnoTokenOnChangeHandler}
                    disabled={isLoading?.[loadingActionTypes.BUY_UNOTOKEN_LOADING]}
                  />
                </FloatingLabel>
                <p className="d-flex  
                text-fs-head-xxs">Uno Token Amount</p>{' '}
                <FloatingLabel label="Uno Token Amount" className="mb-3">
                  <Form.Control
                    type="number"
                    name="UnoTokenAmount"
                    id="UnoTokenAmount"
                    className="input input-bordered text-fs-body-md text-t-body-color bg-light"
                    placeholder="UnoTokenAmount"
                    value={unoTokenInputValue.UnoTokenAmount}
                    onChange={UnoTokenOnChangeHandler}
                    min="1"
                    step="1"
                    disabled={isLoading?.[loadingActionTypes.BUY_UNOTOKEN_LOADING]}
                  />
                </FloatingLabel>
              </div>
            </div>
          </main>
          <footer className="d-flex justify-content-center p-2">
            <button
              type="submit"
              className="btn btn-primary d-flex justify-content-center"
              disabled={isLoading?.[loadingActionTypes.BUY_UNOTOKEN_LOADING]}
            >
              {' '}
              {!isLoading?.[loadingActionTypes.BUY_UNOTOKEN_LOADING] ? (
                'BuyToken'
              ) : (
                <div className="d-flex align-items-center justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden"></span>
                  </Spinner>
                  <span className="ml-2">Pending Transaction...</span>
                </div>
              )}
            </button>
          </footer>
          
        </div>
      </form>
      <UPTransactions {...Transfer_txs} />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    provider2: state.walletReducer.provider2,
    project: state.projectReducer.project,
    signer: state.walletReducer.signer,
    signerAddress: state.walletReducer.signerAddress,
    web3: state.walletReducer.web3,
    erc20_: state.walletReducer.erc20_,
    balance_: state.walletReducer.balance_,
    contractAddress: state.walletReducer.contractAddress,
    token: state.tokenReducer.token,
    isLoading: state.loadingReducer.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (payload) => {
      dispatch(setLoadingAction(payload));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BuyUnoToken);
