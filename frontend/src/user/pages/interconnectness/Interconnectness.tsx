import React from "react";
import {Button} from "react-bootstrap";
// npm i react-leaflet@3.1.0 @react-leaflet/core@1.0.2
import {Link, Route, Switch} from "react-router-dom";
import {InterconnectnessMap} from "./InterconnectnessMap";
import {InterconnectnessTable} from "./InterconnectnessTable";
export const Interconnectness = () => {

    return (<>
        <header>
            <h1>Interconnectedness</h1>
        </header>
        <div>
            <h4> Choose how data will be displayed</h4>
            <h5 >
                    <Link  to="/interconnectness/table"> <Button variant="outline-primary">Table</Button></Link>
                <Link  to="/interconnectness/map">  <Button variant="outline-primary">Map</Button></Link>
            </h5>

            <Switch>
                <div className="inter">
                    <Route path="/interconnectness/table"><InterconnectnessTable /></Route>
                    <Route path="/interconnectness/map"><InterconnectnessMap /></Route>
                </div>
            </Switch>
        </div>

    </>)
}