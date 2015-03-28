
var fs = require('fs'),
  author = require('../lib/author');

module.exports = function saveBudget(file) {
  try {
    var raw = JSON.parse(fs.readFileSync(file));
    author.write({
      accounts: raw.accounts || [],
      taxEstimate: raw.taxEstimate || 0
    });
    console.log('Imported data from:',file);
    console.log(author.prettyPrint());
  } catch (e) {
    console.log('bad file argument', file);
  }
};