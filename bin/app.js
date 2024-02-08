var url = "http://127.0.0.1:8000/api/v1/titles/";
let triparvotes = "?sort_by=-votes,-imdb_score";

function ajouterMeilleursFilmsSite(){

    var imageFilm = document.getElementsByClassName('image-film');
    var image = document.createElement('img');
    var titre = document.getElementsByClassName('titre')
    var filmDescription = document.getElementsByClassName('description');
    var boutonInfo = document.getElementsByClassName('boutoninfo');

    fetch(url+triparvotes)
    .then(reponse=>reponse.json())
    .then(data =>{
                image.src = data["results"][0]["image_url"];
                titre.innerHTML = data["results"][0]["title"];

                fetch(data["results"][0]["url"])
                    .then(response => response.json())
                    .then(data =>
                            {
                                console.info(image)
                                imageFilm.appendChild(image);
                                filmDescription.innerHTML = data["description"];
                            })
            })
    .catch(error =>{ 
        console.log(error.message)
    });
}

ajouterMeilleursFilmsSite()