import React, { useState } from 'react';
import SearchNameInput from './SearchNameInput';
import { Link } from 'react-router-dom';
import styles from './Stylesheet.module.scss';

const Delete = () => {
  const [items, setItems] = useState([]);

  const searchNow = async (query) => {
    const sanityClient = require('@sanity/client');
    const client = sanityClient({
      projectId: 'ogg4t6rs',
      dataset: 'production',
      token: '',
      useCdn: true, // `false` if you want to ensure fresh data
    });

    let response = await client.fetch(query);
    setItems([...response]);

    if (response === undefined || response.length === 0) {
      alert("Sorry. I can't find a plant by that botanical or common name.");
    }
  };

  return (
    <React.Fragment>
      <h3>Delete</h3>
      <SearchNameInput searchByName={(query) => searchNow(query)} />
      <div>
        {items.map((item) => (
          <Link to={`/delete/${item._id}`} key={item._id}>
            <div className={styles.nameButton}>
              {item.botanicalName} {item.variety} - {item.commonName}
            </div>
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Delete;
