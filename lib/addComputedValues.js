
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