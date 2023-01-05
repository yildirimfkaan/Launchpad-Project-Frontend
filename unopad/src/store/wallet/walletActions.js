import * as types from './walletActionTypes';

export const connectWalletDataAction = (payload) => {
  return {
    type: types.CONNECT_WALLET_DATA,
    payload,
  };
};
export const connectWalletError = (payload) => {
  return {
    type: types.CONNECT_WALLET_ERROR,
    payload,
  };
};

export const disconnectWalletData = (payload) => {
  return {
    type: types.DISCONNECT_WALLET_DATA,
    payload,
  };
};
export const disconnectWalletError = (payload) => {
  return {
    type: types.DISCONNECT_WALLET_ERROR,
    payload,
  };
};

export const getMyBalanceData = (payload) => {
  return {
    type: types.GET_MY_BALANCE_DATA,
    payload,
  };
};
export const getMyBalanceError = (payload) => {
  return {
    type: types.GET_MY_BALANCE_ERROR,
    payload,
  };
};
export const walletAccountHistoryRequestAction = (payload) => {
  return {
    type: types.WALLET_ACCOUNT_HISTORY_REQUEST,
    payload,
  };
};
export const walletAccountHistoryDataAction = (payload) => {
  return {
    type: types.WALLET_ACCOUNT_HISTORY_DATA,
    payload,
  };
};
export const walletAccountHistoryErrorAction = (payload) => {
  return {
    type: types.WALLET_ACCOUNT_HISTORY_ERROR,
    payload,
  };
};
export const walletAccountHistoryModalAction = (payload) => {
  return {
    type: types.WALLET_ACCOUNT_HISTORY_MODAL,
    payload,
  };
};

export const setWalletAccountData = (payload) => {
  return {
    type: types.WALLET_ACCOUNT_DATA,
    payload,
  };
};

export const walletAccountDetailRequestAction = (payload) => {
  return {
    type: types.WALLET_ACCOUNT_DETAIL_REQUEST,
    payload,
  };
};
export const walletAccountDetailDataAction = (payload) => {
  return {
    type: types.WALLET_ACCOUNT_DETAIL_DATA,
    payload,
  };
};
export const walletAccountDetailErrorAction = (payload) => {
  return {
    type: types.WALLET_ACCOUNT_DETAIL_ERROR,
    payload,
  };
};
export const walletAccountDetailModalAction = (payload) => {
  return {
    type: types.WALLET_ACCOUNT_DETAIL_MODAL,
    payload,
  };
};

export const WalletConnectModalAction = (payload) => {
  return {
    type: types.WALLET_CONNECT_MODAL,
    payload,
  };
};

export const stakeNowButtonActivationAction = (payload) => {
  return {
    type: types.STAKE_NOW_ACTIVATION_BUTTON,
    payload,
  };
};
export const walletInfoDataAction = (payload) => {
  
  return {
    type: types.WALLET_INFO_DATA,
    payload,
  };
};
export const walletInfoErrorAction = (payload) => {
  return {
    type: types.WALLET_INFO_ERROR,
    payload,
  };
};
export const networkInfoRequest = (creds) => {
  return {
    
    type: types.NETWORK_INFO_REQUEST,
    creds,
  };
};
export const networkInfoDataAction = (payload) => {
  return {
    type: types.NETWORK_INFO_DATA,
    payload,
  };
};
export const networkInfoErrorAction = (payload) => {
  return {
    type: types.NETWORK_INFO_ERROR,
    payload,
  };
};