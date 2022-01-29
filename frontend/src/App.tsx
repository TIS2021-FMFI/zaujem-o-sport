import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import { createBrowserHistory } from 'history';
import {NotFound} from "pages/not_found/NotFound";
import {Login} from "admin_secretary_shared/components/login/Login";
import {Logout} from "admin_secretary_shared/components/login/Logout";
import {SportsWithBranches} from "admin_secretary_shared/pages/sports/SportsWithBranches";
import {setupInterceptors as setupSecretaryInterceptors} from "secretary/axios_provider";
import {setupInterceptors as setupAdminInterceptors} from "admin/axios_provider";
import {Sidebar, SidebarLinksProp} from "./components/sidebar/Sidebar";
import {PlusLg, List, Upload, ImageAlt, Pen, YinYang} from "react-bootstrap-icons";
import globalStyles from "styles/global.module.scss";
import {Container} from "react-bootstrap";
import {UploadData} from "./secretary/pages/upload_data/UploadData";
import {AddSport} from "admin_secretary_shared/pages/sports/add_sport/AddSport";
import {AddBranch} from "./secretary/pages/branches/add_branch/AddBranch";
import {Countries} from "./secretary/pages/countries/Countries";
import Navbar from "./user/components/Navbar";
import {Chart} from "./user/pages/chart/Chart";
import {Export} from "./user/pages/export/Export";
import {Fundings} from "./user/pages/fundings/Fundings";
import {Success} from "./user/pages/success/Success";
import {Interconnectness} from "./user/pages/interconnectness/Interconnectness";
import {UploadData as AdminUploadData} from "./admin/pages/upload_data/UploadData";
import Footer from "./user/components/footer";
import {HomeUser} from "./user/pages/home/HomeUser";
import 'user/pages/styles/site.scss';
import {ToastContainer} from "react-toastify";

const history = createBrowserHistory();
setupSecretaryInterceptors(history);
setupAdminInterceptors(history);

const App = () => {
	return (<>
		<Router>
			<Switch>
				<SecretaryAuthRoute exact path="/auth/secretary/login">
					<Login userType="secretary" />
				</SecretaryAuthRoute>
				<Route path="/secretary" component={SecretaryRoutes} />

				<AdminAuthRoute exact path="/auth/admin/login">
					<Login userType="admin" lang="en" />
				</AdminAuthRoute>
				<Route path="/admin" component={AdminRoutes} />

				<Route path="/" component={UserRouters} />
			</Switch>
		</Router>
		<ToastContainer />
	</>);
}

const UserRouters = () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<div className="site">
					<Route path="/sports"><SportsWithBranches /></Route>
					<Route path="/home"><HomeUser /></Route>
					<Route path="/chart"><Chart /></Route>
					<Route path="/export"><Export /></Route>
					<Route path="/funding"><Fundings /></Route>
					<Route path="/success"><Success /></Route>
					<Route path="/interconnectness"><Interconnectness /></Route>
				</div>
			</Switch>
			<Footer />
		</Router>
	);
}

const SecretaryRoutes = () => {
	// The `path` lets us build <Route> paths that are
	// relative to the parent route, while the `url` lets
	// us build relative links.
	let { path, url } = useRouteMatch();

	const secretaryHeader = "Sekretársky panel";

	const secretarySidebarLinks: SidebarLinksProp[] = [
		{
			route: `${url}/data/upload`,
			name: "Nahrať dáta",
			icon: Upload
		},
		{
			route: `${url}/sports/add`,
			name: "Pridať šport",
			icon: PlusLg
		},
		{
			route: `${url}/branches/add`,
			name: "Pridať odvetvie",
			icon: PlusLg
		},
		{
			route: `${url}/sports/list`,
			name: "Športy a odvetvia",
			icon: YinYang
		},
		{
			route: `${url}/countries/list`,
			name: "Krajiny",
			icon: ImageAlt
		}
	]

	return (
		<>
			<Sidebar
				header={secretaryHeader}
				links={secretarySidebarLinks}
				logoutRoute={`${path}/logout`}
			/>
			<div style={{marginLeft: globalStyles.sidebarWidth}}>
				<Container fluid="lg">
						<Switch>
							<SecretaryAuthRoute exact path={path}>
								<Redirect to={`${path}/data/upload`} />
							</SecretaryAuthRoute>
							<SecretaryAuthRoute exact path={`${path}/data/upload`} component={UploadData} />
							<SecretaryAuthRoute exact path={`${path}/sports/list`} component={SportsWithBranches} />
							<SecretaryAuthRoute exact path={`${path}/sports/add`} component={AddSport} />
							<SecretaryAuthRoute exact path={`${path}/branches/add`} component={AddBranch} />
							<SecretaryAuthRoute exact path={`${path}/countries/list`} component={Countries} />
							<Route exact path={`${path}/logout`}>
								<Logout userType="secretary" />
							</Route>
							<SecretaryAuthRoute path="*" component={NotFound} />
						</Switch>
				</Container>
			</div>
		</>
	)
}

