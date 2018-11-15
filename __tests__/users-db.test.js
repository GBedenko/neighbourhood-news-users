'use strict'

const articlesAndEventsDB = require('../modules/articles-and-events-db')

describe('Adding a new resource to a mongodb collection', async() => {

    afterEach(async() => {
        // Function to find the article that the tests will add to the database
        let findAddedArticle = articlesAndEventsDB.findResourceFromCollection("mongodb://localhost:27017/articles_and_events_database",
                                                                                 "articles",
                                                                                 {"heading":"Test Heading"}).then((result) => result)

        // Call the function and wait for the response
        let findAddedArticleResponse = await findAddedArticle

        // Save the id of the test article that was added
        let addedArticleID = findAddedArticleResponse[findAddedArticleResponse.length-1]._id

        // Delete the test article so that it doesn't affect live database
        articlesAndEventsDB.deleteResource("mongodb://localhost:27017/articles_and_events_database",
                                           "articles",
                                           addedArticleID)
    });    

	test('Adding a new article inserts it into the database successfully', async done => {

        expect.assertions(1)
        
        // Send a test article object to the correct database
        const response = await articlesAndEventsDB.addResourceToCollection("mongodb://localhost:27017/articles_and_events_database",
                                                                           "articles",
                                                                           {"heading":"Test Heading"})        
        
        // Expect a true boolean response if adding to mongodb was successful
        expect(response).toBeTruthy()
        
        done()
	})
})

describe('Requesting one resource from a mongodb collection', async() => {

    let resourceIdToRequest;

    beforeEach(async() => {        
        // Add a new object to mongodb, which will be tested that it can retrieve the correct one
        await articlesAndEventsDB.addResourceToCollection("mongodb://localhost:27017/articles_and_events_database",
                                                          "articles",
                                                          {"heading":"Test Heading"})

        let findAddedArticle = articlesAndEventsDB.findResourceFromCollection("mongodb://localhost:27017/articles_and_events_database",
                                                                                 "articles",
                                                                                 {"heading":"Test Heading"}).then((result) => result)

        let findAddedArticleResponse = await findAddedArticle

        // Save the id of the test article that was added
        resourceIdToRequest = findAddedArticleResponse[findAddedArticleResponse.length-1]._id
    }); 
    
    afterEach(async() => {
        // Delete the test article so that it doesn't affect live database
        articlesAndEventsDB.deleteResource("mongodb://localhost:27017/articles_and_events_database",
                                           "articles",
                                           resourceIdToRequest)
    })

	test('Request a mongodb object returns the correct object that was requested', async done => {

        expect.assertions(1)
        
        // Send a test article object to the correct database
        const response = await articlesAndEventsDB.getResourceFromCollection("mongodb://localhost:27017/articles_and_events_database",
                                                                             "articles",
                                                                             resourceIdToRequest).then((article) => article)      
        
        // Expect a true boolean response if adding to mongodb was successful
        expect(response.heading).toEqual("Test Heading")
        
        done()
	})
})

describe('Requesting all resources from a mongodb collection', async() => {

	test('Requesting a mongodb collection returns an array of objects', async done => {

        expect.assertions(1)

        const response = await articlesAndEventsDB.getAllFromCollection("mongodb://localhost:27017/articles_and_events_database",
                                                                        "articles").then((article) => article)      
        
        expect(Array.isArray([response])).toBe(true);
        done()
	})
})

describe('Updating a resource in a mongodb collection', async() => {

    let resourceIdToUpdate;

    beforeEach(async() => {        
        // Add a new object to mongodb, which will be tested that it can be updated in the test
        await articlesAndEventsDB.addResourceToCollection("mongodb://localhost:27017/articles_and_events_database",
                                                          "articles",
                                                          {"heading":"Test Heading"})

        let findAddedArticle = articlesAndEventsDB.findResourceFromCollection("mongodb://localhost:27017/articles_and_events_database",
                                                                                 "articles",
                                                                                 {"heading":"Test Heading"}).then((result) => result)

        let findAddedArticleResponse = await findAddedArticle

        // Save the id of the test article that was added
        resourceIdToUpdate = findAddedArticleResponse[findAddedArticleResponse.length-1]._id
    }); 
    
    afterEach(async() => {
        // Delete the test article so that it doesn't affect live database
        articlesAndEventsDB.deleteResource("mongodb://localhost:27017/articles_and_events_database",
                                           "articles",
                                           resourceIdToUpdate)
    })

	test('Updating a mongodb resource returns a successful response', async done => {

        expect.assertions(1)

        const updateResponse = await articlesAndEventsDB.updateResource("mongodb://localhost:27017/articles_and_events_database",
                                                                  "articles",
                                                                  resourceIdToUpdate,
                                                                  {"heading":"Updated Heading"}).then((response) => response)      
        
        expect(updateResponse).toBeTruthy()

        done()
	})
})

describe('Deleting a resource in a mongodb collection', async() => {

    let resourceIdToDelete;

    beforeEach(async() => {        
        // Add a new object to mongodb, which will be tested that it can be updated in the test
        await articlesAndEventsDB.addResourceToCollection("mongodb://localhost:27017/articles_and_events_database",
                                                          "articles",
                                                          {"heading":"Test Heading"})

        let findAddedArticle = articlesAndEventsDB.findResourceFromCollection("mongodb://localhost:27017/articles_and_events_database",
                                                                                 "articles",
                                                                                 {"heading":"Test Heading"}).then((result) => result)

        let findAddedArticleResponse = await findAddedArticle

        // Save the id of the test article that was added
        resourceIdToDelete = findAddedArticleResponse[findAddedArticleResponse.length-1]._id
    }); 
    
    afterEach(async() => {
        // Delete the test article so that it doesn't affect live database
        articlesAndEventsDB.deleteResource("mongodb://localhost:27017/articles_and_events_database",
                                           "articles",
                                           resourceIdToDelete)
    })

	test('Deleting a mongodb collection returns a successful response', async done => {

        expect.assertions(1)

        const deleteResponse = await articlesAndEventsDB.deleteResource("mongodb://localhost:27017/articles_and_events_database",
                                                                  "articles",
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
        await articlesAndEventsDB.addResourceToCollection("mongodb://localhost:27017/articles_and_events_database",
                                                          "articles",
                                                          {"heading":"Test Heading"})

        let findAddedArticle = articlesAndEventsDB.findResourceFromCollection("mongodb://localhost:27017/articles_and_events_database",
                                                                                 "articles",
                                                                                 {"heading":"Test Heading"}).then((result) => result)

        let findAddedArticleResponse = await findAddedArticle

        resourceToFind = findAddedArticleResponse
        
        // Save the id of the test article that was added
        resourceToFindId = findAddedArticleResponse[findAddedArticleResponse.length-1]._id
    }); 
    
    afterEach(async() => {
        // Delete the test article so that it doesn't affect live database
        articlesAndEventsDB.deleteResource("mongodb://localhost:27017/articles_and_events_database",
                                           "articles",
                                           resourceToFindId)
    })

	test('Finding a known resource in a mongodb collection returns the correct object', async done => {

        expect.assertions(1)

        const findResponse = await articlesAndEventsDB.findResourceFromCollection("mongodb://localhost:27017/articles_and_events_database",
                                                                  "articles",
                                                                  {"heading":"Test Heading"}).then((response) => response)      
        
        expect(findResponse).toEqual(resourceToFind)

        done()
	})
})
