import axios from "axios";
import config from "config";

// TODO: admin - either another axiosProvider or somehow differentiate between them in this one.

export const axiosProvider = axios.create({
	baseURL: config.API_URL,
	headers: {
		"Content-Type": "application/json"
	}
});

axiosProvider.interceptors.request.use((config) => {
	// add token to the headers
	if (config.headers !== undefined)
		config.headers["Authorization"] = `Bearer ${localStorage.getItem("secretaryAccessToken")}`;
	return config;
});

export const setupInterceptors = (history: any) => {
	axiosProvider.interceptors.response.use((response) => {
		return response;
	}, (error) => {
		if (error.response.status === 401) {
			localStorage.removeItem("secretaryAccessToken");
			history.push("/secretary/login");
			window.location.reload();
		}
		return Promise.reject(error);
	});
}