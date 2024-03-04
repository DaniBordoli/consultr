import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import "../styles/searchbar.css";

function Searchbar({ onSearch, searchTerm }) {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(inputValue);
    }
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);
  return (
    <div className="searchbar-container" onClick={handleSearchClick}>
      <input
        type="text"
        className="search-input"
        placeholder="Quick search"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <div className="search-icon">
        <CiSearch size={24} />
      </div>
    </div>
  );
}

export default Searchbar;
