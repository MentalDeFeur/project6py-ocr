const apiURL = "http://127.0.0.1:8000/"
    
    document.addEventListener("DOMContentLoaded",function(){
        fetch(apiURL)
        .then(reponse => response.json())
        .then(data => {
            //mettre les élements avec document.getElementById
            document.getElementById('video-card').innerHTML = '';
        })
        .catch(error => {
            console.error("Erreur lors de la récupération de l'API",error)
        });
    });