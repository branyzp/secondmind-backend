// require mongoose package =================================================================================================================================================================================
const mongoose = require('mongoose');

// shorthand for constructor function for schemas ======================================================================================================================================================================================
const Schema = mongoose.Schema;

// define the schema for user =================================================================================================================================================================================
const userSchema = new Schema({
	username: { type: String, required: true, index: true, unique: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	createdDt: { type: Date, default: Date.now },
	password: { type: String, required: true },
});

// shorthand for User schema, makes the userSchema into a mongoose model =================================================================================================================================================================================
const User = mongoose.model('User', userSchema);

// initialize the indexes =================================================================================================================================================================================
User.createIndexes();
// * Indexes make querying faster. Without indexes, mongo has to perform a collection scan that will scan every document in a collection.
// * With indexes, mongo will limit the documents it queries

// export the User model =================================================================================================================================================================================
module.exports = User;
