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

var linkpage = "https://www.lapa.ninja/post/frederique-matti/"

function scrapePostPage(link){
	scrapeIt(link, {
		imageLink : {
			selector: ".detail-post__img img",
			attr: "src"
		}
	}).then( res => {
		console.log(url+res.imageLink);
		//console.log(res);
	});
}


scrapePostPage(linkpage);
//scrapeListPage(2);
