import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/types.css';

function Types() {
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        const apiTypes = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/type');
                setTypes(response.data.results.map(type => type.name));
            } catch (error) {
                console.error('ERROR:', error);
            }
        };

        apiTypes();
    }, []);

    const handleTypeClick = (type) => {
        setSelectedType(type);
    };

    return (
        <div className="types-container">
            <div className="type-list-container">
                <div className="type-list">
                    {types.map((type, index) => (
                        <div
                            key={index}
                            className={`type ${selectedType === type ? 'selected' : ''}`}
                            onClick={() => handleTypeClick(type)}
                        >
                            {type}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Types;
