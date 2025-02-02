/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Galaxy } from '../models/Galaxy';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class GalaxyService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @param galaxyName
     * @returns string
     * @throws ApiError
     */
    public galaxyCreateGalaxy(
        galaxyName?: string,
    ): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/Galaxy',
            query: {
                'galaxyName': galaxyName,
            },
        });
    }
    /**
     * @param id
     * @returns Galaxy
     * @throws ApiError
     */
    public galaxyGetGalaxy(
        id: string,
    ): CancelablePromise<Galaxy> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/Galaxy/{id}',
            path: {
                'id': id,
            },
        });
    }
}
