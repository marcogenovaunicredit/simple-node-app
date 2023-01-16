import express from 'express';
import keepAliveController from '../controllers/keepAlive.controller';
import { GenericRoutesConfig } from './generic.config';


/**
 * @openapi
 * tags:
 *   name: keep-alive
 *   description: keep alive application api
 * /monitor/keep-alive:
 *   get:
 *     summary: gets the status of the microservice
 *     tags: [keep-alive]
 *     responses:
 *       200:
 *         description: The status of the microservice.
 *         content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/schemas/keep-alive'
 *       500:
 *         description: Some server error
 * 
 */
export class KeepAliveRoutes extends GenericRoutesConfig {
    private static ROUTE_NAME = 'KeepAliveRoute';
    
    constructor(app: express.Application) {
        super(app, KeepAliveRoutes.ROUTE_NAME);
    }

    configureRoutes() {
        this.app.route(`/monitor/keep-alive`).get(keepAliveController.keepAlive);
        return this.app;
    }

}