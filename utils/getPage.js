const scrapeIt = require('scrape-it');

module.exports = async (spinner, url, layout) => {
  return await scrapeIt(url, layout)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(`API is down, try again later.`);
    })
    .finally(() => {
      spinner.stop();
    });
};
