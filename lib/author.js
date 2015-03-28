
var fs = require('fs'),
  path = require('path'),
  formatBudget = require('./formatBudget'),
  addComputedValues = require('./addComputedValues'),
  OUTPUT = path.join(__dirname,'..','output'),
  JSONFILE = path.join(OUTPUT,'budget.json'),
  TXTFILE = path.join(OUTPUT,'budget.txt');

module.exports = {
  read: read,
  write: write,
  prettyPrint: readPretty,
  getAccountIdx: getAccountIdx,
};

function readPretty (data) {
  var budget = data || read();
  return [
    formatBudget(addComputedValues(budget)),
    'Tax estimate: ' + (budget.taxEstimate*100).toFixed() + '%\n'
  ].join('\n\n');
}

function getAccountIdx(name, budget) {
  budget = budget || read();
  var idx = -1;
  budget.accounts.forEach(function (account, i) {
    if(name.toLowerCase() === account.name.toLowerCase()) {
      idx = i;
      return;
    }
  });
  return idx;
}

function read() {
  var exists = fs.existsSync(JSONFILE);
  
  if (fs.existsSync(JSONFILE)) {
    var contents = fs.readFileSync(JSONFILE).toString();
    try {
      return JSON.parse(contents);
    } catch (e) {
      console.log('Currupted data:', JSONFILE);
      console.log(contents);
    }
  }

  return createStub();
}

function write(budget) {
  if (typeof budget !== 'object') {
    throw new Error('Bad budget: ' + budget);
  }

  if (!fs.existsSync(OUTPUT)) {
    fs.mkdir(OUTPUT);
  }

  fs.writeFileSync(JSONFILE, JSON.stringify(budget));
  fs.writeFileSync(TXTFILE, readPretty(budget));
}

function createStub() {
  return {
    accounts: [],
    taxEstimate: 0
  };
}
