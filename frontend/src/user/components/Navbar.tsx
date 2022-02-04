import React from "react";
import { Link } from "react-router-dom";
import {HouseDoor, BarChart, Wallet,  List, Easel} from "react-bootstrap-icons";

import {  Nav } from "react-bootstrap";

function Navbar() {
    return (
        <div className="mainNavbar">
        <Nav
            activeKey="/home"
        >
            <Nav.Item >
                <Link  className="navItem" to="/home"><HouseDoor size={25} /> Home</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className="navItem" to="/ranking"><BarChart size={25} /> Ranking</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className="navItem" to="/funding"><Wallet size={25} /> Fundings</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className="navItem" to="/success"><List size={25} /> Success</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className="navItem" to="/interconnectness"><Easel size={25} /> Interconnectedness</Link>
            </Nav.Item>
        </Nav>
        </div>
    );
}



export default Navbar;