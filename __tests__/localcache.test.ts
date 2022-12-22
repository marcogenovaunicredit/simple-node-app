import inMemoryCache from '../src/services/cache/localcachefactory.service';
import { CacheManager } from '../src/services/cache/cachemanager.service';

describe('Testing local cache', () => {
    test('Test basic factory', async () => {
        let cacheManager: CacheManager = await inMemoryCache.getCacheManager('local');
        expect (cacheManager).not.toBeNull();
    });

    test('Test set and get', async () => {
        let cacheManager: CacheManager = await inMemoryCache.getCacheManager('local');
        let executed: Boolean =  await cacheManager.put('key1',{prop: true});
        expect(executed).toBeTruthy();
        let value = await cacheManager.get('key1');
        expect(value).toEqual({prop: true});
    });
});