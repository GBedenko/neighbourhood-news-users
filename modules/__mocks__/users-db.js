const users_db = jest.genMockFromModule('../users-db');

// Mock adding one resource to provided collection
users_db.addResourceToCollection = (database_url, collection_name, new_resource) => new Promise((resolve, reject) => {

    resolve(true)
})

// Mock retrieve all resources from a given collection
users_db.getAllFromCollection = (database_url, collection_name) => new Promise((resolve, reject) => {

    resolve([{"_id": 1234 , "username":"test123"}])
})

// Mock retrieve a specific resource from a collection
users_db.getResourceFromCollection = (database_url, collection_name, resource_id) => new Promise((resolve, reject) => {

    resolve({"_id": 1234, "username":"test123"})
})


// Mock update a resource with the provided ID and new values object
users_db.updateResource = (database_url, collection_name, resourceID, new_values_object) => new Promise((resolve, reject) => {
    
    resolve(true)
})

// Mock delete a resource by its given ID
users_db.deleteResource = (database_url, collection_name, resourceID) => new Promise((resolve, reject) => {

    resolve(true)
})

module.exports = users_db;
