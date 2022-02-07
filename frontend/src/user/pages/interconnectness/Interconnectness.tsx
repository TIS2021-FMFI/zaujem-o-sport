import React  from "react";
// npm i react-leaflet@3.1.0 @react-leaflet/core@1.0.2
import { Route, Switch, useHistory} from "react-router-dom";
import {InterconnectnessMap} from "./InterconnectnessMap";
import {InterconnectnessTable} from "./InterconnectnessTable";
import Select from "react-select";
import {Info} from "../../components/info/Info";




export const Interconnectness = () => {
    const history = useHistory()
    const options = [
        {
            label: "Table",
            value: "/interconnectness/table",
        },
        {
            label: "Map",
            value: "/interconnectness/map",
        }
    ];


    return (<>
        <header>
            <h1 className="mt-3 mb-4"> Interconnectedness <Info label="What is Ranking" input="The user has the option to choose the country and type of connection (economic, non-economic).
             Depending on the user's choice, the page displays either a map with countries and numeric values
              or a list of countries with weights that indicate how high the country according to the selected country and connection type."/></h1>
        </header>
        <div>
            <h4> Data displaying</h4>

            <Select className="mb-3"
                id="setview"
                options={options}
                placeholder="Choose how data will be displayed"
                onChange={ (selectedOption) => {
                    if (selectedOption !== null)
                        history.push(selectedOption.value) }}
            />

            <div className="inter">
                <Switch>
                    <Route path="/interconnectness/table"><InterconnectnessTable/></Route>
                    <Route path="/interconnectness/map"><InterconnectnessMap/></Route>
                </Switch>
            </div>
        </div>

    </>)
}