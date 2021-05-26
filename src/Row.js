import React, { useState, useEffect } from 'react';
import axios from './axios';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import "./row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    // A snippets of code which runs based on a specific condition/variable
    useEffect(() => {
        // with this I'm able to pull the requests when row loads
        // if [], run once when the row loads, and don't run it again

        async function fetchData() {
            const request = await axios.get(fetchUrl);
            // https://api.themoviedb.org/3/discover/tv?api_key=${dfd94e3882d1f5a9ea2d11f25ea65156}&with_networks=213
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl])

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        }
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                }).catch(error => console.log(error))
        }
    }

    return (
        <div className="row">
            <h3 className="row_title">{title}</h3>
            <div className="row_posters">
                {/* several row_posters */}
                {movies.map(movie => (
                    <img
                        key={movies.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__poster_Large"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;
