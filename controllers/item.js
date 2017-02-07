'use strict';
var path = require('path');
var Item = require(path.join(global.AppRoot, 'model/item'));

function separateQuery(query) {
	var queryObj = {};
	try{
		query = JSON.parse(query);
	} catch(e) {
		query = query;
	}
	if(query) {
		queryObj.limit = query.limit;
		queryObj.sort = query.sort;
		queryObj.fields = query.field;
		queryObj.skip = query.skip;
		delete query.limit;
		delete query.skip;
		delete query.field;
		delete query.sort;
		queryObj.query = query;
	}
	return queryObj;
}

module.exports = {
	get: function(req, res, next) {
		
		var query = separateQuery(req.query.query);

		Item.find(query.query)
			.skip(query.skip)
			.limit(query.limit)
			.sort(query.sort)
			.select(query.fields)
		.then(function(data) {
			res.json({
				success:1,
				data: data._orignal
			});
		})
		.catch(function(err) {
			return next(err);
		});
	},
	getById: function (req, res, next) {
		let id = req.params.id || req.query.id;
		Item.findOne({_id: id})
		.then(function(data) {
			res.json({
				success: 1,
				data: data._orignal
			});
		})
		.catch(function(err) {
			return next(err);
		});
	},
	save: function (req, res, next) {
		// TODO: Check if belongs to user or not
		let id = req.body.id || req.params.id;
		let doc = req.body;
		if(id) {
			doc.id = id;
		}
		let item = new Item(doc);

		item.validate().then(function(){
			return item.save(doc);
		})
		.then(function(data) {
			res.json({
				success: 1,
				data: data._orignal
			});
		})
		.catch(function(err) {
			return next(err);
		});
	},
	delete: function(req, res, next) {
		// Check if belongs to user or not
		let id = req.body.id || req.params.id || req.query.id;
		if(!id) {
			return res.status(404).json({
				success: 0,
				error: new Error('Nothing to delete')
			});
		}
		Item.remove({id: id})
		.then(function(data) {
			res.json(new Response(1, data));
		})
		.catch(function(err) {
			return next(err);
		});
	}
};