# Routes

All the routes are managed here.
This API follows the REST (REpresentational State Transfer) architecture and return data in JSON (JavaScript Object Notation) format.

## Requirements
- :white_check_mark: User registration (Register)
- :white_check_mark: User authentication (Sign in)
- :white_check_mark: User session management using JWT
- :white_check_mark: User profile showing its configurations (institution, relays, plan, etc)
- :white_check_mark: Each patient will be bound to a device
- :white_check_mark: Each device can obtain different vital signs from the patient
- :white_check_mark: Different devices can be bound to a relay
- :white_check_mark: Relays can send JSON data to the API that will be stored in a DB
- :white_check_mark: User dashboard shows data from all relays (DB)
- :white_check_mark: Patient dashboard shows data from a specific user (DB)

### Definitions
**User**: Is the institution that subscribed to our services (Hospital, clinic, ER, etc)

**Patient**: Is the person admitted to the medical institution

**Device**: Is an object that will sample different vital signs and will communicate them to the relays

**Relay**: Is the device that will send a POST request to the API

## Routes
- `/api`: contains all the endpoints and routes
	- `auth`: authentication verification
	- `users`: user creation and information
	- `patients`: data from admission to discharge
	- `relays`: data from devices

When sending data header must be set to `Content-type: application/json`

### `auth`
- :white_check_mark: :lock: GET: Get information on authenticated user
- :white_check_mark: :lock: POST: Login 
(:exclamation:: `email` and `password`)
```json
{
	"email": "dan@chua.com",
	"password": "dan123"
}
```
- PUT:
- DELETE:

### `users`
- GET:
- :white_check_mark: POST: Register new user
(:exclamation:: `firstname`, `email` and `password`)
```json
{
	"firstname": "Marine",
	"lastname": "Con",
	"observation": "Drank too much"
}
```
- PUT:
- DELETE:

### `patients`
- GET:
- :white_check_mark: :lock: POST: Patient admission 
(:exclamation:: `firstname` and `lastname`)
```json
{
	"firstname": "Marine",
	"lastname": "Con",
	"observation": "Drank too much"
}
```
- PUT:
- DELETE:

### `relays`
- :white_check_mark: :lock: GET: Get the latest info from all devices
- POST:
- :white_check_mark: :lock: PUT: Add measurement from devices
```json
{
	"id": "5d83378f20d41e96df3cb543",
	"pulse": 89,
	"oxygensat": 0.9
}
```
- DELETE:

### Definitions

| :book:        		| Definitions												|
| -------------------- |:----------------------------------|
|:lock: 						| Authorization required through JWT|
|:white_check_mark:	| Done and tested										|
|:exclamation:			| Required fields 									|
|:warning: 					| To be done soon 									|
