document.addEventListener('DOMContentLoaded', function(){
  let content = document.getElementById("movies");
  content.innerHTML = renderMovies(movieData);
  let movieList = [];
  document.getElementById('search-form').addEventListener('keyup', function(e){
    e.preventDefault();
    console.log(e);
    console.log(e.target.value);
    const searchString = e.target.value.toLowerCase();
    const filteredMovies = movieList.filter(movie =>{
      return movie.Title.toLowerCase().includes(searchString) || movie.Year.toLowerCase().includes(searchString);
    });
    document.getElementById("search-form").addEventListener('submit', function(){
      renderMovies(filteredMovies);
    })
  })

  function renderMovies(movieArray){
    const movies = movieArray.map((item, index) => {
      const printed =`
      <div class="movie">
        <div class="card" id="movie${index}" style="width: 18rem;">
        <img src="${item.Poster}" class="card-img-top" alt="${item.Title}">
          <div class="card-body">
            <h5 class="card-title">${item.Title}</h5>
            <p class="card-text">${item.Year}</p>
            <a href="#" class="btn btn-primary">Add</a>
          </div>
        </div>
      </div>
      `;
      console.log("this has run the render");
      return printed;
    });
    return movies.join('');
  };
});