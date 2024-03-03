import React from 'react';
import { CiSearch } from "react-icons/ci";
import '../styles/searchbar.css';

function Searchbar() {
  return (
    <div className="searchbar-container">
      <input
        type="text"
        className="search-input"
        placeholder="Quick search"
      />
      <div className="search-icon">
        <CiSearch size={24} />
      </div>
    </div>
  );
}

export default Searchbar;
