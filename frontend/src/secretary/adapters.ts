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
export interface Country {
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

export interface ApiUploadFundingProps {
	csvFile: File,
	countryCode: string,
	currency: string
}

export interface Currency {
	currency: string
}

export interface ApiFundingCurrencies {
	message: string,
	currencies: Currency[]
}

export const apiListFundingCurrencies = (): Promise<AxiosResponse<ApiFundingCurrencies>> => {
	return axios.get("/secretary/funding/currencies");
}

export const apiUploadFunding = ({csvFile, countryCode, currency}: ApiUploadFundingProps): Promise<AxiosResponse<{}>> => {
	const formData = new FormData();
	formData.append("csvFile", csvFile);
	formData.append("json", JSON.stringify({countryCode: countryCode, currency: currency}))
	return axios.post("/secretary/funding/upload", formData);
}