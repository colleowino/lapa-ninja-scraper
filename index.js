const scrapeIt = require("scrape-it");
var url = "https://www.lapa.ninja/"

// Promise interface
function scrapeListPage(pgNum){
	scrapeIt(url+"page/"+pgNum, {
			// fetch the screenshot pages
			pagelinks: {
				listItem: ".lapa-post__item",
				data: {
					creator: "a.lapa-post__name-link",
					post: {
						selector: "a.lapa-post__name-link",
						attr: "href"
					}
				}
			}
	}).then(page => {
			console.log(page);
	});
}

scrapeListPage(2);
