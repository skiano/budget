
var table =  require('text-table');

module.exports = function formatBudget() {
  return table([
    [ 'beep', '1024' ],
    [ 'boop', '33450' ],
    [ 'foo', '1006' ],
    [ 'bar', '45' ]
  ], { align: [ 'l', 'r' ] });
};