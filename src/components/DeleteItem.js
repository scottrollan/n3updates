import React, { useEffect, useState } from 'react';
import { Client } from '../constants/index';
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
  const [thisPlant, setThisPlant] = useState('');
  const docId = match.params.id;

  const query = `*[_id == "${docId}"]`;

  useEffect(() => {
    Client.fetch(query)
      .then((res) => {
        setItem(Object.assign({}, res[0]));
        const foto = res[0].image.asset._ref;
        const photoArray = foto.split('-');
        setPhotoLink(
          `https://cdn.sanity.io/images/ogg4t6rs/production/${photoArray[1]}-${photoArray[2]}.${photoArray[3]}`
        );
        setThisPlant(res[0].botanicalName + ' ' + res[0].variety);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query, thisPlant]);

  const doNotDelete = () => {
    $('#confirm').css('display', 'none');
  };

  const closeSuccess = () => {
    history.push('/');
  };

  const doDelete = async () => {
    $('#confirm').css('display', 'none');

    let response = await Client.delete(docId);
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
      <div
        className={styles.mediumBox}
        style={{
          border: '1px solid var(--dark-gray)',
          backgroundColor: 'var(--lightest-gray',
        }}
      >
        {item.description}
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
        <img src={photoLink} alt="" style={{ width: '220px' }} />
      </div>
    </React.Fragment>
  );
};

export default DeleteItem;
