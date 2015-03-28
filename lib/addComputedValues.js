
module.exports = function addComputedValues(budget) {
  var proportional = getProportionalAccounts(budget.accounts),
    fixed = getFixedAccounts(budget.accounts);

  budget.proportional = {
    total: getTotal(proportional),
    accounts: proportional
  };

  budget.fixed = {
    total: getTotal(fixed),
    accounts: fixed
  };

  budget.monthlyMinimum = getMonthlyMinimum(
                            budget.taxEstimate,
                            budget.proportional.total,
                            budget.fixed.total);

  budget.yearlyMinimum = getYearlyMinimum(budget.monthlyMinimum.beforeTax);

  return budget;
};

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
  }, 0);
}

function getMonthlyMinimum(taxes, proportional, fixed) {
  if (proportional >= 1 || taxes >= 1) {
    throw new Error('You cannot spend more that 100% of your money!');
  } else {
    var afterTax = fixed / (1 - proportional),
      beforeTax =  afterTax / (1 - taxes);

    return {
      beforeTax: Math.ceil(beforeTax),
      afterTax: Math.ceil(afterTax)
    };
  }
}

function getYearlyMinimum(monthlyMinimum) {
  return Math.ceil(monthlyMinimum * 12);
}
