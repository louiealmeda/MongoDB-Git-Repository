var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));



module.exports = {

  get: function (name) {

    if (config.collections === undefined)
      return "collections must be provided in config.json";

    if (config.collections.constructor !== Array)
      return "collections must be an array of strings";

    if (!name)
      return config.collections;

    if (config.groups === undefined)
      throw "groups are not specified in config.json";

    if (config.groups[name] === undefined)
      throw name + ' is not a specified group in config.json';

    if (config.groups[name].constructor !== Array)
      return "group " + name + " must be an array of strings";


    return config.groups[name];

  }

};