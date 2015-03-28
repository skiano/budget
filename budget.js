#!/usr/bin/env node
 
/**
 * Module dependencies.
 */
 
var program = require('commander');

program
  .version('0.0.1')
  .usage('[command]');

program
  .command('print')
  .description('display budget')
  .action(require('./actions/print'));

program
  .command('save')
  .option('-f --file [path]', 'filename to save [budget]', 'budget')
  .description('save budget to file')
  .action(require('./actions/print'));

program
  .command('taxes <estimate>')
  .description('set tax estimate')
  .action(require('./actions/taxes'));

program
  .command('create <account> <value>')
  .description('create an account')
  .action(require('./actions/create'));

program
  .command('delete <account>')
  .description('delete an account')
  .action(require('./actions/delete'));

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
 
