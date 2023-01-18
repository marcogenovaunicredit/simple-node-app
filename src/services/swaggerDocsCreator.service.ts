import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { readFile } from "fs/promises";

class SwaggerDocsCreatorService {

    async installSwaggerOnExpressApplication(app: express.Application) : Promise<void> {

        const specs: object = swaggerJsdoc(JSON.parse(await readFile('./swagger-base-definition.json', "utf8")));

        if (process.env.DEBUG_REST) {
            console.debug('Enabled swagger configuration');
            console.debug(JSON.stringify(specs));
        }

        app.use(
            "/api-docs",
            swaggerUi.serve,
            swaggerUi.setup(specs, { explorer: true, customCssUrl: "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css" })
        );
    }
}

export default new SwaggerDocsCreatorService();