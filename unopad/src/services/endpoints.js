import { doGet, doPost } from './axiosCrud';

//User
export const login = (body) => doPost('/login', body);
export const signUp = (body) => doPost('/signup', body);
export const forgotPassword = (body) => doPost('/password-recovery', body);
export const resetPassword = (body) => doPost('/reset-password', body);
export const activation = (body) => doPost('/activate', body);
export const logut = (body) => doPost('/login', body);

//Post
export const getPosts = () => doGet('/projects');
export const getPostDetails = (id) =>
  doGet('', {
    params: {
      id: id,
    },
  });

//Projects
export const getProjects = () => doGet('/projects')
export const getProjectByID = (id) => doGet('/projects/' + id)
export const addProject = (body) => doPost('/projects', body)
