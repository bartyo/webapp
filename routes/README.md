Explanation of [API routes](https://github.com/ProjSante/webapp/tree/develop/routes).

This API follows the REST (REpresentational State Transfer) architecture and return data in JSON (JavaScript Object Notation) format.

## Requirements
- User registration (Register)
- User authentication (Sign in)
- User session management using JWT
- User profile showing its configurations (institution, relays, plan, etc) - CRUD
- User dashboard shows data from all relays (DB)
- Each patient will be bound to a device
- Each device can obtain different vital signs from the patient
- Different devices can be bound to a relay
- Relays can send JSON data to the API that will be stored in a DB
- The patient dashboard shows all data (DB) - CRUD

### Definitions
**CRUD**: Create, Read, Update and Delete

**User**: Is the institution that subscribed to our services (Hospital, clinic, ER, etc)

**Patient**: Is the person admitted to the medical institution

**Device**: Is an object that will sample different vital signs and will communicate them to the relays

**Relay**: Is the device that will send a POST request to the API

## Routes
- `/api`: contains all the API endpoints and routes
	- `auth`: authentication verification
	- `users`: user creation and information
	- `patients`: data from admission to discharge
	- `relays`: data from devices

When interacting with API, header must contain:
- `Content-type: application/json`
- `x-auth-token: token`: (when applicable :lock:)

### `auth`
- :lock: GET (`/api/auth`): Validate token to authenticate access

`// Response`
```json
{
    "preferences": {
        "pulse": {
            "danger": {
                "minLevel": 60,
                "maxLevel": 180
            },
            "warning": {
                "minLevel": 80,
                "maxLevel": 172
            }
        },
        "oxygensat": {
            "danger": {
                "minLevel": 0.5,
                "maxLevel": 2
            },
            "warning": {
                "minLevel": 0.7,
                "maxLevel": 1.7
            }
        }
    },
    "_id": "5d8e59e7419ed60a9434ca77",
    "firstname": "John",
    "lastname": "Travolta",
    "institution": "Pulp Fiction",
    "jobtitle": "Superstar",
    "email": "test@test.com",
    "date": "2019-09-27T18:50:15.149Z",
    "__v": 103
}
```
- POST (`/api/auth`): Login 
(:exclamation:: `email` and `password`)

`// Request`
```json
{
	"email": "dan@chua.com",
	"password": "dan123"
}
```
`// Response`
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2c2VyIjp7ImlkIjoiNWQ4ZTU5ZTc0MTllZDYwYTk0MzRjYTc3In0sImlhdCI6MTU3MDQ0MDA0NSwiZXhwIjoxNjAxOTc2MDQ1fQ.5MlUZdOvwjjZK3r6ol19C83apfVCd4OQhr6Pc9saXv8"
}
```

### `users`
- POST (`/api/users`): Register new user
(:exclamation:: `firstname`, `lastname`, `institution`, `jobtitle`, `email` and `password`). 

`// Request`
```json
{
	"firstname": "Dan",
	"lastname": "Duncan",
	"institution": "Eagle Hospital",
	"jobtitle": "Head of Surgery",
	"email": "ean@chua.com",
	"password": "12345",
	"preferences" : {
		"oxygensat"     : {
			"danger"  : {
				"minLevel" : 0.43,
				"maxLevel" : 2.1111
			},
			"warning" : {
				"minLevel" : 0.7,
				"maxLevel" : 1.8765
			}
		}
	}
}
```
`"preferences"` can be provided if necessary, but they can be easily updated on the `PUT` method. If not provided, default values are:
```json
"preferences" : {
	"oxygensat"     : {
		"danger"  : {
			"minLevel" : 0.5,
			"maxLevel" : 2.0
		},
		"warning" : {
			"minLevel" : 0.7,
			"maxLevel" : 1.7
		}
	},
	"pulse"     : {
		"danger"  : {
			"minLevel" : 60,
			"maxLevel" : 180
		},
		"warning" : {
			"minLevel" : 80,
			"maxLevel" : 160
		}
	}
```

`// Response`
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImakIjoiNWQ5YjBiZmE4N2I5NTMxMTFiOGI5MTBlIn0sImlhdCI6MTU3MDQ0MjIzNCwiZXhwIjoxNjAxOTc4MjM0fQ.Hot04y_oSsdI8zU8KtsD_KGUVVbDfjiK5P_cBMBaa6k"
}
```

- :lock: PUT (`/api/users`): Update user
(:exclamation:: `firstname`, `lastname`, `institution`, `jobtitle`, `email` and `password`). Request and response are the same as the `POST` method.

- :lock: DELETE (`/api/users`):

`// Response`
```json
{
    "msg": "User Removed"
}
```

### `patients`
- :lock: GET (`/api/patients`): Retrieve all devices with patient information

