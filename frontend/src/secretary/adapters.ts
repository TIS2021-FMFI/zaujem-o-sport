/**
 * API adapters for a secretary.
 * All API urls should start with "/secretary".
 */

import {secretaryAxiosProvider as axios} from "secretary/axios_provider";
import {AxiosResponse} from "axios";

export interface ApiListSportsType {
	message: string,
	data: {
		columnNames: string[],
		sports: string[][]
	}
}

export const apiListSports = ()  // TODO: find usage => remove
	: Promise<AxiosResponse<ApiListSportsType>> =>
{
	return axios.get("/secretary/sports");
}

export interface ApiUploadFundingProps {
	csvFile: File,
	countryCode: string,
	currency: string
}

// TODO: return type
export const apiUploadFunding = ({csvFile, countryCode, currency}: ApiUploadFundingProps): Promise<AxiosResponse<{}>> => {
	const formData = new FormData();
	formData.append("csvFile", csvFile);
	formData.append("json", JSON.stringify({countryCode: countryCode, currency: currency}))
	return axios.post("/secretary/funding/upload", formData);
}