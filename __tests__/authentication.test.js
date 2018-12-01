'use strict'

const authentication = require('../modules/authentication')

jest.mock('../modules/users-controller')

describe('Checking user credentials', async() => {

	test('Sending correct credentials returns true (user is authenticated)', async done => {

        const response = await authentication.checkUserCredentials('Basic VGVzdDE6dGVzdA==')

        expect(response).toBeTruthy()

        done()
    })
})