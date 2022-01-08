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
                <Nav.Link href="/home"><HouseDoor size={25} /> Domov</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/chart"><BarChart size={25} /> Rebríček</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/export"><Download size={25} /> Export</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/funding"><Wallet size={25} /> Rozpočty</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/success"><List size={25} /> Úspešnosť</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/interconnectness"><Easel size={25} /> Prepojenie</Nav.Link>
            </Nav.Item>
        </Nav>
        </div>
    );
}



export default Navbar;