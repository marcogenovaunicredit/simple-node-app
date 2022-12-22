import { CacheContainer } from "node-ts-cache";
import { MemoryStorage } from 'node-ts-cache-storage-memory'
import { CacheManager } from './cachemanager.service';

class NodeCacheManager extends CacheManager {

    private _refCache: CacheContainer;

    constructor() {
        super();

        this._refCache = new CacheContainer(new MemoryStorage());
    }

    async put(key: String, value: any): Promise<Boolean> {
        this._refCache.setItem(key.toString(), value, { ttl: 60 });
        return true;
    }

    async get(key: String, defaultValue?: any): Promise<any> {
        let gotValue = await this._refCache.getItem(key.toString());
        if (!gotValue) gotValue = defaultValue;

        return gotValue;
    }

    async delete(key: String): Promise<any | undefined> {
        //NOP 
        return undefined;
    }

}

export default new NodeCacheManager();