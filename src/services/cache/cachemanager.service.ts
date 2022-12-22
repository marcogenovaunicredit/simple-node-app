export abstract class CacheManager {
    
    constructor() { }

    abstract put(key: String, value: any): Promise<Boolean>;

    abstract get(key: String, defaultValue?: any): Promise<any>;

    abstract delete (key: String): Promise<any|undefined>;

}