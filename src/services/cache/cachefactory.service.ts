import { CacheManager } from './cachemanager.service';
export abstract class CacheFactory {
    abstract getCacheManager(cacheType: String): Promise<CacheManager>;
}