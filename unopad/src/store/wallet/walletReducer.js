import * as types from './walletActionTypes';
import { providerOptions } from '../../helpers/web3modal/providerOptions';
import Web3Modal from 'web3modal';

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});

const initialState = {
  web3Modal,
  provider: null,
  library: null,
  accounts: null,
  network: null,

  provider2: null,
  signer: null,
  signerAddress: null ,
  web3: null,
  erc20_: null,
  balance_: null,
  contractAddress:null,
  error: {
    type: null,
    data: null,
  },
};

export const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CONNECT_WALLET_DATA:
      return {
        ...state,
        provider: action?.payload?.provider ? Object.assign({}, action.payload.provider) : null,
        library: action?.payload?.library ? Object.assign({}, action.payload.library) : null,
        accounts: action?.payload?.accounts ? Object.assign([], action.payload.accounts) : null,
        network: action?.payload?.network ? Object.assign({}, action.payload.network) : null,
      };
    case types.GET_MY_BALANCE_DATA:
      return {
        ...state,
        provider2: action?.payload?.provider2 ? Object.assign({}, action.payload.provider2) : null,
        signer: action?.payload?.signer ? Object.assign({}, action.payload.signer) : null,
        signerAddress: action?.payload?.signerAddress
          ? Object.assign([], action.payload.signerAddress)
          : null,
        web3: action?.payload?.web3 ? Object.assign({}, action.payload.web3) : null,
        erc20_: action?.payload?.erc20_ ? Object.assign({}, action.payload.erc20_) : null,
        balance_: action?.payload?.balance_ ?  action.payload.balance_.toString() : null,
      };

    // return {
    //   ...state,
    //   provider: null,
    //   library: null,
    //   accounts: null,
    //   network: null,
    //   error: {
    //     type: types.CONNECT_WALLET_ERROR,
    //     data: error,
    //   },
    // };

    case types.WALLET_ACCOUNT_DATA:
      return {
        ...state,
        accounts: action.payload ? Object.assign([], action.payload) : null,
      };

    default:
      return state;
  }
};
