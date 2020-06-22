import React from 'react';
import $ from 'jquery';
import { Button } from 'react-bootstrap';
import styles from '../Stylesheet.module.scss';

const NotFound = () => {
  return (
    <div className={styles.confirm} id="notFound">
      <div className={styles.confirmButtonWrapper}>
        <h5>Sorry. I can't find a plant by that botanical or common name.</h5>

        <Button
          variant="secondary"
          onClick={() => $('#notFound').css('display', 'none')}
        >
          Ok. Close this window.
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
