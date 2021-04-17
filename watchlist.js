document.addEventListener('DOMContentLoaded', function(){
  console.log("watchlist open");
  console.log(localStorage.getItem('watchlist'));
  renderMovies(JSON.parse(localStorage.getItem('watchlist'))); // parse data to send to function

});
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
          <p> this is saved to your watch list</p>
        </div>
      </div>
    </div>
    `;
    return printed;
  });
  return movies.join('');
};
