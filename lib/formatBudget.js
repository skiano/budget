
var table = require('text-table'),
  DUPE_RE = /(.)(?=.*\1)/g;
  DIVIDER_RE = /[=-\s]/g;

module.exports = function formatBudget(budget) {
  var minorDivider = makeDivider(1,0,'-'),
    blankDivider = makeDivider(1,1,' ');

  var rows = combineRows([
    blankDivider,
    blankDivider,

    makeRow('Proportional Costs', budget.proportional.total, toPercent),
    minorDivider,
    makeRows(budget.proportional.accounts, toPercent),
    
    blankDivider,
    blankDivider,

    makeRow('Fixed Costs', budget.fixed.total),
    minorDivider,
    makeRows(budget.fixed.accounts),
    
    blankDivider,
    blankDivider,
    
    makeRow('Estimates', ''),
    minorDivider,
    makeRow('Month After Taxes', budget.monthlyMinimum.afterTax),
    makeRow('Month Before Taxes', budget.monthlyMinimum.beforeTax),
    makeRow('Yearly Salary', budget.yearlyMinimum),

    blankDivider
  ]);

  return table(rows, {
    align: ['l','r']
  });
};

/*
 * Helpers
 */

function makeDivider(len1, len2, glyph) {
  len1 = len1 || 0;
  len2 = len2 || 0;
  return [[repeater(len1, glyph), repeater(len2, glyph)]];
}

function repeater(len, glyph) {
  return new Array(len+1).join(glyph || '-');
}

function toDollars(value) {
  if (typeof value === 'number') {
    return commaSeparateNumber(value);
  } else {
    return value;
  }
}

function toPercent(value) {
  return (value * 100).toFixed() + '%';
}

function makeRows(accounts, formatValue) {
  formatValue = formatValue || toDollars;

  accounts = accounts.sort(function (a, b) {
    return b.cost - a.cost;
  });

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

function commaSeparateNumber(val){
  while (/(\d+)(\d{3})/.test(val.toString())){
    val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
  }
  return val;
}

function isDivider(str) {
  return s.replace(DUPE_RE, "").replace(DIVIDER_RE, "").length === 0;
}


