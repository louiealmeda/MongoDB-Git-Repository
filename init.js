var config = require('./config');
var color = require('colors');
var fs = require('fs');
var _ = require('lodash');

module.exports = function () {

	if (config.get(true)){
	  	console.log('This folder already has '.red + config.path.green  + ' file'.red);
		return false;
	}
  	var defaults = _.clone(config.defaults);
	
  	fs.writeFile(config.path, JSON.stringify(defaults,null,'\t'), function(err) {
		if(err) {
	  		return console.log(err);
	  	}
	
		console.log(('mongovc initialization successful. You can edit' + ' ' + config.path +' anytime.').green );
  	});

};