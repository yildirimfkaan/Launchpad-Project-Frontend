import React from "react";
import Home from "./pages/Home";
import UserRoute from "./routes/UserRoute"
import Login from './components/Login/Login.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import PageNotFound from './components/shared/PageNotFound/PageNotFound.jsx'
import Detail from "./pages/Detail";
import Contract from "./pages/Contract";
import FormTest from "./pages/FormTest";
import { BrowserRouter as Router, Route, Switch ,Redirect} from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Payment from "./pages/Payment";
import Alert from "./components/shared/Alert/Alert";
import NewContract from "./pages/web3modal/NewContract";
import ForgotPassword from "./components/Login/ForgotPassword";
import ResetPassword from "./components/Login/ResetPassword";
import ProjectForm from "./components/Project/ProjectForm";

function App() {
  return (
    <div className="App">

      <Router>
        <Navigation />
        <Alert/>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/login" />} />
          <Route path="/login" component={Login} />
          <Route path="/ProjectAdd" component={ProjectForm} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/resetpassword" component={ResetPassword} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/FormTest" exact component={() => <FormTest />} />
          <Route path="/Payment" exact component={() => <Payment />} />
          <UserRoute path="/NewContract" exact component={() => <NewContract />} />
          <UserRoute path="/Contract" exact component={() => <Contract />} />
          <UserRoute path="/Home" exact component={() => <Home />} />
          <UserRoute path="/project/:id" component={Detail} />
          <Route path="/**" component={PageNotFound} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
