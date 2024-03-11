var bestImgFilm = document.getElementById("imgBestFilm");

var imageFilm = document.getElementById('couverture');
var categorie = document.getElementById('meilleur');
var carousel = document.getElementById('carousel');

var categorie1 = document.getElementById('categorie1');
var carousel1 = document.getElementById('carousel1');

var categorie2 = document.getElementById('categorie2');
var carousel2 = document.getElementById('carousel2');

var categorie3 = document.getElementById('categorie3');
var carousel3 = document.getElementById('carousel3');

var prevButton = document.getElementById("prevButton");
var nextButton = document.getElementById("nextButton");

var prevButton2 = document.getElementById("prevButton2");
var nextButton2 = document.getElementById("nextButton2");

var prevButton3 = document.getElementById("prevButton3");
var nextButton3 = document.getElementById("nextButton3");

var prevButton4 = document.getElementById("prevButton4");
var nextButton4 = document.getElementById("nextButton4");

var carouselInner = document.getElementById('carousel-inner');
var carouselInner2 = document.getElementById('carousel-inner1');
var carouselInner3 = document.getElementById('carousel-inner2');
var carouselInner4 = document.getElementById('carousel-inner3');
var filmDes = document.getElementById('description');
var boutonInfo = document.getElementById('boutoninfo');
var position = 0;
var i = 0;
var numberBestFilm = 1;
var page = 1;

var url = "http://127.0.0.1:8000/api/v1/titles/";

async function fetchSite(lien){
    const response = await fetch(lien);
    const result = await response.json();
    return result;
}

async function renderBestFilm(link,number){
    var url = "http://127.0.0.1:8000/api/v1/titles/";
    lien = link;
    var dataList = await fetchSite(lien);

    bestImgFilm.src = dataList["results"][number].image_url;

    var id = dataList["results"][number]["id"];

    const response = await fetch(url+id);
    const result = await response.json();

    document.getElementById("resumeBestFilm").textContent = result["description"];
    document.getElementById("titreBestFilm").textContent = result["title"];

}

renderBestFilm(`http://127.0.0.1:8000/api/v1/titles/?sort_by=-votes,-imdb_score`,0);


document.getElementById("prevBest").addEventListener("click",function() {
    try{
        if (numberBestFilm<0){
            numberBestFilm=0;
        }
            numberBestFilm--;
            renderBestFilm(`http://127.0.0.1:8000/api/v1/titles/?sort_by=-votes,-imdb_score`,numberBestFilm);
    }
    catch(TypeError){
    }
});
document.getElementById("nextBest").addEventListener("click",function() {
    try{
        numberBestFilm++;
        renderBestFilm(`http://127.0.0.1:8000/api/v1/titles/?sort_by=-votes,-imdb_score`,numberBestFilm);
        if(numberBestFilm > 4){
            throw new Error();
        }
    }
    catch(e){
        numberBestFilm = 0;
        var link = `http://127.0.0.1:8000/api/v1/titles/?sort_by=-votes%2C-imdb_score`;
        renderBestFilm(link,numberBestFilm);
    }
});



async function renderCarousel(lien,carouselInner,h2,page,categorie,nomCate){

        var dataList = await fetchSite(lien);

        var number = 0;

        h2.textContent = nomCate;
        categorie.parentNode.insertBefore(h2,categorie);

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

    }

