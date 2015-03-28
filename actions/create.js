
var author = require('../lib/author');

module.exports = function createAccount(name, cost, options) {
  if(name.toUpperCase() === 'ALL') {
    throw new Error('ALL is a reserved word');
  }

  var budget = author.read();

  var account = {
    name: name,
    cost: parseFloat(cost)
  };

  var existingIdx = author.getAccountIdx(name, budget),
    action = existingIdx < 0 ? 'Created' : 'Updated',
    type = cost < 1 ? 'proportional' : 'fixed';

  if (existingIdx === -1) {
    budget.accounts.push(account);
  } else if (!options.update) {
    console.log('The `%s` account has already been created (use -u or --update option)', name);
    return;
  } else {
    budget.accounts[existingIdx] = account;
  }

  author.write(budget);
  console.log(author.prettyPrint());
  console.log('%s %s account `%s` with $%s', action, type, name, cost);
};