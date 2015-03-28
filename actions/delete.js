
var author = require('../lib/author');

module.exports = function deleteAccount(name) {
  var budget = author.read(),
    existingIdx = author.getAccountIdx(name, budget);

  if (name.toUpperCase() === 'ALL') {
    budget.accounts = [];
    author.write(budget);
    console.log(author.prettyPrint());
    console.log('Deleted all accounts');
  } else if (existingIdx === -1) {
    console.log('The `%s` account does not exist', name);
  } else {
    budget.accounts.splice(existingIdx,1);
    author.write(budget);
    console.log(author.prettyPrint());
    console.log('Deleted the `%s` account', name);
  }
};