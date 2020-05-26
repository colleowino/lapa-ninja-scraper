const cli = require('./utils/cli');
const welcome = require('cli-welcome');

const getList = require('./utils/getListPage');
const getScreenshot = require('./utils/getScreenshot');
const getImage = require('./utils/getImage');

const [input] = cli.input;

(async () => {
  welcome(`Lapa.ninja Scraper`, `by Colleowino`, {
    bgColor: `#007C91`,
    color: `#FFFFFF`,
    bold: true,
    clear: true
  });

  input === 'help' && (await cli.showHelp(0));
  const page = cli.flags.page;

  const results = await getList(page);

  const imgLinks = [];
  for (el of results.pagelinks) {
    title = el.title.replace(' Landing Page Design', '');
    let img = await getScreenshot(el.link, title);
    imgLinks.push({ img, title });
  }

  for (el of imgLinks) {
    await getImage(page, el.img, el.title);
  }
})();
