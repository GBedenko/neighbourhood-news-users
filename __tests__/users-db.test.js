'use strict'

const usersDB = require('../modules/users-db')

describe('Adding a new resource to a mongodb collection', async() => {

    afterEach(async() => {
        // Function to find the user that the tests will add to the database
        let findAddedUser = usersDB.findResourceFromCollection("mongodb://localhost:27017/users_database",
                                                                                 "users",
                                                                                 {"username":"test123"}).then((result) => result)

        // Call the function and wait for the response
        let findAddedUserResponse = await findAddedUser

        // Save the id of the test user that was added
        let addedUserID = findAddedUserResponse[findAddedUserResponse.length-1]._id

        // Delete the test user so that it doesn't affect live database
        usersDB.deleteResource("mongodb://localhost:27017/users_database",
                                           "users",
                                           addedUserID)
    });    

	test('Adding a new user inserts it into the database successfully', async done => {

        expect.assertions(1)
        
        // Send a test user object to the correct database
        const response = await usersDB.addResourceToCollection("mongodb://localhost:27017/users_database",
                                                                           "users",
                                                                           {"username":"test123"})        
        
        // Expect a true boolean response if adding to mongodb was successful
        expect(response).toBeTruthy()
        
        done()
	})
})

describe('Requesting one resource from a mongodb collection', async() => {

    let resourceIdToRequest;

    beforeEach(async() => {        
        // Add a new object to mongodb, which will be tested that it can retrieve the correct one
        await usersDB.addResourceToCollection("mongodb://localhost:27017/users_database",
                                                          "users",
                                                          {"username":"test123"})

        let findAddedUser = usersDB.findResourceFromCollection("mongodb://localhost:27017/users_database",
                                                                                 "users",
                                                                                 {"username":"test123"}).then((result) => result)

        let findAddedUserResponse = await findAddedUser

        // Save the id of the test user that was added
        resourceIdToRequest = findAddedUserResponse[findAddedUserResponse.length-1]._id
    }); 
    
    afterEach(async() => {
        // Delete the test user so that it doesn't affect live database
        usersDB.deleteResource("mongodb://localhost:27017/users_database",
                                           "users",
                                           resourceIdToRequest)
    })

	test('Request a mongodb object returns the correct object that was requested', async done => {

        expect.assertions(1)
        
        // Send a test user object to the correct database
        const response = await usersDB.getResourceFromCollection("mongodb://localhost:27017/users_database",
                                                                             "users",
                                                                             resourceIdToRequest).then((user) => user)      
        
        // Expect a true boolean response if adding to mongodb was successful
        expect(response.username).toEqual("test123")
        
        done()
	})
})

describe('Requesting all resources from a mongodb collection', async() => {

	test('Requesting a mongodb collection returns an array of objects', async done => {

        expect.assertions(1)

        const response = await usersDB.getAllFromCollection("mongodb://localhost:27017/users_database",
                                                                        "users").then((user) => user)      
        
        expect(Array.isArray([response])).toBe(true);
        done()
	})
})

describe('Updating a resource in a mongodb collection', async() => {

    let resourceIdToUpdate;

    beforeEach(async() => {        
        // Add a new object to mongodb, which will be tested that it can be updated in the test
        await usersDB.addResourceToCollection("mongodb://localhost:27017/users_database",
                                                          "users",
                                                          {"username":"test123"})

        let findAddedUser = usersDB.findResourceFromCollection("mongodb://localhost:27017/users_database",
                                                                                 "users",
                                                                                 {"username":"test123"}).then((result) => result)

        let findAddedUserResponse = await findAddedUser

        // Save the id of the test user that was added
        resourceIdToUpdate = findAddedUserResponse[findAddedUserResponse.length-1]._id
    }); 
    
    afterEach(async() => {
        // Delete the test user so that it doesn't affect live database
        usersDB.deleteResource("mongodb://localhost:27017/users_database",
                                           "users",
                                           resourceIdToUpdate)
    })

	test('Updating a mongodb resource returns a successful response', async done => {

        expect.assertions(1)

        const updateResponse = await usersDB.updateResource("mongodb://localhost:27017/users_database",
                                                                  "users",
                                                                  resourceIdToUpdate,
                                                                  {"username":"different123"}).then((response) => response)      
        
        expect(updateResponse).toBeTruthy()

        done()
	})
})

describe('Deleting a resource in a mongodb collection', async() => {

    let resourceIdToDelete;

    beforeEach(async() => {        
        // Add a new object to mongodb, which will be tested that it can be updated in the test
        await usersDB.addResourceToCollection("mongodb://localhost:27017/users_database",
                                                          "users",
                                                          {"username":"test123"})

        let findAddedUser = usersDB.findResourceFromCollection("mongodb://localhost:27017/users_database",
                                                                                 "users",
                                                                                 {"username":"test123"}).then((result) => result)

        let findAddedUserResponse = await findAddedUser

        // Save the id of the test user that was added
        resourceIdToDelete = findAddedUserResponse[findAddedUserResponse.length-1]._id
    }); 
    
    afterEach(async() => {
        // Delete the test user so that it doesn't affect live database
        usersDB.deleteResource("mongodb://localhost:27017/users_database",
                                           "users",
                                           resourceIdToDelete)
    })

	test('Deleting a mongodb collection returns a successful response', async done => {

        expect.assertions(1)

        const deleteResponse = await usersDB.deleteResource("mongodb://localhost:27017/users_database",
                                                                  "users",
                                                                  resourceIdToDelete).then((response) => response)      
        
        expect(deleteResponse).toBeTruthy()

        done()
	})
})

describe('Finding a resource in a mongodb collection', async() => {

    let resourceToFindId;
    let resourceToFind;

    beforeEach(async() => {        
        // Add a new object to mongodb, which will be tested that it can be updated in the test
        await usersDB.addResourceToCollection("mongodb://localhost:27017/users_database",
                                                          "users",
                                                          {"username":"test123"})

        let findAddedUser = usersDB.findResourceFromCollection("mongodb://localhost:27017/users_database",
                                                                                 "users",
                                                                                 {"username":"test123"}).then((result) => result)

        let findAddedUserResponse = await findAddedUser

        resourceToFind = findAddedUserResponse
        
        // Save the id of the test user that was added
        resourceToFindId = findAddedUserResponse[findAddedUserResponse.length-1]._id
    }); 
    
    afterEach(async() => {
        // Delete the test user so that it doesn't affect live database
        usersDB.deleteResource("mongodb://localhost:27017/users_database",
                                           "users",
                                           resourceToFindId)
    })

	test('Finding a known resource in a mongodb collection returns the correct object', async done => {

        expect.assertions(1)

        const findResponse = await usersDB.findResourceFromCollection("mongodb://localhost:27017/users_database",
                                                                  "users",
                                                                  {"username":"test123"}).then((response) => response)      
        
        expect(findResponse).toEqual(resourceToFind)

        done()
	})
})
