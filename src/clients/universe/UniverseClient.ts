/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';
import { EntityService } from './services/EntityService';
import { GalaxyService } from './services/GalaxyService';
import { SegmentService } from './services/SegmentService';
import { SolarSystemService } from './services/SolarSystemService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class UniverseClient {
    public readonly entity: EntityService;
    public readonly galaxy: GalaxyService;
    public readonly segment: SegmentService;
    public readonly solarSystem: SolarSystemService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '1.0.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.entity = new EntityService(this.request);
        this.galaxy = new GalaxyService(this.request);
        this.segment = new SegmentService(this.request);
        this.solarSystem = new SolarSystemService(this.request);
    }
}

