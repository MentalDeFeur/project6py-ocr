var imageFilm = document.getElementById('couverture');
var meilleurFilm = document.getElementById('meilleur');
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

var url = "http://127.0.0.1:8000/api/v1/titles/";

async function fetchSite(lien){
    const response = await fetch(lien);
    const result = await response.json();
    return result;
}

async function renderCarousel(){

        dataList = await fetchSite("http://127.0.0.1:8000/api/v1/titles/?sort_by=-votes,-imdb_score");
        dataList2 = await fetchSite("http://127.0.0.1:8000/api/v1/titles/?genre=drama&sort_by=-imdb_score");
        dataList3 = await fetchSite("http://127.0.0.1:8000/api/v1/titles/?genre=romance&sort_by=-imdb_score");
        dataList4 = await fetchSite("http://127.0.0.1:8000/api/v1/titles/?genre=history&sort_by=-imdb_score");


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
            if(number == 4){
                break;
            }
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
            if(number == 4){
                break;
            }
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
            if(number == 4){
                break;
            }
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
            if(number == 4){
                break;
            }
        } 

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

async function buttonAction(number){

    dataList == "";

    var numberImg = 0;

    if (number == 1 || number == 3 || number == 5 || number == 7){
        position = position - 1;
        if (position < 0){
            position = 0;
        }
    }
    else if (number == 2 || number == 4 || number == 6 || number == 8){
        position = position + 1;
        if (position > dataList["results"].length){
            position = 0;
        }
    }
    else{
        position = 0;
    }

    if (number == 1 || number == 2){
        dataList = await fetchSite(`http://127.0.0.1:8000/api/v1/titles/?page=${position}&sort_by=-votes%2C-imdb_score`);
                while (numberImg > 4){
                    var image = carouselInner.getElementsByTagName("img")[numberImg];
                    carouselInner.removeChild(image);
                    numberImg++;
                }
                numberImg = 0;
                for (data of dataList['results']){
                    const image = document.createElement('img');
                    image.src = data.image_url;
                    image.alt = "Image";
                    image.className = "image-carousel";
                    image.setAttribute('onClick',`executeModal("${dataList["results"][numberImg]["id"]}")`);
                    carouselInner.appendChild(image);
                    numberImg++;
                    if(numberImg == 4){
                        break;
                    }
            }
                numberImg=0;
    }
    if (number == 3 || number == 4){
        dataList = await fetchSite(`http://127.0.0.1:8000/api/v1/titles/?genre=drama&page=${position}&sort_by=-imdb_score`);
            for (data of dataList['results']){
                        const image = document.createElement('img');
                        image.src = data.image_url;
                        image.alt = "Image";
                        image.className = "image-carousel";
                        image.setAttribute('onClick',`executeModal("${dataList["results"][numberImg]["id"]}")`);
                        carouselInner2.appendChild(image);
                        numberImg++;
                        if(numberImg == 4){
                            break;
                        }
                    }
                    numberImg=0;
    }
    if (number == 5 || number == 6){
        dataList = await fetchSite(`http://127.0.0.1:8000/api/v1/titles/?genre=romance&page=${position}&sort_by=-imdb_score`);
            for (data of dataList['results']){
                        const image = document.createElement('img');
                        image.src = data.image_url;
                        image.alt = "Image";
                        image.className = "image-carousel";
                        image.setAttribute('onClick',`executeModal("${dataList["results"][numberImg]["id"]}")`);
                        carouselInner3.appendChild(image);
                        numberImg++;
                        if(numberImg == 4){
                            break;
                        }
                    }
                    numberImg=0;  
    }
    if (number == 7 || number == 8){
        dataList = await fetchSite(`http://127.0.0.1:8000/api/v1/titles/?genre=history&page${position}&sort_by=-imdb_score`);
            for (data of dataList['results']){
                        const image = document.createElement('img');
                        image.src = data.image_url;
                        image.alt = "Image";
                        image.className = "image-carousel";
                        image.setAttribute('onClick',`executeModal("${dataList["results"][numberImg]["id"]}")`);
                        carouselInner4.appendChild(image);
                        numberImg++;
                        if(numberImg == 4){
                            break;
                        }
                    }
            numberImg=0;
    }

}


renderCarousel();