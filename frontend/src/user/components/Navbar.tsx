import React from "react";
import {Link, useLocation} from "react-router-dom";
import {HouseDoor, BarChart, Wallet,  List, Easel} from "react-bootstrap-icons";

import {  Nav } from "react-bootstrap";
/** This is the navbar that shows which page is active.*/
function Navbar() {
    const location = useLocation();
    const {pathname} = location;
    return (
        <div className="mainNavbar">
            <Nav>
                <Nav.Item className={pathname === "/home" ? "active" : ""}>
                    <Link  className="navItem" to="/home"><HouseDoor size={25} /> Home</Link>
                </Nav.Item>
                <Nav.Item className={pathname === "/ranking" ? "active" : ""}>
                    <Link className="navItem" to="/ranking"><BarChart size={25} /> Ranking</Link>
                </Nav.Item>
                <Nav.Item className={pathname === "/funding" ? "active" : ""}>
                    <Link className="navItem" to="/funding"><Wallet size={25} /> Fundings</Link>
                </Nav.Item>
                <Nav.Item className={pathname === "/success" ? "active" : ""}>
                    <Link className="navItem" to="/success"><List size={25} /> Success</Link>
                </Nav.Item>
                <Nav.Item className={pathname === "/interconnectness" ? "active" : ""}>
                    <Link className="navItem" to="/interconnectness"><Easel size={25} /> Interconnectedness</Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}



export default Navbar;