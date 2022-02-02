import React from "react";
import styles from "./navbar.module.scss"
import { Link } from "react-router-dom";
import {HouseDoor, BarChart, Wallet,  List, Easel} from "react-bootstrap-icons";

import {  Nav } from "react-bootstrap";

function Navbar() {
    return (
        <div className={styles.mainNavbar}>
        <Nav
            activeKey="/home"
        >
            <Nav.Item >
                <Link  className={styles.navItem} to="/home"><HouseDoor size={25} /> Home</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className={styles.navItem} to="/chart"><BarChart size={25} /> Chart</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className={styles.navItem} to="/funding"><Wallet size={25} /> Fundings</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className={styles.navItem} to="/success"><List size={25} /> Success</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className={styles.navItem} to="/interconnectness"><Easel size={25} /> Interconnectedness</Link>
            </Nav.Item>
        </Nav>
        </div>
    );
}



export default Navbar;