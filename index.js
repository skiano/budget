
var addComputedValues = require('./lib/addComputedValues'),
  formatBudget = require('./lib/formatBudget'),
  author = require('./lib/author');

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
  },
  {
    name: 'food',
    cost: 2200
  }
];

var budget = author.read();

author.write(budget);
// console.log(budget);

// module.exports = function () {
//   var output = formatBudget(addComputedValues({
//     taxEstimate: 0.3,
//     accounts: accounts
//   }));
//   console.log(output);
// }

