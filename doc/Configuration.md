# Pip.Services Template Configuration Guide

Configuration structure used by this module follows the 
[standard configuration](https://github.com/pip-services/pip-services/blob/master/usage/Configuration.md) 
structure. 

### Overview

- **factories** - add any dynamically loaded factories, if you need to include non-standard components
- **boot** - use any boot configuration is supported
- **discovery** - use any discovery mechanism
- **logs** - use any loggers
- **counters** - use any performance counters
- **cache** - cache is not used by components in this module. skip it
- **persistence** - supported **memory**, **file** and **mongodb** persistence types within **pip-services-dummies** group
- **controller** - default controller within **pip-services-dummies** group
- **clients** - this module doesn't rely on other microservices. skip it
- **decorators** - all custom decorators must be within **pip-services-dummies** group
- **services** - supported **rest** and **seneca** service types version "1.0" within **pip-services-dummies** group
- **addons** - use any available addon

### Example

```yaml
logs:
    descriptor:
        type: "console" 
    options:
        level: "debug" 
counters: 
    descriptor:
        type: "log"
    options: 
        timeout: 10000 
persistence:
    descriptor:
        group: "pip-services-dummies"
        type: "file"
    options:
        path: "dummies.json"
controlers:
    descriptor:
        group: "pip-services-dummies"
services:
  - descriptor:
        group: "pip-services-dummies"
        type: "seneca"
        version: "1.0"
    endpoint:
        type: "tcp"
        host: localhost
        port: 80401
  - descriptor:            
        group: "pip-services-dummies"
        type: "rest"
        version: "1.0"
    endpoint:
        type: "http"
        host: "localhost"
        port: 80001
```
