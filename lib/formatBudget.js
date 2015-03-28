
var table = require('text-table');

module.exports = function formatBudget(budget) {
  var majorDivider = makeDivider(15,5,'=');
  var minorDividor = makeDivider(15,5,'-');

  console.log(budget.monthlyMinimum);

  var rows = combineRows([
    majorDivider,
    makeRows(budget.proportional.accounts,toPercent),
    minorDividor,
    makeRow('Total', budget.proportional.total, toPercent),
    majorDivider,
    makeRows(budget.fixed.accounts),
    minorDividor,
    makeRow('Total', budget.fixed.total),
    majorDivider
  ]);

  return table(rows, { align: [ 'l', 'r' ] });
};

/*
 * Helpers
 */

function makeDivider(len1, len2, glyph) {
  len1 = len1 || 10;
  len2 = len2 || 5;
  return [[repeater(len1, glyph), repeater(len2, glyph)]];
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

function makeRow(title, value, formatValue) {
  formatValue = formatValue || toDollars;
  return [[toTitleCase(title), formatValue(value)]];
}

function combineRows(rows) {
  return [].concat.apply([], rows);
}

function toTitleCase(str) {
  return str.replace(/\w*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