`// Response`
```json
"devices": [
	{
		"patient":
		{
			"status": "admitted",
			"admission": "2019-10-07T08:16:34.619Z",
			"firstname": "Clark",
			"lastname": "Kent",
			"observation": "Eat a kryptonite"
		},
		"measures": [
			{
				"_id": "5d9b10fb04f4a117aa9f6b08",
				"pulse": 0.34,
				"oxygensat": 0.011,
				"date": "2019-10-07T10:18:35.501Z"
			}
		],
		"_id": "5d9af462954ad200175a19b8"
	},
	{"patient":{}, "measures":[{}], "_id": "String"}
]
```
- :lock: GET (`/api/patients/:_id`): Retrieve all information about specific patient

`// Response`
```json
{
    "patient": {
        "status": "admitted",
        "admission": "2019-10-07T10:29:21.609Z",
        "firstname": "Clark",
        "lastname": "Kent",
        "observation": "Eat a kryptonite"
    },
    "measures": [
        {
            "_id": "5d9b148204f4a117aa9f6b0a",
            "pulse": 0.34,
            "oxygensat": 0.011,
            "date": "2019-10-07T10:33:38.457Z"
        }
    ],
    "_id": "5d9b138104f4a117aa9f6b09"
}
```


- :lock: POST (`/api/patients`): Patient admission 
(:exclamation:: `firstname` and `lastname`)

`// Request`
```json
{
	"firstname": "Jack",
	"lastname": "Sparrow",
	"observation": "Felt from boat"
}
```

`// Response`
```json
{
    "patient": {
        "status": "admitted",
        "firstname": "Jack",
        "lastname": "Sparrow",
        "observation": "Felt from boat",
        "admission": "2019-10-07T10:41:02.244Z"
    },
    "_id": "5d9b163e04f4a117aa9f6b0c",
    "measures": []
}
```

- :lock: PUT (`/api/patients/_id`): Update a specific patient 
(:exclamation:: `status`, `firstname` and `lastname`)

`// Request`
```json
{
	"status": "surgery",
	"firstname": "Jack",
	"lastname": "Sparrow",
	"observation": "Felt from boat; Broken arm, intervention on Room 2"
}
```

`// Response`
```json
{
    "patient": {
        "status": "surgery",
        "firstname": "Jack",
        "lastname": "Sparrow",
        "observation": "Felt from boat; Broken arm, intervention on Room 2",
        "admission": "2019-10-07T10:44:58.468Z"
    },
    "_id": "5d9b172a04f4a117aa9f6b0d",
    "measures": []
}
```


- :lock: DELETE (`/api/patients/:_id`): Discharge a specific patient and clear data from DB. Return all other patients.

`// Response`
```json
[
	{
		"patient": {
			"status": "admitted",
			"admission": "2019-10-07T10:29:21.609Z",
			"firstname": "Clark",
			"lastname": "Kent",
			"observation": "Eat a kryptonite"
		},
		"measures": [
			{
				"date": "2019-10-07T10:33:38.457Z",
				"_id": "5d9b148204f4a117aa9f6b0a",
				"pulse": 0.34,
				"oxygensat": 0.011
			}
		],
		"_id": "5d9b138104f4a117aa9f6b09"
	}
]
```

### `relays`
- :lock: GET (`/api/relays`): Get all info from all devices

`// Response`
```json
[
	{
		"patient": {
			"status": "admitted",
			"admission": "2019-10-07T10:29:21.609Z",
			"firstname": "Clark",
			"lastname": "Kent",
			"observation": "Eat a kryptonite"
		},
		"measures": [
			{
				"date": "2019-10-07T10:33:38.457Z",
				"_id": "5d9b148204f4a117aa9f6b0a",
				"pulse": 0.34,
				"oxygensat": 0.011
			}
		],
		"_id": "5d9b138104f4a117aa9f6b09"
	}
]
```

- :lock: PUT (`/api/relays`): Add measurement from devices.
Measurement is added to the beginning of the `measures` vector. So that `measures[0]` is always the most up-to-date information on a patient.

`// Request`
```json
{
	"id": "5d9b138104f4a117aa9f6b09",
	"pulse": 0.54,
	"oxygensat": 0.211
}
```

`// Response`
```json
{
	"patient":
	{
		"status": "admitted",
		"admission": "2019-10-07T10:29:21.609Z",
		"firstname": "Clark",
		"lastname": "Kent",
		"observation": "Eat a kryptonite"
	},
	"measures": [
		{
			"_id": "5d9b19e504f4a117aa9f6b0f",
			"pulse": 0.54,
			"oxygensat": 0.211,
			"date": "2019-10-07T10:56:37.101Z"
		},
		{
			"date": "2019-10-07T10:33:38.457Z",
			"_id": "5d9b148204f4a117aa9f6b0a",
			"pulse": 0.34,
			"oxygensat": 0.011
		}
	],
	"_id": "5d9b138104f4a117aa9f6b09"
}
```

### Definitions

| :book:        		| Definitions												|
| -------------------- |:----------------------------------|
|:lock: 						| Authorization required through JWT|
|:exclamation:			| Required fields 									|
