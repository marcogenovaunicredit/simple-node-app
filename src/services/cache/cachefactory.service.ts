abstract class CacheFactory {
    abstract getCacheManager(cacheType: String): Promise<CacheManager>;
}