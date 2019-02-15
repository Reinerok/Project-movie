let search = document.querySelector('#input');
let movieList = document.querySelector('#movies');

search.addEventListener('keyup', () => {
    if (movieList.children.length > 0) {
        while(movieList.firstChild) {
            movieList.removeChild(movieList.firstChild);
        }
    }
    let searchString = search.value;
    getData(`http://www.omdbapi.com/?apikey=ebd44eee&s=${searchString}&type=movie`)
    .then(movies => {
        if (movies != void 0) {
            movies.forEach(movie => addMovieToList(movie));
        }
    })
    .catch(error => console.error(error));
});
/*
function randomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

function imdb() {
    let int = '';
    let searchImdb = 'tt';
    while(searchImdb.length < 9) {
        //int = randomInteger(0,9);
        searchImdb =  searchImdb + randomInteger(0,9);
    }
    return searchImdb;
}
function randomMovie(numbers) {
    let ratings = 0;
while (ratings < 60) {
    ratings += 5;
    console.log(ratings); 
    getData(`http://www.omdbapi.com/?i=${imdb()}&apikey=ebd44eee&plot=full&type=movie`)
    .then(movies => {console.log(movies.Metascore)
        ratings = Number(movies.Metascore);
        let test = true;
        console.log(test);
    })
    .catch(error => console.error(error));
}*/

function addMovieToList(movie) {
    //console.log(movie);
    if (movie.Poster !== 'N/A') {
    let img = document.createElement('img');
    let div = document.createElement('div');
    let link = document.createElement('a');
    img.src = movie.Poster;
    img.classList.add('img-movies');
    link.setAttribute('href', `https://www.imdb.com/title/${movie.imdbID}/`);
    link.setAttribute('target', '_blank');
    movieList.appendChild(link);
    link.appendChild(img);
    link.appendChild(div);
    getData(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=ebd44eee&plot=full`)
    .then(movies => {/*
        if (Number(movies.Metascore) < 60) {
            link.remove();
        } else {
        console.log(movies.Metascore);*/
        let movieInfo = movies;
        div.textContent = movieInfo.Title;
        //}
    }); 
    }
}

function getData(url) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200 && JSON.parse(xhr.response).Response !== 'False') {
                //console.log(333);
                
                //console.log(typeof xhr.response);
                if (url.search(/&i/gi) !== -1 || url.search(/\?i/gi) !== -1) {
                    let json = JSON.parse(xhr.response);
                //console.log(json);
                resolve(json);
                } else {
                
                let json = JSON.parse(xhr.response);
                
                resolve(json.Search);
                }
            } else {
                //reject(xhr.statusText);
            }
        };

        xhr.onerror = function(error) {
            reject(error);
          };

          xhr.send();
    });
}   



