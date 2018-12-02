'use strict'

const authentication = jest.genMockFromModule('../authentication');

authentication.checkUserCredentials = async(authorizationHeader) => {

    const [, hash] = authorizationHeader.split(' ')

    if(hash == 'IncorrectAuthHeader') {
        return false
    } else {
        return true
    }
}

module.exports = authentication