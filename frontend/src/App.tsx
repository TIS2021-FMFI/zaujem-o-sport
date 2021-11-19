import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {CounterWrapper} from "pages/counter/CounterWrapper";
import {NotFound} from "pages/not_found/NotFound";
import {NavbarWrapper} from "./components/navbar/NavbarWrapper";

const App = () => {
  return (
    <Router>
      <NavbarWrapper/>
      <Switch>
        <Route exact path="/" component={CounterWrapper}/>
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
