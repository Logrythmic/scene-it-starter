document.addEventListener('DOMContentLoaded', function(){
  let movieBox = document.getElementById("movies");
  movieBox.innerHTML = renderMovies(movieData);

  document.getElementById('search-form').addEventListener('keyup', function(e){ //keyup is registering the key strokes
    e.preventDefault();
    console.log(e); // test log
    console.log(e.target.value); // test log
    const searchString = e.target.value.toLowerCase(); // this stores the search terms
    const filteredMovies = movieData.filter(movie =>{
      return movie.Title.toLowerCase().includes(searchString) || movie.Year.toLowerCase().includes(searchString);
    }); // this will store items that match the items searched for
    console.log(filteredMovies); //shows the filtered movie list
    
    movieBox.innerHTML = renderMovies(filteredMovies); // !!Should!! render new movie list
    console.log("search button is pressed"); //test log
    console.log(e.target);// test log
  });

});

function renderMovies(movieArray){
  const movies = movieArray.map((item, index) => {
    const printed =`
    <div class="movie">
      <div class="card" id="movie${index}" style="width: 18rem;">
      <img src="${item.Poster}" class="card-img-top vert" alt="${item.Title}">
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