import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import { createBrowserHistory } from 'history';
import {CounterWrapper} from "pages/counter/CounterWrapper";
import {NotFound} from "pages/not_found/NotFound";
import {Login} from "secretary/pages/login/Login";
import {Logout} from "./secretary/pages/login/Logout";
import {Home} from "secretary/pages/home/Home";
import {Sports} from "./secretary/pages/sports/Sports";
import {setupInterceptors} from "app/axios_provider";
import {Sidebar, SidebarLinksProp} from "./components/sidebar/Sidebar";
import {FileEarmarkPlus, HouseDoor, List, Upload} from "react-bootstrap-icons";
import globalStyles from "styles/global.module.scss";
import {Container} from "react-bootstrap";

const history = createBrowserHistory();
setupInterceptors(history);

const App = () => {
  return (
    <Router>
      <Switch>
        <SecretaryAuthRoute exact path="/auth/secretary/login" component={Login} />
        <Route path="/secretary" component={SecretaryRoutes} />
        <Route exact path="/" component={CounterWrapper} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

const SecretaryRoutes = () => {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();

  const secretaryHeader = "Sekretársky panel";

  const secretarySidebarLinks: SidebarLinksProp[] = [
    {
      route: `${url}`,
      name: "Domov",
      icon: HouseDoor
    },
    {
      route: `${url}/upload`,
      name: "Nahrať dáta",
      icon: Upload
    },
    {
      route: `${url}/sport/add`,
      name: "Pridať šport",
      icon: FileEarmarkPlus
    },
    {
      route: `${url}/branch/add`,
      name: "Pridať odvetie",
      icon: FileEarmarkPlus
    },
    {
      route: `${url}/sports/list`,
      name: "Zobraz športy",
      icon: List
    },
  ]

  return (
    <>
      <Sidebar
        header={secretaryHeader}
        links={secretarySidebarLinks}
        logoutRoute={`${path}/logout`}
      />
      <Container fluid="lg">
        <div style={{marginLeft: globalStyles.sidebarWidth}}>
          <Switch>
            <SecretaryAuthRoute exact path={path} component={Home} />
            <SecretaryAuthRoute exact path={`${path}/sports/list`} component={Sports} />
            <Route exact path={`${path}/logout`} component={Logout} />
            <SecretaryAuthRoute path="*" component={NotFound} />
          </Switch>
        </div>
      </Container>
    </>
  )
}

const AdminRoutes = () => {

}

const SecretaryAuthRoute = ({component: Component, ...routeProps}: any) => {
  const isSecretaryLoggedIn = localStorage.getItem("secretaryAccessToken") !== null;
  return (
    <Route
      {...routeProps}
      render={(props) => {
        if (typeof routeProps.path !== "object" && routeProps.path === "/auth/secretary/login")
          return !isSecretaryLoggedIn ? <Component {...props}/> : <Redirect to="/secretary"/>;
        return isSecretaryLoggedIn ? <Component {...props}/> : <Redirect to="/auth/secretary/login"/>;
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