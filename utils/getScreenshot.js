const ora = require('ora');

const getPage = require('./getPage');

const imgLayout = {
  img: {
    selector: '.p-centered',
    attr: 'src'
  }
};

module.exports = async (pageUrl, title) => {
  const spinner = ora({ text: `Processing: ${title} ` }).start();
  const result = await getPage(spinner, pageUrl, imgLayout);
  return result.img;
};
