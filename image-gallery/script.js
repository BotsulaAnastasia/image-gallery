const btn = document.querySelector('.btn-search');
const errorMessage = document.querySelector('.errorMessage');
const gallery = document.querySelector('.gallery-grid');
const galleryColumns = document.querySelectorAll('.gallery-column');

const galleryColumnsArr = Array.prototype.slice.call(galleryColumns);

// API
API_KEY = "L9c4awkR67nohMc_2Bg86AKJlb8Q_PR4i9cmYm43INo";
apiUrl = "https://api.unsplash.com/photos/?client_id="+API_KEY+"&per_page=18";
searchUrl = "https://api.unsplash.com/search/photos/?client_id="+API_KEY+"&query=";

imgUrls = [];

window.onload = (event) => {
    loadImg();
}

async function loadImg() {

    try {
        await fetch(apiUrl).then(
        (res) =>
            res.json().then((data) => {
                console.log(data);
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

        for (let i = 0; i < galleryColumnsArr.length; i++) {
            if ((index + 1) % 3 === 0) galleryColumnsArr[0].appendChild(img);
            if ((index + 2) % 3 === 0) galleryColumnsArr[1].appendChild(img);
            if ((index + 3) % 3 === 0) galleryColumnsArr[2].appendChild(img);
        }
    });
}

btn.addEventListener('click', loadImg);