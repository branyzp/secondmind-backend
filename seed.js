// * This is the master function to seed the database

// import the various dependencies and models ======================================================================================================================================================================================
const User = require('./models/user');
const bcrypt = require('bcrypt');
// * bcrypt is an encryption package to hash passwords based on the blowfish cypher
const saltRounds = 10;
// * saltrounds refers to the amount of hashing rounds done, every increment increases the difficulty of brute forcing the password

// master seed function to reset db ======================================================================================================================================================================================
module.exports = async function seed() {
	console.log('starting database seeding ...');
	try {
		await User.deleteMany();

		const seedUsers = await User.create({
			username: 'branyzp@gmail.com',
			firstName: 'Brandon',
			lastName: 'Yeo',
			password: bcrypt.hash('fvgbhn45', bcrypt.genSalt(saltRounds)),
		});

		console.log('User branyzp populated');
	} catch (err) {
		console.log('error seeding db: ' + err);
	}
	console.log('Completed');
};
