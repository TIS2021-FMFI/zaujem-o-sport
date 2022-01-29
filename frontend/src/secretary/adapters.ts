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

export interface ApiUploadFundingProps {
	csvFile: File,
	countryCode: string,
	currency: string
}

export interface Currency {
	currency: string
}

export interface ApiGetFundingCurrencies {
	message: string,
	currencies: Currency[]
}

export const apiListFundingCurrencies = (): Promise<AxiosResponse<ApiGetFundingCurrencies>> => {
	return axios.get("/secretary/funding/currencies");
}

export interface ApiNewSportCode {
	message: string,
	newSportCode: string
}

export const apiGetNewSportCode = (): Promise<AxiosResponse<ApiNewSportCode>> => {
	return axios.get("/secretary/sports/new-code");
}

export interface ApiNewCombiBranchCode {
	message: string,
	newCombiBranchCode: string
}

export const apiGetNewCombiBranchCode = (): Promise<AxiosResponse<ApiNewCombiBranchCode>> => {
	return axios.get("/secretary/combi-branches/new-code");
}

export interface ApiNewBranchCode {
	message: string,
	newBranchCode: string
}

export const apiGetNewBranchCode = (sportCode: string): Promise<AxiosResponse<ApiNewBranchCode>> => {
	return axios.get(`/secretary/branches/${sportCode}/new-code`);
}

export interface BranchWithSport {
	sportCode: string,
	sportTitle: string,
	branchCode: string,
	branchTitle: string
}

export interface ApiBranchesWithSports {
	message: string,
	branchesWithSports: BranchWithSport[]
}

export const apiGetBranchesWithSports = (): Promise<AxiosResponse<ApiBranchesWithSports>> => {
	return axios.get("/secretary/branches-with-sports");
}

export interface CombiBranch {
	countryCode: string,
	countryName: string,
	combiCode: string,
	combiTitle: string,
	subCode: string,
	subTitle: string,
	coefficient: number
}

export interface ApiCombiBranches {
	message: string,
	combiBranches: CombiBranch[]
}

export const apiGetCombiBranches = (): Promise<AxiosResponse<ApiCombiBranches>> => {
	return axios.get("/secretary/combi-branches");
}

export interface Sport {
	title: string,
	code: string
}

export interface ApiSports {
	message: string,
	sports: Sport[]
}

export const apiGetSports = (): Promise<AxiosResponse<ApiSports>> => {
	return axios.get("/secretary/sports/list");
}

// TODO: return type
export const apiUploadFunding = ({csvFile, countryCode, currency}: ApiUploadFundingProps): Promise<AxiosResponse<{}>> => {
	const formData = new FormData();
	formData.append("csvFile", csvFile);
	formData.append("json", JSON.stringify({countryCode: countryCode, currency: currency}))
	return axios.post("/secretary/funding/upload", formData);
}