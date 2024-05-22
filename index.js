document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "18a6a94e"; // Replace 'yourkey' with your actual API key from OMDB
  const searchInput = document.getElementById("searchInput");
  const movieContainer = document.getElementById("movies-container");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value;
    if (query.length > 2) {
      fetchMovies(query);
    } else {
      movieContainer.innerHTML = "";
    }
  });

  async function fetchMovies(query) {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
          query
        )}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data)
      if (data.Response === "True") {
        renderMovies(data.Search);
      } else {
        movieContainer.innerHTML = "<p>No movies found</p>";
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  

  function renderMovies(movies) {
    movieContainer.innerHTML = "";
    movies.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");
      movieElement.innerHTML = `
      <a href="movie.html?id=${movie.imdbID}">
        <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/100'}" alt="${movie.Title}" />
        <h2>${movie.Title}</h2>
      </a>
      <p>Year: ${movie.Year}</p>
      <p>Type: ${movie.Type}</p>
            `;
      movieContainer.appendChild(movieElement);
    });
  }
});
