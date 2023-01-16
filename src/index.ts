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
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

//TODO define a abstract logic to define the usage of cluster or not (e.g. kubernetes approach
//resources managed by cluster)
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
    const port: any = process.env.HTTP_PORT || '8080';
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

    const apiOptions = {
        definition: {
            openapi: "3.0.3",
            info: {
                title: "microservice-boilerplate",
                version: "0.1.0",
                description:
                    "Base for microservices with node js",
                contact: {
                    name: "Marco Genova",
                    url: "https://it.linkedin.com/in/marcogenova",
                    email: "m.genova@sswprod.com",
                },
            },
            servers: [
                {
                    url: "http://localhost:" + port,
                    description: "Local development server"
                },
            ],
        },
        apis: ["./build/**/*.js"]
    };

    const specs: object = swaggerJsdoc(apiOptions);

    if (process.env.DEBUG_REST) {
        console.debug('Enabled swagger configuration');
        console.debug(JSON.stringify(specs));
    }

    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs, { explorer: true, customCssUrl: "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css" })
    );

    //TODO create a mechanism to load dynamically the routes
    routes.push(new KeepAliveRoutes(app));

    routes.forEach((route: GenericRoutesConfig) => {
        route.configureRoutes();
    });

    const server: http.Server = app.listen(port, () => {
        routes.forEach((route: GenericRoutesConfig) => {
            debugLog(`Routes configured for ${route.getName()}`);
        });
        console.log(`Server running at http://localhost:${port}`);
    });

}