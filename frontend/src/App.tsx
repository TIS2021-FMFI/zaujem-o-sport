import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import { createBrowserHistory } from 'history';
import {NotFound} from "pages/not_found/NotFound";
import {Login} from "secretary/pages/login/Login";
import {setupInterceptors} from "./app/axios_provider";
import {Nav} from "user/components/Nav"
import {Export} from "user/pages/export/Export";
import {Funding} from "user/pages/funding/Funding";
import {Success} from "user/pages/success/Success";
import {Interconnectedness} from "user/pages/interconnectedness/Interconnectness";

const history = createBrowserHistory();
setupInterceptors(history);

const App = () => {
  return (
  <>
    <Router>
      <Switch>
        <Route path="/" component={UserRouters} />
      </Switch>
    </Router>
    </>
  );
}

const UserRouters = () => {
  return (<>
    <Nav />
    <Route exact path="/export" component={Export} />
    <Route exact path="/funding" component={Funding} />
    <Route exact path="/success" component={Success} />
    <Route exact path="/interconnectedness" component={Interconnectedness} />
    <Route exact path="*" component={NotFound} />
  </>)
}

const SecretaryAuthRoute = ({component: Component, ...routeProps}: any) => {
  const isSecretaryLoggedIn = localStorage.getItem("secretaryAccessToken") !== null;
  return (
    <Route
      {...routeProps}
      render={(props) => {
        if (typeof routeProps.path !== "object" && routeProps.path === "/secretary/login")
          return !isSecretaryLoggedIn ? <Component {...props}/> : <Redirect to="/secretary"/>;
        return isSecretaryLoggedIn ? <Component {...props}/> : <Redirect to="/secretary/login"/>;
      }}
    />
  );
}

const AdminAuthRoute = ({component: Component, ...routeProps}: any) => {
  const isAdminLoggedIn = localStorage.getItem("adminAccessToken") !== null;

  return (
    <Route
      {...routeProps}
      render={(props) => {
        if (typeof routeProps.path !== "object" && routeProps.path === "/admin/login")
          return !isAdminLoggedIn ? <Component {...props}/> : <Redirect to="/admin"/>;
        return isAdminLoggedIn ? <Component {...props}/> : <Redirect to="/admin/login"/>;
      }}
    />
  );
}

export default App;
