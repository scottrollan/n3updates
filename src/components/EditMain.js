import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Stylesheet.module.scss';

const EditMain = () => {
  return (
    <div className={styles.page} style={{ width: '100%' }}>
      <div className={styles.buttonDiv}>
        <Link to="/create">
          <Button style={{ height: '100%' }} variant="success">
            Add A New Inventory Item
          </Button>
        </Link>

        <Link to="/update">
          <Button style={{ height: '100%' }} variant="warning">
            Update An Existing Item
          </Button>
        </Link>

        <Link to="/delete">
          <Button style={{ height: '100%' }} variant="danger">
            Delete An Inventory Item
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EditMain;
