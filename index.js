document.addEventListener('DOMContentLoaded', function(){
  let movieBox = document.getElementById("movies");
  movieBox.innerHTML = renderMoviesBlank(); //renders a front page
  
  document.getElementById('search-form').addEventListener('keyup', debounce(function(e){
    e.preventDefault();
    // console.log(e); // test log
    console.log(e.target.value); // test log
    if(e.target.value === ""){
      console.log("search is blank???!") // test log for logic to make sure condition was valid
      movieBox.innerHTML = renderMoviesBlank();
    };
    const searchString = "http://www.omdbapi.com/?i=tt3896198&apikey=43fea795&s=" + e.target.value.toLowerCase(); // this stores the search terms

    // let urlEncodedSearchString = encodeURIComponent(searchString);
    // console.log(urlEncodedSearchString);
    //getting an error in console log about the get command being asyncronous
    axios.get(searchString).then(res =>{
      console.log(res.data.Search); // seeing the data that is being pulled
      movieBox.innerHTML = renderMovies(res.data.Search); // !!Should!! render new movie list
    })
    .catch(err => {
      console.log("the get command errored");
    });
  },400));//keyup is registering the key strokes

    // const filteredMovies = movieData.filter(movie =>{
    //   return movie.Title.toLowerCase().includes(searchString) || movie.Year.toLowerCase().includes(searchString);
    // }); // this will store items that match the items searched for
    // console.log(filteredMovies); //shows the filtered movie list
    
    // movieBox.innerHTML = renderMovies(filteredMovies); // !!Should!! render new movie list
    // console.log("search button is pressed"); //test log
    // console.log(e.target);// test log
  // });

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

function renderMoviesBlank(){
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

function hasPoster(poster){
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
          <a href="#" class="btn btn-primary">Add</a>
        </div>
      </div>
    </div>
    `;
    console.log("this has run the render");
    return printed;
  });
  console.log("render is showing");
  return movies.join('');
};