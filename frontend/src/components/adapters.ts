/** API adapters for the secretary part of the app. */

import {axiosProvider as axios} from "app/axios_provider";
import {AxiosResponse} from "axios";

export interface ApiSecretaryLoginResponseType {
    message: string,
    data: {
        accessToken?: string
    }
}

export const apiSecretaryLogin = (email: string, password: string)
    : Promise<AxiosResponse<ApiSecretaryLoginResponseType>> =>
{
    return axios.post("/secretary/login", {
        "email": email,
        "password": password
    });
}

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