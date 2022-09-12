import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Swal from 'sweetalert2';
import Spinner from 'react-bootstrap/Spinner';
import dynamic_presale_abi from '../../helpers/dynamic_presale';
import dynamic_token_abi from '../../helpers/dynamic_token';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { setLoadingAction } from '../../store/loading/loadingActions';
import * as loadingActionTypes from '../../store/loading/loadingActionTypes';
import wallet from '../../helpers/wallet';
import UPTransactions from '../UPTransactions/UPTransactions';
import './UPSwapTokenModal.scss';
import { FloatingLabel, Form } from 'react-bootstrap';

function SwapToken({ ...props }) {
  const { balance_, signerAddress, project, setLoading, isLoading } = props;
  const contractDynamicToken = project.project_token.token_address;

  const contractDynamicTokenPresale = project.project_token.presale_contract.contract_address;
  const [txs, setTxs] = useState([]);
  const [swapTokenInputValue, setSwapTokenInputValue] = useState({
    swapTokenAmount: 1,
    etherValue: 0.002,
  });

  const swapTokenOnChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name == 'etherValue') {
      const swapTokenValue = value * 500;
      swapTokenInputValue.swapTokenAmount = swapTokenValue;
      swapTokenInputValue.etherValue = value;
      setSwapTokenInputValue({ ...swapTokenInputValue });
    } else if (name == 'swapTokenAmount') {
      const etherValue = value / 500;
      swapTokenInputValue.swapTokenAmount = value;
      swapTokenInputValue.etherValue = etherValue;
      setSwapTokenInputValue({ ...swapTokenInputValue });
    }
  };

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const dynamic_token = new ethers.Contract(contractDynamicToken, dynamic_token_abi, provider);

    try {
      dynamic_token.on('Transfer', (from, to, amount, event) => {
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
      dynamic_token.removeAllListeners();
    };
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

    const dynamic_token = new web3.eth.Contract(dynamic_token_abi, contractDynamicToken);
    const dynamic_presale = new web3.eth.Contract(dynamic_presale_abi, contractDynamicTokenPresale);
    const etherMiktari = data.get('etherValue');
    try {
      await dynamic_presale.methods.swap().send({
        from: signerAddress,
        to: contractDynamicTokenPresale,
        data: web3.eth.abi.encodeFunctionSignature('whitdrawETH()'),
        value: web3.utils.toWei(etherMiktari, 'ether'),
      });
      wallet.getMyBalance(contractDynamicToken);
      setLoading({ key: loadingActionTypes.SWAP_TOKEN_LOADING, isLoading: false });
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
        setLoading({ key: loadingActionTypes.SWAP_TOKEN_LOADING, isLoading: false });
      } else {
        Swal.fire({
          icon: 'warning',
          text: err.message,
        });
        setLoading({ key: loadingActionTypes.SWAP_TOKEN_LOADING, isLoading: false });
      }
    }
  };
  const Transfer_txs = [txs];
  return (
    <>
      <form className="m-4" onSubmit={swapToken}>
        <div
          className="credit-card w-full lg:w-3/4 sm:w-auto 
        shadow-lg mx-auto rounded-xl bg-white"
        >
          <main className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-gray-700 text-center">Buy Token</h1>
            <div className="">
              <div className="my-3">
                <FloatingLabel label="Ether Value" className="mb-3">
                  <Form.Control
                    type="number"
                    name="etherValue"
                    className="input input-bordered block w-full focus:ring focus:outline-none"
                    placeholder="Ether Value"
                    min="0.002"
                    step="0.002"
                    onChange={swapTokenOnChangeHandler}
                    value={swapTokenInputValue.etherValue}
                    disabled={isLoading?.[loadingActionTypes.SWAP_TOKEN_LOADING]}
                  />
                </FloatingLabel>
                <FloatingLabel label="Swap Token Amount" className="mb-3">
                  <Form.Control
                    type="number"
                    name="swapTokenAmount"
                    className="input input-bordered block w-full focus:ring focus:outline-none"
                    placeholder="Swap Token Amount"
                    min="1"
                    step="1"
                    onChange={swapTokenOnChangeHandler}
                    value={swapTokenInputValue.swapTokenAmount}
                    disabled={isLoading?.[loadingActionTypes.SWAP_TOKEN_LOADING]}
                  />
                </FloatingLabel>
              </div>
            </div>
          </main>
          <footer className="p-4">
            <button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
              disabled={isLoading?.[loadingActionTypes.SWAP_TOKEN_LOADING]}
            >
              {' '}
              {!isLoading?.[loadingActionTypes.SWAP_TOKEN_LOADING] ? (
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
          <div className="px-4">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>From</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{signerAddress}</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>To</th>
                    {/* <th>Dynamic Token Balance</th> */}
                    <th>Token Total Supply</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{contractDynamicTokenPresale}</td>

                    <td>{project.project_token.token_total_supply}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
      <UPTransactions {...Transfer_txs} />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    provider2: state.walletReducer.provider2,
    signer: state.walletReducer.signer,
    signerAddress: state.walletReducer.signerAddress,
    web3: state.walletReducer.web3,
    erc20_: state.walletReducer.erc20_,
    balance_: state.walletReducer.balance_,
    contractAddress: state.walletReducer.contractAddress,
    project: state.projectReducer.project,
    isLoading: state.loadingReducer.isLoading,
    token: state.tokenReducer.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (payload) => {
      dispatch(setLoadingAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SwapToken);
