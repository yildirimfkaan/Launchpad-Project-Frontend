export const checkUserVerified = (user) => {
  return user?.is_active?.toString().toLowerCase() === 'true';
};
export const checkUserWalletAccount = (accounts) => {
  return accounts?.[0];
};
export const checkProject = (project) => {
  localStorage.setItem('PROJECT_VERIFICATION_DATA', JSON.stringify('true'));
  return JSON.parse(localStorage.getItem('PROJECT_VERIFICATION_DATA'));
};

export const checkAllConditionForStake = (user, accounts, isControlProject = false, project) => {
  if (
    checkUserVerified(user) &&
    checkUserWalletAccount(accounts) &&
    (!isControlProject || (isControlProject && checkProject(project)))
  ) {
    return true;
  }
  return false;
};
