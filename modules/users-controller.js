'use strict'

const databaseURL = 'mongodb://localhost:27017/users_database'
const usersCollection = 'users'

const database = require('./users-db')

// Function to add a new user
exports.add = async(userObject) => {

	userObject.admin = false
	userObject.likes = 0
	userObject.dislikes = 0

	const addUser = database.addResourceToCollection(databaseURL, usersCollection, userObject)
		.then((result) => result)

	const addUserResponse = await addUser

	return addUserResponse
}

// Function to retrieve one user
exports.getById = async(userID) => {

	const getUser = database.getResourceFromCollection(databaseURL, usersCollection, userID)
		.then((user) => user)

	const user = await getUser

	return user
}

// Function to retrieve all users
exports.getAll = async(queryObject) => {

	// Declare a function which will call the controller for all users
	// Returns a Promise object with either a resolve or reject value
	const results = database.getAllFromCollection(databaseURL, usersCollection, queryObject)
		.then((results) => results) // Obtains the result from the Promise object

	// Calls the results function, waits for response before continuing
	const finalResult = await results

	// Return the list of users
	return finalResult
}

// Function to update a user
exports.update = async(userID, newUserDetailsObject) => {

	const updateUser = database.updateResource(databaseURL, usersCollection, userID, newUserDetailsObject)
		.then((user) => user)

	const updateUserResponse = await updateUser

	return updateUserResponse
}

// Function to delete a user
exports.delete = async(userID) => {

	const deleteUser = database.deleteResource(databaseURL, usersCollection, userID)
		.then((user) => user)

	const deleteUserResponse = await deleteUser

	return deleteUserResponse
}
