// initialize dependencies in this file ================================================================================================================================================================
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// shorthand variables =================================================================================================================================================================================
const app = express();
const port = process.env.PORT;
const mongo_URI = process.env.MONGO_URI;
const db = mongoose.connection;

// connection to db=====================================================================================================================================================================================
mongoose
	.connect(mongo_URI)
	.then(() => {
		console.log('connection with mongodb is established.');
	})
	.catch((err) => {
		console.log('connection error: ' + err);
	});

db.on('error', (err) => console.log(err.message + ' mongodb error'));
db.on('connected', () => console.log('mongo connected: ' + mongo_URI));
db.on('disconnected', () =>
	console.log('mongo disconnected from: ' + mongo_URI)
);

// routes ===============================================================================================================================================================================================
app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log('Express now listening on port ' + port);
});