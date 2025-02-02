/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedListOfSolarSystem } from '../models/PagedListOfSolarSystem';
import type { SolarSystem } from '../models/SolarSystem';
import type { SolarSystemPaging } from '../models/SolarSystemPaging';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class SolarSystemService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @param id
     * @returns SolarSystem
     * @throws ApiError
     */
    public solarSystemGetSolarSystem(
        id: string,
    ): CancelablePromise<SolarSystem> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/SolarSystem/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param nameContains
     * @param segmentId
     * @param entityIds
     * @param minimumEntityCount
     * @param maximumEntityCount
     * @param xPagination
     * @returns PagedListOfSolarSystem
     * @throws ApiError
     */
    public solarSystemGetSolarSystems(
        nameContains?: string | null,
        segmentId?: string | null,
        entityIds?: Array<string> | null,
        minimumEntityCount?: number | null,
        maximumEntityCount?: number | null,
        xPagination?: SolarSystemPaging | null,
    ): CancelablePromise<PagedListOfSolarSystem> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/SolarSystem',
            headers: {
                'X-Pagination': xPagination,
            },
            query: {
                'NameContains': nameContains,
                'SegmentId': segmentId,
                'EntityIds': entityIds,
                'MinimumEntityCount': minimumEntityCount,
                'MaximumEntityCount': maximumEntityCount,
            },
        });
    }
}
