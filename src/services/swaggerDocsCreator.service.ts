import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

class SwaggerDocsCreatorService {

    async installSwaggerOnExpressApplication(app: express.Application) : Promise<void> {
        const port: any = process.env.HTTP_PORT || '8080';

        const specs: object = swaggerJsdoc({
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
        });

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