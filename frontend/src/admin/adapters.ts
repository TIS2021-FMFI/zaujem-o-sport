import {AxiosResponse} from "axios";
import {adminAxiosProvider as axios} from "admin/axios_provider";

export interface ApiUploadFiles {
	fundingFile?: File,
	successFile?: File,
	interconnectednessFile?: File
}

// TODO: return type
export const apiUploadFiles = ({fundingFile, successFile, interconnectednessFile}: ApiUploadFiles): Promise<AxiosResponse<{}>> => {
	const formData = new FormData();
	if (fundingFile !== undefined)            formData.append("fundingFile", fundingFile);
	if (successFile !== undefined)            formData.append("successFile", successFile);
	if (interconnectednessFile !== undefined) formData.append("interconnectednessFile", interconnectednessFile);
	return axios.post("/admin/upload", formData);
}

export interface ApiAddNewCountryProps {
	name: string,
	translation: string,
	code: string
}

export const apiAddNewCountry = ({name, translation, code}: ApiAddNewCountryProps): Promise<AxiosResponse<{}>> => {
	return axios.post("/admin/countries/add", {name: name, translation: translation, code: code});
}

export interface apiUpdateSportProps {
	oldCode: string,
	newCode: string,
	newTitle: string
}

export const apiUpdateSport = ({oldCode, newCode, newTitle}: apiUpdateSportProps): Promise<AxiosResponse<{}>> => {
	return axios.put("/admin/sports/update", {oldCode: oldCode, newCode: newCode, newTitle: newTitle});
}