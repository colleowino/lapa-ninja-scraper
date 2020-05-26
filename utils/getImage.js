const chalk = require('chalk');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');

const green = chalk.green;
const magenta = chalk.magenta;

const download = require('image-downloader');

module.exports = async (pgNum, imglink, title) => {
  const folder = path.join(__dirname, 'downloads', pgNum.toString());

  mkdirp(folder, err => {
    if (err) console.error(err);
  });

  const fullPath = path.join(folder, path.basename(imglink));
  // console.log(fullPath)

  try {
    if (fs.existsSync(fullPath)) {
      console.log(`🔶 ${magenta(title)}`);
      return;
    }
  } catch (err) {
    console.error(chalk.red(err));
  }

  await download
    .image({ url: imglink, dest: folder })
    .then(() => {
      console.log(`✅ ${green(title)}`);
    })
    .catch(err => {
      console.error(chalk.red(err));
    });
}