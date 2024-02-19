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

var position = 0;

var dataList = []

async function fetchMeilleursFilmsSite(url,triparvotes){
    const response = await fetch(url+triparvotes);
    const result = await response.json();
    return result;
}

async function renderCarousel(number){
    let url = "http://127.0.0.1:8000/api/v1/titles/";
    let triparvotes = "?sort_by=-votes,-imdb_score";    
    dataList = await fetchMeilleursFilmsSite(url,triparvotes);

    console.log(dataList);

    image.src = dataList["results"][number]['image_url'];
    image.alt = 'Image'+number;
    image.className = "carousel-item";
    image.classList.add("active");
    carouselInner.appendChild(image);   
}

renderCarousel(0);

function updateCarousel(param){

    if (param == 0){
            position--;
            renderCarousel(position);
        }
    if(param == 1){
        if (position < 0 || position > dataList['results'].length){
            position = 0;
        }else{
            position++;
            renderCarousel(position);
        }
    }

}




