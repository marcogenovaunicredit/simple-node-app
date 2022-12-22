import { KeepAlive } from '../src/models/keepAlive.model';
import keepaliveService from '../src/services/keepAlive.service';

describe('Testing the async call to keep Alive service', () => {
    test('DTO Keep Alive is not null and all the fields are populated', async () => {
        let keepAlive: KeepAlive = await keepaliveService.executeKeepAlive()

        expect(keepAlive).not.toBeNull();
        expect(keepAlive.status).not.toBeNull();
        expect(keepAlive.timestamp).not.toBeNull();
        expect(keepAlive.message).not.toBeNull();
    });
});