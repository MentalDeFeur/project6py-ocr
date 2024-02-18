var imageFilm = document.getElementById('couverture');
var meilleurFilm = document.getElementById('meilleur-film');
var carousel = document.getElementById('carousel');
var carouselInner = document.getElementById('carousel-inner');
var titre = document.getElementById('titre');
var filmDes = document.getElementById('description');
var boutonInfo = document.getElementById('boutoninfo');

var image = document.createElement('img');
var tFilm = document.createElement('h1')
var fVotes = document.createElement('p');
var annee = document.createElement('p');

async function fetchMeilleursFilmsSite(url,triparvotes){
    const response = await fetch(url+triparvotes);
    const result = await response.json();
    return result;
}

async function renderCarousel(){
    let url = "http://127.0.0.1:8000/api/v1/titles/";
    let triparvotes = "?sort_by=-votes,-imdb_score";    
    const datas = await fetchMeilleursFilmsSite(url,triparvotes);
    renderCarousel.innerHTML = "";

    for (data in datas.results){
            image.src = datas["results"][data]['image_url'];
            image.alt = 'Image ${ data }';
            image.className = "carousel-item";
            image.classList.add("active");
            carouselInner.appendChild(image);
    }     
}


function updateCarousel(param){
    if (param == 0){
        const carouselSlider = document.querySelector("#carousel").offsetWidth;
        const carouselContent = document.querySelector("#carousel-inner");
        carouselInner.scrollLeft -= carouselSlider;
        const scrollLeft = carouselContent.scrollLeft;
        const itemsSlider = carouselInner.querySelectorAll(".carousel-item")

        if (scrollLeft == 0){
            carouselContent.scrollLeft = carouselSlider * (itemsSlider.length - 1);
        }
    }

    if(param == 1){
        const carouselSlider = document.querySelector("#carousel").offsetWidth;
        const carouselContent = document.querySelector("#carousel-inner");
        carouselInner.scrollLeft += carouselSlider;
        const scrollLeft = carouselContent.scrollLeft;
        const itemsSlider = carouselInner.querySelectorAll(".carousel-item")

        if (scrollLeft == 0){
            carouselContent.scrollLeft = carouselSlider * (itemsSlider.length - 1);
        }
    }
}

renderCarousel();


