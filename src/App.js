import React, { useState, useEffect, useCallback } from "react";
import logo from "./logo.svg";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Searchbar from "./components/Searchbar";
import Types from "./components/Types";
import PokemonGrid from "./components/PokemonGrid";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("normal");
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    setSelectedType("normal");
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleTypeSelect = useCallback((type) => {
    setSelectedType(type);
    setSearchTerm("");
  }, []);

  const toggleSort = () => {
    setIsSorted(!isSorted);
  };

  return (
    <div>
      <header>
        <Header />
      </header>
      <Dashboard />
      <Searchbar onSearch={handleSearch} searchTerm={searchTerm} />
      <Types
        onTypeSelect={handleTypeSelect}
        toggleSort={toggleSort}
        isSorted={isSorted}
      />
      <PokemonGrid
        searchTerm={searchTerm}
        selectedType={selectedType}
        isSorted={isSorted}
      />
    </div>
  );
}

export default App;
