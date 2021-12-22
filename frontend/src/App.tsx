import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import { createBrowserHistory } from 'history';
import {NotFound} from "pages/not_found/NotFound";
import {Login} from "secretary/pages/login/Login";
import {Nav} from "user/components/Nav"
import {Export} from "user/pages/export/Export";
import {Funding} from "user/pages/funding/Funding";
import {Success} from "user/pages/success/Success";
import {Interconnectedness} from "user/pages/interconnectedness/Interconnectness";
import {Logout} from "./secretary/pages/login/Logout";
import {Home} from "secretary/pages/home/Home";
import {Sports} from "./secretary/pages/sports/Sports";
import {setupInterceptors} from "app/axios_provider";
import {Sidebar, SidebarLinksProp} from "./components/sidebar/Sidebar";
import {FileEarmarkPlus, HouseDoor, List, Upload} from "react-bootstrap-icons";
import globalStyles from "styles/global.module.scss";
import {Container} from "react-bootstrap";
import {ToastContainer} from "react-toastify";
import create_snackbar from 'components/snackbar/Snackbar';

const history = createBrowserHistory();
setupInterceptors(history);

const App = () => {
  
  {/* example of snackbar usage
  enum snackTypes{'error', 'info', 'warn', 'success'}  // this will be exported
  <div>
    <button onClick={() => create_snackbar("hello from snackbar", snackTypes.info)}>try info snackbar</button>
    <button onClick={() => create_snackbar("hello from snackbar", snackTypes.warn)}>try warn snackbar</button>
    <button onClick={() => create_snackbar("hello from snackbar", snackTypes.error)}>try error snackbar</button>
    <button onClick={() => create_snackbar("hello from snackbar", snackTypes.success)}>try success snackbar</button>
    <ToastContainer />
  </div>
  */}
  
  return (
  <>
    <Router>
      <Switch>
        <SecretaryAuthRoute exact path="/auth/secretary/login" component={Login} />
        <Route path="/secretary" component={SecretaryRoutes} />
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
