export const checkUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};
