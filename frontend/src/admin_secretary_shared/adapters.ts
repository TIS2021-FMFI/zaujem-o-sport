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

export interface ApiAddNewSportProps {
	sportCode: string,
	sportTitle: string
}

// TODO: return type
export const apiAddNewSport = ({sportCode, sportTitle}: ApiAddNewSportProps): Promise<AxiosResponse<{}>> => {
	return axios.post("/secretary/sports/add", {code: sportCode, title: sportTitle});
}