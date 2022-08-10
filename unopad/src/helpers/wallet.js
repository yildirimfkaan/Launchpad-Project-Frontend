import { ethers } from 'ethers';
import store from '../store';
import * as types from '../store/wallet/walletActionTypes';
import Web3 from 'web3';
import erc20abi from '../helpers/abi';
import * as loadingActionTypes from '../store/loading/loadingActionTypes';
// import { setLoading } from '../store/loading/loadingActions';

async function connectWallet() {
  try {
    
    const {ethereum} = window;
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
   
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });
   
    // const library = new ethers.providers.Web3Provider(provider);
    const payload = {
      provider: provider,
      ethereum:ethereum,
      accounts:accounts,
    };
    store.dispatch({ type: types.CONNECT_WALLET_DATA, payload });
    console.log("walletjs accsss", accounts)
    console.log(payload,"payload")
    localStorage.setItem('WALLET_VERIFICATION_DATA',JSON.stringify({accounts}))
  } catch (error) {
    console.log(error)
    store.dispatch({ type: types.CONNECT_WALLET_ERROR, payload: error });
  }
}
async function disconnectWallet() {
  localStorage.removeItem('WALLET_VERIFICATION_DATA');
  setTimeout(() => {
    store.dispatch({ type: types.CONNECT_WALLET_DATA, payload: null });
  }, 500);
  
  
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
