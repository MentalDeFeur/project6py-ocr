var imageFilm = document.getElementById('couverture');
var meilleurFilm = document.getElementById('meilleur-film');
var image = document.createElement('img');
var tFilm = document.createElement('h1')
var titre = document.getElementById('titre');
var filmDes = document.getElementById('description');
var fVotes = document.createElement('p');
var annee = document.createElement('p');

var boutonInfo = document.getElementById('boutoninfo');

async function fetchMeilleursFilmsSite(url,triparvotes){
    const response = await fetch(url+triparvotes);
    const result = await response.json();
    console.log(result)
    image.src = result["results"][0]["image_url"];
    tFilm.innerText = "Titre du film : "+result["results"][0]["title"];
    fVotes.innerText = "Nombre de votes : "+result["results"][0]["votes"];
    annee.innerText = "Année : "+result["results"][0]["year"];
    imageFilm.appendChild(this.image);
    meilleurFilm.appendChild(this.tFilm);
    meilleurFilm.appendChild(this.annee);
    meilleurFilm.appendChild(this.fVotes);
}


function displayMeilleursFilmsSite(){
    let url = "http://127.0.0.1:8000/api/v1/titles/";
    let triparvotes = "?sort_by=-votes,-imdb_score";
    fetchMeilleursFilmsSite(url,triparvotes);
}

displayMeilleursFilmsSite();