'use strict';
var CronJob = require('cron').CronJob;
var nMail = require('./email');

var Item = require('../model/item');

var job = new CronJob({
  cronTime: '*/5 * * * * *',
  onTick: function() {
    Item.find().distinct('contact.email', function(error, items) {
	   items.forEach(e => nMail(e));
	});
  },
  start: false,
  timeZone: 'America/Chicago'
});

module.exports = job;
