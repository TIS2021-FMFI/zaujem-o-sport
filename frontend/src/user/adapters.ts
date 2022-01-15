/** API adapters for the secretary part of the app. */

import {axiosProvider as axios} from "app/axios_provider";
import {AxiosResponse} from "axios";


export type successType = {
    title: string,
    points: number,
    order: number
}

export interface ApiListSuccess {
    message: string,
    data: {
       successes: successType[]
    }
}

export const apiListSuccess = ()
    : Promise<AxiosResponse<ApiListSuccess>> =>
{
    return axios.get("/user/success");

}