import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Navbar.css";
import { Link } from "react-router-dom";
import {HouseDoor, BarChart, Wallet,  List, Easel} from "react-bootstrap-icons";

import {  Nav } from "react-bootstrap";

function Navbar() {
    return (
        <div className="main-navbar">
        <Nav
            activeKey="/home"
        >
            <Nav.Item>
                <Link to="/home"><HouseDoor size={25} /> Home</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/chart"><BarChart size={25} /> Chart</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/funding"><Wallet size={25} /> Fundings</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/success"><List size={25} /> Success</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/interconnectness"><Easel size={25} /> Interconnectedness</Link>
            </Nav.Item>
        </Nav>
        </div>
    );
}



export default Navbar;