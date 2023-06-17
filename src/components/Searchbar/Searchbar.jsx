import { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Form, Input, SearchbarHeader } from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('');

  const handlerChange = e => {
    setSearchValue(e.target.value);
  };

  const handlerSubmit = e => {
    e.preventDefault();

    onSubmit(searchValue.trim());
    setSearchValue('');
  };

  return (
    <SearchbarHeader>
      <Form onSubmit={handlerSubmit}>
        <Button type="submit">
          <span className="button-label">Search</span>
        </Button>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={handlerChange}
        />
      </Form>
    </SearchbarHeader>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

