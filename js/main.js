"use strict";
const search = document.querySelector(".js-search");
const movieDiv = document.querySelector(".searched-results");
const favDiv = document.querySelector(".favorites-column");

let movies = [];
let favMovies = [];

//escucha el botón de búsqueda
search.addEventListener("click", handlesearch);
//busca en la API
function handlesearch() {
  const movie = document.querySelector(".movie").value;
  fetch(`//api.tvmaze.com/search/shows?q=${movie}`)
    .then((response) => response.json())
    .then((data) => (movies = data))
    .then((_data) => showMovies());
}
//pinta el html de los resultados de la búsqueda
function showMovies() {
  let favClass = '';
  let html = "";
  for (const movie of movies) {
    const isFav = isFavorite(movie);
  if (isFav) {
    favClass = 'fav-result';
  } else {
    favClass = '';
  }
    html += `<div class="searched-film  ${favClass}" id="${movie.show.id}">`;
    if (movie.show.image === null) {
      html += `<div class="image" style="background-image: url(https://via.placeholder.com/210x295/ffffff/666666/?text=TV);"></div>`;
    } else {
      html += `<div class="image" style="background-image: url(${movie.show.image.medium});"></div>`;
    }
    html += `<p>${movie.show.name}</p>`;
    html += `</div>`;
  }
  movieDiv.innerHTML = html;

  listen();
  //listenFav();
}



//maneja el fav/unfav
function handleFavs(ev) {
  const selectedMovie = ev.currentTarget.id;
  const objetClicked = movies.find((movie) => {
    return movie.show.id == selectedMovie;
    
  });
  const favoritesFound = favMovies.findIndex((fav) => {
    return fav.show.id == selectedMovie;
  });
  if (favoritesFound === -1) {
    favMovies.push(objetClicked);
  } else {
    favMovies.splice(favoritesFound, 1);
  }
  setInLocalStorage();
  showMovies();
  showFavs();
}
function showFavs(){
  let html='';
  for (const fav of favMovies){
    html+=`<div class="favorite-div" id="${fav.show.id}">`
    html+=`<p class="fav-title">${fav.show.name}"</p>`
    if (fav.show.image === null) {
      html += `<div class="fav-image" style="background-image: url(https://via.placeholder.com/210x295/ffffff/666666/?text=TV);"></div>`;
    } else {
      html += `<div class="fav-image" style="background-image: url(${fav.show.image.medium});"></div>`;
    }
    html+=`</div>`
  }
  favDiv.innerHTML= html;
}

function isFavorite(movie) {
  //comprueba si la película está en los favoritos
  const favoriteFound = favMovies.find((fav) => {
    return fav.show.id === movie.show.id;
  });
  if (favoriteFound === undefined) {
    return false;
  } else {
    return true;
  }
}
//escucha al marcar una pelicula
function listen() {
    const movieDivs = document.querySelectorAll(".searched-film");
    for (const favDiv of movieDivs) {
      favDiv.addEventListener("click", handleFavs);
    }
  }
  function setInLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(favMovies));

  }
  function getLocalStorage() {
    // obtenermos lo que hay en el LS
    const localStorageFavorites = localStorage.getItem('favorites');
    // siempre que cojo datos del local storage tengo que comprobar si son válidos
    // es decir si es la primera vez que entro en la página
    if (localStorageFavorites !== null) {
      const arrayFavorites = JSON.parse(localStorageFavorites);
      favMovies = arrayFavorites;
    }

    showFavs();
  }
  getLocalStorage();
