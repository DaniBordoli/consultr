import React from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Searchbar from './components/Searchbar';
import Types from './components/Types';
import PokemonGrid from './components/PokemonGrid';

function App() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <Dashboard />
      <Searchbar/>
      <Types/>
      <PokemonGrid/>

    </div>
  );
}

export default App;
