'use strict';
var path = require('path');
var Item = require(path.join(global.AppRoot, 'model/item'));

function separateQuery(query) {
	var queryObj = {};
	var copyQuery;
	console.log('query ....');
	console.log(query);
	try{
		copyQuery = JSON.parse(query);
	} catch(e) {

		console.log(e);
		copyQuery = query;
	}
	if(copyQuery) {
		queryObj.limit = copyQuery.limit;
		queryObj.sort = copyQuery.sort;
		queryObj.fields = copyQuery.field;
		queryObj.skip = copyQuery.skip;
		delete copyQuery.limit;
		delete copyQuery.skip;
		delete copyQuery.field;
		delete copyQuery.sort;
		queryObj.query = copyQuery;
	}
	return queryObj;
}

module.exports = {
	get: function(req, res, next) {
		
		var query = separateQuery(req.query.query);
		console.log(query);
		Item.find(query.query)
			.skip(query.skip)
			.limit(query.limit)
			.sort(query.sort)
			.select(query.fields)
		.then(function(data) {
			res.json({
				success:1,
				data: data
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
				data: data
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
				data: data
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
			res.json({
				status: 1,
				data: data
			});
		})
		.catch(function(err) {
			return next(err);
		});
	}
};