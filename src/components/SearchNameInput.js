import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './SearchNameInput.module.scss';

const SearchNameInput = (props) => {
  const [searchValue, setSearchValue] = useState('');

  const searchByName = (event) => {
    event.preventDefault();
    let inputText = searchValue.toLowerCase();
    let botanicalInput = inputText.replace(/^\w/, (c) => c.toUpperCase()); // capitalize first letter of first word only
    let commonInput = inputText
      .split(' ')
      .map((i) => i.replace(/^\w/, (c) => c.toUpperCase()))
      .join(' ');
    const query = ` *[botanicalName == "${botanicalInput}" || commonName == "${commonInput}" || botanicalName match "${botanicalInput}" || commonName match "${commonInput}"]`;
    console.log(query);

    props.searchByName(query);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Search Botanical Name or Common Name: &nbsp;</h3>
      <Form onSubmit={(event) => searchByName(event)} className="nav-link">
        <input
          placeholder="Search"
          className={styles.searchInput}
          type="text"
          name="searchName"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <Button variant="outline-success" type="submit">
          Search By Name
        </Button>
      </Form>
    </div>
  );
};

export default SearchNameInput;
