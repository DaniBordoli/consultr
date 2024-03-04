import React, { useState, useEffect, useCallback } from "react";
import logo from "./logo.svg";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Searchbar from "./components/Searchbar";
import Types from "./components/Types";
import PokemonGrid from "./components/PokemonGrid";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("normal");
  const [isSorted, setIsSorted] = useState<boolean>(false);

  useEffect(() => {
    setSelectedType("normal");
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleTypeSelect = useCallback((type: string) => {
    setSelectedType(type);
    setSearchTerm("");
  }, []);

  const toggleSort = useCallback(() => {
    setIsSorted(!isSorted);
  }, [isSorted]);

  return (
    <div>
      <header>
        <Header />
      </header>
      <Dashboard message={"Welcome to your trainer dashboard!"} />
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
};

export default App;
