import { APIRequestContext, request } from '@playwright/test';

export class APIHelper {

    private readonly request: APIRequestContext;
    private readonly baseURL: string;

    constructor(request: APIRequestContext, baseURL: string) {


        this.request = request;
        this.baseURL = baseURL;

    }

    //public reuseable HTTP methods:

    async getRequest(endpoint: string, requestHeaders?: Record<string, string>) {


        let response = await this.request.get(`${this.baseURL}${endpoint}`, { headers: requestHeaders });
        return {

            statusCode: response.status(),
            responseBody: await response.json()
        };
    }


    async postRequest(endpoint: string, bodyData: object, requestHeaders?: Record<string, string>) {


        let response = await this.request.post(`${this.baseURL}${endpoint}`, { headers: requestHeaders, data: bodyData });
        return {

            statusCode: response.status(),
            responseBody: await response.json()
        };


    }

    async updateRequest(endpoint: string, bodyData: object, requestHeaders?: Record<string, string>) {


        let response = await this.request.put(`${this.baseURL}${endpoint}`, { headers: requestHeaders, data: bodyData });

        return {

            statusCode: response.status(),
            responseBody: await response.json()

        };
    }

    async partialUpdateResquest(endpoint: string, bodyData: object, requestHeaders?: Record<string, string>) {

        let response = await this.request.patch(`${this.baseURL}${endpoint}`, { headers: requestHeaders, data: bodyData });

        return {
            statusCode: response.status(),
            responseBody: await response.json()
        };


    }

    async deleteRequest(endpoint: string, requestHeaders?: Record<string, string>) {


        let response = await this.request.delete(`${this.baseURL}${endpoint}`, { headers: requestHeaders });


        return {

            statusCode: response.status(),
            statusText: response.statusText()

        };
    }

}