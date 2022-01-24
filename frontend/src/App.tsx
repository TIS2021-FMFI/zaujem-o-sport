import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import { createBrowserHistory } from 'history';
import {NotFound} from "pages/not_found/NotFound";
import {Login} from "components/login/Login";
import {Logout} from "components/login/Logout";
import {Home} from "secretary/pages/home/Home";
import {Sports} from "./secretary/pages/sports/Sports";
import {setupInterceptors as setupSecretaryInterceptors} from "secretary/axios_provider";
import {setupInterceptors as setupAdminInterceptors} from "admin/axios_provider";
import {Sidebar, SidebarLinksProp} from "./components/sidebar/Sidebar";
import {PlusLg, HouseDoor, List, Upload, ImageAlt, Pen} from "react-bootstrap-icons";
import globalStyles from "styles/global.module.scss";
import {Container} from "react-bootstrap";
import {UploadData} from "./secretary/pages/upload_data/UploadData";
import {AddSport} from "./secretary/pages/sports/add_sport/AddSport";
import {AddBranch} from "./secretary/pages/branches/add_branch/AddBranch";
import {Countries} from "./secretary/pages/countries/Countries";
import Navbar from "./user/components/Navbar";
import {Chart} from "./user/pages/chart/Chart";
import {Export} from "./user/pages/export/Export";
import {Fundings} from "./user/pages/fundings/Fundings";
import {Success} from "./user/pages/success/Success";
import {Interconnectness} from "./user/pages/interconnectness/Interconnectness";
import Footer from "./user/components/footer";
import {HomeUser} from "./user/pages/home/HomeUser";
import 'user/pages/styles/site.scss'; //TODO

const history = createBrowserHistory();
setupSecretaryInterceptors(history);
setupAdminInterceptors(history);

const App = () => {
  
  {/* example of snackbar usage
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
        <SecretaryAuthRoute exact path="/auth/secretary/login">
          <Login userType="secretary" />
        </SecretaryAuthRoute>
        <Route path="/secretary" component={SecretaryRoutes} />

        <AdminAuthRoute exact path="/auth/admin/login">
          <Login userType="admin" lang="en" />
        </AdminAuthRoute>
        <Route path="/admin" component={AdminRoutes} />

        <Route path="/" component={UserRouters} />
      </Switch>
    </Router>
    </>
  );
}

/*
const UserRouters = () => {
  return (<>
    <Nav />
    <Route exact path="/export" component={Export} />
    <Route exact path="/funding" component={Funding} />
    <Route exact path="/success" component={success} />
    <Route exact path="/interconnectedness" component={Interconnectedness} />
    <Route exact path="*" component={NotFound} />
  </>)
}
*/

const UserRouters = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <div className="site">
                    <Route path="/sports"><Sports /></Route>
                <Route path="/home"><HomeUser /></Route>
                <Route path="/chart"><Chart /></Route>
                <Route path="/export"><Export /></Route>
                <Route path="/funding"><Fundings /></Route>
                <Route path="/success"><Success /></Route>
                <Route path="/interconnectness"><Interconnectness /></Route>
                </div>
            </Switch>



            <Footer />

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
      route: `${url}/data/upload`,
      name: "Nahrať dáta",
      icon: Upload
    },
    {
      route: `${url}/sports/add`,
      name: "Pridať šport",
      icon: PlusLg
    },
    {
      route: `${url}/branches/add`,
      name: "Pridať odvetvie",
      icon: PlusLg
    },
    {
      route: `${url}/sports/list`,
      name: "Zobraz športy",
      icon: List
    },
    {
      route: `${url}/countries/list`,
      name: "Zobraz krajiny",
      icon: ImageAlt
    }
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
            <SecretaryAuthRoute exact path={`${path}/data/upload`} component={UploadData} />
            <SecretaryAuthRoute exact path={`${path}/sports/list`} component={Sports} />
            <SecretaryAuthRoute exact path={`${path}/sports/add`} component={AddSport} />
            <SecretaryAuthRoute exact path={`${path}/branches/add`} component={AddBranch} />
            <SecretaryAuthRoute exact path={`${path}/countries/list`} component={Countries} />
            <Route exact path={`${path}/logout`}>
              <Logout userType="secretary" />
            </Route>
            <SecretaryAuthRoute path="*" component={NotFound} />
          </Switch>
        </div>
      </Container>
    </>
  )
}

const AdminRoutes = () => {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();

  console.log(path, url);

  const adminHeader = "Admin panel";

  const adminSidebarLinks: SidebarLinksProp[] = [
    {
      route: `${url}`,
      name: "Home",
      icon: HouseDoor
    },
    {
      route: `${url}/data/upload`,
      name: "Upload data",
      icon: Upload
    },
    {
      route: `${url}/sports/add`,
      name: "Add sport",
      icon: PlusLg
    },
    {
      route: `${url}/branches/add`,
      name: "Add branch",
      icon: PlusLg
    },
    {
      route: `${url}/countries/add`,
      name: "Add country",
      icon: PlusLg
    },
    {
      route: `${url}/sports/update`,
      name: "Update sport",
      icon: Pen
    },
    {
      route: `${url}/sports/list`,
      name: "Show sports",
      icon: List
    },
    {
      route: `${url}/countries/list`,
      name: "Show countries",
      icon: ImageAlt
    }
  ]

  return (
    <>
      <Sidebar
        header={adminHeader}
        links={adminSidebarLinks}
        logoutRoute={`${path}/logout`}
        lang={"en"}
      />
      <Container fluid="lg">
        <div style={{marginLeft: globalStyles.sidebarWidth}}>
          <Switch>
            {/* TODO: define components */}
            <AdminAuthRoute exact path={path} component={NotFound} />
            <AdminAuthRoute exact path={`${path}/data/upload`} component={NotFound} />
            <AdminAuthRoute exact path={`${path}/sports/add`} component={NotFound} />
            <AdminAuthRoute exact path={`${path}/branches/add`} component={NotFound} />
            <AdminAuthRoute exact path={`${path}/countries/add`} component={NotFound} />
            <AdminAuthRoute exact path={`${path}/sports/update`} component={NotFound} />
            <AdminAuthRoute exact path={`${path}/sports/list`} component={NotFound} />
            <AdminAuthRoute exact path={`${path}/countries/list`} component={NotFound} />
            <Route exact path={`${path}/logout`}>
              <Logout userType="admin" />
            </Route>
            <AdminAuthRoute path="*" component={NotFound} />
          </Switch>
        </div>
      </Container>
    </>
  )
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
                if (typeof routeProps.path !== "object" && routeProps.path === "/auth/admin/login")
                    return !isAdminLoggedIn ? <Component {...props}/> : <Redirect to="/admin"/>;
                return isAdminLoggedIn ? <Component {...props}/> : <Redirect to="/auth/admin/login"/>;
            }}
        />
    );
}

export default App;
