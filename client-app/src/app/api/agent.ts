import axios, { AxiosResponse } from "axios";
import { Competition } from "../models/competition";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const request = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Competitions = {
    list: () => request.get<Competition[]>('/competition'),
    details: (id: string) => request.get<Competition>(`/competition/${id}`),
    create: (competition: Competition) => request.post<void>('/competition', competition),
    update: (competition: Competition) => request.put<void>(`/competition/${competition.id}`, competition),
    delete: (id: string) => request.del<void>(`/competition/${id}`)
}

const agent = {
    Competitions
}

export default agent;