'use strict';
var path = require('path');
var Zip = require(path.join(global.AppRoot, 'model/zip'));

module.exports = {
    getStates: function (req, res, next) {

        Zip.aggregate([
            { '$group': { '_id': { state: '$state' } } },
            { '$sort': { '_id.state': 1 } },
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
        let cState = req.params.state || req.query.state;

        Zip.aggregate([
            { $match: { state: cState } },
            { '$group': { '_id': { state: '$state', city: '$city' } } },
            { $project: { city: '$_id.city', _id: 0 } },
            { $sort: { 'city': 1 } }

        ]).then(function (data) {
            res.json({
                success: 1,
                cities: data
            })
        })
            .catch(function (err) {
                return next(err);
            })
    }
};