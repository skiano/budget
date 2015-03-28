
var table = require('text-table');

module.exports = function formatBudget(data) {
  var fixed = getFixedAccounts(data.accounts),
    proportional = getProportionalAccounts(data.accounts);

  var dividerRow = makeDivider(10,5);

  var rows = combineRows([
    dividerRow,
    makeRows(proportional,toPercent),
    dividerRow,
    makeRows(fixed),
    dividerRow
  ]);

  return table(rows, { align: [ 'l', 'r' ] });
};

// console.log(getTotal(data.proportional));
// console.log(getTotal(data.fixed));
// console.log(table(makeRows(data.fixed), {align: ['l','r']}));
// var rows = [].concat(makeRows(data.fixed),makeDivider());

/*
 * Helpers
 */

function getProportionalAccounts(accounts) {
  return accounts.filter(function (account) {
    return account.cost < 1;
  });
}

function getFixedAccounts(accounts) {
  return accounts.filter(function (account) {
    return account.cost >= 1;
  });
}

function getTotal(accounts) {
  return accounts.reduce(function(sum, n) {
    return sum + n.cost;
  });
}

function makeDivider(len1, len2) {
  len1 = len1 || 10;
  len2 = len2 || 5;
  return [[repeater(len1), repeater(len2)]];
}

function repeater(len, glyph) {
  return new Array(len+1).join(glyph || '-');
}

function toDollars(value) {
  return value;
}

function toPercent(value) {
  return (value * 100).toFixed() + '%';
}

function makeRows(accounts, formatValue) {
  formatValue = formatValue || toDollars;
  return accounts.map(function (account, key) {
    return [toTitleCase(account.name), formatValue(account.cost)];
  });
}

function combineRows(rows) {
  return [].concat.apply([], rows);
}

function toTitleCase(str) {
  return str.replace(/\w*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


