import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from '../Stylesheet.module.scss';

const Thinking = (props) => {
  return (
    <div className={styles.confirm} id="thinking">
      <Spinner id="spinner" animation="grow" variant={props.variant} />
    </div>
  );
};

export default Thinking;
