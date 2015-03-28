#!/usr/bin/env node
 
/**
 * Module dependencies.
 */
 
var program = require('commander'),
  printBudget = require('./index');

program
  .version('0.0.1')
  .usage('[command]');

program
  .command('print')
  .description('display budget')
  .action(printBudget);

program
  .command('save')
  .option('-f --file [path]', 'filename to save [budget]', 'budget')
  .description('save budget to file')
  .action(function (options) {
    console.log(options.file);
  });

program
  .command('create <account> <value>')
  .description('create an account')
  .action(function (account, amount) {
    console.log(account, amount);
  });

program
  .command('delete <account>')
  .description('delete an account')
  .action(function (account) {
    console.log(account);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
 
// console.log('you ordered a pizza with:');
// if (program.peppers) console.log('  - peppers');
// if (program.pineapple) console.log('  - pineapple');
// if (program.bbq) console.log('  - bbq');
// console.log('  - %s cheese', program.cheese);