import * as types from './walletActionTypes';

const initialState = {
  provider: null,
  accounts: null,
  ethereum: null,

  walletAccountHistory: null,
  walletAccountHistoryModal: false,

  walletAccountDetail: null,
  walletAccountDetailModal: false,

  WalletConnect: null,
  WalletConnectModal: false,

  walletInfo: null,
  networkInfo: null,

  provider2: null,
  signer: null,
  signerAddress: null,
  web3: null,
  erc20_: null,
  balance_: null,
  contractAddress: null,
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
        accounts: action?.payload?.accounts ? Object.assign({}, action.payload.accounts) : null,
        ethereum: action?.payload?.ethereum ? Object.assign({}, action.payload.ethereum) : null,
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
        balance_: action?.payload?.balance_ ? action.payload.balance_.toString() : null,
      };
    case types.WALLET_ACCOUNT_HISTORY_DATA:
      return {
        ...state,

        walletAccountHistory: action?.payload ? Object.assign([], action.payload) : null,
      };
    case types.WALLET_ACCOUNT_HISTORY_ERROR:
      return {
        ...state,

        error: { type: types.WALLET_ACCOUNT_HISTORY_ERROR, data: action.payload },
      };
    case types.WALLET_ACCOUNT_HISTORY_MODAL:
      return {
        ...state,

        walletAccountHistoryModal: action?.payload,
      };
    case types.WALLET_ACCOUNT_DATA:
      return {
        ...state,
        accounts: action.payload ? Object.assign([], action.payload) : null,
      };
    case types.WALLET_ACCOUNT_DETAIL_DATA:
      return {
        ...state,

        walletAccountDetail: action?.payload ? Object.assign([], action.payload) : null,
      };
    case types.WALLET_ACCOUNT_DETAIL_ERROR:
      return {
        ...state,

        error: { type: types.WALLET_ACCOUNT_DETAIL_ERROR, data: action.payload },
      };
    case types.WALLET_ACCOUNT_DETAIL_MODAL:
      return {
        ...state,

        walletAccountDetailModal: action?.payload,
      };
    case types.WALLET_CONNECT_MODAL_DATA:
      return {
        ...state,

        WalletConnect: action?.payload ? Object.assign([], action.payload) : null,
      };
    case types.WALLET_CONNECT_MODAL_ERROR:
      return {
        ...state,

        error: { type: types.WALLET_CONNECT_MODAL_ERROR, data: action.payload },
      };
    case types.WALLET_CONNECT_MODAL:
      return {
        ...state,

        WalletConnectModal: action?.payload,
      };
    case types.WALLET_INFO_DATA:
      return {
        ...state,

        walletInfo: action?.payload ,
      };
    case types.WALLET_INFO_ERROR:
      return {
        ...state,

        error: { type: types.WALLET_INFO_ERROR, data: action.payload },
      };
    case types.NETWORK_INFO_DATA:
      return {
        ...state,

        networkInfo: action?.payload ? Object.assign([], action.payload) : null,
      };
    case types.NETWORK_INFO_ERROR:
      return {
        ...state,

        error: { type: types.NETWORK_INFO_ERROR, data: action.payload },
      };

    default:
      return state;
  }
};
