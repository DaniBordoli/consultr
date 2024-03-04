import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { CiSearch } from "react-icons/ci";
import "../styles/searchbar.css";

interface SearchbarProps {
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
}

const Searchbar: React.FC<SearchbarProps> = ({ onSearch, searchTerm }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
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
};

export default Searchbar;
