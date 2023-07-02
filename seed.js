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
			password: bcrypt.hashSync('123', bcrypt.genSaltSync(saltRounds)),
			// * the reason for using hashSync and genSaltSync is that this way is synchronous versus hash and genSalt which are asynchronous
			// * the difference between synchronous and asynchronous is that synchronous is executed in sequence, while asynchronous is executed
			// * after it is completed, it will work quietly in the 'background' and may take longer
			// * async is better for responsiveness and used when performing time-consuming operations
		});

		console.log('User branyzp populated');
	} catch (err) {
		console.log('error seeding db: ' + err);
	}
	console.log('Completed');
};
