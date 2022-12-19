import express from 'express';
import { KeepAlive, ServiceStatus } from '../models/keepAlive.model';
import { TimeUtilities } from '../utilities/time.utilities';
import { GenericRoutesConfig } from './generic.config';

export class KeepAliveRoutes extends GenericRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes() {

        this.app.route(`/monitor/keep-alive`)
            .get((req: express.Request, res: express.Response) => {
                let keepAliveDto: KeepAlive = {
                    status: ServiceStatus.ACTIVE,
                    timestamp: TimeUtilities.getTimestampAsString(),
                    message: "not real checks on interfaces"
                };
                res.status(200).send(keepAliveDto);
            });

        return this.app;
    }

}