import { CacheManager } from './cachemanager.service';
import { CacheFactory } from './cachefactory.service';
import nodeCacheManager from "./localcachemanager.service";

class InMemoryCacheFactory implements CacheFactory {    
    async getCacheManager(cacheType: String): Promise<CacheManager> {
        //TODO add the cache type management
        return nodeCacheManager;
    }
}

export default new InMemoryCacheFactory();