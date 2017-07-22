var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var colors = require('colors');


module.exports = {

  get: function (name) {

    if (config.collections === undefined)
      throw "collections must be provided in config.json";

    if (config.collections.constructor !== Array)
      throw "collections must be an array of strings";

    if (!name){
      console.log(config.collections.join(", ").blue);
      return config.collections;
    }

    if (config.groups === undefined)
      throw "groups are not specified in config.json";

    if (config.groups[name] === undefined)
      throw '`' + name + '` is not a specified group in config.json';

    if (config.groups[name].constructor !== Array)
      return "group `" + name + "` must be an array of strings";

    if (config.groups[name].length == 0)
      console.log('group `' + name + '` has no collections')

    console.log(config.groups[name].join(", ").blue);
    return config.groups[name];

  }

};