async function initCarousel(){
    var page = 1;

    const h2 = document.createElement('h2');
    const h22 = document.createElement('h2');
    const h23 = document.createElement('h2');
    const h24 = document.createElement('h2');

    dataList = `http://127.0.0.1:8000/api/v1/titles/?sort_by=-votes,-imdb_score`;
    dataList2 = `http://127.0.0.1:8000/api/v1/titles/?genre=drama&sort_by=-imdb_score`;
    dataList3 = `http://127.0.0.1:8000/api/v1/titles/?genre=romance&sort_by=-imdb_score`;
    dataList4 = `http://127.0.0.1:8000/api/v1/titles/?genre=history&sort_by=-imdb_score`;


    var dataListFinal = await fetchSite(dataList);
    var dataListFinal2 = await fetchSite(dataList2);
    var dataListFinal3 = await fetchSite(dataList3);
    var dataListFinal4 = await fetchSite(dataList4);

    for (data in dataListFinal){
            dataListwPage = `http://127.0.0.1:8000/api/v1/titles/?page=${page}&sort_by=-votes,-imdb_score`;
            renderCarousel(dataListwPage,carouselInner,h2,page,categorie,"Les films les mieux notés");
            page++;

            if (page == 10){
                break;
                
            }
        }

    page = 1;

    
    for(data2 in dataListFinal2){
            dataList2wPage = `http://127.0.0.1:8000/api/v1/titles/?page=${page}&genre=drama&sort_by=-imdb_score`;
            renderCarousel(dataList2wPage,carouselInner2,h22,page,categorie1,"Drama");
            page++;
            if (page==10){
                break;
            }
        }
    page = 1;
    
    for(data3 in dataListFinal3){
            dataList3wPage = `http://127.0.0.1:8000/api/v1/titles/?page=${page}&genre=romance&sort_by=-imdb_score`;
            renderCarousel(dataList3wPage,carouselInner3,h23,page,categorie2,"Romance");
            page++;
            if(page==10){
                break;
            }
        }

    page = 1;
    
    for (data4 in dataListFinal4){
            dataList4wPage = `http://127.0.0.1:8000/api/v1/titles/?page=${page}&genre=history&sort_by=-imdb_score`;
            renderCarousel(dataList4wPage,carouselInner4,h24,page,categorie3,"History");
            page++;
            if(page==10){
                break;
            }
        }

    page = 1;

}


function executeModal(id){
    console.log(id);
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

prevButton.addEventListener("click",() => {
    const direction = prevButton.id == "prevButton" ? -1 : 1;
    const scrollAmount = carouselInner.clientWidth * direction;
    carouselInner.scrollBy({left: scrollAmount,behavior: "smooth"});

});
nextButton.addEventListener("click",() => {
    const direction = 1;
    const scrollAmount = carouselInner.clientWidth * direction;
    carouselInner.scrollBy({left: scrollAmount,behavior: "smooth"});

});

prevButton2.addEventListener("click",() => {
    const direction = prevButton2.id == "prevButton2" ? -1 : 1;
    const scrollAmount = carouselInner2.clientWidth * direction;
    carouselInner2.scrollBy({left: scrollAmount,behavior: "smooth"});

});
nextButton2.addEventListener("click",() => {
    const direction = 1;
    const scrollAmount = carouselInner2.clientWidth * direction;
    carouselInner2.scrollBy({left: scrollAmount,behavior: "smooth"});

});

prevButton3.addEventListener("click",() => {
    const direction = prevButton3.id == "prevButton3" ? -1 : 1;
    const scrollAmount = carouselInner3.clientWidth * direction;
    carouselInner3.scrollBy({left: scrollAmount,behavior: "smooth"});

});
nextButton3.addEventListener("click",() => {
    const direction = 1;
    const scrollAmount = carouselInner3.clientWidth * direction;
    carouselInner3.scrollBy({left: scrollAmount,behavior: "smooth"});

});

prevButton4.addEventListener("click",() => {
    const direction = prevButton4.id == "prevButton4" ? -1 : 1;
    const scrollAmount = carouselInner4.clientWidth * direction;
    carouselInner4.scrollBy({left: scrollAmount,behavior: "smooth"});

});
nextButton4.addEventListener("click",() => {
    const direction = 1;
    const scrollAmount = carouselInner4.clientWidth * direction;
    carouselInner4.scrollBy({left: scrollAmount,behavior: "smooth"});

});




initCarousel();