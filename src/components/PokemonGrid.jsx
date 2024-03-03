import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/gridPoke.css';

function PokemonGrid() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=6')
      .then(response => {
        const pokemonList = response.data.results;
        const promises = pokemonList.map(pokemon => axios.get(pokemon.url));
        return Promise.all(promises);
      })
      .then(pokemonDetails => {
        const pokemonData = pokemonDetails.map(pokemon => pokemon.data);
        setPokemonData(pokemonData);
      })
      .catch(error => {
        console.error('Error fetching Pokémon data:', error);
      });
  }, []);

  return (
    <div className="grid-container">
      {pokemonData.map((pokemon, index) => (
        <div className="card" key={index}>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <div className="info">
            <h3>{pokemon.name}</h3>
            <p>HP: {pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PokemonGrid;
