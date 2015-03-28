
var fs = require('fs'),
  path = require('path'),
  author = require('../lib/author');

module.exports = function saveBudget(options) {
  var home = getUserHome(),
    data = path.join(home, 'Desktop', options.file+'.json'),
    pretty = path.join(home, 'Desktop', options.file+'.txt');

  fs.writeFileSync(data, JSON.stringify(author.read(),null,2));
  fs.writeFileSync(pretty, author.prettyPrint());

  console.log('Created:', data);
  console.log('Created:', pretty);
};

function getUserHome() {
  // http://stackoverflow.com/questions/9080085/node-js-find-home-directory-in-platform-agnostic-way
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}