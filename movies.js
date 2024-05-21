// API key and base URL
const apiKey = '18a6a94e';
const baseUrl = `https://www.omdbapi.com/?apikey=${apiKey}`;

// Function to fetch and render movies
async function fetchAndRenderMovies(searchTerm, year, limit) {
    try {
        const response = await fetch(`${baseUrl}&s=${searchTerm}&y=${year}`);
        const data = await response.json();

        if (data.Response === 'True') {
            const movies = data.Search.slice(0, limit);
            renderMovies(movies);
        } else {
            console.error('No movies found:', data.Error);
            document.getElementById('movies-container').innerText = 'No movies found for 2023.';
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        document.getElementById('movies-container').innerText = 'Error fetching movies.';
    }
}

// Function to render movies to the DOM
function renderMovies(movies) {
    const container = document.getElementById('movies-container');
    container.innerHTML = ''; // Clear existing content

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = `
            <h2>${movie.Title}</h2>
            <p><strong>Year:</strong> ${movie.Year}</p>
            <img src="${movie.Poster}" alt="${movie.Title} Poster" />
        `;

        container.appendChild(movieElement);
    });
}

// Fetch and render the first 4 movies of 2023 with a common search term
fetchAndRenderMovies('movie', 2023, 8);
