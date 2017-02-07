'use strict';
var path = require('path');

var db = require(path.join(global.AppRoot, 'lib/db.js'));
var Schema = db.Schema;

var contactSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	phone: {
		type: String
	}
}, {_id: false});

var itemSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
	details: {
		type: String
	},
	contact: {
		type: contactSchema
	},
	category: {
		type: String,
		enum: ['offered', 'wanted']
	},
	state: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	coords: {
		type: [Number],
		required: true
	},
	img: {
		type: String
	},
	createdAt: {
		type: Date
	},
	updatedAt: {
		type: Date
	}
});

itemSchema.pre('save', function (next) {
	if (!this.createdAt) {
		this.createdAt = new Date();
	}
	this.updatedAt = new Date();
	next();
});

module.exports =  db.model('item', itemSchema);
