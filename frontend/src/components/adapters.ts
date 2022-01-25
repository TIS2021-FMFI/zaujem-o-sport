import {generalAxiosProvider as axios} from "app/axios_provider";  // TODO: this will need some more testing in edge scenarios
import {AxiosResponse} from "axios";

export interface ApiLoginResponseType {
	message: string,
	data: {
		accessToken?: string
	}
}

export type UserType = "secretary" | "admin";

export const apiLogin = (email: string, password: string, userType: UserType)
	: Promise<AxiosResponse<ApiLoginResponseType>> =>
{
	return axios.post(`/${userType}/login`, {
		"email": email,
		"password": password
	});
}