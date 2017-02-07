'use strict';
var express = require('express');
var router = express.Router();
var path = require('path');

var zipCtrl = require(path.join(global.AppRoot, 'controllers/zip'));

module.exports = function () {
    router.get('/getStates', zipCtrl.getStates);
    router.get('/getCities/:state', zipCtrl.getCities);
    return router;
};
