const meow = require('meow');
const chalk = require('chalk');
const green = chalk.green;
const cyan = chalk.cyan;

module.exports = meow(
  `
  Usage
    ${green('lapa')} ${cyan(`[--page]`)}

  Options
    ${cyan(`--page`)}, ${cyan(`-p`)}
  `,
  {
    booleanDefault: undefined,
    hardRejection: false,
    inferType: false,
    flags: {
      page: {
        type: 'number',
        default: 1,
        alias: 'p'
      }
    }
  }
);
