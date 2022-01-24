import axios from "axios";
import config from "config";

/** Use this API provider to make user calls. */
export const userAxiosProvider = axios.create({
	baseURL: config.API_URL,
	headers: {
		"Content-Type": "application/json"
	}
});