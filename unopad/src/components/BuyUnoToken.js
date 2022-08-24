import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import unopad_token_abi from '../helpers/unopad_token';
import unopad_presale_abi from '../helpers/unopad_presale';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { setLoadingAction } from '../store/loading/loadingActions';
import * as loadingActionTypes from '../store/loading/loadingActionTypes';
import wallet from '../helpers/wallet';
import Transactions from './Transactions';
import Spinner from 'react-bootstrap/Spinner';
function BuyUnoToken({ ...props }) {
  const { balance_, signerAddress, token, setLoading, isLoading } = props;
  const [txs, setTxs] = useState([]);
  const [contractListened, setContractListened] = useState();
  const contractUnoToken = '0x012b020b2479f42835fafd7037339b5bdba4c3fb';
  const contractUnoTokenPresale = '0x7e851d4f813c4508e80fb54cc51f7066d54ffefa';
  console.log('isloading', isLoading);
  console.log(
    'buyunotoken page loading value',
    isLoading?.[loadingActionTypes.BUY_UNOTOKEN_LOADING],
  );

  useEffect(() => {
    console.log('basladı');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractUnoToken = '0x012b020b2479f42835fafd7037339b5bdba4c3fb';
    const contractUnoTokenPresale = '0x7e851d4f813c4508e80fb54cc51f7066d54ffefa';
    console.log('unopadtoken', unopad_token_abi);
    const unopad_token = new ethers.Contract(contractUnoToken, unopad_token_abi, provider);

    try {
      unopad_token.on('Transfer', (from, to, amount, event) => {
        console.log(from, to, amount);
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
      console.log('listener started');
    } catch (e) {
      console.log('error', e);
    }
    setContractListened(unopad_token);
    return () => {
      console.log('listener bitti');
      contractListened.removeAllListeners();
    };
  }, []);

  const buyToken = async (e) => {
    e.preventDefault();
    setTxs([])
    setLoading({ key: loadingActionTypes.BUY_UNOTOKEN_LOADING, isLoading: true });
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const web3 = new Web3(window.ethereum);
    await wallet.controlAndSwitchOrAddNetwork();
    await window.ethereum.enable();
    const unopad_token = new web3.eth.Contract(unopad_token_abi, contractUnoToken);
    console.log('unopad_token_abi', unopad_token);

    const unopad_presale = new web3.eth.Contract(unopad_presale_abi, contractUnoTokenPresale);
    console.log('unopad_presale_contract', unopad_presale);

    const etherMiktari = data.get('etherValue');
    console.log('ether miktar', etherMiktari);
    try {
      await unopad_presale.methods.buy().send({
        from: signerAddress,
        to: contractUnoTokenPresale,
        data: web3.eth.abi.encodeFunctionSignature('whitdrawETH()'),
        value: web3.utils.toWei(etherMiktari, 'ether'),
      });
      wallet.getMyBalance(contractUnoToken);
      setLoading({ key: loadingActionTypes.BUY_UNOTOKEN_LOADING, isLoading: false });
      Swal.fire({
        icon: 'success',
        text: 'Transaction succeed',
      });
    } catch (err) {
      console.log('error message');
      console.dir(err);

      Swal.fire({
        icon: 'warning',
        text: err.message,
      });
      setLoading({ key: loadingActionTypes.BUY_UNOTOKEN_LOADING, isLoading: false });
    }
  };
  const Transfer_txs = [txs];
  return (
    <>
      <form className="m-4" onSubmit={buyToken}>
        <div
          className="credit-card w-full lg:w-3/4 sm:w-auto 
        shadow-lg mx-auto rounded-xl bg-white"
        >
          <main className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-gray-700 text-center">Buy Uno Token</h1>
            <div className="">
              <div className="my-3">
                <input
                  type="text"
                  name="etherValue"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Ether Value"
                />
              </div>
            </div>
          </main>
          <footer className="p-4">
            <button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
              disabled={isLoading?.[loadingActionTypes.BUY_UNOTOKEN_LOADING]}
            >
              {' '}
              {!isLoading?.[loadingActionTypes.BUY_UNOTOKEN_LOADING] ? (
                'BuyToken'
              ) : (<div className="d-flex align-items-center justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden"></span>
                </Spinner><span className='ml-2'>Pending Transaction...</span></div>
                
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

                    <th>UNOT Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{contractUnoTokenPresale}</td>

                    <td>{balance_}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
      <Transactions {...Transfer_txs} />
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
