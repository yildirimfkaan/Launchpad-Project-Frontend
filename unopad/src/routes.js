import MainLayout from "./layouts/MainLayout/MainLayout";
import PublicLayout from "./layouts/PublicLayout/PublicLayout";

import Home from './pages/Home';
import Launchpad from './pages/Launchpad';
import UserRoute from './routes/UserRoute';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Detail from './pages/Detail';
import Contract from './pages/Contract';
import FormTest from './pages/FormTest';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Payment from './pages/Payment';
import NewContract from "./pages/NewContract";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProjectForm from './pages/ProjectForm';
import Activation from "./pages/Activation";

import { Route } from "react-router-dom";
import TxList from "./components/TxList";
import Connection from "./pages/Connection";
import Profile from "./pages/Profile";
import Sales from "./pages/Sales/Sales";

const routes = {
  PublicLayout: {
    exact: true,
    name: "Public Layout",
    component: PublicLayout,
    children: [
      
      {
        path: "/login",
        exact: true,
        name: "Login",
        component: Login,
        routeComponent: Route
      },
      {
        path: "/ProjectAdd",
        exact: true,
        name: "Project Form",
        component: ProjectForm,
        routeComponent: Route
      },
      {
        path: "/forgotpassword",
        exact: true,
        name: "Forgot Password",
        component: ForgotPassword,
        routeComponent: Route
      },
      {
        path: "/resetpassword",
        exact: true,
        name: "Reset Password",
        component: ResetPassword,
        routeComponent: Route
      },
      {
        path: "/activate_user",
        exact: true,
        name: "Activation",
        component: Activation,
        routeComponent: Route
      },
      {
        path: "/SignUp",
        exact: true,
        name: "Sign Up",
        component: SignUp,
        routeComponent: Route
      },
      {
        path: "/FormTest",
        exact: true,
        name: "Form Test",
        component: FormTest,
        routeComponent: Route
      },
      {
        path: "/Payment",
        exact: true,
        name: "Payment",
        component: Payment,
        routeComponent: Route
      },
    ],
  },
  MainLayout: {
    exact: true,
    name: "Main",
    component: MainLayout,
    children: [
      {
        path: "/",
        exact: true,
        name: "Empty Page",
        component: Home,
        routeComponent: Route
      },
      {
        path: "/NewContract",
        name: "New Contract",
        component: NewContract,
        routeComponent: UserRoute
      },
      {
        path: "/Connection",
        name: "Connection",
        component: Connection,
        routeComponent: UserRoute
      },
      {
        path: "/Contract",
        name: "Contract",
        component: Contract,
        routeComponent: UserRoute
      },
      {
        path: "/Launchpad",
        name: "Launchpad",
        component: Launchpad,
        routeComponent: Route
      },
      {
        path: "/Profile",
        name: "Profile",
        component: Profile,
        routeComponent: UserRoute
      },
      {
        path: "/sales",
        name: "Sales",
        component: Sales,
        routeComponent: Route
      },
      {
        path: "/project/:id",
        name: "Detail",
        component: Detail,
        routeComponent: Route
      },
      {
        path: "/Txlist",
        name: "Txlist",
        component: TxList,
        routeComponent: UserRoute
      },
      {
        path: "/Home",
        exact: true,
        name: "Home",
        component: Home,
        routeComponent: UserRoute
      },
    ],
  },
};

export default routes;