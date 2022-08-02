import { ethers } from 'ethers';
import store from '../store';
import * as types from '../store/wallet/walletActionTypes';
import Web3 from 'web3';
import erc20abi from '../helpers/abi';
import * as loadingActionTypes from '../store/loading/loadingActionTypes';
// import { setLoading } from '../store/loading/loadingActions';

async function connectWallet() {
  try {
    const web3Modal = store.getState().walletReducer.web3Modal;
    const provider = await web3Modal.connect();
    console.log('nw provider', provider);
    const library = new ethers.providers.Web3Provider(provider);
    const accounts = await library.listAccounts();
    const network = await library.getNetwork();
    const payload = {
      provider,
      library,
      accounts,
      network,
    };
    store.dispatch({ type: types.CONNECT_WALLET_DATA, payload });
  } catch (error) {
    store.dispatch({ type: types.CONNECT_WALLET_ERROR, payload: error });
  }
}
async function disconnectWallet() {
  const web3Modal = store.getState().walletReducer.web3Modal;
  await web3Modal.clearCachedProvider();
  store.dispatch({ type: types.CONNECT_WALLET_DATA, payload: null });
  console.log('disconnected');
}

async function getMyBalance(contractAddress) {
  try {
    console.log("0")
    store.dispatch({
      type: loadingActionTypes.SET_LOADING,
      payload: { key: loadingActionTypes.GET_MY_BALANCE_LOADING, isLoading: true },
    });
    console.log("1")
    const provider2 = new ethers.providers.Web3Provider(window.ethereum);
    await provider2.send('eth_requestAccounts', []);

    const signer = await provider2.getSigner();
    const signerAddress = await signer.getAddress();

    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const erc20_ = new web3.eth.Contract(erc20abi, contractAddress);

    const balance_ = await erc20_.methods.balanceOf(signerAddress).call();

    const payload = {
      provider2,
      signer,
      signerAddress,
      web3,
      erc20_,
      balance_,
      contractAddress,
    };
    console.log("2")
    store.dispatch({ type: types.GET_MY_BALANCE_DATA, payload });
    store.dispatch({
      type: loadingActionTypes.SET_LOADING,
      payload: { key: loadingActionTypes.GET_MY_BALANCE_LOADING, isLoading: false },
    });
    console.log('getmybalance', payload);
  } catch (error) {
    store.dispatch({ type: types.GET_MY_BALANCE_ERROR, payload: error });
  }
}

export default { connectWallet, disconnectWallet, getMyBalance };
