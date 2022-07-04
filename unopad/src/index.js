import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/style.scss";
import App from "./App";
import { Router,Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import createBrowserHistory from "./History";

const app = (
  <Provider store={store}>
    <Router history={createBrowserHistory}>
      <Route component={App} />
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
