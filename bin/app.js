function displayResult(url){
    fetch(url).then(function(reponse){
        return reponse.json().then(
            function(data){
                console.log(data.results[0]["image_url"])
                return data;
            })
    })
    .catch(function(error){
        console.log(error.message);
    });
}


let url = "http://127.0.0.1:8000/api/v1/titles/?sort_by=-votes,-imdb_score";

displayResult(url);