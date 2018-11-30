'use strict'

const usersController = jest.genMockFromModule('../users-controller');

// Mock adding a new user response
usersController.add = async(userObject) => {
    
    const response = true

    return response
}

// Mock retrieving one user
usersController.getById = async(userID) => {

    const response = {"_id": 1234, username: "test123", password: "$2b$10$suODIB3P8hv379GqpHQaIukH9F2Q/fJ8//.mjp.SV91hyZrpUyQHe"}

    return response
}

// Mock retrieving all users
usersController.getAll = async(queryObject) => {

    const response = [{"_id": 1234, "username": "test123", password: "$2b$10$suODIB3P8hv379GqpHQaIukH9F2Q/fJ8//.mjp.SV91hyZrpUyQHe"}]

    return response
}

// Mock retrieving a user based on query object
usersController.getByQuery = async(userObject) => {

    const response = {"_id": 1234, username: "test123", password: "$2b$10$suODIB3P8hv379GqpHQaIukH9F2Q/fJ8//.mjp.SV91hyZrpUyQHe"}

    return response
}

// Mock updating a user response
usersController.update = async(userID, newUserDetailsObject) => {

    const response = true

    return response
}

// Mock deleting a user response
usersController.delete = async(userID) => {

    const response = true

    return response
}

module.exports = usersController;