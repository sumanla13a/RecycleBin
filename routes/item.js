'use strict';
var express = require('express');
var router = express.Router();
var path = require('path');

var ItemCtrl = require(path.join(global.AppRoot, 'controllers/item'));

module.exports = function(authCheck) {
	router.get('/', ItemCtrl.get);
	router.post('/', authCheck, ItemCtrl.save);
	router.get('/:id', ItemCtrl.getById);
	router.put('/:id', authCheck, ItemCtrl.save);
	router.delete('/:id', authCheck, ItemCtrl.delete);
	router.post('/upload', ItemCtrl.uploading, ItemCtrl.postUpload);
	return router;
};
