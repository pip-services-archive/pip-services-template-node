# AWS Lambda Protocol (version 1) <br/> Pip.Services Template

Pip.Services Template microservice implements AWS Lambda compatible API. 

The entire microservice is wrapped into a single lambda function.
Selection of specific operation is done via special **cmd** parameter.
The rest parameters are passed to the operation.

The input and output parameters shall be serialized as JSON string.

The protocol is identical to the one used by [Seneca](./SenecaProtocolV1.md)   

First get reference to AWS SDK, set connection parameters and get reference to Lambda:

```javascript
var aws = require('aws-sdk')();

aws.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region
});

var lambda = new aws.Lambda();
```

Then you can start calling Lambda function:

```javascript
var params = {
    cmd: ...operation name...,
    ... the rest params ...
};

lambda.invoke(
    {
        FunctionName: arn,
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify(params)
    },
    function (err, response) {
        if (err) ...
        var result = JSON.parse(response.Payload);
        ...
    }
);
```

* [Dummy class](#class1)
* [DummyPage class](#class2)
* [cmd: 'get_dummies'](#operation1)
* [cmd: 'get_dummy_by_id'](#operation2)
* [cmd: 'create_dummy'](#operation3)
* [cmd: 'update_dummy'](#operation4)
* [cmd: 'delete_dummy'](#operation5)

## Data types

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

## Operations

### <a name="operation1"></a> Cmd: 'get_dummies'

Retrieves a collection of dummy objects according to specified criteria

**Arguments:** 
- filter: object - filter parameters
  - key: string - (optional) a Dummy natural key
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Returns:**
- err: Error - occured error or null for success
- result: [Dummy] or DummyPage - retrieved dummy objects in plain array or page format

### <a name="operation2"></a> Cmd: 'get_dummy_by_id'

Retrieves a single dummy object specified by its unique id

**Arguments:** 
- dummy_id: string - unique Dummy object id

**Returns:**
- err: Error - occured error or null for success
- result: Dummy - retrieved Dummy object, null if object wasn't found 

### <a name="operation3"></a> Cmd: 'create_dummy'

Creates a new dummy object

**Arguments:** 
- dummy: Dummy - Dummy object to be created. If object id is not defined it is assigned automatically.

**Returns:**
- err: Error - occured error or null for success
- result: Dummy - created Dummy object

### <a name="operation4"></a> Cmd: 'update_dummy'

Updates dummy object specified by its unique id

**Arguments:** 
- dummy_id: string - unique Dummy object id
- dummy: Dummy - a Dummy object with new values. Partial updates are supported

**Returns:**
- err: Error - occured error or null for success
- result: Dummy - updated Dummy object 
 
### <a name="operation5"></a> Cmd: 'delete_dummy'

Deletes dummy object specified by its unique id

**Arguments:** 
- dummy_id: string - unique Dummy object id

**Returns:**
- err: Error - occured error or null for success
 
