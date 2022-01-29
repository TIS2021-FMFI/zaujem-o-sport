import {AxiosResponse} from "axios";
import {secretaryAxiosProvider as axios} from "../secretary/axios_provider";

export interface Country {
	name: string,
	code: string
}
export interface ApiListCountries {
	message: string,
	countries: Country[]
}

export const apiListCountries = (): Promise<AxiosResponse<ApiListCountries>> => {
	return axios.get("/secretary/countries");   // TODO: isn't restricted to anyone
}