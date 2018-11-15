const database_url = "mongodb://localhost:27017/users_database"
const users_collection = "users"

const database = require('./users-db')

// Function to add a new user
exports.add = async(userObject) => {
    
    let addUser = database.addResourceToCollection(database_url, users_collection, userObject)
                        .then((result) => result)

    let addUserResponse = await addUser

    return addUserResponse
}

// Function to retrieve one user
exports.getById = async(userId) => {

    let getUser = database.getResourceFromCollection(database_url, users_collection, userId)
                        .then((user) => user)
    
    let user = await getUser

    return user
}

// Function to retrieve all users
exports.getAll = async() => {

    // Declare a function which will call the controller for all users
    // Returns a Promise object with either a resolve or reject value
    let results = database.getAllFromCollection(database_url, users_collection)
                    .then((results) => results) // Obtains the result from the Promise object
    
    // Calls the results function, waits for response before continuing
    let final_result = await results

    // Return the list of users
    return final_result
}

// Function to update a user
exports.update = async(userID, newUserDetailsObject) => {

    let updateUser = database.updateResource(database_url, users_collection, userID, newUserDetailsObject)
                            .then((user) => user)

    let updateUserResponse = await updateUser

    return updateUserResponse
}

// Function to delete a user
exports.delete = async(userID) => {

    let deleteUser = database.deleteResource(database_url, users_collection, userID)
                            .then((user) => user)

    let deleteUserResponse = await deleteUser

    return deleteUserResponse
}
