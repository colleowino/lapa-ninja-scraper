const scrapeIt = require('scrape-it');
const download = require('image-downloader');
const mkdirp = require('mkdirp');
const path = require('path');

let url = 'https://www.lapa.ninja';
const pgNum = process.argv[2];


function downloadImage(imglink) {
	const folder = path.join(__dirname, 'downloads', pgNum.toString());

	mkdirp(folder, (err) => {
		if (err) console.error(err);
	});

	download.image({ url: imglink, dest: folder })
		.then(() => {
			// console.log('completed ', path.basename(filename))
		}).catch((err) => {
			throw err;
		});
}

function scrapePostPage(link) {
// console.log('fetching: '+link);

	scrapeIt(link, {
		imageLink: {
			selector: '.detail-post__img img',
			attr: 'src',
		},
	}).then((res) => {
		const img = url + res.data.imageLink;
		downloadImage(img);
	});
}

function scrapeListPage() {
	console.log(`Downloading page: ${pgNum}`);

	// first page loads when page num excluded
	if (pgNum > 1) {
		url += /page/ + pgNum;
	}

	scrapeIt(url, {
		// fetch the screenshot pages
		pagelinks: {
			listItem: '.lapa-post__item',
			data: {
				creator: 'a.lapa-post__name-link',
				post: {
					selector: 'a.lapa-post__name-link',
					attr: 'href',
				},
			},
		},
	}).then((res) => {
		const found = res.data.pagelinks;
		// console.log(`found ${found[0].post}`);
		for (let i = 0; i < found.length; i++) {
			scrapePostPage(found[i].post);
		}
	}).catch((err) => {
		throw err;
	});
}

// var img_test = 'https://www.lapa.ninja/assets/images/Frederique-Matti.jpg'
// downloadImage(2, img_test);
// var linkpage = 'https://www.lapa.ninja/post/frederique-matti/'
// scrapePostPage(linkpage);
scrapeListPage(pgNum);
