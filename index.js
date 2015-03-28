
var formatBudget = require('./lib/formatBudget');

var accounts = [
  {
    name: 'giving',
    cost: 0.1
  },
  {
    name: 'saving',
    cost: 0.1
  },
  {
    name: 'fishing',
    cost: 100
  },
  {
    name: 'sailing',
    cost: 200
  }
];

output = formatBudget({
  taxes: 0.3,
  accounts: accounts
});

console.log(output);