import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const instance: AxiosInstance = axios.create({});

instance.interceptors.request.use((config: AxiosRequestConfig) => config);

instance.interceptors.response.use((config: AxiosResponse<any>) => config);

export default instance;
