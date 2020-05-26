const ora = require('ora');
const getPage = require('./getPage');

let listUrl = 'https://www.lapa.ninja';
const listLayout = {
  pagelinks: {
    listItem: '.card-image a',
    data: {
      title: {
        attr: 'title'
      },
      link: {
        attr: 'href'
      }
    }
  }
};

module.exports = async (page) => {
  const spinner = ora({ text: `Downloading page: ${page} ` }).start();

  listUrl += page > 1 ? `/page/${page}` : '';
  return await getPage(spinner, listUrl, listLayout);
};
