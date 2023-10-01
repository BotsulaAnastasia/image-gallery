const searchBtn = document.querySelector('.btn-search');
const errorMessage = document.querySelector('.errorMessage');
const gallery = document.querySelector('.gallery-grid');
const galleryColumns = document.querySelectorAll('.gallery-column');
const input = document.querySelector('.input');

const galleryColumnsArr = Array.prototype.slice.call(galleryColumns);

// API
API_KEY = "L9c4awkR67nohMc_2Bg86AKJlb8Q_PR4i9cmYm43INo";
apiUrl = "https://api.unsplash.com/photos/?client_id="+API_KEY+"&per_page=18";
searchUrl = "https://api.unsplash.com/search/photos/?client_id="+API_KEY+"&per_page=18&query=";

imgUrls = [];
imagesArr = [];

window.onload = (event) => {
    loadImg(apiUrl);
}

// Load default images
async function loadImg(api) {

    try {
        await fetch(api).then(
        (res) =>
            res.json().then((data) => {
                //console.log(data);
                if(data) {                    
                    data.forEach(pic => {
                        imgUrls.push(pic.urls.small);
                    })
                    showImages();
                }
            })
        );
    } catch (error) {
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = 'An error happened, try again later, please';
    }
}

// Show images on the display
function showImages() {
    imgUrls.forEach((url, index) => {
        const img = document.createElement('img');
        img.classList.add('gallery-img');
        img.src = url;
        img.alt = `image`;
        img.style.width = `100%`;
        imagesArr.push(img);

        if ((index + 1) % 3 === 0) galleryColumnsArr[0].append(img);
        if ((index + 2) % 3 === 0) galleryColumnsArr[1].append(img);
        if ((index + 3) % 3 === 0) galleryColumnsArr[2].append(img);
    });
}

// Load images by tag
async function loadSearchImg(key) {
    
    try {

        await fetch(searchUrl + key).then(
        (res) =>
            res.json().then((data) => {
                console.log(data.results);
                if(data.results) {
                    imgUrls = [];                    
                    data.results.forEach(pic => {
                        imgUrls.push(pic.urls.regular);
                    })
                    for (let i = 0; i < imgUrls.length; i++) {
                        imagesArr[i].src = imgUrls[i];
                    }
                }
            })
        );
    } catch (error) {
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = 'An error happened, try again later, please';
    }
}

// Show images after click on the search button
searchBtn.addEventListener('click', function() {
    if(input.value != '') {
        loadSearchImg(input.value);
    }
});

// Show images after push on Enter
document.addEventListener('keydown', function(event) {
    if(input.value != '') {
        if (event.code == 'Enter') {
            loadSearchImg(input.value);
        }
    }
  });