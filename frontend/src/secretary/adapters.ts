/** API adapters for the secretary part of the app. */

import {secretaryAxiosProvider as axios} from "secretary/axios_provider";
import {AxiosResponse} from "axios";

export interface ApiListSportsType {
	message: string,
	data: {
		columnNames: string[],
		sports: string[][]
	}
}

export const apiListSports = ()
	: Promise<AxiosResponse<ApiListSportsType>> =>
{
	return axios.get("/secretary/sports");
}

// TODO: move it to app adapters since admin will make use of it
export type Country = {
	name: string,
	code: string
}
export interface ApiListCountries {
	message: string,
	countries: Country[]
}

export const apiListCountries = (): Promise<AxiosResponse<ApiListCountries>> => {
	return axios.get("/secretary/countries");
}

export const apiUploadFunding = (csvFile: File): Promise<AxiosResponse<{}>> => {
	const formData = new FormData();
	formData.append("csvFile", csvFile);
	return axios.post("/secretary/funding/upload", formData);
}