import { KeepAlive } from '../models/keepAlive.model';
import { ServiceStatus } from '../models/serviceStatus.enum';
import { TimeUtilities } from '../utilities/time.utilities';

class KeepAliveService {

    async executeKeepAlive() : Promise<KeepAlive> {
        const keepAliveDto: KeepAlive = {
            status: ServiceStatus.ACTIVE,
            timestamp: TimeUtilities.getTimestampAsString(),
            message: "not real checks on interfaces"
        };

        return keepAliveDto;
    }
}

export default new KeepAliveService();