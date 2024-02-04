var url = "http://127.0.0.1:8000/api/v1/titles/";
let triparvotes = "?sort_by=-votes,-imdb_score";

function ajouterMeilleursFilmsSite(){

    let couverture = document.getElementsByClassName('couverture');
    let titre = document.getElementsByClassName('titre')
    let filmDescription = docuement.getElementsByClassName('description');
    let boutonInfo = document.getElementsByClassName('boutoninfo');

    fetch(url+triparvotes)
    .then(reponse=>reponse.json())
    .then(data =>{
                couverture.innerHTML = "<img src="+data['results'][0]['titre']+">"
                titre.innerHTML = data['results'][0]['title'];
                boutonInfo.setAttribute("onClick");
                fetch(data['results'][0]['url'])
                    .then(reponse => response.json())
                    .then(data =>
                            {
                                filmDescription.innerHTML = data['description']})
            })
    .catch(error =>{ 
        console.log(error.message)
    });
}

ajouterMeilleursFilmsSite()