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
                res.status(200).send(new KeepAlive(ServiceStatus.ACTIVE, TimeUtilities.getTimestampAsString(), "not real checks on interfaces"));
            });

        return this.app;
    }

}