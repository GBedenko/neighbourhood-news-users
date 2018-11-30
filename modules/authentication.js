'use strict'

const bcrypt = require('bcrypt')

// Import module for communicating with users backend
const usersController = require('./users-controller')

exports.checkUserCredentials = async(authorizationHeader) => {
    
    // Split word 'Basic' from the Authorization header
    const [, hash] = authorizationHeader.split(' ')
    
    // Get the username and password in plain text
    const userCredentials = Buffer.from(hash, 'base64').toString()
    
    // Split the username and password by the colon seperating them
    const [username, password] = userCredentials.split(':')

    // Retrieve the user from the db that matches the username the user entered
    const existingUser = await usersController.getAll({username: username})

    // Compare the password the user entered with the one stored in db for the user
    const passwordCorrect = await bcrypt.compare(password, existingUser[0].password)

    if(passwordCorrect) {
        return true
    } else {
        return false
    }    
}

	// // Hash the password
	// const passwordHash = bcrypt.hash(userObject.password, 10)
    // delete userObject.password

    // const hash = await bcrypt.hash(credentials.password, saltRounds)
	// profile.password = hash
	// await persist.setItem(credentials.username, profile)

