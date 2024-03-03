var imageFilm = document.getElementById('couverture');
var meilleurFilm = document.getElementById('meilleur');
var carousel = document.getElementById('carousel');
var carouselInner = document.getElementById('carousel-inner');
var filmDes = document.getElementById('description');
var boutonInfo = document.getElementById('boutoninfo');
var position = 0;

let url = "http://127.0.0.1:8000/api/v1/titles/";

async function fetchMeilleursFilmsSite(){
    let triparvotes = "?sort_by=-votes,-imdb_score"; 
    const response = await fetch(url+triparvotes);
    const result = await response.json();
    return result;
}

async function renderCarousel(){
        dataList = await fetchMeilleursFilmsSite();
        console.log(dataList);
        let number = 0;

        const h2 = document.createElement('h2');
        h2.textContent = "Films les mieux notés";
        meilleurFilm.parentNode.insertBefore(h2,meilleurFilm);

        

        for (data of dataList['results']){
            const image = document.createElement('img');
            image.src = data.image_url;
            image.alt = "Image";
            image.className = "image-carousel";
            image.setAttribute('onClick',`executeModal("${dataList["results"][number]["id"]}")`)
            carouselInner.appendChild(image);
            number = number+1;
        }  
}

function executeModal(id){
    let modal = document.getElementById("modal");
    let span = document.getElementById("close");
    fetchModalData(id);

    modal.style.display = "block";

    span.onclick = function(){
        modal.style.display = "none";
    }
}

async function fetchModalData(id){

    const response = await fetch(url+id);
    const result = await response.json();
    
    document.getElementById("director").textContent = result["directors"];
    document.getElementById("cover").src = result["image_url"];
    document.getElementById("title").textContent = result["title"];
    document.getElementById("resume").textContent = result["description"];
    document.getElementById("year").textContent = result["year"];
    document.getElementById("duration").textContent = result["duration"];
    document.getElementById("genres").textContent = result["genres"];
    document.getElementById("imdb").textContent = result["imdb_score"]+" / 10";
    document.getElementById("actors").textContent = result["actors"]+ "...";
    document.getElementById("country").textContent = result["countries"];
    document.getElementById("rating").textContent = result["rated"];
    document.getElementById("date").textContent = result["date_published"];
    document.getElementById("avg_vote").textContent = result["avg_vote"];

}

renderCarousel();