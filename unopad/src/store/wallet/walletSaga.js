import {  put, all, call } from 'redux-saga/effects';
// import * as types from './walletActionTypes';
import * as actions from './walletActions';
import * as alert from '../alert/alertActions';
import Web3Modal from 'web3modal';
import { providerOptions } from '../../helpers/web3modal/providerOptions'
import { ethers } from 'ethers';

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});


function* connectWalletSaga() {
  try {
    const provider  = yield call(web3Modal.connect);
    console.log("saga provider",provider)
    const library = yield call (new ethers.providers.Web3Provider,provider);
    const accounts = yield call(library.listAccounts)
    const network = yield call(library.getNetwork)
    const payload = {
        provider:provider.data,
        library,
        accounts:accounts.data,
        network:network.data,

    }
    console.log(payload)
    yield put(actions.connectWalletData(payload));
    yield put(
      alert.setAlertAction({
        text: 'Wallet Connected',
        color: 'success',
      }),
    );

  } catch (e) {
    // yield put(
    //   alert.setAlertAction({
    //     text: e?.response?.data?.detail,
    //     color: 'danger',
    //   }),
    // );
    console.error(e)
    yield put(actions.connectWalletError(e));
  }
}
// function* disconnectWalletSaga() {
  
//   yield put(actions.disconnectWallet());
  
// }


function* watchWallet() {
  // yield takeEvery(types.CONNECT_WALLET_REQUEST, connectWalletSaga);
}
function* watchDisconnectWallet() {
  // yield takeEvery(types.DISCONNECT_WALLET_REQUEST, disconnectWalletSaga);
}


export function* walletSaga() {
  yield all([
    watchWallet(),
    watchDisconnectWallet(),
  ]);
}
