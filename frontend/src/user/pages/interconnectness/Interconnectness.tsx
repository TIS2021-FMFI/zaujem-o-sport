import React, {useState} from "react";
import {useQuery} from "react-query";
import {Nav, Spinner} from "react-bootstrap";
// npm i react-leaflet@3.1.0 @react-leaflet/core@1.0.2

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {MapShow, MapType} from "../../components/map/Map";

import {Link, Route, Switch} from "react-router-dom";
import {BarChart, HouseDoor} from "react-bootstrap-icons";
import {Sports} from "../../../secretary/pages/sports/Sports";
import {HomeUser} from "../home/HomeUser";
import {Chart} from "../chart/Chart";
import {Export} from "../export/Export";
import {Fundings} from "../fundings/Fundings";
import {Success} from "../success/Success";
import {InterconnectnessMap} from "./InterconnectnessMap";
import {InterconnectnessTable} from "./InterconnectnessTable";
export const Interconnectness = () => {

    return (<>
        <header>
            <h1>Prepojenie</h1>
        </header>
        <div>
            <h4> Vyberte si typ zobrazenia prepojenia športov</h4>
            <h5 >
                    <Link  to="/interconnectness/table"> Tabulka</Link>
                    <Link  to="/interconnectness/map"> Mapa</Link>
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