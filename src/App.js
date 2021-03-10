import React from 'react';
import Banner from './components/banner';
import NavBar from './components/navbar';
import Row from './components/row';
import requests from './requests';
import './App.css';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Banner />
      <Row
        title='NETFLIX Originals'
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row
        title='Trending Now'
        fetchUrl={requests.fetchTrending}
      />
      <Row
        title='Top Rated'
        fetchUrl={requests.fetchTopRated}
      />
      <Row
        title='Action Movies'
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title='Comedy Movies'
        fetchUrl={requests.fetchComedyMovies}
      />
      <Row
        title='Horror Movies'
        fetchUrl={requests.fetchHorrorMovies}
      />
      <Row
        title='Romance Movies'
        fetchUrl={requests.fetchRomanceMovies}
      />
      <Row
        title='Documentaries Movies'
        fetchUrl={requests.fetchDocumentaries}
      />
    </div>
  );
}

export default App;
