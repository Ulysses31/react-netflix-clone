import React, { useEffect, useState } from 'react';
import movieTrailer from 'movie-trailer';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import axios from '../../axios';
import './row.css';

const baseUrl = 'https://image.tmdb.org/t/p/w342';
const opts = {
  width: '100%',
  height: '390',
  playerVars: {
    autoplay: 1
  }
};

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    // console.log(movie?.title || movie?.name);
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie.title || movie.name || '')
        .then((url) => {
          // https://www.youtube.com/watch?v=XtMThy8QKqU
          // get all params after ? in url
          const urlParams = new URLSearchParams(
            new URL(url).search
          );
          setTrailerUrl(urlParams.get('v'));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row__posters'>
        {movies.map((movie) => (
          <img
            className={`row__poster ${
              isLargeRow && 'row__posterLarge'
            }`}
            key={movie.id}
            src={
              movie.poster_path
                ? `${baseUrl}${
                    isLargeRow
                      ? movie.poster_path
                      : movie.backdrop_path
                  }`
                : 'https://play-lh.googleusercontent.com/IO3niAyss5tFXAQP176P0Jk5rg_A_hfKPNqzC4gb15WjLPjo5I-f7oIZ9Dqxw2wPBAg'
            }
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && (
        <YouTube videoId={trailerUrl} opts={opts} />
      )}
    </div>
  );
}

export default Row;

Row.propTypes = {
  title: PropTypes.string.isRequired,
  fetchUrl: PropTypes.string.isRequired,
  isLargeRow: PropTypes.bool
};
