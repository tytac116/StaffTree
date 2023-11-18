// SearchComponent.js

import React from 'react';
import { TextField, Button } from '@mui/material';

const SearchComponent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default SearchComponent;
