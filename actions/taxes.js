
var author = require('../lib/author');

module.exports = function createAccount(estimate) {
  var budget = author.read();

  estimate = parseFloat(estimate);
  budget.taxEstimate = estimate;
  author.write(budget);

  console.log(author.prettyPrint());
  console.log('set the tax estimate to %s%', (estimate*100).toFixed());
};