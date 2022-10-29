import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import routes from './routes';
import PublicLayout from './layouts/PublicLayout/PublicLayout';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import createBrowserHistory from './helpers/History';
import './App.scss';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { checkUserTokenRequestAction, loginData } from './store/account/userActions';

const keys = Object.keys(routes);

function App({ ...props }) {
  const { setLoginData, checkUserToken } = props;
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))?.user;
    if (user) setLoginData(user);

    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if (token) checkUserToken();
  }, []);

  return (
    <Router history={createBrowserHistory}>
      <Switch>
        {keys.map((layoutName, layoutIndex) => {
          let layout = routes[layoutName];
          return routes[layoutName].children.map((route, index) => {
            return (
              <route.routeComponent
                key={index}
                exact={route.exact}
                path={route.path}
                render={(props) => (
                  <layout.component {...props}>
                    <route.component {...props} />
                  </layout.component>
                )}
              />
            );
          });
        })}
        <Route
          path="*"
          render={(props) => (
            <PublicLayout {...props}>
              <PageNotFound />
            </PublicLayout>
          )}
        />
      </Switch>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginData: (payload) => {
      dispatch(loginData(payload));
    },
    checkUserToken: (payload) => {
      dispatch(checkUserTokenRequestAction(payload));
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
