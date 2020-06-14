import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import ConfirmDelete from './ConfirmDelete';
import styles from './Stylesheet.module.scss';

const DeleteItem = ({ match }) => {
  useEffect(() => {
    fetchItem();
    $('#confirm').hide();
  }, [match]);

  const [item, setItem] = useState({});
  const [photoLink, setPhotoLink] = useState('');
  const docId = match.params.id;
  const sanityClient = require('@sanity/client');
  const client = sanityClient({
    projectId: 'ogg4t6rs',
    dataset: 'production',
    token:
      'sktPD2r791blYmo8n26ZCurNfamiwCJ2KfgbdmPsIYPFGywjAK4roSijSwqTsH83LYiPvFIfDmOH1JL5jtzjGdpADZoEVIaKxzv8vJyD4Wj8lX04qNqzLEbVDN3uLAoEFRNWgLJga6t6LCSV6JGMOiiXG9MtjWVXdyxgHmQfWik5siHH65dt',
    useCdn: false, // `false` if you want to ensure fresh data
  });

  const fetchItem = async () => {
    const query = `*[_id == "${docId}"]`;

    const response = await client.fetch(query);
    const res = await response[0];
    setItem(Object.assign({}, await res));
    const foto = await res.image.asset._ref;
    const photoArray = await foto.split('-');
    setPhotoLink(
      `https://cdn.sanity.io/images/ogg4t6rs/production/${photoArray[1]}-${photoArray[2]}.${photoArray[3]}`
    );
  };

  const doNotDelete = () => {
    $('#confirm').hide();
  };

  const deleteItem = async () => {
    $('#confirm').hide();

    let response = await client.delete(docId);

    console.log(response);
    alert(`Inventory item with id: ${response.transactionId} has been deleted`);
  };

  return (
    <React.Fragment>
      <ConfirmDelete
        botanicalName={item.botanicalName}
        variety={item.variety}
        stopDelete={() => doNotDelete()}
        goDelete={() => deleteItem()}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          padding: '1vw',
        }}
      >
        <span>
          <label>
            Botanical Name
            <span>{item.botanicalName}</span>
          </label>
        </span>
        <span>
          <label>
            Variety (if any)
            <span>{item.variety} </span>
          </label>
        </span>
        <span>
          <label>
            Common Name
            <span>{item.commonName}</span>
          </label>
        </span>
        <span>
          <label>
            Regional Name
            <span>{item.regionalName}</span>
          </label>
        </span>
        <span>
          <label>
            Category
            <span>{item.category} </span>
          </label>
        </span>

        <span className={styles.descrPhoto}>
          <span className={styles.largeSection}>
            Description
            <span style={{ width: '100%' }}>{item.description}</span>
          </span>
          <span className={styles.smallSection}>
            Notes
            <span style={{ width: '100%' }}>{item.notes}</span>
          </span>
        </span>
        <span className={styles.descrPhoto}>
          <span className={styles.largeSection} style={{ padding: '0 20%' }}>
            Photo
            <img
              src={photoLink}
              alt="none"
              style={{ width: '100%', height: 'auto' }}
            />
          </span>
          <span className={styles.smallSection} style={{ alignSelf: 'center' }}>
            <Button onClick={() => $('#confirm').show()}>
              Delete This Item
            </Button>
          </span>
        </span>
      </div>
    </React.Fragment>
  );
};

export default DeleteItem;
