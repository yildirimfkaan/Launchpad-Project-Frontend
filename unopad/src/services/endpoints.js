import { doGet, doPost } from './axiosCrud';

//User
export const login = (body) => doPost('/login', body);
export const signUp = (body) => doPost('/signup', body);
export const forgotPassword = (body) => doPost('/password-recovery', body);
export const resetPassword = (body) => doPost('/reset-password', body);
export const activation = (body) => doPost('/activate', body);
export const logut = (body) => doPost('/login', body);
export const getAccountDetails = (body) => doGet('/user/profile', body);
export const resendVerificationEmail = () => doPost('/user/activation-email');
export const checkUserToken = () => doGet('/user/check_token');
export const transaction = (body) => doPost('/transaction', body);
export const newtorkChain = (chainId) => doPost('/chain/' + chainId);

//Post
export const getPosts = () => doGet('/projects');
export const getPostDetails = (id) =>
  doGet('', {
    params: {
      id: id,
    },
  });

//Projects
export const getProjects = () => doGet('/projects');
export const getProjectByID = (id) => doGet('/projects/' + id);
export const addProject = (body) => doPost('/projects', body);

//Tokens
export const getTokens = () => doGet('/tokens');
export const getTokenByID = (id) => doGet('/tokens/' + id);
export const addToken = (body) => doPost('/tokens', body);

//bscApi
export const GetTxlist = (body) => doPost('/bsc', body);
//bscApi
export const GetAbiList = (body) => doGet('/contracts/abi', body);