/** API adapters for the user part of the app. */

import {generalAxiosProvider as axios} from "app/axios_provider";
import {AxiosResponse} from "axios";

//------------- Pre success ---------

export type successType = {
    sport_name: string,
    points: number,
    order: number
}

export interface ApiListSuccess {
    message: string,
    data: {
       success: successType[]
    }
}

export const apiListSuccess = ()
    : Promise<AxiosResponse<ApiListSuccess>> =>
{
    return axios.get("/user/success");

}

//----------Pre chart ----------


export type chartType = {
    name: string,
    points: string,
    order : string
}

export interface ApiListChartType {
    message: string,
    data: {
        success: chartType[]
    }
}

export const apiListChart = ()
    : Promise<AxiosResponse<ApiListChartType>> =>
{

    return axios.get("/user/chart");
}


//----------Pre countries ----------


export type countryType = {
    code: string,
    name: string
}

export interface ApiListCountryType {
    message: string,
    data: {
        countries: countryType[]
    }
}

export const apiListCountry = ()
    : Promise<AxiosResponse<ApiListCountryType>> =>
{

    return axios.get("/user/countries");
}

export interface ApiSuccessType {
    data: {
        code: string
    }
}


export const apiSuccess = (code: string)
    : Promise<AxiosResponse<ApiListSuccess>> =>
{
        return axios.post("/user/success",{ code:code });
}