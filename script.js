let search = document.querySelector('#input');
let movieList = document.querySelector('#movies');
let searchString;

search.addEventListener('keyup', () => {
    if (movieList.children.length > 0) {
        while(movieList.firstChild) {
            movieList.removeChild(movieList.firstChild);
        }
    }
    searchString = search.value;
    getData(`http://www.omdbapi.com/?apikey=ebd44eee&s=${searchString}&type=movie`)
    .then(movies => {
        if (movies != void 0) {
            movies.forEach(movie => addMovieToList(movie));
        }
    })
    .catch(error => console.error(error));
});



function addMovieToList(movie) {
    //console.log(movie);
    if (movie.Poster !== 'N/A') {
    let img = document.createElement('img');
    img.src = movie.Poster;
    img.classList.add('img-movies');
    let link = document.createElement('a');
    link.setAttribute('href', `https://www.imdb.com/title/${movie.imdbID}/`);
    link.setAttribute('target', '_blank');
    movieList.appendChild(link);
    link.appendChild(img);
    console.log(movie.imdbID);
    }

}

function getData(url) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200) {
                /*
                let json = xhr.response;
                resolve(json);
                */         
                let json = JSON.parse(xhr.response);
                resolve(json.Search);
            } else {
                reject(xhr.statusText);
            }
        };

        xhr.onerror = function(error) {
            reject(error);
          };

          xhr.send();
    });
}   


getData(`http://www.omdbapi.com/?i=tt1305044&apikey=ebd44eee`)
.then(movies => console.log(movies));
