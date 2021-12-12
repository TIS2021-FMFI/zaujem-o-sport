import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import { createBrowserHistory } from 'history';
import {CounterWrapper} from "pages/counter/CounterWrapper";
import {NotFound} from "pages/not_found/NotFound";
import {Login} from "secretary/pages/login/Login";
import {Logout} from "./secretary/pages/login/Logout";
import {Home} from "secretary/pages/home/Home";
import {Sports} from "./secretary/pages/sports/Sports";
import {setupInterceptors} from "./app/axios_provider";
import {Nav} from "user/pages/Nav"

const history = createBrowserHistory();
setupInterceptors(history);

const App = () => {
  return (
  <>
  <Nav></Nav>
    <Router>
      <Switch>
        {/* Secretary routes */}
        <SecretaryAuthRoute exact path="/secretary" component={Home}/>
        <SecretaryAuthRoute exact path="/secretary/login" component={Login}/>
        <SecretaryAuthRoute exact path="/secretary/sports" component={Sports}/>
        <Route exact path="/secretary/logout" component={Logout}/>

        <Route exact path="/" component={CounterWrapper}/>
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
    </>
  );
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
