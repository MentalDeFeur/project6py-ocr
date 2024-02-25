var imageFilm = document.getElementById('couverture');
var meilleurFilm = document.getElementById('meilleur');
var carousel = document.getElementById('carousel');
var carouselInner = document.getElementById('carousel-inner');
var filmDes = document.getElementById('description');
var boutonInfo = document.getElementById('boutoninfo');

var image = document.createElement('img');
var tFilm = document.createElement('h1')
var fVotes = document.createElement('p');
var annee = document.createElement('p');

var position = 0;

async function fetchMeilleursFilmsSite(){
    let url = "http://127.0.0.1:8000/api/v1/titles/";
    let triparvotes = "?sort_by=-votes,-imdb_score"; 
    const response = await fetch(url+triparvotes);
    const result = await response.json();
    return result;
}

async function renderCarousel(number){

        dataList = await fetchMeilleursFilmsSite();

        console.log(dataList);

        dataList.results.slice(number,number+dataList['results'].length).forEach(item =>{
            
            const image = document.createElement('img');
            image.src = item.image_url;
            image.alt = "Image";
            image.className = "image-carousel";
            image.setAttribute('onClick','ouvertureModal()');
            carouselInner.appendChild(image);
        });
}

renderCarousel(0);