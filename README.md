# microservice-boilerplate
Base for microservices with node js.

This boilerplate is agnostic to the infrastructure. The microservices can be configured to exploits a cluster approach based on a simple strategy to scale on the number of thread cores available for the process (#cores - 1, e.g. available cores: 4, the process launches 3 parallel threads one per thread core). 

:warning: **Warning** In a cloud environment, it's important to move on single thread strategy and manage the scalability at cloud provider level

The git-flow will be based on feature management.


## Dependencies:

see the list of [dist dependencies](dependencies.md)

## References:

[1] https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1