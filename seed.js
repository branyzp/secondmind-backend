// * This is the master function to seed the database

// ======================================================================================================================================================================================
const User = require('./models/user');
const bcrypt = require('bcrypt');
// * bcrypt is an encryption package to hash passwords based on the blowfish cypher
const saltRounds = 10;
// * saltrounds refers to the amount of hashing rounds done, every increment increases the difficulty of brute forcing the password

module.exports = async function seed() {
    console.log("starting database seeding ...")
    try {
        await User.deleteMany();
        
    } catch {

    }
}