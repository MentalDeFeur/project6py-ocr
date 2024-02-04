var url = "http://127.0.0.1:8000/api/v1/titles/";
let triparvotes = "?sort_by=-votes,-imdb_score";

function ajouterMeilleursFilmsSite(){

    let imageFilm = document.getElementsByClassName('image-film');
    let titre = document.getElementsByClassName('titre')
    let filmDescription = document.getElementsByClassName('description');
    let boutonInfo = document.getElementsByClassName('boutoninfo');

    fetch(url+triparvotes)
    .then(reponse=>reponse.json())
    .then(data =>{
                imageFilm.src = data["results"][0]["image_url"];
                titre.innerHTML = data["results"][0]["title"];

                fetch(data["results"][0]["url"])
                    .then(response => response.json())
                    .then(data =>
                            {filmDescription.innerHTML = data["description"]})
            })
    .catch(error =>{ 
        console.log(error.message)
    });
}

ajouterMeilleursFilmsSite()