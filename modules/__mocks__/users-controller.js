'use strict'

const usersController = jest.genMockFromModule('../users-controller')

// Mock adding a new user response
usersController.add = async(userObject) => {

	if(Object.keys(userObject).length == 0) {
		return false
	} else {
		return true
	}
}

// Mock retrieving one user
usersController.getById = async(userID) => {

	const mockedInvalidID = 6666

	if(userID == mockedInvalidID) {
		return {}
	} else {
		return {'_id': 1234, username: 'test123', password: '$2b$10$suODIB3P8hv379GqpHQaIukH9F2Q/fJ8//.mjp.SV91hyZrpUyQHe'}
	}
}

// Mock retrieving all users
usersController.getAll = async(queryObject) => {

	if(Object.keys(queryObject).length == 0) {
		return [{'_id': 1234, 'username': 'test123', password: '$2b$10$suODIB3P8hv379GqpHQaIukH9F2Q/fJ8//.mjp.SV91hyZrpUyQHe'},
			{'_id': 2345, 'username': 'test123', password: '$2b$10$suODIB3P8hv379GqpHQaIukH9F2Q/fJ8//.mjp.SV91hyZrpUyQHe'}]
	} else {
		return [{'_id': 2345, 'username': 'test123', password: '$2b$10$suODIB3P8hv379GqpHQaIukH9F2Q/fJ8//.mjp.SV91hyZrpUyQHe'}]
	}
}

// Mock updating a user response
usersController.update = async(userID, newUserDetailsObject) => {

	if(Object.keys(newUserDetailsObject).length == 0) {
		return false
	} else {
		return true
	}
}

// Mock deleting a user response
usersController.delete = async(userID) => {

	const mockedInvalidID = 6666

	if(userID == mockedInvalidID) {
		return false
	} else {
		return true
	}
}

module.exports = usersController
