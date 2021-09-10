'use strict'
const search= document.querySelector(".js-search");
const movieDiv= document.querySelector(".searched-results");

let movies= [];
function showMovies(){
    let html='';
    for( const movie of movies){
        html+= `<div class="searched-film">`
        if(movie.show.image===null){
            html+=`<div class="image" style="background-image: url(https://via.placeholder.com/210x295/ffffff/666666/?text=TV);"></div>`
        }
        else{
            html+=`<div class="image" style="background-image: url(${movie.show.image.medium});"></div>`
        }
        html+=`<p class="title">${movie.show.name}</p>`
        html+=`</div>`
        // <div class="searched-film">
        //         <div class="image"></div>
        //         <p class="title">La casa de papel</p>
        //     </div> background-image: url("paper.gif"); https://via.placeholder.com/210x295/ffffff/666666/?text=TV
        
    }
    movieDiv.innerHTML=html;
    console.log("aquí va la creación de los divs");
}
function handlesearch(){
const movie = document.querySelector(".movie").value;
  fetch(`//api.tvmaze.com/search/shows?q=${movie}`)
  .then(response => response.json())
  .then((data) => movies=data)
  .then(data => showMovies());
}
search.addEventListener('click', handlesearch);