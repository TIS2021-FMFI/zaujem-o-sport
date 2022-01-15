/** API adapters for the secretary part of the app. */

import {axiosProvider as axios} from "app/axios_provider";
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

export const apiListCountries = ()
	: Promise<AxiosResponse<ApiListCountriesType>> =>
{
	return axios.get("/secretary/countries");
}