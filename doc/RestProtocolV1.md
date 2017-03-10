# HTTP REST Protocol (version 1) <br/> Pip.Services Template

Pip.Services Template microservice implements a REST compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [Dummy class](#class1)
* [DummyPage class](#class2)
* [GET /dummies](#operation1)
* [GET /dummies/:dummy_id](#operation2)
* [POST /dummies](#operation3)
* [PUT /dummies/:dummy_id](#operation4)
* [DELETE /dummies/:dummy_id](#operation5)

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

### <a name="operation1"></a> Method: 'GET', route '/dummies'

Retrieves a collection of dummy objects according to specified criteria

**Parameters:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- key: string - (optional) a Dummy natural key
- skip: int - (optional) start of page (default: 0). Operation returns paged result
- take: int - (optional) page length (max: 100). Operation returns paged result

**Response body:**
Array of Dummy objects, DummyPage if paging was requested or error

### <a name="operation2"></a> Method: 'GET', route '/dummies/:dummy_id'

Retrieves a single dummy object specified by its unique id

**Parameters:** 
- dummy_id: string - unique Dummy object id
- correlation_id: string - (optional) unique id that identifies distributed transaction

**Response body:**
Dummy object, null if object wasn't found or error 

### <a name="operation3"></a> Method: 'POST', route '/dummies'

Creates a new dummy object

**Parameters:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction

**Request body:**
Dummy object to be created. If object id is not defined it is assigned automatically.

**Response body:**
Created Dummy object or error

### <a name="operation4"></a> Method: 'PUT', route '/dummies/:dummy_id'

Updates dummy object specified by its unique id

**Parameters:** 
- dummy_id: string - unique Dummy object id
- correlation_id: string - (optional) unique id that identifies distributed transaction

**Request body:**
Dummy object with new values. Partial updates are supported

**Response body:**
Updated Dummy object or error 
 
### <a name="operation5"></a> Method: 'DELETE', route '/dummies/:dummy_id'

Deletes dummy object specified by its unique id

**Parameters:** 
- dummy_id: string - unique Dummy object id
- correlation_id: string - (optional) unique id that identifies distributed transaction

**Response body:**
Occured error or null for success 
 
