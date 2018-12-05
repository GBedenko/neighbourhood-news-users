'use strict'

const usersDB = jest.genMockFromModule('../users-db')

// Mock adding one resource to provided collection
usersDB.addResourceToCollection = (databaseURL, collectionName, newResource) => new Promise((resolve, reject) => {

	if(databaseURL == 'mongodb://localhost:27017/users_database' && collectionName == 'users') {

		// If object being added only has the 3 default values, don't want to add it to database
		if(Object.keys(newResource).length == 3) {
			reject(new Error('Trying to add an empty object'))
		} else {
			resolve(true)
		}
	} else {
		reject(new Error('Incorrect database details passed'))
	}
})

// Mock retrieve all resources from a given collection
usersDB.getAllFromCollection = (databaseURL, collectionName) => new Promise((resolve, reject) => {

	if(databaseURL == 'mongodb://localhost:27017/users_database' && collectionName == 'users') {
		resolve([{'_id': 1234 , 'username': 'test123'}])
	} else {
		reject(new Error('Incorrect database details passed'))
	}
})

// Mock retrieve a specific resource from a collection
usersDB.getResourceFromCollection = (databaseURL, collectionName, resourceID) => new Promise((resolve, reject) => {

	const mockedInvalidID = 6666

	if(databaseURL == 'mongodb://localhost:27017/users_database' && collectionName == 'users') {

		if(resourceID == mockedInvalidID) {
			reject(new Error('Trying to request an object that doesnt exist'))
		} else {
			resolve({'_id': 1234, 'username': 'test123'})
		}

	} else {
		reject(new Error('Incorrect database details passed'))
	}
})

// Mock update a resource with the provided ID and new values object
usersDB.updateResource = (databaseURL, collectionName, resourceID, newValuesObject) => new Promise((resolve, reject) => {

	const mockedInvalidID = 6666

	if(databaseURL == 'mongodb://localhost:27017/users_database' && collectionName == 'users') {

		if(Object.keys(newValuesObject).length == 0) {
			reject(new Error('Trying to update an object with an empty object'))

		} else if(resourceID == mockedInvalidID) {
			reject(new Error('Trying to request an object that doesnt exist'))

		} else {
			resolve(true)
		}

	} else {
		reject(new Error('Incorrect database details passed'))
	}
})

// Mock delete a resource by its given ID
usersDB.deleteResource = (databaseURL, collectionName, resourceID) => new Promise((resolve, reject) => {

	const mockedInvalidID = 6666

	if(databaseURL == 'mongodb://localhost:27017/users_database' && collectionName == 'users') {

		if(resourceID == mockedInvalidID) {
			reject(new Error('Trying to request an object that doesnt exist'))
		} else {
			resolve(true)
		}

	} else {
		reject(new Error('Incorrect database details passed'))
	}
})

module.exports = usersDB
