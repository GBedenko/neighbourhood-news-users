#!/usr/bin/env node

'use strict'

console.log("Booting Up Users API Server...")

// Import koa packages
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

// Setup koa packages
const app = new Koa()
app.use(bodyParser())
const router = new Router()

// Import package used to assign status codes for responses easily
const status = require('http-status-codes')

// Port used for this microservice
const port = 8083

// Import own module for communicating with users backend
const usersController = require('./modules/users-controller')
const authentication = require('./modules/authentication')

// Allow connections only from localhost, inform client requests the content type is json
app.use( async(ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', 'localhost')
	ctx.set('content-type', 'application/json')
	await next()
})

// GET Requests for all Users
router.get('/api/v1.0/users', async ctx => {

	// Allow only get requests to this endpoint function
	ctx.set('Allow', 'GET')
		
	// Request the users object from the controller
	const users = await usersController.getAll(ctx.request.body)

	// Assign the status code to 200 and response body object as all the users
	ctx.status = status.OK
	ctx.body = users
})

// HEAD Request to authenticate/check if a user exists
router.head('/api/v1.0/users/:user', async ctx => {

	let statusCode
	let bodyMessage
	// Allow only head requests to this endpoint function
	ctx.set('Allow', 'HEAD')

	// Retrieve the authorization credentials used by the client's request
	const authorizationHeader = ctx.get('Authorization')
	
	// Using authentication module, check if the user exists for not
	const userExists = await authentication.checkUserCredentials(authorizationHeader)
	console.log("user exists:")
	console.log(userExists)
	if(userExists) {

		// If user exists, return status 200
		statusCode = status.OK
		bodyMessage = {Authorised: true}

	} else {

		// If user doesn't exist, return status 401
		statusCode = status.UNAUTHORIZED
		bodyMessage = {Authorised: false}
	}

	ctx.status = statusCode
	ctx.body = bodyMessage
})

// GET Request for one User
router.get('/api/v1.0/users/:user_id', async ctx => {

	// Allow only get requests to this endpoint function
	ctx.set('Allow', 'GET')
	
	// Request one user object from the controller using the provided id
	const user = await usersController.getById(ctx.params.user_id)

	// Assign the status code to 200 and response body object as the found user
	ctx.status = status.OK
	ctx.body = user
})

// POST Request for a new User
router.post('/api/v1.0/users', async ctx => {

	// Allow only post requests to this endpoint function
	ctx.set('Allow', 'POST')
	
	// Send the new user object to the controller using the client request body
	const addUserResponse = await usersController.add(ctx.request.body)

	// Assign the status code to 201 and response body object as a boolean to confirm the user was added
	ctx.status = status.CREATED
	ctx.body = {status: 'success', userAddedSuccessfully: addUserResponse}
})

// PUT Request to update an existing User
router.put('/api/v1.0/users/:user_id', async ctx => {

	// Allow only put requests to this endpoint function
	ctx.set('Allow', 'PUT')

	// Send the updated user object to the controller using the client request body for the provided user id
	const updateUserResponse = await usersController.update(ctx.params.user_id, ctx.request.body)

	// Assign the status code to 201 and response body object as a boolean to confirm the user was updated
	ctx.status = status.CREATED
	ctx.body = {status: 'success', userUpdatedSuccessfully: updateUserResponse}
})

// DELETE Request to remove an existing User
router.del('/api/v1.0/users/:user_id', async ctx => {
	
	// Allow only delete requests to this endpoint function
	ctx.set('Allow', 'DELETE')
		
	// Request the provided user id's object to be deleted by the controller
	const deleteUserResponse = await usersController.delete(ctx.params.user_id)

	// Assign the status code to 200 and response body object as a boolean to confirm the user was deleted
	ctx.status = status.OK
	ctx.body = {status: 'success', userDeletedSuccessfully: deleteUserResponse}
})

// Assign all routes/endpoints to the Koa server
app.use(router.routes())
app.use(router.allowedMethods())

// Run the server, show helpful message to know which port it is running on
const server = app.listen(port, () => console.log(`Server listening on port ${port}`))

// Export the endpoints module so that it can be tested
module.exports = server
