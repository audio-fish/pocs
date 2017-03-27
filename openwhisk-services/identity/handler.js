'use strict';

const jwt = require('jsonwebtoken');

function auth(params) {

	// this is a demo implementation ... in real life we would be getting users
	// from a database... and secrets would not be in code!
	// hash passwords using bcrypt... https://codahale.com/how-to-safely-store-a-password/
	if (params.user === 'admin' && params.pass === 'supersecretpassword') {
		const token = jwt.sign({
			'user': 'admin',
			'permissions': ['admin']
		}, 'superdoopersecret');
		return {
			token
		};
	} else {
		return {
			error: 'Invalid Credentials'
		};
	}

}

exports.auth = auth;
