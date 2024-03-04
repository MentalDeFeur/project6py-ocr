var imageFilm = document.getElementById('couverture');
var meilleurFilm = document.getElementById('meilleur');
var carousel = document.getElementById('carousel');

var categorie1 = document.getElementById('categorie1');
var carousel1 = document.getElementById('carousel1');

var categorie2 = document.getElementById('categorie2');
var carousel2 = document.getElementById('carousel2');

var categorie3 = document.getElementById('categorie3');
var carousel3 = document.getElementById('carousel3');

var carouselInner = document.getElementById('carousel-inner');
var carouselInner2 = document.getElementById('carousel-inner1');
var carouselInner3 = document.getElementById('carousel-inner2');
var carouselInner4 = document.getElementById('carousel-inner3');
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

async function fetchCategorieOneSite(){
    const response = await fetch("http://127.0.0.1:8000/api/v1/titles/?genre=drama&sort_by=-imdb_score");
    const result = await response.json();
    return result;
}

async function fetchCategorieTwoSite(){
    const response = await fetch("http://127.0.0.1:8000/api/v1/titles/?genre=romance&sort_by=-imdb_score");
    const result = await response.json();
    return result;
}

async function fetchCategorieThreeSite(){
    const response = await fetch("http://127.0.0.1:8000/api/v1/titles/?genre=history&sort_by=-imdb_score");
    const result = await response.json();
    return result;
}

async function renderCarousel(){
        dataList = await fetchMeilleursFilmsSite();
        dataList2 = await fetchCategorieOneSite();
        dataList3 = await fetchCategorieTwoSite();
        dataList4 = await fetchCategorieThreeSite();


        var number = 0;

        const h2 = document.createElement('h2');
        h2.textContent = "Films les mieux notés";
        meilleurFilm.parentNode.insertBefore(h2,meilleurFilm);


        for (data of dataList['results']){
            const image = document.createElement('img');
            image.src = data.image_url;
            image.alt = "Image";
            image.className = "image-carousel";
            image.setAttribute('onClick',`executeModal("${dataList["results"][number]["id"]}")`);
            carouselInner.appendChild(image);
            number = number+1;
        }  

        number = 0;

        const h22 = document.createElement('h2');
        h22.textContent = "Drama";
        categorie1.parentNode.insertBefore(h22,categorie1);

        for (data of dataList2['results']){
            const image = document.createElement('img');
            image.src = data.image_url;
            image.alt = "Image";
            image.className = "image-carousel2";
            image.setAttribute('onClick',`executeModal("${dataList2["results"][number]["id"]}")`);
            carouselInner2.appendChild(image);
            number = number+1;
        }  

        number = 0;

        const h23 = document.createElement('h2');
        h23.textContent = "Romance";
        categorie2.parentNode.insertBefore(h23,categorie2);

        for (data of dataList3['results']){
            const image = document.createElement('img');
            image.src = data.image_url;
            image.alt = "Image";
            image.className = "image-carousel3";
            image.setAttribute('onClick',`executeModal("${dataList3["results"][number]["id"]}")`);
            carouselInner3.appendChild(image);
            number = number+1;
        }  

        number = 0;

        const h24 = document.createElement('h2');
        h24.textContent = "Histoire";
        categorie3.parentNode.insertBefore(h24,categorie3);

        for (data of dataList4['results']){
            const image = document.createElement('img');
            image.src = data.image_url;
            image.alt = "Image";
            image.className = "image-carousel4";
            image.setAttribute('onClick',`executeModal("${dataList4["results"][number]["id"]}")`);
            carouselInner4.appendChild(image);
            number = number+1;
        } 

}

function executeModal(id){
    let modal = document.getElementById("modal");
    let span = document.getElementById("close");
    let backdrop = document.querySelector(".dialog-backdrop");
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