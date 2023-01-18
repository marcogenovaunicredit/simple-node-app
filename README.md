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

## Dependencies:

see the list of [dist dependencies](dependencies.md)

## References: