document.addEventListener('DOMContentLoaded', async () => {
  const apiKey = '18a6a94e'; // Replace 'yourkey' with your actual API key from OMDB
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');
  const movieDetailsContainer = document.getElementById('movie-details');

  if (movieId) {
      try {
          const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}&plot=full`);
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const movie = await response.json();
          renderMovieDetails(movie);
      } catch (error) {
          console.error('Error fetching movie details:', error);
          movieDetailsContainer.innerHTML = '<p>Error fetching movie details</p>';
      }
  } else {
      movieDetailsContainer.innerHTML = '<p>No movie ID provided</p>';
  }

  function renderMovieDetails(movie) {
      movieDetailsContainer.innerHTML = `
          <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300'}" alt="${movie.Title}" />
          <h1>${movie.Title}</h1>
          <p><strong>Year:</strong> ${movie.Year}</p>
          <p><strong>Genre:</strong> ${movie.Type}</p>
      `;
  }
});
