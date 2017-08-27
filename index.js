const scrapeIt = require("scrape-it");
const download = require('image-downloader');
const mkdirp = require('mkdirp');
const path = require('path');

var url = "https://www.lapa.ninja"

// Promise interface
function scrapeListPage(pgNum){
	scrapeIt(url+"/page/"+pgNum, {
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
	});
}

var img_test = "https://www.lapa.ninja/assets/images/Frederique-Matti.jpg" 

function downloadImage(pgNum,imglink){
	var folder = path.join(__dirname,"downloads", pgNum.toString());

	mkdirp(folder,function(err){
		if(err) console.error(err)
		else console.log("folder created: "+pgNum);
	});

	download.image({url: imglink, dest: folder})
		.then(({ filename, image }) => {
			console.log('File saved to', filename)
		}).catch((err) => {
			throw err
		})

}

//downloadImage(2, img_test);
//scrapePostPage(linkpage);
//scrapeListPage(2);
