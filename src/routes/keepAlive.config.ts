import express from 'express';
import keepAliveController from '../controllers/keepAlive.controller';
import { GenericRoutesConfig } from './generic.config';

export class KeepAliveRoutes extends GenericRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes() {
        this.app.route(`/monitor/keep-alive`).get(keepAliveController.keepAlive);
        return this.app;
    }

}