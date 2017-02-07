'use strict';
var mongoose = require('mongoose');
var path = require('path');
var promise = require('bluebird');
mongoose.Promise = promise;
var config = require(path.join(global.AppRoot, 'configurations/config.json'));

mongoose.connect(config.db.path + '/' + config.db.name, function(){
    console.log('mongodb connected');
});
module.exports = mongoose;
