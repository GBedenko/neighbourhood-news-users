'use strict'

const usersDB = jest.genMockFromModule('../users-db')

// Mock adding one resource to provided collection
usersDB.addResourceToCollection = (databaseURL, collectionName, newResource) => new Promise((resolve, reject) => {

	resolve(true)
})

// Mock retrieve all resources from a given collection
usersDB.getAllFromCollection = (databaseURL, collectionName) => new Promise((resolve, reject) => {

	resolve([{'_id': 1234 , 'username': 'test123'}])
})

// Mock retrieve a specific resource from a collection
usersDB.getResourceFromCollection = (databaseURL, collectionName, resourceID) => new Promise((resolve, reject) => {

	resolve({'_id': 1234, 'username': 'test123'})
})


// Mock update a resource with the provided ID and new values object
usersDB.updateResource = (databaseURL, collectionName, resourceID, newValuesObject) => new Promise((resolve, reject) => {

	resolve(true)
})

// Mock delete a resource by its given ID
usersDB.deleteResource = (databaseURL, collectionName, resourceID) => new Promise((resolve, reject) => {

	resolve(true)
})

// Find a resource by a query object
usersDB.findResourceFromCollection = (databaseURL, collectionName, resourceObject) => new Promise((resolve, reject) => {

	resolve([{'_id': 1234 , 'username': 'test123'}])
})

module.exports = usersDB
