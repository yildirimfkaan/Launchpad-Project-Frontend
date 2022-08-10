const initialState = {
  valueofCondition: false,
};

export const checkUserVerified = () => {
  return JSON.parse(localStorage.getItem('EMAIL_VERIFICATION_DATA'));
};
export const checkUserWalletAccount = () => {
  console.log("asdas",JSON.parse(localStorage.getItem('WALLET_VERIFICATION_DATA')))
  return JSON.parse(localStorage.getItem('WALLET_VERIFICATION_DATA'));
};
export const checkProject = () => {
  localStorage.setItem('PROJECT_VERIFICATION_DATA', JSON.stringify('true'));
  return JSON.parse(localStorage.getItem('PROJECT_VERIFICATION_DATA'));
};

export const checkAllConditionForStake = (state = initialState) => {
  console.log('girdi');
  console.log(
    'uservy',
    checkUserVerified(),
    'walletvy',
    checkUserWalletAccount(),
    'projectvy',
    checkProject(),
  );
  if (checkUserVerified() && checkUserWalletAccount() && checkProject()) {
    console.log('kontrol kısmı');
    state.valueofCondition = true;
    return state;
  }
  if (state.valueofCondition) {
    window.localStorage.setItem(
      'CONDITION_FOR_STAKE_VERIFICATION_DATA',
      JSON.stringify('valueofCondition'),
    );
    return JSON.parse(localStorage.getItem('CONDITION_FOR_STAKE_VERIFICATION_DATA'));
  } else {
    return false;
  }
};
