# microservice-boilerplate
Base for microservices with node js.

This boilerplate is agnostic to the infrastructure. The microservices can be configured to exploits a cluster approach based on a simple strategy to scale on the number of thread cores available for the process (#cores - 1, e.g. available cores: 4, the process launches 3 parallel threads one per thread core). 

:warning: **Warning** In a cloud environment, it's important to move on single thread strategy and manage the scalability at cloud provider level

The git-flow will be based on feature management.

## Configuration

The list of the all the properties follows:<br>

> #### SCALING_STRATEGY
> this property enable the application to exploits different strategy to scale-up:
>
> - CLOUD: the application manages only single thread, the scaling up is managed by cloud provider or equivalent
> - SERVER: the application takes care to choose the right number thread (the ceiling of the half number of CPUs)
> 
> if the property is *not defined* the strategy used is the **SERVER**

> #### ENABLE_SWAGGER
> this property enable the swagger documentation web site available on *api-docs/*:
>
> - Y: web site operative
> - N: web site not operative
> 
> if the property is *not defined* the strategy used is the **N**
>
> The base of the swagger docs configuration is defined in the file *swagger-base-definition.json* in the root directory of the project.

> #### DATABASE_STRATEGY
> this property enable the application to use the mongo database with a specific initializer algorithm in which the connection pool is started at the bootstrap of the application. 
>At the moment, MongoDB is a mandatory component to use. In the *future* will be optional component.
> Only value:
>
> - MONGO_STD

> #### DATABASE_URI
> this property contains the complete URL of the database. In the actual implementation is not active the authentication mechanism.
> The default string is *mongodb://localhost:27017/LOCAL_TEST*

## Database connectivity
The boilerplate take in account the connection to the NOSQL storage. In order to test the implementation and the integration a MongoDB local installation is used. The version of MongoDB is **6.0.4**, instructions for the installation are [HERE](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/). 

The **models** of MongoDB are based on *Mongoose*. In order to enable the mechanism a simple Schema was created (Product).
The schemas can be defined at project level at the moment. 

<mark>NOTE</mark>: For the tests, A Windows workstation was used, in general there are'nt issue on other platforms. 

## Dependencies:

see the list of [dist dependencies](dependencies.md)

## References: