import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';
import Confirm from './popups/Confirm';
import ActionComplete from './popups/ActionComplete';
import styles from './Stylesheet.module.scss';

const DeleteItem = ({ match }) => {
  const history = useHistory();
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
  const query = `*[_id == "${docId}"]`;
  let thisPlant = '';

  useEffect(() => {
    client
      .fetch(query)
      .then((res) => {
        console.log(res);
        setItem(Object.assign({}, res[0]));
        const foto = res[0].image.asset._ref;
        const photoArray = foto.split('-');
        setPhotoLink(
          `https://cdn.sanity.io/images/ogg4t6rs/production/${photoArray[1]}-${photoArray[2]}.${photoArray[3]}`
        );
        thisPlant = res[0].botanicalName + ' ' + res[0].variety;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const doNotDelete = () => {
    $('#confirm').css('display', 'none');
  };

  const closeSuccess = () => {
    history.push('/');
  };

  const doDelete = async () => {
    $('#confirm').css('display', 'none');

    let response = await client.delete(docId);
    console.log(response);
    $('#success').css('display', 'flex');
  };

  return (
    <React.Fragment>
      <Confirm
        botanicalName={thisPlant}
        variety={null}
        action="delete"
        stopAction={() => doNotDelete()}
        doAction={() => doDelete()}
      />
      <ActionComplete
        botanicalName={item.botanicalName}
        variety={item.variety}
        action="deleted"
        closeMe={() => closeSuccess()}
      />
      <h3>Delete Inventory Item</h3>
      <div className={styles.centerWrapper}>
        <div>
          <h6 style={{ textDecoration: 'underline' }}>Botanical Name</h6>
          <i>{item.botanicalName}</i>
        </div>
        <div
          style={{
            display:
              item.variety === '' || item.variety === undefined
                ? 'none'
                : 'flex',
            flexDirection: 'column',
          }}
        >
          <h6 style={{ textDecoration: 'underline' }}>Variety</h6>
          <i>{item.variety}</i>
        </div>
        <div>
          <h6 style={{ textDecoration: 'underline' }}>Common Name</h6>
          <i>{item.commonName}</i>
        </div>
        <div
          style={{
            display:
              item.regionalName === '' || item.regionalName === undefined
                ? 'none'
                : 'inherit',
          }}
        >
          <h6 style={{ textDecoration: 'underline' }}>Regional Name</h6>
          <i>{item.regionalName}</i>
        </div>
        <div>
          <h6 style={{ textDecoration: 'underline' }}>Category</h6>
          <i>{item.category}</i>
        </div>
      </div>
      <div className={styles.centerWrapper}>
        <div
          className={styles.centerWrapper}
          style={{
            border: '1px solid var(--dark-gray)',
            backgroundColor: 'var(--lightest-gray',
            minWidth: '40%',
            minHeight: '80px',
          }}
        >
          {item.description}
        </div>
      </div>
      <div className={styles.centerWrapper}>
        <Button
          variant="outline-danger"
          onClick={() => $('#confirm').css('display', 'flex')}
        >
          Delete This Item
        </Button>
      </div>
      <div className={styles.centerWrapper}>
        <img src={photoLink} alt="" />
      </div>
    </React.Fragment>
  );
};

export default DeleteItem;
