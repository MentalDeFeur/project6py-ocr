var imageFilm = document.getElementById('couverture');
var meilleurFilm = document.getElementById('meilleur-film');
var carousel = document.getElementById('carousel')
var carouselInner = document.getElementById('carousel-inner')
var prevBtn = document.getElementById('prev-btn');
var nextBtn = document.getElementById('next-btn');
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
    number = 0;

    for (data in datas.results){
            console.log();

            image.src = datas["results"][data]['image_url'];
            image.alt = 'Image ${ data }';

            image.classList.add("active");
            meilleurFilm.appendChild(image);    
    }
}

prevBtn.addEventListener("click",function(){
    updateCarousel();
});

nextBtn.addEventListener("click",function(){
    updateCarousel();
});

function updateCarousel(){
    const images = Array.from(carouselInner.children);
    for (image in images){
        if (index === currentIndex){
            image.classList.add("active");
        } else{
            image.classList.remove("active");
        }
    }
}

renderCarousel();


