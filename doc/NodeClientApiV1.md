# Node.js Client API (version 1) <br/> Pip.Services Template

Node.js client API for Pip.Services Template microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [Dummy class](#class1)
* [DummyPage class](#class2)
* [IDummyClient interface](#interface)
    - [configure()](#operation0)
    - [init()](#operation1)
    - [open()](#operation2)
    - [close()](#operation3)
    - [getDummies()](#operation4)
    - [getDummyById()](#operation5)
    - [createDummy()](#operation6)
    - [updateDummy()](#operation7)
    - [deleteDummy()](#operation8)
* [DummyRestClient class](#client_rest)
* [DummySenecaClient class](#client_seneca)
* [DummyLambdaClient class](#client_lambda)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

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

Then download the dependency using **npm**:

```javascript
# Installing dependencies
npm install

# Updating dependencies
npm update
```

If you are using Typescript, add the following type definition where compiler can find it
```javascript
/// <reference path="../node_modules/pip-clients-template-node/module.d.ts" />
```

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
var sdk = new require('pip-clients-template-node').Version1;

// Client configuration
var config = {
    endpoint: {
        type: 'http',
        host: 'localhost', 
        port: 80001
    }
};

// Create the client instance
var client = sdk.DummyRestClient(config);

// Open client connection to the microservice
client.open(function(err) {
    if (err) {
        console.error(err);
        return; 
    }
    
    console.log('Opened connection');

    // Create a new instance of dummy object
    var dummy1 = {
        key: 'Dummy key',
        content: 'Dummy content'
    };

    // Call microservice to create the instance
    client.createDummy(null, dummy1, function (err, dummy) {
        if (err) {
            console.error(err);
            return;
        }
        
        console.log('Dummy object is created');
        console.log(dummy);
        
        // Read up to 10 objects from the microservice
        client.getDummies(
            null,
            {
                paging: {
                    skip: 0,
                    take: 10
                }
            },
            function (err, dummies) {
                if (err) {
                    console.error(err);
                    return;
                }
                
                console.log('Read dummy objects');
                console.log(dummies);
                
                // Close connection
                client.close(); 
            }
        );
    });
});
```

### <a name="class1"></a> Dummy class

Represents a dummy object to demonstrate CRUD operations

**Properties:**
- id: string - a globaly unique object id
- key: string - a natural Dummy key
- content: string - a textual Dummy content

### <a name="class2"></a> DummyPage class

Represents a paged result with subset of requested dummy objects

**Properties:**
- data: [Dummy] - array of retrieved Dummy page
- count: int - total number of objects in retrieved resultset

## <a name="interface"></a> IDummyClient interface

If you are using Typescript, you can use IDummyClient as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about IDummyClient interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface IDummyClient {
    configure(config);
    init(components);
    open(callback);
    close(callback);
    getDummies(correlationId, filter, paging, callback);
    getDummyById(correlationId, dummyId, callback);
    createDummy(correlationId, dummy, callback);
    updateDummy(correlationId, dummyId, dummy, callback);
    deleteDummy(correlationId, dummyId, callback);
}
```

### <a name="operation0"></a> configure(config)

Sets component configuration. 

**Method arguments:** 
- config: ComponentConfig - component configuration object

### <a name="operation1"></a> link(components)

Initializes client references. This method is optional. It is used to set references 
to logger or performance counters.

**Method arguments:** 
- components: ComponentSet - references to other components, such as ILog or ICounters

### <a name="operation2"></a> open(callback)

Opens connection to the microservice

**Method arguments:**
- callback: (err) => void - callback function
  - err - Error or null is no error occured

### <a name="operation3"></a> close(callback)

Closes connection to the microservice

**Method arguments:**
- callback: (err) => void - callback function
  - err - Error or null is no error occured

### <a name="operation4"></a> getDummies(correlationId, filter, paging, callback)

Retrieves a collection of dummy objects according to specified criteria

**Method arguments:** 
- correlationId: string - (optional) unique id that identifies distributed transaction
- filter: FilterParams - filter parameters
  - key: string - (optional) a Dummy natural key
- paging: PagingParams - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result
  - paging: boolean - (optional) true to enable paging, calculate total count
- callback: (err, page) - callback function
  - err - Error or null is no error occured
  - page: DummyPage - retrieved dummy objects in page format

### <a name="operation5"></a> getDummyById(correlationId, dummyId, callback)

Retrieves a single dummy object specified by its unique id

**Method arguments:** 
- correlationId: string - (optional) unique id that identifies distributed transaction
- dummyId: string - unique Dummy object id
- callback: (err, dummy) => void - callback function
    - err - Error or null is no error occured
    - dummy: Dummy - a Dummy object, null if object wasn't found 

### <a name="operation6"></a> createDummy(correlationId, dummy, callback)

Creates a new dummy object

**Params properties:** 
- correlationId: string - (optional) unique id that identifies distributed transaction
- dummy: Dummy - Dummy object to be created. If object id is not defined it is assigned automatically.
- callback: (err, dummy) => void - callback function
  - err - Error or null is no error occured
  - dummy: Dummy - a created Dummy object

### <a name="operation7"></a> updateDummy(correlationId, dummyId, dummy, callback)

Updates dummy object specified by its unique id

**Params properties:** 
- correlationId: string - (optional) unique id that identifies distributed transaction
- dummyId: string - unique Dummy object id
- dummy: Dummy - a Dummy object with new values. Partial updates are supported
- callback: (err, dummy) => void - callback function
  - err - Error or null is no error occured
  - dummy: Dummy - an updated Dummy object
 
### <a name="operation8"></a> deleteDummy(correlationId, dummyId, callback)

Deletes dummy object specified by its unique id

**Params properties:** 
- correlationId: string - (optional) unique id that identifies distributed transaction
- dummyId: string - unique Dummy object id
- callback: (err) => void - callback function
  - err - Error or null is no error occured
 
## <a name="client_rest"></a> DummyRestClient class

DummyRestClient is a client that implements HTTP/REST protocol

```javascript
class DummyRestClient extends RestClient implements IDummyClient {
    constructor(config: any);
    configure(config);
    link(components);
    open(callback);
    close(callback);
    getDummies(correlationId, filter, paging, callback);
    getDummyById(correlationId, dummyId, callback);
    createDummy(correlationId, dummy, callback);
    updateDummy(correlationId, dummyId, dummy, callback);
    deleteDummy(correlationId, dummyId, callback);
}
```

**Constructor config properties:** 
- endpoint: object - HTTP transport configuration options
  - type: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> DummySenecaClient class

DummySenecaClient is a client that implements Seneca protocol

```javascript
class DummySenecaClient extends SenecaClient implements IDummyClient {
    constructor(config: any);        
    configure(config);
    link(components);
    open(callback);
    close(callback);
    getDummies(correlationId, filter, paging, callback);
    getDummyById(correlationId, dummyId, callback);
    createDummy(correlationId, dummy, callback);
    updateDummy(correlationId, dummyId, dummy, callback);
    deleteDummy(correlationId, dummyId, callback);
}
```

**Constructor config properties:** 
- endpoint: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - type: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

## <a name="client_lambda"></a> DummyLambdaClient class

DummyLambdaClient is a client that implements AWS Lambda protocol

```javascript
class DummyLambdaClient extends LambdaClient implements IDummyClient {
    constructor(config: any);        
    configure(config);
    link(components);
    open(callback);
    close(callback);
    getDummies(correlationId, filter, paging, callback);
    getDummyById(correlationId, dummyId, callback);
    createDummy(correlationId, dummy, callback);
    updateDummy(correlationId, dummyId, dummy, callback);
    deleteDummy(correlationId, dummyId, callback);
}
```

**Constructor config properties:** 
- endpoint: object - AWS Lambda connection settings
  - type: string - shall be 'aws' 
  - function: string - a short function name of full arn
  - region: string - Region code 
- options: object - AWS Lambda options
  - access\_key\_id: string - AWS access key
  - secret\_access\_key: string - AWS secret access key
