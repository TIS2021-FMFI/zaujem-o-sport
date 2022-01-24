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

export type countryType = {
	name: string,
	code: string
}

export interface ApiListCountriesType {
	message: string,
	data: {
		countries: countryType[]
	}
}

export const apiListCountries = (): Promise<AxiosResponse<ApiListCountriesType>> => {
	return axios.get("/secretary/countries");
}

export const apiUploadFunding = (csvFile: File): Promise<AxiosResponse<{}>> => {
	const formData = new FormData();
	formData.append("file", csvFile);
	return axios.post("/secretary/funding/upload", formData);
}