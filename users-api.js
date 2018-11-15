#!/usr/bin/env node

'use strict'

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
app.use(bodyParser())
const router = new Router()

const status = require('http-status-codes')

const port = 8082

const usersController = require('./modules/users-controller')

app.use( async(ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', 'localhost')
	ctx.set('content-type', 'application/json')
	await next()
})

router.get('/api/v1.0/users', async ctx => {
    ctx.set('Allow', 'GET')    
	try {
		if(ctx.get('error')) throw new Error(ctx.get('error'))
		debugger
		const users = await usersController.getAll()
		ctx.status = status.OK
		ctx.body = users
    } catch(err) {
		ctx.status = status.NOT_FOUND
		ctx.body = {status: 'error', message: err.message}
	}
})

router.get('/api/v1.0/users/:user_id', async ctx => {
    ctx.set('Allow', 'GET')    
	try {
		if(ctx.get('error')) throw new Error(ctx.get('error'))
		ctx.status = status.OK
		ctx.body = {status: 'success', message: {item: 'xxx'}}
		const user = await usersController.getById(ctx.params.user_id)
		ctx.status = status.OK
		ctx.body = user
    } catch(err) {
		ctx.status = status.NOT_FOUND
		ctx.body = {status: 'error', message: err.message}
	}
})

router.post('/api/v1.0/users', async ctx => {
    ctx.set('Allow', 'POST')    
	try {        
        if(ctx.get('error')) throw new Error(ctx.get('error'))
        
		const newUser = await usersController.add(ctx.request)
		ctx.status = status.CREATED
		ctx.body = {status: 'success', message: {user: newUser}}
    } catch(err) {
		ctx.status = status.BAD_REQUEST
		ctx.body = {status: 'error', message: err.message}
	}
})

router.put('/api/v1.0/users/:user_id', async ctx => {
    ctx.set('Allow', 'PUT')    
	try {        
        if(ctx.get('error')) throw new Error(ctx.get('error'))
        
		const updateUserResponse = await usersController.update(ctx.params.user_id, ctx.request)
		ctx.status = status.CREATED
		ctx.body = {status: updateUserResponse}
    } catch(err) {
		ctx.status = status.BAD_REQUEST
		ctx.body = {status: 'error', message: err.message}
	}
})

router.del('/api/v1.0/users/:user_id', async ctx => {
    ctx.set('Allow', 'DELETE')    
	try {        
        if(ctx.get('error')) throw new Error(ctx.get('error'))
        
		const deleteUserResponse = await usersController.delete(ctx.params.user_id)
		ctx.status = status.OK
		ctx.body = {status: deleteUserResponse}
    } catch(err) {
		ctx.status = status.BAD_REQUEST
		ctx.body = {status: 'error', message: err.message}
	}
})

app.use(router.routes())
app.use(router.allowedMethods())
const server = app.listen(port, () => console.log(`Server listening on port ${port}`))

module.exports = server