import React, { useState } from 'react';
import { Client } from '../constants/index';
import SearchNameInput from './SearchNameInput';
import { Link } from 'react-router-dom';
import styles from './Stylesheet.module.scss';

const Update = () => {
  const [items, setItems] = useState([]);

  const searchNow = async (query) => {
    let response = await Client.fetch(query);
    setItems([...response]);

    if (response === undefined || response.length === 0) {
      alert("Sorry. I can't find a plant by that botanical or common name.");
    }
  };

  return (
    <React.Fragment>
      <h3>Update</h3>
      <SearchNameInput searchByName={(query) => searchNow(query)} />
      <div>
        {items.map((item) => (
          <Link to={`/update/${item._id}`} key={item._id}>
            <div className={styles.nameButton}>
              {item.botanicalName} {item.variety} - {item.commonName}
            </div>
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Update;
