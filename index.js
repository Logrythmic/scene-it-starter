document.addEventListener('DOMContentLoaded', function(){
  const movieBox = document.getElementById("movies");
  movieBox.innerHTML = renderMoviesBlank(); //renders a front page

  document.getElementById('search-form').addEventListener('keyup', debounce(function(e){
    e.preventDefault();

    if(e.target.value === ""){
      movieBox.innerHTML = renderMoviesBlank();
    }
    else {
      const searchString = "http://www.omdbapi.com/?apikey=43fea795&s=" + encodeURIComponent(e.target.value.toLowerCase()); // this stores the search terms

      axios.get(searchString).then(res =>{
        console.log(res.data.Search); // seeing the data that is being pulled
        movieBox.innerHTML = renderMovies(res.data.Search); // render new movie list using new search parameters
      })
      .catch(err => {
        console.log("the get command errored");
        console.log(err);
      });
    }

  },400));//keyup is registering the key strokes - registers after 400ms


});

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function renderMoviesBlank(){ // renders a home page when nothing is searched and on start up
  return `
    <div class="movie">
      <div class="card" id="movie0" style="width: 18rem;">
      <img src="https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80" class="card-img-top vert" alt="What is your favorite movie?">
        <div class="card-body">
          <h6 class="title">What Is Your Favorite Movie?</h6>
          <h6 class="title">Try The Search Bar Above!</h6>
        </div>
      </div>
    </div>`
};

function hasPoster(poster){ // checks for an image, if no image then returns a default
  if(poster === "N/A")
    return "./no_image.png";
  else
    return poster;
};

function renderMovies(movieArray){
  const movies = movieArray.map((item, index) => {
    const printed =`
    <div class="movie">
      <div class="card" id="movie${index}" style="width: 18rem;">
      <img src="${hasPoster(item.Poster)}" class="card-img-top vert" alt="${item.Title}">
        <div class="card-body">
          <h6 class="card-title">${item.Title}</h6>
          <p class="card-text">${item.Year}</p>
          <button onclick="addToWatchList('${item.imdbID}')" id="add-movie" class="btn btn-primary">Add to Watchlist</button>
        </div>
      </div>
    </div>
    `;
    return printed;
  });
  return movies.join('');
};

function addToWatchList(imdbID){
  console.log("running watchlist");
  var movie = movieData.find(function(currentMovie){  // this doesnt seem to take advantage of the dynamic nature of the main js file
    return currentMovie.imdbID == imdbID;
  })
  var watchlistJSON = localStorage.getItem('watchlist');
  var watchlist = JSON.parse(watchlistJSON);
  if(watchlist == null){
    watchlist= [];
  }
  watchlist.push(movie);
  console.log(watchlist);
  watchlistJSON = JSON.stringify(watchlist);
  console.log(watchlistJSON);
  localStorage.setItem('watchlist', watchlistJSON);
}