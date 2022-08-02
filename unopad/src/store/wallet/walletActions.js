import * as types from './walletActionTypes';

// /**
//  *
//  * 
//  */
// export const connectWallet = (payload) => {
//   console.log("action payload" , payload)
//   return {
//     type: types.CONNECT_WALLET_REQUEST,
//     payload,
//   };
// };
// /**
//  *
//  * 
//  */
export const connectWalletData = (payload) => {
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

// export const disconnectWallet = (payload) => {
//   return {
//     type: types.DISCONNECT_WALLET_REQUEST,
//     payload,
//   };
// };
/**
 *
 * 
 */
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





export const setWalletAccountData = (payload) => {
  return {
    type: types.WALLET_ACCOUNT_DATA,
    payload,
  };
};