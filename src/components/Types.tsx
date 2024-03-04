import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/types.css";

interface TypesProps {
  onTypeSelect: (type: string) => void;
  toggleSort: () => void;
  isSorted: boolean;
}

const Types: React.FC<TypesProps> = ({
  onTypeSelect,
  toggleSort,
  isSorted,
}) => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const typeListContainerRef = useRef(null);

  useEffect(() => {
    const apiTypes = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/type");
        const typesData: string[] = response.data.results.map(
          (type: { name: string }) => type.name
        );
        setTypes(typesData);

        if (!selectedType) {
          const normalType = typesData.find((type) => type === "normal");
          if (normalType) {
            setSelectedType(normalType);
            onTypeSelect(normalType);
          }
        }
      } catch (error) {
        console.error("ERROR:", error);
      }
    };

    apiTypes();
  }, [onTypeSelect, selectedType]);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleTypeClick = (typeName: string) => {
    setSelectedType(typeName);
    onTypeSelect(typeName);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - typeListContainerRef.current.offsetLeft);
    setScrollLeft(typeListContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - typeListContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    typeListContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="types-container">
      <div
        className="type-list-container"
        ref={typeListContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="type-list">
          {types.map((type, index) => (
            <div
              key={index}
              className={`type ${selectedType === type ? "selected" : ""}`}
              onClick={() => handleTypeClick(type)}
            >
              {capitalizeFirstLetter(type)}
            </div>
          ))}
        </div>
      </div>
      <button onClick={toggleSort} className="order-button">
        {isSorted ? "Desordenar" : "Ordenar Alfabéticamente"}
      </button>
    </div>
  );
};

export default Types;
