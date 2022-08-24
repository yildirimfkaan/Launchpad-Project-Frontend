import { ethers } from 'ethers';
import store from '../store';
import * as types from '../store/wallet/walletActionTypes';
import Web3 from 'web3';
import erc20abi from '../helpers/abi';

// import * as loadingActionTypes from '../store/loading/loadingActionTypes';
// import { setLoading } from '../store/loading/loadingActions';





async function connectWallet() {
  try {
    console.log("kadirwalletcheck")
    const { ethereum } = window;

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const accounts = await ethereum.request({
       method: 'eth_requestAccounts',
    });

    // const library = new ethers.providers.Web3Provider(provider);
    const payload = {
      provider: provider,
      ethereum: ethereum,
      accounts: accounts,
    };
    store.dispatch({ type: types.CONNECT_WALLET_DATA, payload });
    localStorage.setItem('-walletlink:https://www.walletlink.org:Addresses', accounts);
    localStorage.setItem('WALLET_VERIFICATION_DATA',JSON.stringify({accounts}))
    store.dispatch({ type: types.WALLET_CONNECT_MODAL, payload:false });
  } catch (error) {
    console.log(error);
    store.dispatch({ type: types.CONNECT_WALLET_ERROR, payload: error });
  }
}
async function disconnectWallet() {
  localStorage.removeItem('WALLET_VERIFICATION_DATA');
  localStorage.removeItem('-walletlink:https://www.walletlink.org:Addresses');
  localStorage.removeItem('-walletlink:https://www.walletlink.org:DefaultChainId');
  localStorage.removeItem('-walletlink:https://www.walletlink.org:session:linked');
  localStorage.removeItem('-walletlink:https://www.walletlink.org:session:id');
  localStorage.removeItem('-walletlink:https://www.walletlink.org:DefaultJsonRpcUrl');
  localStorage.removeItem('-walletlink:https://www.walletlink.org:HasChainOverriddenFromRelay');
  localStorage.removeItem('-walletlink:https://www.walletlink.org:session:secret');
  localStorage.removeItem('-walletlink:https://www.walletlink.org:HasChainBeenSwitched');
  localStorage.removeItem('-walletlink:https://www.walletlink.org:IsStandaloneSigning');
  
  setTimeout(() => {
    store.dispatch({ type: types.CONNECT_WALLET_DATA, payload: null });
  }, 500);
  window.location.reload();
  console.log('disconnected');
}

async function controlAndSwitchOrAddNetwork() {
  const web3 = new Web3(window.ethereum);
  console.log("network version kontrol ",window.ethereum.networkVersion)
  const chainId = 97;
  if (window.ethereum.networkVersion !== chainId) {
    try {
      await web3.currentProvider.request({
        method: 'wallet_switchEthereumChain',
          params: [{ chainId: Web3.utils.toHex(chainId) }],
        });
    } catch (err) {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: 'Smart Chain - Testnet',
              chainId: web3.utils.toHex(chainId),
              rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
            },
          ],
        });
      }
    }
  }
}

async function getMyBalance(contractAddress) {
  try {
   
    // store.dispatch({
    //   type: loadingActionTypes.SET_LOADING,
    //   payload: { key: loadingActionTypes.GET_MY_BALANCE_LOADING, isLoading: true },
    // });
    
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
    
    store.dispatch({ type: types.GET_MY_BALANCE_DATA, payload });
    // store.dispatch({
    //   type: loadingActionTypes.SET_LOADING,
    //   payload: { key: loadingActionTypes.GET_MY_BALANCE_LOADING, isLoading: false },
    // });
    console.log('getmybalance', payload);
  } catch (error) {
    store.dispatch({ type: types.GET_MY_BALANCE_ERROR, payload: error });
  }
}




export default { connectWallet, disconnectWallet, getMyBalance, controlAndSwitchOrAddNetwork };
