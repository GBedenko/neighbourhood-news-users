'use strict'

const usersController = require('../modules/users-controller')

jest.mock('../modules/users-db')

describe('Add users controller functionality', async() => {

	test('Recieving a new user sends it to the database', async done => {

                expect.assertions(1)
                
                const addUserResponse = await usersController.add({"username":"test123"})

                expect(addUserResponse).toBeTruthy()
                
                done()
	})
})

describe('Get all users controller functionality', () => {

        test('Recieving a get request recieves an array response from the database', async done => {

                expect.assertions(1)
                
                const response = await usersController.getAll()
                
                expect(response).toEqual([{"_id": 1234, "username":"test123"}])
                
                done()
	})
})

describe('Get one user controller functionality', () => {

	test('Recieving a get request for one user recieves one user response from the database', async done => {

        expect.assertions(1)
        
        const response = await usersController.getById("1234")

        expect(response).toEqual({"_id": 1234, "username":"test123"})
        
        done()
	})
})

describe('Update user controller functionality', () => {

	test('Recieving a put request for one user recieves a success response from the database', async done => {

                expect.assertions(1)
                
                const response = await usersController.update("1234", {"username":"different123"})

                expect(response).toBeTruthy()
                
                done()
	})
})

describe('Delete user controller functionality', () => {

	test('Recieving a delete request for one user recieves a success response from the database', async done => {

                expect.assertions(1)
                
                const response = await usersController.delete("1234")

                expect(response).toBeTruthy()
                
                done()
	})
})