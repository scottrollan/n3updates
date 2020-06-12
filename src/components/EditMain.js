import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Stylesheet.module.scss';

const EditMain = () => {
  return (
    <div className={styles.page} style={{ width: '100%' }}>
      <div>Update NNN Database</div>
      <div className={styles.buttonDiv}>
        <div>
          <Link to="/create">
            <Button variant="success">Add A New Inventory Item</Button>
          </Link>
        </div>

        <div>
          <Link to="/update">
            <Button variant="warning">Update An Existing Item</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditMain;
