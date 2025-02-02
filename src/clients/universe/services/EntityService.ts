/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Entity } from '../models/Entity';
import type { EntityPaging } from '../models/EntityPaging';
import type { EntityType } from '../models/EntityType';
import type { PagedListOfEntity } from '../models/PagedListOfEntity';
import type { PatchEntityDTO } from '../models/PatchEntityDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class EntityService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @param id
     * @returns Entity
     * @throws ApiError
     */
    public entityGetEntity(
        id: string,
    ): CancelablePromise<Entity> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/Entity/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns Entity
     * @throws ApiError
     */
    public entityPatchEntity(
        id: string,
        requestBody: PatchEntityDTO,
    ): CancelablePromise<Entity> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/Entity/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param nameContains
     * @param solarSystemId
     * @param entityType
     * @param ownedByPlayerId
     * @param xPagination
     * @returns PagedListOfEntity
     * @throws ApiError
     */
    public entityGetEntities(
        nameContains?: string | null,
        solarSystemId?: string | null,
        entityType?: EntityType | null,
        ownedByPlayerId?: string | null,
        xPagination?: EntityPaging | null,
    ): CancelablePromise<PagedListOfEntity> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/Entity',
            headers: {
                'X-Pagination': xPagination,
            },
            query: {
                'NameContains': nameContains,
                'SolarSystemId': solarSystemId,
                'EntityType': entityType,
                'OwnedByPlayerId': ownedByPlayerId,
            },
        });
    }
}
