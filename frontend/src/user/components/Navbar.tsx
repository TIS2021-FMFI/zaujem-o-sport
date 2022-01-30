import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Navbar.css";
import { Link } from "react-router-dom";
import {HouseDoor, BarChart, ArrowDownSquareFill,Wallet, Download, List, Easel} from "react-bootstrap-icons";

import { Container, Nav } from "react-bootstrap";

function Navbar() {
    return (
        <div className="main-navbar">
        <Nav
            activeKey="/home"
        >
            <Nav.Item>
                <Link to="/home"><HouseDoor size={25} /> Domov</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/chart"><BarChart size={25} /> Rebríček</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/export"><Download size={25} /> Export</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/funding"><Wallet size={25} /> Rozpočty</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/success"><List size={25} /> Úspešnosť</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/interconnectness"><Easel size={25} /> Prepojenie</Link>
            </Nav.Item>
        </Nav>
        </div>
    );
}



export default Navbar;