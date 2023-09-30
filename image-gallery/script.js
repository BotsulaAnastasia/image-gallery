const btn = document.querySelector('.btn-search');
const errorMessage = document.querySelector('.errorMessage');
const gallery = document.querySelector('.gallery-grid');
const galleryColumns = document.querySelectorAll('.gallery-column');

const galleryColumnsArr = Array.prototype.slice.call(galleryColumns);
async function loadImg() {
    const inputValue = document.querySelector('.input').value;
    try {
        await fetch(`https://api.unsplash.com/photos?&per_page=18&client_id=L9c4awkR67nohMc_2Bg86AKJlb8Q_PR4i9cmYm43INo`).then(
        (res) =>
            res.json().then((data) => {
                console.log(data);
                if(data) {                    
                    let imgArr = [];
                    for (let pic = 0; pic < data.length; pic++) {
                        const img = document.createElement('img');
                        img.classList.add('gallery-img');
                        img.src = `${data[pic].urls.small}`;
                        img.alt = `image`;
                        img.style.width = `100%`;
                        imgArr.push(img);
                    }
                    for (let i = 0; i < imgArr.length; i++) {
                        const countOfImgAtOneColumn = imgArr.length / galleryColumnsArr.length;
                        if (i < countOfImgAtOneColumn) galleryColumnsArr[0].append(imgArr[i]);
                        if (i >= countOfImgAtOneColumn && i < countOfImgAtOneColumn * 2) galleryColumnsArr[1].append(imgArr[i]);
                        if (i >= countOfImgAtOneColumn * 2) galleryColumnsArr[2].append(imgArr[i]);
                    }
                }
            })
        );
    } catch (error) {
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = 'An error happened, try again later, please';
    }
}

btn.addEventListener('click', loadImg);