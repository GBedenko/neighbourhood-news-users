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
	
	try {

		// If error in the client request, throw error to send error status code back
		if(ctx.get('error')) throw new Error(ctx.get('error'))
		
		// Request the users object from the controller
		const users = await usersController.getAll()

		// Assign the status code to 200 and response body object as all the users
		ctx.status = status.OK
		ctx.body = users

    } catch(err) {

		// If there's an error in the above request, return 404 status code with the error message
		ctx.status = status.NOT_FOUND
		ctx.body = {status: 'error', message: err.message}
	}
})

// GET Request for one User
router.get('/api/v1.0/users/:user_id', async ctx => {

	// Allow only get requests to this endpoint function
	ctx.set('Allow', 'GET')
	
	try {

		// If error in the client request, throw error to send error status code back
		if(ctx.get('error')) throw new Error(ctx.get('error'))
		
		// Request one user object from the controller using the provided id
		const user = await usersController.getById(ctx.params.user_id)

		// Assign the status code to 200 and response body object as the found user
		ctx.status = status.OK
		ctx.body = user

    } catch(err) {

		// If there's an error in the above request, return 404 status code with the error message
		ctx.status = status.NOT_FOUND
		ctx.body = {status: 'error', message: err.message}
	}
})

// POST Request for a new User
router.post('/api/v1.0/users', async ctx => {

	// Allow only post requests to this endpoint function
	ctx.set('Allow', 'POST')
	
	try {

		// If error in the client request, throw error to send error status code back
		if(ctx.get('error')) throw new Error(ctx.get('error'))
		
		// Send the new user object to the controller using the client request body
		const addUserResponse = await usersController.add(ctx.request.body)

		// Assign the status code to 201 and response body object as a boolean to confirm the user was added
		ctx.status = status.CREATED
		ctx.body = {status: 'success', userAddedSuccessfully: addUserResponse}

    } catch(err) {

		// If there's an error in the above request, return 400 status code with the error message
		ctx.status = status.BAD_REQUEST
		ctx.body = {status: 'error', message: err.message}
	}
})

// PUT Request to update an existing User
router.put('/api/v1.0/users/:user_id', async ctx => {

	// Allow only put requests to this endpoint function
	ctx.set('Allow', 'PUT')
	
	try {

		// If error in the client request, throw error to send error status code back
        if(ctx.get('error')) throw new Error(ctx.get('error'))
        
		// Send the updated user object to the controller using the client request body for the provided user id
		const updateUserResponse = await usersController.update(ctx.params.user_id, ctx.request.body)

		// Assign the status code to 201 and response body object as a boolean to confirm the user was updated
		ctx.status = status.CREATED
		ctx.body = {status: 'success', userUpdatedSuccessfully: updateUserResponse}

    } catch(err) {

		// If there's an error in the above request, return 400 status code with the error message
		ctx.status = status.BAD_REQUEST
		ctx.body = {status: 'error', message: err.message}
	}
})

// DELETE Request to remove an existing User
router.del('/api/v1.0/users/:user_id', async ctx => {

	// Allow only delete requests to this endpoint function
	ctx.set('Allow', 'DELETE')
	
	try {

		// If error in the client request, throw error to send error status code back
        if(ctx.get('error')) throw new Error(ctx.get('error'))
        
		// Request the provided user id's object to be deleted by the controller
		const deleteUserResponse = await usersController.delete(ctx.params.user_id)


		// Assign the status code to 200 and response body object as a boolean to confirm the user was deleted
		ctx.status = status.OK
		ctx.body = {status: 'success', userDeletedSuccessfully: deleteUserResponse}

    } catch(err) {

		// If there's an error in the above request, return 400 status code with the error message
		ctx.status = status.BAD_REQUEST
		ctx.body = {status: 'error', message: err.message}
	}
})

// Assign all routes/endpoints to the Koa server
app.use(router.routes())
app.use(router.allowedMethods())

// Run the server, show helpful message to know which port it is running on
const server = app.listen(port, () => console.log(`Server listening on port ${port}`))

// Export the endpoints module so that it can be tested
module.exports = server
