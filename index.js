const scrapeIt = require("scrape-it");
const download = require('image-downloader');
const mkdirp = require('mkdirp');
const path = require('path');

var url = "https://www.lapa.ninja"
var pgNum = process.argv[2];

// Promise interface
function scrapeListPage(pgNum){
	//console.log("Downloading page: "+pgNum);

	// first page loads when page num excluded
	if(pgNum > 1){
			url += /page/+pgNum;
	}

	scrapeIt(url, {
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
		var found = page.pagelinks;
		for(var i = 0; i < found.length; i++){
			scrapePostPage(found[i].post);
		}
	});

}


function scrapePostPage(link){
	//console.log("fetching: "+link);

	scrapeIt(link, {
		imageLink : {
			selector: ".detail-post__img img",
			attr: "src"
		}
	}).then( res => {
		var img = url+res.imageLink;
		downloadImage(img);
	});
}

function downloadImage(imglink){
	var folder = path.join(__dirname,"downloads", pgNum.toString());

	mkdirp(folder,function(err){
		if(err) console.error(err)
		//else console.log("folder created: "+pgNum);
	});

	download.image({url: imglink, dest: folder})
		.then(({ filename, image }) => {
			//console.log('completed ', path.basename(filename))
		}).catch((err) => {
			throw err
		})

}

//var img_test = "https://www.lapa.ninja/assets/images/Frederique-Matti.jpg" 
//downloadImage(2, img_test);
//var linkpage = "https://www.lapa.ninja/post/frederique-matti/"
//scrapePostPage(linkpage);
scrapeListPage(pgNum);
