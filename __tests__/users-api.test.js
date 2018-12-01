'use strict'

// Testing endpoints requries supertest package
const request = require("supertest");

const usersAPI = require('../users-api')

jest.mock('../modules/users-controller')
jest.mock('../modules/authentication')

// Test GET /users
describe('GET /users endpoint', async() => {

    afterEach(() => {
        usersAPI.close()
    });

    // Test that a request recieves the correct status code
	test('Requesting all users returns a 200 status code', async done => {

        const response = await request(usersAPI).get("/api/v1.0/users")

        expect(response.status).toEqual(200)

        done()
    })    

    // Test that the request recieves the correct JSON response
	test('Requesting all users returns a json object', async done => {
        
        const response = await request(usersAPI).get("/api/v1.0/users");

        expect(response.body).toEqual([{"_id": 1234, "username": "test123", password: "$2b$10$suODIB3P8hv379GqpHQaIukH9F2Q/fJ8//.mjp.SV91hyZrpUyQHe"},
                                       {"_id": 2345, "username": "test123", password: "$2b$10$suODIB3P8hv379GqpHQaIukH9F2Q/fJ8//.mjp.SV91hyZrpUyQHe"}])

        done()
	})
})

// Test HEAD /users
describe('HEAD /users/:username endpoint', async() => {

    afterEach(() => {
        usersAPI.close()
    })

    // Test that a request recieves the correct status code
	test('Requesting authentication for a valid user responds with 200 status code', async done => {

        const response = await request(usersAPI).head("/api/v1.0/users/test123").set('Authorization', 'Basic dGVzdDEyMzp0ZXN0')

        expect(response.status).toEqual(200)

        done()
    }) 

    // Test that a request recieves the correct status code
	test('Requesting authentication for an invalid user responds with 401 status code', async done => {

        const response = await request(usersAPI).head("/api/v1.0/users/test123").set('Authorization', 'Basic IncorrectAuthHeader')

        expect(response.status).toEqual(401)

        done()
    })    
})

// Test GET /users/:user_id
describe('GET /users/:user_id endpoint', async() => {

    afterEach(() => {
        usersAPI.close()
    });

    // Test that a request recieves the correct status code
	test('Requesting a user returns a 200 status code', async done => {

        const response = await request(usersAPI).get("/api/v1.0/users/123")

        expect(response.status).toEqual(200)

        done()
    })    

    // Test that the request recieves the correct JSON response
	test('Requesting a user returns a json object', async done => {

        const response = await request(usersAPI).get("/api/v1.0/users/123");

        expect(response.body).toEqual({"_id": 1234, "username": "test123", password: "$2b$10$suODIB3P8hv379GqpHQaIukH9F2Q/fJ8//.mjp.SV91hyZrpUyQHe"})

        done()
	})
})

// Test POST /users
describe('POST /users endpoint', async() => {

    afterEach(() => {
        usersAPI.close()
    });

    // Test that a request recieves the correct status code
	test('Sending a new user returns a 201 status code', async done => {

        const response = await request(usersAPI).post("/api/v1.0/users").send({"_id": 1234, "username": "test123"})

        expect(response.status).toEqual(201)

        done()
    })    

    // Test that the request recieves the correct JSON response
	test('Sending a new user returns the correct json response object', async done => {

        const response = await request(usersAPI).post("/api/v1.0/users").send({"_id": 1234, "username": "test123"})

        expect(response.body).toEqual({"status": "success", "userAddedSuccessfully": true})

        done()
	})
})

// Test PUT /users/:user_id
describe('PUT /users/:user_id endpoint', async() => {

    afterEach(() => {
        usersAPI.close()
    });

    // Test that a request recieves the correct status code
	test('Updating a user returns a 201 status code', async done => {

        const response = await request(usersAPI).put("/api/v1.0/users/1234").send({"_id": 1234, "username": "new_username"})

        expect(response.status).toEqual(201)

        done()
    })    

    // Test that the request recieves the correct JSON response
	test('Updating a user returns the correct json response object', async done => {

        const response = await request(usersAPI).put("/api/v1.0/users/1234").send({"_id": 1234, "username": "new_username"})

        expect(response.body).toEqual({"status": "success", "userUpdatedSuccessfully": true})

        done()
	})
})

// Test DELETE /users/:user_id
describe('DELETE /users/:user_id endpoint', async() => {

    afterEach(() => {
        usersAPI.close()
    });

    // Test that a request recieves the correct status code
	test('Deleting a user returns a 200 status code', async done => {

        const response = await request(usersAPI).del("/api/v1.0/users/1234")

        expect(response.status).toEqual(200)

        done()
    })    

    // Test that the request recieves the correct JSON response
	test('Deleting a user returns the correct json response object', async done => {

        const response = await request(usersAPI).del("/api/v1.0/users/1234")

        expect(response.body).toEqual({"status": "success", "userDeletedSuccessfully": true})

        done()
    })
})