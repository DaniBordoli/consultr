import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "../styles/gridPoke.css";
import RectangleBlue from "../assets/RectangleBlue.svg";
import RectangleOrange from "../assets/RectangleOrange.svg";
import RectangleGreen from "../assets/RectangleGreen.svg";
import RectangleRed from "../assets/RectangleRed.svg";
import ShadowCard from "../assets/ShadowCard.svg";
import { IoIosSync } from "react-icons/io";

interface PokemonGridProps {
  searchTerm: string;
  selectedType: string;
  isSorted: boolean;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({
  searchTerm,
  selectedType,
  isSorted,
}) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  const cardBackgrounds = [
    RectangleBlue,
    RectangleOrange,
    RectangleGreen,
    RectangleRed,
  ];

  useEffect(() => {
    setIsLoading(true);
    let url = "https://pokeapi.co/api/v2/pokemon?limit=10000";

    const fetchPokemon = async () => {
      try {
        const response = await axios.get(url);
        let pokemonList = response.data.results;

        if (!searchTerm && selectedType) {
          const typeResponse = await axios.get(
            `https://pokeapi.co/api/v2/type/${selectedType}`
          );
          pokemonList = typeResponse.data.pokemon.map((p) => p.pokemon);
        }

        const promises = pokemonList
          .slice(0, 10000)
          .map((pokemon) => axios.get(pokemon.url));
        const pokemonDetails = await Promise.all(promises);
        const allPokemonData = pokemonDetails.map((detail) => detail.data);

        const finalPokemonData = searchTerm
          ? allPokemonData.filter((pokemon) =>
              pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : allPokemonData;

        setPokemonData(finalPokemonData);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
      setIsLoading(false);
    };

    fetchPokemon();
  }, [searchTerm, selectedType, isSorted]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredPokemonData = searchTerm
    ? pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : pokemonData;
  const sortedAndFilteredPokemon = useMemo(() => {
    let sortedData = [...pokemonData];
    if (isSorted) {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    }
    // Aquí puedes aplicar cualquier otro filtrado basado en searchTerm o selectedType
    return sortedData;
  }, [pokemonData, isSorted]);

  const currentItems = sortedAndFilteredPokemon.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredPokemonData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  let paddingClass = "";
  if (currentItems.length === 6 || currentItems.length === 5) {
    paddingClass = "padding-60vh";
  } else if (currentItems.length <= 2) {
    paddingClass = "padding-40vh";
  }

  return (
    <>
      <div className="container">
        <div className={`grid-container ${paddingClass}`}>
          {isLoading ? (
            <div className="loading">
              <IoIosSync size={48} className="spinner" color="white" />
            </div>
          ) : (
            <>
              {currentItems.map((pokemon, index) => (
                <div
                  className="card"
                  key={index}
                  style={{
                    backgroundImage: `url(${
                      cardBackgrounds[index % cardBackgrounds.length]
                    })`,
                  }}
                >
                  <div className="image-container">
                    <img src={ShadowCard} alt="Shadow" className="shadow-img" />
                    <img
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      className="pokeImg"
                    />
                  </div>
                  <div className="info">
                    <h3>{pokemon.name}</h3>
                    <p>
                      HP
                      {
                        pokemon.stats.find((stat) => stat.stat.name === "hp")
                          .base_stat
                      }
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      {!isLoading && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage * itemsPerPage >= pokemonData.length}
          >
            Siguiente
          </button>
        </div>
      )}
    </>
  );
};

export default PokemonGrid;
