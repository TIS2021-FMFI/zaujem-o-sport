import React from "react";
import styles from "./sidebar.module.scss";
import {Link} from "react-router-dom";
import {IconWithText} from "../icons/IconWithText";
import {BoxArrowDownLeft, Icon} from "react-bootstrap-icons";

export interface SidebarLinksProp {
	route: string,
	name: string,
	icon: Icon
}

interface SidebarProps {
	header: React.ReactNode,
	links: SidebarLinksProp[],
	logoutRoute: string
}

export const Sidebar = ({header, links, logoutRoute}: SidebarProps) => {
	return (<>
		<div className={`${styles.sidebar} d-flex flex-column bg-dark`}>
			<header className={`mt-3 text-center`}>
				<h2 className={`${styles.sidebarHeader}`}>{header}</h2>
			</header>
			<hr />
			<ul className="nav nav-pills flex-column mb-auto">
				{links.map((link, i) =>
					<li key={`sidebar-link-${i}`} className="nav-item">
						<Link
							to={link.route}
							className={`${ window.location.pathname === link.route && "active" } nav-link`}
							aria-current="page"
						>
							<IconWithText Icon={link.icon} text={link.name} />
						</Link>
					</li>
				)}
			</ul>
			<hr />
			<ul className="">
				<li className="nav-item">
					<Link to={logoutRoute}>
						<IconWithText Icon={BoxArrowDownLeft} text="Odhlásiť" />
					</Link>
				</li>
			</ul>
		</div>
	</>)
}