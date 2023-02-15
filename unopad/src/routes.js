import MainLayout from './layouts/MainLayout/MainLayout';
import PublicLayout from './layouts/PublicLayout/PublicLayout';

import Home from './pages/Home/Home';
import Launchpad from './pages/Launchpad/Launchpad';
import UserRoute from './routes/UserRoute';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';
import StakingDetail from './pages/StakingDetail/StakingDetail';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import ProjectForm from './pages/ProjectForm';
import Activation from './pages/Activation/Activation';

import { Route } from 'react-router-dom';
import Profile from './pages/Profile/Profile';
import Sales from './pages/Sales/Sales';
import Staking from './pages/Staking/Staking';
// import TokenDetail from './pages/TokenDetail/TokenDetail';

const routes = {
  PublicLayout: {
    exact: true,
    name: 'Public Layout',
    component: PublicLayout,
    children: [
      {
        path: '/login',
        exact: true,
        name: 'Login',
        component: Login,
        routeComponent: Route,
      },
      {
        path: '/ProjectAdd',
        exact: true,
        name: 'Project Form',
        component: ProjectForm,
        routeComponent: Route,
      },
      {
        path: '/forgotpassword',
        exact: true,
        name: 'Forgot Password',
        component: ForgotPassword,
        routeComponent: Route,
      },
      {
        path: '/reset-password',
        exact: true,
        name: 'Reset Password',
        component: ResetPassword,
        routeComponent: Route,
      },
      {
        path: '/activate_user',
        exact: true,
        name: 'Activation',
        component: Activation,
        routeComponent: Route,
      },
      {
        path: '/SignUp',
        exact: true,
        name: 'Sign Up',
        component: SignUp,
        routeComponent: Route,
      },
    ],
  },
  MainLayout: {
    exact: true,
    name: 'Main',
    component: MainLayout,
    children: [
      {
        path: '/',
        exact: true,
        name: 'Empty Page',
        component: Home,
        routeComponent: Route,
      },
      {
        path: '/Launchpad',
        name: 'Launchpad',
        component: Launchpad,
        routeComponent: Route,
      },
      {
        path: '/Profile',
        name: 'Profile',
        component: Profile,
        routeComponent: UserRoute,
      },
      {
        path: '/sales',
        name: 'Sales',
        component: Sales,
        routeComponent: Route,
      },
      {
        path: '/staking',
        name: 'Staking',
        component: Staking,
        routeComponent: Route,
      },
      {
        path: '/project/:id',
        name: 'Project Detail',
        component: ProjectDetail,
        routeComponent: Route,
      },
      {
        path: '/staking-project/:id',
        name: 'StakingDetail',
        component: StakingDetail,
        routeComponent: Route,
      },
    
    ],
  },
};

export default routes;
