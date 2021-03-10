import React, { useEffect, useState } from 'react';
import axios from '../axios';
import requests from '../requests';
import './banner.css';

const baseUrl = 'https://image.tmdb.org/t/p/w342';

function Banner() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        requests.fetchNetflixOriginals
      );
      const rnd = Math.floor(
        Math.random() * request.data.results.length - 1
      );
      setMovie(request.data.results[rnd]);
      return request;
    }
    fetchData();
  }, []);

  const truncate = (str, n) => {
    if (str) {
      return str.length > n
        ? str.substr(0, n - 1) + '...'
        : str;
    }
    return null;
  };

  return (
    movie && (
      <header
        className='banner'
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundImage: `url('${baseUrl}${movie.backdrop_path}')`
        }}
      >
        <div className='banner__contents'>
          <h1 className='banner__title'>
            {movie.name ||
              movie.title ||
              movie.original_name}
          </h1>
          <div className='banner__buttons'>
            <button className='banner__button'>Play</button>
            <button className='banner__button'>
              My List
            </button>
          </div>
          <h1 className='banner__description'>
            {truncate(movie.overview, 150)}
          </h1>
        </div>
        <div className='banner__fadeBottom'></div>
      </header>
    )
  );
}

export default Banner;
