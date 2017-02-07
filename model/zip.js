'use strict';
var path = require('path');

var db = require(path.join(global.AppRoot, 'lib/db.js'));
var Schema = db.Schema;

var zipSchema = new Schema({
    city: {
        type: String,
    },
    loc: {
        type: [Number],
    },
    pop: {
        type: Number,
    },
    state: {
        type: String,
    }
});

module.exports = db.model('zip', zipSchema);
