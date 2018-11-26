'use strict'

const databaseURL = "mongodb://localhost:27017/users_database"
const usersCollection = "users"

const database = require('./users-db')

// Function to add a new user
exports.add = async(userObject) => {
    
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
    const results = database.findResourceFromCollection(databaseURL, usersCollection, queryObject)
                    .then((results) => results) // Obtains the result from the Promise object
    
    // Calls the results function, waits for response before continuing
    const finalResult = await results

    // Return the list of users
    return finalResult
}

// Function to retrieve a user based on query object
exports.getByQuery = async(userObject) => {

    const results = database.findResourceFromCollection(databaseURL, usersCollection, userObject)
                    .then((results) => results)
    
    const finalResult = await results

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
