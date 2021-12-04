import React, {useEffect} from "react";
import {Redirect, useLocation} from "react-router-dom";

/** Logout secretary. */
export const Logout = () => {
	const location = useLocation();

	useEffect(() => {
		 const clearLocalStorage = async () => {
			localStorage.removeItem("secretaryAccessToken");
		}
		clearLocalStorage();
	}, []);

	return (
		<Redirect to={{
			pathname: "/secretary/login",
			state: location.state === undefined ? {} : location.state
		}}/>
	);
};