import React, { useState } from 'react';

const suggestionsList = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Fig',
  'Grape',
  'Kiwi',
  'Lemon',
  'Mango',
  'Orange',
];

const InputSuggestion = () => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const filtered = suggestionsList.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
  };

  return (
    <div style={{ position: 'relative', width: '300px' }}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type a fruit..."
        style={{ width: '100%', padding: '8px' }}
      />
      {filteredSuggestions.length > 0 && (
        <ul style={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          margin: 0,
          padding: '0',
          position: 'absolute',
          backgroundColor: '#fff',
          width: '100%',
          listStyleType: 'none',
          zIndex: 1000
        }}>
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: '8px',
                cursor: 'pointer',
                backgroundColor: '#fff',
                borderBottom: '1px solid #ccc'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputSuggestion;
