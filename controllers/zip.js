'use strict';
var path = require('path');
var Zip = require(path.join(global.AppRoot, 'model/zip'));

module.exports = {
    getStates: function (req, res, next) {

        Zip.aggregate([
            { '$group': { '_id': { state: '$state' } } },
            { '$sort': { 'state': 1 } },
            { '$project': { state: '$_id.state', '_id': 0 } }
        ]
        ).then(function (data) {
            res.json({
                success: 1,
                states: data
            });
        })
            .catch(function (err) {
                return next(err);
            });
    },
    getCities: function (req, res, next) {

        Zip.find({ state: cState })
            .select('city')
            .then(function (data) {
                res.json({
                    success: 1,
                    cities: data
                });
            })
            .catch(function (err) {
                return next(err);
            });

    }
};