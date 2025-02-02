/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedListOfSegment } from '../models/PagedListOfSegment';
import type { Segment } from '../models/Segment';
import type { SegmentPaging } from '../models/SegmentPaging';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class SegmentService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @param id
     * @returns Segment
     * @throws ApiError
     */
    public segmentGetSegment(
        id: string,
    ): CancelablePromise<Segment> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/Segment/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param nameContains
     * @param descriptionContains
     * @param galaxyId
     * @param solarSystemIds
     * @param xPagination
     * @returns PagedListOfSegment
     * @throws ApiError
     */
    public segmentGetSegments(
        nameContains?: string | null,
        descriptionContains?: string | null,
        galaxyId?: string | null,
        solarSystemIds?: Array<string> | null,
        xPagination?: SegmentPaging | null,
    ): CancelablePromise<PagedListOfSegment> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/Segment',
            headers: {
                'X-Pagination': xPagination,
            },
            query: {
                'NameContains': nameContains,
                'DescriptionContains': descriptionContains,
                'GalaxyId': galaxyId,
                'SolarSystemIds': solarSystemIds,
            },
        });
    }
}
