var config = require('./config');
var color = require('colors');
var fs = require('fs');
var _ = require('lodash');

module.exports = {
  
  project: function () {
  
	if (config.get(true)){
	  console.log('This folder already has '.red + config.path.green  + ' file'.red);
	  return false;
	}
	var defaults = _.clone(config.defaults);
 
	fs.writeFile(config.path, JSON.stringify(defaults,null,'\t'), function(err) {
	  if(err) {
		return console.log(err);
	  }
	
	  console.log(('mongovc initialization successful. You can edit' + ' ' + config.path +' now and specify your database and collections.').green );
	});
  
  },
  dev: function () {
	
	var defaults = _.clone(config.devDefaults);
	
	fs.writeFile(config.devPath, JSON.stringify(defaults,null,'\t'), function(err) {
	  if(err) {
		return console.log(err);
	  }
	  
	  var ignorepath = '.gitignore';
	  if (!fs.existsSync(ignorepath))
	    fs.writeFileSync(ignorepath,'');
	  
	  var gitignore = fs.readFileSync(ignorepath);
	  
	  if (gitignore.indexOf(config.devPath) === -1)
	  	fs.appendFileSync(ignorepath, '\n' + config.devPath + '\n');
	  
	  
	  console.log(('mongovc dev initialization successful. You can edit' + ' ' + config.devPath +' now and specify your database.').green );
	});
  
  }
  
};