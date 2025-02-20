import { Configuration, EntityApi, SegmentApi, SolarSystemApi } from "@voidforgeorg/universe-client";

class UniverseClient {
    private static instance: UniverseClient;
    private readonly configuration: Configuration;
    private readonly entityApi: EntityApi;
    private readonly segmentApi: SegmentApi;
    private readonly solarSystemApi: SolarSystemApi;

    private constructor() {
        this.configuration = new Configuration({
            basePath: import.meta.env.VITE_UNIVERSE_CLIENT
        });

        this.entityApi = new EntityApi(this.configuration);
        this.segmentApi = new SegmentApi(this.configuration);
        this.solarSystemApi = new SolarSystemApi(this.configuration);
    }

    public static getInstance(): UniverseClient {
        if (!UniverseClient.instance) {
            UniverseClient.instance = new UniverseClient();
        }
        return UniverseClient.instance;
    }

    public getEntityApi(): EntityApi {
        return this.entityApi;
    }

    public getSegmentApi(): SegmentApi {
        return this.segmentApi;
    }

    public getSolarSystemApi(): SolarSystemApi {
        return this.solarSystemApi;
    }
}

export default UniverseClient;