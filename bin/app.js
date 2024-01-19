document.addEventListener("DOMContentLoaded",function(){
    var api_url = "http://127.0.0.1:8000/api/v1"

    fetch(api_url)
        .then(response => response.json())
        .then(data => {
            var htmlContent = "<ul>";
            data.forEach(item =>{
                    htmlContent += 
        });
});