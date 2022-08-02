import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import routes from './routes';
import PublicLayout from './layouts/PublicLayout/PublicLayout';
import PageNotFound from './pages/PageNotFound';
import createBrowserHistory from './helpers/History';

const keys = Object.keys(routes);

function App() {
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
                  <layout.component>
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
            <PublicLayout>
              <PageNotFound />
            </PublicLayout>
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
