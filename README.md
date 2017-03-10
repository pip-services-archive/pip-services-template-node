# <img src="https://github.com/pip-services/pip-services/raw/master/design/Logo.png" alt="Pip.Services Logo" style="max-width:30%"> <br/> Pip.Services template for Node.js

This is a Node.js microservice template that implements Pip.Services 
[reference architecture](https://github.com/pip-services/pip-services/blob/master/design/Architecture.md).

The template demostrates key architectural patterns:
* Microservice decomposition into individual components
* Component configuration
* Pluggable data access with data versioning
* Pluggable external dependencies (clients)
* Pluggable external endpoints (services) with versioning
* Logging (tracing)
* Counters for performance monitoring
* Multiple deployment configuration and runners

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, Windows Service or Linux Demon via Forever, Seneca Plugin, AWS Lambda Function
* External APIs: HTTP/REST, Seneca, AWS Lambda
* Persistence: In-Memory, Flat Files, MongoDB

This microservice has no dependencies on other microservices.

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK Version 1](doc/NodeClientApiV1.md)
* Communication Protocols
  - [HTTP/REST Version 1](doc/RestProtocolV1.md)
  - [Seneca Version 1](doc/SenecaProtocolV1.md)
  - [AWS Lambda Version 1](doc/LambdaProtocolV1.md)

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services/pip-services-template-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yaml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yaml** file. 

Example of microservice configuration
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
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-template-node": "^1.0.0",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('pip-clients-template-node').Version1;
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    endpoint: {
        type: 'http',
        host: 'localhost', 
        port: 80001
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.DummyRestClient(config);

// Connect to the microservice
client.open(function(err) {
    if (err) {
        console.error('Connection to the microservice failed');
        console.error(err);
        return;
    }
    
    // Work with the microservice
    ...
});
```

Now the client is ready to perform operations
```javascript
// Create a new dummy objects
var dummy = {
    key: 'Dummy key',
    content: 'Dummy content'
};

client.createDummy(
    null,
    { 
        dummy: dummy 
    },
    function (err, dummy) {
        ...
    }
);
```

```javascript
// Get the list of dummy objects
client.getDummies(null, function(err, dummies) {
    ...    
});
```    

## Acknowledgements

This microservice template was created by joined work of the entire Pip.Services team.

The current maintainer of the microservice is *Sergey Seroukhov*.

