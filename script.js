const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = []

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const count = 30
const apiKey = 'kQ_BYdm3FTHsrjJZaO4zt2T_qGcclrmZta72Nj7ccNk'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// 

function imageLoaded(){
	imagesLoaded++;
	if (imagesLoaded === totalImages){
		ready = true;
		console.log('ready = ', ready)
	}
}

// Helper function to set attributes

function setAttributes(element, attributes){
	for (const key in attributes){
		element.setAttribute(key, attributes[key])
	}
}

// Create photos

function displayPhotos(){
	totalImages = displayPhotos.length;
	photosArray.forEach((photo) => {
		// Create anchor to link to unsplash
		const item = document.createElement('a');
		// Create image
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank'
		})
		const img = document.createElement('img')
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description
		})
		// Event Listener when finished loading
		img.addEventListener('load', imageLoaded);
		// Put image inside anchor
		item.appendChild(img)
		imageContainer.appendChild(item)
	})
	console.log(photosArray)
}

// Get photos from Unsplash

async function getPhotos(){
	try {
		const response = await fetch(apiUrl)
		photosArray = await response.json();
		displayPhotos()	
	}
	catch (error){
		console.log(error)
	}
}

// Checks
window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
		ready = false
		getPhotos()
	}
})

// On Load
getPhotos()