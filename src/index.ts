import cluster from 'cluster';
import http from 'http';
import { OSUtilities } from './utilities/osUtilities';
import process from 'process';
import express from 'express';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { KeepAliveRoutes } from './routes/keepAlive.config';
import debug from 'debug';
import { GenericRoutesConfig } from './routes/generic.config';

const numberOfCores = OSUtilities.getNumberOfCPUBasic();

if (cluster.isPrimary) {
    console.log(`Master ${process.pid} started`);
    for (let i = 0; i < numberOfCores; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} stopped working`);
        cluster.fork();
    });
    cluster.on('fork', (worker) => {
        console.log(`Worker ${worker.process.pid} started`);
    });
} else {
    const app: express.Application = express();
    const port: any = process.env.HTTP_PORT||'8080';
    const routes: Array<GenericRoutesConfig> = [];
    const debugLog: debug.IDebugger = debug('app');
    
    // here we are adding middleware to parse all incoming requests as JSON 
    app.use(express.json());

    // here we are adding middleware to allow cross-origin requests
    app.use(cors());

    // here we are preparing the expressWinston logging middleware configuration,
    // which will automatically log all HTTP requests handled by Express.js
    const loggerOptions: expressWinston.LoggerOptions = {
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.json(),
            winston.format.prettyPrint(),
            winston.format.colorize({ all: true })
        ),
    };

    if (!process.env.DEBUG_REST) {
        loggerOptions.meta = false; // when not debugging, log requests as one-liners
    }

    // initialize the logger with the above configuration
    app.use(expressWinston.logger(loggerOptions));

    //TODO create a mechanism to load dynamically the routes
    routes.push(new KeepAliveRoutes(app));

    routes.forEach((route: GenericRoutesConfig) => {
        route.configureRoutes();
    });

    const server: http.Server = app.listen(port, () => {
        routes.forEach((route: GenericRoutesConfig) => {
            debugLog(`Routes configured for ${route.getName()}`);
        });
        console.log( `Server running at http://localhost:${port}`);
    });

}