const AdminRoutes = () => {
	// The `path` lets us build <Route> paths that are
	// relative to the parent route, while the `url` lets
	// us build relative links.
	let { path, url } = useRouteMatch();

	const adminHeader = "Admin panel";

	const adminSidebarLinks: SidebarLinksProp[] = [
		{
			route: `${url}/data/upload`,
			name: "Upload data",
			icon: Upload
		},
		{
			route: `${url}/sports/add`,
			name: "Add sport",
			icon: PlusLg
		},
		{
			route: `${url}/branches/add`,
			name: "Add branch",
			icon: PlusLg
		},
		{
			route: `${url}/countries/add`,
			name: "Add country",
			icon: PlusLg
		},
		{
			route: `${url}/sports/update`,
			name: "Update sport",
			icon: Pen
		},
		{
			route: `${url}/sports/list`,
			name: "Show sports",
			icon: List
		},
		{
			route: `${url}/countries/list`,
			name: "Show countries",
			icon: ImageAlt
		}
	]

	return (
		<>
			<Sidebar
				header={adminHeader}
				links={adminSidebarLinks}
				logoutRoute={`${path}/logout`}
				lang={"en"}
			/>
			<Container fluid="lg">
				<div style={{marginLeft: globalStyles.sidebarWidth}}>
					<Switch>
						<AdminAuthRoute exact path={path}>
							<Redirect to={`${path}/data/upload`} />
						</AdminAuthRoute>
						<AdminAuthRoute exact path={`${path}/data/upload`} component={AdminUploadData} />
						<AdminAuthRoute exact path={`${path}/sports/add`} component={AddSport} />
						<AdminAuthRoute exact path={`${path}/branches/add`} component={NotFound} />
						<AdminAuthRoute exact path={`${path}/countries/add`} component={NotFound} />
						<AdminAuthRoute exact path={`${path}/sports/update`} component={NotFound} />
						<AdminAuthRoute exact path={`${path}/sports/list`} component={NotFound} />
						<AdminAuthRoute exact path={`${path}/countries/list`} component={NotFound} />
						<Route exact path={`${path}/logout`}>
							<Logout userType="admin" />
						</Route>
						<AdminAuthRoute path="*" component={NotFound} />
					</Switch>
				</div>
			</Container>
		</>
	)
}

const SecretaryAuthRoute = ({component: Component, ...routeProps}: any) => {
	const isSecretaryLoggedIn = localStorage.getItem("secretaryAccessToken") !== null;
	return (
		<Route
			{...routeProps}
			render={(props) => {
				if (typeof routeProps.path !== "object" && routeProps.path === "/auth/secretary/login")
					return !isSecretaryLoggedIn ? <Component {...props}/> : <Redirect to="/secretary"/>;
				return isSecretaryLoggedIn ? <Component {...props}/> : <Redirect to="/auth/secretary/login"/>;
			}}
		/>
	);
}

const AdminAuthRoute = ({component: Component, ...routeProps}: any) => {
	const isAdminLoggedIn = localStorage.getItem("adminAccessToken") !== null;

	return (
		<Route
			{...routeProps}
			render={(props) => {
				if (typeof routeProps.path !== "object" && routeProps.path === "/auth/admin/login")
					return !isAdminLoggedIn ? <Component {...props}/> : <Redirect to="/admin"/>;
				return isAdminLoggedIn ? <Component {...props}/> : <Redirect to="/auth/admin/login"/>;
			}}
		/>
	);
}

export default App;
