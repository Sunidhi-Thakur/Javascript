function generate(){

let url = 'https://api.thecatapi.com/v1/images/search?size=small&mime_types=gif';


fetch(url)
.then(res => res.json())
  .then(data => {const myImg = data[0].url;
    console.log(myImg);
    var img = document.createElement("img");
    img.src = data[0].url;

    var div = document.getElementById("img-box")
    div.appendChild(img);
    
  }
    );
}
