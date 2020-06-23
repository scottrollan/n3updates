import React from 'react';
import $ from 'jquery';
import { Button } from 'react-bootstrap';
import styles from '../Stylesheet.module.scss';

const MissingField = (props) => {
  return (
    <div className={styles.confirm} id="missingField">
      <div className={styles.confirmButtonWrapper}>
        <h5>{props.missingField}</h5>

        <Button
          variant="secondary"
          onClick={() => $('#missingField').css('display', 'none')}
        >
          Ok. I'll get on that now.
        </Button>
      </div>
    </div>
  );
};

export default MissingField;
