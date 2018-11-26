'use strict'

// Testing endpoints requries supertest package
const request = require("supertest");

const usersAPI = require('../users-api')

jest.mock('../modules/users-controller')

describe('GET /users endpoint', async() => {

    let server
    beforeEach(() => {
        server = usersAPI.listen();
    })

    afterEach(() => {
        usersAPI.close()
    });

	test('Requesting all users returns a 200 status code', async done => {

        const response = await request(server).get("/api/v1.0/users")

        expect(response.status).toEqual(200)

        done()
    })    

	test('Requesting all users returns a json object', async done => {

        const response = await request(server).get("/api/v1.0/users");

        expect(response.body).toEqual([{"_id": 1234, "username": "test123"}])

        done()
	})
})
