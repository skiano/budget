
var fs = require('fs'),
  path = require('path'),
  OUTPUT = path.join(__dirname,'..','output'),
  JSONFILE = path.join(OUTPUT,'budget.json'),
  TXTFILE = path.join(OUTPUT,'budget.txt');

module.exports = {
  read: read,
  write: write
};

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
}

function createStub() {
  return {
    accounts: [],
    taxEstimate: 0
  };
}
