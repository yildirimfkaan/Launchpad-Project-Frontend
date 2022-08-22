import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/style.scss';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import UPAlerts from './components/UPAlerts/UPAlerts';

const app = (
  <Provider store={store}>
    <UPAlerts />
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
