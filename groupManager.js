var config = require('./config').get(true);
var colors = require('colors');


module.exports = {
  
  get: function (name) {
	
    if (!config)
      return false;
	
	if (config.collections === undefined)
	  throw "collections must be provided in " + config.path;
	
	if (config.collections.constructor !== Array)
	  throw "collections must be an array of strings";
	
	if (!name || name.constructor === Boolean) {
	  console.log(config.collections.join(", ").blue);
	  return config.collections;
	}
	
	if (config.groups === undefined)
	  throw "groups are not specified in config.json";
	
	if (config.groups[name] === undefined)
	  throw '`' + name + '` is not a specified group in ' + config.path;
	
	if (config.groups[name].constructor !== Array)
	  return "group `" + name + "` must be an array of strings";
	
	if (config.groups[name].length === 0)
	  console.log('group `' + name + '` has no collections');
	
	console.log(config.groups[name].join(", ").blue);
	return config.groups[name];
	
  }
  
};