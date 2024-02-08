var imageFilm = document.getElementById('couverture');
var image = document.createElement('img');
var titre = document.getElementById('titre')
var filmDescription = document.getElementById('description');
var boutonInfo = document.getElementById('boutoninfo');

async function fetchMeilleursFilmsSite(url,triparvotes){
    const response = await fetch(url+triparvotes);
    const result = await response.json();
    image.src = result["results"][0]["image_url"];
    imageFilm.appendChild(this.image);
}

function displayMeilleursFilmsSite(){
    let url = "http://127.0.0.1:8000/api/v1/titles/";
    let triparvotes = "?sort_by=-votes,-imdb_score";
    fetchMeilleursFilmsSite(url,triparvotes);
}

displayMeilleursFilmsSite();