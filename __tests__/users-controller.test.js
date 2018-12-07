'use strict'

const usersController = require('../modules/users-controller')

jest.mock('../modules/users-db')

describe('Add users controller functionality', async() => {

	test('Adding a new user sends it to the database', async done => {
                
                const addUserResponse = await usersController.add({"username":"test123"})

                expect(addUserResponse).toBeTruthy()
                
                done()
	})
        
	test('Adding an empty user returns a failed request to the database', async done => {
                
                const addUserResponse = await usersController.add({}).then((response) => response)

                expect(addUserResponse).toEqual(Error('Trying to add an empty object'))
                
                done()
	})
})

describe('Get all users controller functionality', () => {

        test('Recieving a get request recieves an array response from the database', async done => {
                
                const response = await usersController.getAll()
                
                expect(response).toEqual([{"_id": 1234, "username":"test123"}])
                
                done()
	})
})

describe('Get one user controller functionality', () => {

	test('Recieving a get request for one user recieves one user response from the database', async done => {
                
                const response = await usersController.getById("1234")

                expect(response).toEqual({"_id": 1234, "username":"test123"})
                
                done()
	})
        
	test('Requesting the database for a user that doesnt exist returns a failed request from the database', async done => {
                
                const response = await usersController.getById("6666")

                expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
                
                done()
	})
})

describe('Update user controller functionality', () => {

	test('Recieving a put request for one user recieves a success response from the database', async done => {
                
                const response = await usersController.update("1234", {"username":"different123"})

                expect(response).toBeTruthy()
                
                done()
	})
        
	test('Updating a user with an empty new user object recieves a failed response from the database', async done => {
                
                const response = await usersController.update("1234", {})

                expect(response).toEqual(Error('Trying to update an object with an empty object'))
                
                done()
	})
        
	test('Updating a user that doesnt exist recieves a failed response from the database', async done => {
                
                const response = await usersController.update("6666", {"user":"test user updated"})

                expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
                
                done()
	})
})

describe('Delete user controller functionality', () => {

	test('Recieving a delete request for one user recieves a success response from the database', async done => {
                
                const response = await usersController.delete("1234")

                expect(response).toBeTruthy()
                
                done()
	})
        
	test('Deleting a user that doesnt exist recieves a failed response from the database', async done => {
                
                const response = await usersController.delete("6666")

                expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
                
                done()
	})
})