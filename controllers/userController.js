// import the various dependencies and shorthand ======================================================================================================================================================================================
const express = require('express');

// * userRoute is used to list our routes for a specific controller in a separate file such as this one to reduce bloatedness of server.js or routes.js
const userRoute = express.Router();

// * import of the user model
const User = require('../models/user');

const bcrypt = require('bcrypt');

// * import of http status codes to send back as a response
const { StatusCodes } = require('http-status-codes');

// * see seed.js for explanation of saltRounds
const saltRounds = 10;

// user routes ======================================================================================================================================================================================

// find single user
userRoute.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		if (user === null) {
			throw new Error('No such id found for user.');
		} else {
			res.status(StatusCodes.ACCEPTED).send(user);
		}
	} catch (err) {
		console.log(err);
		res.status(StatusCodes.BAD_REQUEST).send('User not found');
	}
});

// create new user
userRoute.post('/new', async (req, res) => {
	const { username, firstName, lastName, password } = req.body;
	try {
		const hashPassword = bcrypt.hash(password, saltRounds);
		const newUser = await User.create({
			username: username,
			firstName: firstName,
			lastName: lastName,
			createdDt: Date.now(),
			password: hashPassword,
		});
		res.status(StatusCodes.CREATED).send(newUser);
	} catch (err) {
		console.log(err);
		res.send(StatusCodes.BAD_REQUEST).send('Failed to create new user: ' + err);
	}
});

// user login
userRoute.post('/login', async (req, res) => {
	const { username, password } = req.body;
	try {
		const searchForUser = await User.find({ username: username });
		if (searchForUser.length === 0) {
			throw new Error('User not found.');
		} else if (bcrypt.compareSync(password, search[0].password)) {
			res
				.status(StatusCodes.OK)
				.send('successfully logged in: ' + searchForUser);
		}
	} catch (err) {
		console.log(err);
		res.status(StatusCodes.BAD_REQUEST).send(err);
	}
});

// TODO update new user
userRoute.put('/:id/update', async (req, res) => {});

module.exports = userRoute;
