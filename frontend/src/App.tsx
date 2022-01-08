import React from "react";
import {BrowserRouter as Router,  Redirect,  Route, Switch} from "react-router-dom";
import { createBrowserHistory } from 'history';
import "styles/site.scss"
import Footer from "./components/Footer";
import Navbar from "./components/Navbar"

import {NotFound} from "pages/not_found/NotFound";
import {Login} from "secretary/pages/login/Login";
import {Logout} from "./secretary/pages/login/Logout";
import {Sports} from "./secretary/pages/sports/Sports";
import {setupInterceptors} from "./app/axios_provider";

import Success from "./components/Success";
import MyDropzone from "./components/Upload";
import { Uspesnost } from "pages/uspesnost/uspesnost";
import { Rebricek } from "pages/rebricek/rebricek";
import { Export } from "pages/export/export";
import { Rozpocty }   from "pages/rozpocty/rozpocty";
import { Home } from "pages/home/home";
import { Prepojenie } from "pages/prepojenie/prepojenie";

const history = createBrowserHistory();
setupInterceptors(history);

const UserRouters = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <div className="oversite">
                <div className="site">
                <Route path="/home"><Home /></Route>
                <Route path="/chart"><Rebricek /></Route>
                <Route path="/export"><Export /></Route>
                <Route path="/funding"><Rozpocty /></Route>
                <Route path="/success"><Uspesnost /></Route>
                <Route path="/interconnectness"><Prepojenie /></Route>
                </div>
                </div>
            </Switch>


            <Footer />

        </Router>

    );
}


const App = () => {
  return (
    <Router>

          <Switch>
        <SecretaryAuthRoute exact path="/secretary" component={Home}/>
        <SecretaryAuthRoute exact path="/secretary/login" component={Login}/>
        <SecretaryAuthRoute exact path="/secretary/sports" component={Sports}/>

        <Route exact path="/secretary/logout" component={Logout}/>

      </Switch>
        <Success />
        <MyDropzone />
        <Footer />

    </Router>

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

export default UserRouters;