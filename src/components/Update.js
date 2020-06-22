import React, { useState } from 'react';
import $ from 'jquery';
import NotFound from './popups/NotFound';
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
      $('#notFound').css('display', 'flex');
    }
  };

  return (
    <React.Fragment>
      <NotFound />
      <h3>
        <i>Update An Inventory Item</i>
      </h3>
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
